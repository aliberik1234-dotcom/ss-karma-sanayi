import path from "path";
import fs from "fs";
import net from "net";
import { Client } from "pg";
import { spawnSync, spawn } from "child_process";
import { initializeDatabaseSchema } from "./schemaInit.js";
import { StartupLogger } from "../services/loggerService.js";

/**
 * PostgresManager — High-Performance Embedded PostgreSQL Lifecycle Manager
 * 
 * Features:
 *  - Fast sub-2s startup with millisecond socket probing
 *  - Automatic idempotent DDL schema initialization
 *  - Automated port conflict resolution & postgresql.conf patching
 *  - UTF8 locale with clean Windows exit handling
 */
export class PostgresManager {
  private static _instance: PostgresManager;
  private _isRunning = false;

  // Paths
  private readonly _appDataDir: string;
  private readonly _dataDir: string;
  private readonly _logFile: string;

  // DB credentials
  private _port = 54329;
  private readonly _user = "karma_admin";
  private readonly _password = "karma_secure_local_pass_2026";
  private readonly _database = "karma_db";

  // Binary paths
  private readonly _pgCtl: string;
  private readonly _initdb: string;

  private constructor() {
    const appData =
      process.env["APPDATA"] ||
      path.join(
        process.env["USERPROFILE"] ?? "C:\\Users\\Default",
        "AppData",
        "Roaming"
      );
    const subDir = process.env.TEST_MODE === "true" ? "ss-karma-sanayi-test" : "ss-karma-sanayi";
    this._appDataDir = path.join(appData, subDir);
    this._dataDir = path.join(this._appDataDir, "pgdata");
    this._logFile = path.join(this._appDataDir, "postgres.log");

    // Locate bundled binaries in node_modules or app.asar.unpacked
    const epWin64Main = require.resolve("@embedded-postgres/windows-x64");
    const pkgRoot = path.join(path.dirname(epWin64Main), "..");
    let binDir = path.join(pkgRoot, "native", "bin");
    if (binDir.includes("app.asar") && !binDir.includes("app.asar.unpacked")) {
      binDir = binDir.replace("app.asar", "app.asar.unpacked");
    }
    this._pgCtl = path.join(binDir, "pg_ctl.exe");
    this._initdb = path.join(binDir, "initdb.exe");
  }

  public static getInstance(): PostgresManager {
    if (!PostgresManager._instance) {
      PostgresManager._instance = new PostgresManager();
    }
    return PostgresManager._instance;
  }

  public getDatabaseUrl(): string {
    return (
      `postgresql://${this._user}:${encodeURIComponent(this._password)}` +
      `@127.0.0.1:${this._port}/${this._database}?schema=public`
    );
  }

  public getAppDataDir(): string {
    return this._appDataDir;
  }

  public getPort(): number {
    return this._port;
  }

  public async findFreePort(startPort = 54329): Promise<number> {
    const isPortFree = (p: number) =>
      new Promise<boolean>((resolve) => {
        const srv = net.createServer();
        srv.unref();
        srv.on("error", () => resolve(false));
        srv.listen(p, "127.0.0.1", () => {
          srv.close(() => resolve(true));
        });
      });

    let port = startPort;
    for (let i = 0; i < 50; i++) {
      if (await isPortFree(port)) return port;
      port++;
    }
    return startPort;
  }

  private cleanupStalePid(): void {
    const pidFile = path.join(this._dataDir, "postmaster.pid");
    if (fs.existsSync(pidFile)) {
      try {
        StartupLogger.log("POSTGRES_START", "Eski postmaster.pid temizleniyor...");
        fs.unlinkSync(pidFile);
      } catch (e) {
        StartupLogger.error("POSTGRES_START", "PID temizleme uyarisi:", e);
      }
    }
  }

