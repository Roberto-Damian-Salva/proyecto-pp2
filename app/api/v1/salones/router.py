from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.api.v1.salones.schemas import SalonCreate, SalonResponse
from app.api.v1.salones.repository import crear_salon, obtener_salones

router = APIRouter()  # ✅ sin prefix aquí

@router.post("/", response_model=SalonResponse)
def crear_salon_endpoint(salon: SalonCreate, db: Session = Depends(get_db)):
    return crear_salon(db, salon)

@router.get("/", response_model=list[SalonResponse])
def obtener_salones_endpoint(capacidad_min: int = 0, db: Session = Depends(get_db)):
    return obtener_salones(db, capacidad_min)
