import { Client } from 'pg';
const c = new Client({
  host: '127.0.0.1',
  port: 54329,
  user: 'karma_admin',
  password: 'karma_secure_local_pass_2026',
  database: 'karma_db'
});
c.connect().then(() => {
  console.log('Connected');
  c.query('SELECT 1').then(r => console.log(r.rows)).then(() => c.end()).catch(e2 => console.error('Query err:', e2.message));
}).catch(e => console.error('Connect err:', e.message));