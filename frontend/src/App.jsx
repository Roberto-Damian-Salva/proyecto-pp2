import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Salones from "./pages/Salones";
import SalonDetalle from "./pages/SalonDetalle";
import Reservar from "./pages/Reservar";
import MisTurnos from "./pages/MisTurnos";
import Login from "./pages/Login";
import PanelAdmin from "./pages/admin/PanelAdmin";
import SalonesAdmin from "./pages/admin/SalonesAdmin";
import SalonForm from "./pages/admin/SalonForm";
import TurnosAdmin from "./pages/admin/TurnosAdmin";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="contenedor">
        <Routes>
          <Route path="/" element={<Navigate to="/salones" replace />} />
          <Route path="/salones" element={<Salones />} />
          <Route path="/salones/:id" element={<SalonDetalle />} />
          <Route path="/salones/:id/reservar" element={<Reservar />} />
          <Route path="/mis-turnos" element={<MisTurnos />} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<PanelAdmin />} />
          <Route path="/admin/salones" element={<SalonesAdmin />} />
          <Route path="/admin/salones/nuevo" element={<SalonForm />} />
          <Route path="/admin/salones/:id" element={<SalonForm />} />
          <Route path="/admin/turnos" element={<TurnosAdmin />} />

          <Route path="*" element={<p>Página no encontrada</p>} />
        </Routes>
      </main>
    </>
  );
}