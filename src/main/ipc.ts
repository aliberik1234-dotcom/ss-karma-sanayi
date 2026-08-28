import { ipcMain, app, BrowserWindow, dialog } from 'electron';
import path from 'path';
import fs from 'fs';
import http from 'http';
import { URL } from 'url';
import ExcelJS from 'exceljs';
import { google } from 'googleapis';
import { getPrismaClient, disconnectPrisma } from './db/prismaClient';
import { PostgresManager } from './db/postgresManager.js';
import { StartupLogger } from './services/loggerService.js';
import { AuthService } from './services/authService';
import { MemberService } from './services/memberService';
import { PrivateService } from './services/privateService';
import { AuditService } from './services/auditService';
import { NotificationService } from './services/notificationService';
import { PrintService } from './services/printService';
import { BackupService } from './services/backupService';
import { SecurityService } from './services/securityService';
import { ReceiptService } from './services/receiptService';

export function registerIpcHandlers(): void {
  const db = async () => {
    const prisma = await getPrismaClient();
    try {
      await prisma.$queryRaw`SELECT 1`;
      return prisma;
    } catch {
      StartupLogger.log('DB_RECONNECT', 'Veritabanı bağlantısı kopmuş, yeniden bağlanılıyor...');
      try {
        await disconnectPrisma();
      } catch {}
      const pg = PostgresManager.getInstance();
      try {
        await pg.start();
      } catch {
        StartupLogger.log('DB_RECONNECT', 'PostgreSQL zaten çalışıyor, devam ediliyor.');
      }
      return await getPrismaClient();
    }
  };

  const GOOGLE_REDIRECT_URI = 'http://localhost:38239/callback';

  const getGoogleDriveClient = async (prisma: any) => {
    const accessToken = await prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_TOKEN' } });
    const refreshToken = await prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_REFRESH' } });
    const enabled = await prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_ENABLED' } });

    if (enabled?.value !== 'true' || !accessToken?.value) {
      return { drive: null, accessToken: null, refreshToken: null };
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || clientId.startsWith('your-') || clientId.includes('your-')) {
      throw new Error('Google OAuth istemci ID\'si yapılandırılmamış. Lütfen .env dosyasındaki GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET değerlerini gerçek kimlik bilgilerinizle doldurun. Detaylı talimat: https://console.cloud.google.com/apis/credentials');
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, GOOGLE_REDIRECT_URI);
    oauth2Client.setCredentials({
      access_token: accessToken.value,
      refresh_token: refreshToken?.value,
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    return { drive, accessToken, refreshToken };
  };

  const uploadFileToGoogleDrive = async (prisma: any, filePath: string) => {
    const { drive } = await getGoogleDriveClient(prisma);
    if (!drive) {
      return { success: false, error: 'Bulut senkronizasyonu etkin değil.' };
    }

    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    const existing = await drive.files.list({
      q: `name='${fileName}' and trashed=false`,
      fields: 'files(id, name)',
    });

    const media = { mimeType: 'application/octet-stream', body: Buffer.from(fileContent) };

    let fileId: string;
    if (existing.data.files && existing.data.files.length > 0) {
      fileId = (existing.data.files[0].id as string) || '';
      await drive.files.update({ fileId, media });
    } else {
      const res = await drive.files.create({
        requestBody: { name: fileName, mimeType: 'application/octet-stream' },
        media,
        fields: 'id',
      });
      fileId = (res.data as any).id || '';
    }

    return { success: true, fileId, fileName };
  };

  const requireAdmin = (sessionToken: string) => {
    const auth = AuthService.validateSession(sessionToken);
    if (!auth.valid || auth.role !== 'ADMIN' || !auth.session) {
      throw new Error(auth.error || 'Bu işlem için Admin yetkisi gereklidir.');
    }
    return auth.session as any;
  };

  const requireAnySession = (sessionToken: string) => {
    const auth = AuthService.validateSession(sessionToken);
    if (!auth.valid) {
      throw new Error(auth.error || 'Geçerli bir oturum gereklidir.');
    }
    return auth;
  };

  ipcMain.handle('system:checkStatus', async () => {
    try {
      const prisma = await db();
      const adminCount = await prisma.adminUser.count();
      return {
        success: true,
        isSetupComplete: true,
        hasAdmin: adminCount > 0
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Veritabanı kontrol hatası' };
    }
  });

  ipcMain.handle('setup:complete', async () => {
    return { success: true, message: 'Kurulum sihirbazı kaldırıldı.' };
  });

  ipcMain.handle('auth:guestLogin', async () => {
    const session = AuthService.createGuestSession();
    return { success: true, token: session.token, role: 'GUEST' };
  });

  ipcMain.handle('auth:adminLogin', async (_, payload: { username: string; password: string; clientIp?: string }) => {
    try {
      const prisma = await db();
      const ip = payload.clientIp || '127.0.0.1';
      const result = await AuthService.adminLogin(prisma, payload.username, payload.password, ip);
      if (!result.success) {
        return { success: false, error: result.error, lockedUntil: result.lockedUntil };
      }
      return { success: true, token: result.token, role: 'ADMIN' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Giriş işlemi başarısız.' };
    }
  });

  ipcMain.handle('auth:logout', async (_, payload: { token: string }) => {
    const loggedOut = AuthService.logout(payload?.token);
    return { success: loggedOut };
  });

  ipcMain.handle('auth:validateSession', async (_, payload: { token: string }) => {
    const res = AuthService.validateSession(payload?.token);
    if (!res.valid) return { valid: false, error: res.error };
    return { valid: true, role: res.role, user: (res.session as any)?.displayName || 'Misafir' };
  });

  ipcMain.handle('dashboard:getStats', async (_, payload: { token: string }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();

      const totalMembers = await prisma.member.count({ where: { isDeleted: false } });

      const allInstallments = await prisma.installment.findMany({ include: { bank: true, plan: { include: { privateFinancial: { include: { member: true } } } } } });
      const banks = await prisma.bank.findMany({ where: { isActive: true } });

      let totalDebt = 0, totalPaid = 0;
      const yearStart = new Date(new Date().getFullYear(), 0, 1);

      for (const inst of allInstallments) {
        totalDebt += Number(inst.amount);
        if (inst.status === 'ODENDI' || inst.status === 'KISMI') {
          totalPaid += Number(inst.amount);
        }
      }

      const paidInstallments = allInstallments.filter((i) => i.status === 'ODENDI' || i.status === 'KISMI');

      const thisMonthPaid = paidInstallments
        .filter((i) => i.paymentDate && new Date(i.paymentDate) >= yearStart)
        .reduce((sum, i) => sum + Number(i.amount), 0);

      const recentPayments = paidInstallments
        .filter((i) => i.paymentDate)
        .sort((a, b) => new Date(b.paymentDate!).getTime() - new Date(a.paymentDate!).getTime())
        .slice(0, 10)
        .map((i) => ({
          receiptNumber: i.receiptNumber,
          memberName: i.plan?.privateFinancial?.member?.fullName || '',
          memberSequence: i.plan?.privateFinancial?.member?.sequenceNumber || 0,
          amount: Number(i.amount),
          bankName: i.bank?.name || '',
          paymentDate: i.paymentDate ? new Date(i.paymentDate).toISOString().slice(0, 10) : '',
        }));

      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const recentMembers = await prisma.member.findMany({
        where: { isDeleted: false, createdAt: { gte: oneWeekAgo.toISOString() } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });

      const bankDistribution = banks.map((bank) => {
        const bankInstallments = allInstallments.filter((i) => i.bankId === bank.id && (i.status === 'ODENDI' || i.status === 'KISMI'));
        const total = bankInstallments.reduce((sum, i) => sum + Number(i.amount), 0);
        return { bankName: bank.name, total };
      });

      return {
        success: true,
        stats: {
          totalMembers,
          totalDebt: totalDebt.toFixed(2),
          totalPaid: totalPaid.toFixed(2),
          remainingDebt: (totalDebt - totalPaid).toFixed(2),
          thisMonthPaid: thisMonthPaid.toFixed(2),
          recentPayments,
          recentMembers,
          bankDistribution,
        },
      };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('dashboard:getOverdue', async (_, payload: {
    token: string;
    filter?: 'all' | 'overdue' | 'today' | 'week' | 'month' | 'paid' | 'partial' | 'unpaid';
  }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const where: any = {};
      switch (payload.filter) {
        case 'overdue':
          where.dueDate = { lt: today };
          where.status = { not: 'ODENDI' };
          break;
        case 'today':
          where.dueDate = today;
          break;
        case 'week':
          where.dueDate = { gte: today, lte: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) };
          break;
        case 'month':
          where.dueDate = { gte: today, lte: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000) };
          break;
        case 'paid':
          where.status = 'ODENDI';
          break;
        case 'partial':
          where.status = 'KISMI';
          break;
        case 'unpaid':
          where.status = 'BEKLIYOR';
          break;
      }

      const installments = await prisma.installment.findMany({
        where,
        include: { plan: { include: { privateFinancial: { include: { member: true } } } }, bank: true },
        orderBy: { dueDate: 'asc' },
      });

      const items = installments.map((i) => {
        const member = i.plan?.privateFinancial?.member;
        const totalAmount = Number(i.amount);
        const paid = (i.status === 'ODENDI' || i.status === 'KISMI') ? totalAmount : 0;
        const remaining = totalAmount - paid;
        const isOverdue = i.dueDate < today && i.status !== 'ODENDI';
        let status: string;
        let statusColor: string;
        if (i.status === 'ODENDI') { status = 'Ödenmiş'; statusColor = 'emerald'; }
        else if (i.status === 'KISMI') { status = 'Kısmi Ödeme'; statusColor = 'amber'; }
        else if (isOverdue) { status = 'Gecikmiş'; statusColor = 'rose'; }
        else { status = 'Ödenmemiş'; statusColor = 'slate'; }

        return {
          id: i.id,
          memberName: member?.fullName || '',
          memberSequence: member?.sequenceNumber || 0,
          memberNumber: member?.memberNumber || `UYE-${member?.sequenceNumber || ''}`,
          installmentNumber: i.installmentNumber,
          dueDate: i.dueDate.toISOString().slice(0, 10),
          totalAmount: totalAmount.toFixed(2),
          paid: paid.toFixed(2),
          remaining: remaining.toFixed(2),
          status,
          statusColor,
          bankName: i.bank?.name || '',
          isOverdue,
        };
      });

      return { success: true, items };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('members:searchGlobal', async (_, payload: {
    token: string;
    query: string;
    role: 'admin' | 'guest';
  }) => {
    try {
      requireAnySession(payload.token);
      const prisma = await db();
      const members = await prisma.member.findMany({
        where: {
          OR: [
            { fullName: { contains: payload.query, mode: 'insensitive' } },
            { phone: { contains: payload.query, mode: 'insensitive' } },
            { memberNumber: { contains: payload.query, mode: 'insensitive' } },
          ],
          isDeleted: false,
        },
        take: 50,
        orderBy: { createdAt: 'desc' },
      });

      const results: any[] = [];
      for (const m of members) {
        const entry: any = {
          type: 'member',
          id: m.id,
          sequenceNumber: m.sequenceNumber,
          fullName: m.fullName,
          phone: m.phone,
          memberNumber: m.memberNumber,
        };
        if (payload.role === 'admin') {
          const fin = await prisma.memberPrivateFinancial.findUnique({ where: { memberId: m.id } });
          const plan = fin ? await prisma.installmentPlan.findFirst({ where: { privateFinancialId: fin.id } }) : null;
          const installments = plan ? await prisma.installment.findMany({ where: { planId: plan.id }, orderBy: { dueDate: 'asc' } }) : [];
          const totalPaid = installments.filter((i: any) => i.status === 'ODENDI' || i.status === 'KISMI').reduce((s: number, i: any) => s + Number(i.amount), 0);
          entry.financial = {
            plotSize: fin?.plotSize?.toString() || '',
            downPayment: fin?.downPayment?.toString() || '',
            totalInstallments: plan?.totalInstallments || 0,
            totalPaid,
          };
        }
        results.push(entry);
      }

      if (payload.role === 'admin') {
        const banks = await prisma.bank.findMany({
          where: { name: { contains: payload.query, mode: 'insensitive' }, isActive: true },
          take: 20,
        });
        banks.forEach((bank) => {
          results.push({ type: 'bank', id: bank.id, name: bank.name, code: bank.code });
        });
      }

      return { success: true, results };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('members:list', async (_, payload: {
    token: string;
    search?: string;
    sortBy?: 'name_asc' | 'name_desc' | 'seq_asc' | 'seq_desc';
  }) => {
    try {
      requireAnySession(payload.token);
      const prisma = await db();
      const list = await MemberService.listMembers(prisma, {
        search: payload.search,
        sortBy: payload.sortBy
      });
      return { success: true, members: list };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('members:getNextSequence', async (_, payload: { token: string }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();
      const seq = await MemberService.getNextAvailableSequenceNumber(prisma);
      return { success: true, sequenceNumber: seq, sequenceFormatted: seq.toString().padStart(3, '0') };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('members:create', async (_, payload: {
    token: string;
    fullName: string;
    phone: string;
    sequenceNumber?: number;
  }) => {
    try {
       const admin = requireAdmin(payload.token);
      const prisma = await db();
      const year = new Date().getFullYear();
      const counterKey = `COUNTER_UYE_${year}`;
      const existingCounter = await prisma.appSettings.findUnique({ where: { key: counterKey } });
      const nextNum = (parseInt(existingCounter?.value || '0', 10) + 1);
      await prisma.appSettings.upsert({
        where: { key: counterKey },
        update: { value: nextNum.toString() },
        create: { key: counterKey, value: nextNum.toString() },
      });
      const memberNumber = `UYE-${year}-${String(nextNum).padStart(6, '0')}`;

      const member = await MemberService.createMember(prisma, admin.adminId, {
        fullName: payload.fullName,
        phone: payload.phone,
        sequenceNumber: payload.sequenceNumber,
        memberNumber,
      });
      return { success: true, member, number: memberNumber };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('members:update', async (_, payload: {
    token: string;
    id: string;
    fullName?: string;
    phone?: string;
    sequenceNumber?: number;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      const prisma = await db();
      const updated = await MemberService.updateMember(prisma, admin.adminId, payload.id, {
        fullName: payload.fullName,
        phone: payload.phone,
        sequenceNumber: payload.sequenceNumber
      });
      return { success: true, member: updated };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('members:delete', async (_, payload: { token: string; id: string }) => {
    try {
      const admin = requireAdmin(payload.token);
      const prisma = await db();
      await MemberService.deleteMember(prisma, admin.adminId, payload.id);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('private:verifyPassword', async (_, payload: {
    token: string;
    memberId: string;
    password: string;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      const prisma = await db();
      const result = await PrivateService.verifyPrivatePassword(prisma, admin.adminId, payload.memberId, payload.password);
      return result;
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('private:getFinancial', async (_, payload: {
    token: string;
    grantToken: string;
    memberId: string;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      const isValidGrant = PrivateService.validateGrant(payload.grantToken, admin.adminId, payload.memberId);
      if (!isValidGrant) {
        throw new Error('Özel erişim süresi dolmuş veya geçersiz. Lütfen özel parolayı tekrar giriniz.');
      }

      const prisma = await db();
      const summary = await PrivateService.getMemberFinancialDetails(prisma, payload.memberId);
      return { success: true, data: summary };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('private:updateBasic', async (_, payload: {
    token: string;
    grantToken: string;
    memberId: string;
    plotSize?: string;
    downPayment?: string;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      if (!PrivateService.validateGrant(payload.grantToken, admin.adminId, payload.memberId)) {
        throw new Error('Özel erişim süresi dolmuş veya geçersiz.');
      }

      const prisma = await db();
      await PrivateService.updateFinancialBasic(prisma, admin.adminId, payload.memberId, {
        plotSize: payload.plotSize,
        downPayment: payload.downPayment
      });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('private:createPlan', async (_, payload: {
    token: string;
    grantToken: string;
    memberId: string;
    totalInstallments: number;
    installmentAmount: string;
    startDate: string;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      if (!PrivateService.validateGrant(payload.grantToken, admin.adminId, payload.memberId)) {
        throw new Error('Özel erişim süresi dolmuş veya geçersiz.');
      }

      const prisma = await db();
      await PrivateService.createInstallmentPlan(prisma, admin.adminId, payload.memberId, {
        totalInstallments: payload.totalInstallments,
        installmentAmount: payload.installmentAmount,
        startDate: payload.startDate
      });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('private:recordPayment', async (_, payload: {
    token: string;
    grantToken: string;
    memberId: string;
    installmentId: string;
    status: any;
    bankId?: string | null;
    paymentDate?: string | null;
    receiptNumber?: string | null;
    notes?: string | null;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      if (!PrivateService.validateGrant(payload.grantToken, admin.adminId, payload.memberId)) {
        throw new Error('Özel erişim süresi dolmuş veya geçersiz.');
      }

      const prisma = await db();
      let receiptNumber = payload.receiptNumber;
      if (!receiptNumber && payload.status === 'ODENDI') {
        const year = new Date().getFullYear();
        const counterKey = `COUNTER_THS_${year}`;
        const existingCounter = await prisma.appSettings.findUnique({ where: { key: counterKey } });
        const nextNum = (parseInt(existingCounter?.value || '0', 10) + 1);
        await prisma.appSettings.upsert({
          where: { key: counterKey },
          update: { value: nextNum.toString() },
          create: { key: counterKey, value: nextNum.toString() },
        });
        receiptNumber = `THS-${year}-${String(nextNum).padStart(6, '0')}`;
      }

      await PrivateService.recordInstallmentPayment(prisma, admin.adminId, payload.memberId, payload.installmentId, {
        status: payload.status,
        bankId: payload.bankId,
        paymentDate: payload.paymentDate,
        receiptNumber: receiptNumber || undefined,
        notes: payload.notes
      });
      return { success: true, receiptNumber };
    } catch (err: any) {
      return { success: false, error: err.message };
     }
  });

  ipcMain.handle('private:generateReceipt', async (_, payload: {
    token: string;
    grantToken: string;
    memberId: string;
    installmentId: string;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      if (!PrivateService.validateGrant(payload.grantToken, admin.adminId, payload.memberId)) {
        throw new Error('Özel erişim süresi dolmuş veya geçersiz.');
      }
      const prisma = await db();
      const installment = await prisma.installment.findUnique({
        where: { id: payload.installmentId },
        include: { plan: { include: { privateFinancial: { include: { member: true } } } }, bank: true },
      });
      if (!installment) throw new Error('Taksit bulunamadı.');
      const member = installment.plan.privateFinancial.member;
      const memberNumber = member.memberNumber || `UYE-${member.sequenceNumber}`;

      const pdfBuffer = await ReceiptService.generateReceiptPDF({
        memberName: member.fullName,
        memberNumber: memberNumber,
        memberPhone: member.phone,
        installmentNumber: installment.installmentNumber,
        dueDate: installment.dueDate.toISOString().slice(0, 10),
        amount: installment.amount.toString(),
        paymentDate: installment.paymentDate ? installment.paymentDate.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        bankName: installment.bank?.name || '',
        receiptNumber: installment.receiptNumber || '',
      });

      return { success: true, pdfBase64: pdfBuffer.toString('base64') };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

   ipcMain.handle('private:listBanks', async (_, payload: { token: string }) => {
    try {
      requireAnySession(payload.token);
      const prisma = await db();
      const banks = await PrivateService.listBanks(prisma);
      return { success: true, banks };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('print:memberReport', async (_, payload: {
    token: string;
    grantToken: string;
    memberId: string;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      if (!PrivateService.validateGrant(payload.grantToken, admin.adminId, payload.memberId)) {
        throw new Error('Yazdırma işlemi için özel erişim izni gereklidir.');
      }

      const prisma = await db();
      const summary = await PrivateService.getMemberFinancialDetails(prisma, payload.memberId);
      const htmlContent = PrintService.generatePrintableHtml(summary);

      const printWindow = new BrowserWindow({
        show: true,
        width: 900,
        height: 800,
        title: `S.S. Karma Sanayi Sitesi - ${summary.fullName} Ekstresi`,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true
        }
      });

      printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('settings:changeAdminPassword', async (_, payload: {
    token: string;
    oldPass: string;
    newPass: string;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      const prisma = await db();
      return await AuthService.changeAdminPassword(prisma, admin.adminId, payload.oldPass, payload.newPass);
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('settings:changeAdminUsername', async (_, payload: {
    token: string;
    newUsername: string;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      const prisma = await db();
      return await AuthService.changeAdminUsername(prisma, admin.adminId, payload.newUsername);
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('settings:changePrivatePassword', async (_, payload: {
    token: string;
    oldPass: string;
    newPass: string;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      const prisma = await db();
      return await PrivateService.changePrivatePassword(prisma, admin.adminId, payload.oldPass, payload.newPass);
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('settings:getAuditLogs', async (_, payload: {
    token: string;
    filter?: { user?: string; action?: string; dateFrom?: string; dateTo?: string; success?: boolean };
    take?: number;
  }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();
      const where: any = {};
      if (payload.filter?.user) where.user = { contains: payload.filter.user, mode: 'insensitive' };
      if (payload.filter?.action) where.action = { contains: payload.filter.action, mode: 'insensitive' };
      if (payload.filter?.success !== undefined) where.success = payload.filter.success;
      if (payload.filter?.dateFrom || payload.filter?.dateTo) {
        where.createdAt = {};
        if (payload.filter.dateFrom) where.createdAt.gte = new Date(payload.filter.dateFrom);
        if (payload.filter.dateTo) where.createdAt.lte = new Date(payload.filter.dateTo);
      }
      const logs = await prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: payload.take || 100,
      });
      return { success: true, logs };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('settings:verifyAuditChain', async (_, payload: { token: string }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();
      const result = await AuditService.verifyAuditChain(prisma);
      return { success: true, result };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('settings:generateNumber', async (_, payload: { token: string; prefix: 'THS' | 'UYE' | 'BKP' }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();
      const year = new Date().getFullYear();
      const counterKey = `COUNTER_${payload.prefix}_${year}`;
      const existing = await prisma.appSettings.findUnique({ where: { key: counterKey } });
      const nextNum = existing ? parseInt(existing.value, 10) + 1 : 1;
      await prisma.appSettings.upsert({
        where: { key: counterKey },
        update: { value: nextNum.toString() },
        create: { key: counterKey, value: nextNum.toString() },
      });
      return { success: true, number: `${payload.prefix}-${year}-${String(nextNum).padStart(6, '0')}` };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('settings:createBackup', async (_, payload: { token: string }) => {
    try {
      const admin = requireAdmin(payload.token);
      const prisma = await db();
      const backup = await BackupService.createBackup(prisma, admin.adminId);
      await prisma.appSettings.upsert({
        where: { key: 'LAST_BACKUP_HEALTH' },
        update: { value: JSON.stringify({ status: 'success', timestamp: new Date().toISOString(), checksum: backup.checksum }) },
        create: { key: 'LAST_BACKUP_HEALTH', value: JSON.stringify({ status: 'success', timestamp: new Date().toISOString(), checksum: backup.checksum }) },
      });
      return { success: true, backup, number: backup.number };
    } catch (err: any) {
      try {
        const prisma = await db();
        await prisma.appSettings.upsert({
          where: { key: 'LAST_BACKUP_HEALTH' },
          update: { value: JSON.stringify({ status: 'failed', timestamp: new Date().toISOString(), error: err.message }) },
          create: { key: 'LAST_BACKUP_HEALTH', value: JSON.stringify({ status: 'failed', timestamp: new Date().toISOString(), error: err.message }) },
        });
      } catch {}
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('settings:restoreBackup', async (_, payload: {
    token: string;
    encryptedBackup: string;
    checksum?: string;
  }) => {
    try {
      const admin = requireAdmin(payload.token);
      const prisma = await db();
      const res = await BackupService.restoreBackup(prisma, admin.adminId, payload.encryptedBackup, payload.checksum);
      return res;
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('settings:getPreferences', async () => {
    try {
      const prisma = await db();
      const theme = await prisma.appSettings.findUnique({ where: { key: 'APP_THEME' } });
      const sound = await prisma.appSettings.findUnique({ where: { key: 'APP_SOUND' } });
      return {
        success: true,
        theme: theme?.value || 'system',
        sound: sound?.value !== 'false'
      };
    } catch {
      return { success: true, theme: 'system', sound: true };
    }
  });

  ipcMain.handle('settings:savePreferences', async (_, payload: { theme?: string; sound?: boolean }) => {
    try {
      const prisma = await db();
      if (payload.theme) {
        await prisma.appSettings.upsert({
          where: { key: 'APP_THEME' },
          update: { value: payload.theme },
          create: { key: 'APP_THEME', value: payload.theme }
        });
      }
      if (payload.sound !== undefined) {
        await prisma.appSettings.upsert({
          where: { key: 'APP_SOUND' },
          update: { value: payload.sound ? 'true' : 'false' },
          create: { key: 'APP_SOUND', value: payload.sound ? 'true' : 'false' }
        });
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('settings:getAutoBackupConfig', async () => {
    try {
      const prisma = await db();
      const [enabled, backupPath, interval] = await Promise.all([
        prisma.appSettings.findUnique({ where: { key: 'AUTO_BACKUP_ENABLED' } }),
        prisma.appSettings.findUnique({ where: { key: 'AUTO_BACKUP_PATH' } }),
        prisma.appSettings.findUnique({ where: { key: 'AUTO_BACKUP_INTERVAL' } }),
      ]);
      return {
        success: true,
        config: {
          enabled: enabled?.value === 'true',
          backupPath: backupPath?.value || '',
          intervalHours: parseInt(interval?.value || '12', 10),
        },
      };
    } catch {
      return { success: true, config: { enabled: false, backupPath: '', intervalHours: 12 } };
    }
  });

  ipcMain.handle('settings:saveAutoBackupConfig', async (_, payload: {
    token: string;
    enabled: boolean;
    backupPath: string;
    intervalHours: number;
  }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();
      const sets = [
        { key: 'AUTO_BACKUP_ENABLED', value: payload.enabled ? 'true' : 'false' },
        { key: 'AUTO_BACKUP_PATH', value: payload.backupPath },
        { key: 'AUTO_BACKUP_INTERVAL', value: payload.intervalHours.toString() },
      ];
      for (const s of sets) {
        await prisma.appSettings.upsert({
          where: { key: s.key },
          update: { value: s.value },
          create: { key: s.key, value: s.value },
        });
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('settings:selectBackupDirectory', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (!result.canceled && result.filePaths[0]) {
      return { success: true, path: result.filePaths[0] };
    }
    return { success: false, error: 'İşlem iptal edildi' };
  });

  ipcMain.handle('settings:validateBackupPath', async () => {
    try {
      const prisma = await db();
      const backupPath = await prisma.appSettings.findUnique({ where: { key: 'AUTO_BACKUP_PATH' } });
      const enabled = await prisma.appSettings.findUnique({ where: { key: 'AUTO_BACKUP_ENABLED' } });
      if (enabled?.value === 'true' && backupPath?.value) {
        const exists = fs.existsSync(backupPath.value);
        if (!exists) {
          return { valid: false, message: `Yedekleme klasörü bulunamadı: ${backupPath.value}\nLütfen yeni bir dosya yolu seçin.` };
        }
      }
      return { valid: true };
    } catch {
      return { valid: true };
    }
  });

  ipcMain.handle('settings:getBackupHealth', async () => {
    try {
      const prisma = await db();
      const health = await prisma.appSettings.findUnique({ where: { key: 'LAST_BACKUP_HEALTH' } });
      if (!health) return { success: true, health: null };
      return { success: true, health: JSON.parse(health.value) };
    } catch {
      return { success: true, health: null };
    }
  });

  ipcMain.handle('settings:saveCloudSyncInterval', async (_, payload: { token: string; intervalHours: number }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();
      await prisma.appSettings.upsert({
        where: { key: 'CLOUD_SYNC_INTERVAL' },
        update: { value: payload.intervalHours.toString() },
        create: { key: 'CLOUD_SYNC_INTERVAL', value: payload.intervalHours.toString() },
      });
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('data:exportExcel', async (_, payload: { token: string; password?: string }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();

      const [
        members,
        financials,
        plans,
        installments,
        banks,
        auditLogs,
        securityEvents,
        settings,
      ] = await Promise.all([
        prisma.member.findMany({ where: { isDeleted: false } }),
        prisma.memberPrivateFinancial.findMany(),
        prisma.installmentPlan.findMany(),
        prisma.installment.findMany({ include: { bank: true } }),
        prisma.bank.findMany({ where: { isActive: true } }),
        prisma.auditLog.findMany({ take: 500, orderBy: { createdAt: 'desc' } }),
        prisma.securityEvent.findMany({ take: 200, orderBy: { createdAt: 'desc' } }),
        prisma.appSettings.findMany(),
      ]);

      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'S.S. Karma Saneyi Sitesi';
      workbook.created = new Date();

      const financialMap = new Map(financials.map((f) => [f.memberId, f]));
      const financialIdToMemberMap = new Map(financials.map((f) => [f.id, f.memberId]));
      const installmentsByPlan = new Map<string, typeof installments>();
      installments.forEach((i) => {
        const arr = installmentsByPlan.get(i.planId) || [];
        arr.push(i);
        installmentsByPlan.set(i.planId, arr);
      });

      const wsMembers = workbook.addWorksheet('Üyeler');
      wsMembers.columns = [
        { header: 'Sıra No', key: 'seq', width: 10 },
        { header: 'Ad Soyad', key: 'name', width: 30 },
        { header: 'Telefon', key: 'phone', width: 20 },
        { header: 'Tapı Sqn.', key: 'plotSize', width: 12 },
        { header: 'Peşinat', key: 'downPayment', width: 15 },
        { header: 'Toplam Taksit', key: 'totalInstallments', width: 12 },
        { header: 'Taksit Tutarı', key: 'installmentAmount', width: 15 },
        { header: 'Toplam Tutar', key: 'totalAmount', width: 15 },
        { header: 'Ödenen', key: 'totalPaid', width: 15 },
        { header: 'Kalan', key: 'remaining', width: 15 },
        { header: 'Durum', key: 'status', width: 12 },
        { header: 'Oluşturma', key: 'createdAt', width: 12 },
        { header: 'Güncelleme', key: 'updatedAt', width: 12 },
      ];
      members.forEach((m) => {
        const fin = financialMap.get(m.id);
        const financialId = fin?.id;
        const plan = plans.find((p) => p.privateFinancialId === financialId);
        const planInstallments = plan ? (installmentsByPlan.get(plan.id) || []) : [];
        const totalPaid = planInstallments.filter((i) => i.status === 'ODENDI').reduce((sum: number, i: typeof installments[number]) => sum + Number(i.amount), 0);
        const totalAmount = planInstallments.reduce((sum: number, i: typeof installments[number]) => sum + Number(i.amount), 0);
        const remaining = totalAmount - totalPaid;
        const status = planInstallments.length === 0 ? 'Plan Yok' : planInstallments.every((i) => i.status === 'ODENDI') ? 'Tamamlandı' : planInstallments.some((i) => i.status === 'GECIKMIS') ? 'Gecikmiş' : planInstallments.some((i) => i.status === 'KISMI') ? 'Kısmi' : 'Bekliyor';

        wsMembers.addRow({
          seq: m.sequenceNumber,
          name: m.fullName,
          phone: m.phone,
          plotSize: fin?.plotSize?.toString() || '',
          downPayment: fin?.downPayment?.toString() || '',
          totalInstallments: plan?.totalInstallments || '',
          installmentAmount: planInstallments.length > 0 ? planInstallments[0].amount.toString() : '',
          totalAmount: totalAmount.toFixed(2),
          totalPaid: totalPaid.toFixed(2),
          remaining: remaining.toFixed(2),
          status,
          createdAt: m.createdAt.toISOString().slice(0, 10),
          updatedAt: m.updatedAt.toISOString().slice(0, 10),
        });
      });

      const wsFinancials = workbook.addWorksheet('Finansal Bilgiler');
      wsFinancials.columns = [
        { header: 'Üye ID', key: 'memberId', width: 36 },
        { header: 'Tapı Sqn.', key: 'plotSize', width: 15 },
        { header: 'Peşinat', key: 'downPayment', width: 15 },
        { header: 'Oluşturma', key: 'createdAt', width: 20 },
      ];
      financials.forEach((f) => {
        wsFinancials.addRow({
          memberId: f.memberId,
          plotSize: f.plotSize?.toString() || '',
          downPayment: f.downPayment?.toString() || '',
          createdAt: f.createdAt.toISOString().slice(0, 10),
        });
      });

      const wsPlans = workbook.addWorksheet('Taksit Planları');
      wsPlans.columns = [
        { header: 'Plan ID', key: 'id', width: 36 },
        { header: 'Üye ID', key: 'memberId', width: 36 },
        { header: 'Toplam Taksit', key: 'total', width: 12 },
        { header: 'Durum', key: 'status', width: 12 },
        { header: 'Oluşturma', key: 'createdAt', width: 20 },
      ];
      plans.forEach((p) => {
        wsPlans.addRow({
          id: p.id,
          memberId: financialIdToMemberMap.get(p.privateFinancialId) || p.privateFinancialId,
          total: p.totalInstallments,
          status: p.status,
          createdAt: p.createdAt.toISOString().slice(0, 10),
        });
      });

      const wsInstallments = workbook.addWorksheet('Taksitler');
      wsInstallments.columns = [
        { header: 'Taksit ID', key: 'id', width: 36 },
        { header: 'Plan ID', key: 'planId', width: 36 },
        { header: 'No', key: 'number', width: 8 },
        { header: 'Vade', key: 'dueDate', width: 15 },
        { header: 'Tutar', key: 'amount', width: 15 },
        { header: 'Durum', key: 'status', width: 12 },
        { header: 'Ödeme', key: 'paidDate', width: 15 },
        { header: 'Banka', key: 'bank', width: 20 },
        { header: 'Dekont', key: 'receipt', width: 20 },
      ];
      installments.forEach((i) => {
        wsInstallments.addRow({
          id: i.id,
          planId: i.planId,
          number: i.installmentNumber,
          dueDate: i.dueDate ? i.dueDate.toISOString().slice(0, 10) : '',
          amount: i.amount.toString(),
          status: i.status,
          paidDate: i.paymentDate ? i.paymentDate.toISOString().slice(0, 10) : '',
          bank: i.bank?.name || i.bankId || '',
          receipt: i.receiptNumber || '',
        });
      });

      const wsBanks = workbook.addWorksheet('Bankalar');
      wsBanks.columns = [
        { header: 'Banka Adı', key: 'name', width: 25 },
        { header: 'Kod', key: 'code', width: 8 },
        { header: 'Logo', key: 'logo', width: 30 },
        { header: 'Aktif', key: 'active', width: 8 },
      ];
      banks.forEach((b) => {
        wsBanks.addRow({ name: b.name, code: b.code, logo: b.logoAsset || '', active: b.isActive ? 'Evet' : 'Hayır' });
      });

      const wsAudit = workbook.addWorksheet('Denetim Kayıtları');
      wsAudit.columns = [
        { header: 'Olay Tipi', key: 'eventType', width: 25 },
        { header: 'Erişim Yapan', key: 'actorType', width: 15 },
        { header: 'Aktör ID', key: 'actorId', width: 36 },
        { header: 'Üye ID', key: 'memberId', width: 36 },
        { header: 'Metadata', key: 'metadata', width: 40 },
        { header: 'Tarih', key: 'createdAt', width: 20 },
      ];
      auditLogs.forEach((a) => {
        wsAudit.addRow({
          eventType: a.eventType,
          actorType: a.actorType,
          actorId: a.actorId || '',
          memberId: a.memberId || '',
          metadata: a.metadata || '',
          createdAt: a.createdAt.toISOString().slice(0, 19),
        });
      });

      const wsSecurity = workbook.addWorksheet('Güvenlik Olayları');
      wsSecurity.columns = [
        { header: 'Tip', key: 'type', width: 20 },
        { header: 'Önem', key: 'severity', width: 15 },
        { header: 'Mesaj', key: 'message', width: 50 },
        { header: 'Çözüldü', key: 'resolved', width: 12 },
        { header: 'Oluşturma', key: 'createdAt', width: 20 },
      ];
      securityEvents.forEach((s) => {
        wsSecurity.addRow({
          type: s.type,
          severity: s.severity,
          message: s.message,
          resolved: s.resolvedAt ? 'Evet' : 'Hayır',
          createdAt: s.createdAt.toISOString().slice(0, 19),
        });
      });

      const wsSettings = workbook.addWorksheet('Uygulama Ayarları');
      wsSettings.columns = [
        { header: 'Anahtar', key: 'key', width: 30 },
        { header: 'Değer', key: 'value', width: 50 },
        { header: 'Şifreli', key: 'encrypted', width: 10 },
      ];
      settings.forEach((s) => {
        wsSettings.addRow({
          key: s.key,
          value: s.isEncrypted ? '[ŞİFRELİ]' : s.value,
          encrypted: s.isEncrypted ? 'Evet' : 'Hayır',
        });
      });

      if (payload.password) {
        [wsMembers, wsFinancials, wsPlans, wsInstallments, wsBanks, wsAudit, wsSecurity, wsSettings].forEach((ws) => {
          ws.protect(payload.password!, {});
        });
      }

       const buffer = await workbook.xlsx.writeBuffer();
      const base64 = Buffer.from(buffer as unknown as Buffer).toString('base64');
      return { success: true, excelBase64: base64 };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  const GOOGLE_SCOPES = ['https://www.googleapis.com/auth/drive.file'];

  let authServer: http.Server | null = null;

  ipcMain.handle('cloud:getConfig', async () => {
    try {
      const prisma = await db();
      const [enabled, email, accessToken, refreshToken] = await Promise.all([
        prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_ENABLED' } }),
        prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_EMAIL' } }),
        prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_TOKEN' } }),
        prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_REFRESH' } }),
      ]);
      return {
        success: true,
        config: {
          enabled: enabled?.value === 'true',
          email: email?.value || null,
          accessToken: accessToken?.value || null,
          refreshToken: refreshToken?.value || null,
        },
      };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('cloud:setConfig', async (_, payload: { token: string; enabled: boolean; email?: string; accessToken?: string; refreshToken?: string }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();
      await prisma.appSettings.upsert({
        where: { key: 'CLOUD_SYNC_ENABLED' },
        update: { value: payload.enabled ? 'true' : 'false' },
        create: { key: 'CLOUD_SYNC_ENABLED', value: payload.enabled ? 'true' : 'false' },
      });
      if (payload.email !== undefined) {
        await prisma.appSettings.upsert({
          where: { key: 'CLOUD_SYNC_EMAIL' },
          update: { value: payload.email },
          create: { key: 'CLOUD_SYNC_EMAIL', value: payload.email },
        });
      }
      if (payload.accessToken !== undefined) {
        await prisma.appSettings.upsert({
          where: { key: 'CLOUD_SYNC_TOKEN' },
          update: { value: payload.accessToken, isEncrypted: true },
          create: { key: 'CLOUD_SYNC_TOKEN', value: payload.accessToken, isEncrypted: true },
        });
      }
      if (payload.refreshToken !== undefined) {
        await prisma.appSettings.upsert({
          where: { key: 'CLOUD_SYNC_REFRESH' },
          update: { value: payload.refreshToken, isEncrypted: true },
          create: { key: 'CLOUD_SYNC_REFRESH', value: payload.refreshToken, isEncrypted: true },
        });
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('cloud:googleAuth', async () => {
    try {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

      if (!clientId || clientId.startsWith('your-') || clientId.includes('your-')) {
        return {
          success: false,
          error: 'Google OAuth istemci ID\'si yapılandırılmamış veya geçersiz. Lütfen .env dosyasındaki GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET değerlerini gerçek kimlik bilgilerinizle doldurun. Detay için: https://console.cloud.google.com/apis/credentials',
        };
      }

      const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, GOOGLE_REDIRECT_URI);
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: GOOGLE_SCOPES,
        prompt: 'consent',
      });

      if (authServer) {
        authServer.close();
      }

      authServer = http.createServer(async (req, res) => {
        const urlObj = new URL(req.url || '', 'http://localhost:38239');
        const code = urlObj.searchParams.get('code');
        const error = urlObj.searchParams.get('error');

        if (code) {
          try {
            const { tokens } = await oauth2Client.getToken(code);
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<html><body style="font-family: sans-serif; padding: 20px; text-align: center;"><h2 style="color: green;">Google Drive bağlantısı başarılı!</h2><p>Bu pencereyi kapatabilirsiniz.</p></body></html>');

             const mainWindow = BrowserWindow.getFocusedWindow();
            if (mainWindow) {
              let gmail = tokens?.id_token || null;
              if (gmail) {
                try {
                  const payload = JSON.parse(Buffer.from(gmail.split('.')[1], 'base64').toString());
                  gmail = payload.email || gmail;
                } catch {
                  gmail = gmail;
                }
              }
              mainWindow.webContents.send('cloud:auth-result', {
                success: true,
                email: gmail,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
              });
            }
          } catch (e: any) {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<html><body style="font-family: sans-serif; padding: 20px; text-align: center;"><h2 style="color: red;">Kimlik doğrulama hatası!</h2></body></html>');
            const mainWindow = BrowserWindow.getFocusedWindow();
            if (mainWindow) {
              mainWindow.webContents.send('cloud:auth-result', { success: false, error: e.message });
            }
          }
        } else if (error) {
          res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end('<html><body style="font-family: sans-serif; padding: 20px; text-align: center;"><h2 style="color: red;">Yetki verilmedi!</h2></body></html>');
          const mainWindow = BrowserWindow.getFocusedWindow();
          if (mainWindow) {
            mainWindow.webContents.send('cloud:auth-result', { success: false, error: error });
          }
        } else {
          res.writeHead(404);
          res.end();
        }
      });

      authServer.listen(38239, () => {
        console.log('Google Drive OAuth callback server listening on port 38239');
      });

      return { success: true, authUrl };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('cloud:uploadBackup', async (_, payload: { token: string; filePath: string }) => {
    try {
       requireAdmin(payload.token);
      const prisma = await db();

      const result = await uploadFileToGoogleDrive(prisma, payload.filePath);
      return result;
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('cloud:downloadBackup', async (_, payload: { token: string }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();
      const accessToken = await prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_TOKEN' } });
      const refreshToken = await prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_REFRESH' } });

      if (!accessToken?.value) {
        return { success: false, message: 'Google Drive bağlantısı yok.' };
      }

      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
       if (!clientId || clientId.startsWith('your-') || clientId.includes('your-')) {
        return { success: false, message: 'Google OAuth istemci ID\'si yapılandırılmamış. Lütfen .env dosyasını kontrol edin.' };
      }

      const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, GOOGLE_REDIRECT_URI);
      oauth2Client.setCredentials({
        access_token: accessToken.value,
        refresh_token: refreshToken?.value,
      });

      const drive = google.drive({ version: 'v3', auth: oauth2Client });
      const list = await drive.files.list({
        q: "name contains 'SS_Karma_Saneyi_Yedek' and trashed=false",
        fields: 'files(id, name, createdTime)',
        orderBy: 'createdTime desc',
        pageSize: 20,
      });

      return { success: true, files: list.data.files };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('cloud:backupAndUpload', async (_, payload: { token: string }) => {
    try {
      requireAdmin(payload.token);
      const prisma = await db();
      const enabled = await prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_ENABLED' } });
      if (enabled?.value !== 'true') {
        return { success: false, error: 'Bulut senkronizasyonu etkin değil.' };
      }

      const admin = await prisma.adminUser.findFirst();
      if (!admin) return { success: false, error: 'Admin kullanıcı bulunamadı.' };

      const backup = await BackupService.createBackup(prisma, admin.id);
      const dateStr = new Date().toISOString().slice(0, 10);
      const tempDir = app.getPath('temp');
      const filePath = path.join(tempDir, `SS_Karma_Saneyi_Yedek_${dateStr}.enc`);
      fs.writeFileSync(filePath, backup.backupData);

      const uploadRes = await uploadFileToGoogleDrive(prisma, filePath);
      fs.unlinkSync(filePath);

      if (uploadRes.success) {
        return { success: true, fileName: uploadRes.fileName };
      }
      return { success: false, error: uploadRes.error };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });
}
