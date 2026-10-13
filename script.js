/* ======================================
   SCRIPT: NAVEGACIÓN MENÚS Y SUBMENÚS
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    console.log('🔧 Navegación iniciada');

    // FUNCIÓN: OCULTAR TODAS LAS SECCIONES Y MOSTRAR SOLO HOME
    function showOnlyHomeOnLoad() {
        document.querySelectorAll('.main-section, .subsection').forEach(section => {
            section.style.display = 'none';
        });

        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.style.display = 'block';
        }

        document.querySelectorAll('[id^="home-"]').forEach(subsection => {
            subsection.style.display = 'block';
        });

        // Quitar la clase is-section al volver a Home
        document.body.classList.remove('is-section');
    }

    // FUNCIÓN: NAVEGAR A UNA SECCIÓN
    function showOnlyOneSection(sectionId) {
        console.log('Mostrando SOLO:', sectionId);

        document.querySelectorAll('.main-section, .subsection').forEach(section => {
            section.style.display = 'none';
        });

        const mainSection = document.getElementById(sectionId);
        if (mainSection) {
            mainSection.style.display = 'block';

            document.querySelectorAll(`[id^="${sectionId}-"]`).forEach(subsection => {
                subsection.style.display = 'block';
            });

            mainSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Si NO es home, activar is-section; si es home, quitarla
            if (sectionId === 'home') {
                document.body.classList.remove('is-section');
            } else {
                document.body.classList.add('is-section');
            }
        }
    }

    // FUNCIÓN: NAVEGAR A UNA SUBSECCIÓN
    function goToSubsection(subsectionId) {
        console.log('Yendo a subsección:', subsectionId);

        const mainSectionId = subsectionId.split('-')[0];
        showOnlyOneSection(mainSectionId);

        setTimeout(() => {
            const subsection = document.getElementById(subsectionId);
            if (subsection) {
                subsection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }

    // EVENTOS PARA BOTONES DEL MENÚ PRINCIPAL
    document.querySelectorAll('.menu-nav a, .menu-mobile-nav a').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            showOnlyOneSection(targetId);
            history.pushState(null, null, `#${targetId}`);
        });
    });

    // EVENTOS PARA BOTONES DE SUBMENÚ
    document.querySelectorAll('.menu-nav-submenu a, .menu-mobile-nav-submenu a').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            goToSubsection(targetId);
            history.pushState(null, null, `#${targetId}`);
        });
    });

    // VERIFICAR HASH AL CARGAR LA PÁGINA
    function checkInitialHash() {
        const hash = window.location.hash.replace('#', '');

        if (hash) {
            if (hash.includes('-')) {
                goToSubsection(hash);
            } else {
                showOnlyOneSection(hash);
            }
        } else {
            showOnlyHomeOnLoad();
        }
    }

    // NAVEGACIÓN DEL NAVEGADOR (atrás/adelante)
    function handleBrowserNavigation() {
        const hash = window.location.hash.replace('#', '');

        if (hash) {
            if (hash.includes('-')) {
                goToSubsection(hash);
            } else {
                showOnlyOneSection(hash);
            }
        } else {
            showOnlyHomeOnLoad();
        }
    }

    window.addEventListener('popstate', handleBrowserNavigation);

    // INICIALIZACIÓN
    checkInitialHash();
    console.log('✅ Navegación configurada correctamente');
});







/* ======================================
   SCRIPT: NAVEGACIÓN MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    console.log('📱 Navegación mobile iniciada');

    // ======================================
    // ABRIR / CERRAR MENÚ HAMBURGUESA
    // ======================================
    const botonMobile = document.querySelector('.menu-mobile-toggle');
    const menuMobile = document.querySelector('.menu-mobile-nav');

    if (botonMobile && menuMobile) {
        botonMobile.addEventListener('click', function () {
            menuMobile.classList.toggle('active');
        });
    }

    // FUNCIÓN: CERRAR MENÚ MOBILE
    function cerrarMenuMobile() {
        if (menuMobile) {
            menuMobile.classList.remove('active');
        }
    }

    // FUNCIÓN: OCULTAR TODAS LAS SECCIONES Y MOSTRAR SOLO HOME
    function showOnlyHomeOnLoad() {
        document.querySelectorAll('.main-section-mobile, .subsection-mobile').forEach(section => {
            section.style.display = 'none';
        });

        const homeSection = document.getElementById('home-mobile');
        if (homeSection) {
            homeSection.style.display = 'block';
        }

        document.querySelectorAll('[id^="home-mobile-"]').forEach(subsection => {
            subsection.style.display = 'block';
        });
    }

    // FUNCIÓN: NAVEGAR A UNA SECCIÓN
    function showOnlyOneSection(sectionId) {
        console.log('Mostrando SOLO:', sectionId);

        document.querySelectorAll('.main-section-mobile, .subsection-mobile').forEach(section => {
            section.style.display = 'none';
        });

        const mainSection = document.getElementById(sectionId);
        if (mainSection) {
            mainSection.style.display = 'block';

            document.querySelectorAll(`[id^="${sectionId}-"]`).forEach(subsection => {
                subsection.style.display = 'block';
            });

            mainSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // FUNCIÓN: NAVEGAR A UNA SUBSECCIÓN
    function goToSubsection(subsectionId) {
        console.log('Yendo a subsección:', subsectionId);

        const mainSectionId = subsectionId.split('-')[0] + '-mobile';
        showOnlyOneSection(mainSectionId);

        setTimeout(() => {
            const subsection = document.getElementById(subsectionId);
            if (subsection) {
                subsection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }

    // EVENTOS PARA BOTONES DEL MENÚ MOBILE
    document.querySelectorAll('.menu-mobile-nav a').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            showOnlyOneSection(targetId);
            history.pushState(null, null, `#${targetId}`);
            cerrarMenuMobile();
        });
    });

    // EVENTOS PARA BOTONES DE SUBMENÚ MOBILE
    document.querySelectorAll('.menu-mobile-nav-submenu a').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');
            goToSubsection(targetId);
            history.pushState(null, null, `#${targetId}`);
            cerrarMenuMobile();
        });
    });

    // VERIFICAR HASH AL CARGAR LA PÁGINA
    function checkInitialHash() {
        const hash = window.location.hash.replace('#', '');

        if (hash) {
            if (hash.includes('-') && hash !== 'home-mobile') {
                goToSubsection(hash);
            } else {
                showOnlyOneSection(hash);
            }
        } else {
            showOnlyHomeOnLoad();
        }
    }

    // NAVEGACIÓN DEL NAVEGADOR (atrás/adelante)
    function handleBrowserNavigation() {
        const hash = window.location.hash.replace('#', '');

        if (hash) {
            if (hash.includes('-') && hash !== 'home-mobile') {
                goToSubsection(hash);
            } else {
                showOnlyOneSection(hash);
            }
        } else {
            showOnlyHomeOnLoad();
        }
    }

    window.addEventListener('popstate', handleBrowserNavigation);

    // INICIALIZACIÓN
    checkInitialHash();
    console.log('✅ Navegación mobile configurada correctamente');
});














/* ======================================
   SCRIPT: NOTIFICACIÓN HOME - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn = document.getElementById('home-close-btn');
    const notification = document.getElementById('home-notification');
    const notificationBtn = document.getElementById('home-notification-button');

    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});


/* ======================================
   SCRIPT: NOTIFICACIÓN HOME - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile = document.getElementById('home-close-btn-mobile');
    const notificationMobile = document.getElementById('home-notification-mobile');
    const notificationBtnMobile = document.getElementById('home-notification-button-mobile');

    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});









/* ======================================
   SCRIPT: NOTIFICACIÓN SOCIAL MEDIA CONTENT - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('socialmediacontent-close-btn');
    const notification    = document.getElementById('socialmediacontent-notification');
    const notificationBtn = document.getElementById('socialmediacontent-notification-button');

    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});

/* ======================================
   SCRIPT: NOTIFICACIÓN SOCIAL MEDIA CONTENT - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('socialmediacontent-close-btn-mobile');
    const notificationMobile    = document.getElementById('socialmediacontent-notification-mobile');
    const notificationBtnMobile = document.getElementById('socialmediacontent-notification-button-mobile');

    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});


/* ======================================
   SCRIPT: NOTIFICACIÓN UNIVERSE - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('universe-close-btn');
    const notification    = document.getElementById('universe-notification');
    const notificationBtn = document.getElementById('universe-notification-button');

    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});

/* ======================================
   SCRIPT: NOTIFICACIÓN UNIVERSE - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('universe-close-btn-mobile');
    const notificationMobile    = document.getElementById('universe-notification-mobile');
    const notificationBtnMobile = document.getElementById('universe-notification-button-mobile');

    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});


/* ======================================
   SCRIPT: NOTIFICACIÓN BIOGRAPHY - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('biography-close-btn');
    const notification    = document.getElementById('biography-notification');
    const notificationBtn = document.getElementById('biography-notification-button');

    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});

/* ======================================
   SCRIPT: NOTIFICACIÓN BIOGRAPHY - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('biography-close-btn-mobile');
    const notificationMobile    = document.getElementById('biography-notification-mobile');
    const notificationBtnMobile = document.getElementById('biography-notification-button-mobile');

    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});


/* ======================================
   SCRIPT: NOTIFICACIÓN ABOUT ARLYN LIGEIA - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('aboutarlynligeia-close-btn');
    const notification    = document.getElementById('aboutarlynligeia-notification');
    const notificationBtn = document.getElementById('aboutarlynligeia-notification-button');

    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});

/* ======================================
   SCRIPT: NOTIFICACIÓN ABOUT ARLYN LIGEIA - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('aboutarlynligeia-close-btn-mobile');
    const notificationMobile    = document.getElementById('aboutarlynligeia-notification-mobile');
    const notificationBtnMobile = document.getElementById('aboutarlynligeia-notification-button-mobile');

    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});




/* ======================================
   SCRIPT: NOTIFICACIÓN PURPOSE - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('purpose-close-btn');
    const notification    = document.getElementById('purpose-notification');
    const notificationBtn = document.getElementById('purpose-notification-button');

    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});

/* ======================================
   SCRIPT: NOTIFICACIÓN PURPOSE - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('purpose-close-btn-mobile');
    const notificationMobile    = document.getElementById('purpose-notification-mobile');
    const notificationBtnMobile = document.getElementById('purpose-notification-button-mobile');

    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});


/* ======================================
   SCRIPT: NOTIFICACIÓN MISSION - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('mission-close-btn');
    const notification    = document.getElementById('mission-notification');
    const notificationBtn = document.getElementById('mission-notification-button');

    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});

/* ======================================
   SCRIPT: NOTIFICACIÓN MISSION - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('mission-close-btn-mobile');
    const notificationMobile    = document.getElementById('mission-notification-mobile');
    const notificationBtnMobile = document.getElementById('mission-notification-button-mobile');

    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});


/* ======================================
   SCRIPT: NOTIFICACIÓN VISION - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('vision-close-btn');
    const notification    = document.getElementById('vision-notification');
    const notificationBtn = document.getElementById('vision-notification-button');

    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});

/* ======================================
   SCRIPT: NOTIFICACIÓN VISION - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('vision-close-btn-mobile');
    const notificationMobile    = document.getElementById('vision-notification-mobile');
    const notificationBtnMobile = document.getElementById('vision-notification-button-mobile');

    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});














/* ======================================
   CONTACT PC
====================================== */
(function () {
    const type = document.getElementById('contact-type');
    const wrapper = document.getElementById('contact-wrapper');
    const topic = document.getElementById('contact-topic');

    if (type && wrapper && topic) {
        type.addEventListener('change', function () {
            if (this.value === 'work') {
                wrapper.classList.add('is-visible');
                topic.setAttribute('required', 'required');
                topic.removeAttribute('disabled');
            } else {
                wrapper.classList.remove('is-visible');
                topic.removeAttribute('required');
                topic.value = '';
                topic.setAttribute('disabled', 'disabled');
            }
        });
    }
})();

