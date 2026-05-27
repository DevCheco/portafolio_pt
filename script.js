// ============================================================
//  AUDIO — singleton AudioContext (created once, reused)
// ============================================================
let _audioCtx = null;

function playKeyboardSound() {
    if (!_audioCtx) {
        _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const oscillator = _audioCtx.createOscillator();
    const gainNode = _audioCtx.createGain();

    const baseFrequency = 800 + Math.random() * 200;
    oscillator.frequency.setValueAtTime(baseFrequency, _audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(baseFrequency * 0.5, _audioCtx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.3, _audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, _audioCtx.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(_audioCtx.destination);
    oscillator.start(_audioCtx.currentTime);
    oscillator.stop(_audioCtx.currentTime + 0.05);
}

// ============================================================
//  THEME TOGGLE
// ============================================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    if (body.classList.contains('light-theme')) {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// ============================================================
//  MOBILE MENU
// ============================================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close mobile menu on nav link click
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    });
});

// ============================================================
//  SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================================
//  FOOTER YEAR
// ============================================================
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ============================================================
//  SCROLL ANIMATIONS — CSS class-based (no inline styles = compositable)
// ============================================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // stop observing once visible
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});

// ============================================================
//  KEYBOARD KEYS — event delegation (one listener instead of 60+)
// ============================================================
const keyboardContainer = document.querySelector('.keyboard-container');
if (keyboardContainer) {
    keyboardContainer.addEventListener('click', (e) => {
        const key = e.target.closest('.keyboard-key');
        if (!key) return;
        playKeyboardSound();
        key.classList.add('key-pressed');
        setTimeout(() => key.classList.remove('key-pressed'), 100);
    });
}

// ============================================================
//  GALLERY MODAL
// ============================================================
const galleryModal = document.getElementById('galleryModal');
const galleryImage = document.getElementById('galleryImage');
const galleryCaption = document.getElementById('galleryCaption');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
const closeModal = document.querySelector('.close-modal');
const prevSlideBtn = document.getElementById('prevSlideBtn');
const nextSlideBtn = document.getElementById('nextSlideBtn');

// Project Data
const projectData = {
    client1: {
        images: [
            'assets/proyecto_1.webp',
            'assets/proyecto_1_2.webp',
            'assets/proyecto_1_3.webp'
        ],
        title: 'E-commerce Multivendedor'
    },
    personal1: {
        images: [
            'assets/placeholder.jpg',
            'assets/placeholder.jpg'
        ],
        title: 'Portfolio Minimalista'
    }
};

let currentProject = null;
let currentImageIndex = 0;

function openGallery(projectId) {
    if (projectData[projectId]) {
        currentProject = projectId;
        currentImageIndex = 0;
        updateGallery();
        galleryModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeGallery() {
    galleryModal.style.display = 'none';
    document.body.style.overflow = '';
    currentProject = null;
}

function changeSlide(direction) {
    if (!currentProject) return;
    const images = projectData[currentProject].images;
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    updateGallery();
}

function updateGallery() {
    if (!currentProject) return;
    const data = projectData[currentProject];
    const imagePath = data.images[currentImageIndex];
    galleryImage.src = imagePath;
    galleryImage.onerror = function () {
        this.onerror = null;
        this.src = `https://placehold.co/800x600/2d2d30/FFF?text=${encodeURIComponent(data.title)}+${currentImageIndex + 1}`;
    };
    galleryCaption.textContent = `${data.title} - Imagen ${currentImageIndex + 1}`;
    currentSlideSpan.textContent = currentImageIndex + 1;
    totalSlidesSpan.textContent = data.images.length;
}

if (closeModal) closeModal.addEventListener('click', closeGallery);
if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => changeSlide(-1));
if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => changeSlide(1));

if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) closeGallery();
    });
}

document.addEventListener('keydown', (e) => {
    if (galleryModal && galleryModal.style.display === 'flex') {
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
    }
});

window.openGallery = openGallery;
window.changeSlide = changeSlide;

