import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app import models  # noqa: F401  (registra todos los modelos antes de crear tablas)
from app.api.v1.router import api_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sistema de Turnos")

# Orígenes permitidos: Vite en local y la URL de Vercel en producción
origenes = ["http://localhost:5173"]
if os.getenv("FRONTEND_URL"):
    origenes.append(os.getenv("FRONTEND_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origenes,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")