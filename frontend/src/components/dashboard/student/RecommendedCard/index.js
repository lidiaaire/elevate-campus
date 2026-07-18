'use client';

import Link from 'next/link';
import Card, { CardBody } from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import styles from './RecommendedCard.module.css';

const TYPE_LABELS = {
  continue:    'Continuar',
  assessment:  'Evaluación',
  course:      'Sugerido',
};

function buildRecommendations({ continueLearning, pendingAssessments, enrollments }) {
  const recs = [];

  if (continueLearning) {
    recs.push({
      id:          `continue-${continueLearning.lessonId}`,
      type:        'continue',
      title:       continueLearning.lessonTitle ?? 'Siguiente lección',
      description: continueLearning.courseTitle,
      detail:      continueLearning.unitTitle,
      progress:    continueLearning.overallProgress,
      href:        `/courses/${continueLearning.courseId}/units/${continueLearning.unitId}/lessons/${continueLearning.lessonId}`,
    });
  }

  if (pendingAssessments?.length > 0) {
    const pa = pendingAssessments[0];
    recs.push({
      id:          `assessment-${pa.assessmentId}`,
      type:        'assessment',
      title:       pa.assessmentTitle || `Evaluación: ${pa.unitTitle}`,
      description: pa.courseTitle,
      detail:      `${pa.maxAttempts - pa.attemptsUsed} intento${pa.maxAttempts - pa.attemptsUsed !== 1 ? 's' : ''} restante${pa.maxAttempts - pa.attemptsUsed !== 1 ? 's' : ''}`,
      progress:    null,
      href:        `/courses/${pa.courseId}/units/${pa.unitId}/assessment`,
    });
  }

  // Siguiente curso: el activo con menos progreso que no sea el de continueLearning
  if (recs.length < 3 && enrollments?.length > 0) {
    const others = enrollments
      .filter((e) => !continueLearning || e.courseId.toString() !== continueLearning.courseId.toString())
      .sort((a, b) => a.overallProgress - b.overallProgress);

    if (others.length > 0) {
      const e = others[0];
      recs.push({
        id:          `course-${e.courseId}`,
        type:        'course',
        title:       e.courseTitle,
        description: `${e.completedLessons} de ${e.totalLessons} lecciones completadas`,
        detail:      null,
        progress:    e.overallProgress,
        href:        `/courses/${e.courseId}`,
      });
    }
  }

  return recs.slice(0, 3);
}

function RecommendationItem({ rec }) {
  return (
    <li>
      <Link href={rec.href} className={styles.item}>
        <div className={styles.itemTop}>
          <span className={`${styles.badge} ${styles[`badge_${rec.type}`]}`}>
            {TYPE_LABELS[rec.type]}
          </span>
          {rec.progress !== null && (
            <span className={styles.pct}>{rec.progress}%</span>
          )}
        </div>
        <p className={styles.itemTitle}>{rec.title}</p>
        <p className={styles.itemDesc}>{rec.description}</p>
        {rec.detail && (
          <p className={styles.itemDetail}>{rec.detail}</p>
        )}
        {rec.progress !== null && (
          <div className={styles.track}>
            <div className={styles.fill} style={{ width: `${rec.progress}%` }} />
          </div>
        )}
      </Link>
    </li>
  );
}

export default function RecommendedCard({ continueLearning, pendingAssessments, enrollments }) {
  const recs = buildRecommendations({ continueLearning, pendingAssessments, enrollments });

  return (
    <Card variant="default">
      <CardBody className={styles.body}>
        <h2 className={styles.title}>Recomendado para ti</h2>
        {recs.length === 0 ? (
          <EmptyState title="No hay recomendaciones disponibles." />
        ) : (
          <ul className={styles.list}>
            {recs.map((rec) => (
              <RecommendationItem key={rec.id} rec={rec} />
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
