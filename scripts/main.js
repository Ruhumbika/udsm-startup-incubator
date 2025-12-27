// Main JavaScript File
import './modules/mobileNav.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('UDSM Startup Incubator loaded');
    
    // Initialize global functionality
    initSmoothScrolling();
    initAccessibility();
    initPremiumNavigation();
    updateFooterInfo();
    initScrollEffects();
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100; // Account for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without adding to history
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
}

/**
 * Initialize accessibility features
 */
function initAccessibility() {
    // Add ARIA attributes to navigation
    const navToggle = document.querySelector('.hamburger') || document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-controls', 'main-navigation');
        navMenu.setAttribute('id', 'main-navigation');
        
        // Update aria-expanded when menu is toggled
        document.addEventListener('click', function(e) {
            if (e.target.closest('.hamburger') || e.target.closest('.menu-toggle')) {
                const expanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !expanded);
            } else if (!e.target.closest('.nav-menu') && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Add keyboard navigation for menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            const navToggle = document.querySelector('.hamburger') || document.querySelector('.menu-toggle');
            if (navToggle) {
                navToggle.click();
                navToggle.focus();
            }
        }
    });
}

/**
 * Initialize Premium Navigation with all enhancements
 */
function initPremiumNavigation() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;
    
    // Mobile menu functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isActive = this.classList.contains('active');
            const expanded = this.getAttribute('aria-expanded') === 'true';
            
            if (isActive) {
                // Close menu
                this.classList.remove('active');
                navMenu.classList.remove('active');
                if (menuOverlay) menuOverlay.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            } else {
                // Open menu
                this.classList.add('active');
                navMenu.classList.add('active');
                if (menuOverlay) menuOverlay.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                body.style.overflow = 'hidden';
            }
        });
        
        // Close menu when clicking overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                this.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
        }
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                if (menuOverlay) menuOverlay.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                if (menuOverlay) menuOverlay.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    }
    
    // Set active navigation based on current page
    function setActiveNav() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Find and activate current page
        let foundActive = false;
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
                foundActive = true;
            }
        });
        
        // Special case for index.html or home page
        if (!foundActive && (currentPage === 'index.html' || currentPage === '')) {
            const homeLink = document.querySelector('a[href="index.html"]');
            if (homeLink) homeLink.classList.add('active');
        }
        
        // Fallback for pages in subdirectories
        if (!foundActive) {
            const pageName = currentPage.replace('.html', '');
            document.querySelectorAll('.nav-link').forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.includes(pageName)) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    setActiveNav();
    
    // Add hover effects for desktop navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        link.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize scroll effects for navbar
 */
function initScrollEffects() {
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Update active nav based on scroll position (for one-page sites)
        updateActiveNavOnScroll();
    });
    
    // Add scroll animations for navigation items
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
    
    // Observe navigation items for animation
    document.querySelectorAll('.nav-item').forEach(item => {
        observer.observe(item);
    });
}

/**
 * Update active navigation based on scroll position (for one-page layouts)
 */
function updateActiveNavOnScroll() {
    // This function can be extended for single-page applications
    // Currently focused on multi-page navigation
    return;
}

/**
 * Update footer information
 */
function updateFooterInfo() {
    // Update current branch in footer
    const currentBranchElement = document.getElementById('current-branch');
    if (currentBranchElement) {
        currentBranchElement.textContent = 'feature-emmanuel-workshops-page';
    }
    
    // Update last updated date
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const today = new Date();
        lastUpdatedElement.textContent = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Update copyright year
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading on window load
window.addEventListener('load', initLazyLoading);

// Export functions for use in other modules
export {
    initSmoothScrolling,
    initAccessibility,
    initPremiumNavigation,
    updateFooterInfo,
    initScrollEffects
};