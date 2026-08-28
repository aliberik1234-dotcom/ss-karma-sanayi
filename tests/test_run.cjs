const { PrismaClient } = require('../src/generated/prisma');
const { SecurityService } = require('../dist-electron/main/services/securityService.js');
const { AuthService } = require('../dist-electron/main/services/authService.js');

const dbUrl = "postgresql://karma_admin:karma_secure_local_pass_2026@127.0.0.1:54329/karma_db?schema=public";
const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });

async function main() {
  const pass = "SuperSecretAdminPass123!";
  const hash = await SecurityService.hashPassword(pass);
  console.log("pass:", pass);
  console.log("hash:", hash);

  const username = "admin";
  await prisma.adminUser.deleteMany({ where: { username } });
  await prisma.adminUser.create({
    data: {
      username,
      displayName: "Admin",
      passwordHash: hash
    }
  });

  const originalVerify = SecurityService.verifyPassword;
  SecurityService.verifyPassword = async (p, h) => {
    console.log("INTERCEPTED verifyPassword - p:", JSON.stringify(p), "h:", JSON.stringify(h));
    const res = await originalVerify(p, h);
    console.log("INTERCEPTED verifyPassword - res:", res);
    return res;
  };

  const loginRes = await AuthService.adminLogin(prisma, "ADMIN", pass);
  console.log("loginResult:", loginRes);
  await prisma.$disconnect();
}
main().catch(console.error);
