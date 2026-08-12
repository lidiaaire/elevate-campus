'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAsyncData } from '@/hooks/useAsyncData';
import { usersService } from '@/lib/services/users.service';
import { DashboardStatGrid } from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/Users.module.css';

const ROLE_LABEL = { admin: 'Admin', teacher: 'Docente', student: 'Alumno' };

export default function UsersPage() {
  const { token } = useAuth();

  const { data, loading, error, reload } = useAsyncData(
    () => usersService.getUsers(token).then((res) => res.users ?? []),
  );

  const users = data ?? [];
  const [actionLoading, setActionLoading] = useState(null);
  const [actionError, setActionError]     = useState(null);

  const [search,       setSearch]       = useState('');
  const [roleFilter,   setRoleFilter]   = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Prefill de búsqueda al llegar desde un link con contexto ya resuelto
  // (p. ej. "Ver en Usuarios" del dashboard de alumnos en riesgo).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setSearch(q);
  }, []);

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

  const summary = useMemo(() => ({
    total:    users.length,
    students: users.filter((u) => u.role === 'student').length,
    teachers: users.filter((u) => u.role === 'teacher').length,
    active:   users.filter((u) => u.isActive).length,
    inactive: users.filter((u) => !u.isActive).length,
  }), [users]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (statusFilter === 'active'   && !u.isActive) return false;
      if (statusFilter === 'inactive' &&  u.isActive) return false;
      if (!q) return true;
      const haystack = `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [users, search, roleFilter, statusFilter]);

  if (loading) return <LoadingState message="Cargando usuarios…" />;
  if (error)   return <ErrorState message={error} />;

  return (
    <div className={styles.page}>
      <PageHeader title="Usuarios" description="Gestión de cuentas de la plataforma" />

      {users.length > 0 && (
        <DashboardStatGrid minWidth="140px">
          <StatCard as="li" title="Usuarios totales" value={summary.total} />
          <StatCard as="li" variant="brand"   title="Alumnos" value={summary.students} />
          <StatCard as="li" variant="success" title="Docentes" value={summary.teachers} />
          <StatCard
            as="li"
            variant={summary.inactive > 0 ? 'warning' : 'success'}
            title="Activos/inactivos"
            value={`${summary.active} / ${summary.inactive}`}
          />
        </DashboardStatGrid>
      )}

      {actionError && <ErrorState message={actionError} />}

      {!actionError && users.length === 0 && (
        <EmptyState title="No hay usuarios registrados." />
      )}

      {!actionError && users.length > 0 && (
        <>
          <div className={styles.controls}>
            <input
              type="search"
              placeholder="Buscar por nombre o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.search}
              aria-label="Buscar usuario"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={styles.select}
              aria-label="Filtrar por rol"
            >
              <option value="all">Todos los roles</option>
              <option value="student">Alumnos</option>
              <option value="teacher">Docentes</option>
              <option value="admin">Admins</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.select}
              aria-label="Filtrar por estado"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="Ningún usuario coincide con la búsqueda." />
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <caption className="sr-only">Listado de usuarios registrados</caption>
                <thead>
                  <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => {
                    const busy = actionLoading === u._id;
                    return (
                      <tr key={u._id}>
                        <td>
                          <div className={styles.userCell}>
                            <Avatar firstName={u.firstName} lastName={u.lastName} role={u.role} />
                            <div className={styles.userCellText}>
                              <span className={styles.userName}>{u.firstName} {u.lastName}</span>
                              <span className={styles.userEmail}>{u.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`${styles.roleBadge} ${styles[`role_${u.role}`] ?? ''}`}>
                            {ROLE_LABEL[u.role] ?? u.role}
                          </span>
                        </td>
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
        </>
      )}
    </div>
  );
}
