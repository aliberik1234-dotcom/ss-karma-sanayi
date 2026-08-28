import { PrismaClient } from '../../generated/prisma/index.js';
import { SecurityService } from './securityService';
import { AuditService } from './auditService';

export class BackupService {
  public static async createBackup(prisma: PrismaClient, adminId: string): Promise<{
    backupData: string;
    checksum: string;
    createdAt: Date;
    stats: any;
    number: string;
  }> {
    const [
      members,
      financials,
      plans,
      installments,
      banks,
      auditLogs,
      securityEvents,
      settings
    ] = await Promise.all([
      prisma.member.findMany(),
      prisma.memberPrivateFinancial.findMany(),
      prisma.installmentPlan.findMany(),
      prisma.installment.findMany(),
      prisma.bank.findMany(),
      prisma.auditLog.findMany(),
      prisma.securityEvent.findMany(),
      prisma.appSettings.findMany()
    ]);

    const backupPayload = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      generator: 'S.S. Karma Sanayi Sitesi Yönetim Sistemi',
      data: {
        members,
        financials,
        plans,
        installments,
        banks,
        auditLogs,
        securityEvents,
        settings
      }
    };

    const rawJson = JSON.stringify(backupPayload);
    const checksum = SecurityService.sha256(rawJson);
    const encryptedData = SecurityService.encrypt(rawJson);

    const stats = {
      memberCount: members.length,
      planCount: plans.length,
      installmentCount: installments.length,
      auditCount: auditLogs.length
    };

    await AuditService.logEvent(prisma, 'BACKUP_CREATED', 'ADMIN', adminId, null, { stats, checksum });

    const year = new Date().getFullYear();
    const counterKey = `COUNTER_BKP_${year}`;
    const existingCounter = await prisma.appSettings.findUnique({ where: { key: counterKey } });
    const nextNum = (parseInt(existingCounter?.value || '0', 10) + 1);
    await prisma.appSettings.upsert({
      where: { key: counterKey },
      update: { value: nextNum.toString() },
      create: { key: counterKey, value: nextNum.toString() },
    });
    const backupNumber = `BKP-${year}-${String(nextNum).padStart(6, '0')}`;

    return {
      backupData: encryptedData,
      checksum,
      createdAt: new Date(),
      stats,
      number: backupNumber,
    };
  }

  public static async restoreBackup(
    prisma: PrismaClient,
    adminId: string,
    encryptedBackup: string,
    expectedChecksum?: string
  ): Promise<{ success: boolean; message: string; stats?: any }> {
    let rawJson: string;
    try {
      rawJson = SecurityService.decrypt(encryptedBackup);
    } catch {
      throw new Error('Yedek dosyasının şifresi çözülemedi. Geçersiz veya bozuk dosya.');
    }

    const calculatedChecksum = SecurityService.sha256(rawJson);
    if (expectedChecksum && calculatedChecksum !== expectedChecksum) {
      throw new Error('Bütünlük (Checksum) doğrulaması başarısız. Yedek dosyası değiştirilmiş veya bozulmuş.');
    }

    const parsed = JSON.parse(rawJson);
    const { data } = parsed;
    if (!data || !data.members) {
      throw new Error('Geçersiz yedek içeriği formatı.');
    }

    await prisma.$transaction(async (tx) => {
      // Restore members & financials
      for (const m of data.members) {
        await tx.member.upsert({
          where: { id: m.id },
          update: {
            sequenceNumber: m.sequenceNumber,
            fullName: m.fullName,
            phone: m.phone,
            isDeleted: m.isDeleted
          },
          create: {
            id: m.id,
            sequenceNumber: m.sequenceNumber,
            fullName: m.fullName,
            phone: m.phone,
            isDeleted: m.isDeleted
          }
        });
      }

      if (data.financials) {
        for (const f of data.financials) {
          await tx.memberPrivateFinancial.upsert({
            where: { memberId: f.memberId },
            update: {
              plotSize: f.plotSize,
              downPayment: f.downPayment
            },
            create: {
              id: f.id,
              memberId: f.memberId,
              plotSize: f.plotSize,
              downPayment: f.downPayment
            }
          });
        }
      }
    });

    await AuditService.logEvent(prisma, 'BACKUP_RESTORED', 'ADMIN', adminId, null, {
      checksum: calculatedChecksum
    });

    return {
      success: true,
      message: 'Yedek başarıyla geri yüklendi ve veri bütünlüğü doğrulandı.',
      stats: {
        restoredMembers: data.members.length
      }
    };
  }
}
