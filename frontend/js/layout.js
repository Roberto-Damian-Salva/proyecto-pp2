
// Header y footer para login, turnos y detalle (index.html ya los trae)
function montarLayout() {
    document.getElementById('header-host').outerHTML = `
    <header class="site-header">
        <a class="brand" href="index.html" aria-label="Aurea Salones, inicio">
            <span class="brand-mark"><i data-icon="sparkle" data-size="17"></i></span>
            <span>AUREA<small>SALONES</small></span>
        </a>
        <button class="menu-button" id="menu-button" type="button" aria-label="Abrir menú"><i data-icon="menu"></i></button>
        <nav class="nav" id="nav">
            <a href="index.html#salones">Salones</a>
            <a href="turnos.html">Mis turnos</a>
            <a href="index.html#contacto">Contacto</a>
            <a class="nav-cta" href="login.html">Ingresar <i data-icon="arrow" data-size="16"></i></a>
        </nav>
    </header>`;
    document.getElementById('footer-host').outerHTML = `
    <footer><div class="footer-bottom"><span>© 2026 Aurea Salones · PP2 Grupo 8</span><span>Hecho con cuidado para celebrar lo extraordinario</span></div></footer>`;
 
    const nav = document.getElementById('nav');
    document.getElementById('menu-button').addEventListener('click', () => nav.classList.toggle('open'));
    hidratarIconos();
}
 