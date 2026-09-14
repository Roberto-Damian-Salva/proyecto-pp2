from typing import Optional
from app.core import db
from app.models.producto import Producto
from app.api.v1.productos.schemas import ProductoCreate, ProductoUpdate

def _find_categoria(categoria_id: int):
    for cat in db.categorias:
        if cat.id == categoria_id:
            return cat
    return None

def _to_dict(p: Producto) -> Optional[dict]:
    cat = _find_categoria(p.categoria_id)
    if not cat:
        return None
    return {
        "id": p.id,
        "nombre": p.nombre,
        "precio": p.precio,
        "stock": p.stock,
        "activo": p.activo,
        "categoria": {
            "id": cat.id,
            "nombre": cat.nombre
        }
    }

def list_productos() -> list[dict]:
    return [_to_dict(p) for p in db.productos if _to_dict(p) is not None]

def get_by_id(producto_id: int) -> Optional[dict]:
    for p in db.productos:
        if p.id == producto_id:
            return _to_dict(p)
    return None

def search_by_nombre(query: str, lista: list[dict] = None) -> list[dict]:
    if lista is None:
        lista = list_productos()
    return [p for p in lista if query.lower() in p["nombre"].lower()]

def ensure_categoria(categoria_id: int) -> tuple[bool, str]:
    if not _find_categoria(categoria_id):
        return False, f"La categoria {categoria_id} no existe"
    return True, ""

def create(data: ProductoCreate) -> dict:
    nuevo_id = db.bump_producto_id()
    nuevo_producto = Producto(
        id=nuevo_id,
        nombre=data.nombre,
        precio=data.precio,
        stock=data.stock,
        categoria_id=data.categoria_id,
        activo=True
    )
    db.productos.append(nuevo_producto)
    return _to_dict(nuevo_producto)

def update(producto_id: int, data: ProductoUpdate) -> Optional[dict]:
    for p in db.productos:
        if p.id == producto_id:
            update_data = data.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                setattr(p, key, value)
            return _to_dict(p)
    return None

def delete(producto_id: int) -> bool:
    for i, p in enumerate(db.productos):
        if p.id == producto_id:
            db.productos.pop(i)
            return True
    return False