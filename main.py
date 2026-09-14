from fastapi import FastAPI
from app.api.v1.productos.router import router as productos_router

app = FastAPI(
    title="API Catálogo de Productos",
    description="API REST modularizada con arquitectura de capas."
)

app.include_router(productos_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de Productos"}                                                                                                                                                                                                                                               