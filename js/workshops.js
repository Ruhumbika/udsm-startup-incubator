// Workshops Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initWorkshops();
    initCalendar();
    initFilters();
    initModals();
    initTabs();
    initFormValidation();
    loadWorkshopCards();
    
   // Setup mobile menu with premium effects
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                // Close menu
                this.classList.remove('active');
                navLinks.classList.remove('show');
                
                // Re-enable body scroll
                document.body.style.overflow = '';
            } else {
                // Open menu
                this.classList.add('active');
                navLinks.classList.add('show');
                
                // Disable body scroll when menu is open
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('show')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('show')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}
    
    // Initialize animations
    initAnimations();
});

// Initialize workshop data and components
function initWorkshops() {
    console.log('Workshops page initialized');
    
    // Add scroll animations
    setupScrollAnimations();
    
    // Initialize tooltips
    initTooltips();
}

// Initialize FullCalendar
function initCalendar() {
    const calendarEl = document.getElementById('calendar');
    
    if (!calendarEl) return;
    
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listMonth'
        },
        views: {
            timeGridWeek: {
                type: 'timeGrid',
                duration: { days: 7 },
                buttonText: 'Week'
            },
            listMonth: {
                buttonText: 'List'
            }
        },
        events: generateWorkshopEvents(),
        eventClick: function(info) {
            showWorkshopDetails(info.event);
            info.jsEvent.preventDefault();
        },
        eventContent: function(arg) {
            return {
                html: `
                    <div class="fc-event-content">
                        <div class="fc-event-title">${arg.event.title}</div>
                        <div class="fc-event-time">${formatTime(arg.event.start)}</div>
                    </div>
                `
            };
        },
        eventClassNames: function(arg) {
            const level = arg.event.extendedProps.level;
            return ['workshop-event', level];
        },
        dayMaxEvents: 3,
        height: 'auto',
        aspectRatio: 1.5,
        expandRows: true,
        stickyHeaderDates: true,
        navLinks: true,
        nowIndicator: true,
        editable: false,
        selectable: false,
        eventDisplay: 'block',
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: 'short',
            hour12: true
        },
        slotLabelFormat: {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: 'short',
            hour12: true
        }
    });
    
    calendar.render();
    window.calendarInstance = calendar;
    
    // Initialize view toggle buttons
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Switch view
            switch(view) {
                case 'month':
                    calendar.changeView('dayGridMonth');
                    document.getElementById('calendar').style.display = 'block';
                    document.getElementById('workshopList').style.display = 'none';
                    break;
                case 'week':
                    calendar.changeView('timeGridWeek');
                    document.getElementById('calendar').style.display = 'block';
                    document.getElementById('workshopList').style.display = 'none';
                    break;
                case 'list':
                    calendar.changeView('listMonth');
                    document.getElementById('calendar').style.display = 'block';
                    document.getElementById('workshopList').style.display = 'none';
                    break;
            }
        });
    });
}

