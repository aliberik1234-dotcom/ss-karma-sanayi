import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';
import { ThemeName } from '../types';
import { Palette, Check, Sun, Moon, Monitor } from 'lucide-react';

const THEME_OPTIONS: { id: ThemeName; label: string; icon: React.ReactNode }[] = [
  { id: 'system', label: 'Sistem', icon: <Monitor className="w-4 h-4" /> },
  { id: 'light', label: 'Açık', icon: <Sun className="w-4 h-4" /> },
  { id: 'dark', label: 'Koyu', icon: <Moon className="w-4 h-4" /> },
  { id: 'modern_blue', label: 'Modern Mavi', icon: <Palette className="w-4 h-4 text-blue-500" /> },
];

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { playClick } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; right: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current && !buttonRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleToggle = () => {
    playClick();
    if (!isOpen) {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + 8,
          right: window.innerWidth - rect.right,
        });
      }
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSetTheme = (t: ThemeName) => {
    playClick();
    setTheme(t);
    setIsOpen(false);
  };

  const currentLabel = THEME_OPTIONS.find((t) => t.id === theme)?.label || 'Sistem';

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
        title="Tema Değiştir"
      >
        <Palette className="w-3.5 h-3.5" />
        <span>{currentLabel}</span>
      </button>

      {isOpen && position && (
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: position.top,
            right: position.right,
            zIndex: 9999,
          }}
          className="w-44 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-1 text-xs animate-in fade-in"
        >
          <div className="px-3 py-1.5 text-[10px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-700">
            Tema Seçimi
          </div>
          {THEME_OPTIONS.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSetTheme(t.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                theme === t.id
                  ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
              {theme === t.id && <Check className="w-3.5 h-3.5 ml-auto text-blue-600 dark:text-blue-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
