// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeGSAP();
        initializeScrollReveal();
        initializeParticles();
        initializeTyped();
        initializeChart();
        initializeAOS();
        initializeSwiper();
        initializeHighlight();
        initializeVanillaTilt();
        initializeIsotope();
        fetchAchievements();
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});

// GSAP Animations
function initializeGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from('.hero-text', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
    });
    
    // Stats counter animations
    document.querySelectorAll('.stat-number').forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        gsap.to(stat, {
            duration: 2.5,
            textContent: finalValue,
            snap: { textContent: 1 },
            ease: 'power1.out',
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%'
            }
        });
    });
}

// ScrollReveal Animations
function initializeScrollReveal() {
    ScrollReveal().reveal('.section-title', {
        delay: 200,
        distance: '50px',
        duration: 1000,
        origin: 'bottom'
    });
}

// Particles.js Background
function initializeParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#4f46e5' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: { enable: true, speed: 2 }
        }
    });
}

// Typed.js Text Animation
function initializeTyped() {
    if (typeof Typed === 'undefined') {
        console.error('Typed.js not loaded');
        return;
    }

    try {
        const typedElement = document.querySelector('.typing-text');
        if (!typedElement) {
            console.error('Typing text element not found');
            return;
        }

        new Typed('.typing-text', {
            strings: [
                'Web Developer',
                'AI/ML Enthusiast',
                'Tech Content Creator',
                'Open Source Contributor'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    } catch (error) {
        console.error('Error initializing Typed.js:', error);
    }
}

// Chart.js Skills Chart
function initializeChart() {
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Cybersecurity'],
            datasets: [{
                label: 'Skills',
                data: [90, 85, 80, 95, 85, 80],
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                borderColor: '#4f46e5',
                pointBackgroundColor: '#4f46e5'
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// AOS Animations
function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true
    });
}

// Swiper Carousel
function initializeSwiper() {
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });
}

// Highlight.js Code Highlighting
function initializeHighlight() {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
}

// Vanilla Tilt.js
function initializeVanillaTilt() {
    VanillaTilt.init(document.querySelectorAll('.card'), {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5
    });
}

// Isotope Grid
function initializeIsotope() {
    const grid = document.querySelector('.projects-grid');
    if (grid) {
        new Isotope(grid, {
            itemSelector: '.project-item',
            layoutMode: 'fitRows'
        });
    }
}

// Fetch Achievements
async function fetchAchievements() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/PareekHeymun/PareekHeymun/main/achievements.txt');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        const achievementsContainer = document.getElementById('achievements');
        if (achievementsContainer) {
            achievementsContainer.innerHTML = data;
        }
    } catch (error) {
        console.warn('Could not load achievements:', error);
        const achievementsContainer = document.getElementById('achievements');
        if (achievementsContainer) {
            achievementsContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Unable to load achievements at this time.</p>
                </div>
            `;
        }
    }
}

// Theme Toggle
const themeSwitch = document.getElementById('theme-switch');
if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
        document.body.setAttribute('data-theme', themeSwitch.checked ? 'dark' : 'light');
        localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        themeSwitch.checked = savedTheme === 'dark';
        document.body.setAttribute('data-theme', savedTheme);
    }
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    }
});

// Simple image modal implementation
function initializeImageModal() {
    document.querySelectorAll('.project-image').forEach(image => {
        image.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${image.src}" alt="${image.alt}">
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
}

// Initialize image modal
document.addEventListener('DOMContentLoaded', initializeImageModal);