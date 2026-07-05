'use client';

import { getCourseVisual } from '@/lib/config/courseVisuals';
import Card, { CardBody } from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import styles from './CourseProgressCard.module.css';

export default function CourseProgressCard({ courseTitle, overallProgress, completedLessons, totalLessons }) {
  const visual = getCourseVisual(courseTitle);

  return (
    <Card as="li" variant="default" noPadding>
      <CardBody>
        <p className={styles.title}>{courseTitle}</p>

        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progreso</span>
          <span className={styles.progressPct}>{overallProgress}%</span>
        </div>

        <div className={styles.bar}>
          <ProgressBar value={overallProgress} ariaLabel={`Progreso de ${courseTitle}`} />
        </div>

        <p className={styles.lessons}>
          {completedLessons} / {totalLessons} lecciones completadas
        </p>
      </CardBody>
    </Card>
  );
}
