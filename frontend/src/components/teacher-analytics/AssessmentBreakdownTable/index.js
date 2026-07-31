'use client';

export default function AssessmentBreakdownTable({ assessments }) {
  if (!assessments || assessments.length === 0) {
    return <p>No hay datos de assessments disponibles.</p>;
  }

  return (
    <table>
      <caption className="sr-only">Desglose de resultados por evaluación</caption>
      <thead>
        <tr>
          <th scope="col">Unidad</th>
          <th scope="col">Curso</th>
          <th scope="col">Pass Rate</th>
          <th scope="col">Average Score</th>
          <th scope="col">Average Attempts</th>
          <th scope="col">Students Tried</th>
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
  );
}
