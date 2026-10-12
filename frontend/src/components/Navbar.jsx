import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/salones" className="navbar__logo">
        Sistema de Turnos
      </NavLink>
      <div className="navbar__links">
        <NavLink to="/salones">Salones</NavLink>
        <NavLink to="/mis-turnos">Mis turnos</NavLink>
        <NavLink to="/login">Ingresar</NavLink>
      </div>
    </nav>
  );
}