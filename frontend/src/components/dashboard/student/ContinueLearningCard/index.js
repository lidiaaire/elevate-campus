'use client';

import Link from 'next/link';
import { PlayCircle } from 'lucide-react';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import EmptyState from '@/components/ui/EmptyState';
import styles from './ContinueLearningCard.module.css';

export default function ContinueLearningCard({ continueLearning, enrollments }) {
  if (!enrollments || enrollments.length === 0) {
    return (
      <Card variant="default" className={styles.card}>
        <CardBody>
          <EmptyState title="Aún no tienes cursos activos." />
        </CardBody>
      </Card>
    );
  }

  if (!continueLearning) {
    const firstCourseId = enrollments[0]?.courseId;
    const allCompleted = enrollments.every((enrollment) => enrollment.enrollmentStatus === 'completed');
    return (
      <Card variant="default" className={styles.card}>
        <CardBody className={styles.completedBody}>
          <p className={styles.completedText}>
            {allCompleted
              ? 'Has completado todos tus cursos disponibles. ¡Enhorabuena!'
              : 'No tienes lecciones disponibles para continuar. Revisa tus evaluaciones.'}
          </p>
          {firstCourseId && (
            <Button as={Link} href={allCompleted ? `/courses/${firstCourseId}` : '/assessments'} variant="secondary" size="sm">
              {allCompleted ? 'Ver resumen del curso' : 'Ver evaluaciones'}
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
    unitTitle,
    lessonId,
    unitId,
    lessonTitle,
    overallProgress,
    completedLessons,
    totalLessons,
  } = continueLearning;

  const visual   = getCourseVisual(courseTitle);
  const imageSrc = visual.coverImage || courseImage || null;
  const level = enrollments.find(
    (e) => e.courseId?.toString() === courseId?.toString(),
  )?.level;
  const lessonHref = `/courses/${courseId}/units/${unitId}/lessons/${lessonId}`;

  return (
    <Card variant="default" noPadding className={styles.card}>
      <div className={styles.header}>
        <PlayCircle size={16} className={styles.headerIcon} aria-hidden="true" />
        <h2 className={styles.headerTitle}>Continuar aprendiendo</h2>
        <Link href="/courses" className={styles.headerLink}>Ir a mis cursos →</Link>
      </div>

      <div className={styles.row}>
        {/* Portada compacta — miniatura, no una franja a sangre completa
            ocupando media tarjeta. */}
        <div className={styles.thumb}>
          {imageSrc ? (
            <img src={imageSrc} alt="" aria-hidden="true" className={styles.thumbImg} />
          ) : (
            <div className={styles.thumbPlaceholder} aria-hidden="true" />
          )}
          {level && <span className={styles.levelBadge}>{level}</span>}
        </div>

        <div className={styles.details}>
          <p className={styles.courseTitle}>{courseTitle}</p>
          <p className={styles.unitLabel}>{unitTitle}</p>
          <p className={styles.nextLesson}>{lessonTitle}</p>

          <div className={styles.progressSection}>
            <ProgressBar value={overallProgress} ariaLabel={`Progreso de ${courseTitle}`} variant="accent" />
            <div className={styles.progressMeta}>
              <span>{completedLessons} / {totalLessons} lecciones</span>
              <span>{overallProgress}%</span>
            </div>
          </div>

          <Button as={Link} href={lessonHref} variant="accent" size="sm" className={styles.cta}>
            Continuar aprendiendo
          </Button>
        </div>
      </div>
    </Card>
  );
}
