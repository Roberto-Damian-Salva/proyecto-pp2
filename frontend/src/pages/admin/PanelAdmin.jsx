import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = "http://localhost:8000/api/v1/turnos"

export const PanelAdmin = () => {
  const [turnos, setTurnos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const token = localStorage.getItem("token")

  const fetchTurnos = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${API_URL}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTurnos(res.data)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.detail || "Error al cargar turnos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTurnos()
  }, [])

  const handleCancelar = async (id) => {
    if (!confirm("¿Cancelar este turno?")) return
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTurnos(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      alert(err.response?.data?.detail || "No se pudo cancelar")
    }
  }

  if (loading) return <p className="p-4">Cargando turnos...</p>
  if (error) return <p className="p-4 text-red-600">{error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel Administrador - Turnos</h1>
      
      {turnos.length === 0 ? (
        <p>No hay turnos activos</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Cliente ID</th>
              <th className="p-2 border">Salón ID</th>
              <th className="p-2 border">Inicio</th>
              <th className="p-2 border">Fin</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Acción</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map(t => (
              <tr key={t.id}>
                <td className="p-2 border">{t.id}</td>
                <td className="p-2 border">{t.cliente_id}</td>
                <td className="p-2 border">{t.salon_id}</td>
                <td className="p-2 border">{new Date(t.fecha_inicio).toLocaleString()}</td>
                <td className="p-2 border">{new Date(t.fecha_fin).toLocaleString()}</td>
                <td className="p-2 border">{t.estado}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleCancelar(t.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PanelAdmin