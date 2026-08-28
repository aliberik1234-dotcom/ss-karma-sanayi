import { PrismaClient, PaymentStatus, PlanStatus } from '../../generated/prisma/index.js';
import Decimal from 'decimal.js';
import { SecurityService } from './securityService';
import { AuditService } from './auditService';

export interface PrivateGrant {
  grantToken: string;
  adminId: string;
  memberId: string;
  expiresAt: number;
}

export interface FinancialSummary {
  memberId: string;
  fullName: string;
  sequenceFormatted: string;
  phone: string;
  plotSize: string; // e.g. "500.00"
  downPayment: string; // e.g. "50000.00"
  totalDebt: string;
  totalPaid: string;
  remainingDebt: string;
  totalInstallmentsCount: number;
  paidInstallmentsCount: number;
  remainingInstallmentsCount: number;
  activePlan: {
    id: string;
    totalInstallments: number;
    createdAt: Date;
    installments: Array<{
      id: string;
      installmentNumber: number;
      amount: string;
      dueDate: Date;
      status: PaymentStatus;
      bankId: string | null;
      bankName: string | null;
      bankCode: string | null;
      bankLogo: string | null;
      paymentDate: Date | null;
      receiptNumber: string | null;
      notes: string | null;
    }>;
  } | null;
}

export class PrivateService {
  private static activeGrants: Map<string, PrivateGrant> = new Map();
  private static readonly GRANT_TTL_MS = 10 * 60 * 1000; // 10 dakika erişim penceresi
  private static readonly MAX_FAILED_ATTEMPTS = 5;
  private static readonly LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 dakika

  public static async verifyPrivatePassword(
    prisma: PrismaClient,
    adminId: string,
    memberId: string,
    rawPassword: string
  ): Promise<{ success: boolean; grantToken?: string; error?: string }> {
    const cred = await prisma.privateCredential.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    if (!cred) {
      return { success: false, error: 'Özel parola henüz yapılandırılmamış. Lütfen kurulum sihirbazını tamamlayın.' };
    }

    const now = new Date();
    if (cred.lockedUntil && cred.lockedUntil > now) {
      const remainingSec = Math.ceil((cred.lockedUntil.getTime() - now.getTime()) / 1000);
      return {
        success: false,
        error: `Özel parola çok sayıda hatalı deneme nedeniyle kilitlenmiştir. Lütfen ${remainingSec} saniye sonra tekrar deneyiniz.`
      };
    }

    const isMatch = await SecurityService.verifyPassword(rawPassword, cred.passwordHash);
    if (!isMatch) {
      const newFailed = cred.failedAttemptCount + 1;
      let lockDate: Date | null = null;

      if (newFailed >= this.MAX_FAILED_ATTEMPTS) {
        lockDate = new Date(Date.now() + this.LOCKOUT_DURATION_MS);
        await prisma.securityEvent.create({
          data: {
            type: 'BRUTE_FORCE_PRIVATE',
            severity: 'CRITICAL',
            message: `Özel Parola için ${newFailed} başarısız deneme! Erişim 5 dakika kilitlendi.`
          }
        });
      }

      await prisma.privateCredential.update({
        where: { id: cred.id },
        data: {
          failedAttemptCount: newFailed,
          lockedUntil: lockDate
        }
      });

      await AuditService.logEvent(prisma, 'PRIVATE_ACCESS_DENIED', 'ADMIN', adminId, memberId, {
        failedCount: newFailed,
        locked: !!lockDate
      });

      return {
        success: false,
        error: lockDate
          ? 'Çok sayıda hatalı özel parola denemesi! Erişim 5 dakika kilitlendi.'
          : 'Özel parola hatalı.'
      };
    }

    // Başarılı doğrulama
    await prisma.privateCredential.update({
      where: { id: cred.id },
      data: {
        failedAttemptCount: 0,
        lockedUntil: null
      }
    });

    const grantToken = `grant_${SecurityService.generateSecureToken(32)}`;
    const grant: PrivateGrant = {
      grantToken,
      adminId,
      memberId,
      expiresAt: Date.now() + this.GRANT_TTL_MS
    };

    this.activeGrants.set(grantToken, grant);

    await AuditService.logEvent(prisma, 'PRIVATE_PAGE_ACCESS', 'ADMIN', adminId, memberId, {
      accessGrantedUntil: new Date(grant.expiresAt).toISOString()
    });

    return { success: true, grantToken };
  }

  public static validateGrant(grantToken: string, adminId: string, memberId: string): boolean {
    if (!grantToken || !this.activeGrants.has(grantToken)) {
      return false;
    }
    const grant = this.activeGrants.get(grantToken)!;
    if (grant.adminId !== adminId || grant.memberId !== memberId) {
      return false;
    }
    if (Date.now() > grant.expiresAt) {
      this.activeGrants.delete(grantToken);
      return false;
    }
    return true;
  }

