function StudentCard({ estudiante }) {
  return (
    <div className="student-card">
      <h3>{estudiante.nombre}</h3>
      <p>Matrícula: {estudiante.matricula}</p>
      <ul>
        {estudiante.materias.map((m, i) => (
          <li key={i}>{m.nombre}: {m.calificacion}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentCard;