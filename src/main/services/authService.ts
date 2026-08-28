import { PrismaClient } from '../../generated/prisma/index.js';
import { SecurityService } from './securityService.js';
import { AuditService } from './auditService.js';

export interface AdminSession {
  token: string;
  adminId: string;
  username: string;
  displayName: string;
  role: 'ADMIN';
  lastActivity: number;
}

export interface GuestSession {
  token: string;
  role: 'GUEST';
  createdAt: number;
}

export class AuthService {
  private static readonly SESSION_TIMEOUT_MS = 30 * 60 * 1000;
  private static readonly MAX_FAILED_ATTEMPTS = 5;
  private static readonly LOCKOUT_DURATION_MS = 5 * 60 * 1000;

  private static activeAdminSessions = new Map<string, AdminSession>();
  private static activeGuestSessions = new Map<string, GuestSession>();

  public static normalizeUsername(raw: string): string {
    if (!raw || typeof raw !== 'string') return '';
    return raw
      .trim()
      .replace(/İ/g, 'i')
      .replace(/I/g, 'ı')
      .replace(/Ğ/g, 'ğ')
      .replace(/Ü/g, 'ü')
      .replace(/Ş/g, 'ş')
      .replace(/Ö/g, 'ö')
      .replace(/Ç/g, 'ç')
      .toLowerCase()
      .replace(/ı/g, 'i')
      .normalize('NFKC');
  }

  public static validateSession(token: string): { valid: boolean; role?: 'ADMIN' | 'GUEST'; session?: any; error?: string } {
    if (!token) return { valid: false, error: 'Oturum anahtarı bulunamadı.' };

    const now = Date.now();
    if (this.activeAdminSessions.has(token)) {
      const session = this.activeAdminSessions.get(token)!;
      if (now - session.lastActivity > this.SESSION_TIMEOUT_MS) {
        this.activeAdminSessions.delete(token);
        return { valid: false, error: 'Oturumunuz 30 dakikalık hareketsizlik nedeniyle sonlandırıldı.' };
      }
      session.lastActivity = now;
      return { valid: true, role: 'ADMIN', session };
    }

    if (this.activeGuestSessions.has(token)) {
      const session = this.activeGuestSessions.get(token)!;
      return { valid: true, role: 'GUEST', session };
    }

    return { valid: false, error: 'Geçersiz veya süresi dolmuş oturum.' };
  }

  public static createGuestSession(): { token: string; role: 'GUEST' } {
    const token = `guest_${SecurityService.generateSecureToken(16)}`;
    const session: GuestSession = {
      token,
      role: 'GUEST',
      createdAt: Date.now()
    };
    this.activeGuestSessions.set(token, session);
    return { token, role: 'GUEST' };
  }

