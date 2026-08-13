'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { coursesService }     from '@/lib/services/courses.service';
import { enrollmentsService } from '@/lib/services/enrollments.service';
import { progressService }    from '@/lib/services/progress.service';
import ErrorState  from '@/components/ui/ErrorState';
import EmptyState  from '@/components/ui/EmptyState';
import ProgressBar from '@/components/ui/ProgressBar';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import CoursesSkeleton from './CoursesSkeleton';
import styles from './Courses.module.css';

const CEFR_LABEL = { A1: 'A1', A2: 'A2', B1: 'B1', B2: 'B2', C1: 'C1', C2: 'C2' };

function CourseCover({ visual, className }) {
  return (
    <div className={className} style={{ '--course-accent': visual.accentColor }}>
      {visual.coverImage ? (
        // Assets locales existentes (courseVisuals.js) — misma convención que
        // Sidebar/Avatar para SVG: <img> plana, sin next/image.
        <img src={visual.coverImage} alt="" className={styles.coverImg} />
      ) : (
        <div className={styles.coverFallback} aria-hidden="true" />
      )}
    </div>
  );
}

function SpotlightCard({ enrollment }) {
  const { course, prog } = enrollment;
  const id     = String(course._id ?? course.id);
  const visual = getCourseVisual(course.title);
  const progress = prog?.overallProgress ?? 0;

  return (
    <Link href={`/courses/${id}`} className={styles.spotlightCard}>
      <CourseCover visual={visual} className={styles.spotlightCover} />
      <div className={styles.spotlightBody}>
        <span className={styles.spotlightEyebrow}>Continuar aprendiendo</span>
        <div className={styles.spotlightHeadRow}>
          {course.level && <span className={styles.levelPill}>{CEFR_LABEL[course.level] ?? course.level}</span>}
          <h2 className={styles.spotlightTitle}>{course.title}</h2>
        </div>
        {visual.tagline && <p className={styles.spotlightTagline}>{visual.tagline}</p>}

        <div className={styles.spotlightProgress}>
          <div className={styles.spotlightProgressTop}>
            <span>{prog?.completedLessons ?? 0} / {prog?.totalLessons ?? '—'} lecciones</span>
            <span className={styles.spotlightPct}>{progress}%</span>
          </div>
          <ProgressBar value={progress} ariaLabel={`Progreso de ${course.title}`} variant="accent" />
        </div>

        <span className={styles.spotlightCta}>
          Continuar <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

function PathCard({ enrollment }) {
  const { course, prog, status } = enrollment;
  const id       = String(course._id ?? course.id);
  const visual   = getCourseVisual(course.title);
  const progress = prog?.overallProgress ?? 0;
  const done     = status === 'completed';

  return (
    <Link
      href={`/courses/${id}`}
      className={styles.pathCard}
      data-state={done ? 'completed' : 'active'}
    >
      <CourseCover visual={visual} className={styles.pathCover} />
      {done && (
        <span className={styles.completedSeal}>
          <span aria-hidden="true">✓</span> Completado
        </span>
      )}
      <div className={styles.pathBody}>
        <div className={styles.pathTopRow}>
          {course.level && <span className={styles.levelPillSm}>{CEFR_LABEL[course.level] ?? course.level}</span>}
          {!done && <span className={styles.pathPct}>{progress}%</span>}
        </div>
        <h3 className={styles.pathTitle}>{course.title}</h3>
        {!done && <ProgressBar value={progress} ariaLabel={`Progreso de ${course.title}`} variant="accent" />}
        <span className={styles.pathMeta}>
          {prog?.completedLessons ?? 0} / {prog?.totalLessons ?? '—'} lecciones
        </span>
      </div>
    </Link>
  );
}

// No es un Link: el alumno no está matriculado y el modelo de matrícula
// actual no permite autoservicio (POST /enrollments es solo admin), así
// que esta card no puede llevar a ninguna acción que implique acceder al
// contenido del curso — solo comunica que existe en el catálogo.
function ExploreCard({ course }) {
  const visual = getCourseVisual(course.title);

  return (
    <div className={styles.exploreCard}>
      <CourseCover visual={visual} className={styles.exploreCover} />
      <div className={styles.exploreBody}>
        {course.level && <span className={styles.levelPillSm}>{CEFR_LABEL[course.level] ?? course.level}</span>}
        <h3 className={styles.exploreTitle}>{course.title}</h3>
        {course.description && <p className={styles.exploreDescription}>{course.description}</p>}
        <span className={styles.exploreStatus}>No matriculado</span>
      </div>
    </div>
  );
}

export default function StudentCourses() {
  const { token } = useAuth();
  const [courses,     setCourses]     = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [progress,    setProgress]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
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
    // enrollments[].courseId y progress[].courseId vienen poblados por el
    // backend ({ _id, title, ... }), no como string plano — ambos deben
    // desenvolverse igual o la clave del Map degenera a "[object Object]"
    // y ninguna búsqueda encuentra su progreso real (causa del bug 0%).
    const courseIdOf = (e) => String(e.courseId?._id ?? e.courseId);

    const progMap    = new Map(progress.map((p) => [courseIdOf(p), p]));
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

  // Spotlight: el curso activo con menos progreso (el que más necesita
  // continuidad); el resto del camino no lo repite, igual que en el
  // Student Dashboard.
  const spotlight = [...inProgress].sort((a, b) => (a.prog?.overallProgress ?? 0) - (b.prog?.overallProgress ?? 0))[0] ?? null;
  const pathEnrollments = [...inProgress, ...completed].filter((e) => e._id !== spotlight?._id);

  const filteredSpotlight = spotlight && match(spotlight.course.title) ? spotlight : null;
  const filteredPath      = pathEnrollments.filter((e) => match(e.course.title));
  const filteredAvailable = available.filter((c) => match(c.title));

  if (loading) return <CoursesSkeleton />;
  if (error)   return <ErrorState message={error} />;

  const totalEnrolled = inProgress.length + completed.length;
  const noResultsAtAll = totalEnrolled === 0 && available.length === 0;

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderText}>
          <span className={styles.pageEyebrow}>Aprender · Aplicar · Superarte</span>
          <h1 className={styles.pageTitle}>Tus cursos</h1>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.headerStat}>
            <span className={styles.headerStatValue}>{totalEnrolled}</span>
            <span className={styles.headerStatLabel}>Matriculados</span>
          </div>
          <span className={styles.headerDivider} aria-hidden="true" />
          <div className={styles.headerStat}>
            <span className={styles.headerStatValue}>{completed.length}</span>
            <span className={styles.headerStatLabel}>Completados</span>
          </div>
          <span className={styles.headerDivider} aria-hidden="true" />
          <div className={styles.headerStat}>
            <span className={styles.headerStatValue}>{available.length}</span>
            <span className={styles.headerStatLabel}>Disponibles</span>
          </div>
        </div>
      </header>

      <input
        type="search"
        placeholder="Buscar curso..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
        aria-label="Buscar curso"
      />

      {noResultsAtAll ? (
        <EmptyState title="Todavía no hay cursos disponibles." />
      ) : (
        <>
          {filteredSpotlight && (
            <section>
              <SpotlightCard enrollment={filteredSpotlight} />
            </section>
          )}

          {filteredPath.length > 0 && (
            <section>
              <h2 className={styles.sectionTitle}>Tu camino</h2>
              <div className={styles.pathGrid}>
                {filteredPath.map((e) => <PathCard key={String(e._id)} enrollment={e} />)}
              </div>
            </section>
          )}

          {filteredAvailable.length > 0 && (
            <section>
              <h2 className={styles.sectionTitle}>Explorar</h2>
              <div className={styles.exploreGrid}>
                {filteredAvailable.map((c) => <ExploreCard key={String(c._id ?? c.id)} course={c} />)}
              </div>
            </section>
          )}

          {!filteredSpotlight && filteredPath.length === 0 && filteredAvailable.length === 0 && (
            <EmptyState title="Sin resultados para esa búsqueda." />
          )}
        </>
      )}
    </div>
  );
}
