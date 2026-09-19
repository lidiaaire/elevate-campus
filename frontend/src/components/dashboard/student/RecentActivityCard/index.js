'use client';

import { History, CheckCircle2 } from 'lucide-react';
import Card, { CardBody } from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import styles from './RecentActivityCard.module.css';

// recentActivity (dashboard.service) solo contiene lecciones completadas —
// no se inventan tipos de evento que el backend no distingue (evaluación
// aprobada, lección iniciada, etc.).
function formatRelative(dateStr) {
  const date = new Date(dateStr);
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'Hoy';
  if (days === 1) return 'Ayer';
  return `Hace ${days} días`;
}

export default function RecentActivityCard({ recentActivity }) {
  const items = (recentActivity ?? []).slice(0, 4);

  return (
    <Card variant="default" className={styles.card}>
      <CardBody className={styles.body}>
        <div className={styles.header}>
          <History size={16} className={styles.headerIcon} aria-hidden="true" />
          <h2 className={styles.title}>Actividad reciente</h2>
        </div>

        {items.length === 0 ? (
          <EmptyState title="Aún no has completado ninguna lección." />
        ) : (
          <ul className={styles.list} role="list">
            {items.map((item) => (
              <li key={String(item.lessonId)} className={styles.item}>
                <CheckCircle2 size={14} className={styles.itemIcon} aria-hidden="true" />
                <div className={styles.itemMain}>
                  <span className={styles.itemTitle}>{item.lessonTitle}</span>
                  <span className={styles.itemCourse}>{item.courseTitle}</span>
                </div>
                <span className={styles.itemTime}>{formatRelative(item.completedAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
