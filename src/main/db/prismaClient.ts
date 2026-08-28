import path from 'path';
import fs from 'fs';
import { PrismaClient } from '../../generated/prisma/index.js';
import { PostgresManager } from './postgresManager.js';
import { StartupLogger } from '../services/loggerService.js';

let prisma: PrismaClient | null = null;

export async function getPrismaClient(): Promise<PrismaClient> {
  if (prisma) {
    return prisma;
  }

  const t0 = Date.now();
  const pgManager = PostgresManager.getInstance();
  const dbUrl = pgManager.getDatabaseUrl();
  process.env.DATABASE_URL = dbUrl;
  StartupLogger.log('PRISMA_INIT', `Prisma baglaniyor -> ${dbUrl}`);

  // In packaged Electron app, point Prisma to unpacked query engine binary
  try {
    const electron = await import('electron');
    const app = electron?.app;
    if (app && app.isPackaged) {
      const candidates = [
        path.join(process.resourcesPath, 'app.asar.unpacked', 'dist-electron', 'generated', 'prisma', 'query_engine-windows.dll.node'),
        path.join(process.resourcesPath, 'app.asar.unpacked', 'src', 'generated', 'prisma', 'query_engine-windows.dll.node'),
        path.join(app.getAppPath().replace('app.asar', 'app.asar.unpacked'), 'dist-electron', 'generated', 'prisma', 'query_engine-windows.dll.node')
      ];

      const found = candidates.find((c) => fs.existsSync(c));
      if (found) {
        process.env.PRISMA_QUERY_ENGINE_LIBRARY = found;
        StartupLogger.log('PRISMA_INIT', `Query Engine DLL: ${found}`);
      } else {
        StartupLogger.log('PRISMA_INIT', `Query Engine DLL candidates: ${JSON.stringify(candidates)}`);
      }
    }
  } catch (err) {
    StartupLogger.log('PRISMA_INIT', 'Electron ortaminda degil (node test)');
  }

  prisma = new PrismaClient({
    datasources: {
      db: {
        url: dbUrl
      }
    },
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
  });

  // Connect with fast retry if transient
  let connected = false;
  for (let i = 1; i <= 5; i++) {
    try {
      await prisma.$connect();
      connected = true;
      break;
    } catch (e: any) {
      StartupLogger.error('PRISMA_INIT', `Prisma $connect deneme ${i} basarisiz: ${e.message}`);
      if (i === 5) throw e;
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  const elapsed = Date.now() - t0;
  StartupLogger.log('PRISMA_INIT', `Prisma Client ${elapsed}ms icinde baglandi.`);
  return prisma;
}

export async function disconnectPrisma(): Promise<void> {
  if (prisma) {
    try {
      await prisma.$disconnect();
    } catch (e) {
      console.warn('[Prisma] Disconnect hatasi:', e);
    } finally {
      prisma = null;
    }
  }
}