  public static async getMemberFinancialDetails(
    prisma: PrismaClient,
    memberId: string
  ): Promise<FinancialSummary> {
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        privateFinancial: {
          include: {
            plans: {
              where: { status: PlanStatus.ACTIVE },
              include: {
                installments: {
                  include: { bank: true },
                  orderBy: { installmentNumber: 'asc' }
                }
              }
            }
          }
        }
      }
    });

    if (!member || member.isDeleted) {
      throw new Error('Üye kaydı bulunamadı.');
    }

    const fin = member.privateFinancial;
    const plotSizeDecimal = fin?.plotSize ? new Decimal(fin.plotSize.toString()) : new Decimal(0);
    const downPaymentDecimal = fin?.downPayment ? new Decimal(fin.downPayment.toString()) : new Decimal(0);

    const activePlan = fin?.plans && fin.plans.length > 0 ? fin.plans[0] : null;

    let installmentTotal = new Decimal(0);
    let installmentPaid = new Decimal(0);
    let totalCount = 0;
    let paidCount = 0;

    const formattedInstallments = activePlan
      ? activePlan.installments.map((inst) => {
          const instAmount = new Decimal(inst.amount.toString());
          installmentTotal = installmentTotal.plus(instAmount);
          totalCount++;

          if (inst.status === PaymentStatus.ODENDI) {
            installmentPaid = installmentPaid.plus(instAmount);
            paidCount++;
          }

          return {
            id: inst.id,
            installmentNumber: inst.installmentNumber,
            amount: instAmount.toFixed(2),
            dueDate: inst.dueDate,
            status: inst.status,
            bankId: inst.bankId,
            bankName: inst.bank ? inst.bank.name : null,
            bankCode: inst.bank ? inst.bank.code : null,
            bankLogo: inst.bank ? inst.bank.logoAsset : null,
            paymentDate: inst.paymentDate,
            receiptNumber: inst.receiptNumber,
            notes: inst.notes
          };
        })
      : [];

    const totalDebt = downPaymentDecimal.plus(installmentTotal);
    const totalPaid = downPaymentDecimal.plus(installmentPaid);
    const remainingDebt = totalDebt.minus(totalPaid);

    return {
      memberId: member.id,
      fullName: member.fullName,
      sequenceFormatted: member.sequenceNumber.toString().padStart(3, '0'),
      phone: member.phone,
      plotSize: plotSizeDecimal.toFixed(2),
      downPayment: downPaymentDecimal.toFixed(2),
      totalDebt: totalDebt.toFixed(2),
      totalPaid: totalPaid.toFixed(2),
      remainingDebt: remainingDebt.toFixed(2),
      totalInstallmentsCount: totalCount,
      paidInstallmentsCount: paidCount,
      remainingInstallmentsCount: totalCount - paidCount,
      activePlan: activePlan
        ? {
            id: activePlan.id,
            totalInstallments: activePlan.totalInstallments,
            createdAt: activePlan.createdAt,
            installments: formattedInstallments
          }
        : null
    };
  }

  public static async updateFinancialBasic(
    prisma: PrismaClient,
    adminId: string,
    memberId: string,
    data: { plotSize?: string; downPayment?: string }
  ): Promise<void> {
    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member || member.isDeleted) throw new Error('Üye bulunamadı.');

    const plotDecimal = data.plotSize ? new Decimal(data.plotSize) : undefined;
    const downPaymentDecimal = data.downPayment ? new Decimal(data.downPayment) : undefined;

    await prisma.memberPrivateFinancial.upsert({
      where: { memberId },
      update: {
        ...(plotDecimal !== undefined ? { plotSize: plotDecimal.toNumber() } : {}),
        ...(downPaymentDecimal !== undefined ? { downPayment: downPaymentDecimal.toNumber() } : {})
      },
      create: {
        memberId,
        plotSize: plotDecimal ? plotDecimal.toNumber() : 0,
        downPayment: downPaymentDecimal ? downPaymentDecimal.toNumber() : 0
      }
    });

    await AuditService.logEvent(prisma, 'FINANCIAL_UPDATE', 'ADMIN', adminId, memberId, {
      plotSize: data.plotSize,
      downPayment: data.downPayment
    });
  }

  public static async createInstallmentPlan(
    prisma: PrismaClient,
    adminId: string,
    memberId: string,
    planData: {
      totalInstallments: number;
      installmentAmount: string;
      startDate: string; // ISO date YYYY-MM-DD
    }
  ): Promise<void> {
    if (planData.totalInstallments <= 0 || planData.totalInstallments > 240) {
      throw new Error('Taksit sayısı 1 ile 240 arasında olmalıdır.');
    }

    const amountDecimal = new Decimal(planData.installmentAmount);
    if (amountDecimal.lessThanOrEqualTo(0)) {
      throw new Error('Taksit tutarı sıfırdan büyük olmalıdır.');
    }

    const baseDate = new Date(planData.startDate);
    if (isNaN(baseDate.getTime())) {
      throw new Error('Geçerli bir başlangıç tarihi belirtiniz.');
    }

    await prisma.$transaction(async (tx) => {
      let fin = await tx.memberPrivateFinancial.findUnique({ where: { memberId } });
      if (!fin) {
        fin = await tx.memberPrivateFinancial.create({
          data: { memberId, plotSize: 0, downPayment: 0 }
        });
      }

      // Archive existing active plans
      await tx.installmentPlan.updateMany({
        where: { privateFinancialId: fin.id, status: PlanStatus.ACTIVE },
        data: { status: PlanStatus.ARCHIVED }
      });

      // Create new active plan
      const newPlan = await tx.installmentPlan.create({
        data: {
          privateFinancialId: fin.id,
          totalInstallments: planData.totalInstallments,
          status: PlanStatus.ACTIVE
        }
      });

      // Create installment items
      for (let i = 1; i <= planData.totalInstallments; i++) {
        const dueDate = new Date(baseDate);
        dueDate.setMonth(dueDate.getMonth() + (i - 1));

        await tx.installment.create({
          data: {
            planId: newPlan.id,
            installmentNumber: i,
            amount: amountDecimal.toNumber(),
            dueDate,
            status: PaymentStatus.BEKLIYOR
          }
        });
      }
    });

    await AuditService.logEvent(prisma, 'INSTALLMENT_PLAN_CREATED', 'ADMIN', adminId, memberId, {
      totalInstallments: planData.totalInstallments,
      installmentAmount: planData.installmentAmount,
      startDate: planData.startDate
    });
  }

  public static async recordInstallmentPayment(
    prisma: PrismaClient,
    adminId: string,
    memberId: string,
    installmentId: string,
    paymentData: {
      status: PaymentStatus;
      bankId?: string | null;
      paymentDate?: string | null;
      receiptNumber?: string | null;
      notes?: string | null;
    }
  ): Promise<void> {
    const inst = await prisma.installment.findUnique({
      where: { id: installmentId },
      include: { plan: { include: { privateFinancial: true } } }
    });

    if (!inst || inst.plan.privateFinancial.memberId !== memberId) {
      throw new Error('Taksit kaydı bulunamadı.');
    }

    const payDate = paymentData.paymentDate ? new Date(paymentData.paymentDate) : (paymentData.status === PaymentStatus.ODENDI ? new Date() : null);

    await prisma.installment.update({
      where: { id: installmentId },
      data: {
        status: paymentData.status,
        bankId: paymentData.bankId || null,
        paymentDate: payDate,
        receiptNumber: paymentData.receiptNumber || null,
        notes: paymentData.notes || null
      }
    });

    await AuditService.logEvent(prisma, 'INSTALLMENT_PAYMENT_RECORDED', 'ADMIN', adminId, memberId, {
      installmentId,
      installmentNumber: inst.installmentNumber,
      status: paymentData.status,
      bankId: paymentData.bankId,
      receiptNumber: paymentData.receiptNumber
    });
  }

  public static async listBanks(prisma: PrismaClient) {
    return prisma.bank.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
  }

  public static async changePrivatePassword(
    prisma: PrismaClient,
    adminId: string,
    oldPass: string,
    newPass: string
  ): Promise<{ success: boolean; error?: string }> {
    const cred = await prisma.privateCredential.findFirst({ orderBy: { createdAt: 'desc' } });
    if (!cred) return { success: false, error: 'Özel parola kaydı bulunamadı.' };

    const isMatch = await SecurityService.verifyPassword(oldPass, cred.passwordHash);
    if (!isMatch) {
      await AuditService.logEvent(prisma, 'PRIVATE_PASSWORD_CHANGE_FAILED', 'ADMIN', adminId, null, { reason: 'Eski parola hatalı' });
      return { success: false, error: 'Mevcut özel parola hatalı.' };
    }

    if (!newPass || newPass.length < 6) {
      return { success: false, error: 'Yeni özel parola en az 6 karakter olmalıdır.' };
    }

    const newHash = await SecurityService.hashPassword(newPass);
    await prisma.privateCredential.update({
      where: { id: cred.id },
      data: {
        passwordHash: newHash,
        failedAttemptCount: 0,
        lockedUntil: null
      }
    });

    // Revoke all active private grants
    this.activeGrants.clear();
    await AuditService.logEvent(prisma, 'PRIVATE_PASSWORD_CHANGE_SUCCESS', 'ADMIN', adminId, null, { note: 'Tüm özel erişim izinleri iptal edildi.' });
    return { success: true };
  }
}
