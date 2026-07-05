'use client';

import { useAuth } from '@/hooks/useAuth';
import { achievementService } from '@/lib/services/achievement.service';
import { useAsyncData } from '@/hooks/useAsyncData';
import AchievementCard from '@/components/achievements/AchievementCard';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/Achievements.module.css';

export default function AchievementsPage() {
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(
    () => achievementService.getMyAchievements(token)
  );

  const achievements = data?.achievements ?? [];

  if (loading) return <LoadingState message="Cargando logros..." />;
  if (error)   return <ErrorState message={error} />;

  return (
    <div className={styles.page}>
      <h1>Mis logros</h1>

      {achievements.length === 0 && (
        <EmptyState
          title="Todavía no has desbloqueado ningún logro."
          description="¡Sigue aprendiendo!"
        />
      )}

      <ul className={styles.list}>
        {achievements.map((a) => (
          <AchievementCard key={a.slug} achievement={a} />
        ))}
      </ul>
    </div>
  );
}
