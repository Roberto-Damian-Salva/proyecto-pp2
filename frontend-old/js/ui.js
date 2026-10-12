// Crear elementos seguros contra XSS
function crearEl(tag, props = {},...hijos) {
  const nodo = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') nodo.className = v;
    else if (k === 'text') nodo.textContent = v;
    else if (k.startsWith('on')) nodo.addEventListener(k.slice(2), v);
    else nodo.setAttribute(k, v);
  }
  nodo.append(...hijos.filter((h) => h!= null && h!== false));
  return nodo;
}

// Este solo crea la etiqueta <i> que después hidrata icons.js
function iconoTag(nombre, size) {
  const i = document.createElement("i");
  i.setAttribute("data-icon", nombre);
  i.setAttribute("data-size", size);
  return i;
}

function mostrarEstado(texto, botonTexto, onBoton) {
  document.getElementById('salones-grid').replaceChildren(
    crearEl('div', { class: 'state-box' },
      crearEl('p', { text: texto }),
      botonTexto? crearEl('button', { class: 'btn-outline', type: 'button', text: botonTexto, onclick: onBoton }) : null
    )
  );
}

function crearTarjeta(salon) {
  const nombre = salon.nombre?? 'Salón sin nombre';
  return crearEl('article', { class: 'venue-card' },
    crearEl('div', { class: 'card-image' },
      crearEl('img', { src: 'https://images.unsplash.com/photo-1670529776180-60e4132ab90c?auto=format&fit=crop&w=1400&q=85', alt: nombre, loading: 'lazy' }),
      crearEl('button', { class: 'heart-button', type: 'button', 'aria-label': `Guardar ${nombre}` }, iconoTag('heart', 18))
    ),
    crearEl('div', { class: 'card-body' },
      crearEl('div', { class: 'card-title-row' },
        crearEl('h3', {}, crearEl('a', { href: `detalle.html?id=${salon.id}`, text: nombre }))
      ),
      crearEl('p', { text: salon.descripcion?? 'Sin descripción disponible.' }),
      crearEl('div', { class: 'card-meta' },
        crearEl('span', {}, iconoTag('users', 16), ` Hasta ${salon.capacidad?? 'N/A'}`)
      ),
      crearEl('button', { class: 'text-button', type: 'button', onclick: () => reservarSalon(salon.id) },
        'Reservar ', iconoTag('arrow', 17))
    )
  );
}

function renderizarSalones(salones) {
  if (!salones.length) {
    return mostrarEstado('No hay salones que coincidan con la búsqueda.');
  }
  document.getElementById('salones-grid').replaceChildren(...salones.map(crearTarjeta));
  hidratarIconos(); // <-- IMPORTANTE: hidrata después de crear las tarjetas
}

// Modal
function abrirModal(salon) {
  document.getElementById('modal-titulo').textContent = `Reservar ${salon.nombre || 'salón'}`;
  document.getElementById('reserva-salon-id').value = salon.id;
  document.getElementById('reserva-fecha').min = new Date().toISOString().split('T')[0];
  document.getElementById('modal-reserva').classList.remove('hidden');
}

function cerrarModal() {
  document.getElementById('modal-reserva').classList.add('hidden');
  document.getElementById('form-reserva').reset();
}