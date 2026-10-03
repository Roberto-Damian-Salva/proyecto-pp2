// Variable global para almacenar los salones en memoria
let salonesOriginales = [];

const API_URL = 'http://127.0.0.1:8000/api/v1/salones';

// Función para dibujar las tarjetas en el DOM
function renderizarSalones(salones) {
    const grid = document.getElementById('salones-grid');
    grid.innerHTML = ''; // Limpiar mensaje de carga o resultados anteriores

    if (salones.length === 0) {
        grid.innerHTML = '<p>No hay salones disponibles que coincidan con la búsqueda.</p>';
        return;
    }

    salones.forEach(salon => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <h3>${salon.nombre || 'Salón sin nombre'}</h3>
            <p>${salon.descripcion || 'Sin descripción disponible.'}</p>
            <div class="card-footer">
                <span class="capacidad">Capacidad: <strong>${salon.capacidad || 'N/A'}</strong></span>
                <button class="btn-reservar" onclick="reservarSalon(${salon.id})">Reservar</button>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Función principal para obtener datos de la API
async function obtenerSalones() {
    const grid = document.getElementById('salones-grid');

    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error('Error al conectar con el servidor');
        }

        // Guardar respuesta en la variable global y renderizar
        salonesOriginales = await respuesta.json();
        renderizarSalones(salonesOriginales);

    } catch (error) {
        console.error('Error:', error);
        if (grid) {
            grid.innerHTML = `<p style="color: red;">Error al cargar salones: ${error.message}</p>`;
        }
    }
}

// Lógica de filtrado en tiempo real sin llamar a la API
function aplicarFiltros() {
    const inputBusqueda = document.getElementById('input-busqueda');
    const selectCapacidad = document.getElementById('select-capacidad');

    if (!inputBusqueda || !selectCapacidad) return;

    const texto = inputBusqueda.value.toLowerCase();
    const capacidadMin = Number(selectCapacidad.value);

    const filtrados = salonesOriginales.filter(salon => {
        const coincideNombre = (salon.nombre || '').toLowerCase().includes(texto);
        const coincideCapacidad = Number(salon.capacidad || 0) >= capacidadMin;
        return coincideNombre && coincideCapacidad;
    });

    renderizarSalones(filtrados);
}

// REEMPLAZAR POR ESTO:
function reservarSalon(id) {
    const salon = salonesOriginales.find(s => s.id === id);
    const modal = document.getElementById('modal-reserva');
    const titulo = document.getElementById('modal-titulo');
    const inputId = document.getElementById('reserva-salon-id');

    if (salon && modal) {
        titulo.textContent = `Reservar ${salon.nombre || 'Salón'}`;
        inputId.value = salon.id;
        modal.classList.remove('hidden');
    }
}
// Función para cerrar el modal y limpiar el formulario
function cerrarModal() {
    const modal = document.getElementById('modal-reserva');
    const form = document.getElementById('form-reserva');
    if (modal) {
        modal.classList.add('hidden');
    }
    if (form) {
        form.reset(); // Limpia la fecha y hora seleccionadas
    }
}

// Inicialización de eventos al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    obtenerSalones();

    const inputBusqueda = document.getElementById('input-busqueda');
    const selectCapacidad = document.getElementById('select-capacidad');

    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', aplicarFiltros);
    }
    if (selectCapacidad) {
        selectCapacidad.addEventListener('change', aplicarFiltros);
    }
// Manejar la confirmación del formulario de reserva
document.getElementById('form-reserva')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const salonId = document.getElementById('reserva-salon-id').value;
    const fecha = document.getElementById('reserva-fecha').value;
    const hora = document.getElementById('reserva-hora').value;

    // Confirmación temporal en pantalla
    alert(`¡Reserva confirmada!\nSalón ID: ${salonId}\nFecha: ${fecha}\nHora: ${hora}`);

    cerrarModal();
});

// Eventos para cerrar el modal al presionar la 'X' o el botón 'Cancelar'
document.getElementById('btn-cerrar-modal')?.addEventListener('click', cerrarModal);
document.getElementById('btn-cancelar-modal')?.addEventListener('click', cerrarModal);

// Cerrar el modal si se hace clic fuera del recuadro blanco
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-reserva');
    if (e.target === modal) {
        cerrarModal();
    }
});
});  