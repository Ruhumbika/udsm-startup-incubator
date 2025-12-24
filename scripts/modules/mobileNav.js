// Mobile Navigation
console.log('Mobile navigation script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing mobile nav...');
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // Debug: Check if elements exist
    if (!menuToggle) console.error('Menu toggle button not found');
    if (!navMenu) console.error('Nav menu not found');
    if (!menuOverlay) console.error('Menu overlay not found');
    
    if (!menuToggle || !navMenu || !menuOverlay) return;
    
    console.log('All elements found:', { menuToggle, navMenu, menuOverlay });
    
    // Toggle menu function
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        // Update ARIA attribute
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle classes
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Toggle icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = isExpanded ? 'fas fa-bars' : 'fas fa-times';
        }
        
        // Toggle body scroll
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
        
        console.log('Menu toggled:', !isExpanded ? 'opened' : 'closed');
    }
    
    // Close menu function
    function closeMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
        
        console.log('Menu closed');
    }
    
    // Event Listeners
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    menuOverlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking nav links (mobile only)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                closeMenu();
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    console.log('Mobile navigation initialized successfully');
});