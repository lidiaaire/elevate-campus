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
      <Bone className={styles.lessonType} />
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
          <Bone className={styles.unitDescription} />
        </div>
        <Bone className={styles.unitPct} />
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
      {/* Page Header */}
      <div className={styles.header}>
        <div className={styles.headerText}>
          <Bone className={styles.headerTitle} />
          <Bone className={styles.headerDescription} />
        </div>
        <Bone className={styles.headerAction} />
      </div>

      {/* Metadata Card */}
      <div className={styles.metaCard}>
        <div className={styles.metaRow}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.metaItem}>
              <Bone className={styles.metaLabel} />
              <Bone className={styles.metaValue} />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Card */}
      <div className={styles.progressCard}>
        <div className={styles.progressTop}>
          <Bone className={styles.progressPct} />
          <Bone className={styles.progressMeta} />
        </div>
        <Bone className={styles.progressBar} />
        <div className={styles.ctaRow}>
          <Bone className={styles.ctaHint} />
          <Bone className={styles.ctaButton} />
        </div>
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
