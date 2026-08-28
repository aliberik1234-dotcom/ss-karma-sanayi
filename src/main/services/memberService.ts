import { PrismaClient } from '../../generated/prisma/index.js';
import { AuditService } from './auditService';

export function toTurkishTitleCase(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return '';
      const lower = word.toLocaleLowerCase('tr-TR');
      const firstChar = lower.charAt(0).toLocaleUpperCase('tr-TR');
      const rest = lower.slice(1);
      return firstChar + rest;
    })
    .join(' ');
}

export function formatPhoneNumber(input: string): string {
  if (!input) return '';
  const digits = input.replace(/\D/g, '');
  if (digits.length === 10) {
    // 5XXXXXXXXX -> 05XX XXX XX XX
    return `0${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    // 05XXXXXXXXX -> 05XX XXX XX XX
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
  }
  return input.trim();
}

export interface MemberListItem {
  id: string;
  sequenceNumber: number;
  sequenceFormatted: string;
  fullName: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MemberService {
  public static async listMembers(
    prisma: PrismaClient,
    options: {
      search?: string;
      sortBy?: 'name_asc' | 'name_desc' | 'seq_asc' | 'seq_desc';
    } = {}
  ): Promise<MemberListItem[]> {
    const { search, sortBy = 'seq_asc' } = options;

    const whereClause: any = {
      isDeleted: false
    };

    if (search && search.trim()) {
      const q = search.trim();
      const seqNum = parseInt(q, 10);
      whereClause.OR = [
        { fullName: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q } },
        ...(isNaN(seqNum) ? [] : [{ sequenceNumber: seqNum }])
      ];
    }

    let orderBy: any = { sequenceNumber: 'asc' };
    if (sortBy === 'seq_desc') orderBy = { sequenceNumber: 'desc' };
    if (sortBy === 'name_asc') orderBy = { fullName: 'asc' };
    if (sortBy === 'name_desc') orderBy = { fullName: 'desc' };

    const members = await prisma.member.findMany({
      where: whereClause,
      select: {
        id: true,
        sequenceNumber: true,
        fullName: true,
        phone: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy
    });

    return members.map((m) => ({
      id: m.id,
      sequenceNumber: m.sequenceNumber,
      sequenceFormatted: m.sequenceNumber.toString().padStart(3, '0'),
      fullName: m.fullName,
      phone: m.phone,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt
    }));
  }

  public static async getNextAvailableSequenceNumber(prisma: PrismaClient): Promise<number> {
    const activeMembers = await prisma.member.findMany({
      where: { isDeleted: false },
      select: { sequenceNumber: true },
      orderBy: { sequenceNumber: 'asc' }
    });

    const usedSeqSet = new Set(activeMembers.map((m) => m.sequenceNumber));
    for (let i = 1; i <= 999; i++) {
      if (!usedSeqSet.has(i)) {
        return i;
      }
    }
    throw new Error('Maksimum üye kapasitesine (999) ulaşıldı.');
  }

  public static async createMember(
    prisma: PrismaClient,
    adminId: string,
    data: { sequenceNumber?: number; fullName: string; phone: string; memberNumber?: string }
  ): Promise<MemberListItem> {
    if (!data.fullName || data.fullName.trim().length < 2) {
      throw new Error('Üye adı ve soyadı en az 2 karakter olmalıdır.');
    }

    const normalizedName = toTurkishTitleCase(data.fullName);
    const formattedPhone = formatPhoneNumber(data.phone || '');

    let seqNum = data.sequenceNumber;
    if (!seqNum || seqNum < 1 || seqNum > 999) {
      seqNum = await this.getNextAvailableSequenceNumber(prisma);
    }

    // Check duplicate among active members
    const existing = await prisma.member.findFirst({
      where: { sequenceNumber: seqNum, isDeleted: false }
    });

    if (existing) {
      throw new Error(`Sıra No ${seqNum.toString().padStart(3, '0')} zaten başka bir aktif üyeye aittir.`);
    }

    const member = await prisma.member.create({
      data: {
        sequenceNumber: seqNum,
        fullName: normalizedName,
        phone: formattedPhone,
        isDeleted: false,
        memberNumber: data.memberNumber,
      }
    });

    await AuditService.logEvent(prisma, 'MEMBER_CREATE', 'ADMIN', adminId, member.id, {
      sequenceNumber: seqNum,
      fullName: normalizedName,
      phone: formattedPhone
    });

    return {
      id: member.id,
      sequenceNumber: member.sequenceNumber,
      sequenceFormatted: member.sequenceNumber.toString().padStart(3, '0'),
      fullName: member.fullName,
      phone: member.phone,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt
    };
  }

  public static async updateMember(
    prisma: PrismaClient,
    adminId: string,
    id: string,
    data: { sequenceNumber?: number; fullName?: string; phone?: string }
  ): Promise<MemberListItem> {
    const existing = await prisma.member.findUnique({ where: { id } });
    if (!existing || existing.isDeleted) {
      throw new Error('Üye kaydı bulunamadı.');
    }

    let seqNum = existing.sequenceNumber;
    if (data.sequenceNumber !== undefined && data.sequenceNumber !== existing.sequenceNumber) {
      if (data.sequenceNumber < 1 || data.sequenceNumber > 999) {
        throw new Error('Sıra numarası 1 ile 999 arasında olmalıdır.');
      }
      const duplicate = await prisma.member.findFirst({
        where: { sequenceNumber: data.sequenceNumber, isDeleted: false, id: { not: id } }
      });
      if (duplicate) {
        throw new Error(`Sıra No ${data.sequenceNumber.toString().padStart(3, '0')} zaten başka bir üyede kullanılmaktadır.`);
      }
      seqNum = data.sequenceNumber;
    }

    const normalizedName = data.fullName !== undefined ? toTurkishTitleCase(data.fullName) : existing.fullName;
    const formattedPhone = data.phone !== undefined ? formatPhoneNumber(data.phone) : existing.phone;

    const updated = await prisma.member.update({
      where: { id },
      data: {
        sequenceNumber: seqNum,
        fullName: normalizedName,
        phone: formattedPhone
      }
    });

    await AuditService.logEvent(prisma, 'MEMBER_UPDATE', 'ADMIN', adminId, id, {
      old: { sequenceNumber: existing.sequenceNumber, fullName: existing.fullName, phone: existing.phone },
      new: { sequenceNumber: seqNum, fullName: normalizedName, phone: formattedPhone }
    });

    return {
      id: updated.id,
      sequenceNumber: updated.sequenceNumber,
      sequenceFormatted: updated.sequenceNumber.toString().padStart(3, '0'),
      fullName: updated.fullName,
      phone: updated.phone,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    };
  }

  public static async deleteMember(prisma: PrismaClient, adminId: string, id: string): Promise<boolean> {
    const existing = await prisma.member.findUnique({ where: { id } });
    if (!existing || existing.isDeleted) {
      throw new Error('Silinecek üye bulunamadı.');
    }

    await prisma.member.update({
      where: { id },
      data: { isDeleted: true }
    });

    await AuditService.logEvent(prisma, 'MEMBER_DELETE', 'ADMIN', adminId, id, {
      sequenceNumber: existing.sequenceNumber,
      fullName: existing.fullName
    });

    return true;
  }
}
