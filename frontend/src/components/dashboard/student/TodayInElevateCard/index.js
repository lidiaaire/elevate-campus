'use client';

import Link from 'next/link';
import Card, { CardBody } from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import styles from './TodayInElevateCard.module.css';

const TYPE_LABELS = {
  assessment: 'Evaluación',
  assignment: 'Tarea',
  session:    'Sesión',
};

const TYPE_VARIANTS = {
  assessment: styles.badgeAssessment,
  assignment: styles.badgeAssignment,
  session:    styles.badgeSession,
};

function isTodayOrUndated(date) {
  if (!date) return true; // assessments sin fecha → siempre urgentes
  const d   = new Date(date);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth()    === now.getMonth()    &&
    d.getDate()     === now.getDate()
  );
}

function buildHref(item) {
  if (item.type === 'assessment' && item.courseId && item.unitId) {
    return `/courses/${item.courseId}/units/${item.unitId}/assessment`;
  }
  if (item.courseId) {
    return `/courses/${item.courseId}`;
  }
  return null;
}

function formatTime(date) {
  if (!date) return null;
  return new Date(date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function ActivityRow({ item }) {
  const href    = buildHref(item);
  const timeStr = item.type === 'session' ? formatTime(item.date) : null;

  const content = (
    <div className={styles.row}>
      <span className={`${styles.badge} ${TYPE_VARIANTS[item.type] ?? ''}`}>
        {TYPE_LABELS[item.type] ?? item.type}
      </span>
      <div className={styles.rowMain}>
        <span className={styles.rowTitle}>{item.title}</span>
        <span className={styles.rowCourse}>{item.courseTitle}</span>
      </div>
      <div className={styles.rowMeta}>
        {timeStr
          ? <span className={styles.rowTime}>{timeStr}</span>
          : <span className={styles.rowStatus}>{item.status}</span>
        }
      </div>
    </div>
  );

  if (href) {
    return (
      <li>
        <Link href={href} className={styles.rowLink}>
          {content}
        </Link>
      </li>
    );
  }
  return <li>{content}</li>;
}

export default function TodayInElevateCard({ upcomingActivities }) {
  const todayItems = (upcomingActivities ?? []).filter((item) => isTodayOrUndated(item.date));

  return (
    <Card variant="default">
      <CardBody className={styles.body}>
        <h2 className={styles.cardTitle}>Hoy en Elevate</h2>
        {todayItems.length === 0 ? (
          <div className={styles.emptyWrapper}>
            <EmptyState title="No tienes actividades programadas para hoy." />
            <Button as={Link} href="/calendar" variant="secondary" size="sm">
              Ver agenda completa
            </Button>
          </div>
        ) : (
          <ul className={styles.list}>
            {todayItems.map((item) => (
              <ActivityRow key={`${item.type}-${item.id}`} item={item} />
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
