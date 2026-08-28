import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { ThemeSelector } from './ThemeSelector';
import { Shield, LogOut, Settings, User, Menu, X, LayoutDashboard, ClipboardList, Search } from 'lucide-react';
import logoImg from '../assets/logo.png';

interface NavbarProps {
  onOpenSettings?: () => void;
  onOpenDashboard?: () => void;
  onOpenAuditLog?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSettings, onOpenDashboard, onOpenAuditLog }) => {
  const { role, user, token, logout } = useAuth();
  const { playClick } = useSound();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!showUserMenu) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  useEffect(() => {
    if (!globalSearchOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setGlobalSearchOpen(false);
        setSearchResults([]);
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);
    return () => { clearTimeout(timer); document.removeEventListener('mousedown', handleClickOutside); };
  }, [globalSearchOpen]);

  const handleGlobalSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) { setSearchResults([]); return; }
    if (!token) return;
    setIsSearching(true);
    try {
      const res = await window.electronAPI.searchGlobal({ token, query, role: role as 'admin' | 'guest' });
      if (res?.success && res.results) {
        setSearchResults(res.results);
      }
    } catch {} finally {
      setIsSearching(false);
    }
  };

  const getUserMenuStyle = (): React.CSSProperties => {
    if (!userButtonRef.current) return { position: 'fixed', top: 0, right: 0 };
    const rect = userButtonRef.current.getBoundingClientRect();
    return {
      position: 'fixed',
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
      zIndex: 9999,
    };
  };

  return (
    <header className="h-14 border-b shrink-0 flex items-center justify-between px-4 lg:px-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg border border-slate-200 dark:border-slate-700">
            <img src={logoImg} alt="Logo" className="w-8 h-8 object-contain" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              S.S. Karma Sanayi Sitesi
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-500">
              Üye Takip ve Cari Yönetim Sistemi
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2">
          {role === 'ADMIN' && onOpenDashboard && (
            <>
              <button
                onClick={() => { playClick(); onOpenDashboard(); }}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                title="Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>
              <button
                onClick={() => { playClick(); onOpenAuditLog?.(); }}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                title="Audit Log"
              >
                <ClipboardList className="w-4 h-4" />
              </button>
            </>
          )}

          <div className="relative" ref={searchRef}>
            <button
              onClick={() => { playClick(); setGlobalSearchOpen(!globalSearchOpen); searchInputRef.current?.focus(); }}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              title="Genel Arama"
            >
              <Search className="w-4 h-4" />
            </button>
            {globalSearchOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in">
                <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2 w-4 h-4 text-slate-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Üye, telefon, taksit no..."
                      value={searchQuery}
                      onChange={(e) => handleGlobalSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {isSearching && <div className="p-3 text-center text-slate-500 dark:text-slate-400 text-xs">Aranıyor...</div>}
                  {!isSearching && searchResults.length === 0 && searchQuery && <div className="p-3 text-center text-slate-500 dark:text-slate-400 text-xs">Sonuç bulunamadı.</div>}
                  {!isSearching && searchResults.map((r, idx) => (
                    <div key={idx} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800/50 cursor-pointer border-b border-slate-200 dark:border-slate-700 last:border-0">
                      {r.type === 'member' ? (
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{r.fullName}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">#{r.sequenceNumber} • {r.phone}</p>
                          {r.financial && (
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                              Tapı: {r.financial.plotSize}, Peşinat: ₺{r.financial.downPayment}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{r.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Kod: {r.code}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <ThemeSelector />
        </div>

        <div className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 border ${
          role === 'ADMIN'
            ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300'
            : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
        }`}>
          {role === 'ADMIN' ? (
            <>
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin: {user}</span>
            </>
          ) : (
            <>
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Misafir Modu</span>
            </>
          )}
        </div>

        <div className="relative">
          <button
            ref={userButtonRef}
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            title="Kullanıcı Menüsü"
          >
            <User className="w-4 h-4" />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div
                style={getUserMenuStyle()}
                ref={userMenuRef}
                className="w-48 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl z-50 overflow-hidden animate-in fade-in"
              >
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-medium text-slate-900 dark:text-slate-100">
                    {user || 'Misafir Kullanıcı'}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-500">
                    {role === 'ADMIN' ? 'Yönetici' : 'Misafir'}
                  </p>
                </div>

                <div className="py-1">
                  {role === 'ADMIN' && onOpenSettings && (
                    <>
                      {onOpenDashboard && (
                        <button
                          onClick={() => {
                            playClick();
                            setShowUserMenu(false);
                            onOpenDashboard();
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5" />
                          <span>Dashboard</span>
                        </button>
                      )}
                      {onOpenAuditLog && (
                        <button
                          onClick={() => {
                            playClick();
                            setShowUserMenu(false);
                            onOpenAuditLog();
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <ClipboardList className="w-3.5 h-3.5" />
                          <span>Audit Log</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          playClick();
                          setShowUserMenu(false);
                          onOpenSettings();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        <span>Ayarlar</span>
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => {
                      playClick();
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-left text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Oturumu Kapat</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
