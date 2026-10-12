const API_URL = 'http://127.0.0.1:8000/api/v1';

// Función genérica para hacer pedidos a la API
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

/* ===== Salones ===== */
async function getSalones() {
  return [
    {
      id: 1,
      nombre: "Salon Azul",
      capacidad: 50,
      descripcion: "Un salón elegante con vista al jardín, ideal para bodas pequeñas.",
      categoria: "Bodas"
    },
    {
      id: 2,
      nombre: "Salon Dorado",
      capacidad: 150,
      descripcion: "Espacio amplio con decoración clásica",
      categoria: "Corporativo"
    },
    {
      id: 3,
      nombre: "Salon Verde",
      capacidad: 80,
      descripcion: "Decoración natural, ideal para cumpleaños y eventos al aire libre.",
      categoria: "Cumpleaños"
    }
  ];
}


function crearSalon(nuevoSalon) {
    return request('/salones/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoSalon)
    });
}

function eliminarSalon(id) {
    return request(`/salones/${id}`, { method: 'DELETE' });
}

/* ===== Auth ===== */
const MOCK = { auth: true, turnos: true };
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));
const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function login({ email, password }) {
    if (MOCK.auth) {
        await esperar(500);
        return { access_token: 'token-de-prueba' };
    }
    return request('/auth/login', {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({ email, password })
    });
}

async function registrar({ nombre, email, password }) {
    if (MOCK.auth) {
        await esperar(500);
        return { ok: true };
    }
    return request('/auth/register', {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({ nombre, email, password })
    });
}

/* ===== Turnos ===== */
let turnosMock = [
    { id: 1, salon: 'Palacio Esmeralda', fecha: '2026-10-10', hora: '20:00', estado: 'confirmado' },
    { id: 2, salon: 'Jardín de Olivos', fecha: '2026-11-02', hora: '13:30', estado: 'pendiente' },
    { id: 3, salon: 'Casa Magnolia', fecha: '2026-09-18', hora: '21:00', estado: 'cancelado' },
];

async function getMisTurnos() {
    if (MOCK.turnos) {
        await esperar(600);
        return structured}}