  public static async adminLogin(
    prisma: PrismaClient,
    rawUsername: string,
    password: string,
    clientIp = '127.0.0.1'
  ): Promise<{ success: boolean; token?: string; error?: string; lockedUntil?: Date }> {
    const canonical = this.normalizeUsername(rawUsername);
    if (!canonical || !password) {
      return { success: false, error: 'Kullanıcı adı ve şifre zorunludur.' };
    }

    const admin = await prisma.adminUser.findUnique({
      where: { username: canonical }
    });

    if (!admin) {
      await AuditService.logEvent(prisma, 'LOGIN_FAILED', 'SYSTEM', null, null, { username: canonical, reason: 'Kullanıcı bulunamadı' });
      return {
        success: false,
        error: 'Kullanıcı adı veya şifre hatalı.'
      };
    }

    const now = new Date();
    if (admin.lockedUntil && admin.lockedUntil > now) {
      const remainingSec = Math.ceil((admin.lockedUntil.getTime() - now.getTime()) / 1000);
      return {
        success: false,
        error: `Hesap çok sayıda hatalı deneme nedeniyle geçici olarak kilitlenmiştir. Lütfen ${remainingSec} saniye sonra tekrar deneyiniz.`,
        lockedUntil: admin.lockedUntil
      };
    }

    const isMatch = await SecurityService.verifyPassword(password, admin.passwordHash);
    if (!isMatch) {
      const newFailedCount = admin.failedLoginCount + 1;
      let lockDate: Date | null = null;

      if (newFailedCount >= this.MAX_FAILED_ATTEMPTS) {
        lockDate = new Date(Date.now() + this.LOCKOUT_DURATION_MS);
        await prisma.securityEvent.create({
          data: {
            type: 'BRUTE_FORCE_ADMIN',
            severity: 'HIGH',
            message: `Admin (${admin.displayName}) için ${newFailedCount} başarısız giriş denemesi. Hesap kilitlendi.`
          }
        });
      }

      await prisma.adminUser.update({
        where: { id: admin.id },
        data: {
          failedLoginCount: newFailedCount,
          lockedUntil: lockDate
        }
      });

      await AuditService.logEvent(prisma, 'LOGIN_FAILED', 'SYSTEM', admin.id, null, {
        username: canonical,
        failedCount: newFailedCount,
        locked: !!lockDate
      });

      return {
        success: false,
        error: lockDate
          ? 'Çok sayıda hatalı giriş denemesi! Hesabınız 5 dakika süreyle kilitlendi.'
          : `Kullanıcı adı veya şifre hatalı. (Deneme ${newFailedCount}/5)`
      };
    }

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        failedLoginCount: 0,
        lockedUntil: null,
        lastLoginAt: now
      }
    });

    const token = `admin_${SecurityService.generateSecureToken(32)}`;
    const session: AdminSession = {
      token,
      adminId: admin.id,
      username: admin.username,
      displayName: admin.displayName,
      role: 'ADMIN',
      lastActivity: Date.now()
    };
    this.activeAdminSessions.set(token, session);

    await AuditService.logEvent(prisma, 'LOGIN_SUCCESS', 'ADMIN', admin.id, null, {
      username: canonical,
      ip: clientIp
    });

    return { success: true, token };
  }

  public static async changeAdminPassword(
    prisma: PrismaClient,
    adminId: string,
    oldPass: string,
    newPass: string
  ): Promise<{ success: boolean; error?: string }> {
    const admin = await prisma.adminUser.findUnique({ where: { id: adminId } });
    if (!admin) return { success: false, error: 'Yönetici hesabı bulunamadı.' };

    const valid = await SecurityService.verifyPassword(oldPass, admin.passwordHash);
    if (!valid) return { success: false, error: 'Mevcut şifre hatalı.' };

    if (!newPass || newPass.length < 6) {
      return { success: false, error: 'Yeni şifre en az 6 karakter olmalıdır.' };
    }

    const newHash = await SecurityService.hashPassword(newPass);
    await prisma.adminUser.update({
      where: { id: adminId },
      data: { passwordHash: newHash }
    });

    await AuditService.logEvent(prisma, 'ADMIN_PASSWORD_CHANGED', 'ADMIN', adminId, null, { username: admin.username });
    return { success: true };
  }

  public static async changeAdminUsername(
    prisma: PrismaClient,
    adminId: string,
    newUsername: string
  ): Promise<{ success: boolean; error?: string }> {
    const canonical = this.normalizeUsername(newUsername);
    if (!canonical) return { success: false, error: 'Geçersiz kullanıcı adı.' };

    const exists = await prisma.adminUser.findUnique({ where: { username: canonical } });
    if (exists && exists.id !== adminId) {
      return { success: false, error: 'Bu kullanıcı adı zaten kullanımda.' };
    }

    await prisma.adminUser.update({
      where: { id: adminId },
      data: { username: canonical, displayName: newUsername.trim() }
    });

    await AuditService.logEvent(prisma, 'ADMIN_USERNAME_CHANGED', 'ADMIN', adminId, null, { newUsername: canonical });
    return { success: true };
  }

  public static logout(token: string): boolean {
    if (this.activeAdminSessions.has(token)) {
      this.activeAdminSessions.delete(token);
      return true;
    }
    if (this.activeGuestSessions.has(token)) {
      this.activeGuestSessions.delete(token);
      return true;
    }
    return false;
  }
}
