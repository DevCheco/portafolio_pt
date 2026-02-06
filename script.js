// Keyboard Sound Effect Generator
function playKeyboardSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create oscillator for the main tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Random pitch variation for more realistic typing
    const baseFrequency = 800 + Math.random() * 200;
    oscillator.frequency.setValueAtTime(baseFrequency, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(baseFrequency * 0.5, audioContext.currentTime + 0.05);

    // Sharp attack and quick decay for mechanical keyboard feel
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');

    // Update icon
    if (body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');

    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update current year in footer
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});





// Add keyboard sound to keyboard keys (Hard Skills)
document.querySelectorAll('.keyboard-key').forEach(key => {
    key.addEventListener('click', () => {
        playKeyboardSound();
        // Add visual feedback
        key.style.transform = 'translateY(1px)';
        setTimeout(() => {
            key.style.transform = 'translateY(0)';
        }, 100);
    });
});

// Interactive Soft Skills Accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const currentItem = header.parentElement;
        const currentContent = currentItem.querySelector('.accordion-content');
        const isActive = currentItem.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.accordion-content').style.maxHeight = null;
        });

        // Toggle current item
        if (!isActive) {
            currentItem.classList.add('active');
            currentContent.style.maxHeight = currentContent.scrollHeight + "px";
        }
    });
});

// Console easter egg
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #88ccca;');
console.log('%cWelcome to my portfolio!', 'font-size: 14px; color: #a0a0a0;');
console.log('%cFeel free to explore the code 🚀', 'font-size: 12px; color: #88ccca;');

// Gallery Modal Logic
const galleryModal = document.getElementById('galleryModal');
const galleryImage = document.getElementById('galleryImage');
const galleryCaption = document.getElementById('galleryCaption');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
const closeModal = document.querySelector('.close-modal');

// Project Data
const projectData = {
    'client1': {
        images: [
            'assets/proyecto_1.png',
            'assets/proyecto_1_2.png',
            'assets/proyecto_1_3.png'
        ],
        title: 'E-commerce Multivendedor'
    },
    'personal1': {
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
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeGallery() {
    galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    currentProject = null;
}

function changeSlide(direction) {
    if (!currentProject) return;

    const images = projectData[currentProject].images;
    currentImageIndex += direction;

    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }

    updateGallery();
}

function updateGallery() {
    if (!currentProject) return;

    const data = projectData[currentProject];
    // For demo: verify if placeholder exists, else use online placeholder
    const imagePath = data.images[currentImageIndex];
    galleryImage.src = imagePath;

    // Fallback if local asset missing
    galleryImage.onerror = function () {
        this.onerror = null; // prevent infinite loop
        this.src = `https://placehold.co/800x600/2d2d30/FFF?text=${encodeURIComponent(data.title)}+${currentImageIndex + 1}`;
    };

    galleryCaption.textContent = `${data.title} - Imagen ${currentImageIndex + 1}`;
    currentSlideSpan.textContent = currentImageIndex + 1;
    totalSlidesSpan.textContent = data.images.length;
}

// Event Listeners
if (closeModal) {
    closeModal.addEventListener('click', closeGallery);
}

// Close on outside click
if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGallery();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (galleryModal && galleryModal.style.display === 'flex') {
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
    }
});

// Expose openGallery globally for HTML onclick attributes
window.openGallery = openGallery;
window.changeSlide = changeSlide;
