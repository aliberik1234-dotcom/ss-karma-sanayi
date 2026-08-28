import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/ToastContainer';
import { LoginPage } from './pages/LoginPage';
import { MemberListPage } from './pages/MemberListPage';
import { PrivateMemberPage } from './pages/PrivateMemberPage';
import { SettingsPage } from './pages/SettingsPage';
import { DashboardPage } from './pages/DashboardPage';
import { OverduePaymentsPage } from './pages/OverduePaymentsPage';
import { AuditLogViewerPage } from './pages/AuditLogViewerPage';
import { MemberItem } from './types';
import { dispatchShortcut, SHORTCUT_EVENTS } from './utils/shortcuts';
import { useSound } from './context/SoundContext';

export const AppContent: React.FC = () => {
  const { role } = useAuth();
  const { playClick } = useSound();
   const [currentPage, setCurrentPage] = useState<'members' | 'private' | 'settings' | 'dashboard' | 'overdue' | 'auditLog'>('members');
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);

  useEffect(() => {
    if (role === 'GUEST') {
      if (currentPage === 'dashboard' || currentPage === 'overdue' || currentPage === 'auditLog') {
        setCurrentPage('members');
      }
    }
  }, [role, currentPage]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        playClick();
        if (role === 'ADMIN') {
          setCurrentPage('dashboard');
          dispatchShortcut(SHORTCUT_EVENTS.OPEN_DASHBOARD);
        } else if (currentPage === 'private') {
          dispatchShortcut(SHORTCUT_EVENTS.OPEN_NEW_PAYMENT);
        } else if (currentPage === 'members') {
          dispatchShortcut(SHORTCUT_EVENTS.OPEN_ADD_MEMBER);
        } else {
          setCurrentPage('members');
          dispatchShortcut(SHORTCUT_EVENTS.OPEN_ADD_MEMBER);
        }
      }

      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        playClick();
        if (currentPage === 'members') {
          dispatchShortcut(SHORTCUT_EVENTS.OPEN_MEMBER_SEARCH);
        } else {
          setCurrentPage('members');
          dispatchShortcut(SHORTCUT_EVENTS.OPEN_MEMBER_SEARCH);
        }
      }

      if (e.ctrlKey && e.key === 'o') {
        e.preventDefault();
        playClick();
        if (role === 'ADMIN') {
          setCurrentPage('overdue');
        }
      }

      if (e.key === 'Escape') {
        dispatchShortcut(SHORTCUT_EVENTS.CLOSE_MODAL);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentPage, role, playClick]);

  if (!role) {
    return (
      <>
        <LoginPage />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden select-none font-sans text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900">
       <Navbar
          onOpenSettings={() => setCurrentPage('settings')}
          onOpenDashboard={role === 'ADMIN' ? () => setCurrentPage('dashboard') : undefined}
          onOpenAuditLog={role === 'ADMIN' ? () => setCurrentPage('auditLog') : undefined}
        />
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {currentPage === 'dashboard' && role === 'ADMIN' && (
          <DashboardPage onNavigateToOverdue={() => setCurrentPage('overdue')} />
        )}
        {currentPage === 'overdue' && role === 'ADMIN' && (
          <OverduePaymentsPage onBack={() => setCurrentPage('dashboard')} />
        )}
        {currentPage === 'auditLog' && role === 'ADMIN' && (
          <AuditLogViewerPage onBack={() => setCurrentPage(role === 'ADMIN' ? 'dashboard' : 'members')} />
        )}
        {currentPage === 'members' && (
          <MemberListPage
            onSelectMemberForPrivate={(m) => {
              setSelectedMember(m);
              setCurrentPage('private');
            }}
          />
        )}
        {currentPage === 'private' && selectedMember && (
          <PrivateMemberPage
            member={selectedMember}
            onBack={() => {
              setSelectedMember(null);
              setCurrentPage('members');
            }}
          />
        )}
        {currentPage === 'settings' && (
          <SettingsPage onBack={() => setCurrentPage(role === 'ADMIN' ? 'dashboard' : 'members')} />
        )}
      </main>
      <ToastContainer />
    </div>
  );
};
