'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { dashboardService } from '@/lib/services/dashboard.service';
import DashboardLayout, { DashboardSection, DashboardStatGrid } from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import Card, { CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
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
  const activitySummary = summarizeActivity(series);

  const lowestProgressCourse = coursesSummary.reduce(
    (worst, c) => (worst === null || c.avgProgress < worst.avgProgress ? c : worst),
    null,
  );

  return (
    <DashboardLayout
      title={`${user.firstName} ${user.lastName}`}
      description="Panel de administración"
    >
      {/* 1. Alertas operativas — lo que necesita atención ahora */}
      <DashboardSection title="Alertas operativas">
        <Card>
          <CardHeader divided>
            <h3 className={styles.cardSectionTitle}>Alumnos en riesgo</h3>
          </CardHeader>
          <CardBody>
            <DashboardStatGrid>
              <StatCard
                as="li"
                variant={count > 0 ? 'danger' : 'success'}
                title="En riesgo"
                value={count}
                subtitle={`Sin actividad ${threshold.days}+ días o progreso <${threshold.progressBelow}%`}
              />
            </DashboardStatGrid>

            {count === 0 ? (
              <EmptyState title="No hay alumnos en riesgo actualmente." />
            ) : (
              <ul className={styles.studentList}>
                {atRiskStudents.map((s) => (
                  <li key={s.studentId} className={styles.studentRow}>
                    <div className={styles.studentInfo}>
                      <span className={styles.studentName}>
                        {s.firstName} {s.lastName}
                      </span>
                      <span className={styles.badgeDanger}>En riesgo</span>
                    </div>
                    <div className={styles.studentMeta}>
                      <span>Progreso medio: {s.overallProgressAvg}%</span>
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
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </DashboardSection>

      {/* 2. Panorama general — estado de la plataforma ahora mismo */}
      <DashboardSection title="Panorama general">
        <DashboardStatGrid>
          <StatCard
            as="li"
            title="Usuarios totales"
            value={platform.users.total}
            subtitle={`${platform.users.activeTotal} activos`}
          />
          <StatCard
            as="li"
            variant="brand"
            title="Matrículas activas"
            value={platform.enrollments.active}
            subtitle={`de ${platform.enrollments.total} totales`}
          />
          <StatCard
            as="li"
            title="Cursos publicados"
            value={platform.courses.published}
            subtitle={`de ${platform.courses.total} totales`}
          />
          <StatCard
            as="li"
            variant="brand"
            title="Pass rate assessments"
            value={platform.assessments.passRate !== null ? `${platform.assessments.passRate}%` : '—'}
            subtitle={`${platform.assessments.totalAttempts} intentos`}
          />
        </DashboardStatGrid>
      </DashboardSection>

      {/* 3. Crecimiento reciente — tendencia, no snapshot */}
      <DashboardSection title="Crecimiento reciente">
        <DashboardStatGrid minWidth="200px">
          <StatCard
            as="li"
            variant="success"
            title="Nuevas matrículas"
            value={platformGrowth.newEnrollments7d}
            subtitle={`${platformGrowth.newEnrollments30d} en 30 días`}
            trend={{ direction: 'up', value: `+${platformGrowth.newEnrollments7d}`, label: 'esta semana' }}
          />
          <StatCard
            as="li"
            variant="success"
            title="Lecciones completadas"
            value={platformGrowth.lessonsCompleted7d}
            subtitle={`${platformGrowth.lessonsCompleted30d} en 30 días`}
          />
          <StatCard
            as="li"
            variant="brand"
            title="Usuarios activos"
            value={platformGrowth.activeUsers7d}
            subtitle={`${platformGrowth.activeUsers30d} en 30 días`}
          />
          <StatCard
            as="li"
            variant="success"
            title="Assessments aprobados"
            value={platformGrowth.assessmentsPassed30d}
            subtitle="Últimos 30 días"
          />
        </DashboardStatGrid>
      </DashboardSection>

      {/* 4. Actividad reciente — resumen ejecutivo, no tabla de 30 filas */}
      <DashboardSection title="Actividad reciente">
        <DashboardStatGrid>
          <StatCard
            as="li"
            title="Media diaria"
            value={activitySummary.dailyAvg}
            subtitle="Lecciones/día, últimos 7 días"
            trend={{
              direction: activitySummary.direction,
              value: `${activitySummary.delta >= 0 ? '+' : ''}${activitySummary.delta}`,
              label: 'vs. semana anterior',
            }}
          />
          <StatCard
            as="li"
            variant="brand"
            title="Día más activo"
            value={activitySummary.peakDay?.lessonsCompleted ?? 0}
            subtitle={activitySummary.peakDay ? activitySummary.peakDay.date : 'Sin datos'}
          />
          <StatCard
            as="li"
            variant={activitySummary.inactiveDays > 0 ? 'warning' : 'success'}
            title="Días sin actividad"
            value={activitySummary.inactiveDays}
            subtitle={`de ${activitySummary.totalDays} días analizados`}
          />
        </DashboardStatGrid>
      </DashboardSection>

      {/* 5. Resumen de cursos — panorama + acceso a detalle en /progress */}
      <DashboardSection title="Cursos">
        <Card>
          <CardBody>
            {coursesSummary.length === 0 ? (
              <EmptyState title="No hay cursos registrados." />
            ) : (
              <DashboardStatGrid>
                <StatCard
                  as="li"
                  title="Cursos totales"
                  value={platform.courses.total}
                  subtitle={`${platform.courses.published} publicados · ${platform.courses.draft} borrador`}
                />
                {lowestProgressCourse && (
                  <StatCard
                    as="li"
                    variant="warning"
                    title="Menor progreso medio"
                    value={`${lowestProgressCourse.avgProgress}%`}
                    subtitle={lowestProgressCourse.title}
                  />
                )}
              </DashboardStatGrid>
            )}
          </CardBody>
          <CardFooter align="end" divided>
            <Button as={Link} href="/progress" variant="secondary">
              Ver progreso completo
            </Button>
          </CardFooter>
        </Card>
      </DashboardSection>
    </DashboardLayout>
  );
}
