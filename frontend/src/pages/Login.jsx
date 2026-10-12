import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
        email: email.trim(),
        password: password
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("rol", res.data.rol);
      localStorage.setItem("nombre", res.data.nombre);
      navigate("/admin/salones");
    } catch (err) {
      const detail = err.response?.data?.detail;
      console.log("DETAIL REAL:", detail);
      if (Array.isArray(detail)) {
        // Pydantic v2: [{type, loc, msg, input}]
        setError(detail.map(d => `${d.loc?.[1]}: ${d.msg}`).join(" | "));
      } else {
        setError(detail || "Error al loguear");
      }
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login Admin</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email"/><br/><br/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password"/><br/><br/>
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}