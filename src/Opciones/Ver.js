import StudentCard from '../components/StudentCard/StudentCard';

function Ver({ estudiantes }) {
  return (
    <section>
      <h2>Estudiantes registrados</h2>
      {estudiantes.length === 0 ? (
        <p>Aún no hay estudiantes registrados.</p>
      ) : (
        estudiantes.map((e) => <StudentCard key={e.matricula} estudiante={e} />)
      )}
    </section>
  );
}

export default Ver;