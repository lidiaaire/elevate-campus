'use client';

export default function StudentWeeklyTrendPanel({ weeklyTrend }) {
  if (!weeklyTrend || weeklyTrend.length === 0) {
    return <p>No hay actividad registrada.</p>;
  }

  return (
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
  );
}
