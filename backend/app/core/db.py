import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# En tu compu usa SQLite. En producción lee la variable DATABASE_URL (Supabase / PostgreSQL).
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./salones.db")

# Supabase y Render entregan "postgres://" o "postgresql://".
# SQLAlchemy necesita que se indique el driver (psycopg).
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(
        "postgres://", "postgresql+psycopg://", 1
    )
elif SQLALCHEMY_DATABASE_URL.startswith("postgresql://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(
        "postgresql://", "postgresql+psycopg://", 1
    )

es_sqlite = SQLALCHEMY_DATABASE_URL.startswith("sqlite")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    # check_same_thread solo hace falta (y solo existe) en SQLite
    connect_args={"check_same_thread": False} if es_sqlite else {},
    # En PostgreSQL revisa que la conexión siga viva antes de usarla
    pool_pre_ping=not es_sqlite,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Clase base para que la hereden los modelos (User, Salon, Turno)
Base = declarative_base()


# Función generadora para obtener la sesión de la BD en cada petición
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
