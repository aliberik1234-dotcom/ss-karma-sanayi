import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { useToast } from '../context/ToastContext';
import { MemberItem, FinancialDetails, BankItem, PaymentStatus } from '../types';
import { formatCurrency, formatNumber } from '../utils/currency';
import { formatPhone } from '../utils/turkish';
import { listenShortcut, SHORTCUT_EVENTS } from '../utils/shortcuts';
import { BankIcon } from '../components/BankIcon';
import {
  Shield,
  KeyRound,
  ArrowLeft,
  Printer,
  Layers,
  PlusCircle,
  Edit3,
  ChevronDown,
  Check,
  Building2
} from 'lucide-react';

interface PrivateMemberPageProps {
  member: MemberItem;
  onBack: () => void;
}

export const PrivateMemberPage: React.FC<PrivateMemberPageProps> = ({ member, onBack }) => {
  const { token } = useAuth();
  const { playClick, playSuccess, playError, playAlert } = useSound();
  const { showToast } = useToast();

  const [grantToken, setGrantToken] = useState<string | null>(null);
  const [privatePassword, setPrivatePassword] = useState('');
  const [isVerifyingGate, setIsVerifyingGate] = useState(false);
  const [gateError, setGateError] = useState<string | null>(null);

  const [details, setDetails] = useState<FinancialDetails | null>(null);
  const [banks, setBanks] = useState<BankItem[]>([]);

  const [isPlotModalOpen, setIsPlotModalOpen] = useState(false);
  const [isDownPaymentModalOpen, setIsDownPaymentModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<any>(null);

  const [formPlotSize, setFormPlotSize] = useState('');
  const [formDownPayment, setFormDownPayment] = useState('');
  const [formTotalInstallments, setFormTotalInstallments] = useState(12);
  const [formInstallmentAmount, setFormInstallmentAmount] = useState('');
  const [formStartDate, setFormStartDate] = useState(new Date().toISOString().split('T')[0]);

  const [payStatus, setPayStatus] = useState<PaymentStatus>('ODENDI');
  const [payBankId, setPayBankId] = useState<string>('');
  const [payReceiptNumber, setPayReceiptNumber] = useState('');
  const [payNotes, setPayNotes] = useState('');
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const bankDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (token) {
      window.electronAPI.listBanks({ token }).then((res: any) => {
        if (res?.success) setBanks(res.banks || []);
      });
    }
  }, [token]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (isBankDropdownOpen && bankDropdownRef.current && !bankDropdownRef.current.contains(e.target as Node)) {
        setIsBankDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isBankDropdownOpen]);

  useEffect(() => {
    const unsubPayment = listenShortcut(SHORTCUT_EVENTS.OPEN_NEW_PAYMENT, () => {
      if (details && details.activePlan && details.activePlan.installments.length > 0) {
        const unpaid = details.activePlan.installments.find((i: any) => i.status !== 'ODENDI');
        if (unpaid) {
          setSelectedInstallment(unpaid);
          setIsPaymentModalOpen(true);
        }
      }
    });
    const unsubClose = listenShortcut(SHORTCUT_EVENTS.CLOSE_MODAL, () => {
      setIsPaymentModalOpen(false);
      setIsPlanModalOpen(false);
      setGrantToken(null);
      setGateError(null);
    });

    return () => { unsubPayment(); unsubClose(); };
  }, [details]);

  const fetchDetails = async () => {
    if (!token || !grantToken) return;
    try {
      const res = await window.electronAPI.getFinancialDetails({ token, grantToken, memberId: member.id });
      if (res?.success) {
        setDetails(res.data);
      } else {
        showToast('error', res?.error || 'Özel finansal detaylar alınamadı.');
        if (res?.error?.includes('Özel erişim süresi')) setGrantToken(null);
      }
    } catch (e: any) {
      showToast('error', e.message || 'Veri yükleme hatası.');
    }
  };

  useEffect(() => {
    if (grantToken) { fetchDetails(); }
  }, [grantToken]);

  const handleVerifyGate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privatePassword) {
      showToast('error', 'Lütfen özel parolayı giriniz.');
      playError();
      return;
    }
    setIsVerifyingGate(true);
    setGateError(null);
    try {
      const res = await window.electronAPI.verifyPrivatePassword({ token, memberId: member.id, password: privatePassword });
      if (res?.success && res.grantToken) {
        playSuccess();
        setGrantToken(res.grantToken);
        setPrivatePassword('');
      } else {
        playAlert();
        setGateError(res?.error || 'Parola yanlış.');
        showToast('error', res?.error || 'Özel parola doğrulanamadı.');
      }
    } catch (e: any) {
      playError();
      setGateError(e.message || 'Doğrulama hatası.');
    } finally {
      setIsVerifyingGate(false);
    }
  };

  const handleSavePlotSize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !grantToken) return;
    try {
      const res = await window.electronAPI.updateFinancialBasic({ token, grantToken, memberId: member.id, plotSize: formPlotSize });
      if (res?.success) {
        playSuccess();
        showToast('success', 'Arsa büyüklüğü güncellendi.');
        setIsPlotModalOpen(false);
        fetchDetails();
      } else {
        showToast('error', res?.error || 'Güncelleme başarısız.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    }
  };

  const handleSaveDownPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !grantToken) return;
    try {
      const res = await window.electronAPI.updateFinancialBasic({ token, grantToken, memberId: member.id, downPayment: formDownPayment });
      if (res?.success) {
        playSuccess();
        showToast('success', 'Peşinat miktarı güncellendi.');
        setIsDownPaymentModalOpen(false);
        fetchDetails();
      } else {
        showToast('error', res?.error || 'Güncelleme başarısız.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    }
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !grantToken) return;
    if (!formInstallmentAmount || parseFloat(formInstallmentAmount) <= 0) {
      showToast('error', 'Geçerli bir taksit tutarı giriniz.');
      return;
    }
    try {
      const res = await window.electronAPI.createInstallmentPlan({
        token, grantToken, memberId: member.id, totalInstallments: formTotalInstallments,
        installmentAmount: formInstallmentAmount, startDate: formStartDate
      });
      if (res?.success) {
        playSuccess();
        showToast('success', 'Yeni taksit planı oluşturuldu.');
        setIsPlanModalOpen(false);
        fetchDetails();
      } else {
        showToast('error', res?.error || 'Plan oluşturulamadı.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    }
  };

  const handleOpenPayment = (inst: any) => {
    playClick();
    setSelectedInstallment(inst);
    setPayStatus(inst.status);
    setPayBankId(inst.bankId || (banks[0]?.id || ''));
    setPayReceiptNumber(inst.receiptNumber || '');
    setPayNotes(inst.notes || '');
    setIsPaymentModalOpen(true);
  };

  const handleSavePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !grantToken || !selectedInstallment) return;
    try {
      const res = await window.electronAPI.recordPayment({
        token, grantToken, memberId: member.id, installmentId: selectedInstallment.id,
        status: payStatus, bankId: payBankId || null, receiptNumber: payReceiptNumber, notes: payNotes
      });
      if (res?.success) {
        playSuccess();
        showToast('success', 'Taksit ödeme bilgisi güncellendi.');
        setIsPaymentModalOpen(false);
        fetchDetails();
      } else {
        showToast('error', res?.error || 'Ödeme kaydı başarısız.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    }
   };

  const handleDownloadPdf = async (inst: any) => {
    playClick();
    if (!token || !grantToken) return;
    try {
      const res = await window.electronAPI.generateReceipt({ token, grantToken, memberId: member.id, installmentId: inst.id });
      if (res?.success && res.pdfBase64) {
        const byteChars = atob(res.pdfBase64);
        const byteNumbers = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i);
        const blob = new Blob([new Uint8Array(byteNumbers)], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Tahsilat_Makburu_${inst.receiptNumber || Date.now()}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        showToast('error', res?.error || 'PDF oluşturulamadı.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    }
  };

  const handlePrint = async () => {
    playClick();
    if (!token || !grantToken) return;
    try {
      const res = await window.electronAPI.printMemberReport({ token, grantToken, memberId: member.id });
      if (res?.success) {
        playSuccess();
        showToast('info', 'Yazdırma penceresi hazırlandı.');
      } else {
        showToast('error', res?.error || 'Yazdırma başarısız.');
      }
    } catch (e: any) {
      showToast('error', e.message);
    }
  };

  if (!grantToken) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
              Kişisel Özel Bilgiler Güvenlik Kapısı
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <strong className="text-slate-700 dark:text-slate-200">{member.fullName}</strong> ({member.sequenceFormatted}) üyesine ait özel finansal ve taksit bilgilerini görüntülemek için Özel Parola gereklidir.
            </p>
          </div>

          {gateError && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-200 text-xs">
              {gateError}
            </div>
          )}

          <form onSubmit={handleVerifyGate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Özel Parola</label>
              <input
                type="password"
                value={privatePassword}
                onChange={(e) => setPrivatePassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500"
                autoFocus
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => { playClick(); onBack(); }}
                className="w-1/2 py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors"
              >
                Geri Dön
              </button>
              <button
                type="submit"
                disabled={isVerifyingGate}
                className="w-1/2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Shield className="w-4 h-4" />
                <span>{isVerifyingGate ? 'Doğrulanıyor...' : 'Erişim Sağla'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { playClick(); onBack(); }}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Listeye Geri Dön"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs">
                {member.sequenceFormatted}
              </span>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-wide">
                {member.fullName} — Kişisel Özel Bilgiler
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Telefon: {formatPhone(member.phone) || 'Belirtilmedi'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
          >
            <Printer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Üye Bilgilerini Yazdır</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: 'Arsa Büyüklüğü', value: formatNumber(details?.plotSize), unit: 'm²', editLabel: 'Arsa Büyüklüğünü Gir / Değiştir', onEdit: () => { setFormPlotSize(details?.plotSize || ''); setIsPlotModalOpen(true); } },
            { label: 'Peşinat', value: formatCurrency(details?.downPayment), unit: '', editLabel: 'Peşinat Miktarı Gir / Değiştir', onEdit: () => { setFormDownPayment(details?.downPayment || ''); setIsDownPaymentModalOpen(true); } },
            { label: 'Toplam Borç', value: formatCurrency(details?.totalDebt), unit: '', editLabel: null },
            { label: 'Toplam Ödenen', value: formatCurrency(details?.totalPaid), unit: '', editLabel: null, valueClass: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Kalan Bakiye', value: formatCurrency(details?.remainingDebt), unit: '', editLabel: null, valueClass: 'text-rose-600 dark:text-rose-400' },
          ].map((card, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{card.label}</div>
              <div className={`text-xl font-bold mt-1 ${card.valueClass || 'text-slate-900 dark:text-slate-100'}`}>
                {card.value}{card.unit ? ' ' + card.unit : ''}
              </div>
              {card.editLabel && card.onEdit && (
                <button
                  onClick={card.onEdit}
                  className="mt-3 text-[11px] text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{card.editLabel}</span>
                </button>
              )}
              {card.label === 'Toplam Ödenen' && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-3">
                  {details?.paidInstallmentsCount || 0} / {details?.totalInstallmentsCount || 0} Taksit
                </div>
              )}
              {card.label === 'Kalan Bakiye' && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-3">
                  {details?.remainingInstallmentsCount || 0} Taksit Kaldı
                </div>
              )}
              {card.label === 'Toplam Borç' && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-3">Peşinat + Tüm Taksitler</div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Taksit Ödeme Planı ({details?.activePlan ? `${details.activePlan.totalInstallments} Taksit` : 'Plan Yok'})
              </h3>
            </div>
            <button
              onClick={() => {
                setFormTotalInstallments(12);
                setFormInstallmentAmount('');
                setIsPlanModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Taksit Planı Oluştur / Değiştir</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-2.5 px-4 w-16 text-center">Taksit</th>
                  <th className="py-2.5 px-4">Tutar</th>
                  <th className="py-2.5 px-4">Vade Tarihi</th>
                  <th className="py-2.5 px-4">Durum</th>
                  <th className="py-2.5 px-4">Banka</th>
                  <th className="py-2.5 px-4">Dekont No</th>
                  <th className="py-2.5 px-4">Ödeme Tarihi</th>
                  <th className="py-2.5 px-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-mono">
                {!details?.activePlan?.installments || details.activePlan.installments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 dark:text-slate-500 font-sans">
                      Bu üye için henüz taksit planı oluşturulmamış. "Taksit Planı Oluştur" butonuna basınız.
                    </td>
                  </tr>
                ) : (
                  details.activePlan.installments.map((inst) => {
                    let statusClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
                    let statusLabel = 'Bekliyor';
                    if (inst.status === 'ODENDI') {
                      statusClass = 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50';
                      statusLabel = 'Ödendi';
                    } else if (inst.status === 'GECIKMIS') {
                      statusClass = 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/50';
                      statusLabel = 'Gecikmiş';
                    } else if (inst.status === 'KISMI') {
                      statusClass = 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50';
                      statusLabel = 'Kısmi Ödeme';
                    }

                    return (
                      <tr key={inst.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 text-center font-bold text-blue-600 dark:text-blue-400">{inst.installmentNumber}</td>
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">{formatCurrency(inst.amount)}</td>
                        <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-sans">{new Date(inst.dueDate).toLocaleDateString('tr-TR')}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-sans font-semibold border ${statusClass}`}>
                            {statusLabel}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans text-slate-700 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <BankIcon bankName={inst.bankName} logoAsset={inst.bankLogo} className="w-8 h-8" />
                            <span>{inst.bankName || '-'}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                          {inst.receiptNumber || '-'}
                          {inst.status === 'ODENDI' && inst.receiptNumber && (
                            <button
                              onClick={() => handleDownloadPdf(inst)}
                              className="ml-2 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-[10px] font-medium transition-colors"
                              title="PDF Makbuşu İndir"
                            >
                              PDF
                            </button>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-500 dark:text-slate-400 font-sans">
                          {inst.paymentDate ? new Date(inst.paymentDate).toLocaleDateString('tr-TR') : '-'}
                        </td>
                        <td className="py-3 px-4 text-right font-sans">
                          <button
                            onClick={() => handleOpenPayment(inst)}
                            className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-[11px] font-medium transition-colors"
                          >
                            Ödeme Düzenle
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isPlotModalOpen && (
        <ModalWrapper onClose={() => setIsPlotModalOpen(false)}>
          <form onSubmit={handleSavePlotSize} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-sm w-full p-5 space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Arsa Büyüklüğü (m²)</h3>
            <div>
              <input type="number" step="0.01" value={formPlotSize} onChange={(e) => setFormPlotSize(e.target.value)} placeholder="Örn: 500"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 font-mono" autoFocus />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsPlotModalOpen(false)} className="px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">İptal</button>
              <button type="submit" className="px-4 py-1.5 rounded bg-blue-600 text-white font-medium">Kaydet</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {isDownPaymentModalOpen && (
        <ModalWrapper onClose={() => setIsDownPaymentModalOpen(false)}>
          <form onSubmit={handleSaveDownPayment} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-sm w-full p-5 space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Peşinat Miktarı (₺)</h3>
            <div>
              <input type="number" step="0.01" value={formDownPayment} onChange={(e) => setFormDownPayment(e.target.value)} placeholder="Örn: 50000.00"
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 font-mono" autoFocus />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsDownPaymentModalOpen(false)} className="px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">İptal</button>
              <button type="submit" className="px-4 py-1.5 rounded bg-blue-600 text-white font-medium">Kaydet</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {isPlanModalOpen && (
        <ModalWrapper onClose={() => setIsPlanModalOpen(false)}>
          <form onSubmit={handleSavePlan} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Taksit Planı Oluştur</h3>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">Yeni bir plan oluşturulduğunda eski aktif plan arşive kaldırılır.</p>
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Toplam Taksit Sayısı</label>
                <input type="number" min="1" max="240" value={formTotalInstallments} onChange={(e) => setFormTotalInstallments(parseInt(e.target.value, 10))}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono" />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Aylık Taksit Tutarı (₺)</label>
                <input type="number" step="0.01" value={formInstallmentAmount} onChange={(e) => setFormInstallmentAmount(e.target.value)} placeholder="Örn: 10000.00"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono" />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">İlk Taksit Vade Başlangıcı</label>
                <input type="date" value={formStartDate} onChange={(e) => setFormStartDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 font-mono" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsPlanModalOpen(false)} className="px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">İptal</button>
              <button type="submit" className="px-4 py-1.5 rounded bg-blue-600 text-white font-medium">Planı Oluştur</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {isPaymentModalOpen && selectedInstallment && (
        <ModalWrapper onClose={() => setIsPaymentModalOpen(false)}>
          <form onSubmit={handleSavePayment} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Taksit #{selectedInstallment.installmentNumber} Ödeme Detayı</h3>
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Ödeme Durumu</label>
                <select value={payStatus} onChange={(e) => setPayStatus(e.target.value as PaymentStatus)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100">
                  <option value="BEKLIYOR">Bekliyor</option>
                  <option value="ODENDI">Ödendi</option>
                  <option value="GECIKMIS">Gecikmiş</option>
                  <option value="KISMI">Kısmi Ödeme</option>
                </select>
              </div>
               <div>
                 <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Ödemenin Yapıldığı Banka</label>
                 <div className="relative" ref={bankDropdownRef}>
                   <button
                     type="button"
                     onClick={() => setIsBankDropdownOpen(!isBankDropdownOpen)}
                     className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 text-xs"
                   >
                     <span className="flex items-center gap-2">
                       {payBankId ? (
                         (() => {
                           const bank = banks.find((b) => b.id === payBankId);
                           return bank ? (
                             <BankIcon bankName={bank.name} logoAsset={bank.logoAsset} className="w-6 h-6" />
                           ) : <span>–</span>;
                         })()
                       ) : (
                         <Building2 className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                       )}
                       <span>
                         {payBankId
                           ? (banks.find((b) => b.id === payBankId)?.name || '')
                           : '-- Banka Seçiniz --'}
                       </span>
                     </span>
                     <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                   </button>
                   {isBankDropdownOpen && (
                     <div className="absolute z-[10000] mt-1 w-full max-h-60 overflow-y-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl py-1 text-xs">
                       <button
                         type="button"
                         onClick={() => { setPayBankId(''); setIsBankDropdownOpen(false); }}
                         className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 ${!payBankId ? 'bg-blue-50 dark:bg-blue-950/30' : ''}`}
                       >
                         <Building2 className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                         <span>-- Banka Seçiniz --</span>
                       </button>
                       {banks.filter((b) => b.isActive).map((bank) => (
                         <button
                           key={bank.id}
                           type="button"
                           onClick={() => { setPayBankId(bank.id); setIsBankDropdownOpen(false); }}
                           className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 ${payBankId === bank.id ? 'bg-blue-50 dark:bg-blue-950/30' : ''}`}
                         >
                           <BankIcon bankName={bank.name} logoAsset={bank.logoAsset} className="w-6 h-6" />
                           <span className="flex-1">{bank.name}</span>
                           {payBankId === bank.id && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                         </button>
                       ))}
                     </div>
                   )}
                 </div>
               </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Dekont Numarası</label>
                <input type="text" value={payReceiptNumber} onChange={(e) => setPayReceiptNumber(e.target.value)} placeholder="Örn: 2026-TR-884920"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-mono" />
              </div>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Açıklama / Not</label>
                <input type="text" value={payNotes} onChange={(e) => setPayNotes(e.target.value)} placeholder="Opsiyonel ödeme notu"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-100" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">İptal</button>
              <button type="submit" className="px-4 py-1.5 rounded bg-emerald-600 text-white font-medium">Ödemeyi Kaydet</button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
};

const ModalWrapper: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({ onClose, children }) => (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
    onClick={onClose}
  >
    <div onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  </div>
);
