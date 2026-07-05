'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { coursesService } from '@/lib/services/courses.service';
import { unitsService } from '@/lib/services/units.service';
import PageHeader from '@/components/ui/PageHeader';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import styles from './CourseDetail.module.css';

const LEVEL_LABEL = {
  beginner:     'Principiante',
  intermediate: 'Intermedio',
  advanced:     'Avanzado',
};

const STATUS_LABEL = {
  draft:     'Borrador',
  published: 'Publicado',
  archived:  'Archivado',
};

const STATUS_CLASS = {
  draft:     styles.statusDraft,
  published: styles.statusPublished,
  archived:  styles.statusArchived,
};

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(() =>
    Promise.all([
      coursesService.getCourseById(id, token),
      unitsService.getUnitsByCourse(id, token),
    ]).then(([courseRes, unitsRes]) => ({
      course: courseRes.course ?? courseRes,
      units:  unitsRes.docs   ?? unitsRes,
    })),
  );

  const course = data?.course ?? null;
  const units  = data?.units  ?? [];

  if (loading) return <LoadingState message="Cargando curso…" />;
  if (error)   return <ErrorState message={error} />;
  if (!course) return <EmptyState title="Curso no encontrado." />;

  const visual = getCourseVisual(course.title);

  return (
    <div className={styles.page}>
      {/* ── Cabecera ── */}
      <PageHeader
        title={course.title}
        description={course.description}
        actions={
          <Button as={Link} href="/courses" variant="ghost" size="sm">
            ← Volver
          </Button>
        }
      />

      {/* ── Metadatos ── */}
      <Card variant="filled" size="sm">
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Nivel</span>
            <span className={styles.metaValue}>
              {LEVEL_LABEL[course.level] ?? course.level ?? '—'}
            </span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Estado</span>
            <span className={`${styles.status} ${STATUS_CLASS[course.status] ?? ''}`}>
              {STATUS_LABEL[course.status] ?? course.status ?? '—'}
            </span>
          </div>

          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Creado</span>
            <span className={styles.metaValue}>{formatDate(course.createdAt)}</span>
          </div>
        </div>
      </Card>

      {/* ── Unidades ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Unidades
          {units.length > 0 && (
            <span className={styles.unitCount}>{units.length}</span>
          )}
        </h2>

        {units.length === 0 ? (
          <EmptyState title="Sin unidades todavía." />
        ) : (
          <div className={styles.unitList}>
            {units.map((unit) => (
              <Card
                key={unit._id}
                as={Link}
                href={`/courses/${id}/units/${unit._id}`}
                variant="default"
                clickable
                noPadding
                className={styles.unitCard}
              >
                <div className={styles.unitContent}>
                  <span className={styles.unitOrder}>{unit.order}</span>

                  <div className={styles.unitInfo}>
                    <span className={styles.unitTitle}>{unit.title}</span>
                    {unit.description && (
                      <span className={styles.unitDescription}>{unit.description}</span>
                    )}
                  </div>

                  <span className={styles.unitArrow} aria-hidden="true">→</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
