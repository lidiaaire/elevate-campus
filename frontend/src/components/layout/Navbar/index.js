'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import styles from './Navbar.module.css';

export default function Navbar({ sidebarOpen, onToggleSidebar, toggleRef }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const fullName = user ? `${user.firstName} ${user.lastName}` : '';

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  return (
    <header className={styles.navbar}>
      <Button
        ref={toggleRef}
        variant="ghost"
        size="lg"
        iconOnly
        iconLeft={sidebarOpen ? '✕' : '☰'}
        className={styles.menuToggle}
        onClick={onToggleSidebar}
        aria-expanded={sidebarOpen}
        aria-controls="app-sidebar"
        aria-label={sidebarOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
      />

      {user && (
        <div className={styles.userInfo}>
          <span className={styles.name}>{fullName}</span>
        </div>
      )}

      <Button variant="secondary" size="sm" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </header>
  );
}
