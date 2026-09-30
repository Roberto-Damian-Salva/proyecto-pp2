from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from app.core.db import Base

class TurnoModel(Base):
    __tablename__ = "turnos"

    id = Column(Integer, primary_key=True, index=True)
    cliente_nombre = Column(String, nullable=False)
    fecha = Column(String, nullable=False)
    hora = Column(String, nullable=False)
    salon_id = Column(Integer, nullable=False)

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