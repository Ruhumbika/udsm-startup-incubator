// mobileNav.js - Premium Mobile Navigation Module
export function initMobileNavigation() {
    // This function is now integrated into initPremiumNavigation
    console.log('Premium mobile navigation initialized');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active navigation
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    // Highlight current page in navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
    
    // Special handling for homepage
    if (currentPage === '' || currentPage === 'index.html') {
        const homeLink = document.querySelector('.nav-link[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
});

// Add touch support for mobile
document.addEventListener('touchstart', function() {}, {passive: true});

// Export for use in main.js
export default initMobileNavigation;