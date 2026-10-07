import "./Card.css";

function Card({ titulo, valor, descripcion }) {
  return (
    <div className="card-KPI">
      <h2>{titulo}</h2>
      <p className="valor">{valor}</p>
      <p className="des">{descripcion}</p>
    </div>
  );
}

export default Card;