// Generate workshop events for calendar
function generateWorkshopEvents() {
    const events = [
        {
            id: '1',
            title: 'Business Planning Fundamentals',
            start: getNextWeekday(1, 9),
            end: getNextWeekday(1, 12),
            extendedProps: {
                description: 'Learn how to create a comprehensive business plan that attracts investors and guides your startup journey.',
                category: 'business',
                level: 'beginner',
                format: 'in-person',
                instructor: 'Dr. Michael Chen',
                location: 'Main Conference Hall',
                capacity: 50,
                registered: 32,
                price: 'Free'
            },
            backgroundColor: '#4361ee',
            borderColor: '#4361ee'
        },
        {
            id: '2',
            title: 'Digital Marketing Masterclass',
            start: getNextWeekday(2, 10),
            end: getNextWeekday(2, 13),
            extendedProps: {
                description: 'Master digital marketing strategies to grow your online presence and customer base.',
                category: 'marketing',
                level: 'intermediate',
                format: 'online',
                instructor: 'Sarah Johnson',
                location: 'Zoom Webinar',
                capacity: 100,
                registered: 78,
                price: '$49'
            },
            backgroundColor: '#7209b7',
            borderColor: '#7209b7'
        },
        {
            id: '3',
            title: 'Funding Strategies for Startups',
            start: getNextWeekday(3, 14),
            end: getNextWeekday(3, 17),
            extendedProps: {
                description: 'Explore various funding options and learn how to pitch to investors successfully.',
                category: 'finance',
                level: 'intermediate',
                format: 'hybrid',
                instructor: 'David Wilson',
                location: 'Innovation Hub + Online',
                capacity: 75,
                registered: 45,
                price: '$79'
            },
            backgroundColor: '#f72585',
            borderColor: '#f72585'
        },
        {
            id: '4',
            title: 'Tech Stack for Modern Startups',
            start: getNextWeekday(4, 11),
            end: getNextWeekday(4, 14),
            extendedProps: {
                description: 'Choose and implement the right technology stack for your startup needs.',
                category: 'technology',
                level: 'intermediate',
                format: 'in-person',
                instructor: 'Alex Rodriguez',
                location: 'Tech Lab',
                capacity: 40,
                registered: 28,
                price: '$99'
            },
            backgroundColor: '#4cc9f0',
            borderColor: '#4cc9f0'
        },
        {
            id: '5',
            title: 'Legal Foundations for Entrepreneurs',
            start: getNextWeekday(5, 9),
            end: getNextWeekday(5, 12),
            extendedProps: {
                description: 'Understand legal requirements and protect your business from common pitfalls.',
                category: 'legal',
                level: 'beginner',
                format: 'online',
                instructor: 'Emily Thompson',
                location: 'Microsoft Teams',
                capacity: 200,
                registered: 156,
                price: 'Free'
            },
            backgroundColor: '#3a0ca3',
            borderColor: '#3a0ca3'
        },
        {
            id: '6',
            title: 'Leadership and Team Building',
            start: getNextWeekday(2, 14),
            end: getNextWeekday(2, 17),
            extendedProps: {
                description: 'Develop leadership skills and learn how to build and manage effective teams.',
                category: 'leadership',
                level: 'advanced',
                format: 'in-person',
                instructor: 'Robert Kim',
                location: 'Leadership Center',
                capacity: 30,
                registered: 22,
                price: '$149'
            },
            backgroundColor: '#560bad',
            borderColor: '#560bad'
        },
        {
            id: '7',
            title: 'Sales Funnel Optimization',
            start: getNextWeekday(3, 9),
            end: getNextWeekday(3, 12),
            extendedProps: {
                description: 'Optimize your sales funnel to convert more leads into customers.',
                category: 'marketing',
                level: 'advanced',
                format: 'hybrid',
                instructor: 'Lisa Wang',
                location: 'Sales Theater + Online',
                capacity: 60,
                registered: 48,
                price: '$89'
            },
            backgroundColor: '#b5179e',
            borderColor: '#b5179e'
        },
        {
            id: '8',
            title: 'Financial Modeling Workshop',
            start: getNextWeekday(4, 14),
            end: getNextWeekday(4, 17),
            extendedProps: {
                description: 'Create professional financial models for your startup business plan.',
                category: 'finance',
                level: 'advanced',
                format: 'in-person',
                instructor: 'James Miller',
                location: 'Finance Lab',
                capacity: 25,
                registered: 18,
                price: '$199'
            },
            backgroundColor: '#4895ef',
            borderColor: '#4895ef'
        }
    ];
    
    return events;
}

