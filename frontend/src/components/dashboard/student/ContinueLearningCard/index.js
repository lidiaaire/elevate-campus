'use client';

import Link from 'next/link';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import Card, { CardBody, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import EmptyState from '@/components/ui/EmptyState';
import styles from './ContinueLearningCard.module.css';

export default function ContinueLearningCard({ continueLearning, enrollments }) {
  if (!enrollments || enrollments.length === 0) {
    return (
      <EmptyState title="Aún no tienes cursos activos." />
    );
  }

  if (!continueLearning) {
    const firstCourseId = enrollments[0]?.courseId;
    return (
      <Card variant="elevated">
        <CardBody className={styles.completedBody}>
          <p className={styles.completedText}>
            Has completado todos tus cursos disponibles. ¡Enhorabuena!
          </p>
          {firstCourseId && (
            <Button as={Link} href={`/courses/${firstCourseId}`} variant="secondary" size="sm">
              Ver resumen del curso
            </Button>
          )}
        </CardBody>
      </Card>
    );
  }

  const {
    courseId,
    courseTitle,
    courseImage,
    unitId,
    unitTitle,
    lessonId,
    lessonTitle,
    lastLesson,
    overallProgress,
    completedLessons,
    totalLessons,
  } = continueLearning;

  const visual      = getCourseVisual(courseTitle);
  const imageSrc    = visual.coverImage || courseImage || null;
  const accentColor = visual.accentColor;
  const lessonHref  = `/courses/${courseId}/units/${unitId}/lessons/${lessonId}`;

  return (
    <Card variant="elevated" noPadding>
      <div
        className={styles.imageWrapper}
        style={{ '--card-accent': accentColor }}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={courseTitle} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}
        <span className={styles.progressBadge}>{overallProgress}%</span>
      </div>

      <CardBody className={styles.body}>
        <p className={styles.courseTitle}>{courseTitle}</p>

        <p className={styles.unitLabel}>{unitTitle}</p>

        {lastLesson && (
          <p className={styles.lastLesson}>
            <span className={styles.lastLessonPrefix}>Última lección:&nbsp;</span>
            {lastLesson.lessonTitle}
          </p>
        )}

        <div className={styles.progressSection}>
          <div className={styles.progressMeta}>
            <span className={styles.lessonsCount}>{completedLessons} / {totalLessons} lecciones</span>
            <span className={styles.progressPct}>{overallProgress}%</span>
          </div>
          <ProgressBar value={overallProgress} ariaLabel={`Progreso de ${courseTitle}`} />
        </div>
      </CardBody>

      <CardFooter divided align="end">
        <Button as={Link} href={lessonHref} variant="primary" size="md">
          Continuar
        </Button>
      </CardFooter>
    </Card>
  );
}
