from fastapi import FastAPI

# Importamos la base de datos desde la carpeta core
from app.core.db import engine, Base

# Importamos los modelos para que SQLAlchemy cree las tablas si no existen
from app.models.user import UserModel
from app.models.salon import SalonModel
from app.models.turno import TurnoModel

# Importamos los routers de los módulos que creaste en v1
from app.api.v1.salones.router import router as salones_router
from app.api.v1.turnos.router import router as turnos_router

# Crear automáticamente las tablas en la BD al iniciar el servidor
Base.metadata.create_all(bind=engine)

# Inicializamos la aplicación con la información del proyecto
app = FastAPI(
    title="Sistema de Reserva de Salones",
    description="API REST modularizada en capas para la gestión de salones y turnos.",
    version="1.0.0"
)

# Conectamos las rutas de v1 a la aplicación
app.include_router(salones_router, prefix="/api/v1")
app.include_router(turnos_router, prefix="/api/v1")

# Ruta de bienvenida para verificar que el servidor responda
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