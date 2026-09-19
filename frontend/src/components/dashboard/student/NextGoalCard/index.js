'use client';

import Link from 'next/link';
import { Target } from 'lucide-react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import styles from './NextGoalCard.module.css';

/**
 * NextGoalCard — "Próximo objetivo".
 *
 * Deliberadamente distinto de ContinueLearningCard: mientras esa card
 * resuelve "tu siguiente lección", esta resuelve "tu siguiente evaluación
 * pendiente" — para no repetir la misma acción en dos sitios del dashboard.
 */
export default function NextGoalCard({ pendingAssessments }) {
  const next = pendingAssessments?.[0] ?? null;

  return (
    <Card variant="default" className={styles.card}>
      <CardBody className={styles.body}>
        <div className={styles.header}>
          <Target size={16} className={styles.headerIcon} aria-hidden="true" />
          <h2 className={styles.title}>Próximo objetivo</h2>
        </div>

        {next ? (
          <div className={styles.content}>
            <span className={styles.badge}>Evaluación</span>
            <p className={styles.goalTitle}>{next.assessmentTitle || next.unitTitle}</p>
            <p className={styles.goalMeta}>{next.courseTitle}</p>
            <p className={styles.attempts}>
              {next.maxAttempts - next.attemptsUsed} intento{(next.maxAttempts - next.attemptsUsed) !== 1 ? 's' : ''} restante{(next.maxAttempts - next.attemptsUsed) !== 1 ? 's' : ''}
            </p>
            <Button
              as={Link}
              href={`/courses/${next.courseId}/units/${next.unitId}/assessment`}
              variant="accent"
              size="sm"
              className={styles.cta}
            >
              Empezar evaluación
            </Button>
          </div>
        ) : (
          <EmptyState title="Sin evaluaciones pendientes." description="Estás al día." />
        )}
      </CardBody>
    </Card>
  );
}
