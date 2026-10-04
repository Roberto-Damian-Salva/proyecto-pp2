/ Crea un elemento. "text" se asigna con textContent (seguro contra XSS)
function crearEl(tag, props = {}, ...hijos) {
    const nodo = document.createElement(tag);
    for (const [clave, valor] of Object.entries(props)) {
        if (valor == null || valor === false) continue;
        if (clave === 'class') nodo.className = valor;
        else if (clave === 'text') nodo.textContent = valor;
        else if (clave.startsWith('on')) nodo.addEventListener(clave.slice(2), valor);
        else nodo.setAttribute(clave, valor);
    }
    nodo.append(...hijos.filter((h) => h != null && h !== false));
    return nodo;
}
 
/* ---------- Mensajes de estado ---------- */
function mostrarEstado(texto, botonTexto, onBoton) {
    const grid = document.getElementById('salones-grid');
    grid.replaceChildren(
        crearEl('div', { class: 'state-box' },
            crearEl('p', { text: texto }),
            botonTexto
                ? crearEl('button', { class: 'btn-outline', type: 'button', text: botonTexto, onclick: onBoton })
                : null,
        )
    );
}
 
/* ---------- Tarjetas de salones ---------- */
function crearTarjeta(salon) {
    return crearEl('div', { class: 'card' },
        crearEl('h3', { text: salon.nombre ?? 'Salón sin nombre' }),
        crearEl('p', { text: salon.descripcion ?? 'Sin descripción disponible.' }),
        crearEl('div', { class: 'card-footer' },
            crearEl('span', { class: 'capacidad' },
                'Capacidad: ',
                crearEl('strong', { text: String(salon.capacidad ?? 'N/A') }),
            ),
            crearEl('button', {
                class: 'btn-reservar',
                type: 'button',
                text: 'Reservar',
                onclick: () => reservarSalon(salon.id),
            }),
        ),
    );
}
 
function renderizarSalones(salones) {
    const grid = document.getElementById('salones-grid');
    if (salones.length === 0) {
        mostrarEstado('No hay salones disponibles que coincidan con la búsqueda.');
        return;
    }
    grid.replaceChildren(...salones.map(crearTarjeta));
}
 
/* ---------- Modal de reserva ---------- */
function abrirModal(salon) {
    document.getElementById('modal-titulo').textContent = `Reservar ${salon.nombre || 'Salón'}`;
    document.getElementById('reserva-salon-id').value = salon.id;
    // No permitir fechas pasadas
    document.getElementById('reserva-fecha').min = new Date().toISOString().split('T')[0];
    document.getElementById('modal-reserva').classList.remove('hidden');
}
 
function cerrarModal() {
    document.getElementById('modal-reserva').classList.add('hidden');
    document.getElementById('form-reserva').reset();
}
 