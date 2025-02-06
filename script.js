document.addEventListener('DOMContentLoaded', () => {
    // Typing Animation
    const typingElement = document.querySelector('.typing-animation');
    const roles = ['Engineer', 'Programmer', 'AI/ML Enthusiast','UI/UX Designer'];
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentRole = roles[currentRoleIndex];
        
        if (!isDeleting && currentCharIndex <= currentRole.length) {
            typingElement.textContent = currentRole.slice(0, currentCharIndex);
            currentCharIndex++;
        }
        
        if (isDeleting && currentCharIndex > 0) {
            typingElement.textContent = currentRole.slice(0, currentCharIndex);
            currentCharIndex--;
        }
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        }
        
        if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        }
        
        const speedTyping = isDeleting ? 50 : 100;
        setTimeout(typeText, speedTyping);
    }

    typeText();

    // Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });

            // Update active class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Scroll Reveal Animations
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});