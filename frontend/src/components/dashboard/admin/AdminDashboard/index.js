'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { dashboardService } from '@/lib/services/dashboard.service';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import Avatar from '@/components/ui/Avatar';
import Card, { CardBody, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from './AdminDashboard.module.css';

// Resumen ejecutivo de la serie diaria: evita listar 30 filas, responde
// "¿cómo va la última semana frente a la anterior?" con los mismos datos.
function summarizeActivity(series) {
  const last7 = series.slice(-7);
  const prev7 = series.slice(-14, -7);

  const sum = (rows) => rows.reduce((s, r) => s + r.lessonsCompleted, 0);
  const last7Total = sum(last7);
  const prev7Total = sum(prev7);
  const dailyAvg = last7.length === 0 ? 0 : Math.round(last7Total / last7.length);

  const delta = last7Total - prev7Total;
  const direction = delta > 0 ? 'up' : delta < 0 ? 'down' : 'neutral';

  const peakDay = series.reduce(
    (best, row) => (row.lessonsCompleted > (best?.lessonsCompleted ?? -1) ? row : best),
    null,
  );
  const inactiveDays = series.filter((row) => row.lessonsCompleted === 0).length;

  return { dailyAvg, delta, direction, peakDay, inactiveDays, totalDays: series.length };
}

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    Promise.all([
      dashboardService.getAdminDashboard(token),
      dashboardService.getAdminActivity(30, token),
      dashboardService.getAdminAtRisk(token),
    ])
      .then(([dashboard, activity, atRisk]) => setData({ dashboard, activity, atRisk }))
      .catch((err) => setError(err.message ?? 'Error desconocido'))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <LoadingState message="Cargando dashboard..." />;
  if (error)   return <ErrorState message={error} />;

  const { platform, platformGrowth, coursesSummary } = data.dashboard;
  const { series } = data.activity;
  const { threshold, count, students: atRiskStudents } = data.atRisk;
  const activity = summarizeActivity(series);

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  const rankedCourses = [...coursesSummary].sort((a, b) => b.avgProgress - a.avgProgress);

  return (
    <div className={styles.dashboard}>

      {/* Cabecera operativa — densa, sin fotografía: estado de la
          plataforma de un vistazo, no un saludo emocional. */}
      <section className={styles.header}>
        <span className={styles.headerGlyph} aria-hidden="true" />

        <div className={styles.headerIdentity}>
          <span className={styles.headerEyebrow}>Admin Elevate</span>
          <h1 className={styles.headerName}>{user.firstName} {user.lastName}</h1>
          <p className={styles.headerContext}>Panel de administración · {today}</p>
        </div>

        <div className={styles.headerIndicators}>
          <span className={`${styles.statusChip} ${count === 0 ? styles.statusChipOk : styles.statusChipWarn}`}>
            <span className={styles.statusDot} aria-hidden="true" />
            {count === 0 ? 'Plataforma sin alertas' : `${count} alumno${count !== 1 ? 's' : ''} en riesgo`}
          </span>
          <span className={styles.headerIndicator}>
            <span className={styles.headerIndicatorValue}>{platform.users.activeTotal}</span>
            <span className={styles.headerIndicatorLabel}>usuarios activos</span>
          </span>
          <span className={styles.headerIndicator}>
            <span className={styles.headerIndicatorValue}>{activity.dailyAvg}</span>
            <span className={styles.headerIndicatorLabel}>lecciones/día</span>
          </span>
        </div>
      </section>

      {/* Alerta de riesgo + Resumen de plataforma — mismo beat visual */}
      <div className={styles.twoCol}>

        <Card variant="default" noPadding>
          <CardBody className={styles.riskBody}>
            <div className={styles.riskHeader}>
              <h2 className={styles.cardSectionTitle}>Alumnos en riesgo</h2>
              <span className={styles.cardSectionMeta}>
                Sin actividad {threshold.days}+ días o progreso &lt;{threshold.progressBelow}%
              </span>
            </div>

            {count === 0 ? (
              <EmptyState title="No hay alumnos en riesgo actualmente." />
            ) : (
              <ul className={styles.riskList}>
                {atRiskStudents.map((s) => {
                  const courseLabel = s.enrollments.length > 0
                    ? s.enrollments.map((e) => `${e.courseTitle} (${e.overallProgress}%)`).join(' · ')
                    : 'Sin curso activo';

                  return (
                    <li key={s.studentId} className={styles.riskRow}>
                      <Avatar firstName={s.firstName} lastName={s.lastName} role="student" size="md" />

                      <div className={styles.riskInfo}>
                        <div className={styles.riskTopRow}>
                          <span className={styles.riskName}>{s.firstName} {s.lastName}</span>
                          <span className={styles.badgeDanger}>En riesgo</span>
                        </div>
                        <div className={styles.riskMeta}>
                          <span className={styles.riskCourse}>{courseLabel}</span>
                          <span className={styles.metaDaysWarn}>
                            {s.daysSinceLastActivity !== null
                              ? `${s.daysSinceLastActivity}d sin actividad`
                              : 'Sin actividad registrada'}
                          </span>
                          <span>
                            {s.assignedTeacher
                              ? `Profesor: ${s.assignedTeacher.firstName} ${s.assignedTeacher.lastName}`
                              : 'Sin profesor asignado'}
                          </span>
                        </div>
                      </div>

                      <Button as={Link} href={`/users/${s.studentId}`} variant="accent" size="sm">
                        Ver perfil
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardBody>
        </Card>

        <Card variant="default" noPadding>
          <CardBody className={styles.summaryBody}>
            <h2 className={styles.cardSectionTitle}>Panorama general</h2>

            <div className={styles.summaryPrimary}>
              <div className={styles.summaryStat}>
                <span className={styles.summaryValue}>{platform.users.total}</span>
                <span className={styles.summaryLabel}>Usuarios</span>
              </div>
              <span className={styles.summaryDivider} aria-hidden="true" />
              <div className={styles.summaryStat}>
                <span className={styles.summaryValue}>{platform.enrollments.active}</span>
                <span className={styles.summaryLabel}>Matrículas activas</span>
              </div>
            </div>

            <div className={styles.summarySecondary}>
              <span className={styles.summaryChip}>
                {platform.enrollments.total} matrículas totales
              </span>
              <span className={styles.summaryChip}>
                {platform.courses.published} cursos publicados
              </span>
              {platform.courses.draft > 0 && (
                <span className={styles.summaryChip}>
                  {platform.courses.draft} en borrador
                </span>
              )}
              <span className={styles.summaryChipStrong}>
                {platform.assessments.passRate !== null ? `${platform.assessments.passRate}%` : '—'} pass rate
              </span>
            </div>
          </CardBody>
        </Card>

      </div>

      {/* Distribución por curso — ranking visual, no barras idénticas */}
      <section>
        <h2 className={styles.sectionTitle}>Distribución por curso</h2>
        <Card variant="default" noPadding>
          <CardBody className={styles.courseDistBody}>
            {rankedCourses.length === 0 ? (
              <EmptyState title="No hay cursos registrados." />
            ) : (
              <ul className={styles.courseDistList}>
                {rankedCourses.map((c, i) => {
                  const { accentColor } = getCourseVisual(c.title);
                  return (
                    <li
                      key={String(c.courseId)}
                      className={styles.courseDistRow}
                      style={{ '--course-accent': accentColor }}
                    >
                      <span className={styles.courseDistRank}>{i + 1}</span>

                      <div className={styles.courseDistMain}>
                        <div className={styles.courseDistTop}>
                          <span className={styles.courseDistTitle}>{c.title}</span>
                          <span className={styles.courseDistPct}>{c.avgProgress}%</span>
                        </div>
                        <ProgressBar value={c.avgProgress} ariaLabel={`Progreso medio de ${c.title}`} />
                        <span className={styles.courseDistMeta}>
                          {c.activeEnrollments} activas · {c.completedEnrollments} completadas de {c.totalEnrollments}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardBody>
          <CardFooter align="end" divided>
            <Button as={Link} href="/progress" variant="secondary">
              Ver progreso completo
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Evolución — 2 piezas compactas, no 7 cards iguales */}
      <div className={styles.twoCol}>

        <Card variant="default" noPadding>
          <CardBody className={styles.evoBody}>
            <h3 className={styles.subSectionTitle}>Crecimiento</h3>
            <div className={styles.evoPrimary}>
              <span className={styles.evoValue}>{platformGrowth.newEnrollments7d}</span>
              <span className={styles.evoLabel}>nuevas matrículas · 7 días</span>
              <span className={styles.evoSub}>{platformGrowth.newEnrollments30d} en 30 días</span>
            </div>
            <div className={styles.evoChips}>
              <span className={styles.evoChip}>
                <strong>{platformGrowth.lessonsCompleted7d}</strong> lecciones · 7d
              </span>
              <span className={styles.evoChip}>
                <strong>{platformGrowth.activeUsers7d}</strong> usuarios activos · 7d
              </span>
              <span className={styles.evoChip}>
                <strong>{platformGrowth.assessmentsPassed30d}</strong> assessments aprobados · 30d
              </span>
            </div>
          </CardBody>
        </Card>

        <Card variant="default" noPadding>
          <CardBody className={styles.evoBody}>
            <h3 className={styles.subSectionTitle}>Actividad</h3>
            <div className={styles.evoPrimary}>
              <span className={styles.evoValue}>{activity.dailyAvg}</span>
              <span className={styles.evoLabel}>lecciones/día de media · 7 días</span>
              <span className={`${styles.evoTrend} ${styles[`evoTrend--${activity.direction}`]}`}>
                {activity.delta >= 0 ? '+' : ''}{activity.delta} vs. semana anterior
              </span>
            </div>
            <div className={styles.evoChips}>
              <span className={styles.evoChip}>
                <strong>{activity.peakDay?.lessonsCompleted ?? 0}</strong> día más activo
                {activity.peakDay ? ` · ${activity.peakDay.date}` : ''}
              </span>
              <span className={activity.inactiveDays > 0 ? styles.evoChipWarn : styles.evoChip}>
                <strong>{activity.inactiveDays}</strong> días sin actividad de {activity.totalDays}
              </span>
            </div>
          </CardBody>
        </Card>

      </div>
    </div>
  );
}
