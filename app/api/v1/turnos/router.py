from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.db import get_db
from app.api.v1.turnos.schemas import TurnoCreate, TurnoResponse
from app.api.v1.turnos import repository

router = APIRouter(prefix="/turnos", tags=["Turnos"])

@router.post("/", response_model=TurnoResponse, status_code=status.HTTP_201_CREATED)
def reservar(turno_in: TurnoCreate, db: Session = Depends(get_db)):
    if repository.obtener_turno_solapado(db, turno_in.salon_id, turno_in.fecha_inicio, turno_in.fecha_fin):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El salón ya se encuentra reservado en ese horario."
        )
    return repository.crear_turno(db, turno_in, cliente_id=1)

@router.get("/", response_model=List[TurnoResponse])
def listar(db: Session = Depends(get_db)):
    return repository.obtener_turnos(db)