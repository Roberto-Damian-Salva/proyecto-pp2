from app.core.db import SessionLocal, engine, Base
from app.models.user import UserModel
from app.core.security import hashear

Base.metadata.create_all(bind=engine)
db = SessionLocal()
db.query(UserModel).delete()
db.commit()

admin = UserModel(
    nombre='Admin',
    email='admin@test.com',
    password_hash=hashear('admin123'),
    rol='admin'
)
comun = UserModel(
    nombre='Cliente',
    email='comun@test.com',
    password_hash=hashear('comun123'),
    rol='cliente'
)
db.add_all([admin, comun])
db.commit()
print("Creados OK:")
for u in db.query(UserModel).all():
    print(u.id, u.nombre, u.email, u.rol)
