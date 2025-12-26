// Obtener referencias a los botones y los iframes
const btnRealSporting = document.getElementById('btn-real-sporting');
const btnSportingAtletico = document.getElementById('btn-sporting-atletico');
const btnSportingFemenino = document.getElementById('btn-sporting-femenino');
const btnJuvenilA = document.getElementById('btn-juvenil-a');

const iframeRealSporting = document.getElementById('iframe-real-sporting');
const iframeSportingAtletico = document.getElementById('iframe-sporting-atletico');
const iframeSportingFemenino = document.getElementById('iframe-sporting-femenino');
const iframeJuvenilA = document.getElementById('iframe-juvenil-a');

// Función para cambiar iframe
function showIframe(iframeToShow, buttonToActivate) {
    // Ocultar todos los iframes
    iframeRealSporting.classList.remove('active');
    iframeSportingAtletico.classList.remove('active');
    iframeSportingFemenino.classList.remove('active');
    iframeJuvenilA.classList.remove('active');
    
    // Desactivar todos los botones
    btnRealSporting.classList.remove('active');
    btnSportingAtletico.classList.remove('active');
    btnSportingFemenino.classList.remove('active');
    btnJuvenilA.classList.remove('active');
    
    // Mostrar el iframe seleccionado
    iframeToShow.classList.add('active');
    
    // Activar el botón seleccionado
    buttonToActivate.classList.add('active');
}

// Event listeners
btnRealSporting.addEventListener('click', () => {
    showIframe(iframeRealSporting, btnRealSporting);
});

btnSportingAtletico.addEventListener('click', () => {
    showIframe(iframeSportingAtletico, btnSportingAtletico);
});

btnSportingFemenino.addEventListener('click', () => {
    showIframe(iframeSportingFemenino, btnSportingFemenino);
});

btnJuvenilA.addEventListener('click', () => {
    showIframe(iframeJuvenilA, btnJuvenilA);
});
