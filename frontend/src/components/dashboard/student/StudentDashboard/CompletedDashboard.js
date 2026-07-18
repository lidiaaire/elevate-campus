'use client';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from './CompletedDashboard.module.css';

export default function CompletedDashboard({ firstName }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon} aria-hidden="true">🎓</div>
        <h1 className={styles.heading}>¡Felicidades, {firstName}!</h1>
        <p className={styles.body}>
          Has completado todos tus cursos. Es un logro extraordinario. Descarga
          tus certificados o explora nuevos cursos para seguir aprendiendo.
        </p>
        <div className={styles.actions}>
          <Button as={Link} href="/certificates" variant="primary" size="md">
            Ver mis certificados
          </Button>
          <Button as={Link} href="/courses" variant="secondary" size="md">
            Explorar más cursos
          </Button>
        </div>
      </div>
    </div>
  );
}
