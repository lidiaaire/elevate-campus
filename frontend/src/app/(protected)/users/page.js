'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { usersService } from '@/lib/services/users.service';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/Users.module.css';

export default function UsersPage() {
  const { token } = useAuth();

  const { data, loading, error, reload } = useAsyncData(
    () => usersService.getUsers(token).then((res) => res.users ?? []),
  );

  const users = data ?? [];
  const [actionLoading, setActionLoading] = useState(null);
  const [actionError, setActionError]     = useState(null);

  async function handleAction(id, action) {
    setActionLoading(id);
    setActionError(null);
    try {
      await action(id, token);
      reload();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) return <LoadingState message="Cargando usuarios…" />;
  if (error)   return <ErrorState message={error} />;

  return (
    <div className={styles.page}>
      <PageHeader title="Usuarios" />

      {actionError && <ErrorState message={actionError} />}

      {!actionError && users.length === 0 && (
        <EmptyState title="No hay usuarios registrados." />
      )}

      {!actionError && users.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="sr-only">Listado de usuarios registrados</caption>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Rol</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const busy = actionLoading === u._id;
                return (
                  <tr key={u._id}>
                    <td>{u.firstName} {u.lastName}</td>
                    <td>{u.email}</td>
                    <td><span className={styles.roleBadge}>{u.role}</span></td>
                    <td>
                      <span className={u.isActive ? styles.badgeActive : styles.badgeInactive}>
                        {u.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        {!u.isActive && (
                          <Button
                            variant="secondary"
                            size="sm"
                            loading={busy}
                            disabled={busy}
                            onClick={() => handleAction(u._id, usersService.activateUser.bind(usersService))}
                          >
                            Activar
                          </Button>
                        )}
                        {u.isActive && (
                          <Button
                            variant="secondary"
                            size="sm"
                            loading={busy}
                            disabled={busy}
                            onClick={() => handleAction(u._id, usersService.deactivateUser.bind(usersService))}
                          >
                            Desactivar
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
