import { useState } from 'react';
import './App.css';
import Topvar from './components/Topvar/Topvar';
import Registrar from './Opciones/Registrar';
import Ver from './Opciones/Ver';
import Promedios from './Opciones/Promedios';
import Salir from './Opciones/Salir';

function App() {
  const [paginaActual, setPaginaActual] = useState('registrar');
  const [estudiantes, setEstudiantes] = useState([]);

  const agregarEstudiante = (nuevo) =>
    setEstudiantes((prev) => [...prev, nuevo]);

  return (
    <div className="App">
      <Topvar paginaActual={paginaActual} onNavegar={setPaginaActual} />
      <main className="App-contenido">
        {paginaActual === 'registrar' && (
          <Registrar estudiantes={estudiantes} onGuardar={agregarEstudiante} />
        )}
        {paginaActual === 'ver' && <Ver estudiantes={estudiantes} />}
        {paginaActual === 'promedios' && <Promedios estudiantes={estudiantes} />}
        {paginaActual === 'salir' && (
          <Salir onVolver={() => setPaginaActual('registrar')} />
        )}
      </main>
    </div>
  );
}

export default App;