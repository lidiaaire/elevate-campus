'use client';

import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import styles from './AssessmentSummary.module.css';

function MetricItem({ label, value }) {
  return (
    <div className={styles.metric}>
      <span className={styles.metricValue}>{value}</span>
      <span className={styles.metricLabel}>{label}</span>
    </div>
  );
}

export default function AssessmentSummary({ assessmentScore, lessonsCompleted7d, progressGained7d, streakDays }) {
  return (
    <Card variant="default" noPadding>
      <CardHeader divided>
        <h3 className={styles.cardTitle}>Actividad y evaluación</h3>
      </CardHeader>
      <CardBody>
        <div className={styles.grid}>
          <MetricItem
            label="Nota de evaluación"
            value={assessmentScore != null ? `${assessmentScore}%` : '—'}
          />
          <MetricItem
            label="Racha actual"
            value={`${streakDays} días`}
          />
          <MetricItem
            label="Lecciones (7 días)"
            value={lessonsCompleted7d}
          />
          <MetricItem
            label="Progreso ganado (7 días)"
            value={`${progressGained7d}%`}
          />
        </div>
      </CardBody>
    </Card>
  );
}
