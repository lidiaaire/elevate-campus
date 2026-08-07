'use client';

import EmptyState from '@/components/ui/EmptyState';
import styles from './AssessmentBreakdownTable.module.css';

export default function AssessmentBreakdownTable({ assessments }) {
  if (!assessments || assessments.length === 0) {
    return <EmptyState title="No hay datos de evaluaciones disponibles." />;
  }

  return (
    <div className={styles.wrap}>
      <table>
        <caption className="sr-only">Desglose de resultados por evaluación</caption>
        <thead>
          <tr>
            <th scope="col">Unidad</th>
            <th scope="col">Curso</th>
            <th scope="col">Tasa de aprobación</th>
            <th scope="col">Puntuación media</th>
            <th scope="col">Intentos promedio</th>
            <th scope="col">Alumnos evaluados</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((item) => (
            <tr key={item.assessmentId}>
              <td>{item.unitTitle}</td>
              <td>{item.courseTitle}</td>
              <td>{item.passRate}%</td>
              <td>{item.avgScore}</td>
              <td>{item.avgAttempts}</td>
              <td>{item.totalStudentsTried}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
