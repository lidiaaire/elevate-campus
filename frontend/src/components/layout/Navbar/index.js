'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const fullName = user ? `${user.firstName} ${user.lastName}` : '';

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  return (
    <header className={styles.navbar}>
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
