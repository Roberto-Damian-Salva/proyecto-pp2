// Sesión: el token se guarda en localStorage
const TOKEN_KEY = 'token';
const getToken = () => localStorage.getItem(TOKEN_KEY);
const saveToken = (t) => localStorage.setItem(TOKEN_KEY, t);
const isLoggedIn = () => Boolean(getToken());
const authHeaders = () => (getToken() ? { Authorization: `Bearer ${getToken()}` } : {});
function logout() { localStorage.removeItem(TOKEN_KEY); location.href = 'login.html'; }