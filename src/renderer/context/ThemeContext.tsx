import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeName } from '../types';

interface ThemeContextType {
  theme: ThemeName;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {}
});

function getStoredTheme(): ThemeName {
  if (typeof window === 'undefined') return 'system';
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark' || saved === 'system' || saved === 'modern_blue') return saved as ThemeName;
  return 'system';
}

function resolveTheme(theme: ThemeName): 'light' | 'dark' {
  if (theme === 'light') return 'light';
  if (theme === 'dark') return 'dark';
  if (theme === 'modern_blue') return 'light';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme: ThemeName): void {
  const resolved = resolveTheme(theme);
  const html = document.documentElement;
  html.classList.toggle('modern-blue', theme === 'modern_blue');
  if (resolved === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  if (typeof window.electronAPI?.savePreferences === 'function') {
    window.electronAPI.savePreferences({ theme }).catch(() => {});
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored);
    const resolved = resolveTheme(stored);
    setResolvedTheme(resolved);
    applyTheme(stored);
  }, []);

  useEffect(() => {
    if (theme !== 'system') {
      const resolved = resolveTheme(theme);
      setResolvedTheme(resolved);
      return;
    }
    const updateResolved = () => {
      const resolved = resolveTheme('system');
      setResolvedTheme(resolved);
      applyTheme('system');
    };
    updateResolved();
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', updateResolved);
    return () => mq.removeEventListener('change', updateResolved);
  }, [theme]);

  const setTheme = (t: ThemeName) => {
    localStorage.setItem('theme', t);
    setThemeState(t);
    const resolved = resolveTheme(t);
    setResolvedTheme(resolved);
    applyTheme(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
