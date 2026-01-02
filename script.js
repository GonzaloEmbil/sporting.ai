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

// Menú hamburguesa móvil
const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

// Toggle menú
hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    mobileNav.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

// Cerrar menú al hacer clic en overlay
mobileNavOverlay.addEventListener('click', () => {
    hamburgerMenu.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Toggle submenús
mobileNavItems.forEach(item => {
    const title = item.querySelector('.mobile-nav-title');
    if (title) {
        title.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    }
});

// Carrusel táctil fluido para móvil
const carousel = document.querySelector('.calendar-carousel');
const carouselTrack = document.getElementById('carousel-track');

// Solo activar en móvil
if (window.innerWidth <= 768) {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;
    
    // Touch events
    carousel.addEventListener('touchstart', dragStart, { passive: false });
    carousel.addEventListener('touchend', dragEnd);
    carousel.addEventListener('touchmove', dragMove, { passive: false });
    
    // Mouse events (para testing)
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('mouseleave', dragEnd);
    carousel.addEventListener('mousemove', dragMove);
    
    function dragStart(e) {
        isDragging = true;
        carousel.style.cursor = 'grabbing';
        carousel.style.scrollBehavior = 'auto';
        
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        scrollLeft = carousel.scrollLeft;
        lastX = startX;
        lastTime = Date.now();
        velocity = 0;
        
        // Prevenir selección de texto
        e.preventDefault();
    }
    
    function dragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const currentTime = Date.now();
        
        // Calcular velocidad para el momentum
        const timeDelta = currentTime - lastTime;
        if (timeDelta > 0) {
            velocity = (x - lastX) / timeDelta;
        }
        
        lastX = x;
        lastTime = currentTime;
        
        // Scroll fluido
        const walk = (startX - x);
        carousel.scrollLeft = scrollLeft + walk;
    }
    
    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';
        
        // Aplicar momentum (inercia)
        applyMomentum();
    }
    
    function applyMomentum() {
        const momentumStrength = 25; // Ajustar para más/menos inercia
        let currentVelocity = velocity * momentumStrength;
        
        function momentumStep() {
            if (Math.abs(currentVelocity) > 0.5) {
                carousel.scrollLeft -= currentVelocity;
                currentVelocity *= 0.95; // Friction
                requestAnimationFrame(momentumStep);
            } else {
                // Snap suave a la tarjeta más cercana
                snapToClosest();
            }
        }
        
        if (Math.abs(currentVelocity) > 1) {
            momentumStep();
        } else {
            snapToClosest();
        }
    }
    
    function snapToClosest() {
        carousel.style.scrollBehavior = 'smooth';
        
        const cardWidth = carousel.offsetWidth * 0.7 + 15; // ancho + gap
        const scrollPosition = carousel.scrollLeft;
        const closestIndex = Math.round(scrollPosition / cardWidth);
        
        carousel.scrollLeft = closestIndex * cardWidth;
        
        // Resetear después de snap
        setTimeout(() => {
            carousel.style.scrollBehavior = 'auto';
        }, 300);
    }
    
    // Prevenir clicks accidentales durante drag
    carousel.addEventListener('click', (e) => {
        if (Math.abs(velocity) > 0.1) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);
}

// ==========================================
// SISTEMA DE AUTENTICACIÓN CON FIREBASE
// ==========================================

// Referencias al modal y elementos
const userToggle = document.getElementById('user-toggle');
const authModalOverlay = document.getElementById('auth-modal-overlay');
const authModal = document.getElementById('auth-modal');
const authModalClose = document.getElementById('auth-modal-close');
const authLoginView = document.getElementById('auth-login-view');
const authUserView = document.getElementById('auth-user-view');

// Referencias a elementos del formulario
const authForm = document.getElementById('auth-form');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const loginSubmitBtn = document.getElementById('login-submit-btn');
const googleLoginBtn = document.getElementById('google-login-btn');
const switchToRegister = document.getElementById('switch-to-register');
const authMessage = document.getElementById('auth-message');

// Referencias a elementos de usuario logueado
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userAvatar = document.getElementById('user-avatar');
const logoutBtn = document.getElementById('logout-btn');

// Variable para saber si estamos en modo registro o login
let isRegisterMode = false;

// Abrir modal de autenticación
userToggle.addEventListener('click', () => {
    authModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Cerrar modal con el botón X
authModalClose.addEventListener('click', closeAuthModal);

// Cerrar modal al hacer clic en el overlay
authModalOverlay.addEventListener('click', (e) => {
    if (e.target === authModalOverlay) {
        closeAuthModal();
    }
});

// Función para cerrar el modal
function closeAuthModal() {
    authModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    clearAuthMessage();
}

// Cambiar entre modo login y registro
switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    isRegisterMode = !isRegisterMode;
    
    if (isRegisterMode) {
        loginSubmitBtn.textContent = 'Registrarse';
        switchToRegister.textContent = 'Iniciar Sesión';
        document.querySelector('.auth-title').textContent = 'Crear Cuenta';
        document.querySelector('.auth-switch-text').innerHTML = '¿Ya tienes cuenta? <a href="#" id="switch-to-register">Inicia sesión</a>';
    } else {
        loginSubmitBtn.textContent = 'Iniciar Sesión';
        switchToRegister.textContent = 'Regístrate';
        document.querySelector('.auth-title').textContent = 'Iniciar Sesión';
        document.querySelector('.auth-switch-text').innerHTML = '¿No tienes cuenta? <a href="#" id="switch-to-register">Regístrate</a>';
    }
    
    // Reasignar el event listener al nuevo enlace
    document.getElementById('switch-to-register').addEventListener('click', arguments.callee);
    clearAuthMessage();
});

// Función para mostrar mensajes
function showAuthMessage(message, type = 'error') {
    authMessage.textContent = message;
    authMessage.className = `auth-message ${type}`;
}

// Función para limpiar mensajes
function clearAuthMessage() {
    authMessage.textContent = '';
    authMessage.className = 'auth-message';
}

// Login/Registro con email y contraseña
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAuthMessage();
    
    const email = authEmail.value.trim();
    const password = authPassword.value;
    
    // Validaciones básicas
    if (!email || !password) {
        showAuthMessage('Por favor, completa todos los campos', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAuthMessage('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    try {
        loginSubmitBtn.disabled = true;
        loginSubmitBtn.textContent = isRegisterMode ? 'Registrando...' : 'Iniciando...';
        
        if (isRegisterMode) {
            // Registro
            await auth.createUserWithEmailAndPassword(email, password);
            showAuthMessage('¡Cuenta creada exitosamente!', 'success');
        } else {
            // Login
            await auth.signInWithEmailAndPassword(email, password);
            showAuthMessage('¡Sesión iniciada correctamente!', 'success');
        }
        
        // Limpiar formulario
        authEmail.value = '';
        authPassword.value = '';
        
        // Cerrar modal después de un breve delay
        setTimeout(() => {
            closeAuthModal();
        }, 1000);
        
    } catch (error) {
        console.error('Error de autenticación:', error);
        
        // Mensajes de error personalizados
        let errorMessage = 'Ha ocurrido un error. Inténtalo de nuevo.';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Este email ya está registrado';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Email inválido';
                break;
            case 'auth/weak-password':
                errorMessage = 'La contraseña es demasiado débil';
                break;
            case 'auth/user-not-found':
                errorMessage = 'Usuario no encontrado';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Contraseña incorrecta';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Demasiados intentos. Intenta más tarde';
                break;
        }
        
        showAuthMessage(errorMessage, 'error');
    } finally {
        loginSubmitBtn.disabled = false;
        loginSubmitBtn.textContent = isRegisterMode ? 'Registrarse' : 'Iniciar Sesión';
    }
});

