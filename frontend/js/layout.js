const RE_EMAIL = /^\S+@\S+\.\S+$/;
const MIN_PASS = 8;
 
function validarLogin(d) {
    const e = {};
    if (!RE_EMAIL.test(d.email.trim())) e.email = 'Ingresá un correo válido.';
    if (d.password.length < MIN_PASS) e.password = `La contraseña debe tener al menos ${MIN_PASS} caracteres.`;
    return e;
}
 
function validarRegistro(d) {
    const e = validarLogin(d);
    if (d.nombre.trim().length < 3) e.nombre = 'Ingresá tu nombre completo.';
    if (d.confirmar !== d.password) e.confirmar = 'Las contraseñas no coinciden.';
    return e;
}
 
function mostrarErrores(form, errores) {
    form.querySelectorAll('[data-error-for]').forEach((s) => { s.textContent = errores[s.dataset.errorFor] || ''; });
    for (const i of form.elements) if (i.name) i.setAttribute('aria-invalid', String(Boolean(errores[i.name])));
}
 
function mostrarMensaje(form, texto, ok = false) {
    const m = form.querySelector('.form-msg');
    m.textContent = texto;
    m.classList.toggle('is-ok', ok);
}
 
async function enviar(form, validar, accion) {
    const datos = Object.fromEntries(new FormData(form));
    const errores = validar(datos);
    mostrarErrores(form, errores);
    mostrarMensaje(form, '');
    if (Object.keys(errores).length) return;
 
    const btn = form.querySelector('button[type=submit]');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    try { await accion(datos); }
    catch (err) { mostrarMensaje(form, err.message); }
    finally { btn.disabled = false; btn.textContent = original; }
}
 
function mostrarTab(nombre) {
    document.querySelectorAll('[data-tab]').forEach((b) => {
        const activa = b.dataset.tab === nombre;
        b.classList.toggle('is-active', activa);
        b.setAttribute('aria-selected', String(activa));
    });
    document.getElementById('form-login').hidden = nombre !== 'login';
    document.getElementById('form-registro').hidden = nombre !== 'registro';
}
 
document.addEventListener('DOMContentLoaded', () => {
    montarLayout();
    document.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => mostrarTab(b.dataset.tab)));
 
    document.getElementById('form-login').addEventListener('submit', (e) => {
        e.preventDefault();
        enviar(e.target, validarLogin, async (d) => {
            const { access_token } = await login(d); // ⚠ confirmar nombre del campo con backend
            saveToken(access_token);
            location.href = 'turnos.html';
        });
    });
 
    document.getElementById('form-registro').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        enviar(form, validarRegistro, async (d) => {
            await registrar(d);
            form.reset();
            mostrarTab('login');
            mostrarMensaje(document.getElementById('form-login'), 'Cuenta creada. Ya podés ingresar.', true);
        });
    });
});
 