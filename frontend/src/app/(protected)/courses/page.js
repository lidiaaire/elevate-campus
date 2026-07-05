'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { coursesService } from '@/lib/services/courses.service';
import PageHeader from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import Card, { CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import styles from './Courses.module.css';

const LEVEL_LABEL = {
  beginner:     'Principiante',
  intermediate: 'Intermedio',
  advanced:     'Avanzado',
};

const STATUS_CLASS = {
  draft:     styles.statusDraft,
  published: styles.statusPublished,
  archived:  styles.statusArchived,
};

const STATUS_LABEL = {
  draft:     'Borrador',
  published: 'Publicado',
  archived:  'Archivado',
};

export default function CoursesPage() {
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(
    () => coursesService.getCourses(token).then((res) => res.docs ?? res),
  );

  const courses = data ?? [];

  if (loading) return <LoadingState message="Cargando cursos…" />;
  if (error)   return <ErrorState message={error} />;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Cursos"
        description={`${courses.length} curso${courses.length !== 1 ? 's' : ''} disponible${courses.length !== 1 ? 's' : ''}`}
      />

      {courses.length === 0 ? (
        <EmptyState title="No hay cursos disponibles." />
      ) : (
        <div className={styles.grid}>
          {courses.map((course) => {
            const id     = course._id ?? course.id;
            const visual = getCourseVisual(course.title);
            return (
              <Link key={id} href={`/courses/${id}`} className={styles.cardLink}>
                <Card variant="default" clickable noPadding className={styles.card}>
                  <CardHeader
                    actions={
                      <span className={`${styles.status} ${STATUS_CLASS[course.status] ?? ''}`}>
                        {STATUS_LABEL[course.status] ?? course.status}
                      </span>
                    }
                  >
                    <h3 className={styles.cardTitle}>{course.title}</h3>
                    {course.level && (
                      <span className={styles.level}>
                        {LEVEL_LABEL[course.level] ?? course.level}
                      </span>
                    )}
                  </CardHeader>

                  {course.description && (
                    <CardBody>
                      <p className={styles.description}>{course.description}</p>
                    </CardBody>
                  )}

                  <CardFooter align="between" divided>
                    <span className={styles.meta}>
                      {course.units?.length
                        ? `${course.units.length} unidad${course.units.length !== 1 ? 'es' : ''}`
                        : 'Ver curso'}
                    </span>
                    <span className={styles.arrow}>→</span>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
