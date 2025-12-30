// Referencias a los iframes
const iframeRealSporting = document.getElementById('iframe-real-sporting');
const iframeSportingAtletico = document.getElementById('iframe-sporting-atletico');
const iframeSportingFemenino = document.getElementById('iframe-sporting-femenino');
const iframeJuvenilA = document.getElementById('iframe-juvenil-a');

// Datos de imágenes de partidos para cada equipo
const matchesData = {
    'real-sporting': [
        'https://via.placeholder.com/400x225/D50032/ffffff?text=Partido+1',
        'https://via.placeholder.com/400x225/D50032/ffffff?text=Partido+2',
        'https://via.placeholder.com/400x225/D50032/ffffff?text=Partido+3',
        'https://via.placeholder.com/400x225/D50032/ffffff?text=Partido+4',
        'https://via.placeholder.com/400x225/D50032/ffffff?text=Partido+5',
        'https://via.placeholder.com/400x225/D50032/ffffff?text=Partido+6',
        'https://via.placeholder.com/400x225/D50032/ffffff?text=Partido+7',
        'https://via.placeholder.com/400x225/D50032/ffffff?text=Partido+8'
    ],
    'sporting-atletico': [
        'https://via.placeholder.com/400x225/2196F3/ffffff?text=Partido+1',
        'https://via.placeholder.com/400x225/2196F3/ffffff?text=Partido+2',
        'https://via.placeholder.com/400x225/2196F3/ffffff?text=Partido+3',
        'https://via.placeholder.com/400x225/2196F3/ffffff?text=Partido+4',
        'https://via.placeholder.com/400x225/2196F3/ffffff?text=Partido+5'
    ],
    'sporting-femenino': [
        'https://via.placeholder.com/400x225/E91E63/ffffff?text=Partido+1',
        'https://via.placeholder.com/400x225/E91E63/ffffff?text=Partido+2',
        'https://via.placeholder.com/400x225/E91E63/ffffff?text=Partido+3',
        'https://via.placeholder.com/400x225/E91E63/ffffff?text=Partido+4',
        'https://via.placeholder.com/400x225/E91E63/ffffff?text=Partido+5',
        'https://via.placeholder.com/400x225/E91E63/ffffff?text=Partido+6'
    ],
    'juvenil-a': [
        'https://via.placeholder.com/400x225/4CAF50/ffffff?text=Partido+1',
        'https://via.placeholder.com/400x225/4CAF50/ffffff?text=Partido+2',
        'https://via.placeholder.com/400x225/4CAF50/ffffff?text=Partido+3',
        'https://via.placeholder.com/400x225/4CAF50/ffffff?text=Partido+4'
    ]
};

// Variables del carrusel
let currentTeam = 'real-sporting';
let currentIndex = 0;
const cardsVisible = 3;

// Función para generar las tarjetas de partidos
function generateMatchCards(team) {
    const track = document.getElementById('carousel-track');
    const matches = matchesData[team];
    
    track.innerHTML = matches.map(matchImage => `
        <div class="match-card">
            <img src="${matchImage}" alt="Partido">
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
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= matches.length - cardsVisible;
}

// Event listeners para las flechas del carrusel
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

// Función para cambiar equipo
function changeTeam(teamId, teamName) {
    // Ocultar todos los iframes
    iframeRealSporting.classList.remove('active');
    iframeSportingAtletico.classList.remove('active');
    iframeSportingFemenino.classList.remove('active');
    iframeJuvenilA.classList.remove('active');
    
    // Mostrar el iframe correspondiente
    const iframes = {
        'real-sporting': iframeRealSporting,
        'sporting-atletico': iframeSportingAtletico,
        'sporting-femenino': iframeSportingFemenino,
        'juvenil-a': iframeJuvenilA
    };
    
    iframes[teamId].classList.add('active');
    
    // Actualizar texto del dropdown
    document.getElementById('dropdown-text').textContent = teamName;
    
    // Actualizar carrusel
    currentTeam = teamId;
    generateMatchCards(teamId);
}

// Dropdown functionality
const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');
const dropdownItems = document.querySelectorAll('.dropdown-item');

// Toggle dropdown
dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownToggle.classList.toggle('active');
    dropdownMenu.classList.toggle('active');
});

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', () => {
    dropdownToggle.classList.remove('active');
    dropdownMenu.classList.remove('active');
});

// Prevenir que el click en el menú lo cierre
dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Event listeners para items del dropdown
dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remover active de todos los items
        dropdownItems.forEach(i => i.classList.remove('active'));
        
        // Añadir active al item seleccionado
        item.classList.add('active');
        
        // Cambiar equipo
        const teamId = item.getAttribute('data-team');
        const teamName = item.querySelector('span').textContent;
        changeTeam(teamId, teamName);
        
        // Cerrar dropdown
        dropdownToggle.classList.remove('active');
        dropdownMenu.classList.remove('active');
    });
});

// Inicializar el carrusel con el equipo por defecto
generateMatchCards(currentTeam);

// Modo noche/día
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Verificar si hay una preferencia guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Toggle del tema
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});
