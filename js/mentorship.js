// mentorship.js - Premium Mentorship Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🤝 Mentorship page initialized');
    
    // Initialize all components
    initAnimations();
    initMentorGrid();
    initFilters();
    initFormSteps();
    initSwiper();
    initCounters();
    initMobileMenu();
    initModals();
    initFormValidation();
    
    // Load initial data
    loadMentors();
});

// ==================== MENTOR DATA ====================
const mentors = [
    {
        id: 1,
        name: "Dr. Jane Mwangi",
        title: "FinTech Expert",
        company: "TechGrowth Africa",
        expertise: ["FinTech", "Investment", "Business Strategy"],
        industry: ["Technology", "Finance"],
        experience: 15,
        availability: "available",
        rating: 4.9,
        sessions: 42,
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Former banker with 15+ years in financial technology. Helped 20+ startups secure funding.",
        matchScore: 98
    },
    {
        id: 2,
        name: "Prof. Ahmed Hassan",
        title: "AI Researcher",
        company: "UDSM Computer Science",
        expertise: ["Artificial Intelligence", "Machine Learning", "Data Science"],
        industry: ["Technology", "Education"],
        experience: 12,
        availability: "weekdays",
        rating: 4.8,
        sessions: 35,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Leading AI researcher with multiple published papers. Focus on practical AI applications.",
        matchScore: 92
    },
    {
        id: 3,
        name: "Sarah Johnson",
        title: "Marketing Director",
        company: "Digital Growth Tanzania",
        expertise: ["Digital Marketing", "Brand Strategy", "Growth Hacking"],
        industry: ["Marketing", "Retail"],
        experience: 8,
        availability: "flexible",
        rating: 4.7,
        sessions: 28,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Helped 50+ brands grow their digital presence across East Africa.",
        matchScore: 87
    },
    {
        id: 4,
        name: "Michael Chenge",
        title: "Legal Advisor",
        company: "Chenge & Partners Advocates",
        expertise: ["Corporate Law", "Intellectual Property", "Compliance"],
        industry: ["Legal", "Finance"],
        experience: 20,
        availability: "weekdays",
        rating: 4.9,
        sessions: 55,
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Specialized in startup legal structuring and IP protection across Africa.",
        matchScore: 95
    },
    {
        id: 5,
        name: "Grace Banda",
        title: "AgriTech Entrepreneur",
        company: "FarmTech Solutions",
        expertise: ["AgriTech", "Supply Chain", "Sustainability"],
        industry: ["Agriculture", "Technology"],
        experience: 10,
        availability: "available",
        rating: 4.6,
        sessions: 31,
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Built a successful AgriTech startup serving 10,000+ farmers.",
        matchScore: 89
    },
    {
        id: 6,
        name: "David Mushi",
        title: "Investment Partner",
        company: "Tanzania Venture Capital",
        expertise: ["Venture Capital", "Investment", "Due Diligence"],
        industry: ["Finance", "Investment"],
        experience: 18,
        availability: "flexible",
        rating: 4.8,
        sessions: 67,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Led investments in 30+ African startups with successful exits.",
        matchScore: 96
    }
];