// ============================================================
//  PROJECT SHOWCASE (.sc-* system)
// ============================================================
const showcaseProjects = {
    client1: {
        title: 'E-commerce Multivendedor',
        desc: 'Marketplace modular con gestión de productos, usuarios y compras. Arquitectura limpia con PHP, MySQL y API REST. Escalable e ideal para comercio electrónico educativo.',
        tech: 'PHP · MySQL · JS',
        type: 'Cliente',
        rating: '4.8',
        stack: 'Full Stack',
        year: '2024',
        users: '200+ usuarios',
        url: 'localhost/ecommerce',
        image: 'assets/proyecto_1.webp',
        liveLink: '#',
        galleryKey: 'client1'
    },
    personal1: {
        title: 'Portfolio Minimalista',
        desc: 'Portafolio personal enfocado en rendimiento, accesibilidad y diseño limpio. Incluye tema oscuro/claro, teclado interactivo y animaciones de scroll.',
        tech: 'HTML · CSS · JS',
        type: 'Personal',
        rating: '5.0',
        stack: 'Frontend',
        year: '2025',
        users: 'Open Source',
        url: 'devcheco.github.io/portfolio',
        image: 'assets/linkedin-foto.webp',
        liveLink: '#',
        galleryKey: 'personal1'
    },
    medicontrol: {
        title: 'MediControl',
        desc: 'Aplicación web de gestión de medicamentos con recordatorios, estadísticas de dosis y autenticación segura. Backend PHP con MySQL.',
        tech: 'PHP · MySQL · CSS',
        type: 'Personal',
        rating: '4.6',
        stack: 'Full Stack',
        year: '2025',
        users: 'Demo',
        url: 'localhost/medicontrol',
        image: 'https://placehold.co/800x400/2d2d30/88ccca?text=MediControl',
        liveLink: '#',
        galleryKey: 'medicontrol'
    },
    thomybot: {
        title: 'ThomyBot AI',
        desc: 'Chatbot de salud mental entrenado localmente con TensorFlow.js. Detecta intenciones, clasifica emociones y ofrece recursos de crisis con interfaz terapéutica.',
        tech: 'TensorFlow.js · NLP',
        type: 'Personal',
        rating: '4.9',
        stack: 'IA / ML',
        year: '2024',
        users: 'En desarrollo',
        url: 'localhost/thomybot',
        image: 'https://placehold.co/800x400/202023/88ccca?text=ThomyBot+AI',
        liveLink: '#',
        galleryKey: 'thomybot'
    }
};

let currentShowcaseProject = 'client1';

function switchShowcaseProject(projectId) {
    const project = showcaseProjects[projectId];
    if (!project || projectId === currentShowcaseProject) return;
    currentShowcaseProject = projectId;
    window.currentShowcaseProject = currentShowcaseProject;

    document.querySelectorAll('.sc-nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.project === projectId);
    });

    const img = document.getElementById('scScreenImg');
    if (img) {
        img.classList.add('sc-transitioning');
        setTimeout(() => {
            img.src = project.image;
            img.onerror = function () {
                this.onerror = null;
                this.src = `https://placehold.co/800x400/2d2d30/FFF?text=${encodeURIComponent(project.title)}`;
            };
            img.classList.remove('sc-transitioning');
        }, 300);
    }

    const titleEl = document.getElementById('scTitle');
    const descEl = document.getElementById('scDesc');
    if (titleEl) titleEl.style.opacity = '0';
    if (descEl) descEl.style.opacity = '0';

    setTimeout(() => {
        if (titleEl) { titleEl.textContent = project.title; titleEl.style.opacity = '1'; }
        if (descEl) { descEl.textContent = project.desc; descEl.style.opacity = '1'; }

        const urlEl = document.getElementById('scUrlText');
        if (urlEl) urlEl.textContent = project.url;

        const liveEl = document.getElementById('scLiveLink');
        if (liveEl) liveEl.href = project.liveLink;

        const stackStat = document.getElementById('scStackStat');
        const yearStat = document.getElementById('scYearStat');
        const usersStat = document.getElementById('scUsersStat');
        if (stackStat) stackStat.textContent = project.stack;
        if (yearStat) yearStat.textContent = project.year;
        if (usersStat) usersStat.textContent = project.users;
    }, 200);

    const popBadge = (badgeEl, textEl, value) => {
        if (!badgeEl || !textEl) return;
        badgeEl.classList.remove('pop');
        void badgeEl.offsetWidth; // force reflow
        textEl.textContent = value;
        badgeEl.classList.add('pop');
    };
    popBadge(document.getElementById('scBadgeRating'), document.getElementById('scRatingText'), project.rating);
    popBadge(document.getElementById('scBadgeTech'), document.getElementById('scTechText'), project.tech);
    popBadge(document.getElementById('scBadgeType'), document.getElementById('scTypeText'), project.type);
}

