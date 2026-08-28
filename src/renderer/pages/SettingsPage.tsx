import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { useToast } from '../context/ToastContext';
import { AuditLogItem } from '../types';
import { ConfirmModal } from '../components/ConfirmModal';
import {
  Settings,
  Shield,
  KeyRound,
  FileCheck2,
  Database,
  Volume2,
  Lock,
  User,
  ArrowLeft,
  Download,
  Upload,
  RefreshCw,
   CheckCircle2,
  AlertTriangle,
  FolderOpen,
  Save,
  Clock,
   FileSpreadsheet,
   Cloud
} from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const { token, logout, role } = useAuth();
  const { soundEnabled, setSoundEnabled, playClick, playSuccess, playError } = useSound();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'admin' | 'private' | 'audit' | 'backup' | 'auto-backup' | 'system' | 'cloud'>('admin');

  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [oldAdminPass, setOldAdminPass] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [newAdminPassConfirm, setNewAdminPassConfirm] = useState('');

  const [oldPrivatePass, setOldPrivatePass] = useState('');
  const [newPrivatePass, setNewPrivatePass] = useState('');
  const [newPrivatePassConfirm, setNewPrivatePassConfirm] = useState('');

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [auditStatus, setAuditStatus] = useState<any>(null);
  const [isVerifyingChain, setIsVerifyingChain] = useState(false);
  const [backupStats, setBackupStats] = useState<any>(null);
  const [backupHealth, setBackupHealth] = useState<any>(null);
  const [restoreJson, setRestoreJson] = useState('');
  const [restoreFileName, setRestoreFileName] = useState('');
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [excelPassword, setExcelPassword] = useState('');
  const [excelPasswordConfirm, setExcelPasswordConfirm] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'checking' | 'available' | 'downloading' | 'downloaded' | 'latest' | 'error'>('idle');
  const [updateVersion, setUpdateVersion] = useState<string | null>(null);
  const [updateProgress, setUpdateProgress] = useState<number | null>(null);
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'idle' | 'connecting' | 'connected' | 'error' | 'syncing'>('idle');
  const [googleDriveEmail, setGoogleDriveEmail] = useState<string | null>(null);
  const [cloudSyncInterval, setCloudSyncInterval] = useState(12);
  const [isManualCloudBackup, setIsManualCloudBackup] = useState(false);

  const [autoBackupConfig, setAutoBackupConfig] = useState<{ enabled: boolean; backupPath: string; intervalHours: number } | null>(null);
  const [isAutoBackupLoading, setIsAutoBackupLoading] = useState(false);

  const fetchAuditLogs = async () => {
    if (!token) return;
    try {
      const res = await window.electronAPI.getAuditLogs({ token });
      if (res?.success) {
        setAuditLogs(res.logs || []);
      }
    } catch {}
  };

  useEffect(() => {
    if (activeTab === 'audit') {
      fetchAuditLogs();
    }
  }, [activeTab]);

  useEffect(() => {
    const onAvailable = (info: any) => {
      setUpdateStatus('available');
      setUpdateVersion(info?.version || null);
    };
    const onProgress = (progress: any) => {
      setUpdateStatus('downloading');
      setUpdateProgress(Math.round(progress.percent || 0));
    };
    const onDownloaded = () => {
      setUpdateStatus('downloaded');
    };
    const onError = (message: string) => {
      setUpdateStatus('error');
      showToast('error', `Güncelleme hatası: ${message}`);
    };

    window.electronAPI.onUpdateAvailable(onAvailable);
    window.electronAPI.onUpdateProgress(onProgress);
    window.electronAPI.onUpdateDownloaded(onDownloaded);
    window.electronAPI.onUpdateError(onError);

    return () => {
      window.electronAPI.removeUpdateListeners();
    };
  }, []);

  const handleCheckUpdate = async () => {
    setUpdateStatus('checking');
    try {
      const res = await window.electronAPI.checkForUpdate();
      if (res?.success) {
        if (res.version) {
          setUpdateStatus('available');
          setUpdateVersion(res.version);
        } else {
          setUpdateStatus('latest');
        }
      } else {
        setUpdateStatus('error');
        if (res?.error) showToast('error', res.error);
      }
    } catch (e: any) {
      setUpdateStatus('error');
      showToast('error', e.message);
    }
  };

  const handleRestartToUpdate = async () => {
    await window.electronAPI.quitAndInstall();
  };

  const fetchCloudSyncConfig = async () => {
    try {
      const res = await window.electronAPI.getCloudSyncConfig();
      if (res?.success && res.config) {
        setCloudSyncEnabled(res.config.enabled);
        setGoogleDriveEmail(res.config.email || null);
      }
    } catch {}
  };

  const handleManualCloudBackup = async () => {
    if (!token || !cloudSyncEnabled) return;
    setIsManualCloudBackup(true);
    try {
      const res = await window.electronAPI.cloudBackupAndUpload({ token });
      if (res?.success) {
        playSuccess();
        showToast('success', 'Yedek Google Drive\'a yüklendi.');
      } else {
        playError();
        showToast('error', res?.error || 'Bulut yedekleme başarısız.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    } finally {
      setIsManualCloudBackup(false);
    }
   };

  const saveCloudSyncInterval = async (interval: number) => {
    if (!token) return;
    try {
      await window.electronAPI.saveCloudSyncInterval({ token, intervalHours: interval });
    } catch {}
  };

  const handleToggleCloudSync = async () => {
    if (!cloudSyncEnabled) {
      setCloudSyncStatus('connecting');
      try {
        const res = await window.electronAPI.googleDriveAuth();
        if (res?.success && res.authUrl) {
          window.open(res.authUrl, '_blank', 'width=500,height=600');
          setCloudSyncStatus('connecting');
          const callback = (_: any, data: any) => {
            if (data?.success && data?.email) {
              setCloudSyncEnabled(true);
              setCloudSyncStatus('connected');
              setGoogleDriveEmail(data.email);
              window.electronAPI.removeGoogleDriveAuthCallback();
            } else if (data?.error) {
              setCloudSyncStatus('error');
              showToast('error', data.error);
              window.electronAPI.removeGoogleDriveAuthCallback();
            }
          };
          window.electronAPI.onGoogleDriveAuthResult(callback);
        } else if (res?.success && res.email) {
          setCloudSyncEnabled(true);
          setCloudSyncStatus('connected');
          setGoogleDriveEmail(res.email);
        } else {
          setCloudSyncStatus('error');
          showToast('error', res?.error || 'Google Drive bağlantısı başarısız.');
        }
      } catch (e: any) {
        setCloudSyncStatus('error');
        showToast('error', e.message);
      }
    } else {
      try {
        await window.electronAPI.setCloudSyncConfig({ token, enabled: false });
        setCloudSyncEnabled(false);
        setCloudSyncStatus('idle');
        setGoogleDriveEmail(null);
        showToast('success', 'Bulut senkronizasyon devre dışı bırakıldı.');
      } catch (e: any) {
        showToast('error', e.message);
      }
    }
  };

  useEffect(() => {
    fetchCloudSyncConfig();
  }, []);

  const handleChangeAdminUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newAdminUsername.trim()) return;
    try {
      const res = await window.electronAPI.changeAdminUsername({ token, newUsername: newAdminUsername });
      if (res?.success) {
        playSuccess();
        showToast('success', 'Admin kullanıcı adı güncellendi. Lütfen yeni adınızla tekrar giriş yapınız.');
        logout();
      } else {
        playError();
        showToast('error', res?.error || 'Kullanıcı adı değiştirilemedi.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    }
  };

  const handleChangeAdminPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !oldAdminPass || !newAdminPass) return;
    if (newAdminPass !== newAdminPassConfirm) {
      showToast('error', 'Yeni şifreler birbiriyle uyuşmuyor.');
      return;
    }
    try {
      const res = await window.electronAPI.changeAdminPassword({ token, oldPass: oldAdminPass, newPass: newAdminPass });
      if (res?.success) {
        playSuccess();
        showToast('success', 'Admin şifresi güncellendi.');
        logout();
      } else {
        playError();
        showToast('error', res?.error || 'Şifre değiştirilemedi.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    }
  };

  const handleChangePrivatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !oldPrivatePass || !newPrivatePass) return;
    if (newPrivatePass !== newPrivatePassConfirm) {
      showToast('error', 'Yeni özel parolalar birbiriyle uyuşmuyor.');
      return;
    }
    try {
      const res = await window.electronAPI.changePrivatePassword({ token, oldPass: oldPrivatePass, newPass: newPrivatePass });
      if (res?.success) {
        playSuccess();
        showToast('success', 'Özel parola başarıyla güncellendi.');
        setOldPrivatePass('');
        setNewPrivatePass('');
        setNewPrivatePassConfirm('');
      } else {
        playError();
        showToast('error', res?.error || 'Özel parola değiştirilemedi.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    }
  };

  const handleVerifyAuditChain = async () => {
    if (!token) return;
    setIsVerifyingChain(true);
    try {
      const res = await window.electronAPI.verifyAuditChain({ token });
      if (res?.success) {
        setAuditStatus(res.result);
        if (res.result.status === 'VALID') {
          playSuccess();
          showToast('success', res.result.details);
        } else {
          playError();
          showToast('error', res.result.details);
        }
      }
    } catch (e: any) {
      showToast('error', e.message);
    } finally {
      setIsVerifyingChain(false);
    }
  };

  const handleCreateBackup = async () => {
    if (!token) return;
    try {
      const res = await window.electronAPI.createBackup({ token });
      if (res?.success && res.backup) {
        playSuccess();
        const element = document.createElement('a');
        const file = new Blob([res.backup.backupData], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = `SS_Karma_Sanayi_Backup_${new Date().toISOString().slice(0, 10)}.enc`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        setBackupStats(res.backup.stats);
        showToast('success', 'Şifreli veritabanı yedeği oluşturuldu ve indirildi.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    }
  };

  const handleConfirmRestore = async () => {
    if (!token || !restoreJson) return;
    try {
      const res = await window.electronAPI.restoreBackup({ token, encryptedBackup: restoreJson });
      if (res?.success) {
        playSuccess();
        showToast('success', res.message);
        setIsRestoreModalOpen(false);
        setRestoreJson('');
        setRestoreFileName('');
      } else {
        playError();
        showToast('error', res?.error || 'Geri yükleme başarısız.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    }
  };

  const handleExportExcel = async () => {
    if (!token) return;
    if (excelPassword !== excelPasswordConfirm) {
      playError();
      showToast('error', 'Excel parolaları eşleşmiyor. Lütfen kontrol edin.');
      return;
    }
    setIsExporting(true);
    try {
      const res = await window.electronAPI.exportExcel({ token, password: excelPassword });
      if (res?.success && res.excelBase64) {
        const byteChars = atob(res.excelBase64);
        const byteNumbers = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
          byteNumbers[i] = byteChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const element = document.createElement('a');
        const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        element.href = URL.createObjectURL(blob);
        element.download = `SS_Karma_Sanayi_Excel_${new Date().toISOString().slice(0, 10)}.xlsx`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        playSuccess();
        showToast('success', excelPassword ? 'Excel dosyası şifreyle korundu ve indirildi.' : 'Excel dosyası indirildi.');
        setExcelPassword('');
        setExcelPasswordConfirm('');
      } else {
        playError();
        showToast('error', res?.error || 'Excel export başarısız.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    } finally {
      setIsExporting(false);
    }
  };

  const fetchAutoBackupConfig = async () => {
    try {
      const res = await window.electronAPI.getAutoBackupConfig();
      if (res?.success && res.config) {
        setAutoBackupConfig(res.config);
      } else {
        setAutoBackupConfig({ enabled: false, backupPath: '', intervalHours: 12 });
      }
    } catch {
      setAutoBackupConfig({ enabled: false, backupPath: '', intervalHours: 12 });
    }
  };

  const handleSaveAutoBackup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !autoBackupConfig) return;
    setIsAutoBackupLoading(true);
    try {
      const res = await window.electronAPI.saveAutoBackupConfig({
        token,
        enabled: autoBackupConfig.enabled,
        backupPath: autoBackupConfig.backupPath,
        intervalHours: autoBackupConfig.intervalHours,
      });
      if (res?.success) {
        playSuccess();
        showToast('success', 'Otomatik yedekleme ayarları kaydedildi.');
      } else {
        playError();
        showToast('error', res?.error || 'Ayarlar kaydedilemedi.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    } finally {
      setIsAutoBackupLoading(false);
    }
  };

  const handleSelectBackupDir = async () => {
    const res = await window.electronAPI.selectBackupDirectory();
    if (res?.success && res.path) {
      setAutoBackupConfig({ ...autoBackupConfig!, backupPath: res.path });
    }
  };

  const INTERVAL_OPTIONS = [
    { value: 2, label: '2 Saat' },
    { value: 12, label: '12 Saat' },
    { value: 24, label: '24 Saat' },
    { value: 48, label: '48 Saat' },
    { value: 168, label: '1 Hafta' },
  ];

  const fetchBackupHealth = async () => {
    try {
      const res = await window.electronAPI.getBackupHealth();
      if (res?.success) {
        setBackupHealth(res.health);
      }
    } catch {}
  };

  useEffect(() => {
    if (activeTab === 'auto-backup' && !autoBackupConfig) {
      fetchAutoBackupConfig();
    }
    if (activeTab === 'backup' && !backupHealth) {
      fetchBackupHealth();
    }
  }, [activeTab]);

  useEffect(() => {
    if (autoBackupConfig?.enabled && autoBackupConfig?.backupPath) {
      window.electronAPI.validateBackupPath().then((res: any) => {
        if (!res.valid && res.message) {
          showToast('warning', res.message);
        }
      });
    }
  }, [autoBackupConfig]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { playClick(); onBack(); }}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Geri Dön"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Yönetim ve Güvenlik Ayarları</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Admin Kimlik, Parola, Denetim ve Yedekleme</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        <div className="w-56 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4 space-y-1.5 shrink-0 text-xs">
          {[
            { id: 'admin', label: 'Admin Hesabı', icon: Shield, color: 'text-blue-600 dark:text-blue-400' },
            { id: 'private', label: 'Özel Parola', icon: KeyRound, color: 'text-amber-600 dark:text-amber-400' },
            { id: 'audit', label: 'Denetim Kayıtları', icon: FileCheck2, color: 'text-blue-600 dark:text-blue-400' },
            { id: 'backup', label: 'Yedekleme & Kurtarma', icon: Database, color: 'text-blue-600 dark:text-blue-400' },
            { id: 'auto-backup', label: 'Otomatik Yedekleme', icon: Clock, color: 'text-emerald-600 dark:text-emerald-400' },
            { id: 'system', label: 'Sistem & Ses', icon: Settings, color: 'text-slate-600 dark:text-slate-400' },
            { id: 'cloud', label: 'Bulut Senkronizasyon', icon: Cloud, color: 'text-indigo-600 dark:text-indigo-400' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { playClick(); setActiveTab(tab.id as any); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${tab.color}`} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {activeTab === 'admin' && (
            <div className="max-w-xl space-y-8">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Admin Kullanıcı Adı Değiştir</span>
                </h3>
                <form onSubmit={handleChangeAdminUsername} className="space-y-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Yeni Kullanıcı Adı</label>
                    <input type="text" value={newAdminUsername} onChange={(e) => setNewAdminUsername(e.target.value)} placeholder="Yeni kullanıcı adı"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors">
                    Kullanıcı Adını Güncelle
                  </button>
                </form>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Admin Şifresi Değiştir</span>
                </h3>
                <form onSubmit={handleChangeAdminPassword} className="space-y-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Mevcut Admin Şifresi</label>
                    <input type="password" value={oldAdminPass} onChange={(e) => setOldAdminPass(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Yeni Admin Şifresi</label>
                    <input type="password" value={newAdminPass} onChange={(e) => setNewAdminPass(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Yeni Admin Şifresi (Tekrar)</label>
                    <input type="password" value={newAdminPassConfirm} onChange={(e) => setNewAdminPassConfirm(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500" />
                  </div>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors">
                    Şifreyi Güncelle
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'private' && (
            <div className="max-w-xl">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  <span>Kişisel Özel Bilgiler Parolası Değiştir</span>
                </h3>
                <form onSubmit={handleChangePrivatePassword} className="space-y-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Mevcut Özel Parola</label>
                    <input type="password" value={oldPrivatePass} onChange={(e) => setOldPrivatePass(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Yeni Özel Parola</label>
                    <input type="password" value={newPrivatePass} onChange={(e) => setNewPrivatePass(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 mb-1">Yeni Özel Parola (Tekrar)</label>
                    <input type="password" value={newPrivatePassConfirm} onChange={(e) => setNewPrivatePassConfirm(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500" />
                  </div>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition-colors">
                    Özel Parolayı Güncelle
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Denetim Kayıtları</h3>
                <button
                  onClick={handleVerifyAuditChain}
                  disabled={isVerifyingChain}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium disabled:opacity-50 transition-colors"
                >
                  {isVerifyingChain ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                  <span>{isVerifyingChain ? 'Doğrulanıyor...' : 'Zincir Doğrula'}</span>
                </button>
              </div>

              {auditStatus && (
                <div className={`p-4 rounded-lg border flex items-center gap-2 ${
                  auditStatus.status === 'VALID'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-200'
                }`}>
                  {auditStatus.status === 'VALID' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  <span className="font-medium">{auditStatus.details}</span>
                </div>
              )}

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">Zaman</th>
                      <th className="text-left px-4 py-3 font-medium">Olay</th>
                      <th className="text-left px-4 py-3 font-medium">Aktör</th>
                      <th className="text-left px-4 py-3 font-medium">Üye</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-slate-400 dark:text-slate-500">
                          {new Date(log.createdAt).toLocaleString('tr-TR')}
                        </td>
                        <td className="px-4 py-3 text-slate-900 dark:text-slate-100 font-mono">{log.eventType}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{log.actorType}</td>
                        <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                          {log.memberId ? log.memberId.slice(0, 8) + '...' : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

           {activeTab === 'backup' && (
              <div className="max-w-xl space-y-6">
              {backupHealth && (
                <div className={`flex items-center gap-3 p-4 rounded-xl border text-xs ${
                  backupHealth.status === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/30 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/30 text-rose-800 dark:text-rose-300'
                }`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${backupHealth.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'} flex-shrink-0`} />
                  <div>
                    {backupHealth.status === 'success' ? (
                      <>🟢 Son başarılı yedek: <strong>{new Date(backupHealth.timestamp).toLocaleString('tr-TR')}</strong></>
                    ) : (
                      <>🔴 Son yedekleme başarısız: <strong>{new Date(backupHealth.timestamp).toLocaleString('tr-TR')}</strong> — {backupHealth.error}</>
                    )}
                  </div>
                </div>
              )}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Veritabanı Yedeği</span>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Tüm veritabanını şifreli bir dosya olarak dışa aktarın. Yedekleme dosyasını güvenli bir yerde saklayın.
                </p>
                <button
                  onClick={handleCreateBackup}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Yedekleme Oluştur</span>
                </button>
                {backupStats && (
                  <div className="mt-3 text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5">
                    <p>Müşteri: {backupStats.members || 0} adet</p>
                    <p>Taksit: {backupStats.installments || 0} adet</p>
                    <p>Banka: {backupStats.banks || 0} adet</p>
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Veritabanı Geri Yükleme</span>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Daha önce oluşturulmuş bir yedekleme dosyasını geri yükleyin. Mevcut verilerin üzerine yazılacaktır.
                </p>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Yedekleme Dosyası</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".enc,.json,application/json"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const text = await file.text();
                          setRestoreJson(text);
                          setRestoreFileName(file.name);
                        }
                      }}
                      className="flex-1 text-xs text-slate-700 dark:text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2"
                    />
                  </div>
                  {restoreFileName && (
                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">{restoreFileName}</p>
                  )}
                </div>
                <button
                  onClick={() => setIsRestoreModalOpen(true)}
                  disabled={!restoreJson.trim()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition-colors disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>Geri Yükle</span>
                </button>
              </div>

              <ConfirmModal
                isOpen={isRestoreModalOpen}
                title="Veritabanını Geri Yükle"
                message="Bu işlem mevcut veritabanınızın üzerine yazacaktır. Devam etmek istediğinizden emin misiniz?"
                confirmText="Geri Yükle"
                cancelText="İptal"
                isDestructive={true}
                onConfirm={handleConfirmRestore}
                onCancel={() => setIsRestoreModalOpen(false)}
              />

              {role === 'ADMIN' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Excel Veri Aktarımı</span>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Tüm verileri Excel (.xlsx) formatında dışa aktarın. Admin yetkisi gerekir.
                </p>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Excel Parolası (isteğe bağlanabilir)</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={excelPassword}
                      onChange={(e) => setExcelPassword(e.target.value)}
                      placeholder="Parola girin..."
                      className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="password"
                      value={excelPasswordConfirm}
                      onChange={(e) => setExcelPasswordConfirm(e.target.value)}
                      placeholder="Parolayı tekrar girin"
                      className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      onClick={handleExportExcel}
                      disabled={isExporting || excelPassword !== excelPasswordConfirm}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>{isExporting ? 'Aktarıyor...' : 'Aktar'}</span>
                    </button>
                  </div>
                  {excelPassword && excelPassword !== excelPasswordConfirm && (
                    <p className="mt-1 text-[10px] text-rose-500">Parolalar eşleşmiyor</p>
                  )}
                </div>
              </div>
            )}
          </div>
          )}

          {activeTab === 'auto-backup' && (
            <div className="max-w-xl space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Otomatik Yedekleme Ayarları</span>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Belirlediğiniz aralıklarla veritabanını otomatik olarak yedekler. Varsayılan: 12 saatte bir.
                </p>
                {autoBackupConfig && (
                  <form onSubmit={handleSaveAutoBackup} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Otomatik Yedeklemeyi Aktif Et
                      </label>
                      <button
                        type="button"
                        onClick={() => setAutoBackupConfig({ ...autoBackupConfig, enabled: !autoBackupConfig.enabled })}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${autoBackupConfig.enabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                      >
                        <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${autoBackupConfig.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Yedekleme Klasörü</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={autoBackupConfig.backupPath}
                          onChange={(e) => setAutoBackupConfig({ ...autoBackupConfig, backupPath: e.target.value })}
                          placeholder="Yedekleme klasörü yolu..."
                          className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={handleSelectBackupDir}
                          className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          title="Klasör Seç"
                        >
                          <FolderOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Yedekleme Aralığı</label>
                      <select
                        value={autoBackupConfig.intervalHours}
                        onChange={(e) => setAutoBackupConfig({ ...autoBackupConfig, intervalHours: parseInt(e.target.value, 10) })}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                      >
                        {INTERVAL_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Varsayılan: 12 saat
                      </p>
                      <button
                        type="submit"
                        disabled={isAutoBackupLoading || !autoBackupConfig.backupPath}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isAutoBackupLoading ? 'Kaydediliyor...' : 'Kaydet'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="max-w-xl space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Ses Ayarları</span>
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300">Ses efektleri</span>
                  <button
                    onClick={() => {
                      const newVal = !soundEnabled;
                      setSoundEnabled(newVal);
                      window.electronAPI.savePreferences({ sound: newVal });
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                      soundEnabled
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {soundEnabled ? 'Açık' : 'Kapalı'}
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Uygulama Bilgisi</span>
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <p>S.S. Karma Saneyi Sitesi — Üye Takip ve Cari Yönetim Sistemi</p>
                  <p>Versiyon: 1.0.0</p>
                  <p>Embedded PostgreSQL ile çalışır</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Download className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Otomatik Güncelleme</span>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  GitHub Releases üzerinden yeni sürüm kontrolü yapın. Güncelleme bulunduğunda arka planda indirilir.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCheckUpdate}
                    disabled={updateStatus === 'checking' || updateStatus === 'downloading'}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium transition-colors disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{updateStatus === 'checking' ? 'Kontrol Ediliyor...' : 'Güncelleme Kontrol Et'}</span>
                  </button>
                  {updateStatus === 'latest' && <span className="text-xs text-emerald-500 font-medium">Güncel sürümsünüz.</span>}
                  {updateStatus === 'available' && updateVersion && (
                    <span className="text-xs text-blue-400 font-medium">v{updateVersion} mevcut!</span>
                  )}
                  {updateStatus === 'error' && <span className="text-xs text-rose-500 font-medium">Hata!</span>}
                  {updateStatus === 'downloaded' && (
                    <button
                      onClick={handleRestartToUpdate}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors"
                    >
                      <span>Yeniden Başlat ve Güncelle</span>
                    </button>
                  )}
                </div>
                {updateStatus === 'downloading' && updateProgress !== null && (
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-purple-600 h-full transition-all"
                      style={{ width: `${updateProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'cloud' && (
            <div className="max-w-xl space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Google Drive Senkronizasyonu</span>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Yedeklerinizi Google Drive hesabınıza otomatik olarak senkronize edin. 
                  Otomatik yedekleme aktif olduğunda buluta da yüklenir.
                </p>
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Bulut senkronizasyonu
                  </label>
                  <button
                    onClick={handleToggleCloudSync}
                    disabled={cloudSyncStatus === 'connecting' || cloudSyncStatus === 'syncing'}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      cloudSyncEnabled
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {cloudSyncEnabled ? 'Açık' : 'Kapalı'}
                  </button>
                </div>
                {cloudSyncEnabled && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2">
                    {googleDriveEmail && <p className="text-indigo-400">📧 {googleDriveEmail}</p>}
                    {cloudSyncStatus === 'connected' && <p className="text-emerald-500">✅ Google Drive bağlantısı aktif</p>}
                    {cloudSyncStatus === 'syncing' && <p className="text-blue-400">🔄 Senkronize ediliyor...</p>}
                    {cloudSyncStatus === 'error' && <p className="text-rose-500">❌ Bağlantı hatası</p>}
                  </div>
                )}
                {!cloudSyncEnabled && cloudSyncStatus === 'idle' && (
                   <p className="text-[11px] text-slate-400">Devre dışı bırakıldı. Aktif etmek için butona tıklayın.</p>
                 )}
              </div>

              {cloudSyncEnabled && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Manuel Bulut Yedekleme</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Şu anda yedekinizi Google Drive hesabınıza hemen yükleyin.
                  </p>
                  <button
                    onClick={handleManualCloudBackup}
                    disabled={isManualCloudBackup || cloudSyncStatus !== 'connected'}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium disabled:opacity-50 transition-colors"
                  >
                    {isManualCloudBackup ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-3 h-3" />
                    )}
                    <span>{isManualCloudBackup ? 'Yükleniyor...' : 'Buluta Yedek Yükle'}</span>
                  </button>
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Otomatik Bulut Senkronizasyon Aralığı
                    </label>
                    <select
                      value={cloudSyncInterval}
                      onChange={(e) => { const val = parseInt(e.target.value, 10); setCloudSyncInterval(val); saveCloudSyncInterval(val); }}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value={2}>2 saatte bir</option>
                      <option value={6}>6 saatte bir</option>
                      <option value={12}>12 saatte bir</option>
                      <option value={24}>24 saatte bir</option>
                      <option value={48}>48 saatte bir</option>
                      <option value={168}>1 haftada bir</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
