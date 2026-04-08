// ========== SERVICES SLIDESHOW ==========
let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow-container .slide');

function showSlides() {
    if (!slides.length) return;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = 'block';
    }
    
    setTimeout(showSlides, 3500); // Change image every 3.5 seconds
}

// Start slideshow when DOM is loaded
if (slides.length > 0) {
    // Initially hide all and show first
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    if (slides[0]) slides[0].style.display = 'block';
    setTimeout(showSlides, 2000);
}

// ========== VISION & MISSION SLIDESHOW ==========
let visionMissionIndex = 0;
const visionMissionSlides = document.querySelectorAll('#visionMissionSlider .slide-text');

function showVisionMission() {
    if (!visionMissionSlides.length) return;
    
    visionMissionSlides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    visionMissionIndex++;
    if (visionMissionIndex > visionMissionSlides.length) {
        visionMissionIndex = 1;
    }
    
    if (visionMissionSlides[visionMissionIndex - 1]) {
        visionMissionSlides[visionMissionIndex - 1].style.display = 'block';
    }
    
    setTimeout(showVisionMission, 4000); // Switch every 4 seconds
}

// Start Vision & Mission slideshow
if (visionMissionSlides.length > 0) {
    visionMissionSlides.forEach(slide => {
        slide.style.display = 'none';
    });
    if (visionMissionSlides[0]) visionMissionSlides[0].style.display = 'block';
    setTimeout(showVisionMission, 1500);
}

// ========== SMOOTH SCROLLING WITH OFFSET FOR FIXED BOTTOM NAV ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            // Check if we're on mobile (bottom nav visible)
            const isMobile = window.innerWidth <= 768;
            
            // Offset: bottom nav height on mobile (about 65px), otherwise 0
            const offset = isMobile ? 70 : 0;
            
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksDesktop = document.querySelectorAll('.navbar ul li a');
    const navLinksMobile = document.querySelectorAll('.bottom-nav a');
    
    const scrollPosition = window.scrollY + 120; // offset for better detection
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update desktop nav
    navLinksDesktop.forEach(link => {
        link.style.background = '';
        link.style.color = '#0a1f44';
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.style.background = '#f5b04230';
            link.style.color = '#c47d2e';
        }
    });
    
    // Update mobile bottom nav
    navLinksMobile.forEach(link => {
        link.style.color = '#e2e8f0';
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.style.color = '#f5b042';
        }
    });
}

// Listen to scroll events
window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

// ========== HANDLE RESIZE: re-evaluate offset on orientation change ==========
window.addEventListener('resize', function() {
    setActiveNavLink();
    // Fix any potential slideshow display issues
    if (slides.length > 0 && slides[slideIndex - 1]) {
        slides.forEach(slide => {
            if (slide !== slides[slideIndex - 1]) {
                slide.style.display = 'none';
            }
        });
        slides[slideIndex - 1].style.display = 'block';
    }
});

// ========== PREVENT BODY SCROLL ISSUE ON MOBILE ==========
// Ensure that clicking bottom nav doesn't cause layout shift
const bottomNavLinks = document.querySelectorAll('.bottom-nav a');
bottomNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Smooth scroll is handled by the existing listener,
        // but we need to ensure it works with the offset.
        // The existing listener already covers this.
    });
});

// ========== FALLBACK: If images fail to load, they show placeholders gracefully ==========
console.log('thelord PUBLICATION | Website loaded successfully');
