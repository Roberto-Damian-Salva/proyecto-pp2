import app.main  # noqa: F401  (crea las tablas)
from app.core.db import SessionLocal
from app.core.security import hashear
from app.models.user import UserModel

db = SessionLocal()

if not db.query(UserModel).filter(UserModel.email == "admin@turnos.com").first():
    db.add(
        UserModel(
            nombre="Admin",
            email="admin@turnos.com",
            password_hash=hashear("admin1234"),
            rol="admin",
        )
    )
    db.commit()
    print("Admin creado: admin@turnos.com / admin1234")
else:
    print("El admin ya existe")

db.close()