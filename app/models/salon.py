#from sqlalchemy import Column, Integer, String, Float
#from app.core.db import Base

#class SalonModel(Base):
 #   __tablename__ = "salones"

    #id = Column(Integer, primary_key=True, index=True)
    #nombre = Column(String, nullable=False)
    #direccion = Column(String, nullable=False)
    #capacidad = Column(Integer, nullable=False)
    #precio_por_hora = Column(Float, nullable=False)#



from fastapi import APIRouter, HTTPException
# Importas tus modelos desde la carpeta models
# from aplicación.models.salon import Salon 

router = APIRouter(prefix="/salones", tags=["Salones"])

# Ejemplo de endpoint para listar salones disponibles
@router.get("/")
def listar_salones():
    return [
        {"id": 1, "nombre": "Salón Dorado", "capacidad": 150, "precio": 50000},
        {"id": 2, "nombre": "Salón Cristal", "capacidad": 80, "precio": 30000}
    ]

# Ejemplo de endpoint para obtener un salón por id
@router.get("/{salon_id}")
def obtener_salon(salon_id: int):
    # Aquí consultarías a tu base de datos (db.py)
    if salon_id == 1:
        return {"id": 1, "nombre": "Salón Dorado", "capacidad": 150}
    raise HTTPException(status_code=404, detail="Salón no encontrado")