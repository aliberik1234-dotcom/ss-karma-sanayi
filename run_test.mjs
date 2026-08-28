// Start PostgreSQL using the application's PostgresManager
// Need to set TEST_MODE so it uses the test data directory

process.env.TEST_MODE = "true";

import { PrismaClient } from './src/generated/prisma/index.js';
import { PostgresManager } from './src/main/db/postgresManager.js';

async function start() {
  const pgMgr = PostgresManager.getInstance();
  const dbUrl = await pgMgr.start();
  console.log('PostgreSQL started:', dbUrl);
  
  // Test connection
  const { Client } = await import('pg');
  const c = new Client({
    host: '127.0.0.1',
    port: pgMgr.getPort(),
    user: 'karma_admin',
    password: 'karma_secure_local_pass_2026',
    database: 'karma_db'
  });
  
  await c.connect();
  const res = await c.query('SELECT 1');
  console.log('Query result:', res.rows);
  await c.end();
  
  // Now run the test
  console.log('Running test...');
  import('./tests/security_nirvana_test.mjs').then(module => {
    module.runTests().catch(e => console.error('Test failed:', e));
  }).then(() => {
    process.exit(0);
  }).catch(e => {
    console.error('Error running test:', e);
    process.exit(1);
  });
}

start().catch(e => {
  console.error('Failed to start:', e);
  process.exit(1);
});