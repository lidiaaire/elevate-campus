'use client';

import EmptyState from '@/components/ui/EmptyState';
import styles from './StudentWeeklyTrendPanel.module.css';

export default function StudentWeeklyTrendPanel({ weeklyTrend }) {
  if (!weeklyTrend || weeklyTrend.length === 0) {
    return <EmptyState title="No hay actividad registrada." />;
  }

  return (
    <div className={styles.wrap}>
      <table>
        <caption className="sr-only">Tendencia semanal del alumno seleccionado</caption>
        <thead>
          <tr>
            <th scope="col">Semana</th>
            <th scope="col">Lecciones completadas</th>
            <th scope="col">Progreso acumulado</th>
          </tr>
        </thead>
        <tbody>
          {weeklyTrend.map((row) => (
            <tr key={row.weekLabel}>
              <td>{row.weekLabel}</td>
              <td>{row.lessonsCompleted}</td>
              <td>{row.cumulativeProgress}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
