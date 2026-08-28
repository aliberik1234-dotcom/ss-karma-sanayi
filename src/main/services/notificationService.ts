import { PrismaClient } from '../../generated/prisma/index.js';
import { SecurityService } from './securityService.js';
import { StartupLogger } from './loggerService.js';

export interface SecurityAlertPayload {
  eventType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  messageText: string;
}

export class NotificationService {
  public static getProviderInfo(): { name: string; isConfigured: boolean; senderId: string } {
    return {
      name: 'SMS kaldırıldı',
      isConfigured: false,
      senderId: ''
    };
  }

  public static async getEmergencyPhones(_prisma: PrismaClient): Promise<string[]> {
    return [];
  }

  public static async setEmergencyPhones(_prisma: PrismaClient, _phone1: string, _phone2: string): Promise<void> {
    return;
  }

  public static async dispatchSecurityAlert(prisma: PrismaClient, eventType: string, severity: string, messageText: string): Promise<void> {
    try {
      await prisma.securityEvent.create({
        data: {
          type: eventType,
          severity,
          message: messageText
        }
      });
    } catch (e) {
      StartupLogger.log('NOTIFICATION_ERROR', `SecurityEvent kaydedilemedi: ${e instanceof Error ? e.message : e}`);
    }
  }
}
