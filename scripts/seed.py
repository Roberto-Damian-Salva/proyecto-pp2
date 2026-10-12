import app.main  # noqa: F401  (crea las tablas)
from app.core.db import SessionLocal
from app.models.salon import SalonModel, TipoEvento

db = SessionLocal()

if db.query(SalonModel).count() == 0:
    tipos = {
        n: TipoEvento(nombre=n)
        for n in ["cumpleaños", "casamiento", "empresarial", "quince"]
    }
    db.add_all(tipos.values())

    db.add_all([
        SalonModel(
            nombre="Salón Aurora",
            descripcion="Amplio y luminoso, ideal para bodas.",
            direccion="Av. Belgrano 1200, Salta",
            capacidad=200,
            precio_por_hora=60000,
            servicios=["catering", "sonido", "estacionamiento"],
            imagenes=["https://picsum.photos/seed/aurora/800/500"],
            tipos=[tipos["casamiento"], tipos["quince"]],
        ),
        SalonModel(
            nombre="Salón Cumbres",
            descripcion="Cálido y moderno para reuniones y celebraciones.",
            direccion="Mitre 340, Salta",
            capacidad=80,
            precio_por_hora=30000,
            servicios=["sonido", "proyector"],
            imagenes=["https://picsum.photos/seed/cumbres/800/500"],
            tipos=[tipos["empresarial"], tipos["cumpleaños"]],
        ),
        SalonModel(
            nombre="Quinta Los Aromos",
            descripcion="Con parque, pileta y parrilla.",
            direccion="Ruta 51 km 5, Salta",
            capacidad=120,
            precio_por_hora=45000,
            servicios=["catering", "estacionamiento", "parrilla"],
            imagenes=["https://picsum.photos/seed/aromos/800/500"],
            tipos=[tipos["cumpleaños"], tipos["casamiento"]],
        ),
    ])
    db.commit()
    print("Datos de prueba cargados")
else:
    print("Ya hay salones, no se cargó nada")

db.close()