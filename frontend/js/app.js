import { FormEvent, useState } from "react";

type IconName =
  | "arrow"
  | "calendar"
  | "chevron"
  | "clock"
  | "heart"
  | "instagram"
  | "mail"
  | "map"
  | "menu"
  | "phone"
  | "pin"
  | "search"
  | "sparkle"
  | "star"
  | "users";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5a5.5 5.5 0 0 0 1-8.9Z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    map: <><path d="m3 6 5-3 8 3 5-3v15l-5 3-8-3-5 3Z" /><path d="M8 3v15M16 6v15" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c1 .4 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    sparkle: <><path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z" /></>,
    star: <path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4-4.6-4.5 6.4-.9Z" />,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const venues = [
  {
    name: "Palacio Esmeralda",
    location: "Madrid · Salamanca",
    description: "Arquitectura clásica, jardines privados y una atmósfera inolvidable.",
    longDescription: "Un palacio urbano lleno de luz donde la arquitectura histórica convive con todas las comodidades contemporáneas. Sus salones comunicados, el jardín privado y un servicio impecable crean el escenario perfecto para celebraciones que merecen ser recordadas.",
    price: "3.200 €",
    rating: "4.9",
    reviews: 128,
    capacity: 250,
    image: "https://images.unsplash.com/photo-1665607437981-973dcd6a22bb?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1665607437981-973dcd6a22bb?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1670529776286-f426fb7ba42c?auto=format&fit=crop&w=1000&q=85",
    ],
  },
  {
    name: "Jardín de Olivos",
    location: "Toledo · Cigarrales",
    description: "Naturaleza, vistas abiertas y atardeceres dorados a pocos minutos de la ciudad.",
    longDescription: "Una finca mediterránea rodeada de olivos centenarios. Sus espacios al aire libre y su elegante salón acristalado permiten disfrutar del paisaje durante todo el año.",
    price: "2.450 €",
    rating: "4.8",
    reviews: 96,
    capacity: 180,
    image: "https://images.unsplash.com/photo-1670529776180-60e4132ab90c?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1670529776180-60e4132ab90c?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1578730169862-749bbdc763a8?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1708569176850-9de9aa6b179b?auto=format&fit=crop&w=1000&q=85",
    ],
  },
  {
    name: "Casa Magnolia",
    location: "Segovia · La Granja",
    description: "Un refugio íntimo con encanto histórico para celebraciones muy personales.",
    longDescription: "Una casa señorial cuidadosamente restaurada con rincones singulares, patios de piedra y una cuidada propuesta gastronómica de temporada.",
    price: "1.890 €",
    rating: "4.7",
    reviews: 74,
    capacity: 120,
    image: "https://images.unsplash.com/photo-1712314947761-a8d718bd8c32?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1712314947761-a8d718bd8c32?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1521543387600-c745f8e83d77?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1721677337543-37b07e7e28b5?auto=format&fit=crop&w=1000&q=85",
    ],
  },
];

function Stars({ value = 5 }: { value?: number }) {
  return (
    <span className="stars" aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => <Icon key={star} name="star" size={14} />)}
    </span>
  );
}

