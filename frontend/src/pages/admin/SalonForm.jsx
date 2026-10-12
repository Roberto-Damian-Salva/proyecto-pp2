import { useState } from "react";
import { salonesApi } from "../../services/salonesApi";
import { useNavigate } from "react-router-dom";

export default function SalonForm() {
  const [form, setForm] = useState({ nombre:"", direccion:"", capacidad:100, precio:100000, descripcion:"" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await salonesApi.crear(form);
      alert("Salón creado!");
      navigate("/admin/salones");
    } catch (err) { alert(err.message); }
  };

  return (
    <form onSubmit={handleSubmit} style={{padding:20}}>
      <input placeholder="nombre" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} /><br/><br/>
      <input placeholder="direccion" value={form.direccion} onChange={e=>setForm({...form, direccion:e.target.value})} /><br/><br/>
      <input type="number" value={form.capacidad} onChange={e=>setForm({...form, capacidad: Number(e.target.value)})} /><br/><br/>
      <input type="number" value={form.precio} onChange={e=>setForm({...form, precio: Number(e.target.value)})} /><br/><br/>
      <textarea placeholder="descripcion" value={form.descripcion} onChange={e=>setForm({...form, descripcion:e.target.value})}></textarea><br/><br/>
      <button type="submit">Crear</button>
    </form>
  );
}