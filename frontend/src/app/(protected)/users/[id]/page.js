'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail, GraduationCap, Calendar, Clock, TrendingUp, AlertTriangle,
  CheckCircle2, BookOpen, Award, FileCheck, ArrowLeft, Flame, ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { dashboardService }    from '@/lib/services/dashboard.service';
import { usersService }        from '@/lib/services/users.service';
import { enrollmentsService }  from '@/lib/services/enrollments.service';
import { achievementService }  from '@/lib/services/achievement.service';
import { certificateService }  from '@/lib/services/certificate.service';
import Avatar        from '@/components/ui/Avatar';
import Card, { CardBody } from '@/components/ui/Card';
import Button         from '@/components/ui/Button';
import ProgressBar    from '@/components/ui/ProgressBar';
import LoadingState   from '@/components/ui/LoadingState';
import ErrorState     from '@/components/ui/ErrorState';
import EmptyState     from '@/components/ui/EmptyState';
import AccessDenied   from '@/components/ui/AccessDenied';
import SkillProgressList from '@/components/dashboard/student/SkillProgressList';
import { getCourseVisual } from '@/lib/config/courseVisuals';
import { getStudentPhoto } from '@/lib/config/studentPhotos';
import styles from './StudentProfile.module.css';

const ENROLLMENT_STATUS_LABEL = {
  active:    'En curso',
  completed: 'Completado',
  suspended: 'Suspendida',
};

function formatDate(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
}

function MetaItem({ icon: Icon, warn = false, children }) {
  return (
    <span className={`${styles.metaItem} ${warn ? styles.metaItemWarn : ''}`}>
      {Icon && <Icon size={14} className={styles.metaIcon} aria-hidden="true" />}
      {children}
    </span>
  );
}

function RiskBadge({ isAtRisk }) {
  if (isAtRisk === null) return null;
  return isAtRisk ? (
    <span className={styles.riskBadgeDanger}>
      <AlertTriangle size={14} aria-hidden="true" /> En riesgo
    </span>
  ) : (
    <span className={styles.riskBadgeOk}>
      <ShieldCheck size={14} aria-hidden="true" /> Activa
    </span>
  );
}

function EnrollmentCard({ item }) {
  const visual = getCourseVisual(item.courseTitle);
  const hasProgress = item.overallProgress !== null;

  return (
    <li className={styles.enrollmentCard} style={{ '--course-accent': visual.accentColor }}>
      <div className={styles.enrollmentHeader}>
        <span className={styles.enrollmentLevel}>{item.level ?? '—'}</span>
        <span className={`${styles.enrollmentStatus} ${styles[`status_${item.status}`] ?? ''}`}>
          {ENROLLMENT_STATUS_LABEL[item.status] ?? item.status}
        </span>
      </div>
      <p className={styles.enrollmentTitle}>{item.courseTitle}</p>
      <p className={styles.enrollmentMeta}>Matriculada: {formatDate(item.enrolledAt) ?? '—'}</p>

      {hasProgress ? (
        <div className={styles.enrollmentProgress}>
          <div className={styles.enrollmentProgressTop}>
            <span>{item.completedLessons} / {item.totalLessons} lecciones</span>
            <span className={styles.enrollmentPct}>{item.overallProgress}%</span>
          </div>
          <ProgressBar value={item.overallProgress} ariaLabel={`Progreso de ${item.courseTitle}`} variant="accent" />
        </div>
      ) : (
        <p className={styles.enrollmentNoProgress}>Sin datos de progreso.</p>
      )}

      {item.nextLesson && (
        <p className={styles.enrollmentNext}>
          Siguiente: <span>{item.nextLesson.lessonTitle}</span>
        </p>
      )}
    </li>
  );
}

function ActivityRow({ item }) {
  return (
    <li className={styles.activityRow}>
      <span className={styles.activityIcon} aria-hidden="true"><CheckCircle2 size={13} /></span>
      <div className={styles.activityBody}>
        <span className={styles.activityTitle}>{item.lessonTitle}</span>
        <span className={styles.activityCourse}>{item.courseTitle}</span>
      </div>
      <span className={styles.activityDate}>{formatDate(item.completedAt)}</span>
    </li>
  );
}

