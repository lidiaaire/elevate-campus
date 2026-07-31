'use client';

import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { dashboardService } from '@/lib/services/dashboard.service';
import SkillRadarChart from '@/components/skill-radar/SkillRadarChart';
import SkillRadarLegend from '@/components/skill-radar/SkillRadarLegend';
import PageHeader from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/SkillRadar.module.css';

export default function SkillRadarPage() {
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(
    () => dashboardService.getStudentDashboard(token),
  );

  if (loading) return <LoadingState message="Cargando Skill Radar..." />;
  if (error)   return <ErrorState message={error} />;

  const { profile, skillProgress } = data ?? {};
  const hasData = ['listening', 'reading', 'assessmentScore', 'writing', 'speaking']
    .some((key) => skillProgress?.[key] != null);

  return (
    <div className={styles.container}>
      <PageHeader
        title="English Skill Radar"
        description={profile ? `${profile.firstName} ${profile.lastName}` : undefined}
      />

      {!hasData ? (
        <EmptyState title="No hay datos de habilidades disponibles." />
      ) : (
        <>
          <div className={styles.chartWrapper}>
            <SkillRadarChart skillProgress={skillProgress} />
          </div>
          <SkillRadarLegend skillProgress={skillProgress} />
        </>
      )}

      <section className={styles.infoSection}>
        <h2 className={styles.infoTitle}>¿Cómo se calcula este radar?</h2>
        <ul className={styles.infoList}>
          <li>Listening se estima a partir de las lecciones de escucha completadas.</li>
          <li>Reading se estima a partir de las lecciones de lectura completadas.</li>
          <li>Assessment representa la media de las mejores puntuaciones obtenidas en los assessments.</li>
          <li>Writing y Speaking todavía no disponen de datos suficientes y aparecerán cuando existan actividades específicas.</li>
        </ul>
        <p className={styles.infoNote}>
          Esta es una estimación preliminar basada en tu actividad dentro de la plataforma. No representa una certificación oficial de tu nivel de inglés.
        </p>
      </section>
    </div>
  );
}
