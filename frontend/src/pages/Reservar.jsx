import { useState } from "react";
import { useParams } from "react-router-dom";

const HORAS = Array.from({ length: 14 }, (_, i) => i + 10);

export default function Reservar() {
  const { id } = useParams();
  const [fecha, setFecha] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");

  return (
    <section>
      <h1>Reservar salón #{id}</h1>
      <p><em>Boceto: Roberto lo reemplaza con el calendario real en la semana 5.</em></p>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Fecha</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

        <label>Hora de inicio</label>
        <select value={inicio} onChange={(e) => setInicio(e.target.value)}>
          <option value="">Elegí</option>
          {HORAS.map((h) => <option key={h} value={h}>{h}:00</option>)}
        </select>

        <label>Hora de fin</label>
        <select value={fin} onChange={(e) => setFin(e.target.value)}>
          <option value="">Elegí</option>
          {HORAS.map((h) => <option key={h} value={h + 1}>{h + 1}:00</option>)}
        </select>

        <button>Confirmar reserva</button>
      </form>
    </section>
  );
}