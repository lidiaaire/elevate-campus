'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { unitsService } from '@/lib/services/units.service';
import { lessonsService } from '@/lib/services/lessons.service';
import { progressService } from '@/lib/services/progress.service';
import PageHeader from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/CourseDetail.module.css';

function StatusIcon({ completed, locked }) {
  const label = completed ? 'Completada' : locked ? 'Bloqueada' : 'Disponible';
  const icon  = completed ? '✓' : locked ? '🔒' : '→';
  const cls   = completed ? styles.iconDone : locked ? styles.iconLocked : styles.iconOpen;

  return (
    <span className={`${styles.statusIcon} ${cls}`}>
      <span aria-hidden="true">{icon}</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default function UnitDetailPage() {
  const { id, unitId } = useParams();
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(() =>
    Promise.all([
      unitsService.getUnitById(id, unitId, token),
      lessonsService.getLessonsByUnit(id, unitId, token),
      progressService.getCourseProgress(id, token).catch(() => null),
    ]).then(([unitRes, lessonsRes, progressRes]) => ({
      unit:    unitRes.unit,
      lessons: lessonsRes.docs ?? lessonsRes,
      progress: progressRes?.progress ?? null,
    })),
  );

  const unit    = data?.unit    ?? null;
  const lessons = data?.lessons ?? [];

  // Estado (completada/bloqueada) por lección, si hay progreso disponible para este curso
  const unitProgress = data?.progress?.units?.find(
    (u) => String(u.unit._id ?? u.unit.id) === String(unitId),
  );
  const lessonStateById = new Map(
    (unitProgress?.lessons ?? []).map((l) => [
      String(l.lesson._id ?? l.lesson.id),
      { completed: l.completed, locked: l.locked },
    ]),
  );

  if (loading) return <LoadingState message="Cargando unidad…" />;
  if (error)   return <ErrorState message={error} />;
  if (!unit)   return <EmptyState title="Unidad no encontrada." />;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <PageHeader title={unit.title} description={unit.description} />

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Unidad</span>
            <span className={styles.metaValue}>{unit.order}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Desbloqueo</span>
            <span className={styles.metaValue}>
              {unit.sequentialUnlock ? 'Secuencial' : 'Libre'}
            </span>
          </div>
        </div>
      </div>

      <section>
        <h2 className={styles.sectionTitle}>Lecciones</h2>

        {lessons.length === 0 ? (
          <EmptyState title="Sin lecciones todavía." />
        ) : (
          <ul className={styles.lessonList}>
            {lessons.map((lesson) => {
              const state     = lessonStateById.get(String(lesson._id));
              const completed = state?.completed ?? false;
              const locked    = state?.locked ?? false;
              const itemCls   = `${styles.lessonItem} ${
                completed ? styles.lessonItemDone : locked ? styles.lessonItemLocked : ''
              }`;
              const inner = (
                <>
                  {state && <StatusIcon completed={completed} locked={locked} />}
                  <span className={styles.lessonOrder}>{lesson.order}</span>
                  <span className={styles.lessonTitle}>{lesson.title}</span>
                </>
              );

              return (
                <li key={lesson._id} className={itemCls}>
                  {locked ? (
                    <div className={styles.lessonStatic}>{inner}</div>
                  ) : (
                    <Link
                      href={`/courses/${id}/units/${unitId}/lessons/${lesson._id}`}
                      className={styles.lessonLink}
                    >
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
