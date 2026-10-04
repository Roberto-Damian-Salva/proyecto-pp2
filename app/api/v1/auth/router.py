from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.api.v1.auth.schemas import UserCreate, UserLogin, Token

# --- DECLARAR EL ROUTER ---
router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Lógica de registro de usuario
    return {"mensaje": "Usuario registrado exitosamente"}

@router.post("/login", response_model=Token)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    # Lógica de autenticación y generación de JWT
    return {"access_token": "token_de_prueba", "token_type": "bearer"}