from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from app.core.db import get_db
from app.api.v1.salones.schemas import SalonCreate, SalonResponse
from app.api.v1.salones import repository
from datetime import date, datetime, time, timedelta
from fastapi import HTTPException
from app.models.salon import SalonModel
from app.models.turno import TurnoModel

router = APIRouter(tags=["Salones"]) 



@router.post("/", response_model=SalonResponse, status_code=status.HTTP_201_CREATED)
def crear(salon_in: SalonCreate, db: Session = Depends(get_db)):
    return repository.crear_salon(db, salon_in)

@router.get("/", response_model=List[SalonResponse])
def listar(db: Session = Depends(get_db)):
    return repository.obtener_salones(db)

@router.get("/{salon_id}/disponibilidad")
def disponibilidad(salon_id: int, fecha: date, db: Session = Depends(get_db)):
    if not db.get(SalonModel, salon_id):
        raise HTTPException(status_code=404, detail="Salón no encontrado")

    dia_ini = datetime.combine(fecha, time.min)
    dia_fin = dia_ini + timedelta(days=1)
    ocupados = db.query(TurnoModel).filter(
        TurnoModel.salon_id == salon_id,
        TurnoModel.estado != "cancelado",
        TurnoModel.fecha_inicio < dia_fin,
        TurnoModel.fecha_fin > dia_ini,
    ).all()

    libres = []
    for hora in range(10, 24):  # horarios de 10:00 a 23:00, de a una hora
        ini = dia_ini + timedelta(hours=hora)
        fin = ini + timedelta(hours=1)
        if not any(t.fecha_inicio < fin and t.fecha_fin > ini for t in ocupados):
            libres.append(f"{hora:02d}:00")
    return {"fecha": fecha, "horarios_libres": libres}