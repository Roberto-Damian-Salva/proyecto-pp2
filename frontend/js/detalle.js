function vistaDetalle(s) {
    const n = Number(s.id) || 0;
    const img = (i) => IMAGENES[(n + i) % IMAGENES.length];
    return crearEl('div', {},
        crearEl('a', { class: 'back-link', href: 'index.html#salones', text: '← Volver a los salones' }),
        crearEl('div', { class: 'detail-gallery' },
            crearEl('img', { class: 'gallery-main', src: img(0), alt: s.nombre ?? 'Salón' }),
            crearEl('img', { src: img(1), alt: '' }),
            crearEl('div', { class: 'gallery-last' }, crearEl('img', { src: img(2), alt: '' }))),
        crearEl('div', { class: 'detail-content' },
            crearEl('div', { class: 'detail-copy' },
                crearEl('span', { class: 'eyebrow' }, crearEl('span'), ' Espacio destacado'),
                crearEl('h2', { text: s.nombre ?? 'Salón sin nombre' }),
                crearEl('p', { text: s.descripcion ?? 'Sin descripción disponible.' }),
                crearEl('div', { class: 'amenities' },
                    crearEl('span', {}, icono('users'), ` Hasta ${s.capacidad ?? 'N/A'} invitados`),
                    crearEl('span', {}, icono('sparkle'), ' Coordinación incluida'))),
            crearEl('aside', { class: 'booking-card' },
                crearEl('span', { text: 'Capacidad' }),
                crearEl('strong', { text: `Hasta ${s.capacidad ?? 'N/A'}` }),
                crearEl('small', { text: 'invitados' }),
                crearEl('hr'),
                crearEl('a', { class: 'primary-button', href: 'index.html#salones', text: 'Solicitar reserva' }),
                crearEl('small', { text: 'Sin compromiso · Respuesta en 24 h' }))));
}
 
async function cargarDetalle() {
    const cont = document.getElementById('detalle');
    const id = Number(new URLSearchParams(location.search).get('id'));
    try {
        const salon = (await getSalones()).find((s) => s.id === id);
        cont.replaceChildren(salon ? vistaDetalle(salon)
            : crearEl('p', { class: 'empty-state', text: 'No encontramos ese salón.' }));
    } catch (err) {
        cont.replaceChildren(crearEl('div', { class: 'state-box' }, crearEl('p', { text: err.message }),
            crearEl('button', { class: 'btn-outline', type: 'button', text: 'Reintentar', onclick: cargarDetalle })));
    }
}
 
document.addEventListener('DOMContentLoaded', () => { montarLayout(); cargarDetalle(); });
 