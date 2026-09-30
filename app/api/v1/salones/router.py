from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from app.core.db import get_db
from app.api.v1.salones.schemas import SalonCreate, SalonResponse
from app.api.v1.salones import repository

router = APIRouter(prefix="/salones", tags=["Salones"])

@router.post("/", response_model=SalonResponse, status_code=status.HTTP_201_CREATED)
def crear(salon_in: SalonCreate, db: Session = Depends(get_db)):
    return repository.crear_salon(db, salon_in)

@router.get("/", response_model=List[SalonResponse])
def listar(db: Session = Depends(get_db)):
    return repository.obtener_salones(db)