from app.models.turno import TurnoModel
from app.models.salon import SalonModel

class TurnoModel(Base):
    __tablename__ = "turnos"

    id = Column(Integer, primary_key=True, index=True)
    cliente_id = Column(Integer, nullable=False)  # el login real lo completa en el Paso 8
    salon_id = Column(Integer, ForeignKey("salones.id"), nullable=False)
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
    estado = Column(String, default="confirmado")