
//wait to finish loading
window.addEventListener('load', initializeApp);
//theme manage
function initializeTheme() {
    const themeSwitch = document.querySelector('.theme-switch');
    const html = document.documentElement;

    // Set initial theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        html.classList.add('light-theme');
    }

    // Theme toggle click handler
    themeSwitch.addEventListener('click', () => {
        html.classList.toggle('light-theme');
        const newTheme = html.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (theme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Update your existing initializeApp function
function initializeApp() {
    // Initialize theme system
    initializeTheme();

    // Initialize GSAP
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initializeAnimations();
    } else {
        console.error('GSAP not loaded');
        return;
    }

    // Initialize navigation
    initializeNavigation();
}

function initializeNavigation() {
    const navElements = {
        menuToggle: document.querySelector('.menu-toggle'),
        navMenu: document.querySelector('.nav_migs'),
        navItems: {
            home: document.querySelector('.homenav'),
            work: document.querySelector('.worknav'),
            projects: document.querySelector('.projectsnav'),
            about: document.querySelector('.aboutnav'),
            contact: document.querySelector('.contactnav'),
            resume: document.querySelector('.nav_resume')
        }
    };

    // Mobile menu toggle
    if (navElements.menuToggle && navElements.navMenu) {
        navElements.menuToggle.addEventListener('click', () => {
            navElements.navMenu.classList.toggle('active');
            navElements.menuToggle.classList.toggle('active');
        });

        // Close menu when clicking nav items on mobile
        const mobileNavItems = document.querySelectorAll('.nav_migs > div, .nav_migs > a');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navElements.navMenu.classList.remove('active');
                    navElements.menuToggle.classList.remove('active');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !navElements.menuToggle.contains(e.target) && 
                !navElements.navMenu.contains(e.target)) {
                navElements.navMenu.classList.remove('active');
                navElements.menuToggle.classList.remove('active');
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navElements.navMenu.classList.remove('active');
                navElements.menuToggle.classList.remove('active');
            }
        });
    }

    // Smooth scroll navigation
    setupSmoothScroll(navElements.navItems);

    // Initialize scroll spy
    initializeScrollSpy(navElements.navItems);
}

function setupSmoothScroll(navItems) {
    const scrollTargets = {
        home: '.intro',
        work: '.experience',
        projects: '.projects',
        about: '.about',
        contact: '.contact'
    };

    Object.entries(navItems).forEach(([key, element]) => {
        if (element && scrollTargets[key]) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(scrollTargets[key]);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
}

function initializeScrollSpy(navItems) {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    const setActiveNav = () => {
        if (!sections.length) return;

        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id') || section.getAttribute('data-section');
            }
        });

        // Reset active states
        Object.values(navItems).forEach(navItem => {
            if (navItem && navItem.classList.contains('active-nav')) {
                navItem.classList.remove('active-nav');
            }
        });

        // Set active state based on current section
        const activeNavMap = {
            'experience': navItems.work,
            'projects': navItems.projects,
            'about': navItems.about,
            'contact': navItems.contact
        };

        if (activeNavMap[currentSection]) {
            activeNavMap[currentSection].classList.add('active-nav');
        }
    };

    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                setActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Set initial active state
    setActiveNav();
}

function initializeAnimations() {
    // Intro animation
    const introTl = gsap.timeline();
    introTl
        .from('.me_img', {
            opacity: 0,
            y: 30,
            duration: 0.4,
            ease: 'power2.out'
        })
        .from('.intro_title', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power2.out'
        })
        .from('.subtitle', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.5');

    // Scroll-triggered animations
    const scrollAnimations = [
        {
            trigger: '.experience',
            elements: [
                { selector: '.exp', duration: 1.2 },
                { selector: '.exp_item', duration: 1.2, stagger: 0.3 }
            ]
        },
        {
            trigger: '.projects',
            elements: [
                { selector: '.projects_title', duration: 1 },
                { selector: '.project_item', duration: 1, stagger: 0.3 }
            ]
        },
        {
            trigger: '.about',
            elements: [
                { selector: '.about_title', duration: 1 },
                { selector: '.about_text', duration: 1 }
            ]
        },
        {
            trigger: '.contact',
            elements: [
                { selector: '.contact_title', duration: 1 },
                { selector: '.contact_intro', duration: 1 },
                { selector: '.contact_links', duration: 1, stagger: 0.3 },
                { selector: '.creds_to_SVG', duration: 1 }
            ]
        }
    ];

    scrollAnimations.forEach(({ trigger, elements }) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        elements.forEach(({ selector, duration, stagger }) => {
            tl.from(selector, {
                opacity: 0,
                y: 30,
                duration,
                stagger,
                ease: 'power2.out'
            }, stagger ? '-=0.7' : '');
        });
    });
}