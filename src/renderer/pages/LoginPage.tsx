import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../context/SoundContext';
import { useToast } from '../context/ToastContext';
import { ThemeSelector } from '../components/ThemeSelector';
import { Shield, User, Lock, LogIn, Eye, EyeOff } from 'lucide-react';

import logoImg from '../assets/logo.png';

export const LoginPage: React.FC = () => {
  const { loginAsGuest, loginAsAdmin } = useAuth();
  const { playClick, playSuccess, playError } = useSound();
  const { showToast } = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuestLogin = async () => {
    playClick();
    try {
      await loginAsGuest();
      playSuccess();
      showToast('info', 'Misafir modu ile giriş yapıldı.');
    } catch (e: any) {
      playError();
      showToast('error', e.message || 'Misafir girişi başarısız.');
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      showToast('error', 'Kullanıcı adı ve şifre zorunludur.');
      playError();
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await window.electronAPI.adminLogin({ username, password });
      if (res?.success) {
        playSuccess();
        showToast('success', 'Admin girişi başarılı.');
        loginAsAdmin(res.token, username);
      } else {
        playError();
        const errMsg = res?.error || 'Giriş başarısız.';
        setError(errMsg);
        showToast('error', errMsg);
      }
    } catch (e: any) {
      playError();
      const errMsg = e.message || 'Giriş hatası.';
      setError(errMsg);
      showToast('error', errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="absolute top-6 right-6 z-20">
        <ThemeSelector />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-600/30">
            {logoImg ? (
              <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
            ) : (
              <Shield className="w-8 h-8 text-white" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            S.S. Karma Sanayi Sitesi
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Üye Takip ve Cari Yönetim Sistemi
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-200 text-xs leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Kullanıcı Adı
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors"
                  placeholder="Kullanıcı adı"
                  autoFocus
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Şifre
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400 dark:text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-10 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-colors"
                  placeholder="Şifre"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Giriş Yapılıyor...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Giriş Yap</span>
                </>
              )}
            </button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500">
                veya
              </span>
            </div>
          </div>

          <button
            onClick={handleGuestLogin}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Misafir Olarak Giriş Yap</span>
          </button>
        </div>

        <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 mt-6">
          Versiyon 1.0.0 | S.S. Karma Sanayi Sitesi
        </p>
      </div>
    </div>
  );
};
