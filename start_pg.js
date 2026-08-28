const { Pool } = require('pg');
const { start } = require('@embedded-postgres/postgres');

async function startPostgres() {
  try {
    const pg = await start({
      databaseName: 'karma_db',
      username: 'karma_admin',
      password: 'karma_secure_local_pass_2026',
      port: 54329,
      hostname: '127.0.0.1'
    });
    
    console.log('PostgreSQL started on port', pg.port);
    console.log('PostgreSQL version:', pg.version);
    
    // Wait a moment for it to be ready
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Test connection
    const pool = new Pool({
      connectionString: `postgresql://karma_admin:karma_secure_local_pass_2026@127.0.0.1:${pg.port}/karma_db?schema=public`
    });
    
    const res = await pool.query('SELECT 1');
    console.log('DB connection test:', res.rows);
    
    await pool.end();
    
    // Keep running for tests
    // In production, we'd stop here, but for tests we need it running
    console.log('Embedded PostgreSQL is running. Running tests...');
    
    // Return the pg object so tests can use it
    return pg;
  } catch (error) {
    console.error('Failed to start PostgreSQL:', error);
    process.exit(1);
  }
}

startPostgres();