const API_URL = 'http://127.0.0.1:8000/api/v1/salones'; 

document.addEventListener('DOMContentLoaded', () => {
    obtenerSalones();
});

async function obtenerSalones() {
    const grid = document.getElementById('salones-grid');
    
    try {
        const respuesta = await fetch(API_URL);
        
        if (!respuesta.ok) {
            throw new Error('Error al conectar con el servidor');
        }

        const salones = await respuesta.json();
        grid.innerHTML = ''; // Limpiar el mensaje de carga

        if (salones.length === 0) {
            grid.innerHTML = '<p>No hay salones disponibles en este momento.</p>';
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
                    <button class="btn-reservar" onclick="reservarSalone(${salon.id})">Reservar</button>
                </div>
            `;

            grid.appendChild(card);
        });

    } catch (error) {
        console.error('Error:', error);
        grid.innerHTML = `<p style="color: red;">Error al cargar salones: ${error.message}</p>`;
    }
}

function reservarSalone(id) {
    alert(`Iniciando reserva para el salón con ID: ${id}`);
}