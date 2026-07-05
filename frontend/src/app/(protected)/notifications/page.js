'use client';

import { useAuth } from '@/hooks/useAuth';
import { notificationService } from '@/lib/services/notification.service';
import { useAsyncData } from '@/hooks/useAsyncData';
import NotificationCard from '@/components/notifications/NotificationCard';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/Notifications.module.css';

export default function NotificationsPage() {
  const { token } = useAuth();

  const { data, loading, error } = useAsyncData(
    () => notificationService.getMyNotifications(token)
  );

  const notifications = data?.notifications ?? [];

  if (loading) return <LoadingState message="Cargando notificaciones..." />;
  if (error)   return <ErrorState message={error} />;

  return (
    <div className={styles.page}>
      <h1>Mis notificaciones</h1>

      {notifications.length === 0 && (
        <EmptyState title="No tienes notificaciones." />
      )}

      <ul className={styles.list}>
        {notifications.map((n) => (
          <NotificationCard key={n._id} notification={n} />
        ))}
      </ul>
    </div>
  );
}
