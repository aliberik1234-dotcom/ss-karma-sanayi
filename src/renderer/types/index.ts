export type Role = 'ADMIN' | 'GUEST';

export type ThemeName = 'system' | 'light' | 'dark' | 'modern_blue';

export interface MemberItem {
  id: string;
  sequenceNumber: number;
  sequenceFormatted: string;
  fullName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export type PaymentStatus = 'BEKLIYOR' | 'ODENDI' | 'GECIKMIS' | 'KISMI';

export interface InstallmentItem {
  id: string;
  installmentNumber: number;
  amount: string;
  dueDate: string;
  status: PaymentStatus;
  bankId: string | null;
  bankName: string | null;
  bankCode: string | null;
  bankLogo: string | null;
  paymentDate: string | null;
  receiptNumber: string | null;
  notes: string | null;
}

export interface FinancialDetails {
  memberId: string;
  fullName: string;
  sequenceFormatted: string;
  phone: string;
  plotSize: string;
  downPayment: string;
  totalDebt: string;
  totalPaid: string;
  remainingDebt: string;
  totalInstallmentsCount: number;
  paidInstallmentsCount: number;
  remainingInstallmentsCount: number;
  activePlan: {
    id: string;
    totalInstallments: number;
    createdAt: string;
    installments: InstallmentItem[];
  } | null;
}

export interface BankItem {
  id: string;
  name: string;
  code: string;
  logoAsset: string | null;
  isActive: boolean;
}

export interface AuditLogItem {
  id: string;
  eventType: string;
  actorType: string;
  actorId: string | null;
  memberId: string | null;
  metadata: string | null;
  previousHash: string;
  currentHash: string;
  createdAt: string;
}

declare global {
  interface Window {
    electronAPI: any;
  }
}
