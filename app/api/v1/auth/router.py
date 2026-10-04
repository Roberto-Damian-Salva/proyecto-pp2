from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.security import hash_password, verify_password, crear_token
from app.models.user import UserModel
from app.api.v1.auth.schemas import RegisterIn, LoginIn, TokenOut

router = APIRouter(tags=["Auth"])

@router.post("/register", status_code=status.HTTP_201_CREATED)
def registrar(datos: RegisterIn, db: Session = Depends(get_db)):
    if db.query(UserModel).filter(UserModel.email == datos.email.lower()).first():
        raise HTTPException(status_code=400, detail="Ese correo ya está registrado")
    usuario = UserModel(
        nombre=datos.nombre,
        email=datos.email.lower(),
        password_hash=hash_password(datos.password),
    )
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return {"id": usuario.id, "nombre": usuario.nombre, "email": usuario.email}

@router.post("/login", response_model=TokenOut)
def login(datos: LoginIn, db: Session = Depends(get_db)):
    usuario = db.query(UserModel).filter(UserModel.email == datos.email.lower()).first()
    if not usuario or not verify_password(datos.password, usuario.password_hash):
        raise HTTPException(status_code=401, detail="Correo o contraseña incorrectos")
    return TokenOut(access_token=crear_token(usuario.id))