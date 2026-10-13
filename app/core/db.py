import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Lee el archivo .env de la raíz del proyecto
load_dotenv()

# 1. URL de la base de datos: Supabase si existe DATABASE_URL, SQLite local si no
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./salones.db")

# SQLAlchemy necesita "postgresql://", no "postgres://"
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(
        "postgres://", "postgresql://", 1
    )

# Forzamos el driver psycopg2 (el que está en requirements.txt)
if SQLALCHEMY_DATABASE_URL.startswith("postgresql://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(
        "postgresql://", "postgresql+psycopg2://", 1
    )
    
# 2. Creamos el motor de conexión
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    # check_same_thread solo es necesario para SQLite
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)

# 3. Creamos la fábrica de sesiones para interactuar con la BD
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Clase base para que la hereden los modelos (User, Salon, Turno)
Base = declarative_base()


# 5. Función generadora para obtener la sesión de la BD en cada petición
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()