from pydantic import BaseModel

class SalonCreate(BaseModel):
    nombre: str
    direccion: str
    capacidad: int
    precio_por_hora: float

class SalonResponse(SalonCreate):
    id: int

    class Config:
        from_attributes = True