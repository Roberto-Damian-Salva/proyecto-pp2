from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.core.db import Base

class TurnoModel(Base):
    __tablename__ = "turnos"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    salon_id = Column(Integer, ForeignKey("salones.id"), nullable=False)
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
    estado = Column(String, default="confirmado") # "confirmado", "cancelado"