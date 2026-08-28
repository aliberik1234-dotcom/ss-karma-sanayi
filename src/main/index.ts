import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';
import dotenv from 'dotenv';
import { PostgresManager } from './db/postgresManager.js';
import { getPrismaClient, disconnectPrisma } from './db/prismaClient.js';
import { registerIpcHandlers } from './ipc.js';
import { StartupLogger } from './services/loggerService.js';
import { initializeDefaultAdmin } from './db/seed.js';
import { BackupService } from './services/backupService.js';
import { google } from 'googleapis';

let mainWindow: BrowserWindow | null = null;
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

if (!isDev) {
  const possiblePaths = [
    app.isPackaged ? path.join(process.resourcesPath, '.env') : '',
    path.join(app.getAppPath(), '.env'),
    path.join(path.dirname(app.getAppPath()), '.env'),
    path.join(process.cwd(), '.env'),
  ].filter(Boolean) as string[];

  for (const envPath of possiblePaths) {
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath });
      break;
    }
  }
}

async function createWindow() {
  StartupLogger.log('WINDOW_CREATE', 'BrowserWindow olusturuluyor...');

  let iconPath = app.isPackaged
    ? path.join(process.resourcesPath, 'build', 'icon.ico')
    : path.join(__dirname, '../../build/icon.ico');
   if (!fs.existsSync(iconPath)) {
    iconPath = path.join(app.getAppPath(), 'build/icon.ico');
  }
  const preloadPath = path.join(__dirname, '../preload/index.js');
  StartupLogger.log('WINDOW_CREATE', `Preload script konumu: ${preloadPath} (Mevcut: ${fs.existsSync(preloadPath)})`);

  mainWindow = new BrowserWindow({
    width: 1366,
    height: 840,
    minWidth: 1200,
    minHeight: 720,
    title: 'S.S. Karma Sanayi Sitesi',
    backgroundColor: '#0f172a',
    icon: fs.existsSync(iconPath) ? iconPath : undefined,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.webContents.on('did-fail-load', (_, errorCode, errorDescription, validatedURL) => {
    StartupLogger.error('RENDERER_LOAD', `Sayfa yukleme hatasi [${errorCode}]: ${errorDescription} (${validatedURL})`);
  });

  mainWindow.webContents.on('render-process-gone', (_, details) => {
    StartupLogger.error('RENDERER_CRASH', `Renderer process kapandi: ${details.reason} (exitCode: ${details.exitCode})`);
  });

  if (isDev && process.env.VITE_DEV_SERVER_URL) {
    StartupLogger.log('RENDERER_LOAD', `Dev server yukleniyor: ${process.env.VITE_DEV_SERVER_URL}`);
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    let indexPath = path.join(__dirname, '../../dist-renderer/index.html');
    if (!fs.existsSync(indexPath)) {
      indexPath = path.join(app.getAppPath(), 'dist-renderer/index.html');
    }
    StartupLogger.log('RENDERER_LOAD', `Production HTML yukleniyor: ${indexPath} (Mevcut: ${fs.existsSync(indexPath)})`);
    await mainWindow.loadFile(indexPath);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function bootstrap() {
  StartupLogger.init();
  StartupLogger.log('ELECTRON_READY', `App Packaged: ${app.isPackaged}, AppPath: ${app.getAppPath()}`);

  try {
    // 1. Start Embedded PostgreSQL Engine
    StartupLogger.log('POSTGRES_START', 'PostgreSQL baslatiliyor...');
    const pgManager = PostgresManager.getInstance();
    await pgManager.start();
    StartupLogger.log('POSTGRES_READY', `PostgreSQL hazir: ${pgManager.getDatabaseUrl()}`);

    // 2. Connect Prisma
    StartupLogger.log('PRISMA_INIT', 'Prisma Client baslatiliyor...');
    const prisma = await getPrismaClient();
    StartupLogger.log('DATABASE_CONNECTED', 'Veritabani baglantisi basarili.');

    // 3. Initialize default admin if first run
    StartupLogger.log('ADMIN_INIT', 'Varsayilan yonetici hesabi kontrol ediliyor...');
    await initializeDefaultAdmin(prisma);
    StartupLogger.log('ADMIN_INIT', 'Varsayilan yonetici hesabi hazir.');

    // 4. Register Secure IPC handlers
    StartupLogger.log('IPC_INIT', 'IPC iletisim kanallari kaydediliyor...');
    registerIpcHandlers();

    // 5. Create App Window
    await createWindow();

    // 6. Validate and start auto-backup timer
    await validateAndStartAutoBackup(prisma);
    StartupLogger.log('APPLICATION_READY', 'S.S. Karma Saneyi Sitesi uygulamasi basariyla acildi.');

    // 7. Check for updates
    if (app.isPackaged) {
      checkForUpdates().catch((err) => StartupLogger.error('UPDATE', 'Check failed', err));
    }
  } catch (err: any) {
    StartupLogger.error('BOOTSTRAP_FAIL', 'Kritik baslangic hatasi olustu', err);
    dialog.showErrorBox(
      'S.S. Karma Sanayi Sitesi - Başlangıç Hatası',
      `Program başlatılırken bir hata oluştu.\n\nDetaylar günlük dosyasına kaydedildi:\n${StartupLogger.getLogPath()}\n\nHata: ${err.message || err}`
    );
    app.quit();
  }
}

let autoBackupTimer: NodeJS.Timeout | null = null;
let updateDownloaded = false;
const GOOGLE_REDIRECT_URI = 'http://localhost:38239/callback';

autoUpdater.on('update-available', (info) => {
  StartupLogger.log('UPDATE', `Güncelleme bulundu: v${info.version}`);
  if (mainWindow) {
    mainWindow.webContents.send('update:available', info);
  }
});

autoUpdater.on('update-not-available', () => {
  StartupLogger.log('UPDATE', 'Güncelleme bulunamadı.');
});

autoUpdater.on('error', (err) => {
  const errMsg = err?.message || String(err);
  const is404 = errMsg.includes('404') || errMsg.includes('Not found') || errMsg.toLowerCase().includes('github');
  if (is404) {
    StartupLogger.log('UPDATE', 'GitHub Releases bulunamadı (404). Henüz release yayınlanmamış olabilir.');
  } else {
    StartupLogger.error('UPDATE', 'Güncelleme hatası', err);
    if (mainWindow) {
      mainWindow.webContents.send('update:error', errMsg);
    }
  }
});

autoUpdater.on('download-progress', (progress) => {
  if (mainWindow) {
    mainWindow.webContents.send('update:progress', progress);
  }
});

autoUpdater.on('update-downloaded', () => {
  updateDownloaded = true;
  StartupLogger.log('UPDATE', 'Güncelleme indirildi.');
  if (mainWindow) {
    mainWindow.webContents.send('update:downloaded');
  }
});

ipcMain.handle('app:checkUpdate', async () => {
  if (!app.isPackaged) return { success: false, message: 'Geliştirme modunda güncelleme kontrolü yapılamaz.' };
  try {
    const result = await autoUpdater.checkForUpdates();
    if (result?.updateInfo) {
      return { success: true, version: result.updateInfo.version };
    }
    return { success: true, message: 'Güncel sürümsünüz.' };
   } catch (err: any) {
    const errMsg = err?.message || String(err);
    if (errMsg.includes('404') || errMsg.includes('Not found') || errMsg.toLowerCase().includes('github')) {
      return { success: true, message: 'GitHub\'da yeni sürüm bulunamadı. Güncel sürümsünüz.' };
    }
    return { success: false, error: errMsg };
  }
});

ipcMain.handle('app:quitAndInstall', async () => {
  updateDownloaded = true;
  autoUpdater.quitAndInstall();
  return { success: true };
});

async function checkForUpdates() {
  if (!app.isPackaged) {
    StartupLogger.log('UPDATE', 'Geliştirme modunda güncelleme kontrolü atlanıyor.');
    return;
  }
  try {
    const result = await autoUpdater.checkForUpdates();
    if (result?.updateInfo) {
      StartupLogger.log('UPDATE', `Yeni sürüm bulundu: v${result.updateInfo.version}. Arka planda indiriliyor...`);
      await autoUpdater.downloadUpdate();
    } else {
      StartupLogger.log('UPDATE', 'Uygulama güncel.');
    }
  } catch (err: any) {
    StartupLogger.error('UPDATE', 'Güncelleme kontrolü hatası', err);
  }
}

async function validateAndStartAutoBackup(prisma: any): Promise<void> {
  try {
    const enabled = await prisma.appSettings.findUnique({ where: { key: 'AUTO_BACKUP_ENABLED' } });
    const backupPath = await prisma.appSettings.findUnique({ where: { key: 'AUTO_BACKUP_PATH' } });
    const interval = await prisma.appSettings.findUnique({ where: { key: 'AUTO_BACKUP_INTERVAL' } });

    if (enabled?.value !== 'true') {
      return;
    }

    const dir = backupPath?.value;
    if (!dir) {
      return;
    }

    if (!fs.existsSync(dir)) {
      dialog.showMessageBox({
        type: 'warning',
        title: 'S.S. Karma Saneyi Sitesi',
        message: `Otomatik yedekleme klasörü bulunamadı:\n${dir}\nLütfen yeni bir dosya yolunu Ayarlar > Otomatik Yedekleme bölümünden belirleyin.`,
        buttons: ['Tamam'],
      });
      return;
    }

    const intervalHours = parseInt(interval?.value || '12', 10);
    const admin = await prisma.adminUser.findFirst();
    if (!admin) {
      return;
    }

     autoBackupTimer = setInterval(async () => {
      try {
        const backup = await BackupService.createBackup(prisma, admin.id);
        const dateStr = new Date().toISOString().slice(0, 10);
        const filePath = path.join(dir, `SS_Karma_Saneyi_Yedek_${dateStr}.enc`);
        fs.writeFileSync(filePath, backup.backupData);
        StartupLogger.log('AUTO_BACKUP', `Otomatik yedekleme tamamlandı: ${filePath}`);

        const cloudEnabled = await prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_ENABLED' } });
        if (cloudEnabled?.value === 'true') {
          try {
            const uploadRes = await uploadBackupToGoogleDrive(prisma, filePath);
            if (uploadRes.success) {
              StartupLogger.log('CLOUD_BACKUP', `Yedek Google Drive'a yüklendi: ${uploadRes.fileName}`);
            } else {
              StartupLogger.error('CLOUD_BACKUP', 'Google Drive yükleme hatası', new Error(uploadRes.error || 'Unknown'));
            }
          } catch (cloudErr: any) {
            StartupLogger.error('CLOUD_BACKUP', 'Google Drive yedekleme hatası', cloudErr);
          }
        }
      } catch (err: any) {
        StartupLogger.error('AUTO_BACKUP', 'Otomatik yedekleme hatası', err);
      }
    }, intervalHours * 60 * 60 * 1000);

    StartupLogger.log('AUTO_BACKUP', `Otomatik yedekleme başlatıldı: ${intervalHours} saatte bir, klasör: ${dir}`);
  } catch (err: any) {
    StartupLogger.error('AUTO_BACKUP', 'Otomatik yedekleme başlatma hatası', err);
  }
}

async function uploadBackupToGoogleDrive(prisma: any, filePath: string): Promise<{ success: boolean; fileName?: string; error?: string }> {
  try {
    const accessToken = await prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_TOKEN' } });
    const refreshToken = await prisma.appSettings.findUnique({ where: { key: 'CLOUD_SYNC_REFRESH' } });

    if (!accessToken?.value) {
      return { success: false, error: 'Google Drive erişim tokenı yok.' };
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId) {
      return { success: false, error: 'Google OAuth yapılandırılmamış.' };
    }

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, GOOGLE_REDIRECT_URI);
    oauth2Client.setCredentials({
      access_token: accessToken.value,
      refresh_token: refreshToken?.value,
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    const existing = await drive.files.list({
      q: `name='${fileName}' and trashed=false`,
      fields: 'files(id, name)',
    });

    const media = { body: Buffer.from(fileContent), mimeType: 'application/octet-stream' };

      if (existing.data.files && existing.data.files.length > 0) {
        const fileId = existing.data.files[0].id || '';
        await (drive.files as any).update({ fileId, media });
      } else {
      await drive.files.create({
        requestBody: { name: fileName, mimeType: 'application/octet-stream' },
        media,
        fields: 'id',
      });
    }

    return { success: true, fileName };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

app.whenReady().then(bootstrap);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', async () => {
  StartupLogger.log('SHUTDOWN', 'Uygulama kapatiliyor, kaynaklar temizleniyor...');
  try {
    if (autoBackupTimer) {
      clearInterval(autoBackupTimer);
      autoBackupTimer = null;
      StartupLogger.log('SHUTDOWN', 'Otomatik yedekleme zamanlayıcısı durduruldu.');
    }
    await disconnectPrisma();
    const pgManager = PostgresManager.getInstance();
    await pgManager.stop();
  } catch (err) {
    StartupLogger.error('SHUTDOWN', 'Kapatma sirasinda hata', err);
  }
});