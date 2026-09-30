
from fastapi import APIRouter
from app.models.salon import router as router_salones
from app.models.turno import router as router_reservas

api_router = APIRouter()
api_router.include_router(router_salones)
api_router.include_router(router_reservas)