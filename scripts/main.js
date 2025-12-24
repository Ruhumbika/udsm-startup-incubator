// Main JavaScript File
import './modules/mobileNav.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('UDSM Startup Incubator loaded');
    
    // Initialize global functionality
    initSmoothScrolling();
    initAccessibility();
    updateFooterInfo();
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
    const navToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-controls', 'main-navigation');
        navMenu.setAttribute('id', 'main-navigation');
        
        // Update aria-expanded when menu is toggled
        document.addEventListener('click', function(e) {
            if (e.target.closest('.menu-toggle')) {
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
            const navToggle = document.querySelector('.menu-toggle');
            if (navToggle) {
                navToggle.click();
                navToggle.focus();
            }
        }
    });
}

/**
 * Update footer information
 */
function updateFooterInfo() {
    // Update current branch in footer
    const currentBranchElement = document.getElementById('current-branch');
    if (currentBranchElement) {
        currentBranchElement.textContent = 'main';
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
}