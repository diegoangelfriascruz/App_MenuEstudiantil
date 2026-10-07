const promedio = (nums) =>
  nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;

function Promedios({ estudiantes }) {
  if (estudiantes.length === 0) {
    return <p>No hay datos para calcular promedios.</p>;
  }

  const promedios = estudiantes.map((e) => ({
    matricula: e.matricula,
    nombre: e.nombre,
    prom: promedio(e.materias.map((m) => m.calificacion)),
  }));
  const general = promedio(promedios.map((p) => p.prom));

  return (
    <section>
      <h2>Promedios</h2>
      <ul>
        {promedios.map((p) => (
          <li key={p.matricula}>
            {p.nombre} ({p.matricula}): <strong>{p.prom.toFixed(2)}</strong>
          </li>
        ))}
      </ul>
      <p>Promedio general del grupo: <strong>{general.toFixed(2)}</strong></p>
    </section>
  );
}

export default Promedios;