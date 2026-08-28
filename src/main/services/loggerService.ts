import fs from 'fs';
import path from 'path';

export class StartupLogger {
  private static logFile: string | null = null;

  public static init(): string {
    const appData =
      process.env['APPDATA'] ||
      path.join(process.env['USERPROFILE'] ?? 'C:\\Users\\Default', 'AppData', 'Roaming');
    const logDir = path.join(appData, 'ss-karma-sanayi', 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    this.logFile = path.join(logDir, 'startup.log');
    this.log('START', '═══════════════════════════════════════════════════════════════════');
    this.log('START', 'S.S. KARMA SANAYİ SİTESİ v1.0.0 BAŞLATILIYOR...');
    this.log('START', `Node: ${process.version}, Platform: ${process.platform}, Arch: ${process.arch}`);
    return this.logFile;
  }

  public static log(phase: string, message: string): void {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${phase}] ${message}\n`;
    console.log(`[${phase}] ${message}`);
    if (this.logFile) {
      try {
        fs.appendFileSync(this.logFile, line, 'utf8');
      } catch (err) {
        console.error('Log yazma hatasi:', err);
      }
    }
  }

  public static error(phase: string, message: string, err?: any): void {
    const timestamp = new Date().toISOString();
    const errDetails = err ? (err.stack || err.message || String(err)) : '';
    const line = `[${timestamp}] [ERROR] [${phase}] ${message} ${errDetails}\n`;
    console.error(`[ERROR] [${phase}] ${message}`, err);
    if (this.logFile) {
      try {
        fs.appendFileSync(this.logFile, line, 'utf8');
      } catch {}
    }
  }

  public static getLogPath(): string {
    return this.logFile || '';
  }
}