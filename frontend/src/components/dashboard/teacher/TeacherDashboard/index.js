'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { dashboardService } from '@/lib/services/dashboard.service';
import { getTeacherPhoto } from '@/lib/config/teacherPhotos';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import Card, { CardBody } from '@/components/ui/Card';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import styles from './TeacherDashboard.module.css';

export default function TeacherDashboard() {
  // user (no solo token): getTeacherDashboard no devuelve el email del
  // profesor en `profile`, pero el actor autenticado siempre es el propio
  // profesor, así que su email ya está disponible en el contexto de auth
  // sin ninguna llamada adicional.
  const { user, token } = useAuth();
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
  const { atRiskCount } = cohortSummary;

  return (
    <div className={styles.dashboard}>

      {/* Hero — bloque editorial de marca, mismo lenguaje que Student pero
          con tono profesional: identidad de Emma + estado real de su
          cohorte, no un saludo genérico. */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.heroTop}>
              <Avatar
                firstName={profile.firstName}
                lastName={profile.lastName}
                role="teacher"
                size="md"
                photoUrl={getTeacherPhoto(user?.email)}
              />
              <div className={styles.heroIdentity}>
                <span className={styles.heroEyebrow}>Panel del profesor</span>
                <h1 className={styles.heroGreeting}>{profile.firstName} {profile.lastName}</h1>
              </div>
            </div>

            <p className={styles.heroSummary}>
              {cohortSummary.totalStudents} alumno{cohortSummary.totalStudents !== 1 ? 's' : ''} en tu cohorte
              {' · '}{cohortSummary.activeStudents7d} activo{cohortSummary.activeStudents7d !== 1 ? 's' : ''} esta semana
              {' · '}{cohortSummary.cohortProgressAvg}% de progreso medio.
            </p>

            {atRiskCount > 0 ? (
              <div className={styles.heroAlert}>
                <span className={styles.heroAlertDot} aria-hidden="true" />
                {atRiskCount} alumno{atRiskCount !== 1 ? 's' : ''} necesita{atRiskCount === 1 ? '' : 'n'} atención esta semana
              </div>
            ) : (
              <div className={styles.heroAlertOk}>
                <span className={styles.heroAlertDot} aria-hidden="true" />
                Sin alertas — toda la cohorte activa
              </div>
            )}

            <Button as={Link} href="/teacher-analytics" variant="accent" size="lg" className={styles.heroCta}>
              Ver analítica completa
            </Button>
          </div>

          <div className={styles.heroPhoto} aria-hidden="true">
            <Image
              src="/brand/photography/teacher-cohort.png"
              alt=""
              fill
              priority
              sizes="(max-width: 960px) 100vw, 38vw"
              className={styles.heroPhotoImg}
            />
            <div className={styles.heroPhotoFadeSide} />
            <div className={styles.heroPhotoFadeBottom} />
            <div className={styles.heroPhotoGlow} />
          </div>
        </div>
      </section>

      {/* Resumen de cohorte — jerarquía, no cinco StatCards idénticas.
          "Alumnos en riesgo" tiene prioridad operativa: vive en su propio
          callout, no como una cifra más de la fila. */}
      <Card variant="default" noPadding className={styles.summary}>
        <CardBody className={styles.summaryBody}>
          <div className={styles.summaryPrimary}>
            <div className={styles.summaryStat}>
              <span className={styles.summaryValue}>{cohortSummary.totalStudents}</span>
              <span className={styles.summaryLabel}>Alumnos</span>
            </div>
            <span className={styles.summaryDivider} aria-hidden="true" />
            <div className={styles.summaryStat}>
              <span className={styles.summaryValue}>{cohortSummary.activeStudents7d}</span>
              <span className={styles.summaryLabel}>Activos (7d)</span>
            </div>
            <span className={styles.summaryDivider} aria-hidden="true" />
            <div className={styles.summaryStat}>
              <span className={styles.summaryValue}>{cohortSummary.cohortProgressAvg}%</span>
              <span className={styles.summaryLabel}>Progreso medio</span>
            </div>
          </div>

          <div className={styles.summarySecondary}>
            <div className={`${styles.riskCallout} ${atRiskCount > 0 ? styles.riskCalloutActive : ''}`}>
              <span className={styles.riskCount}>{atRiskCount}</span>
              <span className={styles.riskLabel}>
                {atRiskCount === 0
                  ? 'Sin alumnos en riesgo'
                  : atRiskCount === 1
                    ? 'Alumno en riesgo'
                    : 'Alumnos en riesgo'}
              </span>
            </div>

            {cohortSummary.assessmentPassRate !== null && (
              <div className={styles.passRateChip}>
                <span className={styles.passRateValue}>{cohortSummary.assessmentPassRate}%</span>
                <span className={styles.passRateLabel}>Pass rate</span>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Alumnos — pieza protagonista: roster enriquecido, no filas de tabla */}
      <section>
        <h2 className={styles.sectionTitle}>Alumnos</h2>
        <Card variant="default" noPadding>
          {students.length === 0 ? (
            <CardBody>
              <p className={styles.emptyText}>No hay alumnos en la cohorte.</p>
            </CardBody>
          ) : (
            <ul className={styles.roster}>
              {students.map((s) => {
                const primaryEnrollment = s.enrollments[0];
                const extraCourses = s.enrollments.length - 1;

                return (
                  <li key={s.studentId}>
                    <Link
                      href={`/users/${s.studentId}`}
                      className={`${styles.rosterRow} ${s.isAtRisk ? styles.rosterRowAtRisk : ''}`}
                    >
                      <div className={styles.rosterAvatar}>
                        <Avatar firstName={s.firstName} lastName={s.lastName} role="student" size="md" />
                      </div>

                      <div className={styles.rosterMain}>
                        <div className={styles.rosterTopLine}>
                          <span className={styles.rosterName}>{s.firstName} {s.lastName}</span>
                          <span className={s.isAtRisk ? styles.badgeDanger : styles.badgeSuccess}>
                            {s.isAtRisk ? 'En riesgo' : 'Activo'}
                          </span>
                        </div>
                        <div className={styles.rosterCourse}>
                          {primaryEnrollment ? (
                            <>
                              <span className={styles.rosterCourseTitle}>{primaryEnrollment.courseTitle}</span>
                              {primaryEnrollment.level && (
                                <span className={styles.rosterLevel}>{primaryEnrollment.level}</span>
                              )}
                              {extraCourses > 0 && (
                                <span className={styles.rosterExtra}>+{extraCourses} más</span>
                              )}
                            </>
                          ) : (
                            <span className={styles.rosterCourseEmpty}>Sin curso activo</span>
                          )}
                        </div>
                      </div>

                      <div className={styles.rosterProgress}>
                        <ProgressBar value={s.overallProgressAvg} ariaLabel={`Progreso de ${s.firstName}`} />
                        <span className={styles.rosterProgressValue}>{s.overallProgressAvg}%</span>
                      </div>

                      <span
                        className={
                          s.daysSinceLastActivity !== null && s.daysSinceLastActivity >= 7
                            ? styles.rosterMetaWarn
                            : styles.rosterMeta
                        }
                      >
                        {s.daysSinceLastActivity === null
                          ? 'Sin actividad'
                          : s.daysSinceLastActivity === 0
                            ? 'Activo hoy'
                            : `${s.daysSinceLastActivity}d sin actividad`}
                      </span>

                      {/* Refuerza que la fila entera es navegable hacia la ficha */}
                      <span className={styles.rosterChevron} aria-hidden="true">›</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </section>

      {/* Actividad reciente — una pieza compacta, no dos cards enormes */}
      <section>
        <h2 className={styles.sectionTitle}>Actividad reciente</h2>
        <Card variant="default" noPadding>
          <CardBody className={styles.activityBody}>
            <div className={styles.activityStat}>
              <span className={styles.activityValue}>{cohortGrowth.lessonsCompleted7d}</span>
              <span className={styles.activityLabel}>lecciones completadas · 7 días</span>
            </div>
            <span className={styles.activityDivider} aria-hidden="true" />
            <div className={styles.activityStat}>
              <span className={styles.activityValue}>{cohortGrowth.assessmentsPassed30d}</span>
              <span className={styles.activityLabel}>assessments aprobados · 30 días</span>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
