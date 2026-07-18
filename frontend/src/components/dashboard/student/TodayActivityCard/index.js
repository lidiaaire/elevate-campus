'use client';

import Link from 'next/link';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import styles from './TodayActivityCard.module.css';

function isToday(dateStr) {
  if (!dateStr) return false;
  const d   = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth()    === now.getMonth()    &&
    d.getDate()     === now.getDate()
  );
}

function buildNextAction(continueLearning, pendingAssessments) {
  if (continueLearning) {
    return {
      label: continueLearning.lessonTitle ?? 'Siguiente lección',
      href:  `/courses/${continueLearning.courseId}/units/${continueLearning.unitId}/lessons/${continueLearning.lessonId}`,
    };
  }
  if (pendingAssessments?.length > 0) {
    const pa = pendingAssessments[0];
    return {
      label: `Evaluación: ${pa.assessmentTitle || pa.unitTitle}`,
      href:  `/courses/${pa.courseId}/units/${pa.unitId}/assessment`,
    };
  }
  return null;
}

export default function TodayActivityCard({
  summary,
  growth,
  recentActivity,
  pendingAssessments,
  continueLearning,
}) {
  const todayLessons = (recentActivity ?? []).filter((l) => isToday(l.completedAt));
  const lessonsToday = todayLessons.length;
  const streakDays   = summary.streakDays ?? 0;
  // streakDays > 0 implica actividad hoy (el cálculo del backend parte desde hoy)
  const studiedToday = streakDays > 0 || lessonsToday > 0 || isToday(summary.lastActivityAt);
  const pendingCount = pendingAssessments?.length ?? 0;
  const nextAction   = buildNextAction(continueLearning, pendingAssessments);

  if (!studiedToday) {
    return (
      <Card variant="default">
        <CardBody className={styles.body}>
          <h2 className={styles.title}>Mi actividad de hoy</h2>
          <div className={styles.empty}>
            <p className={styles.emptyMessage}>
              Aún no has estudiado hoy.
            </p>
            {nextAction && (
              <>
                <p className={styles.emptyHint}>Tu siguiente paso:</p>
                <Button as={Link} href={nextAction.href} variant="primary" size="sm">
                  {nextAction.label}
                </Button>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card variant="default">
      <CardBody className={styles.body}>
        <h2 className={styles.title}>Mi actividad de hoy</h2>

        <ul className={styles.stats} role="list">
          <li className={styles.stat}>
            <span className={styles.statValue}>{lessonsToday}</span>
            <span className={styles.statLabel}>
              {lessonsToday === 1 ? 'lección completada' : 'lecciones completadas'}
            </span>
          </li>

          <li className={`${styles.stat} ${streakDays > 0 ? styles.statStreak : ''}`}>
            <span className={styles.statValue}>{streakDays}</span>
            <span className={styles.statLabel}>días de racha</span>
          </li>

          <li className={`${styles.stat} ${pendingCount > 0 ? styles.statPending : ''}`}>
            <span className={styles.statValue}>{pendingCount}</span>
            <span className={styles.statLabel}>
              {pendingCount === 1 ? 'evaluación pendiente' : 'evaluaciones pendientes'}
            </span>
          </li>

          <li className={styles.stat}>
            <span className={styles.statValue}>{growth.lessonsCompleted7d ?? 0}</span>
            <span className={styles.statLabel}>lecciones esta semana</span>
          </li>
        </ul>

        {todayLessons.length > 0 && (
          <div className={styles.recent}>
            <p className={styles.recentLabel}>Completadas hoy</p>
            <ul className={styles.recentList} role="list">
              {todayLessons.map((l) => (
                <li key={String(l.lessonId)} className={styles.recentItem}>
                  <span className={styles.recentTitle}>{l.lessonTitle}</span>
                  <span className={styles.recentCourse}>{l.courseTitle}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
