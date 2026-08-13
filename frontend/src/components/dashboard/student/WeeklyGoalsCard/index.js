'use client';

import Card, { CardBody } from '@/components/ui/Card';
import styles from './WeeklyGoalsCard.module.css';

const TYPE_LABELS = {
  lessons:    'Lecciones',
  streak:     'Racha',
  assessment: 'Evaluación',
  course:     'Curso',
  progress:   'Progreso',
};

function buildGoals({ summary, growth, pendingAssessments, continueLearning }) {
  const goals = [];

  // Lecciones semanales — objetivo adaptado a la media de las últimas 4 semanas
  const weeklyAvg   = Math.ceil((growth.lessonsCompleted30d ?? 0) / 4);
  const lessonTarget = Math.max(3, Math.min(10, weeklyAvg + 1));
  goals.push({
    id:      'lessons-week',
    type:    'lessons',
    label:   `Completar ${lessonTarget} lecciones esta semana`,
    current: growth.lessonsCompleted7d ?? 0,
    target:  lessonTarget,
  });

  // Racha — siguiente hito desde la racha actual
  const streak       = summary.streakDays ?? 0;
  const streakTarget = streak < 7 ? 7 : streak < 14 ? 14 : streak < 21 ? 21 : 30;
  goals.push({
    id:      'streak',
    type:    'streak',
    label:   `Mantener una racha de ${streakTarget} días`,
    current: streak,
    target:  streakTarget,
  });

  // Primera evaluación pendiente
  if (pendingAssessments?.length > 0) {
    const pa = pendingAssessments[0];
    goals.push({
      id:      `eval-${pa.assessmentId}`,
      type:    'assessment',
      label:   `Completar evaluación: ${pa.assessmentTitle || pa.unitTitle}`,
      current: 0,
      target:  1,
    });
  }

  // Siguiente hito en el curso activo
  if (continueLearning && continueLearning.overallProgress < 100) {
    const cur       = continueLearning.overallProgress;
    const milestone = Math.min(100, Math.ceil((cur + 1) / 10) * 10);
    goals.push({
      id:      `course-${continueLearning.courseId}`,
      type:    'course',
      label:   `Alcanzar el ${milestone}% en ${continueLearning.courseTitle}`,
      current: cur,
      target:  milestone,
    });
  }

  // Progreso global semanal — si aún hay hueco
  if (goals.length < 5 && (summary.totalEnrollments ?? 0) > 0) {
    const weeklyProgressTarget = 5;
    goals.push({
      id:      'weekly-progress',
      type:    'progress',
      label:   `Ganar un ${weeklyProgressTarget}% de progreso esta semana`,
      current: Math.min(growth.progressGained7d ?? 0, weeklyProgressTarget),
      target:  weeklyProgressTarget,
    });
  }

  // Máximo 3: card compacta, no una lista interminable de barras.
  return goals.slice(0, 3);
}

function GoalItem({ goal }) {
  const pct  = Math.min(100, goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0);
  const done = goal.current >= goal.target;

  return (
    <li className={`${styles.goal} ${done ? styles.goalDone : ''}`}>
      <div className={styles.goalHeader}>
        <span className={`${styles.badge} ${styles[`badge_${goal.type}`]}`}>
          {TYPE_LABELS[goal.type] ?? goal.type}
        </span>
        <span className={styles.goalLabel}>{goal.label}</span>
        {done && (
          <span className={styles.check} aria-label="Completado">&#10003;</span>
        )}
      </div>
      <div className={styles.goalProgress} aria-hidden={done}>
        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className={styles.fraction}>
          {done ? 'Completado' : `${goal.current} / ${goal.target}`}
        </span>
      </div>
    </li>
  );
}

export default function WeeklyGoalsCard({ summary, growth, pendingAssessments, continueLearning }) {
  const goals   = buildGoals({ summary, growth, pendingAssessments, continueLearning });
  const allDone = goals.every((g) => g.current >= g.target);

  return (
    <Card variant="default">
      <CardBody className={styles.body}>
        <div className={styles.header}>
          <h2 className={styles.title}>Objetivos de la semana</h2>
          {allDone && (
            <span className={styles.allDoneBadge}>Semana completada</span>
          )}
        </div>
        <ul className={styles.list}>
          {goals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
