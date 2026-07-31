'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { coursesService }     from '@/lib/services/courses.service';
import { enrollmentsService } from '@/lib/services/enrollments.service';
import { progressService }    from '@/lib/services/progress.service';
import PageHeader  from '@/components/ui/PageHeader';
import ErrorState  from '@/components/ui/ErrorState';
import EmptyState  from '@/components/ui/EmptyState';
import Card, { CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import CoursesSkeleton from './CoursesSkeleton';
import styles from './Courses.module.css';

const CEFR_LABEL = { A1: 'A1', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1', C2: 'C2' };

const TABS = [
  { id: 'todos',       label: 'Todos' },
  { id: 'en-progreso', label: 'En progreso' },
  { id: 'completados', label: 'Completados' },
  { id: 'disponibles', label: 'Disponibles' },
];

function EnrolledCard({ enrollment }) {
  const { course, prog, status } = enrollment;
  const id       = String(course._id ?? course.id);
  const visual   = getCourseVisual(course.title);
  const progress = prog?.overallProgress ?? 0;
  const done     = status === 'completed';

  return (
    <Link href={`/courses/${id}`} className={styles.cardLink}>
      <Card variant="default" noPadding className={styles.card}>
        <div className={styles.accentBar} style={{ background: visual.accentColor }} />
        <CardHeader
          actions={
            <span className={`${styles.status} ${done ? styles.statusPublished : styles.statusDraft}`}>
              {done ? 'Completado' : 'En progreso'}
            </span>
          }
        >
          <h3 className={styles.cardTitle}>{course.title}</h3>
          {course.level && <span className={styles.level}>{CEFR_LABEL[course.level] ?? course.level}</span>}
        </CardHeader>
        <CardBody>
          <div className={styles.progressRow}>
            <span className={styles.progressPct}>{progress}%</span>
            <span className={styles.progressMeta}>
              {prog?.completedLessons ?? 0} / {prog?.totalLessons ?? '—'} lecciones
            </span>
          </div>
          <ProgressBar value={progress} ariaLabel={`Progreso de ${course.title}`} />
        </CardBody>
        <CardFooter align="between" divided>
          <span className={styles.meta}>Ver curso</span>
          <span className={styles.arrow}>→</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

function AvailableCard({ course }) {
  const id     = String(course._id ?? course.id);
  const visual = getCourseVisual(course.title);

  return (
    <Link href={`/courses/${id}`} className={styles.cardLink}>
      <Card variant="default" noPadding className={styles.card}>
        <div className={styles.accentBar} style={{ background: visual.accentColor }} />
        <CardHeader>
          <h3 className={styles.cardTitle}>{course.title}</h3>
          {course.level && <span className={styles.level}>{CEFR_LABEL[course.level] ?? course.level}</span>}
        </CardHeader>
        {course.description && (
          <CardBody>
            <p className={styles.description}>{course.description}</p>
          </CardBody>
        )}
        <CardFooter align="between" divided>
          <span className={styles.meta}>Empezar</span>
          <span className={styles.arrow}>→</span>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function StudentCourses() {
  const { token } = useAuth();
  const [courses,     setCourses]     = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [progress,    setProgress]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [tab,         setTab]         = useState('todos');
  const [search,      setSearch]      = useState('');

  useEffect(() => {
    Promise.all([
      coursesService.getCourses(token).then((r) => r.docs ?? r),
      enrollmentsService.getEnrollments(token).then((r) => r.docs ?? r),
      progressService.getOverview(token).then((r) => r?.overview ?? []),
    ])
      .then(([c, e, p]) => {
        setCourses(c ?? []);
        setEnrollments(e ?? []);
        setProgress(p);
      })
      .catch((err) => setError(err.message ?? 'Error al cargar los cursos'))
      .finally(() => setLoading(false));
  }, [token]);

  const { inProgress, completed, available } = useMemo(() => {
    // enrollments[].courseId viene poblado por el backend ({ _id, title, ... }), no como string plano
    const courseIdOf = (e) => String(e.courseId?._id ?? e.courseId);

    const progMap    = new Map(progress.map((p) => [String(p.courseId), p]));
    const enrolledIds = new Set(enrollments.map(courseIdOf));

    const enriched = enrollments
      .map((e) => ({
        ...e,
        course: courses.find((c) => String(c._id ?? c.id) === courseIdOf(e)),
        prog:   progMap.get(courseIdOf(e)),
      }))
      .filter((e) => e.course);

    return {
      inProgress: enriched.filter((e) => e.status === 'active'),
      completed:  enriched.filter((e) => e.status === 'completed'),
      available:  courses.filter(
        (c) => c.status === 'published' && !enrolledIds.has(String(c._id ?? c.id)),
      ),
    };
  }, [courses, enrollments, progress]);

  const q = search.trim().toLowerCase();
  const match = (title) => !q || title.toLowerCase().includes(q);

  const filtIn  = inProgress.filter((e) => match(e.course.title));
  const filtCmp = completed.filter((e) => match(e.course.title));
  const filtAv  = available.filter((c) => match(c.title));

  if (loading) return <CoursesSkeleton />;
  if (error)   return <ErrorState message={error} />;

  const totalEnrolled = inProgress.length + completed.length;
  const counts = {
    'todos':       totalEnrolled + available.length,
    'en-progreso': inProgress.length,
    'completados': completed.length,
    'disponibles': available.length,
  };

  const noResults = <EmptyState title={q ? 'Sin resultados para esa búsqueda.' : 'No hay cursos en esta categoría.'} />;

  return (
    <div className={styles.page}>
      <PageHeader
        title="Mis cursos"
        description={`${totalEnrolled} matriculado${totalEnrolled !== 1 ? 's' : ''} · ${available.length} disponible${available.length !== 1 ? 's' : ''}`}
      />

      <div className={styles.controls}>
        <input
          type="search"
          placeholder="Buscar curso..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
          aria-label="Buscar curso"
        />
        <div className={styles.tabs} role="tablist">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`${styles.tab} ${tab === id ? styles.tabActive : ''}`}
            >
              {label}
              <span className={styles.tabCount}>{counts[id]}</span>
            </button>
          ))}
        </div>
      </div>

      {tab === 'en-progreso' && (
        filtIn.length === 0 ? noResults : (
          <div className={styles.grid}>
            {filtIn.map((e) => <EnrolledCard key={String(e._id)} enrollment={e} />)}
          </div>
        )
      )}

      {tab === 'completados' && (
        filtCmp.length === 0 ? noResults : (
          <div className={styles.grid}>
            {filtCmp.map((e) => <EnrolledCard key={String(e._id)} enrollment={e} />)}
          </div>
        )
      )}

      {tab === 'disponibles' && (
        filtAv.length === 0 ? noResults : (
          <div className={styles.grid}>
            {filtAv.map((c) => <AvailableCard key={String(c._id ?? c.id)} course={c} />)}
          </div>
        )
      )}

      {tab === 'todos' && (() => {
        const hasEnrolled   = filtIn.length > 0 || filtCmp.length > 0;
        const hasAvailable  = filtAv.length > 0;
        if (!hasEnrolled && !hasAvailable) return noResults;
        return (
          <>
            {hasEnrolled && (
              <section>
                <h2 className={styles.sectionTitle}>Matriculados</h2>
                <div className={styles.grid}>
                  {[...filtIn, ...filtCmp].map((e) => (
                    <EnrolledCard key={String(e._id)} enrollment={e} />
                  ))}
                </div>
              </section>
            )}
            {hasAvailable && (
              <section>
                <h2 className={styles.sectionTitle}>Disponibles</h2>
                <div className={styles.grid}>
                  {filtAv.map((c) => (
                    <AvailableCard key={String(c._id ?? c.id)} course={c} />
                  ))}
                </div>
              </section>
            )}
          </>
        );
      })()}
    </div>
  );
}
