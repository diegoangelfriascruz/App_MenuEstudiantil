import { useState } from 'react';
import './Topvar.css';

const ENLACES = [
  { id: 'registrar', texto: 'Regisstrar estudiante' },
  { id: 'ver', texto: 'Ver estudiantes' },
  { id: 'promedios', texto: 'Promedios' },
  { id: 'salir', texto: 'Salir' },
];

function Topvar({ paginaActual, onNavegar }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const navegar = (id) => {
    onNavegar(id);
    setMenuAbierto(false);
  };

  return (
    <header className="navbar">
      <span className="navbar__marca">Menú estudiantil</span>
      <button
        className="navbar__toggle"
        aria-label="Abrir menú"
        aria-expanded={menuAbierto}
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        ☰
      </button>
      <nav className={`navbar__menu ${menuAbierto ? 'navbar__menu--abierto' : ''}`}>
        <ul className="navbar__enlaces">
          {ENLACES.map((e) => (
            <li key={e.id}>
              <button
                className={`navbar__enlace ${paginaActual === e.id ? 'navbar__enlace--activo' : ''}`}
                aria-current={paginaActual === e.id ? 'page' : undefined}
                onClick={() => navegar(e.id)}
              >
                {e.texto}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Topvar;