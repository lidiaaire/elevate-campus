'use client';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from './EmptyDashboard.module.css';

export default function EmptyDashboard({ firstName }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Hola, {firstName}</h1>
        <p className={styles.body}>
          Todavía no tienes ningún curso activo. Explora el catálogo para
          descubrir todo lo que tenemos disponible.
        </p>
        <Button as={Link} href="/courses" variant="primary" size="md">
          Explorar cursos
        </Button>
      </div>
    </div>
  );
}
