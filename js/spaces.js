document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const mapElement = document.getElementById('map');
    const spacesGrid = document.getElementById('spacesGrid');
    const viewButtons = document.querySelectorAll('.view-btn');
    const bookingForm = document.getElementById('bookingForm');
    const formSteps = document.querySelectorAll('.form-step');
    const nextStepButtons = document.querySelectorAll('.next-step');
    const prevStepButtons = document.querySelectorAll('.prev-step');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Sample data for co-working spaces
    const spaces = [
        {
            id: 'space-001',
            name: 'Innovation Hub Hot Desk',
            type: 'hot-desk',
            campus: 'main',
            capacity: 1,
            price: 150000,
            image: 'https://images.unsplash.com/photo-1522071820081-009c012b5a48',
            description: 'A flexible hot desk in our vibrant co-working space, perfect for individuals looking for a productive work environment with all the necessary amenities.',
            features: {
                wifi: true,
                printing: true,
                coffee: true,
                access: '8am-8pm',
                meetingRoom: 'Pay as you go'
            },
            location: 'UDSM Innovation Hub, 1st Floor',
            availability: 3,
            rating: 4.8,
            reviews: 124,
            coordinates: [-6.7924, 39.2083]
        },
        // Add more spaces here...
    ];

    // Initialize the page
    function init() {
        initializeMap();
        displaySpaces(spaces);
        setupEventListeners();
        initializeSelect2();
        setupFormNavigation();
        setupFAQs();
        setupPricingTabs();
    }

    // Set up event listeners
    function setupEventListeners() {
        // View toggle buttons
        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                toggleView(view, e.currentTarget);
            });
        });

        // Mobile menu toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }

        // Booking form submission
        if (bookingForm) {
            bookingForm.addEventListener('submit', handleBookingSubmit);
        }

        // Filter changes
        const filters = ['campusFilter', 'spaceTypeFilter', 'capacityFilter'];
        filters.forEach(filterId => {
            const element = document.getElementById(filterId);
            if (element) {
                element.addEventListener('change', filterSpaces);
            }
        });

        // Reset filters
        const resetBtn = document.getElementById('resetFilters');
        if (resetBtn) {
            resetBtn.addEventListener('click', resetFilters);
        }
    }

    // Initialize the map
    function initializeMap() {
        if (!mapElement) return;

        // Default to UDSM Main Campus coordinates
        const map = L.map('map').setView([-6.7924, 39.2083], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add markers for each space
        spaces.forEach(space => {
            if (space.coordinates) {
                const marker = L.marker(space.coordinates).addTo(map);
                marker.bindPopup(`
                    <b>${space.name}</b><br>
                    ${space.location}<br>
                    <small>${space.type.replace('-', ' ')}</small>
                `);
            }
        });
    }

    // Display spaces in grid view
    function displaySpaces(spacesToShow) {
        if (!spacesGrid) return;

        if (spacesToShow.length === 0) {
            spacesGrid.innerHTML = '<div class="no-results">No spaces found matching your criteria.</div>';
            return;
        }

        spacesGrid.innerHTML = spacesToShow.map(space => `
            <div class="space-card" data-id="${space.id}">
                <div class="space-image">
                    <img src="${space.image}" alt="${space.name}">
                    ${space.availability < 2 ? '<span class="availability-tag">Limited Availability</span>' : ''}
                </div>
                <div class="space-content">
                    <div class="space-header">
                        <span class="space-category">${formatSpaceType(space.type)}</span>
                        <h3 class="space-title">${space.name}</h3>
                        <div class="space-location">
                            <i class="fas fa-map-marker-alt"></i> ${space.location}
                        </div>
                    </div>
                    
                    <div class="space-features">
                        <div class="feature">
                            <i class="fas fa-wifi"></i>
                            <span>WiFi</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-user-friends"></i>
                            <span>${space.capacity} ${space.capacity === 1 ? 'person' : 'people'}</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-clock"></i>
                            <span>${space.features.access}</span>
                        </div>
                    </div>
                    
                    <div class="space-footer">
                        <div class="space-price">
                            TZS ${space.price.toLocaleString()}<span class="period">/month</span>
                        </div>
                        <button class="btn btn-primary" onclick="event.stopPropagation(); bookSpace('${space.id}')">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click event to space cards
        document.querySelectorAll('.space-card').forEach(card => {
            card.addEventListener('click', () => {
                const spaceId = card.dataset.id;
                viewSpaceDetails(spaceId);
            });
        });
    }

    // Toggle between grid and list view
    function toggleView(view, clickedButton) {
        if (!spacesGrid) return;

        // Update active button
        viewButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');

        // Toggle view class
        if (view === 'list') {
            spacesGrid.classList.add('list-view');
            document.querySelectorAll('.space-card').forEach(card => {
                card.classList.add('list-view');
            });
        } else {
            spacesGrid.classList.remove('list-view');
            document.querySelectorAll('.space-card').forEach(card => {
                card.classList.remove('list-view');
            });
        }
    }

    // Filter spaces based on selected filters
    function filterSpaces() {
        const campusFilter = document.getElementById('campusFilter');
        const spaceTypeFilter = document.getElementById('spaceTypeFilter');
        const capacityFilter = document.getElementById('capacityFilter');

        const selectedCampus = campusFilter ? campusFilter.value : 'all';
        const selectedTypes = Array.from(spaceTypeFilter ? spaceTypeFilter.selectedOptions : [])
            .map(option => option.value);
        const selectedCapacities = Array.from(capacityFilter ? capacityFilter.selectedOptions : [])
            .map(option => parseInt(option.value));

        const filteredSpaces = spaces.filter(space => {
            // Filter by campus
            if (selectedCampus !== 'all' && space.campus !== selectedCampus) {
                return false;
            }

            // Filter by space type
            if (selectedTypes.length > 0 && !selectedTypes.includes(space.type)) {
                return false;
            }

            // Filter by capacity
            if (selectedCapacities.length > 0) {
                let capacityMatch = false;
                selectedCapacities.forEach(cap => {
                    if (cap === 1 && space.capacity <= 2) capacityMatch = true;
                    else if (cap === 3 && space.capacity >= 3 && space.capacity <= 5) capacityMatch = true;
                    else if (cap === 6 && space.capacity >= 6 && space.capacity <= 10) capacityMatch = true;
                    else if (cap === 11 && space.capacity >= 11 && space.capacity <= 20) capacityMatch = true;
                    else if (cap === 21 && space.capacity > 20) capacityMatch = true;
                });
                if (!capacityMatch) return false;
            }

            return true;
        });

        displaySpaces(filteredSpaces);
    }

    // Reset all filters
    function resetFilters() {
        const campusFilter = document.getElementById('campusFilter');
        const spaceTypeFilter = document.getElementById('spaceTypeFilter');
        const capacityFilter = document.getElementById('capacityFilter');

        if (campusFilter) campusFilter.value = 'all';
        if (spaceTypeFilter) $(spaceTypeFilter).val(null).trigger('change');
        if (capacityFilter) $(capacityFilter).val(null).trigger('change');

        filterSpaces();
    }

    // Initialize Select2 for better dropdowns
    function initializeSelect2() {
        $('.select2').select2({
            theme: 'bootstrap-5',
            width: '100%',
            placeholder: 'Select options',
            allowClear: true
        });
    }

    // Set up form navigation between steps
    function setupFormNavigation() {
        nextStepButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const currentStep = e.currentTarget.closest('.form-step');
                const nextStepId = e.currentTarget.dataset.next;
                const nextStep = document.getElementById(nextStepId);

                if (validateStep(currentStep)) {
                    currentStep.classList.remove('active');
                    nextStep.classList.add('active');
                    updateFormProgress(nextStepId);
                    updateBookingSummary();
                }
            });
        });

        prevStepButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const currentStep = e.currentTarget.closest('.form-step');
                const prevStepId = e.currentTarget.dataset.prev;
                const prevStep = document.getElementById(prevStepId);

                currentStep.classList.remove('active');
                prevStep.classList.add('active');
                updateFormProgress(prevStepId);
            });
        });
    }

    // Validate the current form step
    function validateStep(step) {
        const inputs = step.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        if (!isValid) {
            showNotification('Please fill in all required fields', 'error');
        }

        return isValid;
    }

    // Update the form progress indicator
    function updateFormProgress(activeStepId) {
        const progressSteps = document.querySelectorAll('.progress-step');
        if (!progressSteps.length) return;

        progressSteps.forEach(step => {
            step.classList.remove('active', 'completed');
        });

        let currentStepFound = false;
        progressSteps.forEach(step => {
            if (step.dataset.step === activeStepId) {
                step.classList.add('active');
                currentStepFound = true;
            } else if (!currentStepFound) {
                step.classList.add('completed');
            }
        });
    }

    // Update the booking summary with selected options
    function updateBookingSummary() {
        const spaceType = document.getElementById('spaceType');
        const bookingDate = document.getElementById('bookingDate');
        const duration = document.getElementById('duration');
        const campus = document.getElementById('campus');

        if (spaceType && spaceType.value) {
            document.getElementById('summarySpaceType').textContent = 
                spaceType.options[spaceType.selectedIndex].text;
        }

        if (bookingDate && bookingDate.value) {
            const date = new Date(bookingDate.value);
            document.getElementById('summaryDate').textContent = 
                date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }

        if (duration && duration.value) {
            const hours = parseInt(duration.value);
            let durationText = '';
            if (hours === 1) durationText = '1 hour';
            else if (hours === 24) durationText = '1 day';
            else if (hours === 168) durationText = '1 week';
            else durationText = `${hours} hours`;
            
            document.getElementById('summaryDuration').textContent = durationText;
        }

        if (campus && campus.value) {
            document.getElementById('summaryLocation').textContent = 
                campus.options[campus.selectedIndex].text;
        }

        // Update total price (simplified example)
        if (spaceType && spaceType.value) {
            const prices = {
                'hot-desk': 15000,
                'dedicated-desk': 30000,
                'private-office': 80000,
                'meeting-room': 25000,
                'event-space': 150000
            };
            
            const hours = duration ? parseInt(duration.value) || 1 : 1;
            const total = prices[spaceType.value] * hours;
            document.getElementById('summaryTotal').textContent = `TZS ${total.toLocaleString()}`;
        }
    }

    // Handle form submission
    function handleBookingSubmit(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Booking Confirmed!';
            
            // Show success message
            Swal.fire({
                title: 'Booking Confirmed!',
                html: `
                    <div style="text-align: left;">
                        <p>Your booking has been confirmed. We've sent the details to your email.</p>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                            <p style="margin: 0.5rem 0;"><strong>Booking Reference:</strong> UDSM-${Math.floor(100000 + Math.random() * 900000)}</p>
                            <p style="margin: 0.5rem 0;"><strong>Date:</strong> ${document.getElementById('summaryDate').textContent}</p>
                            <p style="margin: 0.5rem 0;"><strong>Duration:</strong> ${document.getElementById('summaryDuration').textContent}</p>
                            <p style="margin: 0.5rem 0;"><strong>Location:</strong> ${document.getElementById('summaryLocation').textContent}</p>
                        </div>
                    </div>
                `,
                icon: 'success',
                confirmButtonText: 'Got it!',
                confirmButtonColor: '#3498db'
            }).then(() => {
                // Reset form
                bookingForm.reset();
                document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
                document.getElementById('step1').classList.add('active');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Reset summary
                const summaryItems = ['spaceType', 'date', 'time', 'duration', 'location'];
                summaryItems.forEach(item => {
                    const element = document.getElementById(`summary${item.charAt(0).toUpperCase() + item.slice(1)}`);
                    if (element) element.textContent = '-';
                });
                document.getElementById('summaryTotal').textContent = 'TZS 0';
            });
        }, 2000);
    }

    // Set up FAQ accordion functionality
    function setupFAQs() {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                question.setAttribute('aria-expanded', !isExpanded);
                
                const answer = question.nextElementSibling;
                if (!isExpanded) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    question.classList.add('active');
                } else {
                    answer.style.maxHeight = '0';
                    question.classList.remove('active');
                }
            });
        });
    }

    // Set up pricing tabs
    function setupPricingTabs() {
        pricingTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const duration = tab.dataset.duration;
                
                // Update active tab
                pricingTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Update prices
                document.querySelectorAll('.price').forEach(priceEl => {
                    const amount = priceEl.dataset[duration];
                    if (amount) {
                        priceEl.querySelector('.amount').textContent = amount;
                        priceEl.querySelector('.period').textContent = duration === 'monthly' ? '/month' : 
                                                                      duration === 'quarterly' ? '/quarter' : '/year';
                        priceEl.closest('.pricing-card').querySelector('p').textContent = 
                            duration === 'monthly' ? 'Billed monthly' : 
                            duration === 'quarterly' ? 'Billed quarterly (save 10%)' : 'Billed annually (save 20%)';
                    }
                });
            });
        });
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        }
    }

    // Format space type for display
    function formatSpaceType(type) {
        return type.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // View space details
    function viewSpaceDetails(spaceId) {
        const space = spaces.find(s => s.id === spaceId);
        if (!space) return;

        Swal.fire({
            title: space.name,
            html: `
                <div style="text-align: left;">
                    <div style="margin-bottom: 1rem;">
                        <img src="${space.image}" alt="${space.name}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                        <p>${space.description}</p>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                        <div><i class="fas fa-users"></i> <strong>Capacity:</strong> ${space.capacity} ${space.capacity === 1 ? 'person' : 'people'}</div>
                        <div><i class="fas fa-wifi"></i> <strong>WiFi:</strong> ${space.features.wifi ? 'Included' : 'Not available'}</div>
                        <div><i class="fas fa-print"></i> <strong>Printing:</strong> ${space.features.printing ? 'Available' : 'Not available'}</div>
                        <div><i class="fas fa-coffee"></i> <strong>Refreshments:</strong> ${space.features.coffee ? 'Included' : 'Not included'}</div>
                        <div><i class="fas fa-door-open"></i> <strong>Access:</strong> ${space.features.access}</div>
                        <div><i class="fas fa-comments"></i> <strong>Meeting Room:</strong> ${space.features.meetingRoom}</div>
                    </div>
                    <div style="margin: 1rem 0; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <span><strong>Price:</strong> TZS ${space.price.toLocaleString()}/month</span>
                            <span class="rating"><i class="fas fa-star"></i> ${space.rating} (${space.reviews})</span>
                        </div>
                        <div style="font-size: 0.9rem; color: ${space.availability < 2 ? '#e74c3c' : '#27ae60'};">
                            <i class="fas fa-${space.availability < 2 ? 'exclamation-triangle' : 'check-circle'}"></i> 
                            ${space.availability < 2 ? 'Limited availability' : 'Available'}
                        </div>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Book This Space',
            cancelButtonText: 'Close',
            confirmButtonColor: '#3498db',
            width: '600px'
        }).then((result) => {
            if (result.isConfirmed) {
                // Scroll to booking form and pre-select the space
                document.getElementById('book-space').scrollIntoView({ behavior: 'smooth' });
                const spaceType = document.getElementById('spaceType');
                if (spaceType) {
                    spaceType.value = space.type;
                    // Trigger change event to update dependent fields
                    const event = new Event('change');
                    spaceType.dispatchEvent(event);
                }
            }
        });
    }

    // Book a space (called from the book now button)
    window.bookSpace = function(spaceId) {
        const space = spaces.find(s => s.id === spaceId);
        if (!space) return;

        // Scroll to booking form
        document.getElementById('book-space').scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill the form
        const spaceType = document.getElementById('spaceType');
        if (spaceType) {
            spaceType.value = space.type;
            // Trigger change event to update dependent fields
            const event = new Event('change');
            spaceType.dispatchEvent(event);
        }
    };

    // Initialize the page
    init();
});

// Make functions available globally for inline event handlers
window.toggleView = function(view, element) {
    const event = new Event('click');
    element.dispatchEvent(event);
};

window.bookSpace = function(spaceId) {
    // This will be overridden by the main function
    console.log('Booking space:', spaceId);
};
