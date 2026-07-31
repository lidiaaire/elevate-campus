'use client';

import { useState, useRef } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';
import AccessDenied from '@/components/ui/AccessDenied';
import { ToastProvider } from '@/contexts/ToastContext';
import styles from './ProtectedLayout.module.css';

export default function ProtectedLayout({ children }) {
  const { isAuthenticated, isAuthorized } = useProtectedRoute();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarTriggerRef = useRef(null);

  if (isAuthenticated === null || !isAuthenticated) return null;

  return (
    <ToastProvider>
      <div className={styles.shell}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} triggerRef={sidebarTriggerRef} />
        <div className={styles.main}>
          <Navbar
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
            toggleRef={sidebarTriggerRef}
          />
          <main className={styles.content}>
            {isAuthorized ? children : <AccessDenied />}
          </main>
          {user?.role === 'student' && <BottomNav />}
        </div>
      </div>
    </ToastProvider>
  );
}