// ==================== ANIMATIONS ====================
function initAnimations() {
    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    
    // Number counters
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        animateCounter(counter, target);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// ==================== MENTOR GRID ====================
let currentPage = 1;
const mentorsPerPage = 6;
let filteredMentors = [...mentors];

function initMentorGrid() {
    renderMentorGrid();
    initPagination();
}

function renderMentorGrid() {
    const mentorGrid = document.getElementById('mentorGrid');
    if (!mentorGrid) return;
    
    // Clear loading state
    mentorGrid.innerHTML = '';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * mentorsPerPage;
    const endIndex = startIndex + mentorsPerPage;
    const pageMentors = filteredMentors.slice(startIndex, endIndex);
    
    if (pageMentors.length === 0) {
        mentorGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No mentors found</h3>
                <p>Try adjusting your filters</p>
                <button class="btn-text" id="resetFiltersBtn">Reset Filters</button>
            </div>
        `;
        document.getElementById('resetFiltersBtn').addEventListener('click', resetFilters);
        return;
    }
    
    // Create mentor cards
    pageMentors.forEach(mentor => {
        const mentorCard = createMentorCard(mentor);
        mentorGrid.appendChild(mentorCard);
    });
    
    // Update pagination
    updatePagination();
}

function createMentorCard(mentor) {
    const card = document.createElement('div');
    card.className = 'mentor-card';
    card.setAttribute('data-mentor-id', mentor.id);
    
    // Calculate availability badge
    let availabilityBadge = '';
    let badgeClass = '';
    switch(mentor.availability) {
        case 'available':
            availabilityBadge = '<span class="badge available">Available Now</span>';
            badgeClass = 'available';
            break;
        case 'weekdays':
            availabilityBadge = '<span class="badge weekdays">Weekdays</span>';
            badgeClass = 'weekdays';
            break;
        case 'flexible':
            availabilityBadge = '<span class="badge flexible">Flexible</span>';
            badgeClass = 'flexible';
            break;
    }
    
    // Create expertise tags
    const expertiseTags = mentor.expertise.slice(0, 3).map(tag => 
        `<span class="expertise-tag">${tag}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="mentor-card-inner">
            <div class="mentor-header">
                <div class="mentor-image">
                    <img src="${mentor.image}" alt="${mentor.name}">
                    ${availabilityBadge}
                    <div class="match-score" style="--score: ${mentor.matchScore}">
                        <span>${mentor.matchScore}%</span>
                    </div>
                </div>
                <div class="mentor-info">
                    <h3 class="mentor-name">${mentor.name}</h3>
                    <p class="mentor-title">${mentor.title}</p>
                    <p class="mentor-company">
                        <i class="fas fa-building"></i> ${mentor.company}
                    </p>
                    <div class="mentor-rating">
                        <div class="stars">
                            ${generateStars(mentor.rating)}
                        </div>
                        <span class="rating-text">${mentor.rating} (${mentor.sessions} sessions)</span>
                    </div>
                </div>
            </div>
            
            <div class="mentor-expertise">
                <div class="expertise-tags">
                    ${expertiseTags}
                    ${mentor.expertise.length > 3 ? '<span class="more-tags">+' + (mentor.expertise.length - 3) + '</span>' : ''}
                </div>
            </div>
            
            <div class="mentor-details">
                <div class="detail-item">
                    <i class="fas fa-briefcase"></i>
                    <span>${mentor.experise} years</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-industry"></i>
                    <span>${mentor.industry.join(', ')}</span>
                </div>
            </div>
            
            <div class="mentor-actions">
                <button class="btn-view-profile" data-mentor-id="${mentor.id}">
                    <i class="fas fa-eye"></i> View Profile
                </button>
                <button class="btn-request-mentor" data-mentor-id="${mentor.id}">
                    <i class="fas fa-handshake"></i> Request Session
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    card.querySelector('.btn-view-profile').addEventListener('click', () => showMentorModal(mentor.id));
    card.querySelector('.btn-request-mentor').addEventListener('click', () => requestMentorSession(mentor.id));
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
    if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i = 0; i < emptyStars; i++) stars += '<i class="far fa-star"></i>';
    
    return stars;
}

// ==================== FILTERS ====================
function initFilters() {
    // Initialize Select2
    $('.select2-multiple').select2({
        placeholder: 'Select options',
        allowClear: true,
        width: '100%'
    });
    
    // Search functionality
    const searchInput = document.getElementById('mentorSearch');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
        searchBtn.addEventListener('click', applyFilters);
    }
    
    // Filter controls
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    
    if (applyFiltersBtn) applyFiltersBtn.addEventListener('click', applyFilters);
    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetFilters);
    
    // Individual filter changes
    document.querySelectorAll('#expertiseFilter, #industryFilter, #availabilityFilter, #experienceFilter').forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
}

