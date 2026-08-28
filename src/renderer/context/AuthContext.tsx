import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Role } from '../types';
import { useToast } from './ToastContext';

interface AuthContextType {
  role: Role | null;
  token: string | null;
  user: string | null;
  loginAsGuest: () => Promise<void>;
  loginAsAdmin: (token: string, user: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  token: null,
  user: null,
  loginAsGuest: async () => {},
  loginAsAdmin: () => {},
  logout: async () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const { showToast } = useToast();
  const validationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearSession = () => {
    setToken(null);
    setRole(null);
    setUser(null);
  };

  const validateAndHandle = async () => {
    if (!token) return;
    try {
      const res = await window.electronAPI.validateSession({ token });
      if (!res?.valid) {
        showToast('warning', res?.error || 'Oturumunuzun süresi doldu, lütfen tekrar giriş yapın.');
        clearSession();
        if (window.electronAPI?.logout) {
          await window.electronAPI.logout({ token });
        }
      }
    } catch {
      clearSession();
    }
  };

  useEffect(() => {
    if (!token) {
      if (validationIntervalRef.current) {
        clearInterval(validationIntervalRef.current);
        validationIntervalRef.current = null;
      }
      return;
    }
    validationIntervalRef.current = setInterval(validateAndHandle, 60 * 1000);
    return () => {
      if (validationIntervalRef.current) {
        clearInterval(validationIntervalRef.current);
        validationIntervalRef.current = null;
      }
    };
  }, [token]);

  const loginAsGuest = async () => {
    if (!window.electronAPI?.guestLogin) return;
    const res = await window.electronAPI.guestLogin();
    if (res?.success) {
      setToken(res.token);
      setRole('GUEST');
      setUser('Misafir Kullanıcı');
    }
  };

  const loginAsAdmin = (newToken: string, adminUser: string) => {
    setToken(newToken);
    setRole('ADMIN');
    setUser(adminUser);
  };

  const logout = async () => {
    if (token && window.electronAPI?.logout) {
      await window.electronAPI.logout({ token });
    }
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ role, token, user, loginAsGuest, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
