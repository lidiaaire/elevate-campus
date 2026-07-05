'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { unitsService } from '@/lib/services/units.service';
import { lessonsService } from '@/lib/services/lessons.service';
import PageHeader from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/CourseDetail.module.css';

export default function UnitDetailPage() {
  const { id, unitId } = useParams();
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(() =>
    Promise.all([
      unitsService.getUnitById(id, unitId, token),
      lessonsService.getLessonsByUnit(id, unitId, token),
    ]).then(([unitRes, lessonsRes]) => ({
      unit:    unitRes.unit,
      lessons: lessonsRes.docs ?? lessonsRes,
    })),
  );

  const unit    = data?.unit    ?? null;
  const lessons = data?.lessons ?? [];

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
            {lessons.map((lesson) => (
              <li key={lesson._id} className={styles.lessonItem}>
                <Link
                  href={`/courses/${id}/units/${unitId}/lessons/${lesson._id}`}
                  className={styles.lessonLink}
                >
                  <span className={styles.lessonOrder}>{lesson.order}</span>
                  <span className={styles.lessonTitle}>{lesson.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
