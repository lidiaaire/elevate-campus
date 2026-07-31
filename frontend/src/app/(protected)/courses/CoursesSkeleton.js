'use client';

import styles from './CoursesSkeleton.module.css';

function Bone({ className = '', style }) {
  return (
    <div
      className={`${styles.bone} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

function CardSkeleton() {
  return (
    <div className={styles.card}>
      <Bone className={styles.accentBar} />
      <div className={styles.cardPad}>
        <Bone className={styles.cardTitle} />
        <Bone className={styles.cardLevel} />
        <Bone className={styles.progressBar} />
        <div className={styles.cardFooter}>
          <Bone className={styles.footerText} />
        </div>
      </div>
    </div>
  );
}

export default function CoursesSkeleton() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Cargando cursos">
      {/* Cabecera */}
      <header className={styles.header}>
        <Bone className={styles.headerTitle} />
        <Bone className={styles.headerDescription} />
      </header>

      {/* Buscador + tabs */}
      <div className={styles.controls}>
        <Bone className={styles.search} />
        <div className={styles.tabs}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Bone key={i} className={styles.tab} />
          ))}
        </div>
      </div>

      {/* Grid de tarjetas */}
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
