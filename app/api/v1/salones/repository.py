from sqlalchemy.orm import Session
from app.models.salon import SalonModel
from app.api.v1.salones.schemas import SalonCreate

def crear_salon(db: Session, salon_in: SalonCreate):
    nuevo_salon = SalonModel(
        nombre=salon_in.nombre,
        direccion=salon_in.direccion,
        capacidad=salon_in.capacidad,
        precio_por_hora=salon_in.precio_por_hora
    )
    db.add(nuevo_salon)
    db.commit()
    db.refresh(nuevo_salon)
    return nuevo_salon

def obtener_salones(db: Session):
    return db.query(SalonModel).all()