import { Client } from 'pg';
import { PrismaClient } from '../src/generated/prisma/index.js';
import { AuthService } from '../dist-electron/main/services/authService.js';
import { IpBanService } from '../dist-electron/main/services/ipBanService.js';
import { SecurityService } from '../dist-electron/main/services/securityService.js';
import { AuditService } from '../dist-electron/main/services/auditService.js';
import { NotificationService } from '../dist-electron/main/services/notificationService.js';

// Setup database connection pointing to SQLite
const dbUrl = "file:./karma-test.db?mode=rwc";
process.env.DATABASE_URL = dbUrl;
const prisma = new PrismaClient({
  datasources: {
    db: { url: dbUrl }
  }
});

async function runTests() {
  console.log("=== SS KARMA SANAYI SECURITY NIRVANA E2E TESTS ===");

  // Clean slate: reset BannedIp, SecurityEvent, AppSettings, AdminUser, AuditLog
  console.log("\n[SETUP] Cleaning database slate...");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "BannedIp", "SecurityEvent", "AuditLog", "AdminUser", "PrivateCredential", "AppSettings" CASCADE;`);
  console.log("Database cleaned.");

  // Test IP details
  const testIp = "192.168.1.100";
  const normalizedTestIp = IpBanService.normalizeIp(testIp);
  const testUser = "admin";
  const testPass = "AdminPassword123";
  const testPrivatePass = "PrivatePassword123";

  // 1. First Run Configuration Setup
  console.log("\n[TEST 1] First Run Configuration...");
  const adminPassHash = await SecurityService.hashPassword(testPass);
  const privatePassHash = await SecurityService.hashPassword(testPrivatePass);
  const canonicalUsername = AuthService.normalizeUsername(testUser);

  await prisma.$transaction(async (tx) => {
    await tx.adminUser.create({
      data: {
        id: "admin-id-123",
        username: canonicalUsername,
        displayName: "Yonetici",
        passwordHash: adminPassHash,
      }
    });

    await tx.privateCredential.create({
      data: {
        id: "private-id-123",
        passwordHash: privatePassHash,
      }
    });

    const phonesEncrypted = SecurityService.encrypt(JSON.stringify({
      phone1: "+905551112233",
      phone2: "+905552223344"
    }));

    await tx.appSettings.create({
      data: { key: 'SECURITY_PHONES', value: phonesEncrypted, isEncrypted: true }
    });

    await tx.appSettings.create({
      data: { key: 'FIRST_RUN_SETUP_COMPLETED', value: 'true', isEncrypted: false }
    });
  });

  const setupCompleted = await prisma.appSettings.findUnique({ where: { key: 'FIRST_RUN_SETUP_COMPLETED' } });
  console.log("First Run completed setup status:", setupCompleted?.value === 'true' ? "PASS" : "FAIL");

  // 2. Login Failure #1
  console.log("\n[TEST 2] Login Failure #1...");
  const res1 = await AuthService.adminLogin(prisma, testUser, "WrongPass1", testIp);
  console.log("Login failed status:", !res1.success ? "PASS" : "FAIL", "| Error:", res1.error);

  const event1 = await prisma.securityEvent.findFirst({
    where: { type: 'LOGIN_FAILURE_ALERT' },
    orderBy: { createdAt: 'desc' }
  });
  console.log("SecurityEvent LOGIN_FAILURE_ALERT created:", event1 ? "PASS" : "FAIL", "| Message:", event1?.message);

  // 3. Login Failure #2
  console.log("\n[TEST 3] Login Failure #2...");
  const res2 = await AuthService.adminLogin(prisma, testUser, "WrongPass2", testIp);
  console.log("Login failed status:", !res2.success ? "PASS" : "FAIL", "| Error:", res2.error);

  const countEvents2 = await prisma.securityEvent.count({ where: { type: 'LOGIN_FAILURE_ALERT' } });
  console.log("Count of LOGIN_FAILURE_ALERT:", countEvents2 === 2 ? "PASS" : "FAIL (Count: " + countEvents2 + ")");

  // 4. Login Failure #3 -> Permanent IP Ban
  console.log("\n[TEST 4] Login Failure #3 (Should trigger Permanent Ban)...");
  const res3 = await AuthService.adminLogin(prisma, testUser, "WrongPass3", testIp);
  console.log("Login failed status:", !res3.success ? "PASS" : "FAIL", "| Error:", res3.error);

  const banRecord = await prisma.bannedIp.findUnique({ where: { normalizedIp: normalizedTestIp } });
  console.log("IP banned in DB:", banRecord?.active === true ? "PASS" : "FAIL");
  console.log("Banned IP failedAttemptCount:", banRecord?.failedAttemptCount === 3 ? "PASS" : "FAIL");

  const event3 = await prisma.securityEvent.findFirst({
    where: { type: 'IP_PERMANENTLY_BANNED' }
  });
  console.log("SecurityEvent IP_PERMANENTLY_BANNED created:", event3 ? "PASS" : "FAIL", "| Message:", event3?.message);

  // 5. Banned IP Login Block (with correct password)
  console.log("\n[TEST 5] Login from banned IP with CORRECT password...");
  const res4 = await AuthService.adminLogin(prisma, testUser, testPass, testIp);
  console.log("Login blocked on banned IP:", !res4.success ? "PASS" : "FAIL", "| Error:", res4.error);

  const blockEvent = await prisma.securityEvent.findFirst({
    where: { type: 'LOGIN_BLOCKED_BANNED_IP' }
  });
  console.log("SecurityEvent LOGIN_BLOCKED_BANNED_IP created:", blockEvent ? "PASS" : "FAIL", "| Message:", blockEvent?.message);

  // 6. Restart Persistence Check
  console.log("\n[TEST 6] Restart Persistence...");
  // Simulate system restart by verifying BannedIp stays in db
  const persistenceCheck = await prisma.bannedIp.findUnique({ where: { normalizedIp: normalizedTestIp } });
  console.log("IP ban persists in DB record:", persistenceCheck?.active === true ? "PASS" : "FAIL");

  // 7. Admin IP List
  console.log("\n[TEST 7] Admin IP List...");
  const bannedList = await IpBanService.listBannedIps(prisma);
  const foundInList = bannedList.some(item => item.normalizedIp === normalizedTestIp && item.active);
  console.log("Banned IP visible in list:", foundInList ? "PASS" : "FAIL", "| Total Banned:", bannedList.length);

  // 8. Manual IP Ban
  console.log("\n[TEST 8] Manual IP Ban...");
  const manualIp = "192.168.1.105";
  const normalizedManualIp = IpBanService.normalizeIp(manualIp);
  await IpBanService.manualBanIp(prisma, manualIp, "Güvenlik Testi Manuel Engelleme", "yonetici-username");
  
  const manualRecord = await prisma.bannedIp.findUnique({ where: { normalizedIp: normalizedManualIp } });
  console.log("Manually banned IP active in DB:", manualRecord?.active === true ? "PASS" : "FAIL", "| Reason:", manualRecord?.reason);

  const manualEvent = await prisma.securityEvent.findFirst({
    where: { type: 'IP_MANUALLY_BANNED' }
  });
  console.log("SecurityEvent IP_MANUALLY_BANNED created:", manualEvent ? "PASS" : "FAIL");

  // 9. Admin IP Unban
  console.log("\n[TEST 9] Admin IP Unban...");
  await IpBanService.unbanIp(prisma, testIp, "yonetici-username", "Yonetici onayi ile engel kaldirildi");

  const unbannedRecord = await prisma.bannedIp.findUnique({ where: { normalizedIp: normalizedTestIp } });
  console.log("Banned IP is now inactive in DB:", unbannedRecord?.active === false ? "PASS" : "FAIL");

  const unbanEvent = await prisma.securityEvent.findFirst({
    where: { type: 'IP_UNBANNED' }
  });
  console.log("SecurityEvent IP_UNBANNED created:", unbanEvent ? "PASS" : "FAIL");

  // Verify Audit Log is populated for IP_UNBANNED
  const auditLogs = await prisma.auditLog.findMany({
    where: { eventType: 'IP_UNBANNED' }
  });
  console.log("Audit log IP_UNBANNED created:", auditLogs.length > 0 ? "PASS" : "FAIL");

  // 10. Successful Login
  console.log("\n[TEST 10] Login from unbanned IP with CORRECT credentials...");
  const res5 = await AuthService.adminLogin(prisma, testUser, testPass, testIp);
  console.log("Login success status:", res5.success ? "PASS" : "FAIL");

  const successEvent = await prisma.securityEvent.findFirst({
    where: { type: 'LOGIN_SUCCESS' }
  });
  console.log("SecurityEvent LOGIN_SUCCESS created:", successEvent ? "PASS" : "FAIL");

  // 11. Account Lockout test (5 failed attempts on user)
  console.log("\n[TEST 11] Account Lockout (5 failed attempts on user)...");
  // Change username to avoid IP ban during user lockout test by changing IPs
  for (let i = 1; i <= 5; i++) {
    const fakeIp = `192.168.2.${i}`;
    await AuthService.adminLogin(prisma, testUser, "WrongUserPass", fakeIp);
  }
  const lockoutRes = await AuthService.adminLogin(prisma, testUser, testPass, "192.168.2.99");
  console.log("Account locked out after 5 failures:", !lockoutRes.success ? "PASS" : "FAIL", "| Error message:", lockoutRes.error);

  console.log("\n=== ALL TESTS EXECUTED ===");
}

runTests()
  .catch(e => console.error("E2E Test failed:", e))
  .finally(() => prisma.$disconnect());
