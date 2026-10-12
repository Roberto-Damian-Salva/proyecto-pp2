let salonesOriginales = [];

async function cargarSalones() {
  mostrarEstado("Cargando salones...");
  try {
    salonesOriginales = await getSalones(); // obtiene datos del backend
    aplicarFiltros(); // renderiza después de cargar
  } catch (err) {
    mostrarEstado("Error al cargar salones");
    console.error(err);
  }
}

function aplicarFiltros() {
  const texto = document.getElementById('input-busqueda').value.trim().toLowerCase();
  const capMin = Number(document.getElementById('select-capacidad').value);
  const categoria = document.getElementById('select-categoria').value;

  const filtrados = salonesOriginales.filter((s) =>
    (s.nombre || '').toLowerCase().includes(texto) &&
    Number(s.capacidad || 0) >= capMin &&
    (categoria === '' || s.categoria === categoria)
  );

  renderizarSalones(filtrados);
  hidratarIconos(); // hidrata los iconos de las tarjetas
}

// Función para reservar salón
function reservarSalon(id) {
  const salon = salonesOriginales.find((s) => s.id === id);
  if (salon) {
    abrirModal(salon);
  } else {
    console.error("No se encontró el salón con id:", id);
  }
}