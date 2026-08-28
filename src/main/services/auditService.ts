import { PrismaClient } from '../../generated/prisma/index.js';
import { SecurityService } from './securityService';

class AsyncMutex {
  private queue: Array<() => void> = [];
  private locked: boolean = false;

  public async acquire(): Promise<() => void> {
    return new Promise((resolve) => {
      const release = () => {
        if (this.queue.length > 0) {
          const next = this.queue.shift()!;
          next();
        } else {
          this.locked = false;
        }
      };

      if (!this.locked) {
        this.locked = true;
        resolve(release);
      } else {
        this.queue.push(() => resolve(release));
      }
    });
  }
}

export class AuditService {
  private static mutex = new AsyncMutex();

  public static canonicalJson(obj: any): string {
    if (obj === null || typeof obj !== 'object') {
      return JSON.stringify(obj);
    }
    if (Array.isArray(obj)) {
      return '[' + obj.map(item => AuditService.canonicalJson(item)).join(',') + ']';
    }
    const keys = Object.keys(obj).sort();
    return '{' + keys.map(k => `${JSON.stringify(k)}:${AuditService.canonicalJson(obj[k])}`).join(',') + '}';
  }

  public static sanitizeMetadata(metadata?: any): string {
    if (!metadata) return '{}';
    const clean = { ...metadata };
    const sensitiveKeys = ['password', 'passwordHash', 'token', 'key', 'secret', 'privatePassword'];
    for (const key of Object.keys(clean)) {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk.toLowerCase()))) {
        clean[key] = '[REDACTED]';
      }
    }
    return AuditService.canonicalJson(clean);
  }

  public static async logEvent(
    prisma: PrismaClient,
    eventType: string,
    actorType: 'ADMIN' | 'GUEST' | 'SYSTEM',
    actorId?: string | null,
    memberId?: string | null,
    metadata?: any
  ): Promise<void> {
    const release = await this.mutex.acquire();
    try {
      const lastLog = await prisma.auditLog.findFirst({
        orderBy: { createdAt: 'desc' }
      });

      const previousHash = lastLog ? lastLog.currentHash : 'GENESIS_HASH_SS_KARMA_SANAYI_2026';
      const cleanMetadataStr = this.sanitizeMetadata(metadata);
      const createdAt = new Date();

      const payloadToHash = `${previousHash}|${eventType}|${actorType}|${actorId || ''}|${memberId || ''}|${cleanMetadataStr}|${createdAt.toISOString()}`;
      const currentHash = SecurityService.sha256(payloadToHash);

      await prisma.auditLog.create({
        data: {
          eventType,
          actorType,
          actorId: actorId || null,
          memberId: memberId || null,
          metadata: cleanMetadataStr,
          previousHash,
          currentHash,
          createdAt
        }
      });
    } finally {
      release();
    }
  }

  public static async verifyAuditChain(prisma: PrismaClient): Promise<{
    status: 'VALID' | 'TAMPER_DETECTED';
    totalChecked: number;
    corruptedLogId?: string;
    details?: string;
  }> {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'asc' }
    });

    if (logs.length === 0) {
      return { status: 'VALID', totalChecked: 0, details: 'Henüz denetim kaydı bulunmuyor.' };
    }

    let expectedPrevHash = 'GENESIS_HASH_SS_KARMA_SANAYI_2026';

    for (let i = 0; i < logs.length; i++) {
      const log = logs[i];
      if (log.previousHash !== expectedPrevHash) {
        return {
          status: 'TAMPER_DETECTED',
          totalChecked: i,
          corruptedLogId: log.id,
          details: `Log #${i + 1} (${log.id}) önceki hash uyumsuzluğu tespit edildi.`
        };
      }

      const payloadToHash = `${log.previousHash}|${log.eventType}|${log.actorType}|${log.actorId || ''}|${log.memberId || ''}|${log.metadata || '{}'}|${log.createdAt.toISOString()}`;
      const calculatedHash = SecurityService.sha256(payloadToHash);

      if (calculatedHash !== log.currentHash) {
        return {
          status: 'TAMPER_DETECTED',
          totalChecked: i,
          corruptedLogId: log.id,
          details: `Log #${i + 1} (${log.id}) içerik hash uyuşmazlığı tespit edildi.`
        };
      }

      expectedPrevHash = log.currentHash;
    }

    return {
      status: 'VALID',
      totalChecked: logs.length,
      details: `Toplam ${logs.length} denetim kaydı doğrulandı, zincir bütünlüğü kusursuz.`
    };
  }
}
