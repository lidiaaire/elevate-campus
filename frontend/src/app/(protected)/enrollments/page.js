'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { enrollmentsService } from '@/lib/services/enrollments.service';
import { buildCourseMap, buildUserMap } from '@/lib/resolvers';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/ui/PageHeader';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import styles from '@/styles/Enrollments.module.css';

const BADGE_CLASS = {
  active:    styles.badgeActive,
  suspended: styles.badgeSuspended,
  completed: styles.badgeCompleted,
};

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export default function EnrollmentsPage() {
  const { token, user } = useAuth();

  const [enrollments, setEnrollments]   = useState([]);
  const [courseMap, setCourseMap]       = useState({});
  const [userMap, setUserMap]           = useState({});
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const resolvers = [buildCourseMap(token)];
    if (user?.role === 'admin') resolvers.push(buildUserMap(token));

    Promise.all(resolvers).then(([cMap, uMap = {}]) => {
      setCourseMap(cMap);
      setUserMap(uMap);
    }).catch(() => {});
  }, [token, user?.role]);

  const fetchEnrollments = useCallback(() => {
    setLoading(true);
    enrollmentsService.getEnrollments(token)
      .then((data) => setEnrollments(data.docs ?? []))
      .catch((err) => setError(err.message || 'No se pudieron cargar las matrículas.'))
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => { fetchEnrollments(); }, [fetchEnrollments]);

  async function handleAction(id, action) {
    setActionLoading(id);
    try {
      await action(id, token);
      await fetchEnrollments();
    } catch (err) {
      setError(err.message || 'No se pudo actualizar la matrícula.');
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <div className={styles.page}>
      <PageHeader title="Matrículas" />

      {loading && <LoadingState message="Cargando matrículas…" />}
      {error   && <ErrorState message={error} />}

      {!loading && !error && enrollments.length === 0 && (
        <EmptyState title="No hay matrículas registradas." />
      )}

      {!loading && !error && enrollments.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Curso</th>
              <th>Estudiante</th>
              <th>Estado</th>
              <th>Fecha de matrícula</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((e) => {
              const busy = actionLoading === e._id;
              const courseId = e.courseId?._id ?? e.courseId;
              const courseName = e.courseId?.title ?? courseMap[courseId] ?? courseId;
              const studentId = e.studentId?._id ?? e.studentId;
              const studentName = e.studentId
                ? `${e.studentId.firstName ?? ''} ${e.studentId.lastName ?? ''}`.trim() || studentId
                : userMap[studentId] ?? studentId;
              return (
                <tr key={e._id}>
                  <td>{courseName ?? <span className={styles.idFallback}>{courseId}</span>}</td>
                  <td>{studentName ?? <span className={styles.idFallback}>{studentId}</span>}</td>
                  <td>
                    <span className={`${styles.badge} ${BADGE_CLASS[e.status] ?? ''}`}>
                      {e.status}
                    </span>
                  </td>
                  <td>{formatDate(e.enrolledAt)}</td>
                  <td>
                    <div className={styles.actions}>
                      {e.status === 'suspended' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={busy}
                          onClick={() => handleAction(e._id, enrollmentsService.activateEnrollment.bind(enrollmentsService))}
                        >
                          {busy ? '…' : 'Activate'}
                        </Button>
                      )}
                      {e.status === 'active' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={busy}
                          onClick={() => handleAction(e._id, enrollmentsService.suspendEnrollment.bind(enrollmentsService))}
                        >
                          {busy ? '…' : 'Suspend'}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
