import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { salonesApi } from "../services/salonesApi";

const HORAS = Array.from({ length: 14 }, (_, i) => i + 10);

// BOCETO: Roberto lo reemplaza en la semana 5 por la versión con CalendarioSalon.
export default function Reservar() {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");

  useEffect(() => {
    salonesApi.obtener(id).then((s) => setNombre(s.nombre)).catch(() => setNombre(""));
  }, [id]);

  return (
    <div className="auth">
      <div className="auth-card">
        <Link className="back-link" to={`/salones/${id}`}>← Volver al salón</Link>
        <h2>Reservar {nombre || `salón #${id}`}</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Fecha
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </label>
          <label>
            Hora de inicio
            <select value={inicio} onChange={(e) => setInicio(e.target.value)}>
              <option value="">Elegí</option>
              {HORAS.map((h) => <option key={h} value={h}>{h}:00</option>)}
            </select>
          </label>
          <label>
            Hora de fin
            <select value={fin} onChange={(e) => setFin(e.target.value)}>
              <option value="">Elegí</option>
              {HORAS.map((h) => <option key={h} value={h + 1}>{h + 1}:00</option>)}
            </select>
          </label>
          <button className="primary-button" type="submit">Confirmar reserva</button>
        </form>
      </div>
    </div>
  );
}