// Login con Google
googleLoginBtn.addEventListener('click', async () => {
    clearAuthMessage();
    
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        
        await auth.signInWithPopup(provider);
        showAuthMessage('¡Sesión iniciada con Google!', 'success');
        
        setTimeout(() => {
            closeAuthModal();
        }, 1000);
        
    } catch (error) {
        console.error('Error con Google Sign In:', error);
        
        let errorMessage = 'Error al iniciar sesión con Google';
        
        if (error.code === 'auth/popup-closed-by-user') {
            errorMessage = 'Inicio de sesión cancelado';
        } else if (error.code === 'auth/popup-blocked') {
            errorMessage = 'Ventana emergente bloqueada. Permite las ventanas emergentes.';
        }
        
        showAuthMessage(errorMessage, 'error');
    }
});

// Cerrar sesión
logoutBtn.addEventListener('click', async () => {
    try {
        await auth.signOut();
        closeAuthModal();
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
});

// Observador del estado de autenticación
auth.onAuthStateChanged((user) => {
    if (user) {
        // Usuario logueado
        console.log('Usuario logueado:', user.email);
        
        // Actualizar UI del botón de usuario
        userToggle.classList.add('logged-in');
        
        // Mostrar vista de usuario en el modal
        authLoginView.style.display = 'none';
        authUserView.style.display = 'block';
        
        // Actualizar información del usuario
        userName.textContent = user.displayName || 'Usuario';
        userEmail.textContent = user.email;
        
        // Si tiene foto de perfil
        if (user.photoURL) {
            userAvatar.innerHTML = `<img src="${user.photoURL}" alt="Avatar">`;
        } else {
            // Usar inicial del email
            const initial = user.email.charAt(0).toUpperCase();
            userAvatar.innerHTML = `<span style="font-size: 36px;">${initial}</span>`;
        }
        
    } else {
        // Usuario no logueado
        console.log('Usuario no logueado');
        
        // Actualizar UI del botón de usuario
        userToggle.classList.remove('logged-in');
        
        // Mostrar vista de login en el modal
        authLoginView.style.display = 'block';
        authUserView.style.display = 'none';
        
        // Reset a modo login
        isRegisterMode = false;
        loginSubmitBtn.textContent = 'Iniciar Sesión';
        document.querySelector('.auth-title').textContent = 'Iniciar Sesión';
        document.querySelector('.auth-switch-text').innerHTML = '¿No tienes cuenta? <a href="#" id="switch-to-register">Regístrate</a>';
        
        // Limpiar formulario
        authEmail.value = '';
        authPassword.value = '';
        clearAuthMessage();
    }
});