// Get next specific weekday at specific hour
function getNextWeekday(weekday, hour) {
    const now = new Date();
    const result = new Date(now);
    
    // Get days until next specific weekday
    result.setDate(now.getDate() + ((7 + weekday - now.getDay()) % 7));
    
    // Set time
    result.setHours(hour, 0, 0, 0);
    
    // If it's today but past the hour, go to next week
    if (result < now) {
        result.setDate(result.getDate() + 7);
    }
    
    return result.toISOString().slice(0, 16);
}

// Initialize filter system
function initFilters() {
    // Initialize Select2
    $('.select2').select2({
        theme: 'bootstrap-5',
        placeholder: 'Select options...',
        allowClear: true,
        width: '100%'
    });
    
    // Search filter
    const searchInput = document.getElementById('workshopSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterWorkshops, 300));
    }
    
    // Category filter
    $('#categoryFilter').on('change', filterWorkshops);
    
    // Skill level filter
    $('#skillLevelFilter').on('change', filterWorkshops);
    
    // Format filter
    $('#formatFilter').on('change', filterWorkshops);
    
    // Reset filters
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
}

// Filter workshops based on selected criteria
function filterWorkshops() {
    const searchTerm = document.getElementById('workshopSearch').value.toLowerCase();
    const categories = $('#categoryFilter').val() || [];
    const skillLevels = $('#skillLevelFilter').val() || [];
    const formats = $('#formatFilter').val() || [];
    
    // Get all workshop cards
    const workshopCards = document.querySelectorAll('.workshop-card');
    const calendarEvents = document.querySelectorAll('.fc-event');
    
    let visibleCount = 0;
    
    // Filter workshop cards
    workshopCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.dataset.category;
        const level = card.dataset.level;
        const format = card.dataset.format;
        
        let matches = true;
        
        // Check search term
        if (searchTerm && !title.includes(searchTerm)) {
            matches = false;
        }
        
        // Check category
        if (categories.length > 0 && !categories.includes('all') && !categories.includes(category)) {
            matches = false;
        }
        
        // Check skill level
        if (skillLevels.length > 0 && !skillLevels.includes('all') && !skillLevels.includes(level)) {
            matches = false;
        }
        
        // Check format
        if (formats.length > 0 && !formats.includes('all') && !formats.includes(format)) {
            matches = false;
        }
        
        if (matches) {
            card.style.display = 'block';
            visibleCount++;
            
            // Add animation
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update calendar events
    if (window.calendarInstance) {
        const events = window.calendarInstance.getEvents();
        
        events.forEach(event => {
            const eventProps = event.extendedProps;
            let matches = true;
            
            // Check category
            if (categories.length > 0 && !categories.includes('all') && !categories.includes(eventProps.category)) {
                matches = false;
            }
            
            // Check skill level
            if (skillLevels.length > 0 && !skillLevels.includes('all') && !skillLevels.includes(eventProps.level)) {
                matches = false;
            }
            
            // Check format
            if (formats.length > 0 && !formats.includes('all') && !formats.includes(eventProps.format)) {
                matches = false;
            }
            
            if (matches) {
                event.setProp('display', 'auto');
            } else {
                event.setProp('display', 'none');
            }
        });
    }
    
    // Show message if no results
    const grid = document.getElementById('workshopGrid');
    let noResults = grid.querySelector('.no-results');
    
    if (visibleCount === 0) {
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <i class="fas fa-search" style="font-size: 3rem; color: #999; margin-bottom: 20px;"></i>
                    <h3>No workshops found</h3>
                    <p>Try adjusting your filters or search terms</p>
                    <button class="btn btn-primary" onclick="resetFilters()">Reset Filters</button>
                </div>
            `;
            grid.appendChild(noResults);
        }
    } else if (noResults) {
        noResults.remove();
    }
}

// Reset all filters
function resetFilters() {
    // Reset search
    document.getElementById('workshopSearch').value = '';
    
    // Reset Select2 filters
    $('#categoryFilter').val(null).trigger('change');
    $('#skillLevelFilter').val(null).trigger('change');
    $('#formatFilter').val(null).trigger('change');
    
    // Reset calendar view
    if (window.calendarInstance) {
        window.calendarInstance.getEvents().forEach(event => {
            event.setProp('display', 'auto');
        });
    }
    
    // Show all workshop cards
    document.querySelectorAll('.workshop-card').forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = 'fadeInUp 0.5s ease';
    });
    
    // Remove no results message
    const noResults = document.querySelector('.no-results');
    if (noResults) {
        noResults.remove();
    }
}

// Initialize modals
function initModals() {
    // Workshop details modal
    const modal = document.getElementById('workshopModal');
    const closeBtn = modal.querySelector('.close');
    
    // Registration modal
    const regModal = document.getElementById('registration-modal');
    const regCloseBtn = regModal.querySelector('.close');
    const regCancelBtn = regModal.querySelector('.close-modal');
    
    // Open registration modal buttons
    document.querySelectorAll('.open-registration').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openRegistrationModal();
        });
    });
    
    // Close modals when clicking X
    [closeBtn, regCloseBtn].forEach(btn => {
        btn.addEventListener('click', function() {
            modal.style.display = 'none';
            regModal.style.display = 'none';
        });
    });
    
    // Close registration modal with cancel button
    if (regCancelBtn) {
        regCancelBtn.addEventListener('click', function() {
            regModal.style.display = 'none';
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
        if (e.target === regModal) {
            regModal.style.display = 'none';
        }
    });
}

// Show workshop details in modal
function showWorkshopDetails(event) {
    const modal = document.getElementById('workshopModal');
    const modalContent = document.getElementById('workshopModalContent');
    const props = event.extendedProps;
    
    modalContent.innerHTML = `
        <div class="workshop-details">
            <div class="workshop-header">
                <span class="workshop-category">${props.category.toUpperCase()}</span>
                <h2>${event.title}</h2>
                <div class="workshop-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(event.start)}</span>
                    <span><i class="fas fa-clock"></i> ${formatTime(event.start)} - ${formatTime(event.end)}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${props.location}</span>
                </div>
            </div>
            
            <div class="workshop-body">
                <div class="workshop-description">
                    <h3>Workshop Description</h3>
                    <p>${props.description}</p>
                </div>
                
                <div class="workshop-info-grid">
                    <div class="info-card">
                        <div class="info-icon">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <div class="info-content">
                            <h4>Instructor</h4>
                            <p>${props.instructor}</p>
                        </div>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="info-content">
                            <h4>Capacity</h4>
                            <p>${props.registered}/${props.capacity} seats filled</p>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${(props.registered/props.capacity)*100}%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div class="info-content">
                            <h4>Skill Level</h4>
                            <p><span class="workshop-level ${props.level}">${props.level.toUpperCase()}</span></p>
                        </div>
                    </div>
                    
                    <div class="info-card">
                        <div class="info-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="info-content">
                            <h4>Price</h4>
                            <p class="price">${props.price === 'Free' ? 'Free' : props.price}</p>
                        </div>
                    </div>
                </div>
                
                <div class="workshop-actions">
                    <button class="btn btn-primary" onclick="openRegistrationModal('${event.title}')">
                        <i class="fas fa-ticket-alt"></i> Register Now
                    </button>
                    <button class="btn btn-outline" onclick="addToCalendar('${event.title}', '${props.description}', '${event.start}', '${event.end}', '${props.location}')">
                        <i class="far fa-calendar-plus"></i> Add to Calendar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Open registration modal
function openRegistrationModal(workshopName = '') {
    const modal = document.getElementById('registration-modal');
    
    if (workshopName) {
        const select = document.getElementById('workshopSelect');
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.includes(workshopName)) {
                select.value = select.options[i].value;
                break;
            }
        }
    }
    
    modal.style.display = 'block';
}

// Initialize tabs
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const workshopGrid = document.getElementById('workshopGrid');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter workshops based on tab
            const tab = this.dataset.tab;
            filterByTab(tab);
        });
    });
}

