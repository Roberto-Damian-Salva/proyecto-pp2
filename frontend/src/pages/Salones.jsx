import { useSalones } from "../hooks/useSalones";
import SalonCard from "../components/SalonCard";

export default function Salones() {
  const { salones, cargando, error } = useSalones();

  if (cargando) return <p>Cargando salones...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <section>
      <h1>Salones</h1>
      <div className="salones-grid">
        {salones.map((s) => (
          <SalonCard key={s.id} salon={s} />
        ))}
      </div>
    </section>
  );
}