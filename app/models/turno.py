#from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
#from app.core.db import Base

#class TurnoModel(Base):
 #   __tablename__ = "turnos"

  #  id = Column(Integer, primary_key=True, index=True)
   # cliente_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    #salon_id = Column(Integer, ForeignKey("salones.id"), nullable=False)
    #fecha_inicio = Column(DateTime, nullable=False)
    #fecha_fin = Column(DateTime, nullable=False)
    #estado = Column(String, default="confirmado") # "confirmado", "cancelado"

from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/reservas", tags=["Reservas"])

# Ejemplo de endpoint para crear una reserva
@router.post("/")
def crear_reserva(reserva_data: dict):
    # Lógica para verificar disponibilidad y guardar en db.py
    return {
        "mensaje": "Reserva creada con éxito",
        "datos": reserva_data
    }

# Ejemplo de endpoint para consultar reservas por usuario
@router.get("/usuario/{usuario_id}")
def listar_reservas_usuario(usuario_id: int):
    return [
        {"id_reserva": 101, "salon": "Salón Dorado", "fecha": "2026-10-15", "turno": "Noche"}
    ]