// Filter workshops by tab
function filterByTab(tab) {
    const cards = document.querySelectorAll('.workshop-card');
    
    cards.forEach(card => {
        switch(tab) {
            case 'featured':
                card.style.display = card.dataset.featured === 'true' ? 'block' : 'none';
                break;
            case 'new':
                card.style.display = card.dataset.new === 'true' ? 'block' : 'none';
                break;
            case 'popular':
                card.style.display = card.dataset.popular === 'true' ? 'block' : 'none';
                break;
            case 'free':
                card.style.display = card.dataset.price === 'Free' ? 'block' : 'none';
                break;
        }
        
        // Add animation
        if (card.style.display === 'block') {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = 'fadeInUp 0.5s ease';
        }
    });
}

// Load workshop cards dynamically
function loadWorkshopCards() {
    const grid = document.getElementById('workshopGrid');
    
    const workshops = [
        {
            id: 1,
            title: 'Business Planning Fundamentals',
            category: 'business',
            level: 'beginner',
            format: 'in-person',
            date: 'Next Monday',
            time: '9:00 AM - 12:00 PM',
            instructor: 'Dr. Michael Chen',
            description: 'Learn how to create a comprehensive business plan that attracts investors.',
            price: 'Free',
            featured: true,
            new: false,
            popular: true,
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            title: 'Digital Marketing Masterclass',
            category: 'marketing',
            level: 'intermediate',
            format: 'online',
            date: 'Next Tuesday',
            time: '10:00 AM - 1:00 PM',
            instructor: 'Sarah Johnson',
            description: 'Master digital marketing strategies to grow your online presence.',
            price: '$49',
            featured: true,
            new: true,
            popular: true,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            title: 'Funding Strategies for Startups',
            category: 'finance',
            level: 'intermediate',
            format: 'hybrid',
            date: 'Next Wednesday',
            time: '2:00 PM - 5:00 PM',
            instructor: 'David Wilson',
            description: 'Explore various funding options and learn how to pitch to investors.',
            price: '$79',
            featured: true,
            new: false,
            popular: true,
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 4,
            title: 'Tech Stack for Modern Startups',
            category: 'technology',
            level: 'intermediate',
            format: 'in-person',
            date: 'Next Thursday',
            time: '11:00 AM - 2:00 PM',
            instructor: 'Alex Rodriguez',
            description: 'Choose and implement the right technology stack for your startup.',
            price: '$99',
            featured: false,
            new: true,
            popular: false,
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ];
    
    workshops.forEach(workshop => {
        const card = createWorkshopCard(workshop);
        grid.appendChild(card);
    });
}

// Create workshop card element
function createWorkshopCard(workshop) {
    const card = document.createElement('div');
    card.className = `workshop-card ${workshop.featured ? 'featured' : ''}`;
    card.dataset.category = workshop.category;
    card.dataset.level = workshop.level;
    card.dataset.format = workshop.format;
    card.dataset.featured = workshop.featured;
    card.dataset.new = workshop.new;
    card.dataset.popular = workshop.popular;
    card.dataset.price = workshop.price;
    
    card.innerHTML = `
        <div class="workshop-image">
            <img src="${workshop.image}" alt="${workshop.title}">
        </div>
        <div class="workshop-content">
            <span class="workshop-category">${workshop.category.toUpperCase()}</span>
            <h3>${workshop.title}</h3>
            <p>${workshop.description}</p>
            
            <div class="workshop-meta">
                <span><i class="fas fa-calendar"></i> ${workshop.date}</span>
                <span><i class="fas fa-clock"></i> ${workshop.time}</span>
                <span><i class="fas fa-user-tie"></i> ${workshop.instructor}</span>
            </div>
            
            <div class="workshop-footer">
                <span class="workshop-level ${workshop.level}">${workshop.level.toUpperCase()}</span>
                <span class="workshop-price">${workshop.price}</span>
            </div>
            
            <div class="workshop-actions">
                <button class="btn btn-small btn-primary" onclick="openRegistrationModal('${workshop.title}')">
                    Register Now
                </button>
                <button class="btn btn-small btn-outline" onclick="showWorkshopPreview(${workshop.id})">
                    Learn More
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Initialize form validation
function initFormValidation() {
    const form = document.getElementById('workshopRegistrationForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitRegistration();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

// Validate form
function validateForm() {
    const form = document.getElementById('workshopRegistrationForm');
    let isValid = true;
    
    const fields = [
        { id: 'fullName', type: 'text', message: 'Please enter your full name' },
        { id: 'email', type: 'email', message: 'Please enter a valid email address' },
        { id: 'phone', type: 'tel', message: 'Please enter a valid phone number' },
        { id: 'workshopSelect', type: 'select', message: 'Please select a workshop' },
        { id: 'experience', type: 'select', message: 'Please select your experience level' },
        { id: 'terms', type: 'checkbox', message: 'You must agree to the terms and conditions' }
    ];
    
    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!validateField(element)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    let isValid = true;
    const errorElement = document.getElementById(field.id + 'Error');
    
    if (!errorElement) return true;
    
    // Clear previous error
    errorElement.style.display = 'none';
    field.style.borderColor = '#e1e5ee';
    
    // Check required fields
    if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, errorElement, 'This field is required');
        isValid = false;
    }
    
    // Validate email
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            showError(field, errorElement, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Validate phone
    if (field.id === 'phone' && field.value.trim()) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(field.value.replace(/\D/g, ''))) {
            showError(field, errorElement, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    return isValid;
}

// Show error message
function showError(field, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    field.style.borderColor = '#dc3545';
    
    // Add shake animation
    field.style.animation = 'none';
    field.offsetHeight; // Trigger reflow
    field.style.animation = 'shake 0.5s ease';
}

// Clear error
function clearError(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    field.style.borderColor = '#e1e5ee';
}

// Submit registration
function submitRegistration() {
    const form = document.getElementById('workshopRegistrationForm');
    const formData = new FormData(form);
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        const modal = document.getElementById('registration-modal');
        modal.querySelector('.registration-form').innerHTML = `
            <div class="success-message" style="text-align: center; padding: 40px;">
                <div class="success-icon" style="width: 80px; height: 80px; background: #d4edda; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                    <i class="fas fa-check" style="font-size: 2.5rem; color: #28a745;"></i>
                </div>
                <h2 style="color: #28a745; margin-bottom: 15px;">Registration Successful!</h2>
                <p style="color: #666; margin-bottom: 30px;">Thank you for registering. You will receive a confirmation email shortly with workshop details.</p>
                <button class="btn btn-primary" onclick="closeModal('registration-modal')">
                    Continue Browsing
                </button>
            </div>
        `;
    }, 1000);
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Add to calendar function
function addToCalendar(title, description, start, end, location) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Create Google Calendar link
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${formatCalendarDate(startDate)}/${formatCalendarDate(endDate)}`;
    
    // Open in new tab
    window.open(googleCalendarUrl, '_blank');
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (navLinks.classList.contains('show')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                mobileMenuBtn.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// Initialize animations
function initAnimations() {
    // Add CSS for shake animation
    if (!document.querySelector('#shake-animation')) {
        const style = document.createElement('style');
        style.id = 'shake-animation';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatCalendarDate(date) {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Expose necessary functions to global scope
window.showWorkshopPreview = function(id) {
    alert(`Workshop preview for ID: ${id}\nThis would show more details about the workshop.`);
};

window.addToCalendar = addToCalendar;
window.resetFilters = resetFilters;
window.openRegistrationModal = openRegistrationModal;
window.closeModal = closeModal;