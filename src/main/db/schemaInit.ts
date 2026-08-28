import { Client } from "pg";

/**
 * Idempotent SQL DDL initialization for S.S. Karma Sanayi Sitesi.
 * Executes in milliseconds before Prisma connects, ensuring all tables,
 * foreign keys, enums, and indexes exist on fresh installation without requiring CLI tools.
 */
export async function initializeDatabaseSchema(client: Client): Promise<void> {
  const ddl = `
    -- Enums
    DO $$ BEGIN
      CREATE TYPE "PlanStatus" AS ENUM ('ACTIVE', 'ARCHIVED');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "PaymentStatus" AS ENUM ('BEKLIYOR', 'ODENDI', 'GECIKMIS', 'KISMI');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    -- Tables
    CREATE TABLE IF NOT EXISTS "AdminUser" (
      "id" TEXT PRIMARY KEY,
      "username" TEXT UNIQUE NOT NULL,
      "displayName" TEXT NOT NULL,
      "passwordHash" TEXT NOT NULL,
      "failedLoginCount" INTEGER NOT NULL DEFAULT 0,
      "lockedUntil" TIMESTAMP(3),
      "lastLoginAt" TIMESTAMP(3),
      "version" INTEGER NOT NULL DEFAULT 1,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "PrivateCredential" (
      "id" TEXT PRIMARY KEY,
      "passwordHash" TEXT NOT NULL,
      "failedAttemptCount" INTEGER NOT NULL DEFAULT 0,
      "lockedUntil" TIMESTAMP(3),
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "Member" (
      "id" TEXT PRIMARY KEY,
      "sequenceNumber" INTEGER NOT NULL,
      "memberNumber" TEXT,
      "fullName" TEXT NOT NULL,
      "phone" TEXT NOT NULL,
      "isDeleted" BOOLEAN NOT NULL DEFAULT false,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    ALTER TABLE "Member" ADD COLUMN IF NOT EXISTS "memberNumber" TEXT;
    CREATE UNIQUE INDEX IF NOT EXISTS "Member_memberNumber_key" ON "Member"("memberNumber");
    CREATE INDEX IF NOT EXISTS "Member_isDeleted_sequenceNumber_idx" ON "Member"("isDeleted", "sequenceNumber");

    CREATE TABLE IF NOT EXISTS "MemberPrivateFinancial" (
      "id" TEXT PRIMARY KEY,
      "memberId" TEXT UNIQUE NOT NULL,
      "plotSize" DECIMAL(10,2),
      "downPayment" DECIMAL(15,2),
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "MemberPrivateFinancial_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "InstallmentPlan" (
      "id" TEXT PRIMARY KEY,
      "privateFinancialId" TEXT NOT NULL,
      "status" "PlanStatus" NOT NULL DEFAULT 'ACTIVE',
      "totalInstallments" INTEGER NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "InstallmentPlan_privateFinancialId_fkey" FOREIGN KEY ("privateFinancialId") REFERENCES "MemberPrivateFinancial"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );
    CREATE INDEX IF NOT EXISTS "InstallmentPlan_privateFinancialId_status_idx" ON "InstallmentPlan"("privateFinancialId", "status");

    CREATE TABLE IF NOT EXISTS "Bank" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT UNIQUE NOT NULL,
      "code" TEXT UNIQUE NOT NULL,
      "logoAsset" TEXT,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "Installment" (
      "id" TEXT PRIMARY KEY,
      "planId" TEXT NOT NULL,
      "installmentNumber" INTEGER NOT NULL,
      "amount" DECIMAL(15,2) NOT NULL,
      "dueDate" TIMESTAMP(3) NOT NULL,
      "status" "PaymentStatus" NOT NULL DEFAULT 'BEKLIYOR',
      "bankId" TEXT,
      "paymentDate" TIMESTAMP(3),
      "receiptNumber" TEXT,
      "notes" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Installment_planId_installmentNumber_key" UNIQUE ("planId", "installmentNumber"),
      CONSTRAINT "Installment_planId_fkey" FOREIGN KEY ("planId") REFERENCES "InstallmentPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT "Installment_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE SET NULL ON UPDATE CASCADE
    );

    CREATE TABLE IF NOT EXISTS "AuditLog" (
      "id" TEXT PRIMARY KEY,
      "eventType" TEXT NOT NULL,
      "actorType" TEXT NOT NULL,
      "actorId" TEXT,
      "memberId" TEXT,
      "metadata" TEXT,
      "previousHash" TEXT NOT NULL,
      "currentHash" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "AuditLog_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE
    );
    CREATE INDEX IF NOT EXISTS "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

    CREATE TABLE IF NOT EXISTS "SecurityEvent" (
      "id" TEXT PRIMARY KEY,
      "type" TEXT NOT NULL,
      "severity" TEXT NOT NULL,
      "message" TEXT NOT NULL,
      "resolvedAt" TIMESTAMP(3),
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "AppSettings" (
      "key" TEXT PRIMARY KEY,
      "value" TEXT NOT NULL,
      "isEncrypted" BOOLEAN NOT NULL DEFAULT false,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS "BannedIp" (
      "id" TEXT PRIMARY KEY,
      "ipAddress" TEXT UNIQUE NOT NULL,
      "normalizedIp" TEXT UNIQUE NOT NULL,
      "reason" TEXT NOT NULL,
      "bannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "bannedBy" TEXT NOT NULL DEFAULT 'SYSTEM_AUTO_3_FAILURES',
      "failedAttemptCount" INTEGER NOT NULL DEFAULT 0,
      "lastAttemptAt" TIMESTAMP(3),
      "active" BOOLEAN NOT NULL DEFAULT true,
      "unbannedAt" TIMESTAMP(3),
      "unbannedBy" TEXT,
      "metadata" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS "BannedIp_active_normalizedIp_idx" ON "BannedIp"("active", "normalizedIp");
  `;

  await client.query(ddl);
}