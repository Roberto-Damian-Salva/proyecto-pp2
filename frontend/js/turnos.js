s · JS
const ESTADOS = { confirmado: 'Confirmado', pendiente: 'Pendiente', cancelado: 'Cancelado' };
let turnos = [];
 
const fechaLarga = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString('es-AR',
    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
 
function estadoBox(texto, extra) {
    return crearEl('div', { class: 'state-box' }, crearEl('p', { text: texto }), extra);
}
 
function setMensaje(texto, ok = false) {
    const m = document.getElementById('turnos-msg');
    m.textContent = texto;
    m.classList.toggle('is-ok', ok);
}
 
function crearTurno(t) {
    const cancelado = t.estado === 'cancelado';
    return crearEl('article', { class: `turno-card${cancelado ? ' is-cancelled' : ''}` },
        crearEl('div', {},
            crearEl('h3', { text: t.salon }),
            crearEl('p', { class: 'turno-meta', text: `${fechaLarga(t.fecha)} · ${t.hora} h` })),
        crearEl('span', { class: `badge badge-${t.estado}`, text: ESTADOS[t.estado] ?? t.estado }),
        cancelado ? null : crearEl('button', {
            class: 'btn-danger', type: 'button', text: 'Cancelar',
            onclick: (e) => cancelar(t, e.currentTarget),
        }));
}
 
function renderTurnos() {
    const lista = document.getElementById('turnos-list');
    if (!turnos.length) {
        lista.replaceChildren(estadoBox('Todavía no tenés turnos reservados.',
            crearEl('a', { class: 'primary-button', href: 'index.html#salones', text: 'Ver salones' })));
        return;
    }
    lista.replaceChildren(...turnos.map(crearTurno));
}
 
async function cargarTurnos() {
    const lista = document.getElementById('turnos-list');
    lista.replaceChildren(estadoBox('Cargando tus turnos...'));
    try { turnos = await getMisTurnos(); renderTurnos(); }
    catch (err) {
        lista.replaceChildren(estadoBox(err.message,
            crearEl('button', { class: 'btn-outline', type: 'button', text: 'Reintentar', onclick: cargarTurnos })));
    }
}
 
async function cancelar(turno, boton) {
    if (!confirm(`¿Cancelar tu turno en ${turno.salon}?`)) return;
    setMensaje('');
    boton.disabled = true; // evita el doble clic
    try {
        await cancelarTurno(turno.id);
        turno.estado = 'cancelado';
        renderTurnos();
        setMensaje('Turno cancelado.', true);
    } catch (err) { boton.disabled = false; setMensaje(err.message); }
}
 
document.addEventListener('DOMContentLoaded', () => {
    montarLayout();
    // Con auth real, quien no inició sesión vuelve al login
    if (!MOCK.auth && !isLoggedIn()) { location.href = 'login.html'; return; }
    cargarTurnos();
});
 