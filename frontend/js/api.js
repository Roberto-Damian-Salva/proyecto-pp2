const API_URL = 'http://127.0.0.1:8000/api/v1';
 
// Pedido genérico: maneja errores de red y respuestas con error del servidor
async function request(path, options = {}) {
    let res;
    try {
        res = await fetch(`${API_URL}${path}`, options);
    } catch {
        throw new Error('No se pudo conectar con el servidor. Intentá de nuevo.');
    }
    if (!res.ok) {
        throw new Error('Error al conectar con el servidor');
    }
    return res.status === 204 ? null : res.json();
}
 
function getSalones() {
    return request('/salones');
}
 
/* ===== Sheila: login, registro y turnos ===== */
// true = datos de prueba. Pasar a false cuando backend tenga auth y turnos (Día 6).
const MOCK = { auth: true, turnos: true };
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const JSON_HEADERS = { 'Content-Type': 'application/json' };
 
// ⚠ Rutas y campos SUPUESTOS: confirmarlos con Juan/Marco.
async function login({ email, password }) {
    if (MOCK.auth) { await esperar(500); return { access_token: 'token-de-prueba' }; }
    return request('/auth/login', { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify({ email, password }) });
}
 
async function registrar({ nombre, email, password }) {
    if (MOCK.auth) { await esperar(500); return { ok: true }; }
    return request('/auth/register', { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify({ nombre, email, password }) });
}
 
let turnosMock = [
    { id: 1, salon: 'Palacio Esmeralda', fecha: '2026-10-10', hora: '20:00', estado: 'confirmado' },
    { id: 2, salon: 'Jardín de Olivos', fecha: '2026-11-02', hora: '13:30', estado: 'pendiente' },
    { id: 3, salon: 'Casa Magnolia', fecha: '2026-09-18', hora: '21:00', estado: 'cancelado' },
];
 
async function getMisTurnos() {
    if (MOCK.turnos) { await esperar(600); return structuredClone(turnosMock); }
    return request('/turnos', { headers: authHeaders() });
}
 
async function cancelarTurno(id) {
    if (MOCK.turnos) {
        await esperar(400);
        turnosMock = turnosMock.map((t) => (t.id === id ? { ...t, estado: 'cancelado' } : t));
        return null;
    }
    return request(`/turnos/${id}`, { method: 'PATCH', headers: { ...JSON_HEADERS, ...authHeaders() }, body: JSON.stringify({ estado: 'cancelado' }) });
}