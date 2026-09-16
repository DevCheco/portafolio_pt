// ============================================================
//  THEME TOGGLE
// ============================================================

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
    const overlay = document.getElementById('navOverlay');
    const isOpen = navMenu.classList.contains('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (isOpen) {
        icon.classList.replace('fa-bars', 'fa-times');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        if (overlay) { overlay.classList.add('active'); overlay.setAttribute('aria-hidden', 'false'); }
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        if (overlay) { overlay.classList.remove('active'); overlay.setAttribute('aria-hidden', 'true'); }
    }
});

// Close mobile menu on nav link click
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        const overlay = document.getElementById('navOverlay');
        if (overlay) { overlay.classList.remove('active'); overlay.setAttribute('aria-hidden', 'true'); }
    });
});

// Close mobile menu when overlay is clicked
const navOverlay = document.getElementById('navOverlay');
if (navOverlay) {
    navOverlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        navOverlay.setAttribute('aria-hidden', 'true');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    });
}

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

// (keyboard removed — no interactive keyboard in current version)

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

// Project Data — gallery images
const projectData = {
    client1: {
        images: [
            'assets/proyecto_1.webp',
            'assets/proyecto_1_2.webp',
            'assets/proyecto_1_3.webp'
        ],
        title: 'E-commerce Multivendedor'
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
        desc: 'Desarrollé una plataforma de comercio electrónico para un cliente local que necesitaba gestionar productos, usuarios y pedidos desde un panel administrativo. Diseñé la base de datos relacional, construí el backend con PHP y MySQL, implementé autenticación por sesiones y desarrollé la interfaz con Bootstrap y JavaScript. Mi participación fue completa: análisis de requisitos, diseño de BD, desarrollo backend y frontend, y despliegue.',
        tech: 'PHP · MySQL · JS · Bootstrap',
        type: 'Freelance',
        stack: 'Full Stack',
        year: '2024',
        users: 'Cliente real',
        url: 'github.com/DevCheco',
        image: 'assets/proyecto_1.webp',
        liveLink: 'https://github.com/DevCheco',
        features: ['Panel administrativo', 'Gestión de inventario', 'Autenticación por sesiones', 'API REST interna'],
        galleryKey: 'client1'
    },
    medicontrol: {
        title: 'MediControl',
        desc: 'Construí una aplicación web para el seguimiento y control de medicamentos, orientada a personas con tratamientos crónicos. El sistema permite registrar medicamentos, programar recordatorios y consultar el historial de dosis. Implementé la lógica de backend con PHP, diseñé el esquema de base de datos en MySQL y trabajé la interfaz con CSS personalizado.',
        tech: 'PHP · MySQL · CSS',
        type: 'Proyecto personal',
        stack: 'Full Stack',
        year: '2025',
        users: 'En desarrollo',
        url: 'github.com/DevCheco/medicontrol',
        image: 'https://placehold.co/800x400/1a1d24/6c8df5?text=MediControl',
        liveLink: 'https://github.com/DevCheco',
        features: ['Registro de medicamentos', 'Programación de recordatorios', 'Historial de dosis', 'Autenticación de usuarios'],
        galleryKey: 'medicontrol'
    },
    thomybot: {
        title: 'ThomyBot AI',
        desc: 'Desarrollé un asistente virtual de salud mental como proyecto de grado en la UNAD. Integré TensorFlow.js para procesar lenguaje natural directamente en el navegador, entrenando el modelo con datos de interacciones académicas para detectar estados emocionales y ofrecer recursos de apoyo. Participé en el diseño del modelo NLP, la integración con la interfaz web y la evaluación de precisión.',
        tech: 'TensorFlow.js · NLP · JavaScript',
        type: 'Proyecto de grado',
        stack: 'IA / Frontend',
        year: '2024',
        users: 'Proyecto UNAD',
        url: 'github.com/DevCheco/thomybot',
        image: 'https://placehold.co/800x400/111318/6c8df5?text=ThomyBot+AI',
        liveLink: 'https://github.com/DevCheco',
        features: ['Procesamiento NLP en el navegador', 'Detección de estados emocionales', 'Recursos de apoyo contextual', 'Interfaz conversacional'],
        galleryKey: 'thomybot'
    },
    psicoevaluacion: {
        title: 'Plataforma de Evaluación Psicológica',
        desc: 'Diseñé y desarrollé una plataforma web para la aplicación de evaluaciones psicológicas estandarizadas dentro del semillero de investigación JOKMAH en la UNAD. La plataforma permitía a estudiantes completar cuestionarios en línea y a los administradores consultar resultados. Implementé el frontend con React, el backend con Node.js y la base de datos con MySQL.',
        tech: 'React · Node.js · MySQL',
        type: 'Investigación UNAD',
        stack: 'Full Stack',
        year: '2023',
        users: 'Semillero JOKMAH',
        url: 'github.com/DevCheco',
        image: 'https://placehold.co/800x400/111318/e0457f?text=PsicoEvaluación',
        liveLink: 'https://github.com/DevCheco',
        features: ['Cuestionarios dinámicos', 'Panel de resultados', 'Autenticación por roles', 'Exportación de datos'],
        galleryKey: 'psicoevaluacion'
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
        btn.setAttribute('aria-pressed', btn.dataset.project === projectId ? 'true' : 'false');
    });

    const img = document.getElementById('scScreenImg');
    if (img) {
        img.classList.add('sc-transitioning');
        setTimeout(() => {
            img.src = project.image;
            img.alt = `Vista previa del proyecto ${project.title}`;
            img.onerror = function () {
                this.onerror = null;
                this.src = `https://placehold.co/800x400/1a1d24/6c8df5?text=${encodeURIComponent(project.title)}`;
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

        // Update feature tags
        const featuresEl = document.getElementById('scFeatures');
        if (featuresEl && project.features) {
            featuresEl.innerHTML = project.features
                .map(f => `<span class="sc-feature-tag">${f}</span>`)
                .join('');
        }
    }, 200);

    const popBadge = (badgeEl, textEl, value) => {
        if (!badgeEl || !textEl) return;
        badgeEl.classList.remove('pop');
        void badgeEl.offsetWidth; // force reflow
        textEl.textContent = value;
        badgeEl.classList.add('pop');
    };
    popBadge(document.getElementById('scBadgeTech'), document.getElementById('scTechText'), project.tech);
    popBadge(document.getElementById('scBadgeType'), document.getElementById('scTypeText'), project.type);
}

function openShowcaseGallery(projectId) {
    const project = showcaseProjects[projectId];
    if (!project) return;
    if (projectData && projectData[project.galleryKey]) {
        openGallery(project.galleryKey);
    } else {
        // No gallery available — nothing to open
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

