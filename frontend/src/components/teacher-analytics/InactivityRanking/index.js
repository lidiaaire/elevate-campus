'use client';

import EmptyState from '@/components/ui/EmptyState';
import styles from './InactivityRanking.module.css';

export default function InactivityRanking({ students }) {
  const ranked = (students ?? [])
    .filter((s) => s.daysSinceLastActivity !== null)
    .sort((a, b) => b.daysSinceLastActivity - a.daysSinceLastActivity);

  if (ranked.length === 0) {
    return <EmptyState title="No hay alumnos disponibles." />;
  }

  return (
    <div className={styles.wrap}>
      <table>
        <caption className="sr-only">Ranking de alumnos por inactividad</caption>
        <thead>
          <tr>
            <th scope="col">Posición</th>
            <th scope="col">Alumno</th>
            <th scope="col">Días sin actividad</th>
          </tr>
        </thead>
        <tbody>
          {ranked.map((student, index) => (
            <tr key={student._id ?? student.studentId}>
              <td>{index + 1}</td>
              <td>{student.firstName} {student.lastName}</td>
              <td>{student.daysSinceLastActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
