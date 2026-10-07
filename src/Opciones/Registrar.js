import { useState } from 'react';

const MAX_MATERIAS = 5;
const ESCALA_MAX = 10;
const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]*$/;
const SOLO_NUMERO = /^\d{0,3}(\.\d{0,2})?$/;
const materiaVacia = () => ({ nombre: '', calificacion: '' });

function Registrar({ estudiantes, onGuardar }) {
  const [nombre, setNombre] = useState('');
  const [matricula, setMatricula] = useState('');
  const [materias, setMaterias] = useState([materiaVacia()]);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const cambiarNombre = (e) => {
    if (SOLO_LETRAS.test(e.target.value)) setNombre(e.target.value);
  };

  const cambiarMatricula = (e) =>
    setMatricula(e.target.value.replace(/\D/g, ''));

  const cambiarMateria = (i, campo, valor) => {
    if (campo === 'nombre' && !SOLO_LETRAS.test(valor)) return;
    if (campo === 'calificacion' && !SOLO_NUMERO.test(valor)) return;
    setMaterias((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [campo]: valor } : m))
    );
  };

  const agregarMateria = () =>
    setMaterias((prev) =>
      prev.length < MAX_MATERIAS ? [...prev, materiaVacia()] : prev
    );

  const quitarMateria = (i) =>
    setMaterias((prev) => prev.filter((_, idx) => idx !== i));

  const validar = () => {
    if (!nombre.trim()) return 'El nombre es obligatorio.';
    if (!matricula) return 'La matrícula es obligatoria.';
    if (estudiantes.some((e) => e.matricula === matricula))
      return 'Esa matrícula ya está registrada.';
    for (const m of materias) {
      if (!m.nombre.trim()) return 'Cada materia necesita un nombre.';
      const nota = Number(m.calificacion);
      if (m.calificacion === '' || Number.isNaN(nota) || nota < 0 || nota > ESCALA_MAX)
        return `Las calificaciones deben estar entre 0 y ${ESCALA_MAX}.`;
    }
    return '';
  };

  const guardar = (e) => {
    e.preventDefault();
    setOk('');
    const msg = validar();
    if (msg) return setError(msg);

    onGuardar({
      nombre: nombre.trim(),
      matricula,
      materias: materias.map((m) => ({
        nombre: m.nombre.trim(),
        calificacion: Number(m.calificacion),
      })),
    });
    setNombre('');
    setMatricula('');
    setMaterias([materiaVacia()]);
    setError('');
    setOk('Estudiante registrado.');
  };

  return (
    <form className="formulario" onSubmit={guardar}>
      <h2>Registrar estudiante</h2>

      <label>
        Nombre
        <input value={nombre} onChange={cambiarNombre} />
      </label>

      <label>
        Matrícula
        <input
          value={matricula}
          onChange={cambiarMatricula}
          inputMode="numeric"
        />
      </label>

      <h3>Materias ({materias.length}/{MAX_MATERIAS})</h3>
      {materias.map((m, i) => (
        <div className="fila-materia" key={i}>
          <input
            value={m.nombre}
            onChange={(e) => cambiarMateria(i, 'nombre', e.target.value)}
            placeholder="Materia"
            aria-label={`Nombre de la materia ${i + 1}`}
          />
          <input
            value={m.calificacion}
            onChange={(e) => cambiarMateria(i, 'calificacion', e.target.value)}
            inputMode="decimal"
            placeholder={`0-${ESCALA_MAX}`}
            aria-label={`Calificación de la materia ${i + 1}`}
          />
          {materias.length > 1 && (
            <button
              type="button"
              onClick={() => quitarMateria(i)}
              aria-label={`Quitar materia ${i + 1}`}
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={agregarMateria}
        disabled={materias.length >= MAX_MATERIAS}
      >
        + Agregar materia
      </button>

      {error && <p className="error">{error}</p>}
      {ok && <p className="exito">{ok}</p>}

      <button type="submit">Guardar</button>
    </form>
  );
}

export default Registrar;