function openShowcaseGallery(projectId) {
    const project = showcaseProjects[projectId];
    if (!project) return;
    if (projectData && projectData[project.galleryKey]) {
        openGallery(project.galleryKey);
    } else {
        window.open(project.image, '_blank');
    }
}

// Wire up showcase nav — event delegation on the sc-nav container
const scNavEl = document.querySelector('#proyectos .sc-nav');
if (scNavEl) {
    scNavEl.addEventListener('click', (e) => {
        const btn = e.target.closest('.sc-nav-item[data-project]');
        if (btn) switchShowcaseProject(btn.dataset.project);
    });
}

// Gallery button inside showcase
const scGalleryBtn = document.getElementById('scGalleryBtn');
if (scGalleryBtn) {
    scGalleryBtn.addEventListener('click', () => openShowcaseGallery(currentShowcaseProject));
}

window.currentShowcaseProject = currentShowcaseProject;
window.openShowcaseGallery = openShowcaseGallery;

// ============================================================
//  SOFT SKILLS SHOWCASE (.ss-* system) — idle-deferred
// ============================================================
const softSkillCategories = {
    comunicacion: {
        title: 'Comunicación e Interacción',
        desc: 'Habilidades para transmitir ideas con claridad, escuchar activamente y conectar con las personas.',
        icon: 'fas fa-comments',
        count: 6,
        skills: [
            { icon: 'fas fa-comment-dots', name: 'Comunicación Efectiva', desc: 'Transmito ideas técnicas de forma clara y precisa.' },
            { icon: 'fas fa-ear-listen', name: 'Escucha Activa', desc: 'Comprendo requisitos y feedback sin interrumpir.' },
            { icon: 'fas fa-heart', name: 'Empatía', desc: 'Comprendo las necesidades y emociones del usuario.' },
            { icon: 'fas fa-handshake', name: 'Negociación', desc: 'Encuentro soluciones beneficiosas para todas las partes.' },
            { icon: 'fas fa-microphone', name: 'Presentaciones Técnicas', desc: 'Explico conceptos a audiencias diversas con confianza.' },
            { icon: 'fas fa-file-alt', name: 'Documentación Técnica', desc: 'Documento código y procesos de forma clara y estructurada.' }
        ]
    },
    liderazgo: {
        title: 'Liderazgo y Colaboración',
        desc: 'Capacidad para guiar equipos, colaborar eficazmente y construir un ambiente de trabajo positivo.',
        icon: 'fas fa-users',
        count: 5,
        skills: [
            { icon: 'fas fa-users-cog', name: 'Trabajo en Equipo', desc: 'Colaboro efectivamente con equipos multidisciplinarios.' },
            { icon: 'fas fa-crown', name: 'Liderazgo', desc: 'Guío equipos hacia objetivos comunes con claridad.' },
            { icon: 'fas fa-globe', name: 'Colaboración Remota', desc: 'Trabajo efectivamente en equipos distribuidos.' },
            { icon: 'fas fa-chalkboard-teacher', name: 'Mentoría', desc: 'Comparto conocimientos y apoyo el crecimiento del equipo.' },
            { icon: 'fas fa-balance-scale', name: 'Resolución de Conflictos', desc: 'Resuelvo desacuerdos de forma constructiva y diplomática.' }
        ]
    },
    pensamiento: {
        title: 'Pensamiento Estratégico',
        desc: 'Capacidad analítica y creativa para resolver problemas complejos y pensar a largo plazo.',
        icon: 'fas fa-lightbulb',
        count: 8,
        skills: [
            { icon: 'fas fa-lightbulb', name: 'Resolución de Problemas', desc: 'Analizo y resuelvo desafíos técnicos con metodología.' },
            { icon: 'fas fa-chess', name: 'Pensamiento Crítico', desc: 'Evalúo desde múltiples perspectivas antes de decidir.' },
            { icon: 'fas fa-chart-bar', name: 'Pensamiento Analítico', desc: 'Descompongo problemas complejos en partes manejables.' },
            { icon: 'fas fa-paint-brush', name: 'Creatividad', desc: 'Propongo soluciones innovadoras y fuera de lo convencional.' },
            { icon: 'fas fa-magic', name: 'Innovación', desc: 'Busco mejores formas de hacer las cosas continuamente.' },
            { icon: 'fas fa-gavel', name: 'Toma de Decisiones', desc: 'Decido con criterio bajo incertidumbre y presión.' },
            { icon: 'fas fa-compass', name: 'Visión Estratégica', desc: 'Pienso a largo plazo y anticipo consecuencias futuras.' },
            { icon: 'fas fa-search-plus', name: 'Atención al Detalle', desc: 'Cuido la calidad y consistencia en cada entregable.' }
        ]
    },
    gestion: {
        title: 'Gestión y Eficiencia',
        desc: 'Habilidades para organizar, priorizar y ejecutar trabajo de forma eficiente y autónoma.',
        icon: 'fas fa-rocket',
        count: 7,
        skills: [
            { icon: 'fas fa-hourglass-half', name: 'Gestión del Tiempo', desc: 'Priorizo tareas y cumplo deadlines bajo presión.' },
            { icon: 'fas fa-clipboard-check', name: 'Autogestión', desc: 'Organizo mi trabajo independientemente con disciplina.' },
            { icon: 'fas fa-running', name: 'Proactividad', desc: 'Anticipo necesidades sin esperar instrucciones explícitas.' },
            { icon: 'fas fa-bullseye', name: 'Orientación a Resultados', desc: 'Me enfoco en lograr objetivos medibles y concretos.' },
            { icon: 'fas fa-sync', name: 'Adaptabilidad', desc: 'Me adapto ágilmente a nuevas tecnologías y entornos.' },
            { icon: 'fas fa-spa', name: 'Manejo del Estrés', desc: 'Mantengo la calma y claridad bajo alta presión.' },
            { icon: 'fas fa-book-reader', name: 'Aprendizaje Continuo', desc: 'Actualizo mis conocimientos constantemente por iniciativa propia.' }
        ]
    }
};

