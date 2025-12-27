// Obtener referencias a los botones y los iframes
const btnRealSporting = document.getElementById('btn-real-sporting');
const btnSportingAtletico = document.getElementById('btn-sporting-atletico');
const btnSportingFemenino = document.getElementById('btn-sporting-femenino');
const btnJuvenilA = document.getElementById('btn-juvenil-a');

const iframeRealSporting = document.getElementById('iframe-real-sporting');
const iframeSportingAtletico = document.getElementById('iframe-sporting-atletico');
const iframeSportingFemenino = document.getElementById('iframe-sporting-femenino');
const iframeJuvenilA = document.getElementById('iframe-juvenil-a');

// Datos de partidos de ejemplo para cada equipo
const matchesData = {
    'real-sporting': [
        { rival: 'Real Oviedo', competition: 'LaLiga 2', location: 'Casa', date: '05 Ene 2025', time: '18:30', logo: 'https://via.placeholder.com/50/2196F3/ffffff?text=RO' },
        { rival: 'Racing Santander', competition: 'LaLiga 2', location: 'Fuera', date: '12 Ene 2025', time: '16:00', logo: 'https://via.placeholder.com/50/4CAF50/ffffff?text=RS' },
        { rival: 'Levante UD', competition: 'LaLiga 2', location: 'Casa', date: '19 Ene 2025', time: '21:00', logo: 'https://via.placeholder.com/50/FF9800/ffffff?text=LV' },
        { rival: 'Eldense', competition: 'LaLiga 2', location: 'Fuera', date: '26 Ene 2025', time: '18:30', logo: 'https://via.placeholder.com/50/9C27B0/ffffff?text=EL' },
        { rival: 'SD Huesca', competition: 'LaLiga 2', location: 'Casa', date: '02 Feb 2025', time: '16:00', logo: 'https://via.placeholder.com/50/00BCD4/ffffff?text=HU' },
        { rival: 'Burgos CF', competition: 'LaLiga 2', location: 'Fuera', date: '09 Feb 2025', time: '18:30', logo: 'https://via.placeholder.com/50/E91E63/ffffff?text=BU' }
    ],
    'sporting-atletico': [
        { rival: 'CD Lealtad', competition: 'Tercera Fed.', location: 'Casa', date: '05 Ene 2025', time: '12:00', logo: 'https://via.placeholder.com/50/F44336/ffffff?text=LE' },
        { rival: 'Covadonga', competition: 'Tercera Fed.', location: 'Fuera', date: '12 Ene 2025', time: '17:00', logo: 'https://via.placeholder.com/50/3F51B5/ffffff?text=CO' },
        { rival: 'Marino Luanco', competition: 'Tercera Fed.', location: 'Casa', date: '19 Ene 2025', time: '12:00', logo: 'https://via.placeholder.com/50/009688/ffffff?text=ML' },
        { rival: 'L\'Entregu', competition: 'Tercera Fed.', location: 'Fuera', date: '26 Ene 2025', time: '16:30', logo: 'https://via.placeholder.com/50/FF5722/ffffff?text=EN' }
    ],
    'sporting-femenino': [
        { rival: 'Avilés Stadium', competition: '2ª Fed. Fem.', location: 'Casa', date: '05 Ene 2025', time: '11:00', logo: 'https://via.placeholder.com/50/673AB7/ffffff?text=AS' },
        { rival: 'Oviedo Moderno', competition: '2ª Fed. Fem.', location: 'Fuera', date: '12 Ene 2025', time: '16:00', logo: 'https://via.placeholder.com/50/795548/ffffff?text=OM' },
        { rival: 'Atlético Astorga', competition: '2ª Fed. Fem.', location: 'Casa', date: '19 Ene 2025', time: '12:30', logo: 'https://via.placeholder.com/50/607D8B/ffffff?text=AA' }
    ],
    'juvenil-a': [
        { rival: 'Real Oviedo Juv.', competition: 'Liga Juvenil', location: 'Casa', date: '05 Ene 2025', time: '10:00', logo: 'https://via.placeholder.com/50/2196F3/ffffff?text=RO' },
        { rival: 'CD Lealtad Juv.', competition: 'Liga Juvenil', location: 'Fuera', date: '12 Ene 2025', time: '11:30', logo: 'https://via.placeholder.com/50/F44336/ffffff?text=LE' },
        { rival: 'UP Langreo Juv.', competition: 'Liga Juvenil', location: 'Casa', date: '19 Ene 2025', time: '10:00', logo: 'https://via.placeholder.com/50/4CAF50/ffffff?text=UL' }
    ]
};

// Variables del carrusel
let currentTeam = 'real-sporting';
let currentIndex = 0;
const cardsVisible = 4;

// Función para generar las tarjetas de partidos
function generateMatchCards(team) {
    const track = document.getElementById('carousel-track');
    const matches = matchesData[team];
    
    track.innerHTML = matches.map(match => `
        <div class="match-card">
            <div class="match-header">
                <span class="match-competition">${match.competition}</span>
                <span class="match-location">${match.location}</span>
            </div>
            <div class="match-rival">
                <img src="${match.logo}" alt="${match.rival}" class="rival-logo">
                <div class="rival-name">${match.rival}</div>
            </div>
            <div class="match-datetime">
                <div class="match-date">${match.date}</div>
                <div class="match-time">${match.time}</div>
            </div>
        </div>
    `).join('');
    
    currentIndex = 0;
    updateCarousel();
}

// Función para actualizar la posición del carrusel
function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const matches = matchesData[currentTeam];
    
    const cardWidth = 100 / cardsVisible;
    const translateX = -(currentIndex * cardWidth);
    track.style.transform = `translateX(${translateX}%)`;
    
    // Deshabilitar botones en los extremos
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= matches.length - cardsVisible;
}

// Event listeners para las flechas
document.getElementById('carousel-prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

document.getElementById('carousel-next').addEventListener('click', () => {
    const matches = matchesData[currentTeam];
    if (currentIndex < matches.length - cardsVisible) {
        currentIndex++;
        updateCarousel();
    }
});

// Función para cambiar iframe y calendario
function showIframe(iframeToShow, buttonToActivate, teamId) {
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
    
    // Actualizar el carrusel de partidos
    currentTeam = teamId;
    generateMatchCards(teamId);
}

// Event listeners actualizados
btnRealSporting.addEventListener('click', () => {
    showIframe(iframeRealSporting, btnRealSporting, 'real-sporting');
});

btnSportingAtletico.addEventListener('click', () => {
    showIframe(iframeSportingAtletico, btnSportingAtletico, 'sporting-atletico');
});

btnSportingFemenino.addEventListener('click', () => {
    showIframe(iframeSportingFemenino, btnSportingFemenino, 'sporting-femenino');
});

btnJuvenilA.addEventListener('click', () => {
    showIframe(iframeJuvenilA, btnJuvenilA, 'juvenil-a');
});

// Inicializar el carrusel con el equipo por defecto
generateMatchCards(currentTeam);