function applyFilters() {
    const searchTerm = document.getElementById('mentorSearch')?.value.toLowerCase() || '';
    const expertiseFilter = $('#expertiseFilter').val() || [];
    const industryFilter = $('#industryFilter').val() || [];
    const availabilityFilter = document.getElementById('availabilityFilter')?.value || '';
    const experienceFilter = document.getElementById('experienceFilter')?.value || '';
    
    filteredMentors = mentors.filter(mentor => {
        // Search filter
        const matchesSearch = searchTerm === '' || 
            mentor.name.toLowerCase().includes(searchTerm) ||
            mentor.title.toLowerCase().includes(searchTerm) ||
            mentor.company.toLowerCase().includes(searchTerm) ||
            mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm));
        
        // Expertise filter
        const matchesExpertise = expertiseFilter.length === 0 ||
            mentor.expertise.some(exp => expertiseFilter.includes(exp.toLowerCase()));
        
        // Industry filter
        const matchesIndustry = industryFilter.length === 0 ||
            mentor.industry.some(ind => industryFilter.includes(ind.toLowerCase()));
        
        // Availability filter
        const matchesAvailability = availabilityFilter === '' ||
            mentor.availability === availabilityFilter;
        
        // Experience filter
        const matchesExperience = experienceFilter === '' ||
            mentor.experience >= parseInt(experienceFilter);
        
        return matchesSearch && matchesExpertise && matchesIndustry && 
               matchesAvailability && matchesExperience;
    });
    
    // Reset to first page
    currentPage = 1;
    renderMentorGrid();
}

function resetFilters() {
    document.getElementById('mentorSearch').value = '';
    $('#expertiseFilter').val(null).trigger('change');
    $('#industryFilter').val(null).trigger('change');
    document.getElementById('availabilityFilter').value = '';
    document.getElementById('experienceFilter').value = '';
    
    filteredMentors = [...mentors];
    currentPage = 1;
    renderMentorGrid();
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

// ==================== PAGINATION ====================
function initPagination() {
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    
    if (prevPageBtn) prevPageBtn.addEventListener('click', goToPrevPage);
    if (nextPageBtn) nextPageBtn.addEventListener('click', goToNextPage);
}

function updatePagination() {
    const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);
    const pageNumbers = document.getElementById('pageNumbers');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    
    if (!pageNumbers) return;
    
    // Update page numbers
    pageNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => goToPage(i));
        pageNumbers.appendChild(pageNumber);
    }
    
    // Update button states
    if (prevPageBtn) prevPageBtn.disabled = currentPage === 1;
    if (nextPageBtn) nextPageBtn.disabled = currentPage === totalPages;
}

function goToPage(page) {
    currentPage = page;
    renderMentorGrid();
    window.scrollTo({ top: document.getElementById('mentor-directory').offsetTop - 100, behavior: 'smooth' });
}

function goToPrevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

// ==================== FORM STEPS ====================
function initFormSteps() {
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    
    // Step indicator clicks
    stepIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const step = parseInt(this.getAttribute('data-step'));
            goToFormStep(step);
        });
    });
    
    // Next buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = document.querySelector('.form-step.active');
            const nextStep = parseInt(this.getAttribute('data-next'));
            
            if (validateFormStep(currentStep.id)) {
                goToFormStep(nextStep);
            }
        });
    });
    
    // Previous buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            goToFormStep(prevStep);
        });
    });
    
    // Character counter for goals textarea
    const goalsTextarea = document.getElementById('goals');
    const goalsChars = document.getElementById('goalsChars');
    
    if (goalsTextarea && goalsChars) {
        goalsTextarea.addEventListener('input', function() {
            goalsChars.textContent = this.value.length;
        });
    }
}

