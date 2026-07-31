'use client';

import Button from '@/components/ui/Button';

export default function CohortComparisonTable({ students, cohortProgressAvg, onSelectStudent }) {
  if (!students || students.length === 0) {
    return <p>No hay alumnos en el cohort.</p>;
  }

  return (
    <table>
      <caption className="sr-only">Comparativa de progreso de la cohorte</caption>
      <thead>
        <tr>
          <th scope="col">Alumno</th>
          <th scope="col">Progreso</th>
          <th scope="col">Diferencia vs Cohorte</th>
          <th scope="col">Días sin actividad</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => {
          const diff      = Math.round(student.overallProgressAvg - cohortProgressAvg);
          const diffLabel = diff > 0 ? `+${diff}%` : diff < 0 ? `${diff}%` : '0%';

          return (
            <tr key={student._id}>
              <td>{student.firstName} {student.lastName}</td>
              <td>{student.overallProgressAvg}%</td>
              <td>{diffLabel}</td>
              <td>{student.daysSinceLastActivity ?? '—'}</td>
              <td>
                <Button variant="ghost" size="sm" onClick={() => onSelectStudent(student._id)}>
                  Ver tendencia
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
