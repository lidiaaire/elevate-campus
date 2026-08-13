'use client';

import Link from 'next/link';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import Card, { CardBody } from '@/components/ui/Card';
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

  const visual     = getCourseVisual(courseTitle);
  const imageSrc   = visual.coverImage || courseImage || null;
  const accentColor = visual.accentColor;
  const level = enrollments.find(
    (e) => e.courseId?.toString() === courseId?.toString(),
  )?.level;
  const lessonHref = `/courses/${courseId}/units/${unitId}/lessons/${lessonId}`;

  return (
    <Card variant="elevated" noPadding className={styles.spotlight}>

      {/* Visual abstracto del curso — no es una foto, es la identidad
          categórica ya definida por curso (courseVisuals.js) llevada
          a un panel grande en vez de una franja de color estrecha. */}
      <div className={styles.visual} style={{ '--card-accent': accentColor }}>
        {imageSrc ? (
          <img src={imageSrc} alt="" aria-hidden="true" className={styles.visualImage} />
        ) : (
          <div className={styles.visualPlaceholder} aria-hidden="true" />
        )}
        {level && <span className={styles.levelBadge}>{level}</span>}
        <span className={styles.progressBadge}>{overallProgress}%</span>
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Continuar aprendiendo</span>
          <p className={styles.courseTitle}>{courseTitle}</p>
          <p className={styles.unitLabel}>{unitTitle}</p>
        </div>

        {lastLesson && (
          <p className={styles.lastLesson}>
            <span className={styles.lastLessonPrefix}>Última lección:&nbsp;</span>
            {lastLesson.lessonTitle}
          </p>
        )}

        <div className={styles.nextStep}>
          <span className={styles.nextLabel}>Siguiente paso</span>
          <p className={styles.nextTitle}>{lessonTitle}</p>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressMeta}>
            <span className={styles.lessonsCount}>{completedLessons} / {totalLessons} lecciones</span>
            <span className={styles.progressPct}>{overallProgress}%</span>
          </div>
          <ProgressBar value={overallProgress} ariaLabel={`Progreso de ${courseTitle}`} />
        </div>

        <Button as={Link} href={lessonHref} variant="accent" size="md" className={styles.cta}>
          Continuar
        </Button>
      </div>
    </Card>
  );
}