function goToFormStep(stepNumber) {
    // Update step indicators
    document.querySelectorAll('.step-indicator').forEach(indicator => {
        indicator.classList.remove('active');
        if (parseInt(indicator.getAttribute('data-step')) === stepNumber) {
            indicator.classList.add('active');
        }
    });
    
    // Update form steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
        if (step.id === `step${stepNumber}`) {
            step.classList.add('active');
        }
    });
    
    // Smooth scroll to form
    const formSection = document.querySelector('.request-mentor');
    if (formSection && stepNumber > 1) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function validateFormStep(stepId) {
    const step = document.getElementById(stepId);
    if (!step) return true;
    
    const requiredFields = step.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== SWIPER ====================
function initSwiper() {
    const storiesSwiper = new Swiper('.storiesSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
}

// ==================== MODALS ====================
function initModals() {
    const mentorModal = document.getElementById('mentorModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    
    if (mentorModal && modalOverlay) {
        modalOverlay.addEventListener('click', () => {
            mentorModal.classList.remove('active');
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            mentorModal.classList.remove('active');
        });
    }
    
    // Close modal on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mentorModal.classList.contains('active')) {
            mentorModal.classList.remove('active');
        }
    });
}

function showMentorModal(mentorId) {
    const mentor = mentors.find(m => m.id === mentorId);
    if (!mentor) return;
    
    const modalContent = document.getElementById('mentorModalContent');
    const mentorModal = document.getElementById('mentorModal');
    
    if (!modalContent || !mentorModal) return;
    
    modalContent.innerHTML = `
        <div class="mentor-modal-body">
            <div class="mentor-modal-header">
                <div class="mentor-image-large">
                    <img src="${mentor.image}" alt="${mentor.name}">
                </div>
                <div class="mentor-header-info">
                    <h2>${mentor.name}</h2>
                    <p class="mentor-title">${mentor.title} at ${mentor.company}</p>
                    <div class="mentor-stats">
                        <div class="stat">
                            <i class="fas fa-star"></i>
                            <span>${mentor.rating} Rating</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-handshake"></i>
                            <span>${mentor.sessions} Sessions</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-briefcase"></i>
                            <span>${mentor.experience} Years Exp</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mentor-modal-content">
                <div class="mentor-section">
                    <h3><i class="fas fa-user-tie"></i> About</h3>
                    <p>${mentor.bio}</p>
                </div>
                
                <div class="mentor-section">
                    <h3><i class="fas fa-tags"></i> Expertise</h3>
                    <div class="expertise-list">
                        ${mentor.expertise.map(exp => `<span class="expertise-badge">${exp}</span>`).join('')}
                    </div>
                </div>
                
                <div class="mentor-section">
                    <h3><i class="fas fa-industry"></i> Industry Experience</h3>
                    <div class="industry-list">
                        ${mentor.industry.map(ind => `<span class="industry-badge">${ind}</span>`).join('')}
                    </div>
                </div>
                
                <div class="mentor-section">
                    <h3><i class="fas fa-calendar-alt"></i> Availability</h3>
                    <div class="availability-info">
                        <span class="availability-badge ${mentor.availability}">
                            <i class="fas fa-check-circle"></i>
                            ${getAvailabilityText(mentor.availability)}
                        </span>
                        <p>Typically responds within 24 hours</p>
                    </div>
                </div>
                
                <div class="mentor-testimonial">
                    <h3><i class="fas fa-comment"></i> Founder Feedback</h3>
                    <div class="testimonial">
                        <p>"${mentor.name} helped us refine our pitch and connect with the right investors. 
                        Their guidance was instrumental in securing our seed round."</p>
                        <div class="testimonial-author">
                            <strong>Sarah K.</strong>
                            <span>FinTech Startup Founder</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mentor-modal-actions">
                <button class="btn-primary btn-large request-session-btn" data-mentor-id="${mentor.id}">
                    <i class="fas fa-handshake"></i> Request Session
                </button>
                <button class="btn-outline schedule-btn" onclick="scheduleMeeting(${mentor.id})">
                    <i class="fas fa-calendar-plus"></i> Schedule Meeting
                </button>
            </div>
        </div>
    `;
    
    // Add event listener to request button
    const requestBtn = modalContent.querySelector('.request-session-btn');
    if (requestBtn) {
        requestBtn.addEventListener('click', () => {
            requestMentorSession(mentor.id);
            mentorModal.classList.remove('active');
        });
    }
    
    mentorModal.classList.add('active');
}

