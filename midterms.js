document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    //nav shi
    const allNavItems = {
        home: document.querySelector('.homenav'),
        work: document.querySelector('.worknav'),
        projects: document.querySelector('.projectsnav'),
        about: document.querySelector('.aboutnav'),
        contact: document.querySelector('.contactnav')
    };

    //kuha section
    const sections = document.querySelectorAll('section');

    //responsive shit kung mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMigs = document.querySelector('.nav_migs');

    menuToggle.addEventListener('click', () => {
        navMigs.classList.toggle('active');
    });

    //close ig click ug menu item pls work
    document.querySelectorAll('.nav_migs > div').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMigs.classList.remove('active');
            }
        });
    });
    //intro anim
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

    //exp anim
    const experienceTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.experience',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            markers: false
        }
    });

    experienceTl
        .from('.exp', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        })
        .from('.exp_item', {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.3,
            ease: 'power2.out'
        }, '-=0.7');

    //projects anim
    const projectsTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            markers: false
        }
    });

    projectsTl
        .from('.projects_title', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        })
        .from('.project_item', {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.3,
            ease: 'power2.out'
        }, '-=0.7');

    //about anim
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            markers: false
        }
    });

    aboutTl
        .from('.about_title', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        })
        .from('.about_text', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.7');

    // contact anim
    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            markers: false
        }
    });

    contactTl
        .from('.contact_title', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        })
        .from('.contact_links', {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.3,
            ease: 'power2.out'
        }, '-=0.7')
        .from('.creds_to_SVG', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.7');

    let currentSection = '';
    // add/remove active
    const setActiveNav = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        //tanaw unsa nga section ang nas screen
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;
            
            // Active if tunga sa viewport kay sud sa iya bounds
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id') || section.getAttribute('data-section');
            }
        });

        // Remove active class from only the navigation menu items
        Object.values(allNavItems).forEach(navItem => {
            if (navItem.classList.contains('worknav') || 
                navItem.classList.contains('projectsnav') || 
                navItem.classList.contains('aboutnav') || 
                navItem.classList.contains('contactnav')) {
                navItem.classList.remove('active-nav');
            }
        });

        // Add active class to the corresponding nav link
        switch (currentSection) {
            case 'experience':
                allNavItems.work.classList.add('active-nav');
                break;
            case 'projects':
                allNavItems.projects.classList.add('active-nav');
                break;
            case 'about':
                allNavItems.about.classList.add('active-nav');
                break;
            case 'contact':
                allNavItems.contact.classList.add('active-nav');
                break;
        }
    };

    // Call the function on scroll
    window.addEventListener('scroll', setActiveNav);
    
    // Call the function on page load to set the initial active state
    setActiveNav();

    //click = scroll padung sa kana nga section
    allNavItems.work.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.experience').scrollIntoView({ behavior: 'smooth' });
    });

    allNavItems.projects.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.projects').scrollIntoView({ behavior: 'smooth' });
    });

    allNavItems.about.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.about').scrollIntoView({ behavior: 'smooth' });
    });

    allNavItems.home.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.intro').scrollIntoView({ behavior: 'smooth' });
    });

    allNavItems.contact.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.contact').scrollIntoView({ behavior: 'smooth' });
    });
});