import { Link } from "react-router-dom";

export default function SalonCard({ salon }) {
  return (
    <article className="salon-card">
      <img src={salon.imagenes?.[0]} alt={salon.nombre} />
      <div className="salon-card__body">
        <h3>{salon.nombre}</h3>
        <p>Capacidad: {salon.capacidad} personas</p>
        <p>{salon.tipos_evento.join(" · ")}</p>
        <p>
          <strong>${salon.precio_por_hora.toLocaleString("es-AR")}</strong> por hora
        </p>
        <Link to={`/salones/${salon.id}`}>Ver detalle</Link>
      </div>
    </article>
  );
}