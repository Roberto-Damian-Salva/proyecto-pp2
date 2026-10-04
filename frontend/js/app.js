let salonesOriginales = []; // el filtro trabaja sobre esta lista, sin volver a pedir datos
 
async function cargarSalones() {
    mostrarEstado('Cargando salones...');
    try {
        salonesOriginales = await getSalones();
        aplicarFiltros();
    } catch (error) {
        console.error('Error:', error);
        mostrarEstado(`Error al cargar salones: ${error.message}`, 'Reintentar', cargarSalones);
    }
}
 
function aplicarFiltros() {
    const texto = document.getElementById('input-busqueda').value.trim().toLowerCase();
    const capMin = Number(document.getElementById('select-capacidad').value);
    renderizarSalones(salonesOriginales.filter((s) =>
        (s.nombre || '').toLowerCase().includes(texto) && Number(s.capacidad || 0) >= capMin));
}
 
function reservarSalon(id) {
    const salon = salonesOriginales.find((s) => s.id === id);
    if (salon) abrirModal(salon);
}
 
document.addEventListener('DOMContentLoaded', () => {
    hidratarIconos();
    cargarSalones();
 
    document.getElementById('input-busqueda').addEventListener('input', aplicarFiltros);
    document.getElementById('select-capacidad').addEventListener('change', aplicarFiltros);
    document.getElementById('btn-buscar').addEventListener('click', aplicarFiltros);
 
    // Menú móvil
    const nav = document.getElementById('nav');
    document.getElementById('menu-button').addEventListener('click', () => nav.classList.toggle('open'));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) nav.classList.remove('open'); });
 
    // Modal
    document.getElementById('form-reserva').addEventListener('submit', (e) => {
        e.preventDefault();
        // Temporal: cuando exista el endpoint, acá va el POST a la API
        alert(`¡Reserva confirmada!\nFecha: ${document.getElementById('reserva-fecha').value}\nHora: ${document.getElementById('reserva-hora').value}`);
        cerrarModal();
    });
    document.getElementById('btn-cerrar-modal').addEventListener('click', cerrarModal);
    document.getElementById('btn-cancelar-modal').addEventListener('click', cerrarModal);
    document.getElementById('modal-reserva').addEventListener('click', (e) => { if (e.target.id === 'modal-reserva') cerrarModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarModal(); });
 
    // Contacto (sin backend por ahora)
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('btn-contacto').firstChild.textContent = 'Consulta enviada ';
        e.target.reset();
    });
});

