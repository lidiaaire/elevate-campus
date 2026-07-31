'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { dashboardService } from '@/lib/services/dashboard.service';
import DashboardLayout, { DashboardSection, DashboardStatGrid } from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import Card, { CardHeader, CardBody } from '@/components/ui/Card';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import styles from './TeacherDashboard.module.css';

export default function TeacherDashboard() {
  const { token } = useAuth();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    dashboardService.getTeacherDashboard(token)
      .then((res) => setData(res))
      .catch((err) => setError(err.message ?? 'Error desconocido'))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <LoadingState message="Cargando dashboard..." />;
  if (error)   return <ErrorState message="Error cargando dashboard" />;

  const { profile, cohortSummary, cohortGrowth, students } = data;

  return (
    <DashboardLayout
      title={`${profile.firstName} ${profile.lastName}`}
      description="Panel del profesor"
    >
      <DashboardSection title="Resumen de la cohorte">
        <DashboardStatGrid>
          <StatCard
            as="li"
            title="Total de alumnos"
            value={cohortSummary.totalStudents}
          />
          <StatCard
            as="li"
            variant="success"
            title="Activos (7 días)"
            value={cohortSummary.activeStudents7d}
            subtitle={`de ${cohortSummary.totalStudents} alumnos`}
          />
          <StatCard
            as="li"
            variant="brand"
            title="Progreso medio"
            value={`${cohortSummary.cohortProgressAvg}%`}
            subtitle="Progreso de la cohorte"
          />
          <StatCard
            as="li"
            variant={cohortSummary.atRiskCount > 0 ? 'danger' : 'default'}
            title="Alumnos en riesgo"
            value={cohortSummary.atRiskCount}
            subtitle="Sin actividad reciente"
          />
          <StatCard
            as="li"
            variant="brand"
            title="Pass rate assessments"
            value={
              cohortSummary.assessmentPassRate !== null
                ? `${cohortSummary.assessmentPassRate}%`
                : '—'
            }
          />
        </DashboardStatGrid>
      </DashboardSection>

      <DashboardSection title="Actividad reciente">
        <DashboardStatGrid minWidth="240px">
          <StatCard
            as="li"
            variant="success"
            title="Lecciones completadas"
            value={cohortGrowth.lessonsCompleted7d}
            subtitle="Últimos 7 días"
            trend={{
              direction: 'up',
              value: `+${cohortGrowth.lessonsCompleted7d}`,
              label: 'esta semana',
            }}
          />
          <StatCard
            as="li"
            variant="success"
            title="Assessments aprobados"
            value={cohortGrowth.assessmentsPassed30d}
            subtitle="Últimos 30 días"
          />
        </DashboardStatGrid>
      </DashboardSection>

      <DashboardSection>
        <Card>
          <CardHeader divided>
            <h2 className={styles.cardSectionTitle}>Alumnos</h2>
          </CardHeader>
          <CardBody>
            {students.length === 0 ? (
              <p className={styles.emptyText}>No hay alumnos en la cohorte.</p>
            ) : (
              <ul className={styles.studentList}>
                {students.map((s) => (
                  <li key={s.studentId} className={styles.studentRow}>
                    <div className={styles.studentInfo}>
                      <span className={styles.studentName}>
                        {s.firstName} {s.lastName}
                      </span>
                      <span className={s.isAtRisk ? styles.badgeDanger : styles.badgeSuccess}>
                        {s.isAtRisk ? 'En riesgo' : 'Activo'}
                      </span>
                    </div>
                    <div className={styles.studentMeta}>
                      <span>
                        {s.enrollments.length}{' '}
                        {s.enrollments.length === 1 ? 'curso' : 'cursos'}
                      </span>
                      {s.daysSinceLastActivity !== null && (
                        <span className={s.daysSinceLastActivity >= 7 ? styles.metaDaysWarn : styles.metaDays}>
                          {s.daysSinceLastActivity === 0
                            ? 'Activo hoy'
                            : `${s.daysSinceLastActivity}d sin actividad`}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </DashboardSection>
    </DashboardLayout>
  );
}
