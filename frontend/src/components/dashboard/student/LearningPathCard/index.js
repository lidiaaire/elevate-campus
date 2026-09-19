'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import styles from './LearningPathCard.module.css';

export default function LearningPathCard({ enrollment }) {
  const {
    courseId,
    courseTitle,
    courseImage,
    level,
    overallProgress,
    nextLesson,
    enrollmentStatus,
  } = enrollment;

  const visual   = getCourseVisual(courseTitle);
  const imageSrc = visual.coverImage || courseImage || null;

  const isCompleted        = enrollmentStatus === 'completed' || overallProgress === 100;
  const isPendingAssessment = !nextLesson && !isCompleted;

  const continueHref = nextLesson
    ? `/courses/${courseId}/units/${nextLesson.unitId}/lessons/${nextLesson.lessonId}`
    : `/courses/${courseId}`;

  return (
    <Card as="li" variant="default" noPadding clickable className={styles.card}>
      <Link href={continueHref} className={styles.link}>
        <div className={styles.thumb}>
          {imageSrc ? (
            <img src={imageSrc} alt="" aria-hidden="true" className={styles.thumbImg} />
          ) : (
            <div className={styles.thumbPlaceholder} aria-hidden="true" />
          )}
          <span className={styles.levelBadge}>{level}</span>
        </div>

        <div className={styles.body}>
          <p className={styles.courseTitle}>{courseTitle}</p>
          <p className={styles.status}>
            {isCompleted
              ? 'Curso completado ✓'
              : isPendingAssessment
                ? 'Evaluación pendiente'
                : (nextLesson?.lessonTitle ?? 'Continuar curso')}
          </p>

          <div className={styles.footer}>
            <div className={styles.progressWrap}>
              <ProgressBar value={overallProgress} ariaLabel={`Progreso de ${courseTitle}`} />
            </div>
            <span className={styles.pct}>{overallProgress}%</span>
            <span className={styles.arrow} aria-hidden="true">
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
