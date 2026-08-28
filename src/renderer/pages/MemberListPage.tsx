import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { useToast } from '../context/ToastContext';
import { MemberItem } from '../types';
import { formatPhone } from '../utils/turkish';
import { ConfirmModal } from '../components/ConfirmModal';
import { listenShortcut, SHORTCUT_EVENTS } from '../utils/shortcuts';
import {
  UserPlus,
  Search,
  ArrowUpAZ,
  ArrowDownZA,
  ArrowUp10,
  ArrowDown10,
  Edit2,
  Trash2,
  ShieldCheck,
  Phone,
  User,
  Hash,
  X
} from 'lucide-react';

interface MemberListPageProps {
  onSelectMemberForPrivate: (member: MemberItem) => void;
}

export const MemberListPage: React.FC<MemberListPageProps> = ({ onSelectMemberForPrivate }) => {
  const { role, token } = useAuth();
  const { playClick, playSuccess, playError } = useSound();
  const { showToast } = useToast();

  const [members, setMembers] = useState<MemberItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'seq_asc' | 'seq_desc' | 'name_asc' | 'name_desc'>('seq_asc');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);

  const [formFullName, setFormFullName] = useState('');
  const [formSeqNum, setFormSeqNum] = useState<string>('');
  const [formPhone, setFormPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; member: MemberItem } | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubAdd = listenShortcut(SHORTCUT_EVENTS.OPEN_ADD_MEMBER, () => {
      if (role === 'ADMIN') handleOpenAdd();
    });
    const unsubSearch = listenShortcut(SHORTCUT_EVENTS.OPEN_MEMBER_SEARCH, () => {
      searchInputRef.current?.focus();
    });
    const unsubClose = listenShortcut(SHORTCUT_EVENTS.CLOSE_MODAL, () => {
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      setIsDeleteModalOpen(false);
    });

    return () => { unsubAdd(); unsubSearch(); unsubClose(); };
  }, [role]);

  const fetchMembers = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await window.electronAPI.listMembers({ token, search: searchTerm, sortBy });
      if (res?.success) {
        setMembers(res.members || []);
      } else {
        showToast('error', res?.error || 'Üye listesi alınamadı.');
      }
    } catch (e: any) {
      showToast('error', e.message || 'Üye listesi yüklenemedi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [token, sortBy]);

  useEffect(() => {
    const handler = setTimeout(() => { fetchMembers(); }, 250);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleOpenAdd = async () => {
    playClick();
    setFormFullName('');
    setFormPhone('');
    try {
      const res = await window.electronAPI.getNextSequence({ token });
      if (res?.success) {
        setFormSeqNum(res.sequenceNumber.toString());
      } else {
        setFormSeqNum('');
      }
    } catch {
      setFormSeqNum('');
    }
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFullName.trim()) {
      showToast('error', 'Ad Soyad alanı zorunludur.');
      playError();
      return;
    }

    const seqInt = formSeqNum ? parseInt(formSeqNum, 10) : undefined;
    if (seqInt !== undefined && (isNaN(seqInt) || seqInt < 1 || seqInt > 999)) {
      showToast('error', 'Sıra numarası 1 ile 999 arasında olmalıdır.');
      playError();
      return;
    }

    setIsSaving(true);
    try {
      const res = await window.electronAPI.createMember({
        token, fullName: formFullName, phone: formPhone, sequenceNumber: seqInt
      });
      if (res?.success) {
        playSuccess();
        showToast('success', `${res.member.fullName} başarıyla kaydedildi.`);
        setIsAddModalOpen(false);
        fetchMembers();
      } else {
        playError();
        showToast('error', res?.error || 'Üye kaydedilemedi.');
      }
    } catch (e: any) {
      playError();
      showToast('error', e.message || 'Hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenEdit = (member: MemberItem) => {
    playClick();
    setSelectedMember(member);
    setFormFullName(member.fullName);
    setFormSeqNum(member.sequenceNumber.toString());
    setFormPhone(member.phone);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !formFullName.trim()) {
      showToast('error', 'Ad Soyad alanı zorunludur.');
      playError();
      return;
    }

    const seqInt = formSeqNum ? parseInt(formSeqNum, 10) : undefined;
    if (seqInt !== undefined && (isNaN(seqInt) || seqInt < 1 || seqInt > 999)) {
      showToast('error', 'Sıra numarası 1 ile 999 arasında olmalıdır.');
      playError();
      return;
    }

    setIsSaving(true);
    try {
      const res = await window.electronAPI.updateMember({
        token, id: selectedMember.id, fullName: formFullName, phone: formPhone, sequenceNumber: seqInt
      });
      if (res?.success) {
        playSuccess();
        showToast('success', 'Üye bilgileri güncellendi.');
        setIsEditModalOpen(false);
        fetchMembers();
      } else {
        playError();
        showToast('error', res?.error || 'Güncelleme başarısız.');
      }
    } catch (e: any) {
      playError();
      showToast('error', e.message || 'Hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedMember) return;
    try {
      const res = await window.electronAPI.deleteMember({ token, id: selectedMember.id });
      if (res?.success) {
        playSuccess();
        showToast('success', `${selectedMember.fullName} kaydı silindi.`);
        setIsDeleteModalOpen(false);
        fetchMembers();
      } else {
        playError();
        showToast('error', res?.error || 'Silme işlemi başarısız.');
      }
    } catch (e: any) {
      playError();
      showToast('error', e.message || 'Hata oluştu.');
    }
  };

  const handleRowDoubleClick = (member: MemberItem) => {
    if (role === 'ADMIN') {
      playClick();
      onSelectMemberForPrivate(member);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, member: MemberItem) => {
    e.preventDefault();
    if (role === 'ADMIN') {
      playClick();
      setContextMenu({ x: e.clientX, y: e.clientY, member });
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          {role === 'ADMIN' && (
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 active:scale-95 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Yeni Kayıt Ekle</span>
            </button>
          )}
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Toplam: <span className="text-slate-900 dark:text-slate-100 font-bold">{members.length}</span> Üye
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ad Soyad, Telefon veya Sıra No..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-8 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5">
            <button
              onClick={() => { playClick(); setSortBy('seq_asc'); }}
              className={`px-2.5 py-1 text-xs rounded font-medium flex items-center gap-1 transition-colors ${
                sortBy === 'seq_asc' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title="Sıra Numarası Artan"
            >
              <ArrowUp10 className="w-3.5 h-3.5" />
              <span>Sıra ↑</span>
            </button>
            <button
              onClick={() => { playClick(); setSortBy('seq_desc'); }}
              className={`px-2.5 py-1 text-xs rounded font-medium flex items-center gap-1 transition-colors ${
                sortBy === 'seq_desc' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title="Sıra Numarası Azalan"
            >
              <ArrowDown10 className="w-3.5 h-3.5" />
              <span>Sıra ↓</span>
            </button>
            <button
              onClick={() => { playClick(); setSortBy('name_asc'); }}
              className={`px-2.5 py-1 text-xs rounded font-medium flex items-center gap-1 transition-colors ${
                sortBy === 'name_asc' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title="A'dan Z'ye"
            >
              <ArrowUpAZ className="w-3.5 h-3.5" />
              <span>A → Z</span>
            </button>
            <button
              onClick={() => { playClick(); setSortBy('name_desc'); }}
              className={`px-2.5 py-1 text-xs rounded font-medium flex items-center gap-1 transition-colors ${
                sortBy === 'name_desc' ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title="Z'den A'ya"
            >
              <ArrowDownZA className="w-3.5 h-3.5" />
              <span>Z → A</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <table className="w-full border-collapse text-left text-xs">
          <thead className="sticky top-0 bg-white dark:bg-slate-900/95 dark:backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 z-10">
            <tr>
              <th className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-24 text-center">
                Sıra No
              </th>
              <th className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Üye Adı Soyadı
              </th>
              <th className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-48">
                Telefon
              </th>
              {role === 'ADMIN' && (
                <th className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-36 text-right">
                  İşlemler
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
            {isLoading ? (
              <tr>
                <td colSpan={role === 'ADMIN' ? 4 : 3} className="py-16 text-center text-slate-400 dark:text-slate-500">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
                  Üye kayıtları yükleniyor...
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={role === 'ADMIN' ? 4 : 3} className="py-16 text-center text-slate-400 dark:text-slate-500">
                  Henüz kayıtlı üye bulunmuyor veya arama sonucu eşleşmedi.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr
                  key={member.id}
                  onDoubleClick={() => handleRowDoubleClick(member)}
                  onContextMenu={(e) => handleContextMenu(e, member)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group cursor-pointer"
                >
                  <td className="py-3 px-4 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
                      {member.sequenceFormatted}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {member.fullName}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">
                    {formatPhone(member.phone) || '-'}
                  </td>
                  {role === 'ADMIN' && (
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playClick();
                            onSelectMemberForPrivate(member);
                          }}
                          className="p-1.5 rounded hover:bg-amber-50 dark:hover:bg-amber-950/20 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                          title="Kişisel Özel Bilgiler"
                        >
                          <ShieldCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEdit(member);
                          }}
                          className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                          title="Düzenle"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playClick();
                            setSelectedMember(member);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {contextMenu && (
        <div
          className="fixed z-[9999] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl py-1 text-xs w-48 animate-in fade-in"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setContextMenu(null);
              onSelectMemberForPrivate(contextMenu.member);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-left text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Kişisel Özel Bilgiler</span>
          </button>
          <button
            onClick={() => {
              setContextMenu(null);
              handleOpenEdit(contextMenu.member);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Üyeyi Düzenle</span>
          </button>
          <div className="border-t border-slate-200 dark:border-slate-700 my-1" />
          <button
            onClick={() => {
              setContextMenu(null);
              setSelectedMember(contextMenu.member);
              setIsDeleteModalOpen(true);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Üyeyi Sil</span>
          </button>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleSaveAdd}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Yeni Üye Kaydı</span>
              </h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Ad Soyad *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
                  <input
                    type="text"
                    value={formFullName}
                    onChange={(e) => setFormFullName(e.target.value)}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">İsim otomatik Türkçe büyük/küçük harfe dönüştürülür.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Sıra No (001-999)</label>
                  <div className="relative">
                    <Hash className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
                    <input
                      type="number"
                      min="1"
                      max="999"
                      value={formSeqNum}
                      onChange={(e) => setFormSeqNum(e.target.value)}
                      placeholder="001"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Telefon</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      value={formPhone}
                       onChange={(e) => setFormPhone(formatPhone(e.target.value))}
                      placeholder="05XX XXX XX XX"
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-5 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <form
            onSubmit={handleSaveEdit}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Üye Bilgilerini Düzenle</span>
              </h3>
              <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Ad Soyad *</label>
                <input
                  type="text"
                  value={formFullName}
                  onChange={(e) => setFormFullName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Sıra No</label>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={formSeqNum}
                    onChange={(e) => setFormSeqNum(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Telefon</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-5 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Güncelleniyor...' : 'Güncelle'}
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Üye Kaydını Sil"
        message={`${selectedMember?.fullName} (Sıra No: ${selectedMember?.sequenceFormatted}) üye kaydını silmek istediğinizden emin misiniz?`}
        confirmText="Evet, Sil"
        cancelText="Vazgeç"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};
