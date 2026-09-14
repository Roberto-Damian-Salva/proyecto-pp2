from fastapi import APIRouter, HTTPException, status, Query
from typing import Optional
from app.api.v1.productos.schemas import ProductoResponse, ProductoCreate, ProductoUpdate
from app.api.v1.productos import repository

router = APIRouter(prefix="/productos", tags=["Productos"])

@router.get("", response_model=list[ProductoResponse], status_code=status.HTTP_200_OK)
def get_productos(query: Optional[str] = Query(None), categoria_id: Optional[int] = Query(None)):
    resultados = repository.list_productos()
    if categoria_id is not None:
        resultados = [p for p in resultados if p["categoria"]["id"] == categoria_id]
    if query:
        resultados = repository.search_by_nombre(query, resultados)
    return resultados

@router.get("/{id}", response_model=ProductoResponse, status_code=status.HTTP_200_OK)
def get_producto_by_id(id: int):
    producto = repository.get_by_id(id)
    if not producto:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado")
    return producto

@router.post("", response_model=ProductoResponse, status_code=status.HTTP_201_CREATED)
def create_producto(data: ProductoCreate):
    valid, msg = repository.ensure_categoria(data.categoria_id)
    if not valid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=msg)
    return repository.create(data)

@router.put("/{id}", response_model=ProductoResponse, status_code=status.HTTP_200_OK)
def update_producto(id: int, data: ProductoUpdate):
    if not repository.get_by_id(id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado")
    
    if data.categoria_id is not None:
        valid, msg = repository.ensure_categoria(data.categoria_id)
        if not valid:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=msg)
            
    return repository.update(id, data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_producto(id: int):
    if not repository.delete(id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado")
    return None