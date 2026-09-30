from sqlalchemy import Column, Integer, String, Float
from app.core.db import Base

class SalonModel(Base):
    __tablename__ = "salones"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    direccion = Column(String, nullable=False)
    capacidad = Column(Integer, nullable=False)
    precio_por_hora = Column(Float, nullable=False)