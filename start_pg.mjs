import { PostgresManager } from './src/main/db/postgresManager.js';

const m = PostgresManager.getInstance();
m.start().then(url => {
  console.log('PostgreSQL started, DB URL:', url);
}).catch(e => {
  console.error('Failed to start PostgreSQL:', e.message);
  process.exit(1);
});