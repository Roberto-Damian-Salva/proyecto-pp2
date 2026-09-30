from fastapi import FastAPI

# Importamos la base de datos desde la carpeta core
from app.core.db import engine, Base

# Importamos los routers correctamente
from app.models.salon import router as salones_router
from app.api.v1.turnos.router import router as turnos_router

# Crear automáticamente las tablas en la BD
Base.metadata.create_all(bind=engine)

# Inicializamos la aplicación
app = FastAPI(
    title="Sistema de Reserva de Salones",
    description="API REST modularizada para la gestión de salones y turnos.",
    version="1.0.0"
)

# Conectamos las rutas de v1 a la aplicación
app.include_router(salones_router, prefix="/api/v1")
app.include_router(turnos_router, prefix="/api/v1")

# Ruta de bienvenida
@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API del Sistema de Reserva de Salones"}


from fastapi import FastAPI
from app.api import api_router

app = FastAPI(title="API de Reserva de Salones")

# Vinculas todas las rutas de la versión 1 con el prefijo /api/v1
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def inicio():
    return {"mensaje": "Bienvenido al sistema de reservas de salones"}