import { PrismaClient } from '../../generated/prisma/index.js';
import { AuditService } from './auditService.js';
import { StartupLogger } from './loggerService.js';

export interface BannedIpDto {
  id: string;
  ipAddress: string;
  normalizedIp: string;
  reason: string;
  bannedAt: Date;
  bannedBy: string;
  failedAttemptCount: number;
  lastAttemptAt: Date | null;
  active: boolean;
  unbannedAt: Date | null;
  unbannedBy: string | null;
  metadata?: string | null;
}

export class IpBanService {
  public static normalizeIp(rawIp: string): string {
    if (!rawIp || typeof rawIp !== 'string') return '127.0.0.1';
    let ip = rawIp.trim().toLowerCase();
    if (ip.startsWith('::ffff:')) {
      ip = ip.substring(7);
    }
    if (ip === '::1' || ip === 'localhost') {
      ip = '127.0.0.1';
    }
    return ip;
  }

  public static async listBannedIps(prisma: PrismaClient): Promise<BannedIpDto[]> {
    const records = await prisma.bannedIp.findMany({
      orderBy: { bannedAt: 'desc' },
      take: 100
    });
    return records.map(r => ({
      id: r.id,
      ipAddress: r.ipAddress,
      normalizedIp: r.normalizedIp,
      reason: r.reason,
      bannedAt: r.bannedAt,
      bannedBy: r.bannedBy,
      failedAttemptCount: r.failedAttemptCount,
      lastAttemptAt: r.lastAttemptAt,
      active: r.active,
      unbannedAt: r.unbannedAt,
      unbannedBy: r.unbannedBy,
      metadata: r.metadata || undefined
    }));
  }

  public static async unbanIp(prisma: PrismaClient, ipOrId: string, unbannedBy: string, reason?: string): Promise<void> {
    const record = await prisma.bannedIp.findFirst({
      where: {
        OR: [
          { id: ipOrId },
          { ipAddress: ipOrId },
          { normalizedIp: ipOrId }
        ]
      }
    });

    if (!record) {
      throw new Error('Engellenmiş IP kaydı bulunamadı.');
    }

    await prisma.bannedIp.update({
      where: { id: record.id },
      data: {
        active: false,
        unbannedAt: new Date(),
        unbannedBy,
        reason: reason || record.reason
      }
    });

    await AuditService.logEvent(prisma, 'IP_UNBANNED', 'ADMIN', null, null, {
      ip: record.ipAddress,
      unbannedBy,
      reason
    });
  }
}
