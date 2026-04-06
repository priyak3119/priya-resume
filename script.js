// Ensure DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {

    /* --- Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // keep it or remove it. Let's make it dynamic
            navbar.classList.remove('scrolled');
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            }
        }
    });

    /* --- Mobile Navigation Toggle --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('ion-icon');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('name', 'close-outline');
        } else {
            icon.setAttribute('name', 'menu-outline');
        }
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('ion-icon').setAttribute('name', 'menu-outline');
        });
    });

    /* --- Intersection Observers for Scroll Animations --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you only want the animation to play once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .block-reveal');
    animatedElements.forEach(el => observer.observe(el));

    /* --- Initial load animations --- */
    // small timeout to ensure css is ready
    setTimeout(() => {
        document.querySelectorAll('.hero-content .fade-in-up').forEach(el => el.classList.add('visible'));
    }, 100);


    /* --- Contact Form Google Forms Submission --- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Loading state
            btn.innerHTML = 'Sending... <ion-icon name="sync-outline" class="spin"></ion-icon>';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            
            // Send to Google Forms silently using no-cors
            fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSeNZ9uZDXmVKW-Zs5u1Dw7qqxEZKWowzQxOOO4eQrAXJ8qWvg/formResponse", {
                method: "POST",
                mode: "no-cors",
                body: formData
            }).then(() => {
                // Success state
                btn.innerHTML = 'Message Sent! <ion-icon name="checkmark-circle-outline"></ion-icon>';
                btn.classList.add('btn-success');
                btn.style.background = '#10b981';
                
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }).catch(err => {
                // Error state
                btn.innerHTML = 'Error! <ion-icon name="close-circle-outline"></ion-icon>';
                btn.style.background = '#ef4444';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            });
        });
    }
});
