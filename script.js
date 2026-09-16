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
        document.body.style.overflow = 'hidden';   // bloquea scroll del fondo
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        if (overlay) { overlay.classList.remove('active'); overlay.setAttribute('aria-hidden', 'true'); }
        document.body.style.overflow = '';
    }
});

// Helper para cerrar el menú y restaurar el scroll
function closeMenu() {
    navMenu.classList.remove('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.replace('fa-times', 'fa-bars');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    const overlay = document.getElementById('navOverlay');
    if (overlay) { overlay.classList.remove('active'); overlay.setAttribute('aria-hidden', 'true'); }
    document.body.style.overflow = '';
}

// Close mobile menu on nav link click
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close mobile menu when overlay is clicked
const navOverlay = document.getElementById('navOverlay');
if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
}

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
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

