import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/currency';

interface DashboardStats {
  totalMembers: number;
  totalDebt: string;
  totalPaid: string;
  remainingDebt: string;
  thisMonthPaid: string;
  recentPayments: Array<{
    receiptNumber: string | null;
    memberName: string;
    memberSequence: number;
    amount: number;
    bankName: string;
    paymentDate: string;
  }>;
  recentMembers: Array<{
    id: string;
    sequenceNumber: number;
    fullName: string;
    phone: string;
    createdAt: string;
  }>;
  bankDistribution: Array<{ bankName: string; total: number }>;
}

export const DashboardPage: React.FC<{ onNavigateToOverdue: () => void }> = ({ onNavigateToOverdue }) => {
  const { token, role } = useAuth();
  const { playClick } = useSound();
  const { showToast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     if (role !== 'ADMIN' || !token) {
      showToast('error', 'Bu sayfaya erişim yetkiniz yok.');
      return;
    }
    fetchStats();
  }, [token, role]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await window.electronAPI.getDashboardStats({ token: token! });
      if (res?.success && res.stats) {
        setStats(res.stats);
      } else {
        showToast('error', res?.error || 'İstatistikler yüklenemedi.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const StatCard: React.FC<{ title: string; value: string; color: string; icon: React.ReactNode }> = ({
    title, value, color, icon,
  }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg bg-${color}/10 flex items-center justify-center`}>{icon}</div>
      <div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-medium">{title}</p>
        <p className={`text-xl font-bold text-${color}`}>{value}</p>
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex-1 flex items-center justify-center text-slate-500 dark:text-slate-400">Yükleniyor...</div>;
  }

  if (!stats) return null;

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Yönetici Paneli</h1>
          <button
            onClick={() => { playClick(); onNavigateToOverdue(); }}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Geciken Taksitler
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Toplam Üye" value={stats.totalMembers.toString()} color="blue" icon={<span className="text-blue-600 dark:text-blue-400 text-xl">👥</span>} />
          <StatCard title="Toplam Borç" value={formatCurrency(stats.totalDebt)} color="rose" icon={<span className="text-rose-600 dark:text-rose-400 text-xl">💰</span>} />
          <StatCard title="Tahsil Edilen" value={formatCurrency(stats.totalPaid)} color="emerald" icon={<span className="text-emerald-600 dark:text-emerald-400 text-xl">✅</span>} />
          <StatCard title="Kalan Borç" value={formatCurrency(stats.remainingDebt)} color="amber" icon={<span className="text-amber-600 dark:text-amber-400 text-xl">⏳</span>} />
          <StatCard title="Bu Ay Tahsilat" value={formatCurrency(stats.thisMonthPaid)} color="green" icon={<span className="text-green-600 dark:text-green-400 text-xl">📈</span>} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Son Ödemeler</h3>
            <div className="space-y-3">
              {stats.recentPayments.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-xs">Henüz ödeme kaydı yok.</p>
              ) : stats.recentPayments.map((p) => (
                <div key={p.receiptNumber || p.paymentDate} className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">{p.memberName} (#{p.memberSequence})</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{p.paymentDate} • {p.bankName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-emerald-600 dark:text-emerald-400">{formatCurrency(p.amount.toString())}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{p.receiptNumber || '-'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Son Eklenen Üyeler</h3>
            <div className="space-y-3">
              {stats.recentMembers.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-xs">Son 7 günde yeni üye eklenmedi.</p>
              ) : stats.recentMembers.map((m) => (
                <div key={m.id} className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 last:border-0">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100 text-sm">{m.fullName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">#{m.sequenceNumber} • {m.phone}</p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{new Date(m.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Bankalara Göre Ödeme Dağılımı</h3>
          <div className="space-y-3">
            {stats.bankDistribution.length === 0 || stats.bankDistribution.every((b) => b.total === 0) ? (
              <p className="text-slate-500 dark:text-slate-400 text-xs">Henüz banka yapılan ödeme yok.</p>
            ) : stats.bankDistribution.filter((b) => b.total > 0).sort((a, b) => b.total - a.total).map((b) => {
              const maxCount = Math.max(...stats.bankDistribution.map((x) => x.total), 1);
              const percentage = (b.total / maxCount) * 100;
              return (
                <div key={b.bankName} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-700 dark:text-slate-300">{b.bankName}</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{formatCurrency(b.total.toFixed(2))}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
