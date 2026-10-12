import { useState } from "react";

export default function GaleriaSalon({ imagenes = [], nombre }) {
  const [actual, setActual] = useState(0);

  if (imagenes.length === 0) {
    return <div className="galeria galeria--vacia">Sin fotos</div>;
  }

  return (
    <div className="galeria">
      <img
        className="galeria__principal"
        src={imagenes[actual]}
        alt={nombre}
      />
      {imagenes.length > 1 && (
        <div className="galeria__miniaturas">
          {imagenes.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${nombre} ${i + 1}`}
              className={i === actual ? "activa" : ""}
              onClick={() => setActual(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}