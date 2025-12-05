/**
 * LMC 3403 Portfolio - Main JavaScript
 * Handles navigation, scroll animations, and PDF modal
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    initPDFModal();
    initSmoothScroll();
    initRevisionTabs();
});

/**
 * Navigation functionality
 * - Scroll-based background change
 * - Mobile menu toggle
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Handle nav background on scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    // Initial check
    handleScroll();

    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Scroll Reveal Animation
 * Uses Intersection Observer for performance
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    if (revealElements.length === 0) return;

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Also handle stagger elements
    const staggerElements = document.querySelectorAll('[data-reveal-stagger]');
    staggerElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * PDF Modal functionality
 * Fullscreen PDF viewing
 */
function initPDFModal() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const modal = document.getElementById('pdfModal');
    const modalClose = document.getElementById('modalClose');
    const modalPdf = document.getElementById('modalPdf');
    
    if (!fullscreenBtn || !modal) return;

    // Get the PDF source from the embedded viewer
    const pdfViewer = document.querySelector('.pdf-viewer');
    const pdfSrc = pdfViewer ? pdfViewer.src : '';

    // Open modal
    fullscreenBtn.addEventListener('click', () => {
        if (pdfSrc) {
            modalPdf.src = pdfSrc;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalPdf.src = '';
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Revision Tabs functionality
 * Handles tab switching for before/after comparison
 */
function initRevisionTabs() {
    const tabs = document.querySelectorAll('.revision-tab');
    const panels = document.querySelectorAll('.revision-panel');
    
    if (tabs.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active panel
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `panel-${targetTab}`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/**
 * Parallax effect for hero elements (optional enhancement)
 * Disabled by default for performance, uncomment to enable
 */
/*
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroContent = hero.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
    });
}
*/

/**
 * Typing animation for hero text (optional enhancement)
 * Uncomment and add class "typing-text" to element to enable
 */
/*
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        el.style.visibility = 'visible';
        
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 50 + Math.random() * 50);
            }
        };
        
        typeChar();
    });
}
*/

/**
 * Image lightbox for process gallery (optional)
 * Add data-lightbox attribute to images to enable
 */
function initLightbox() {
    const lightboxImages = document.querySelectorAll('[data-lightbox]');
    
    if (lightboxImages.length === 0) return;

    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
        <img class="lightbox-image" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Open lightbox
    lightboxImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Initialize lightbox
initLightbox();

/**
 * Handle PDF loading errors
 * Shows fallback message if PDF fails to load
 */
function handlePDFErrors() {
    const pdfViewers = document.querySelectorAll('.pdf-viewer');
    
    pdfViewers.forEach(viewer => {
        viewer.addEventListener('error', () => {
            const fallback = viewer.parentElement.querySelector('.pdf-fallback');
            if (fallback) {
                viewer.style.display = 'none';
                fallback.style.display = 'flex';
            }
        });
    });
}

handlePDFErrors();

/**
 * Add CSS for lightbox dynamically
 */
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        inset: 0;
        z-index: 300;
        background: rgba(0, 0, 0, 0.95);
        display: none;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }
    
    .lightbox.active {
        display: flex;
    }
    
    .lightbox-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        transition: background 0.2s ease;
    }
    
    .lightbox-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .lightbox-close svg {
        width: 24px;
        height: 24px;
    }
    
    .lightbox-image {
        max-width: 90vw;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
`;
document.head.appendChild(lightboxStyles);

/**
 * Console greeting
 */
console.log('%c🎓 LMC 3403 Portfolio', 'font-size: 24px; font-weight: bold;');
console.log('%cBuilt with care for technical communication excellence.', 'font-size: 14px; color: #888;');