function AchievementChip({ achievement }) {
  return (
    <li className={styles.achievementChip}>
      <span className={styles.achievementIcon} aria-hidden="true">{achievement.icon || '🏆'}</span>
      <div className={styles.achievementBody}>
        <span className={styles.achievementName}>{achievement.name}</span>
        <span className={styles.achievementMeta}>{achievement.points} pts · {formatDate(achievement.unlockedAt)}</span>
      </div>
    </li>
  );
}

function CertificateChip({ certificate }) {
  return (
    <li className={styles.certificateChip}>
      <span className={styles.certificateSeal} aria-hidden="true"><FileCheck size={18} /></span>
      <div className={styles.certificateBody}>
        <span className={styles.certificateName}>{certificate.course.title}</span>
        <span className={styles.certificateNumber}>Nº {certificate.certificateNumber}</span>
        <span className={styles.certificateMeta}>
          Nota {certificate.finalScore}% · {formatDate(certificate.issueDate)}
        </span>
      </div>
    </li>
  );
}

export default function StudentProfilePage() {
  const { id: studentId } = useParams();
  const { user, token } = useAuth();

  const [state, setState] = useState({ loading: true, error: null, data: null });
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, error: null, data: null });

    const isAdmin = user?.role === 'admin';

    const detailPromise = isAdmin
      ? dashboardService.getAdminStudentDetail(studentId, token)
      : dashboardService.getTeacherStudentDetail(studentId, token);

    // Cruce de riesgo: la única fuente sin reimplementar el cálculo es la
    // lista donde el backend ya lo computó (getAdminAtRisk / cohorte del
    // teacher). Best-effort: si falla, simplemente no se muestra el badge.
    const riskPromise = isAdmin
      ? dashboardService.getAdminAtRisk(token)
      : dashboardService.getTeacherDashboard(token);

    Promise.all([
      detailPromise,
      usersService.getUserById(studentId, token).catch(() => null),
      enrollmentsService.getEnrollmentsByStudent(studentId, token).catch(() => null),
      achievementService.getStudentAchievements(studentId, token).catch(() => null),
      certificateService.getStudentCertificates(studentId, token).catch(() => null),
      riskPromise.catch(() => null),
    ])
      .then(([detail, userRes, enrollmentsRes, achievementsRes, certificatesRes, riskRes]) => {
        if (cancelled) return;
        setState({
          loading: false,
          error: null,
          data: {
            detail,
            profile: userRes?.user ?? null,
            rawEnrollments: enrollmentsRes?.docs ?? enrollmentsRes ?? [],
            achievements: achievementsRes?.achievements ?? [],
            certificates: certificatesRes?.certificates ?? [],
            riskRes,
          },
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ loading: false, error: err, data: null });
      });

    return () => { cancelled = true; };
  }, [studentId, token, user?.role]);

  const { loading, error, data } = state;

  if (loading) return <LoadingState message="Cargando ficha del alumno..." />;

  if (error) {
    if (error.status === 403) return <AccessDenied />;
    if (error.status === 404) {
      return (
        <EmptyState
          title="Alumno no encontrado."
          description="Puede que el enlace sea incorrecto o que el alumno ya no exista."
        />
      );
    }
    return <ErrorState message={error.message} />;
  }

  const { detail, profile, rawEnrollments, achievements, certificates, riskRes } = data;
  const { summary, growth, skillProgress, enrollments, recentActivity, pendingAssessments } = detail;
  const isAdmin = user?.role === 'admin';

  // Riesgo real: membership en la lista que el backend ya calculó, nunca
  // un umbral reimplementado en el frontend.
  const isAtRisk = riskRes
    ? isAdmin
      ? riskRes.students?.some((s) => String(s.studentId) === String(studentId)) ?? null
      : riskRes.students?.find((s) => String(s.studentId) === String(studentId))?.isAtRisk ?? null
    : null;

  // Nombre del profesor asignado: gratis solo cuando ya viaja en una de las
  // llamadas ya realizadas (propio actor si es teacher, o lista de riesgo
  // si el alumno está en ella) — no se añade una llamada nueva solo para esto.
  const teacherName = !isAdmin
    ? `${user.firstName} ${user.lastName}`
    : (() => {
        const match = riskRes?.students?.find((s) => String(s.studentId) === String(studentId));
        return match?.assignedTeacher ? `${match.assignedTeacher.firstName} ${match.assignedTeacher.lastName}` : null;
      })();

  // "Trayectoria de aprendizaje" — matrículas reales (con fecha de alta),
  // enriquecidas con el progreso ya calculado en el academic detail cuando
  // existe (activas/completadas); las suspendidas no tienen progreso ahí.
  const trajectory = rawEnrollments.map((raw) => {
    const course = raw.courseId ?? {};
    const courseId = String(course._id ?? raw.courseId);
    const detailMatch = enrollments.find((e) => String(e.courseId) === courseId);

    return {
      enrollmentId:     raw._id,
      courseTitle:      course.title ?? detailMatch?.courseTitle ?? 'Curso',
      level:            course.level ?? detailMatch?.level ?? null,
      status:           raw.status,
      enrolledAt:       raw.enrolledAt,
      overallProgress:  detailMatch?.overallProgress ?? null,
      completedLessons: detailMatch?.completedLessons ?? 0,
      totalLessons:     detailMatch?.totalLessons ?? 0,
      nextLesson:       detailMatch?.nextLesson ?? null,
    };
  });

  const activeCount    = enrollments.filter((e) => e.enrollmentStatus === 'active').length;
  const completedCount = enrollments.filter((e) => e.enrollmentStatus === 'completed').length;

  // Fotografía demo — mapping explícito por email, con fallback a Avatar
  // (ver lib/config/studentPhotos.js). Ningún archivo existe todavía: el
  // fallback es lo único que se ve hasta que se coloquen los assets reales.
  const photoUrl  = getStudentPhoto(profile?.email);
  const showPhoto = Boolean(photoUrl) && !photoFailed;

  return (
    <div className={styles.page}>
      <Button
        as={Link}
        href={isAdmin ? '/users' : '/dashboard'}
        variant="ghost"
        size="sm"
        iconLeft={<ArrowLeft size={16} />}
        className={styles.backLink}
      >
        {isAdmin ? 'Usuarios' : 'Dashboard'}
      </Button>

      {/* Hero — el alumno como protagonista: 65/35 información/foto,
          con la banda de resumen académico integrada como extensión del
          mismo bloque, no como una card aparte. */}
      <section className={`${styles.hero} ${isAtRisk ? styles.heroAtRisk : ''}`}>
        <span className={styles.heroGlow} aria-hidden="true" />

        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <div className={styles.heroTopRow}>
              <span className={styles.heroRole}>Alumna</span>
              <RiskBadge isAtRisk={isAtRisk} />
              {profile && !isAtRisk && (
                <span className={profile.isActive ? styles.statusActive : styles.statusInactive}>
                  {profile.isActive ? 'Activa' : 'Inactiva'}
                </span>
              )}
            </div>

            <h1 className={styles.heroName}>{detail.profile.firstName} {detail.profile.lastName}</h1>

            <div className={styles.heroMetaGrid}>
              {profile?.email && <MetaItem icon={Mail}>{profile.email}</MetaItem>}
              {teacherName && <MetaItem icon={GraduationCap}>Profesor: {teacherName}</MetaItem>}
              {profile?.createdAt && <MetaItem icon={Calendar}>Alumna desde {formatDate(profile.createdAt)}</MetaItem>}
              <MetaItem icon={Clock} warn={isAtRisk === true}>
                {summary.lastActivityAt ? `Última actividad: ${formatDate(summary.lastActivityAt)}` : 'Sin actividad registrada'}
              </MetaItem>
            </div>
          </div>

          <div className={styles.heroPhotoZone}>
            {showPhoto ? (
              <>
                <Image
                  src={photoUrl}
                  alt=""
                  fill
                  sizes="(max-width: 860px) 100vw, 35vw"
                  className={styles.heroPhotoImg}
                  onError={() => setPhotoFailed(true)}
                />
                <div className={styles.heroPhotoFadeSide} />
                <div className={styles.heroPhotoFadeBottom} />
              </>
            ) : (
              <Avatar firstName={detail.profile.firstName} lastName={detail.profile.lastName} role="student" size="xl" />
            )}
          </div>
        </div>

        {/* Resumen académico — banda integrada en el mismo bloque del hero */}
        <div className={styles.summaryBand}>
          <div className={styles.summaryPrimary}>
            <div className={styles.summaryStat}>
              <span className={styles.summaryValue}>{summary.overallProgressAvg}%</span>
              <span className={styles.summaryLabel}>Progreso global</span>
            </div>
            <span className={styles.summaryDivider} aria-hidden="true" />
            <div className={styles.summaryStat}>
              <span className={styles.summaryValueSm}>{activeCount}</span>
              <span className={styles.summaryLabel}>Activos</span>
            </div>
            <div className={styles.summaryStat}>
              <span className={styles.summaryValueSm}>{completedCount}</span>
              <span className={styles.summaryLabel}>Completados</span>
            </div>
            <div className={styles.summaryStat}>
              <span className={styles.summaryValueSm}>{summary.totalLessonsCompleted}</span>
              <span className={styles.summaryLabel}>Lecciones</span>
            </div>
          </div>

          <div className={styles.summarySecondary}>
            {summary.streakDays > 0 && (
              <span className={styles.summaryChip}>
                <Flame size={14} aria-hidden="true" /> {summary.streakDays} días de racha
              </span>
            )}
            {growth.lessonsCompleted7d > 0 && (
              <span className={styles.summaryChip}>
                <TrendingUp size={14} aria-hidden="true" /> +{growth.lessonsCompleted7d} esta semana
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Trayectoria de aprendizaje — pieza protagonista */}
      <section>
        <h2 className={styles.sectionTitle}>Trayectoria de aprendizaje</h2>
        {trajectory.length === 0 ? (
          <EmptyState title="Aún no tiene matrículas." />
        ) : (
          <ul className={styles.trajectoryRow}>
            {trajectory.map((item) => (
              <EnrollmentCard key={item.enrollmentId} item={item} />
            ))}
          </ul>
        )}
      </section>

      {/* Progreso académico — "cómo avanza" (60) + Competencias (40) */}
      <section>
        <h2 className={styles.sectionTitle}>Progreso académico</h2>
        <div className={styles.progressGrid}>
          <div className={styles.progressMain}>
            {enrollments.length === 0 ? (
              <EmptyState title="Sin progreso que mostrar todavía." />
            ) : (
              <ul className={styles.progressList}>
                {enrollments.map((e) => (
                  <li key={String(e.courseId)} className={styles.progressItem}>
                    <div className={styles.progressItemTop}>
                      <span className={styles.progressItemTitle}>{e.courseTitle}</span>
                      <span className={styles.progressItemPct}>{e.overallProgress}%</span>
                    </div>
                    <ProgressBar value={e.overallProgress} ariaLabel={`Progreso de ${e.courseTitle}`} variant="accent" />
                    <span className={styles.progressItemMeta}>
                      {e.completedLessons} / {e.totalLessons} lecciones
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {pendingAssessments?.length > 0 && (
              <div className={styles.pendingBlock}>
                <span className={styles.pendingLabel}>Evaluaciones pendientes</span>
                <ul className={styles.pendingList}>
                  {pendingAssessments.map((pa) => (
                    <li key={String(pa.assessmentId)} className={styles.pendingItem}>
                      {pa.assessmentTitle || pa.unitTitle} <span>· {pa.courseTitle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={styles.progressSide}>
            <SkillProgressList skillProgress={skillProgress} />
          </div>
        </div>
      </section>

      {/* Actividad reciente — timeline compacto */}
      <section>
        <h2 className={styles.sectionTitle}>Actividad reciente</h2>
        <Card variant="default" noPadding>
          <CardBody className={styles.activityCardBody}>
            {recentActivity.length === 0 ? (
              <EmptyState title="Sin actividad reciente." />
            ) : (
              <ul className={styles.activityList}>
                {recentActivity.map((item) => (
                  <ActivityRow key={String(item.lessonId)} item={item} />
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </section>

      {/* Logros y certificados — secundario, con más carácter visual */}
      <div className={styles.secondaryGrid}>
        <section>
          <h2 className={styles.sectionTitle}>
            <Award size={16} aria-hidden="true" /> Logros
          </h2>
          <Card variant="default" noPadding>
            <CardBody>
              {achievements.length === 0 ? (
                <EmptyState title="Sin logros desbloqueados todavía." />
              ) : (
                <ul className={styles.achievementList}>
                  {achievements.map((a) => (
                    <AchievementChip key={a.slug} achievement={a} />
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            <FileCheck size={16} aria-hidden="true" /> Certificados
          </h2>
          <Card variant="default" noPadding>
            <CardBody>
              {certificates.length === 0 ? (
                <EmptyState title="Sin certificados emitidos todavía." />
              ) : (
                <ul className={styles.certificateList}>
                  {certificates.map((c) => (
                    <CertificateChip key={c.certificateNumber} certificate={c} />
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  );
}