/* ======================================
   CONTACT MOBILE
====================================== */
(function () {
    const type = document.getElementById('contact-type-mobile');
    const wrapper = document.getElementById('contact-wrapper-mobile');
    const topic = document.getElementById('contact-topic-mobile');

    if (type && wrapper && topic) {
        type.addEventListener('change', function () {
            if (this.value === 'work') {
                wrapper.classList.add('is-visible');
                topic.setAttribute('required', 'required');
                topic.removeAttribute('disabled');
            } else {
                wrapper.classList.remove('is-visible');
                topic.removeAttribute('required');
                topic.value = '';
                topic.setAttribute('disabled', 'disabled');
            }
        });
    }
})();








/* ======================================
   SCRIPT: NOTIFICACIÓN TERMS AND CONDITIONS - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('termsandconditions-close-btn');
    const notification    = document.getElementById('termsandconditions-notification');
    const notificationBtn = document.getElementById('termsandconditions-notification-button');

    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});

/* ======================================
   SCRIPT: NOTIFICACIÓN TERMS AND CONDITIONS - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('termsandconditions-close-btn-mobile');
    const notificationMobile    = document.getElementById('termsandconditions-notification-mobile');
    const notificationBtnMobile = document.getElementById('termsandconditions-notification-button-mobile');

    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});


/* ======================================
   SCRIPT: NOTIFICACIÓN PRIVACY POLICY - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('privacypolicy-close-btn');
    const notification    = document.getElementById('privacypolicy-notification');
    const notificationBtn = document.getElementById('privacypolicy-notification-button');

    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});

/* ======================================
   SCRIPT: NOTIFICACIÓN PRIVACY POLICY - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('privacypolicy-close-btn-mobile');
    const notificationMobile    = document.getElementById('privacypolicy-notification-mobile');
    const notificationBtnMobile = document.getElementById('privacypolicy-notification-button-mobile');

    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});


/* ======================================
   SCRIPT: NOTIFICACIÓN COOKIE POLICY - PC
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtn        = document.getElementById('cookiepolicy-close-btn');
    const notification    = document.getElementById('cookiepolicy-notification');
    const notificationBtn = document.getElementById('cookiepolicy-notification-button');

    if (closeBtn && notification && notificationBtn) {
        // Al hacer clic en la X → mostrar notificación
        closeBtn.addEventListener('click', () => {
            notification.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }
});

/* ======================================
   SCRIPT: NOTIFICACIÓN COOKIE POLICY - MOBILE
====================================== */
document.addEventListener('DOMContentLoaded', function () {
    const closeBtnMobile        = document.getElementById('cookiepolicy-close-btn-mobile');
    const notificationMobile    = document.getElementById('cookiepolicy-notification-mobile');
    const notificationBtnMobile = document.getElementById('cookiepolicy-notification-button-mobile');

    if (closeBtnMobile && notificationMobile && notificationBtnMobile) {
        // Al hacer clic en la X → mostrar notificación
        closeBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.add('show');
        });

        // Al hacer clic en STAY → ocultar notificación
        notificationBtnMobile.addEventListener('click', () => {
            notificationMobile.classList.remove('show');
        });
    }
});


