function getAvailabilityText(availability) {
    switch(availability) {
        case 'available': return 'Available Now';
        case 'weekdays': return 'Weekdays Only';
        case 'weekends': return 'Weekends Only';
        case 'flexible': return 'Flexible Schedule';
        default: return 'Contact for Availability';
    }
}

function requestMentorSession(mentorId) {
    const mentor = mentors.find(m => m.id === mentorId);
    if (!mentor) return;
    
    // Show request form
    goToFormStep(1);
    
    // Auto-fill mentor preference
    const mentorSelect = document.getElementById('mentorPreference');
    if (mentorSelect) {
        mentorSelect.innerHTML += `<option value="${mentor.id}" selected>${mentor.name} - ${mentor.title}</option>`;
    }
    
    // Scroll to form
    document.getElementById('request-mentor').scrollIntoView({ behavior: 'smooth' });
    
    // Show notification
    showNotification(`Requesting session with ${mentor.name}`, 'info');
}

function scheduleMeeting(mentorId) {
    // In a real app, this would open a calendar integration
    showNotification('Calendar integration coming soon!', 'info');
}

// ==================== FORM VALIDATION ====================
function initFormValidation() {
    const mentorRequestForm = document.getElementById('mentorRequestForm');
    const mentorApplicationForm = document.getElementById('mentorApplicationForm');
    
    if (mentorRequestForm) {
        mentorRequestForm.addEventListener('submit', handleMentorRequest);
    }
    
    if (mentorApplicationForm) {
        mentorApplicationForm.addEventListener('submit', handleMentorApplication);
    }
    
    // Real-time validation
    document.querySelectorAll('input[required], textarea[required]').forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    if (!field.value.trim()) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(field.value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// ==================== FORM SUBMISSION ====================
function handleMentorRequest(e) {
    e.preventDefault();
    
    // Validate all steps
    let allValid = true;
    for (let i = 1; i <= 3; i++) {
        if (!validateFormStep(`step${i}`)) {
            allValid = false;
            goToFormStep(i);
            break;
        }
    }
    
    if (!allValid) {
        showNotification('Please fix errors before submitting', 'error');
        return;
    }
    
    // Collect form data
    const formData = new FormData(e.target);
    const requestData = {
        founder: {
            name: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            linkedin: formData.get('linkedin')
        },
        startup: {
            name: formData.get('startupName'),
            stage: formData.get('startupStage'),
            industry: formData.get('industry'),
            teamSize: formData.get('teamSize'),
            description: formData.get('startupDescription')
        },
        mentorship: {
            needs: Array.from(formData.getAll('mentoringNeeds')),
            type: formData.get('mentorType'),
            goals: formData.get('goals'),
            timeline: formData.get('timeline')
        },
        submittedAt: new Date().toISOString()
    };
    
    // Show loading
    const submitBtn = e.target.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Store in localStorage
        localStorage.setItem('lastMentorRequest', JSON.stringify(requestData));
        localStorage.setItem('mentorRequestTime', new Date().toISOString());
        
        // Show success
        showSuccessModal(requestData);
        
        // Reset form
        e.target.reset();
        goToFormStep(1);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleMentorApplication(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const applicationData = {
        mentor: {
            name: formData.get('fullName'),
            email: formData.get('email'),
            position: formData.get('currentPosition'),
            company: formData.get('company'),
            expertise: Array.from(formData.getAll('expertise')),
            experience: formData.get('experience'),
            bio: formData.get('bio'),
            availability: formData.get('availability')
        },
        submittedAt: new Date().toISOString()
    };
    
    // Show loading
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Store application
        localStorage.setItem('mentorApplication', JSON.stringify(applicationData));
        
        // Show success
        showNotification('Application submitted successfully! We\'ll contact you within 3-5 business days.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showSuccessModal(requestData) {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Request Submitted Successfully!</h2>
            <p>We've received your mentorship request for <strong>${requestData.startup.name}</strong>.</p>
            
            <div class="success-details">
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <strong>What's Next?</strong>
                        <p>Our team will review your request and match you with suitable mentors within 24 hours.</p>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <strong>Email Confirmation</strong>
                        <p>We've sent a confirmation to ${requestData.founder.email}</p>
                    </div>
                </div>
            </div>
            
            <div class="success-actions">
                <button class="btn-primary" onclick="this.closest('.success-modal').remove()">
                    <i class="fas fa-check"></i> Got It
                </button>
                <button class="btn-outline" onclick="window.location.href='#mentor-directory'">
                    <i class="fas fa-search"></i> Browse More Mentors
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 10000);
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(note => note.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// ==================== UTILITIES ====================
function loadMentors() {
    // In a real app, this would fetch from an API
    setTimeout(() => {
        renderMentorGrid();
    }, 500);
}

// Add CSS for components
const style = document.createElement('style');
style.textContent = `
    .mentor-card {
        background: white;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(10, 36, 99, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        height: 100%;
    }
    
    .mentor-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(10, 36, 99, 0.2);
    }
    
    .mentor-card-inner {
        padding: 1.5rem;
    }
    
    .mentor-header {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .mentor-image {
        position: relative;
        flex-shrink: 0;
    }
    
    .mentor-image img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    
    .badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #10B981;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        z-index: 1;
    }
    
    .badge.available { background: #10B981; }
    .badge.weekdays { background: #3B82F6; }
    .badge.flexible { background: #8B5CF6; }
    
    .match-score {
        position: absolute;
        bottom: -5px;
        right: -5px;
        width: 30px;
        height: 30px;
        background: conic-gradient(#00C2D1 var(--score), #E5E7EB 0);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .match-score span {
        font-size: 0.6rem;
        font-weight: 700;
        color: var(--mentor-primary);
    }
    
    .expertise-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 1rem 0;
    }
    
    .expertise-tag {
        background: #F1F5F9;
        color: #475569;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
    }
    
    .more-tags {
        background: #E2E8F0;
        color: #64748B;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
    }
    
    .mentor-details {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        color: #64748B;
        font-size: 0.875rem;
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .mentor-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    
    .btn-view-profile, .btn-request-mentor {
        flex: 1;
        padding: 0.5rem;
        border: none;
        border-radius: 8px;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .btn-view-profile {
        background: #F1F5F9;
        color: #475569;
    }
    
    .btn-request-mentor {
        background: var(--mentor-gradient);
        color: white;
    }
    
    .no-results {
        text-align: center;
        padding: 3rem;
        grid-column: 1 / -1;
    }
    
    .no-results i {
        font-size: 3rem;
        color: #CBD5E1;
        margin-bottom: 1rem;
    }
    
    .notification {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 9999;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification-success {
        border-left: 4px solid #10B981;
    }
    
    .notification-error {
        border-left: 4px solid #EF4444;
    }
    
    .notification-warning {
        border-left: 4px solid #F59E0B;
    }
    
    .notification-info {
        border-left: 4px solid #3B82F6;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #94A3B8;
        cursor: pointer;
        margin-left: 1rem;
    }
    
    .success-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 1rem;
    }
    
    .success-modal-content {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 100%;
        text-align: center;
        animation: fadeInUp 0.3s ease;
    }
    
    .success-icon {
        font-size: 4rem;
        color: #10B981;
        margin-bottom: 1rem;
    }
    
    .mentor-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        display: none;
    }
    
    .mentor-modal.active {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        position: relative;
        background: white;
        border-radius: 20px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        z-index: 1;
    }
    
    .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid #E5E7EB;
        display: flex;
        justify-content: flex-end;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #6B7280;
        cursor: pointer;
        padding: 0.5rem;
    }
`;

document.head.appendChild(style);

console.log('✅ Mentorship page JavaScript loaded successfully');