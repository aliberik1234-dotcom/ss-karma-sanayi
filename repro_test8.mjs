import { PostgresManager } from './dist-electron/main/db/postgresManager.js';
import { getPrismaClient, disconnectPrisma } from './dist-electron/main/db/prismaClient.js';
import { MemberService } from './dist-electron/main/services/memberService.js';

const OP_TIMEOUT_MS = 10_000;
const STARTUP_TIMEOUT_MS = 60_000;

function withTimeout(promise, label, timeoutMs) {
  const ms = timeoutMs !== undefined ? timeoutMs : OP_TIMEOUT_MS;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('TIMEOUT after ' + ms + 'ms: ' + label));
      }, ms);
    })
  ]);
}

async function run() {
  const pgManager = PostgresManager.getInstance();
  console.log('Starting PostgreSQL...');
  const dbUrl = process.env.TEST_DB_URL || await withTimeout(pgManager.start(), 'PostgresManager.start()', STARTUP_TIMEOUT_MS);
  console.log('DB URL:', dbUrl);

  console.log('Getting PrismaClient...');
  const prisma = await withTimeout(getPrismaClient(), 'getPrismaClient()');
  console.log('Prisma connected');

  console.log('Cleaning member tables...');
  await withTimeout(prisma.member.deleteMany(), 'member.deleteMany()');
  await withTimeout(prisma.memberPrivateFinancial.deleteMany(), 'memberPrivateFinancial.deleteMany()');
  await withTimeout(prisma.installmentPlan.deleteMany(), 'installmentPlan.deleteMany()');
  await withTimeout(prisma.installment.deleteMany(), 'installment.deleteMany()');
  await withTimeout(prisma.auditLog.deleteMany(), 'auditLog.deleteMany()');

  console.log('Starting TEST 8 sequence...');
  const adminId = 'test-admin-id';

  console.log('Creating member1 with seq 1...');
  const t1 = Date.now();
  const member1 = await withTimeout(
    MemberService.createMember(prisma, adminId, {
      fullName: 'bU bİR dENEME cÜMLESİ',
      phone: '05321234567',
      sequenceNumber: 1
    }),
    'MemberService.createMember(member1)'
  );
  console.log('member1 created in ' + (Date.now() - t1) + 'ms:', member1.sequenceNumber, member1.fullName);

  console.log('Creating member2 auto-seq...');
  const t2 = Date.now();
  const member2 = await withTimeout(
    MemberService.createMember(prisma, adminId, {
      fullName: 'İBRAHİM BERİK',
      phone: '05449876543'
    }),
    'MemberService.createMember(member2)'
  );
  console.log('member2 created in ' + (Date.now() - t2) + 'ms:', member2.sequenceNumber, member2.fullName);

  console.log('Attempting duplicate seq 1 (should throw)...');
  try {
    await withTimeout(
      MemberService.createMember(prisma, adminId, {
        fullName: 'Ahmet Yılmaz',
        phone: '05551112233',
        sequenceNumber: 1
      }),
      'MemberService.createMember(duplicate)'
    );
    console.log('ERROR: duplicate should have thrown');
    process.exit(1);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.indexOf('TIMEOUT') !== -1) {
      console.error('HANG DETECTED:', msg);
      process.exit(1);
    }
    console.log('Duplicate correctly rejected:', msg);
  }

  console.log('TEST 8 completed successfully');
  
  // Minimal cleanup: disconnect PrismaClient pool
  console.log('\nDisconnecting PrismaClient...');
  await disconnectPrisma();
  console.log('PrismaClient disconnected.');
  
  console.log('\n--- Active handles after cleanup ---');
  const handles = process._getActiveHandles();
  console.log('Active handles count:', handles.length);
  for (const h of handles) {
    const type = h.constructor && h.constructor.name ? h.constructor.name : typeof h;
    console.log(' -', type);
  }
  
  console.log('\n--- Active requests after cleanup ---');
  const requests = process._getActiveRequests();
  console.log('Active requests count:', requests.length);
  for (const r of requests) {
    const type = r.constructor && r.constructor.name ? r.constructor.name : typeof r;
    console.log(' -', type);
  }
}

run().catch((err) => {
  console.error('TEST 8 failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
