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
 