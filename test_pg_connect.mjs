import { Client } from 'pg';

const c = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  database: 'postgres'
});

c.connect().then(() => {
  console.log('Connected!');
  return c.query('SELECT 1');
}).then((res) => {
  console.log('Result:', res.rows);
  return c.end();
}).then(() => {
  console.log('Disconnected');
}).catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});