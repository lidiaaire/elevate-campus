import Button from '@/components/ui/Button';
import styles from './AccessDenied.module.css';

export default function AccessDenied() {
  return (
    <div className={styles.wrapper} role="alert">
      <span className={styles.icon} aria-hidden="true">⊘</span>
      <p className={styles.title}>Acceso denegado</p>
      <p className={styles.description}>No tienes permisos para ver esta página.</p>
      <Button as="a" href="/dashboard" variant="secondary">
        Volver al inicio
      </Button>
    </div>
  );
}
