import { PrismaClient } from '../src/generated/prisma/index.js';
import { PostgresManager } from '../dist-electron/main/db/postgresManager.js';
import { AuthService } from '../dist-electron/main/services/authService.js';
import { SecurityService } from '../dist-electron/main/services/securityService.js';

process.env.TEST_MODE = "true";
const pgManager = PostgresManager.getInstance();

async function main() {
  console.log("Starting PostgreSQL...");
  const dbUrl = await pgManager.start();
  console.log("DB URL:", dbUrl);

  const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });
  
  // Create user
  const username = "admin";
  const pass = "SuperSecretAdminPass123!";
  const hash = await SecurityService.hashPassword(pass);
  
  console.log("Cleaning and seeding admin...");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "AdminUser" CASCADE;`);
  
  const created = await prisma.adminUser.create({
    data: {
      username,
      displayName: "Test Admin",
      passwordHash: hash
    }
  });
  console.log("Created User in DB:", JSON.stringify(created));

  // Verify findUnique directly
  const foundDirect = await prisma.adminUser.findUnique({ where: { username } });
  console.log("Found Direct by 'admin':", JSON.stringify(foundDirect));

  // Try login
  console.log("Executing adminLogin...");
  const loginRes = await AuthService.adminLogin(prisma, "ADMIN", pass);
  console.log("Login result:", JSON.stringify(loginRes));

  await prisma.$disconnect();
  await pgManager.stop();
}

main().catch(async (e) => {
  console.error("ERROR:", e);
  await pgManager.stop();
});
