'use client';

import { useAuth } from '@/hooks/useAuth';
import { achievementService } from '@/lib/services/achievement.service';
import { useAsyncData } from '@/hooks/useAsyncData';
import AchievementCard from '@/components/achievements/AchievementCard';
import StudentSectionHeader from '@/components/dashboard/student/StudentSectionHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from './Achievements.module.css';

export default function AchievementsPage() {
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(
    () => achievementService.getMyAchievements(token)
  );

  const achievements = data?.achievements ?? [];
  const totalPoints = achievements.reduce((sum, a) => sum + (a.points || 0), 0);

  if (loading) return <LoadingState message="Cargando logros..." />;
  if (error)   return <ErrorState message={error} />;

  return (
    <div className={styles.page}>
      <StudentSectionHeader
        eyebrow="Logros"
        title="Mis logros"
        description={achievements.length > 0
          ? `${achievements.length} desbloqueado${achievements.length !== 1 ? 's' : ''} · ${totalPoints} pts`
          : 'Todavía no has desbloqueado ningún logro'}
      />

      {achievements.length === 0 ? (
        <EmptyState
          title="Todavía no has desbloqueado ningún logro."
          description="¡Sigue aprendiendo!"
        />
      ) : (
        <ul className={styles.grid}>
          {achievements.map((a) => (
            <AchievementCard key={a.slug} achievement={a} />
          ))}
        </ul>
      )}
    </div>
  );
}
