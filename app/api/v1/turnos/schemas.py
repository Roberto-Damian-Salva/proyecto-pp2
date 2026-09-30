from datetime import datetime
from pydantic import BaseModel

class TurnoCreate(BaseModel):
    salon_id: int
    fecha_inicio: datetime
    fecha_fin: datetime

class TurnoResponse(BaseModel):
    id: int
    cliente_id: int
    salon_id: int
    fecha_inicio: datetime
    fecha_fin: datetime
    estado: str

    class Config:
        from_attributes = True