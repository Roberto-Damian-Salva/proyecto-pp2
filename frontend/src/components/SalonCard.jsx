import { Link } from "react-router-dom";

export default function SalonCard({ salon }) {
  const precio = Number(salon.precio_por_hora ?? 0);
  const tipos = salon.tipos_evento ?? [];

  return (
    <article className="salon-card">
      {salon.imagenes?.[0] && <img src={salon.imagenes[0]} alt={salon.nombre} />}
      <div className="salon-card__body">
        <h3>{salon.nombre}</h3>
        <p>Capacidad: {salon.capacidad} personas</p>
        {tipos.length > 0 && <p>{tipos.join(" · ")}</p>}
        <p>
          <strong>${precio.toLocaleString("es-AR")}</strong> por hora
        </p>
        <Link to={`/salones/${salon.id}`}>Ver detalle</Link>
      </div>
    </article>
  );
}