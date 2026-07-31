'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { coursesService } from '@/lib/services/courses.service';
import PageHeader   from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState   from '@/components/ui/ErrorState';
import EmptyState   from '@/components/ui/EmptyState';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import styles from './CourseCatalog.module.css';

const CEFR_LABEL = { A1: 'A1', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1', C2: 'C2' };

const STATUS_LABEL = {
  published: 'Publicado',
  draft:     'Borrador',
  archived:  'Archivado',
};

const STATUS_CLASS = {
  published: 'statusPublished',
  draft:     'statusDraft',
  archived:  'statusArchived',
};

function CourseCard({ course }) {
  const visual = getCourseVisual(course.title);

  return (
    <Card variant="default" noPadding className={styles.card}>
      <div className={styles.accentBar} style={{ background: visual.accentColor }} />
      <CardHeader
        actions={
          <span className={`${styles.status} ${styles[STATUS_CLASS[course.status]] ?? ''}`}>
            {STATUS_LABEL[course.status] ?? course.status}
          </span>
        }
      >
        <h3 className={styles.cardTitle}>{course.title}</h3>
        {course.level && <span className={styles.level}>{CEFR_LABEL[course.level] ?? course.level}</span>}
      </CardHeader>
      {course.description && (
        <CardBody>
          <p className={styles.description}>{course.description}</p>
        </CardBody>
      )}
    </Card>
  );
}

/**
 * Catálogo de cursos de solo lectura para teacher/admin.
 * Sin flujo de matrícula ni navegación a /courses/[id] (fuera de su
 * alcance de rol en esta fase — ver routePermissions.js).
 */
export default function CourseCatalog() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    coursesService.getCourses(token)
      .then((r) => setCourses(r.docs ?? r ?? []))
      .catch((err) => setError(err.message ?? 'Error al cargar los cursos'))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <LoadingState message="Cargando cursos..." />;
  if (error)   return <ErrorState message={error} />;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Cursos"
        description={`${courses.length} curso${courses.length !== 1 ? 's' : ''}`}
      />

      {courses.length === 0 ? (
        <EmptyState title="No hay cursos disponibles." />
      ) : (
        <div className={styles.grid}>
          {courses.map((c) => (
            <CourseCard key={String(c._id ?? c.id)} course={c} />
          ))}
        </div>
      )}
    </div>
  );
}
