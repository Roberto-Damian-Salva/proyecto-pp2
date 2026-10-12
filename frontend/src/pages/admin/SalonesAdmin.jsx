import { useEffect, useState } from "react";
import { salonesApi } from "../../services/salonesApi";
import { Link } from "react-router-dom";

export default function SalonesAdmin() {
  const [salones, setSalones] = useState([]);
  useEffect(() => { salonesApi.listar().then(setSalones).catch(console.error); }, []);
  const handleDelete = async (id) => {
    if(!confirm("Borrar?")) return;
    await salonesApi.eliminar(id);
    setSalones(p=>p.filter(s=>s.id!==id));
  };
  return (
    <div style={{padding:20}}>
      <h2>Salones</h2>
      <Link to="/admin/salones/nuevo">Nuevo Salón</Link>
      {salones.map(s=>(
        <div key={s.id} style={{border:"1px solid #ccc", margin:10, padding:10}}>
          {s.nombre} - ${s.precio} <button onClick={()=>handleDelete(s.id)}>Borrar</button>
        </div>
      ))}
    </div>
  );
}