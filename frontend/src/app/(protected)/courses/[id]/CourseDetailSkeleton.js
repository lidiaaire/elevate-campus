'use client';

import styles from './CourseDetailSkeleton.module.css';

function Bone({ className = '', style }) {
  return (
    <div
      className={`${styles.bone} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

function LessonRowSkeleton() {
  return (
    <div className={styles.lessonRow}>
      <Bone className={styles.lessonIcon} />
      <Bone className={styles.lessonTitle} />
      <Bone className={styles.lessonMeta} />
    </div>
  );
}

function UnitCardSkeleton({ lessons = 3 }) {
  return (
    <div className={styles.unitCard}>
      <div className={styles.unitHeader}>
        <Bone className={styles.unitOrder} />
        <div className={styles.unitInfo}>
          <Bone className={styles.unitTitle} />
          <Bone className={styles.unitProgressLine} />
        </div>
      </div>
      <div className={styles.lessonList}>
        {Array.from({ length: lessons }).map((_, i) => (
          <LessonRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function CourseDetailSkeleton() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Cargando curso">
      <Bone className={styles.breadcrumb} />

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <Bone className={styles.levelBadge} />
          <Bone className={styles.heroTitle} />
          <Bone className={styles.heroDescription} />
          <Bone className={styles.heroProgress} />
        </div>
        <Bone className={styles.heroImage} />
      </div>

      {/* Continuar aprendiendo */}
      <div className={styles.continueCard}>
        <Bone className={styles.continueHeader} />
        <Bone className={styles.continueTitle} />
        <Bone className={styles.continueUnit} />
      </div>

      {/* Unidades */}
      <div className={styles.section}>
        <Bone className={styles.sectionTitle} />
        <div className={styles.unitList}>
          {Array.from({ length: 3 }).map((_, i) => (
            <UnitCardSkeleton key={i} lessons={i === 1 ? 4 : 3} />
          ))}
        </div>
      </div>
    </div>
  );
}
