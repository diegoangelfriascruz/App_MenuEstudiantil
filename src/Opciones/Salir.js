function Salir({ onVolver }) {
  return (
    <section>
      <h2>Sesión finalizada</h2>
      <p>Gracias por usar el sistema.</p>
      <button onClick={onVolver}>Volver al menú</button>
    </section>
  );
}

export default Salir;