export default function App() {
  const [selected, setSelected] = useState(0);
  const [price, setPrice] = useState(3500);
  const [rating, setRating] = useState(4);
  const [location, setLocation] = useState("Madrid");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const venue = venues[selected];

  const showVenue = (index: number) => {
    setSelected(index);
    window.setTimeout(() => document.querySelector("#detalle")?.scrollIntoView({ behavior: "smooth" }), 30);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Aurea Salones, inicio">
          <span className="brand-mark"><Icon name="sparkle" size={17} /></span>
          <span>AUREA<small>SALONES</small></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú"><Icon name="menu" /></button>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#salones">Salones</a>
          <a href="#experiencia">La experiencia</a>
          <a href="#contacto">Contacto</a>
          <a className="nav-cta" href="#salones">Explorar espacios <Icon name="arrow" size={16} /></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <img src="https://images.unsplash.com/photo-1670529776286-f426fb7ba42c?auto=format&fit=crop&w=2000&q=90" alt="Salón elegante preparado para una celebración" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="eyebrow light"><span /> Espacios extraordinarios</span>
          <h1>Encuentra el salón perfecto <em>para tu evento</em></h1>
          <p>Lugares singulares, seleccionados para convertir cada celebración en un recuerdo inolvidable.</p>
          <a className="primary-button" href="#salones">Reservar ahora <Icon name="arrow" size={18} /></a>
        </div>
        <div className="hero-note"><Icon name="sparkle" size={16} /> Selección personalizada</div>
      </section>

      <section className="filter-wrap" aria-label="Buscar salones">
        <div className="filter-panel">
          <label><span><Icon name="users" size={17} /> Capacidad</span><select defaultValue=""><option value="" disabled>N.º de invitados</option><option>Hasta 100</option><option>100 – 200</option><option>Más de 200</option></select></label>
          <label><span><Icon name="calendar" size={17} /> Fecha</span><input type="date" /></label>
          <label><span><Icon name="pin" size={17} /> Ubicación</span><select value={location} onChange={(e) => setLocation(e.target.value)}><option>Madrid</option><option>Toledo</option><option>Segovia</option></select></label>
          <label className="price-filter"><span>Precio máximo <strong>{price.toLocaleString("es-ES")} €</strong></span><input type="range" min="1000" max="5000" step="100" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></label>
          <label><span><Icon name="star" size={17} /> Valoración</span><select value={rating} onChange={(e) => setRating(Number(e.target.value))}><option value={5}>5 estrellas</option><option value={4}>4+ estrellas</option><option value={3}>3+ estrellas</option></select></label>
          <button className="search-button"><Icon name="search" /> Buscar</button>
        </div>
      </section>

      <section className="section venues-section" id="salones">
        <div className="section-heading">
          <div><span className="eyebrow"><span /> Nuestra selección</span><h2>Espacios con <em>alma propia</em></h2></div>
          <p>Cada salón ha sido elegido por su belleza, servicio excepcional y capacidad para crear momentos únicos.</p>
        </div>
        <div className="venue-grid">
          {venues.map((item, index) => (
            <article className="venue-card" key={item.name}>
              <div className="card-image">
                <img src={item.image} alt={item.name} />
                <button className="heart-button" aria-label={`Guardar ${item.name}`}><Icon name="heart" size={18} /></button>
                <span className="card-location"><Icon name="pin" size={13} /> {item.location}</span>
              </div>
              <div className="card-body">
                <div className="card-title-row"><h3>{item.name}</h3><span className="rating"><Icon name="star" size={14} /> {item.rating}</span></div>
                <p>{item.description}</p>
                <div className="card-meta"><span><Icon name="users" size={16} /> Hasta {item.capacity}</span><span>Desde <strong>{item.price}</strong></span></div>
                <button className="text-button" onClick={() => showVenue(index)}>Ver detalles <Icon name="arrow" size={17} /></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-section" id="detalle">
        <div className="detail-gallery">
          <img className="gallery-main" src={venue.gallery[0]} alt={`Vista principal de ${venue.name}`} />
          <img src={venue.gallery[1]} alt={`Montaje de evento en ${venue.name}`} />
          <div className="gallery-last"><img src={venue.gallery[2]} alt={`Ambiente de ${venue.name}`} /><span>+12 fotos</span></div>
        </div>
        <div className="detail-content">
          <div className="detail-copy">
            <span className="eyebrow"><span /> Espacio destacado</span>
            <h2>{venue.name}</h2>
            <div className="detail-meta"><span><Icon name="pin" size={16} /> {venue.location}</span><span><Stars /> {venue.rating} ({venue.reviews} reseñas)</span></div>
            <p>{venue.longDescription}</p>
            <div className="amenities"><span><Icon name="users" /> Hasta {venue.capacity} invitados</span><span><Icon name="clock" /> Disponibilidad flexible</span><span><Icon name="sparkle" /> Coordinación incluida</span></div>
          </div>
          <aside className="booking-card">
            <span>Desde</span><strong>{venue.price}</strong><small>alquiler del espacio</small>
            <hr />
            <div><span>Próxima fecha disponible</span><b>14 de septiembre</b></div>
            <a className="primary-button" href="#contacto">Solicitar reserva <Icon name="arrow" size={18} /></a>
            <small>Sin compromiso · Respuesta en 24 h</small>
          </aside>
        </div>
        <div className="testimonial">
          <div className="quote-mark">“</div>
          <div><Stars /><blockquote>Todo fue impecable, desde la primera visita hasta el último baile. El equipo hizo que nuestra celebración se sintiera verdaderamente nuestra.</blockquote><p>Laura &amp; Marcos <span>· Celebración en junio</span></p></div>
          <span className="review-count">4.9<small>128 reseñas verificadas</small></span>
        </div>
      </section>

      <section className="map-section" id="experiencia">
        <div className="map-copy">
          <span className="eyebrow light"><span /> Cerca de ti</span>
          <h2>Descubre espacios <em>en tu zona</em></h2>
          <p>Explora nuestra selección en el mapa y encuentra el escenario perfecto cerca de ti.</p>
          <div className="map-list">
            {venues.map((item, index) => <button key={item.name} className={selected === index ? "active" : ""} onClick={() => setSelected(index)}><span>{index + 1}</span><div><strong>{item.name}</strong><small>{item.location}</small></div><Icon name="chevron" /></button>)}
          </div>
        </div>
        <div className="map-visual" aria-label="Mapa con ubicaciones de salones">
          <div className="map-roads road-one" /><div className="map-roads road-two" /><div className="map-roads road-three" />
          {venues.map((item, index) => <button key={item.name} onClick={() => setSelected(index)} className={`map-pin pin-${index + 1} ${selected === index ? "active" : ""}`} aria-label={item.name}><span>{index + 1}</span><small>{item.name}</small></button>)}
          <button className="nearby-button"><Icon name="map" size={18} /> Ver salones cercanos</button>
        </div>
      </section>

      <section className="contact-section" id="contacto">
        <div className="contact-intro">
          <span className="eyebrow"><span /> Hablemos</span>
          <h2>Tu celebración empieza <em>aquí</em></h2>
          <p>Cuéntanos qué imaginas. Nuestro equipo te ayudará a encontrar el espacio y los detalles perfectos para tu evento.</p>
          <div className="contact-details">
            <span><Icon name="phone" /><small>Llámanos<strong>+34 910 245 680</strong></small></span>
            <span><Icon name="mail" /><small>Escríbenos<strong>hola@aureasalones.es</strong></small></span>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row"><label>Nombre completo<input required placeholder="Tu nombre" /></label><label>Correo electrónico<input required type="email" placeholder="tu@email.com" /></label></div>
          <div className="form-row"><label>Teléfono<input required type="tel" placeholder="+34 600 000 000" /></label><label>Tipo de evento<select defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Boda</option><option>Evento corporativo</option><option>Celebración privada</option></select></label></div>
          <label>Cuéntanos sobre tu evento<textarea required rows={4} placeholder="Fecha, número de invitados y todo aquello que sea importante para ti..." /></label>
          <button className="primary-button" type="submit">{sent ? "Consulta enviada" : "Enviar consulta"} <Icon name={sent ? "sparkle" : "arrow"} size={18} /></button>
          <small>Al enviar aceptas nuestra política de privacidad.</small>
        </form>
      </section>

      <footer>
        <div className="footer-main">
          <div><a className="brand footer-brand" href="#inicio"><span className="brand-mark"><Icon name="sparkle" size={17} /></span><span>AUREA<small>SALONES</small></span></a><p>Espacios excepcionales para momentos que permanecen.</p></div>
          <div><h4>Explora</h4><a href="#salones">Nuestros salones</a><a href="#experiencia">Cómo funciona</a><a href="#contacto">Contacto</a></div>
          <div><h4>Ayuda</h4><a href="#contacto">Preguntas frecuentes</a><a href="#contacto">Términos y condiciones</a><a href="#contacto">Política de privacidad</a></div>
          <div><h4>Síguenos</h4><a href="#inicio"><Icon name="instagram" size={17} /> Instagram</a><a href="#inicio">Pinterest</a></div>
        </div>
        <div className="footer-bottom"><span>© 2025 Aurea Salones</span><span>Hecho con cuidado para celebrar lo extraordinario</span></div>
      </footer>
    </main>
  );
}
