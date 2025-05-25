// Initialize Matter.js with error handling
function initializeMatterJS() {
    try {
        const Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies;

        // Create engine
        const engine = Engine.create();

        // Create renderer
        const render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent'
            }
        });

        // Create particles
        const particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = Bodies.circle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
                3,
                {
                    restitution: 0.8,
                    friction: 0.005,
                    density: 0.001,
                    render: {
                        fillStyle: '#4f46e5',
                        opacity: 0.5
                    }
                }
            );
            particles.push(particle);
        }

        // Add particles to world
        World.add(engine.world, particles);

        // Run the engine
        Engine.run(engine);
        Render.run(render);

        // Handle window resize
        window.addEventListener('resize', () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
        });

        return { engine, render, particles };
    } catch (error) {
        console.error('Error initializing Matter.js:', error);
        return null;
    }
}

// Initialize Matter.js when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Matter !== 'undefined') {
        const matter = initializeMatterJS();
        if (matter) {
            window.matterInstance = matter; // Store instance for later use
        }
    } else {
        console.error('Matter.js library not loaded');
    }
});

// Initialize AOS with custom settings
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Initialize Typed.js with more authentic roles
const typed = new Typed('.typing-text', {
    strings: [
        'Web Developer',
        'AI/ML Enthusiast',
        'Tech Content Creator',
        'Open Source Contributor'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#4f46e5'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#4f46e5',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Theme Toggle with improved dark mode
const themeToggle = document.querySelector('.theme-switch');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
    updateMatterParticles('#f3f4f6'); // Update particle color for dark mode
}

// Theme toggle handler
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateMatterParticles('#f3f4f6');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateMatterParticles('#4f46e5');
    }
});

// Function to update particle colors
function updateMatterParticles(color) {
    particles.forEach(particle => {
        particle.render.fillStyle = color;
    });
}

// Smooth Scroll
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

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Skills Animation
const skillBars = document.querySelectorAll('.skill-level');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = `${level}%`;
    });
};

// Initialize skills animation when in view
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
}

// Scroll Progress Indicator
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = progress + '%';
});

// Initialize Chart.js for Skills
const skillsChart = document.getElementById('skillsChart');
if (skillsChart) {
    new Chart(skillsChart, {
        type: 'radar',
        data: {
            labels: ['Frontend', 'Backend', 'Database', 'DevOps', 'Problem Solving', 'Team Work'],
            datasets: [{
                label: 'Skills',
                data: [90, 85, 80, 75, 95, 90],
                backgroundColor: 'rgba(79, 70, 229, 0.2)',
                borderColor: 'rgba(79, 70, 229, 1)',
                pointBackgroundColor: 'rgba(79, 70, 229, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(79, 70, 229, 1)'
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Initialize ScrollReveal
ScrollReveal().reveal('.section-title', {
    delay: 200,
    distance: '50px',
    origin: 'bottom'
});

ScrollReveal().reveal('.project-card', {
    delay: 200,
    distance: '50px',
    origin: 'bottom',
    interval: 100
});

ScrollReveal().reveal('.skill-item', {
    delay: 200,
    distance: '50px',
    origin: 'bottom',
    interval: 100
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Tooltip class
class Tooltip {
    constructor(element) {
        this.element = element;
        this.tooltip = null;
        this.init();
    }

    init() {
        this.element.addEventListener('mouseenter', () => this.show());
        this.element.addEventListener('mouseleave', () => this.hide());
    }

    show() {
        const text = this.element.getAttribute('data-tooltip');
        if (!text) return;

        this.tooltip = document.createElement('div');
        this.tooltip.className = 'tooltip';
        this.tooltip.textContent = text;

        document.body.appendChild(this.tooltip);

        const rect = this.element.getBoundingClientRect();
        this.tooltip.style.top = `${rect.bottom + 5}px`;
        this.tooltip.style.left = `${rect.left + (rect.width / 2) - (this.tooltip.offsetWidth / 2)}px`;
    }

    hide() {
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = null;
        }
    }
}

// Initialize tooltips
document.querySelectorAll('[data-tooltip]').forEach(element => {
    new Tooltip(element);
}); 