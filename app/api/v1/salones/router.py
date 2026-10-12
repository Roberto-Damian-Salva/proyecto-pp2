from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.models.salon import TipoEvento
from app.api.v1.salones.schemas import SalonCreate, SalonResponse
from app.api.v1.salones import repository as repo

router = APIRouter()        # main.py lo monta en /api/v1/salones
tipos_router = APIRouter()  # main.py lo monta en /api/v1/tipos-evento


@router.get("", response_model=list[SalonResponse])
def listar_salones(
    capacidad_min: int = 0,
    tipo_evento: str | None = None,
    q: str | None = None,
    db: Session = Depends(get_db),
):
    return repo.obtener_salones(db, capacidad_min, tipo_evento, q)


@router.get("/{salon_id}", response_model=SalonResponse)
def detalle_salon(salon_id: int, db: Session = Depends(get_db)):
    salon = repo.obtener_salon(db, salon_id)
    if not salon:
        raise HTTPException(status_code=404, detail="Salón no encontrado")
    return salon


@router.post("", response_model=SalonResponse, status_code=201)
def crear_salon_endpoint(salon: SalonCreate, db: Session = Depends(get_db)):
    return repo.crear_salon(db, salon)


@tipos_router.get("", response_model=list[str])
def listar_tipos(db: Session = Depends(get_db)):
    return [t.nombre for t in db.query(TipoEvento).order_by(TipoEvento.nombre)]