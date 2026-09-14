from pydantic import BaseModel, Field
from typing import Optional

class ProductoBase(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=100)
    precio: float = Field(..., ge=0)

class ProductoCreate(ProductoBase):
    stock: int = Field(..., ge=0)
    categoria_id: int = Field(..., ge=1)

class ProductoUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=2, max_length=100)
    precio: Optional[float] = Field(None, ge=0)
    stock: Optional[int] = Field(None, ge=0)
    categoria_id: Optional[int] = Field(None, ge=1)
    activo: Optional[bool] = None

class CategoriaOut(BaseModel):
    id: int
    nombre: str

class ProductoResponse(ProductoBase):
    id: int
    stock: int
    activo: bool
    categoria: CategoriaOut