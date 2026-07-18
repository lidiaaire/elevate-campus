'use client';

import styles from './DashboardSkeleton.module.css';

function Bone({ className = '', style }) {
  return (
    <div
      className={`${styles.bone} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

function HeroSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.cardPad}>
        <Bone className={styles.heroText} />
        <Bone className={styles.heroStat} />
        <Bone className={styles.heroBar} />
      </div>
    </div>
  );
}

function ContinueLearningSkeletion() {
  return (
    <section>
      <Bone className={styles.sectionTitle} />
      <div className={styles.clWrapper}>
        <div className={styles.card}>
          <Bone className={styles.clImage} />
          <div className={styles.clBody}>
            <Bone className={styles.clTitle} />
            <Bone className={styles.clSubtitle} />
            <Bone className={styles.clBar} />
          </div>
          <div className={styles.clFooter}>
            <Bone className={styles.clButton} />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickActionsSkeleton() {
  return (
    <section>
      <Bone className={styles.sectionTitle} />
      <div className={styles.qaGrid}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.qaItem}>
            <Bone className={styles.qaIcon} />
            <Bone className={styles.qaLabel} />
          </div>
        ))}
      </div>
    </section>
  );
}

function TodayActivitySkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.cardPad}>
        <Bone className={styles.cardTitle} />
        <div className={styles.statGrid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.statItem}>
              <Bone className={styles.statValue} />
              <Bone className={styles.statLabel} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WeeklyGoalsSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.cardPad}>
        <Bone className={styles.cardTitle} />
        <ul className={styles.goalList} aria-hidden="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className={styles.goalItem}>
              <div className={styles.goalHeader}>
                <Bone className={styles.goalBadge} />
                <Bone className={styles.goalText} />
              </div>
              <div className={styles.goalProgress}>
                <Bone className={styles.goalBar} />
                <Bone className={styles.goalFrac} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SimpleCardSkeleton({ lines = 3 }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardPad}>
        <Bone className={styles.cardTitle} />
        {Array.from({ length: lines }).map((_, i) => (
          <Bone
            key={i}
            className={styles.line}
            style={{ width: i === lines - 1 ? '65%' : '100%' }}
          />
        ))}
      </div>
    </div>
  );
}

function BodyGridSkeleton() {
  return (
    <div className={styles.bodyGrid}>
      <SimpleCardSkeleton lines={5} />
      <SimpleCardSkeleton lines={4} />
    </div>
  );
}

function CourseGridSkeleton() {
  return (
    <section>
      <Bone className={styles.sectionTitle} />
      <ul className={styles.courseGrid}>
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className={styles.card}>
            <div className={styles.cardPad}>
              <Bone className={styles.cardTitle} />
              <Bone className={styles.line} style={{ width: '80%' }} />
              <Bone className={styles.heroBar} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function DashboardSkeleton() {
  return (
    <div
      className={styles.dashboard}
      aria-busy="true"
      aria-label="Cargando panel de inicio"
    >
      <HeroSkeleton />
      <ContinueLearningSkeletion />
      <QuickActionsSkeleton />
      <TodayActivitySkeleton />
      <WeeklyGoalsSkeleton />
      <SimpleCardSkeleton lines={3} />
      <SimpleCardSkeleton lines={3} />
      <BodyGridSkeleton />
      <CourseGridSkeleton />
    </div>
  );
}
