import test from "node:test";
import assert from "node:assert/strict";
import { execSync } from "child_process";
import path from "path";
import { PostgresManager } from "../dist-electron/main/db/postgresManager.js";
import { getPrismaClient, disconnectPrisma } from "../dist-electron/main/db/prismaClient.js";
import { AuthService } from "../dist-electron/main/services/authService.js";
import { MemberService, toTurkishTitleCase } from "../dist-electron/main/services/memberService.js";
import { PrivateService } from "../dist-electron/main/services/privateService.js";
import { AuditService } from "../dist-electron/main/services/auditService.js";
import { BackupService } from "../dist-electron/main/services/backupService.js";
import { SecurityService } from "../dist-electron/main/services/securityService.js";
import { seedDatabase, TURKISH_BANKS } from "../dist-electron/main/db/seed.js";

test("End-to-End Database Lifecycle, Security, Financial & Audit Test", async (t) => {
  const pgManager = PostgresManager.getInstance();

  // 1. START POSTGRESQL RUNTIME
  console.log("\n[TEST 1] PostgreSQL motoru baÅŸlatılıyor...");
  const dbUrl = process.env.TEST_DB_URL || await pgManager.start();
  assert.ok(dbUrl.startsWith("postgresql://"), "DB URL postgresql:// protokolü ile baÅŸlamalı");
  console.log("âœ” PostgreSQL baÅŸarıyla baÅŸlatıldı:", dbUrl);

  // 2. PRISMA SCHEMA PUSH (Sync DB Tables)
  console.log("\n[TEST 2] Prisma Şeması veritabanına uygulanıyor (db push)...");
  execSync("npx prisma db push --skip-generate --accept-data-loss", {
    env: { ...process.env, DATABASE_URL: dbUrl },
    stdio: "inherit"
  });
  console.log("âœ” Prisma ÅŸeması veritabanına baÅŸarıyla uygulandı.");

  const prisma = await getPrismaClient();

  // 3. SEED TURKISH BANKS
  console.log("\n[TEST 3] Türkiye Bankaları seed ediliyor...");
  await seedDatabase(prisma);
  const bankCount = await prisma.bank.count();
  assert.equal(bankCount, TURKISH_BANKS.length, `Toplam ${TURKISH_BANKS.length} banka kaydedilmeli`);
  console.log(`âœ” Toplam ${bankCount} Türkiye bankası veritabanında doÄŸrulandı.`);

  // 4. SETUP WIZARD & ADMIN CREATION
  console.log("\n[TEST 4] Setup Wizard ve Admin Hesabı oluÅŸturuluyor...");
  const adminCanonical = AuthService.normalizeUsername("Admin");
  assert.equal(adminCanonical, "admin");

  const adminPassHash = await SecurityService.hashPassword("SuperSecretAdminPass123!");
  const privatePassHash = await SecurityService.hashPassword("SuperSecretPrivatePass456!");

  await prisma.adminUser.deleteMany();
  await prisma.privateCredential.deleteMany();
  await prisma.bannedIp.deleteMany();
  await prisma.securityEvent.deleteMany();

  const adminUser = await prisma.adminUser.create({
    data: {
      username: adminCanonical,
      displayName: "BaÅŸkan Yönetici",
      passwordHash: adminPassHash
    }
  });

  const privateCred = await prisma.privateCredential.create({
    data: {
      passwordHash: privatePassHash
    }
  });

  assert.ok(adminUser.id);
  assert.ok(privateCred.id);
  console.log("âœ” Admin ve Ã–zel Parola baÅŸarıyla oluÅŸturuldu.");

  // 5. CASE-INSENSITIVE LOGIN TESTS
  console.log("\n[TEST 5] Case-Insensitive Admin GiriÅŸ Testleri (ADMIN, admin, AdMiN, ADMİN)...");
  for (const variant of ["ADMIN", "admin", "Admin", "AdMiN", "ADMİN", "  admin  "]) {
    const loginRes = await AuthService.adminLogin(prisma, variant, "SuperSecretAdminPass123!");
    if (!loginRes.success) { console.log("[DEBUG_LOGIN]", JSON.stringify({variant: variant, error: loginRes.error, lockedUntil: loginRes.lockedUntil})); }
    assert.equal(loginRes.success, true, `'${variant}' ile giriÅŸ baÅŸarılı olmalı`);
    assert.ok(loginRes.token?.startsWith("admin_"));
    AuthService.logout(loginRes.token);
  }
  console.log("âœ” Tüm büyük/küçük harf varyantları baÅŸarıyla giriÅŸ yaptı.");

  // 6. BRUTE FORCE LOCKOUT TEST
  console.log("\n[TEST 6] Brute-Force Koruması ve Hesap Kilitleme Testi...");
  for (let i = 1; i <= 5; i++) {
    const failRes = await AuthService.adminLogin(prisma, "admin", "YanlisSifre!", `192.168.5.${i}`);
    assert.equal(failRes.success, false);
    if (i === 5) {
      assert.ok(failRes.error.includes("kilit"), "5. denemede hesap kilitlenmeli");
    }
  }

  // 6. deneme (kilitli durumda)
  const lockedRes = await AuthService.adminLogin(prisma, "admin", "SuperSecretAdminPass123!", "192.168.5.99");
  assert.equal(lockedRes.success, false);
  assert.ok(lockedRes.error.includes("kilit"), "Doğru şifre girilse dahi kilit süresi bitene kadar engellenmeli");
  console.log("✔ Brute-Force 5 deneme kuralı ve hesap kilitleme başarıyla doğrulandı.");

  // Kilidi temizle
  await prisma.adminUser.update({
    where: { id: adminUser.id },
    data: { failedLoginCount: 0, lockedUntil: null }
  });

  // 7. GUEST LOGIN & RBAC TEST
  console.log("\n[TEST 7] Guest Login ve RBAC Session DoÄŸrulaması...");
  const guestSession = AuthService.createGuestSession();
  assert.equal(guestSession.role, "GUEST");

  const guestVal = AuthService.validateSession(guestSession.token);
  assert.equal(guestVal.valid, true);
  assert.equal(guestVal.role, "GUEST");
  console.log("âœ” Guest oturumu baÅŸarıyla doÄŸrulandı.");

  // 8. MEMBER CRUD & TURKISH NORMALIZATION TEST
  console.log("\n[TEST 8] Ãœye Ekleme, Sıra No (001-999) ve Türkçe Normalizasyon...");
  const member1 = await MemberService.createMember(prisma, adminUser.id, {
    fullName: "bU bİR dENEME cÜMLESİ",
    phone: "05321234567",
    sequenceNumber: 1
  });

  assert.equal(member1.fullName, "Bu Bir Deneme Cümlesi");
  assert.equal(member1.sequenceFormatted, "001");
  assert.equal(member1.sequenceNumber, 1);

  const member2 = await MemberService.createMember(prisma, adminUser.id, {
    fullName: "İBRAHİM BERİK",
    phone: "05449876543"
  });

  assert.equal(member2.fullName, "İbrahim Berik");
  assert.equal(member2.sequenceFormatted, "002");
  assert.equal(member2.sequenceNumber, 2);

  // Duplicate sequence number check among active members
  await assert.rejects(async () => {
    await MemberService.createMember(prisma, adminUser.id, {
      fullName: "Ahmet Yılmaz",
      phone: "05551112233",
      sequenceNumber: 1 // Already used by member1
    });
  }, /zaten.*aittir/);

  console.log("âœ” Ãœye normalizasyonu, formatlama ve sıra no tekilliÄŸi doÄŸrulandı.");

  // 9. PRIVATE ACCESS GATE & SHORT-LIVED GRANT TEST
  console.log("\n[TEST 9] Ã–zel Parola DoÄŸrulama & 10 Dakikalık Access Window...");
  const gateFail = await PrivateService.verifyPrivatePassword(prisma, adminUser.id, member1.id, "YanlisOzelParola");
  assert.equal(gateFail.success, false);

  const gateSuccess = await PrivateService.verifyPrivatePassword(prisma, adminUser.id, member1.id, "SuperSecretPrivatePass456!");
  assert.equal(gateSuccess.success, true);
  assert.ok(gateSuccess.grantToken);

  const isGrantValid = PrivateService.validateGrant(gateSuccess.grantToken, adminUser.id, member1.id);
  assert.equal(isGrantValid, true);

  // BaÅŸka üye için bu grant kullanılamaz (Non-transferable test)
  const isGrantInvalidForOther = PrivateService.validateGrant(gateSuccess.grantToken, adminUser.id, member2.id);
  assert.equal(isGrantInvalidForOther, false);
  console.log("âœ” Ã–zel parola ve devredilemez eriÅŸim token penceresi doÄŸrulandı.");

  // 10. FINANCIAL DETAILS & INSTALLMENT PLAN (ZERO FLOAT) TEST
  console.log("\n[TEST 10] Finansal Detaylar, Arsa mÂ², PeÅŸinat ve Taksit Planı (Sıfır Float)...");
  await PrivateService.updateFinancialBasic(prisma, adminUser.id, member1.id, {
    plotSize: "750.50",
    downPayment: "50000.00"
  });

  await PrivateService.createInstallmentPlan(prisma, adminUser.id, member1.id, {
    totalInstallments: 12,
    installmentAmount: "12500.25",
    startDate: "2026-09-01"
  });

  const finDetails = await PrivateService.getMemberFinancialDetails(prisma, member1.id);
  assert.equal(finDetails.plotSize, "750.50");
  assert.equal(finDetails.downPayment, "50000.00");
  assert.equal(finDetails.totalDebt, "200003.00"); // 50000 + (12500.25 * 12) = 200003.00
  assert.equal(finDetails.totalPaid, "50000.00");
  assert.equal(finDetails.remainingDebt, "150003.00");
  assert.equal(finDetails.activePlan?.installments.length, 12);

  // Taksit 1 Ã–demesini Kaydet
  const firstInst = finDetails.activePlan.installments[0];
  const ziraatBank = await prisma.bank.findFirst({ where: { code: "TCZB" } });

  await PrivateService.recordInstallmentPayment(prisma, adminUser.id, member1.id, firstInst.id, {
    status: "ODENDI",
    bankId: ziraatBank?.id,
    paymentDate: "2026-09-02",
    receiptNumber: "DEKONT-2026-001",
    notes: "Eylül ayı taksiti Ziraat hesabından ödendi"
  });

  const updatedFin = await PrivateService.getMemberFinancialDetails(prisma, member1.id);
  assert.equal(updatedFin.totalPaid, "62500.25"); // 50000 + 12500.25
  assert.equal(updatedFin.remainingDebt, "137502.75");
  assert.equal(updatedFin.paidInstallmentsCount, 1);
  assert.equal(updatedFin.remainingInstallmentsCount, 11);
  console.log("âœ” Finansal hesaplamalar kuruÅŸu kuruÅŸuna hatasız doÄŸrulandı.");

  // 11. AUDIT CHAIN INTEGRITY & VERIFICATION TEST
  console.log("\n[TEST 11] SHA-256 Audit Zincir BütünlüÄŸü DoÄŸrulaması...");
  const auditVerification = await AuditService.verifyAuditChain(prisma);
  assert.equal(auditVerification.status, "VALID");
  assert.ok(auditVerification.totalChecked >= 5, "En az 5 audit kaydı zincirde olmalı");
  console.log(`âœ” Audit zinciri geçerli: ${auditVerification.details}`);

  // 12. ENCRYPTED BACKUP & RESTORE TEST
  console.log("\n[TEST 12] AES-256-GCM Şifreli Yedekleme ve DoÄŸrulama...");
  const backup = await BackupService.createBackup(prisma, adminUser.id);
  assert.ok(backup.backupData);
  assert.ok(backup.checksum);
  assert.equal(backup.stats.memberCount, 2);

  const restoreResult = await BackupService.restoreBackup(prisma, adminUser.id, backup.backupData, backup.checksum);
  assert.equal(restoreResult.success, true);
  console.log("âœ” Şifreli yedekleme ve geri yükleme baÅŸarıyla doÄŸrulandı.");

  // 13. GRACEFUL SHUTDOWN
  console.log("\n[TEST 13] Veritabanı ve PostgreSQL Graceful Shutdown...");
  await disconnectPrisma();
  if (!process.env.TEST_DB_URL) {
    await pgManager.stop();
  }
  console.log("âœ” PostgreSQL ve Prisma baÅŸarıyla kapatıldı.");
});