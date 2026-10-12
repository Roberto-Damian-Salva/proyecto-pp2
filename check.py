from app.core.db import SessionLocal
from app.models.user import UserModel

db = SessionLocal()
users = db.query(UserModel).all()
print(f"Tienes {len(users)} usuarios:")
for u in users:
    print(u.id, u.email, u.rol)