// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los botones y los iframes
    const btnRealSporting = document.getElementById('btn-real-sporting');
    const btnSportingAtletico = document.getElementById('btn-sporting-atletico');
    const btnSportingFemenino = document.getElementById('btn-sporting-femenino');
    const btnJuvenilA = document.getElementById('btn-juvenil-a');

    const iframeRealSporting = document.getElementById('iframe-real-sporting');
    const iframeSportingAtletico = document.getElementById('iframe-sporting-atletico');
    const iframeSportingFemenino = document.getElementById('iframe-sporting-femenino');
    const iframeJuvenilA = document.getElementById('iframe-juvenil-a');

    // Datos de imágenes de partidos para cada equipo (placeholder por ahora)
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

    // ============================================
    // MODO DÍA/NOCHE
    // ============================================

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Verificar que el botón existe antes de continuar
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        
        // Cargar preferencia guardada
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
        
        // Event listener para cambiar el tema
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Cambiar el icono
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
