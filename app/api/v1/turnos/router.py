from datetime import date, datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.deps import get_current_user, require_admin
from app.models.salon import SalonModel
from app.models.turno import TurnoModel
from app.api.v1.turnos.schemas import TurnoCreate, TurnoResponse, EstadoIn
from app.api.v1.turnos import repository as repo

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
@router.get("", response_model=list[TurnoResponse])
def todos(
    salon_id: int | None = None,
    fecha: date | None = None,
    estado: str | None = None,
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    return [repo.a_respuesta(t) for t in repo.listar_todos(db, salon_id, fecha, estado)]


@router.patch("/{turno_id}/estado", response_model=TurnoResponse)
def cambiar_estado(
    turno_id: int,
    data: EstadoIn,
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    if data.estado not in ("pendiente", "confirmado", "cancelado"):
        raise HTTPException(status_code=400, detail="Estado inválido")
    turno = db.get(TurnoModel, turno_id)
    if not turno:
        raise HTTPException(status_code=404, detail="Turno no encontrado")
    turno.estado = data.estado
    db.commit()
    db.refresh(turno)
    return repo.a_respuesta(turno)

from app.core.deps import get_current_user
from app.models.salon import SalonModel
from app.models.turno import TurnoModel
from app.api.v1.turnos.schemas import TurnoCreate, TurnoResponse
from app.api.v1.turnos import repository as repo

router = APIRouter()  # main.py lo monta en /api/v1/turnos


@router.post("", response_model=TurnoResponse, status_code=201)
def reservar(
    data: TurnoCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    if not db.get(SalonModel, data.salon_id):
        raise HTTPException(status_code=404, detail="Salón no encontrado")
    if data.fecha < date.today():
        raise HTTPException(status_code=400, detail="No se puede reservar en el pasado")

    inicio = datetime.combine(data.fecha, data.hora_inicio)
    fin = datetime.combine(data.fecha, data.hora_fin)
    if repo.hay_superposicion(db, data.salon_id, inicio, fin):
        raise HTTPException(status_code=409, detail="Ese horario ya está ocupado")

    return repo.a_respuesta(repo.crear_turno(db, data, user.id))


@router.get("/mios", response_model=list[TurnoResponse])
def mis_turnos(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return [repo.a_respuesta(t) for t in repo.turnos_de_cliente(db, user.id)]


@router.delete("/{turno_id}", status_code=204)
def cancelar(
    turno_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    turno = db.get(TurnoModel, turno_id)
    if not turno:
        raise HTTPException(status_code=404, detail="Turno no encontrado")
    if turno.cliente_id != user.id and user.rol != "admin":
        raise HTTPException(status_code=403, detail="No podés cancelar este turno")
    # Cancelación lógica: libera el horario y deja historial
    turno.estado = "cancelado"
    db.commit()
@router.get("", response_model=list[TurnoResponse])
def todos(
    salon_id: int | None = None,
    fecha: date | None = None,
    estado: str | None = None,
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    return [repo.a_respuesta(t) for t in repo.listar_todos(db, salon_id, fecha, estado)]


@router.patch("/{turno_id}/estado", response_model=TurnoResponse)
def cambiar_estado(
    turno_id: int,
    data: EstadoIn,
    db: Session = Depends(get_db),
    _=Depends(require_admin),
):
    if data.estado not in ("pendiente", "confirmado", "cancelado"):
        raise HTTPException(status_code=400, detail="Estado inválido")
    turno = db.get(TurnoModel, turno_id)
    if not turno:
        raise HTTPException(status_code=404, detail="Turno no encontrado")
    turno.estado = data.estado
    db.commit()
    db.refresh(turno)
    return repo.a_respuesta(turno)
