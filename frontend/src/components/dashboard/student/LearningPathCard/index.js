'use client';

import Link from 'next/link';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import Card, { CardBody, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import styles from './LearningPathCard.module.css';

export default function LearningPathCard({ enrollment }) {
  const {
    courseId,
    courseTitle,
    level,
    overallProgress,
    completedLessons,
    totalLessons,
    nextLesson,
  } = enrollment;

  const { accentColor } = getCourseVisual(courseTitle);

  const continueHref = nextLesson
    ? `/courses/${courseId}/units/${nextLesson.unitId}/lessons/${nextLesson.lessonId}`
    : `/courses/${courseId}`;

  return (
    <Card as="li" variant="elevated" noPadding>

      <div className={styles.header} style={{ '--card-accent': accentColor }}>
        <span className={styles.levelBadge}>{level}</span>
        <span className={styles.progressBadge}>{overallProgress}%</span>
      </div>

      <CardBody className={styles.body}>
        <p className={styles.courseTitle}>{courseTitle}</p>

        {nextLesson ? (
          <div className={styles.nextStep}>
            <p className={styles.nextLabel}>Siguiente</p>
            <p className={styles.nextUnit}>{nextLesson.unitTitle}</p>
            <p className={styles.nextLesson}>{nextLesson.lessonTitle}</p>
          </div>
        ) : (
          <p className={styles.completedNote}>Curso completado ✓</p>
        )}

        <div className={styles.progressSection}>
          <ProgressBar value={overallProgress} ariaLabel={`Progreso de ${courseTitle}`} />
          <p className={styles.lessonsCount}>
            {completedLessons} / {totalLessons} lecciones completadas
          </p>
        </div>
      </CardBody>

      <CardFooter divided align="end">
        <Button
          as={Link}
          href={continueHref}
          variant={nextLesson ? 'primary' : 'secondary'}
          size="sm"
        >
          {nextLesson ? 'Continuar' : 'Ver curso'}
        </Button>
      </CardFooter>

    </Card>
  );
}
