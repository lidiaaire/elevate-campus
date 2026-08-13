'use client';

import { CheckCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/contexts/ToastContext';
import { notificationService } from '@/lib/services/notification.service';
import { useAsyncData } from '@/hooks/useAsyncData';
import NotificationCard from '@/components/notifications/NotificationCard';
import StudentSectionHeader from '@/components/dashboard/student/StudentSectionHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import styles from './Notifications.module.css';

export default function NotificationsPage() {
  const { token } = useAuth();
  const { showError } = useToast();

  const { data, loading, error, reload } = useAsyncData(
    () => notificationService.getMyNotifications(token)
  );

  const notifications = data?.notifications ?? [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  async function handleMarkRead(id) {
    try {
      await notificationService.markAsRead(id, token);
      reload();
    } catch {
      showError('No se pudo marcar la notificación como leída.');
    }
  }

  async function handleMarkAllRead() {
    try {
      await notificationService.markAllAsRead(token);
      reload();
    } catch {
      showError('No se pudieron marcar las notificaciones como leídas.');
    }
  }

  if (loading) return <LoadingState message="Cargando notificaciones..." />;
  if (error)   return <ErrorState message={error} />;

  return (
    <div className={styles.page}>
      <StudentSectionHeader
        eyebrow="Actividad"
        title="Mis notificaciones"
        description={notifications.length > 0
          ? `${notifications.length} notificaci${notifications.length === 1 ? 'ón' : 'ones'}${unreadCount > 0 ? ` · ${unreadCount} sin leer` : ''}`
          : undefined}
        actions={unreadCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            iconLeft={<CheckCheck size={14} />}
            onClick={handleMarkAllRead}
          >
            Marcar todas como leídas
          </Button>
        )}
      />

      {notifications.length === 0 ? (
        <EmptyState title="No tienes notificaciones." />
      ) : (
        <ul className={styles.list}>
          {notifications.map((n, i) => (
            <NotificationCard key={n._id} notification={n} onMarkRead={handleMarkRead} index={i} />
          ))}
        </ul>
      )}
    </div>
  );
}
