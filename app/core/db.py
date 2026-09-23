from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Definimos la ruta de la base de datos SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///./salones.db"

# 2. Creamos el motor de conexión
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}  # Solo necesario para SQLite
)

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