  private patchPostgresqlConf(): void {
    const confPath = path.join(this._dataDir, "postgresql.conf");
    if (!fs.existsSync(confPath)) return;

    let conf = fs.readFileSync(confPath, "latin1");
    conf = conf.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    if (/^#?\s*port\s*=/m.test(conf)) {
      conf = conf.replace(/^#?\s*port\s*=.*$/m, `port = ${this._port}`);
    } else {
      conf += `\nport = ${this._port}\n`;
    }

    if (/^#?\s*listen_addresses\s*=/m.test(conf)) {
      conf = conf.replace(/^#?\s*listen_addresses\s*=.*$/m, `listen_addresses = '127.0.0.1'`);
    } else {
      conf += `\nlisten_addresses = '127.0.0.1'\n`;
    }

    fs.writeFileSync(confPath, conf, "latin1");
    StartupLogger.log("POSTGRES_START", `postgresql.conf yapilandirildi (port=${this._port})`);
  }

  private initCluster(): void {
    const pgVersionFile = path.join(this._dataDir, "PG_VERSION");
    if (fs.existsSync(pgVersionFile)) {
      StartupLogger.log("POSTGRES_START", "Mevcut PostgreSQL veri kumesi tespit edildi.");
      return;
    }

    StartupLogger.log("POSTGRES_START", "Yeni cluster olusturuluyor (initdb --locale=C --encoding=UTF8)...");
    const tmpPassFile = path.join(this._appDataDir, ".pgpass_init_tmp");
    fs.writeFileSync(tmpPassFile, this._password + "\n", { encoding: "utf8" });

    try {
      const r = spawnSync(
        this._initdb,
        [
          `--pgdata=${this._dataDir}`,
          `--auth=password`,
          `--username=${this._user}`,
          `--pwfile=${tmpPassFile}`,
          `--locale=C`,
          `--encoding=UTF8`,
        ],
        { encoding: "utf8", timeout: 30000 }
      );

      if (r.status !== 0) {
        throw new Error(`initdb basarisiz (exit ${r.status}):\n${r.stderr}`);
      }
      StartupLogger.log("POSTGRES_START", "initdb basariyla tamamlandi.");
    } finally {
      try { fs.unlinkSync(tmpPassFile); } catch {}
    }
  }

  public async start(): Promise<string> {
    if (this._isRunning) return this.getDatabaseUrl();

    const t0 = Date.now();
    StartupLogger.log("POSTGRES_START", "PostgreSQL baslatma dongusu basliyor...");
    fs.mkdirSync(this._dataDir, { recursive: true });

    // 1. Port secimi
    this._port = await this.findFreePort(54329);
    StartupLogger.log("POSTGRES_START", `PostgreSQL Calisma Portu: ${this._port}`);

    // 2. Cluster hazirlama
    this.initCluster();

    // 3. Config duzenleme
    this.patchPostgresqlConf();

    // 4. Stale PID temizligi
    this.cleanupStalePid();

    // 5. Hizli pg_ctl start
    const r = spawnSync(
      this._pgCtl,
      ["-D", this._dataDir, "-l", this._logFile, "-w", "start"],
      { encoding: "utf8", timeout: 15000 }
    );

    const startOutput = (r.stdout || "") + (r.stderr || "");
    StartupLogger.log("POSTGRES_START", `pg_ctl sonucu: ${startOutput.trim()}`);

    // 6. Bootstrap: Database & DDL Schema & Seeds
    await this.ensureDatabaseAndSchema();

    this._isRunning = true;
    const dbUrl = this.getDatabaseUrl();
    process.env["DATABASE_URL"] = dbUrl;

    const elapsed = Date.now() - t0;
    StartupLogger.log("POSTGRES_READY", `PostgreSQL ${elapsed}ms icinde hazir: ${dbUrl}`);
    return dbUrl;
  }

  private async ensureDatabaseAndSchema(maxRetries = 40, delayMs = 100): Promise<void> {
    let systemClient: Client | null = null;

    // Asama 1: template1 uzerinden baglan
    for (let i = 1; i <= maxRetries; i++) {
      systemClient = new Client({
        host: "127.0.0.1",
        port: this._port,
        user: this._user,
        password: this._password,
        database: "template1",
        connectionTimeoutMillis: 1500,
      });

      try {
        await systemClient.connect();
        StartupLogger.log("POSTGRES_READY", `PostgreSQL soket baglantisi saglandi (${i}. deneme).`);
        break;
      } catch {
        try { await systemClient.end(); } catch {}
        systemClient = null;
        if (i === maxRetries) {
          throw new Error(`[PostgresManager] PostgreSQL baslatilamadi (${maxRetries} deneme sonrasi zaman asimi).`);
        }
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }

    if (!systemClient) throw new Error("[PostgresManager] template1 baglantisi kurulamadi.");

    // Asama 2: karma_db yoksa olustur
    try {
      const res = await systemClient.query(
        "SELECT 1 FROM pg_database WHERE datname = $1",
        [this._database]
      );
      if ((res.rowCount ?? 0) === 0) {
        await systemClient.query(`CREATE DATABASE "${this._database}"`);
        StartupLogger.log("POSTGRES_READY", `'${this._database}' veritabani olusturuldu.`);
      } else {
        StartupLogger.log("POSTGRES_READY", `'${this._database}' veritabani mevcut.`);
      }
    } finally {
      try { await systemClient.end(); } catch {}
    }

    // Asama 3: karma_db baglantisi ve DDL sema olusturma
    const dbClient = new Client({
      host: "127.0.0.1",
      port: this._port,
      user: this._user,
      password: this._password,
      database: this._database,
      connectionTimeoutMillis: 2000,
    });

    try {
      await dbClient.connect();
      StartupLogger.log("POSTGRES_READY", "karma_db DDL sema kontrolu ve olusturma basliyor...");
      await initializeDatabaseSchema(dbClient);
      StartupLogger.log("POSTGRES_READY", "karma_db DDL tablolari ve semasi basariyla dogrulandi.");
    } finally {
      try { await dbClient.end(); } catch {}
    }
  }

  public async stop(): Promise<void> {
    if (!this._isRunning) return;
    StartupLogger.log("SHUTDOWN", "PostgreSQL durduruluyor...");

    try {
      spawnSync(this._pgCtl, ["-D", this._dataDir, "-m", "fast", "stop"], {
        encoding: "utf8",
        timeout: 10000,
      });
      StartupLogger.log("SHUTDOWN", "PostgreSQL basariyla kapatildi.");
    } catch (e) {
      StartupLogger.error("SHUTDOWN", "PostgreSQL kapatma hatasi:", e);
    } finally {
      this._isRunning = false;
    }
  }
}