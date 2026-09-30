from sqlalchemy.orm import Session
from app.models.turno import TurnoModel
from app.api.v1.turnos.schemas import TurnoCreate

# Regla de negocio BE-05: previene reservas solapadas
def obtener_turno_solapado(db: Session, salon_id: int, fecha_inicio, fecha_fin):
    return db.query(TurnoModel).filter(
        TurnoModel.salon_id == salon_id,
        TurnoModel.estado != "cancelado",
        TurnoModel.fecha_inicio < fecha_fin,
        TurnoModel.fecha_fin > fecha_inicio
    ).first()

def crear_turno(db: Session, turno_in: TurnoCreate, cliente_id: int):
    nuevo_turno = TurnoModel(
        cliente_id=cliente_id,
        salon_id=turno_in.salon_id,
        fecha_inicio=turno_in.fecha_inicio,
        fecha_fin=turno_in.fecha_fin,
        estado="confirmado"
    )
    db.add(nuevo_turno)
    db.commit()
    db.refresh(nuevo_turno)
    return nuevo_turno

def obtener_turnos(db: Session):
    return db.query(TurnoModel).all()