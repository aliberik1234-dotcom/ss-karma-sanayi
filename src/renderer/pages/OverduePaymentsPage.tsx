import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/currency';

type FilterType = 'all' | 'overdue' | 'today' | 'week' | 'month' | 'paid' | 'partial' | 'unpaid';

export const OverduePaymentsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { token, role } = useAuth();
  const { playClick } = useSound();
  const { showToast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('overdue');

  useEffect(() => {
     if (role !== 'ADMIN' || !token) {
      showToast('error', 'Bu sayfaya erişim yetkiniz yok.');
      return;
    }
    fetchItems();
  }, [token, role, activeFilter]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await window.electronAPI.getOverdueInstallments({ token: token!, filter: activeFilter });
      if (res?.success && res.items) {
        setItems(res.items);
      } else {
        showToast('error', res?.error || 'Veriler yüklenemedi.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: 'overdue', label: '🔴 Gecikmiş' },
    { key: 'today', label: 'Bugün' },
    { key: 'week', label: '7 gün içinde' },
    { key: 'month', label: '30 gün içinde' },
    { key: 'paid', label: 'Ödenmiş' },
    { key: 'partial', label: 'Kısmi ödeme' },
    { key: 'unpaid', label: 'Ödenmemiş' },
    { key: 'all', label: 'Tümü' },
  ];

  const statusBadge = (item: any) => {
    const base = 'inline-block px-2 py-0.5 rounded text-[10px] font-sans font-semibold border ';
    if (item.status === 'Ödenmiş') return base + 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50';
    if (item.status === 'Kısmi Ödeme') return base + 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50';
    if (item.isOverdue) return base + 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/50';
    return base + 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <button
          onClick={() => { playClick(); onBack(); }}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-200 text-sm font-medium mb-4 flex items-center gap-1"
        >
          ← Geri
        </button>

        <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => { playClick(); setActiveFilter(f.key); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === f.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-slate-500 dark:text-slate-400">Yükleniyor...</p>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="py-3 px-4 text-left font-medium text-slate-700 dark:text-slate-300">Üye</th>
                  <th className="py-3 px-4 text-center font-medium text-slate-700 dark:text-slate-300">Taksit</th>
                  <th className="py-3 px-4 text-center font-medium text-slate-700 dark:text-slate-300">Vade</th>
                  <th className="py-3 px-4 text-right font-medium text-slate-700 dark:text-slate-300">Tutar</th>
                  <th className="py-3 px-4 text-right font-medium text-slate-700 dark:text-slate-300">Ödenen</th>
                  <th className="py-3 px-4 text-right font-medium text-slate-700 dark:text-slate-300">Kalan</th>
                  <th className="py-3 px-4 text-center font-medium text-slate-700 dark:text-slate-300">Durum</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={7} className="py-8 text-center text-slate-500 dark:text-slate-400">Sonuç bulunamadı.</td></tr>
                ) : items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900 dark:text-slate-100">{item.memberName}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">#{item.memberSequence} — {item.memberNumber}</div>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-900 dark:text-slate-100">{item.installmentNumber}</td>
                    <td className="py-3 px-4 text-center text-slate-500 dark:text-slate-400 font-sans">{item.dueDate}</td>
                    <td className="py-3 px-4 text-right text-slate-900 dark:text-slate-100">{formatCurrency(item.totalAmount)}</td>
                    <td className="py-3 px-4 text-right text-slate-500 dark:text-slate-400">{formatCurrency(item.paid)}</td>
                    <td className="py-3 px-4 text-right font-medium text-rose-600 dark:text-rose-400">{formatCurrency(item.remaining)}</td>
                    <td className="py-3 px-4 text-center">{statusBadge(item)} {item.status}</td>
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
