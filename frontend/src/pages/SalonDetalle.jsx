import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GaleriaSalon from "../components/GaleriaSalon";
import { salonesApi } from "../services/salonesApi";

export default function SalonDetalle() {
  const { id } = useParams();
  const [salon, setSalon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSalon(null);
    setError(null);
    salonesApi
      .obtener(id)
      .then(setSalon)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!salon) return <p>Cargando...</p>;

  return (
    <article className="detalle">
      <Link to="/salones">← Volver a salones</Link>
      <GaleriaSalon imagenes={salon.imagenes} nombre={salon.nombre} />
      <h1>{salon.nombre}</h1>
      <p>{salon.descripcion}</p>
      <ul className="detalle__datos">
        <li><strong>Capacidad:</strong> {salon.capacidad} personas</li>
        <li><strong>Precio:</strong> ${salon.precio.toLocaleString("es-AR")}</li>
        <li><strong>Ubicación:</strong> {salon.ubicacion}</li>
        <li><strong>Tipos de evento:</strong> {salon.tipos_evento.join(", ")}</li>
        <li><strong>Servicios:</strong> {salon.servicios.join(", ")}</li>
      </ul>
      <Link className="btn" to={`/salones/${salon.id}/reservar`}>
        Reservar
      </Link>
    </article>
  );
}