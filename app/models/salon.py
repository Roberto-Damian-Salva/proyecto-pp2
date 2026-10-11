from sqlalchemy import (
    Column, Integer, String, Float, JSON, ForeignKey, Table, Date, Time
)
from sqlalchemy.orm import relationship

from app.database import Base

# Tabla intermedia salón <-> tipo de evento (muchos a muchos)
salon_tipo = Table(
    "salon_tipo_evento",
    Base.metadata,
    Column("salon_id", ForeignKey("salones.id"), primary_key=True),
    Column("tipo_id", ForeignKey("tipos_evento.id"), primary_key=True),
)


class TipoEvento(Base):
    __tablename__ = "tipos_evento"

    id = Column(Integer, primary_key=True)
    nombre = Column(String, unique=True, nullable=False)


class Salon(Base):
    __tablename__ = "salones"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(String)
    capacidad = Column(Integer, nullable=False)
    precio = Column(Float, default=0)          # decisión: precio por TURNO
    ubicacion = Column(String)
    servicios = Column(JSON, default=list)     # ["catering", "sonido"]
    imagenes = Column(JSON, default=list)      # ["https://..."]
    tipos = relationship("TipoEvento", secondary=salon_tipo)

    @property
    def tipos_evento(self) -> list[str]:
        """Lista de nombres, para que el schema la serialice directo."""
        return [t.nombre for t in self.tipos]


class Turno(Base):
    __tablename__ = "turnos"

    id = Column(Integer, primary_key=True, index=True)
    salon_id = Column(Integer, ForeignKey("salones.id"), nullable=False)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    fecha = Column(Date, nullable=False)
    hora_inicio = Column(Time, nullable=False)
    hora_fin = Column(Time, nullable=False)
    tipo_evento = Column(String)
    estado = Column(String, default="pendiente")  # pendiente | confirmado | cancelado

    salon = relationship("Salon")
    usuario = relationship("Usuario")

    @property
    def salon_nombre(self):
        return self.salon.nombre if self.salon else None

    @property
    def usuario_email(self):
        return self.usuario.email if self.usuario else None