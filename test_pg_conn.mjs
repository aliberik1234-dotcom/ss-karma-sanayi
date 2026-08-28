import { Client } from 'pg';

const c = new Client({
  host: '127.0.0.1',
  port: 54329,
  user: 'karma_admin',
  password: 'karma_secure_local_pass_2026',
  database: 'karma_db'
});

c.connect().then(() => {
  console.log('Connected!');
  return c.query('SELECT 1');
}).then((res) => {
  console.log('Query result:', res.rows);
  return c.end();
}).then(() => {
  console.disconnect();
  console.log('Done');
}).catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});