let currentSoftSkillCat = 'comunicacion';

function switchSoftSkillCat(catId) {
    const cat = softSkillCategories[catId];
    if (!cat || catId === currentSoftSkillCat) return;
    currentSoftSkillCat = catId;

    document.querySelectorAll('[data-skill-cat]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.skillCat === catId);
    });

    const heroEl = document.getElementById('ssHeroIcon')?.closest('.ss-hero');
    const iconEl = document.getElementById('ssHeroIcon');
    const titleEl = document.getElementById('ssCatTitle');
    const descEl = document.getElementById('ssCatDesc');
    const countEl = document.getElementById('ssSkillCount');
    const gridEl = document.getElementById('ssSkillsGrid');

    if (heroEl) {
        heroEl.classList.remove('animating');
        void heroEl.offsetWidth;
        heroEl.classList.add('animating');
    }

    if (titleEl) titleEl.style.opacity = '0';
    if (descEl) descEl.style.opacity = '0';

    setTimeout(() => {
        if (iconEl) iconEl.innerHTML = `<i class="${cat.icon}"></i>`;
        if (titleEl) { titleEl.textContent = cat.title; titleEl.style.opacity = '1'; }
        if (descEl) { descEl.textContent = cat.desc; descEl.style.opacity = '1'; }
        if (countEl) countEl.textContent = `${cat.count} habilidades`;
    }, 180);

    if (gridEl) {
        gridEl.classList.add('fading');
        setTimeout(() => {
            gridEl.innerHTML = cat.skills.map((s, i) =>
                `<div class="ss-skill-card" style="animation-delay:${i * 45}ms">
                    <i class="${s.icon}"></i>
                    <strong>${s.name}</strong>
                    <span>${s.desc}</span>
                </div>`
            ).join('');
            gridEl.classList.remove('fading');
        }, 220);
    }
}

// Wire up soft-skills sidebar — event delegation
const ssNavEl = document.querySelector('#soft-skills .sc-nav');
if (ssNavEl) {
    ssNavEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-skill-cat]');
        if (btn) switchSoftSkillCat(btn.dataset.skillCat);
    });
}

// ============================================================
//  ACCORDION (if still present)
// ============================================================
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const currentItem = header.parentElement;
        const currentContent = currentItem.querySelector('.accordion-content');
        const isActive = currentItem.classList.contains('active');

        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
            const c = item.querySelector('.accordion-content');
            if (c) c.style.maxHeight = null;
        });

        if (!isActive) {
            currentItem.classList.add('active');
            if (currentContent) currentContent.style.maxHeight = currentContent.scrollHeight + 'px';
        }
    });
});
