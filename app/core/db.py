from app.models.categoria import Categoria
from app.models.producto import Producto

categorias: list[Categoria] = [
    Categoria(id=1, nombre="Electrónica"),
    Categoria(id=2, nombre="Hogar"),
    Categoria(id=3, nombre="Librería")
]

productos: list[Producto] = [
    Producto(id=1, nombre="Notebook i7", precio=1200.0, stock=10, categoria_id=1),
    Producto(id=2, nombre="Auriculares Bluetooth", precio=150.0, stock=25, categoria_id=1),
    Producto(id=3, nombre="Cafetera Express", precio=300.0, stock=8, categoria_id=2),
    Producto(id=4, nombre="Aspiradora Robot", precio=450.0, stock=5, categoria_id=2),
    Producto(id=5, nombre="Cuaderno A4", precio=12.0, stock=100, categoria_id=3),
    Producto(id=6, nombre="Lapicera Gel Pack x3", precio=8.0, stock=50, categoria_id=3)
]

_producto_id_counter = len(productos)

def bump_producto_id() -> int:
    global _producto_id_counter
    _producto_id_counter += 1
    return _producto_id_counter