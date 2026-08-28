import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { useToast } from '../context/ToastContext';
import { Search, CheckCircle, XCircle } from 'lucide-react';

interface AuditLogEntry {
  id: string;
  action: string;
  user: string;
  memberId: string | null;
  success: boolean;
  details: string | null;
  createdAt: string;
}

export const AuditLogViewerPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { token, role } = useAuth();
  const { playClick } = useSound();
  const { showToast } = useToast();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterUser, setFilterUser] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [filterSuccess, setFilterSuccess] = useState<boolean | null>(null);

  useEffect(() => {
     if (role !== 'ADMIN' || !token) {
      showToast('error', 'Bu sayfaya erişim yetkiniz yok.');
      return;
    }
    fetchLogs();
  }, [token, role]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await window.electronAPI.getAuditLogs({
        token: token!,
        filter: {
          user: filterUser || undefined,
          action: filterAction || undefined,
          success: filterSuccess !== null ? filterSuccess : undefined,
        },
        take: 200,
      });
      if (res?.success && res.logs) {
        setLogs(res.logs);
      } else {
        showToast('error', res?.error || 'Audit logları yüklenemedi.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     if (role === 'ADMIN' && token) {
      fetchLogs();
    }
  }, [filterUser, filterAction, filterSuccess]);

  const actionLabels: Record<string, string> = {
    MEMBER_CREATED: 'Üye Oluşturuldu',
    MEMBER_UPDATED: 'Üye Güncellendi',
    MEMBER_DELETED: 'Üye Silindi',
    PAYMENT_RECORDED: 'Ödeme Kaydedildi',
    BACKUP_CREATED: 'Yedek Oluşturuldu',
    BACKUP_RESTORED: 'Yedek Geri Yüklendi',
    SETTINGS_CHANGED: 'Ayar Değiştirildi',
    AUDIT_VERIFIED: 'Audit Doğrulandı',
    SECURITY_EVENT: 'Güvenlik Olayı',
  };

  const getActionLabel = (action: string) => actionLabels[action] || action;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => { playClick(); onBack(); }}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-200 text-sm font-medium mb-4 flex items-center gap-1"
          >
            ← Geri
          </button>

          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Kullanıcı ara..."
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm"
              />
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="İşlem türü..."
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm"
              />
            </div>
            <select
              value={filterSuccess === null ? 'all' : filterSuccess ? 'success' : 'failed'}
              onChange={(e) => setFilterSuccess(e.target.value === 'all' ? null : e.target.value === 'success')}
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-sm"
            >
              <option value="all">Tümü</option>
              <option value="success">Başarılı</option>
              <option value="failed">Başarısız</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-slate-500 dark:text-slate-400">Yükleniyor...</p>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="py-3 px-4 text-left font-medium text-slate-700 dark:text-slate-300">Tarih</th>
                  <th className="py-3 px-4 text-left font-medium text-slate-700 dark:text-slate-300">Kullanıcı</th>
                  <th className="py-3 px-4 text-left font-medium text-slate-700 dark:text-slate-300">İşlem</th>
                  <th className="py-3 px-4 text-left font-medium text-slate-700 dark:text-slate-300">Detay</th>
                  <th className="py-3 px-4 text-center font-medium text-slate-700 dark:text-slate-300">Durum</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-slate-500 dark:text-slate-400">Kayıt bulunamadı.</td></tr>
                ) : logs.map((log) => (
                  <tr key={log.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-sans">{new Date(log.createdAt).toLocaleString('tr-TR')}</td>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">{log.user}</td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{getActionLabel(log.action)}</td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-xs max-w-xs truncate">{log.details || '-'}</td>
                    <td className="py-3 px-4 text-center">
                      {log.success ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
