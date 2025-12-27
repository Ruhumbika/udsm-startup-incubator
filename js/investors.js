/**
 * Contact Investors - JavaScript
 * Handles all interactive elements for the Contact Investors page
 */

function getInvestorTypeName(type) {
    const types = {
        'angel': 'Angel Investor',
        'vc': 'Venture Capital',
        'corporate': 'Corporate Investor',
        'government': 'Government Fund',
        'incubator': 'Incubator/Accelerator'
    };
    return types[type] || type;
}

function getIndustryName(industry) {
    const industries = {
        'technology': 'Technology',
        'healthcare': 'Healthcare',
        'education': 'Education',
        'finance': 'Finance',
        'agriculture': 'Agriculture',
        'renewable': 'Renewable Energy',
        'manufacturing': 'Manufacturing',
        'ecommerce': 'E-commerce',
        'infrastructure': 'Infrastructure'
    };
    return industries[industry] || industry;
}

function getLocationName(location) {
    const locations = {
        'tanzania': 'Tanzania',
        'east-africa': 'East Africa',
        'africa': 'Africa',
        'europe': 'Europe',
        'north-america': 'North America',
        'asia': 'Asia'
    };
    return locations[location] || location;
}

function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (!menuBtn || !navLinks) return;

    if (!menuBtn.hasAttribute('aria-expanded')) {
        menuBtn.setAttribute('aria-expanded', 'false');
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        const nextExpanded = !isExpanded;
        menuBtn.setAttribute('aria-expanded', String(nextExpanded));
        navLinks.classList.toggle('active', nextExpanded);
        menuBtn.classList.toggle('active', nextExpanded);
        document.body.style.overflow = nextExpanded ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', function(e) {
        if (!navLinks.classList.contains('active')) return;
        if (navLinks.contains(e.target) || menuBtn.contains(e.target)) return;
        closeMenu();
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileMenu();
    initInvestorFiltering();
    initInvestorMap();
    initPitchForm();
    initBackToTop();
    initAOS();
    initPrintButton();
});

/**
 * Initialize investor filtering and search functionality
 */
function initInvestorFiltering() {
    // Sample investor data - in a real app, this would come from an API
    const investors = [
        {
            id: 1,
            name: 'Dr. James Mwangi',
            title: 'Angel Investor',
            company: 'Equity Group',
            type: 'angel',
            industries: ['technology', 'finance', 'ecommerce'],
            location: 'tanzania',
            investmentRange: '50000-100000',
            bio: 'Experienced investor with a focus on fintech and e-commerce startups in East Africa.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            interests: ['Fintech', 'E-commerce', 'AI', 'Blockchain'],
            minInvestment: 50000,
            maxInvestment: 100000,
            deals: 12,
            successRate: '85%'
        },
        {
            id: 2,
            name: 'Amina Juma',
            title: 'Venture Partner',
            company: 'TLcom Capital',
            type: 'vc',
            industries: ['technology', 'healthcare', 'education'],
            location: 'east-africa',
            investmentRange: '100000-500000',
            bio: 'Venture capitalist with a passion for edtech and healthtech solutions that transform African communities.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            interests: ['EdTech', 'HealthTech', 'Renewable Energy'],
            minInvestment: 100000,
            maxInvestment: 500000,
            deals: 8,
            successRate: '78%'
        },
        {
            id: 3,
            name: 'David Ochieng',
            title: 'Investment Director',
            company: 'Novastar Ventures',
            type: 'vc',
            industries: ['finance', 'agriculture', 'renewable'],
            location: 'africa',
            investmentRange: '500000+',
            bio: 'Focused on scalable solutions in agri-tech and renewable energy across the African continent.',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            interests: ['AgriTech', 'Clean Energy', 'Financial Inclusion'],
            minInvestment: 500000,
            maxInvestment: 2000000,
            deals: 15,
            successRate: '82%'
        },
        {
            id: 4,
            name: 'Sarah Chen',
            title: 'Managing Partner',
            company: 'Alibaba eFounders',
            type: 'corporate',
            industries: ['ecommerce', 'technology', 'manufacturing'],
            location: 'asia',
            investmentRange: '100000-500000',
            bio: 'Connecting African startups with Asian markets and investment opportunities in e-commerce and manufacturing.',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
            interests: ['E-commerce', 'Marketplaces', 'Supply Chain'],
            minInvestment: 100000,
            maxInvestment: 500000,
            deals: 20,
            successRate: '88%'
        },
        {
            id: 5,
            name: 'Thomas Schmidt',
            title: 'Investment Manager',
            company: 'European Investment Bank',
            type: 'government',
            industries: ['renewable', 'infrastructure', 'healthcare'],
            location: 'europe',
            investmentRange: '500000+',
            bio: 'Leading investments in sustainable infrastructure and healthcare solutions in emerging markets.',
            avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
            interests: ['Clean Energy', 'Infrastructure', 'Healthcare'],
            minInvestment: 500000,
            maxInvestment: 5000000,
            deals: 25,
            successRate: '75%'
        },
        {
            id: 6,
            name: 'Nadia Kamau',
            title: 'Angel Investor',
            company: 'Viktoria Business Angels',
            type: 'angel',
            industries: ['technology', 'ecommerce', 'education'],
            location: 'east-africa',
            investmentRange: '0-10000',
            bio: 'Early-stage investor passionate about supporting female founders in tech across East Africa.',
            avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
            interests: ['Women-led Startups', 'EdTech', 'E-commerce'],
            minInvestment: 5000,
            maxInvestment: 10000,
            deals: 5,
            successRate: '90%'
        },
        {
            id: 7,
            name: 'Fatma Mshana',
            title: 'Investment Lead',
            company: 'Tanzania Startup Fund',
            type: 'government',
            industries: ['technology', 'agriculture', 'education'],
            location: 'tanzania',
            investmentRange: '10000-50000',
            bio: 'Supports early-stage ventures in Tanzania with a focus on job creation and measurable impact.',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            interests: ['Impact', 'AgriTech', 'EdTech', 'Youth Employment'],
            minInvestment: 10000,
            maxInvestment: 50000,
            deals: 9,
            successRate: '80%'
        },
        {
            id: 8,
            name: 'Michael Patel',
            title: 'Partner',
            company: 'Savannah Growth Partners',
            type: 'vc',
            industries: ['finance', 'technology', 'healthcare'],
            location: 'africa',
            investmentRange: '100000-500000',
            bio: 'Growth-focused VC investing in scalable tech and fintech across Africa with strong unit economics.',
            avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
            interests: ['Fintech', 'Payments', 'HealthTech', 'B2B SaaS'],
            minInvestment: 100000,
            maxInvestment: 500000,
            deals: 14,
            successRate: '84%'
        },
        {
            id: 9,
            name: 'Grace Nanyaro',
            title: 'Program Director',
            company: 'UDSM Innovation Hub',
            type: 'incubator',
            industries: ['technology', 'education', 'healthcare', 'agriculture'],
            location: 'tanzania',
            investmentRange: '0-10000',
            bio: 'Works with founders from idea to MVP with mentorship, networks, and small catalytic grants.',
            avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
            interests: ['Mentorship', 'Prototype Support', 'Founder Coaching'],
            minInvestment: 0,
            maxInvestment: 10000,
            deals: 40,
            successRate: '72%'
        },
        {
            id: 10,
            name: 'John Carter',
            title: 'Corporate Ventures Manager',
            company: 'Telecom Ventures Africa',
            type: 'corporate',
            industries: ['technology', 'ecommerce', 'finance'],
            location: 'east-africa',
            investmentRange: '50000-100000',
            bio: 'Corporate venture arm investing in connectivity, platforms, and digital services across East Africa.',
            avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
            interests: ['Connectivity', 'Marketplaces', 'Embedded Finance'],
            minInvestment: 50000,
            maxInvestment: 150000,
            deals: 11,
            successRate: '79%'
        },
        {
            id: 11,
            name: 'Lilian Mtega',
            title: 'Angel Investor',
            company: 'Lake Zone Angels',
            type: 'angel',
            industries: ['agriculture', 'manufacturing', 'ecommerce'],
            location: 'tanzania',
            investmentRange: '10000-50000',
            bio: 'Hands-on angel supporting SMEs and local production with distribution and operations expertise.',
            avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
            interests: ['Agri Value Chains', 'SMEs', 'Local Manufacturing'],
            minInvestment: 10000,
            maxInvestment: 60000,
            deals: 6,
            successRate: '86%'
        },
        {
            id: 12,
            name: 'Ethan Brooks',
            title: 'Seed Partner',
            company: 'Atlantic Seed Ventures',
            type: 'vc',
            industries: ['technology', 'education', 'ecommerce'],
            location: 'north-america',
            investmentRange: '100000-500000',
            bio: 'Seed-stage investor backing strong teams building platform products with global potential.',
            avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
            interests: ['EdTech', 'B2B SaaS', 'Marketplaces'],
            minInvestment: 75000,
            maxInvestment: 500000,
            deals: 18,
            successRate: '77%'
        }
    ];

    // Expose for matching and other page components
    window.__investorData = investors;

    const investorsGrid = document.getElementById('investorsGrid');
    const investorTypeFilter = document.getElementById('investorType');
    const industrySectorFilter = document.getElementById('industrySector');
    const investmentRangeFilter = document.getElementById('investmentRange');
    const locationFilter = document.getElementById('location');
    const searchInput = document.getElementById('investorSearch');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const paginationContainer = document.getElementById('pagination');

    let filteredInvestors = [...investors];
    let currentPage = 1;
    const investorsPerPage = 6;

    // Initialize Select2 for all select elements
    if (typeof window.jQuery !== 'undefined' && window.jQuery.fn && typeof window.jQuery.fn.select2 === 'function') {
        window.jQuery('.select2').select2({
            theme: 'bootstrap-5',
            width: '100%',
            placeholder: 'Select options'
        });
    }

    // Initial render
    renderInvestors();
    renderPagination();

    // Event listeners
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            currentPage = 1;
            filterInvestors();
            renderInvestors();
            renderPagination();
            // Scroll to results
            document.getElementById('find-investors').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Reset all select2 dropdowns
            if (investorTypeFilter) {
                investorTypeFilter.value = 'all';
                if (typeof window.jQuery !== 'undefined') {
                    window.jQuery(investorTypeFilter).trigger('change');
                }
            }

            if (investmentRangeFilter) {
                investmentRangeFilter.value = 'all';
                if (typeof window.jQuery !== 'undefined') {
                    window.jQuery(investmentRangeFilter).trigger('change');
                }
            }

            if (industrySectorFilter) {
                if (typeof window.jQuery !== 'undefined') {
                    window.jQuery(industrySectorFilter).val(null).trigger('change');
                }
            }

            if (locationFilter) {
                if (typeof window.jQuery !== 'undefined') {
                    window.jQuery(locationFilter).val(null).trigger('change');
                }
            }

            if (searchInput) {
                searchInput.value = '';
            }

            currentPage = 1;
            filteredInvestors = [...investors];
            renderInvestors();
            renderPagination();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                currentPage = 1;
                filterInvestors();
                renderInvestors();
                renderPagination();
            }
        });
    }

    // Filter investors based on selected filters
    function filterInvestors() {
        const type = investorTypeFilter ? investorTypeFilter.value : 'all';
        const industries = industrySectorFilter
            ? (typeof window.jQuery !== 'undefined'
                ? (window.jQuery(industrySectorFilter).val() || [])
                : Array.from(industrySectorFilter.selectedOptions || []).map(o => o.value))
            : [];
        const range = investmentRangeFilter ? investmentRangeFilter.value : 'all';
        const locations = locationFilter
            ? (typeof window.jQuery !== 'undefined'
                ? (window.jQuery(locationFilter).val() || [])
                : Array.from(locationFilter.selectedOptions || []).map(o => o.value))
            : [];
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        let selectedMin = 0;
        let selectedMax = Infinity;
        if (range !== 'all') {
            if (range.includes('+')) {
                selectedMin = Number(range.replace('+', ''));
                selectedMax = Infinity;
            } else {
                const parts = range.split('-').map(Number);
                selectedMin = Number.isFinite(parts[0]) ? parts[0] : 0;
                selectedMax = Number.isFinite(parts[1]) ? parts[1] : Infinity;
            }
        }

        filteredInvestors = investors.filter(investor => {
            // Filter by type
            const matchesType = type === 'all' || investor.type === type;
            
            // Filter by industry
            const matchesIndustry = industries.length === 0 || 
                industries.some(industry => investor.industries.includes(industry));
            
            // Filter by investment range
            const matchesRange = range === 'all'
                ? true
                : (investor.maxInvestment >= selectedMin && investor.minInvestment <= selectedMax);
            
            // Filter by location
            const matchesLocation = locations.length === 0 || 
                locations.includes(investor.location);
            
            // Filter by search term
            const matchesSearch = searchTerm === '' || 
                investor.name.toLowerCase().includes(searchTerm) || 
                investor.company.toLowerCase().includes(searchTerm) ||
                investor.bio.toLowerCase().includes(searchTerm) ||
                investor.interests.some(interest => 
                    interest.toLowerCase().includes(searchTerm)
                );
            
            return matchesType && matchesIndustry && matchesRange && 
                   matchesLocation && matchesSearch;
        });
    }

    // Render investors to the grid
    function renderInvestors() {
        if (!investorsGrid) return;

        // Calculate pagination
        const startIdx = (currentPage - 1) * investorsPerPage;
        const paginatedInvestors = filteredInvestors.slice(startIdx, startIdx + investorsPerPage);

        if (paginatedInvestors.length === 0) {
            investorsGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 15px;"></i>
                    <h3>No investors found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        investorsGrid.innerHTML = paginatedInvestors.map(investor => `
            <div class="investor-card" data-aos="fade-up">
                <div class="investor-header">
                    <div class="investor-avatar">
                        <img src="${investor.avatar}" alt="${investor.name}">
                    </div>
                    <div class="investor-info">
                        <div class="investor-name">${investor.name}</div>
                        <div class="investor-title">${investor.title}</div>
                        <div class="investor-company">${investor.company}</div>
                        <span class="investor-type">${getInvestorTypeName(investor.type)}</span>
                    </div>
                </div>
                <div class="investor-details">
                    <p class="investor-bio">${investor.bio}</p>
                    
                    <ul class="investor-meta">
                        <li>
                            <i class="fas fa-map-marker-alt"></i>
                            ${getLocationName(investor.location)}
                        </li>
                        <li>
                            <i class="fas fa-dollar-sign"></i>
                            $${investor.minInvestment.toLocaleString()} - $${investor.maxInvestment.toLocaleString()}
                        </li>
                        <li>
                            <i class="fas fa-handshake"></i>
                            ${investor.deals} Deals | ${investor.successRate} Success Rate
                        </li>
                    </ul>
                    
                    <div class="investor-interests">
                        ${investor.interests.map(interest => `
                            <span class="interest-tag">${interest}</span>
                        `).join('')}
                    </div>
                    
                    <div class="investor-actions">
                        <a href="#" class="btn btn-outline btn-sm view-profile" data-investor-id="${investor.id}">View Profile</a>
                        <a href="#pitch" class="btn btn-primary btn-sm pitch-now" data-investor-id="${investor.id}">Pitch Now</a>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to the new buttons
        document.querySelectorAll('.view-profile').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const investorId = parseInt(this.getAttribute('data-investor-id'));
                const investor = investors.find(i => i.id === investorId);
                if (investor) {
                    showInvestorModal(investor);
                }
            });
        });

        document.querySelectorAll('.pitch-now').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const investorId = parseInt(this.getAttribute('data-investor-id'));
                const investor = investors.find(i => i.id === investorId);
                if (investor) {
                    const targetField = document.getElementById('targetInvestorId');
                    if (targetField) {
                        targetField.value = String(investor.id);
                    }

                    // Scroll to pitch form and pre-fill investor name
                    document.getElementById('pitch').scrollIntoView({ behavior: 'smooth' });
                    const startupNameField = document.getElementById('startupName');
                    if (startupNameField) {
                        startupNameField.focus();
                    }
                    
                    // Show a message
                    setTimeout(() => {
                        Swal.fire({
                            title: 'Pitch to ' + investor.name,
                            text: `You're now ready to submit your pitch to ${investor.name} from ${investor.company}. Complete the form below to get started.`,
                            icon: 'info',
                            confirmButtonText: 'Got it!'
                        });
                    }, 500);
                }
            });
        });
    }

    // Render pagination
    function renderPagination() {
        if (!paginationContainer) return;

        const totalPages = Math.ceil(filteredInvestors.length / investorsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '<ul class="pagination-list">';
        
        // Previous button
        paginationHTML += `
            <li class="pagination-item">
                <a href="#" class="pagination-link prev ${currentPage === 1 ? 'disabled' : ''}" 
                   data-page="${currentPage - 1}">
                    <i class="fas fa-chevron-left"></i>
                </a>
            </li>
        `;
        
        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            paginationHTML += `
                <li class="pagination-item">
                    <a href="#" class="pagination-link" data-page="1">1</a>
                </li>
            `;
            if (startPage > 2) {
                paginationHTML += '<li class="pagination-item disabled"><span class="pagination-ellipsis">...</span></li>';
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <li class="pagination-item">
                    <a href="#" class="pagination-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>
                </li>
            `;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += '<li class="pagination-item disabled"><span class="pagination-ellipsis">...</span></li>';
            }
            paginationHTML += `
                <li class="pagination-item">
                    <a href="#" class="pagination-link" data-page="${totalPages}">${totalPages}</a>
                </li>
            `;
        }
        
        // Next button
        paginationHTML += `
            <li class="pagination-item">
                <a href="#" class="pagination-link next ${currentPage === totalPages ? 'disabled' : ''}" 
                   data-page="${currentPage + 1}">
                    <i class="fas fa-chevron-right"></i>
                </a>
            </li>
        `;
        
        paginationHTML += '</ul>';
        paginationContainer.innerHTML = paginationHTML;
        
        // Add event listeners to pagination links
        document.querySelectorAll('.pagination-link:not(.disabled)').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = parseInt(this.getAttribute('data-page'));
                if (page !== currentPage) {
                    currentPage = page;
                    renderInvestors();
                    renderPagination();
                    window.scrollTo({
                        top: investorsGrid.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Show investor details in a modal
    function showInvestorModal(investor) {
        Swal.fire({
            title: investor.name,
            html: `
                <div class="investor-modal">
                    <div class="investor-modal-header">
                        <div class="investor-avatar-large">
                            <img src="${investor.avatar}" alt="${investor.name}">
                        </div>
                        <div class="investor-info-large">
                            <h3>${investor.name}</h3>
                            <div class="investor-title">${investor.title} at ${investor.company}</div>
                            <div class="investor-type">${getInvestorTypeName(investor.type)}</div>
                            <div class="investor-location">
                                <i class="fas fa-map-marker-alt"></i> ${getLocationName(investor.location)}
                            </div>
                        </div>
                    </div>
                    
                    <div class="investor-modal-body">
                        <div class="investor-section">
                            <h4>About</h4>
                            <p>${investor.bio}</p>
                        </div>
                        
                        <div class="investor-details-grid">
                            <div class="detail-item">
                                <div class="detail-label">Investment Range</div>
                                <div class="detail-value">$${investor.minInvestment.toLocaleString()} - $${investor.maxInvestment.toLocaleString()}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Deals Completed</div>
                                <div class="detail-value">${investor.deals}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Success Rate</div>
                                <div class="detail-value">${investor.successRate}</div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Focus Industries</div>
                                <div class="detail-value">${investor.industries.map(i => getIndustryName(i)).join(', ')}</div>
                            </div>
                        </div>
                        
                        <div class="investor-section">
                            <h4>Investment Interests</h4>
                            <div class="interests-container">
                                ${investor.interests.map(interest => `
                                    <span class="interest-tag">${interest}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <style>
                    .investor-modal {
                        text-align: left;
                    }
                    .investor-modal-header {
                        display: flex;
                        align-items: center;
                        margin-bottom: 20px;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #eee;
                    }
                    .investor-avatar-large {
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        overflow: hidden;
                        margin-right: 20px;
                        border: 3px solid #f8f9fa;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    }
                    .investor-avatar-large img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .investor-info-large h3 {
                        margin: 0 0 5px;
                        color: #2c3e50;
                    }
                    .investor-title {
                        color: #7f8c8d;
                        font-size: 0.95rem;
                        margin-bottom: 5px;
                    }
                    .investor-type {
                        display: inline-block;
                        background: #e3f2fd;
                        color: #1976d2;
                        padding: 3px 10px;
                        border-radius: 20px;
                        font-size: 0.8rem;
                        font-weight: 600;
                    }
                    .investor-location {
                        color: #7f8c8d;
                        font-size: 0.9rem;
                        margin-top: 5px;
                    }
                    .investor-location i {
                        color: #e74c3c;
                    }
                    .investor-section {
                        margin-bottom: 20px;
                    }
                    .investor-section h4 {
                        font-size: 1.1rem;
                        color: #2c3e50;
                        margin-bottom: 10px;
                        padding-bottom: 5px;
                        border-bottom: 1px solid #eee;
                    }
                    .investor-details-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 15px;
                        margin: 15px 0;
                    }
                    .detail-item {
                        background: #f8f9fa;
                        padding: 15px;
                        border-radius: 8px;
                    }
                    .detail-label {
                        font-size: 0.8rem;
                        color: #7f8c8d;
                        margin-bottom: 5px;
                    }
                    .detail-value {
                        font-weight: 600;
                        color: #2c3e50;
                    }
                    .interests-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                    }
                    .interest-tag {
                        display: inline-block;
                        background: #e3f2fd;
                        color: #1976d2;
                        padding: 4px 12px;
                        border-radius: 20px;
                        font-size: 0.8rem;
                    }
                    .swal2-actions {
                        margin-top: 20px;
                    }
                </style>
            `,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Pitch to ' + investor.name.split(' ')[0],
            cancelButtonText: 'Close',
            confirmButtonColor: '#2c3e50',
            width: '800px',
            customClass: {
                popup: 'investor-modal-container'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const targetField = document.getElementById('targetInvestorId');
                if (targetField) {
                    targetField.value = String(investor.id);
                }

                // Scroll to pitch form
                document.getElementById('pitch').scrollIntoView({ behavior: 'smooth' });
                
                // Focus on the first field
                const startupNameField = document.getElementById('startupName');
                if (startupNameField) {
                    startupNameField.focus();
                }
                
                // Show a message
                setTimeout(() => {
                    Swal.fire({
                        title: 'Pitch to ' + investor.name,
                        text: `You're now ready to submit your pitch to ${investor.name} from ${investor.company}. Complete the form below to get started.`,
                        icon: 'info',
                        confirmButtonText: 'Got it!'
                    });
                }, 500);
            }
        });
    }

    // Expose modal function for matching results actions
    window.__showInvestorModal = showInvestorModal;
}

/**
 * Initialize the investor map
 */
function initInvestorMap() {
    // Check if the map container exists
    const mapElement = document.getElementById('investorMap');
    if (!mapElement) return;

    // Ensure Leaflet is loaded
    if (typeof L === 'undefined') return;

    // Create a map centered on Africa
    const map = L.map('investorMap').setView([1.2921, 36.8219], 3);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Sample investor locations - in a real app, this would come from your data
    const investorLocations = [
        {
            name: 'Dr. James Mwangi',
            type: 'angel',
            position: [-6.7924, 39.2083], // Dar es Salaam
            investments: 12
        },
        {
            name: 'Amina Juma',
            type: 'vc',
            position: [-1.2921, 36.8219], // Nairobi
            investments: 8
        },
        {
            name: 'David Ochieng',
            type: 'vc',
            position: [0.3136, 32.5811], // Kampala
            investments: 15
        },
        {
            name: 'Sarah Chen',
            type: 'corporate',
            position: [22.3193, 114.1694], // Hong Kong
            investments: 20
        },
        {
            name: 'Thomas Schmidt',
            type: 'government',
            position: [48.8566, 2.3522], // Paris
            investments: 25
        },
        {
            name: 'Nadia Kamau',
            type: 'angel',
            position: [-1.9536, 30.0605], // Kigali
            investments: 5
        },
        {
            name: 'Fatma Mshana',
            type: 'government',
            position: [-6.1630, 35.7516], // Dodoma
            investments: 9
        },
        {
            name: 'Michael Patel',
            type: 'vc',
            position: [9.0765, 7.3986], // Abuja
            investments: 14
        }
    ];

    // Define colors for different investor types
    const typeColors = {
        'angel': '#3498db',
        'vc': '#2ecc71',
        'corporate': '#e74c3c',
        'government': '#f39c12',
        'incubator': '#9b59b6'
    };

    // Add markers for each investor
    investorLocations.forEach(investor => {
        const color = typeColors[investor.type] || '#3498db';
        
        // Create a custom icon with the number of investments
        const icon = L.divIcon({
            html: `<div style="background-color: ${color}; 
                              width: ${20 + investor.investments}px; 
                              height: ${20 + investor.investments}px; 
                              border-radius: 50%; 
                              display: flex; 
                              align-items: center; 
                              justify-content: center; 
                              color: white; 
                              font-weight: bold;
                              border: 2px solid white;
                              box-shadow: 0 0 10px rgba(0,0,0,0.2);">
                      ${investor.investments}
                   </div>`,
            className: 'investor-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        // Add the marker to the map
        L.marker(investor.position, { icon: icon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align: center;">
                    <h4 style="margin: 0 0 5px;">${investor.name}</h4>
                    <div style="font-size: 0.9em; color: #666; margin-bottom: 5px;">
                        ${getInvestorTypeName(investor.type)}
                    </div>
                    <div style="font-size: 0.8em; color: #888;">
                        ${investor.investments} investments
                    </div>
                </div>
            `);
    });

    // Add a legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'white';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
        
        let labels = ['<strong>Investor Types</strong>'];
        
        for (const type in typeColors) {
            labels.push(
                `<i style="background:${typeColors[type]}; 
                           width: 12px; 
                           height: 12px; 
                           float: left; 
                           margin-right: 8px; 
                           border-radius: 50%; 
                           margin-top: 3px;"></i> ${getInvestorTypeName(type)}`
            );
        }
        
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(map);
}

/**
 * Initialize the pitch form
 */
function initPitchForm() {
    const pitchForm = document.getElementById('pitchForm');
    if (!pitchForm) return;

    const matchingResults = document.getElementById('matchingResults');
    const matchingGrid = document.getElementById('matchingGrid');
    const targetInvestorIdField = document.getElementById('targetInvestorId');

    // Word count for description
    const descriptionField = document.getElementById('description');
    const charCount = document.getElementById('charCount');
    
    if (descriptionField && charCount) {
        descriptionField.addEventListener('input', function() {
            const words = this.value.trim() ? this.value.trim().split(/\s+/) : [];
            charCount.textContent = words.length;
            
            // Validate word count
            if (words.length > 500) {
                this.setCustomValidity('Description must be 500 words or less');
                charCount.style.color = 'red';
            } else {
                this.setCustomValidity('');
                charCount.style.color = 'inherit';
            }
        });
    }

    // File upload preview
    const fileInput = document.getElementById('pitchDeck');
    const fileName = document.getElementById('fileName');
    
    if (fileInput && fileName) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileName.textContent = this.files[0].name;
                fileName.style.color = '#2c3e50';
                
                // Validate file type
                const allowedTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
                if (!allowedTypes.includes(this.files[0].type)) {
                    this.setCustomValidity('Please upload a PDF or PowerPoint file');
                    fileName.style.color = 'red';
                } else {
                    this.setCustomValidity('');
                }
                
                // Validate file size (10MB max)
                const maxSize = 10 * 1024 * 1024; // 10MB in bytes
                if (this.files[0].size > maxSize) {
                    this.setCustomValidity('File size must be less than 10MB');
                    fileName.style.color = 'red';
                }
            } else {
                fileName.textContent = 'No file chosen';
                fileName.style.color = 'inherit';
            }
        });
    }

    // Form submission
    pitchForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const allInvestors = Array.isArray(window.__investorData) ? window.__investorData : [];
        const pitchIndustry = document.getElementById('industry') ? document.getElementById('industry').value : '';
        const pitchStage = document.getElementById('stage') ? document.getElementById('stage').value : '';
        const pitchAmount = document.getElementById('amount') ? Number(document.getElementById('amount').value) : NaN;
        const targetId = targetInvestorIdField && targetInvestorIdField.value ? Number(targetInvestorIdField.value) : null;

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Matching
            if (matchingResults && matchingGrid && allInvestors.length) {
                const scored = allInvestors
                    .map(inv => {
                        let score = 0;

                        // Industry match
                        if (pitchIndustry && Array.isArray(inv.industries) && inv.industries.includes(pitchIndustry)) {
                            score += 5;
                        }

                        // Funding amount overlap
                        if (Number.isFinite(pitchAmount)) {
                            if (pitchAmount >= inv.minInvestment && pitchAmount <= inv.maxInvestment) {
                                score += 4;
                            } else {
                                const dist = Math.min(Math.abs(inv.minInvestment - pitchAmount), Math.abs(inv.maxInvestment - pitchAmount));
                                if (dist <= 25000) score += 2;
                                else if (dist <= 100000) score += 1;
                            }
                        }

                        // Stage preference (simple heuristic)
                        const stagePref = {
                            'pre-seed': ['angel', 'incubator'],
                            'seed': ['angel', 'vc', 'incubator'],
                            'series-a': ['vc', 'corporate'],
                            'series-b': ['vc', 'corporate', 'government'],
                            'series-c': ['vc', 'corporate', 'government']
                        };
                        const pref = stagePref[pitchStage] || [];
                        if (pref.includes(inv.type)) score += 2;

                        // Local bonus
                        if (inv.location === 'tanzania') score += 1;

                        // Target investor bump
                        if (targetId && inv.id === targetId) score += 10;

                        return { inv, score };
                    })
                    .sort((a, b) => b.score - a.score);

                const top = scored.slice(0, 5);
                matchingGrid.innerHTML = top.map(({ inv, score }) => `
                    <div class="match-card">
                        <div class="match-head">
                            <img class="match-avatar" src="${inv.avatar}" alt="${inv.name}">
                            <div>
                                <div class="match-name">${inv.name}</div>
                                <div class="match-sub">${inv.title} • ${inv.company}</div>
                                <div class="match-meta">
                                    <span class="match-pill">${getInvestorTypeName(inv.type)}</span>
                                    <span class="match-pill">${getLocationName(inv.location)}</span>
                                    <span class="match-score">Match: ${score}</span>
                                </div>
                            </div>
                        </div>
                        <div class="match-actions">
                            <button class="btn btn-outline btn-sm match-view" data-investor-id="${inv.id}">View</button>
                            <button class="btn btn-primary btn-sm match-pitch" data-investor-id="${inv.id}">Pitch</button>
                        </div>
                    </div>
                `).join('');

                matchingResults.hidden = false;

                // Wire actions
                matchingGrid.querySelectorAll('.match-view').forEach(btn => {
                    btn.addEventListener('click', e2 => {
                        e2.preventDefault();
                        const id = Number(btn.getAttribute('data-investor-id'));
                        const investor = allInvestors.find(x => x.id === id);
                        if (investor && typeof window.__showInvestorModal === 'function') {
                            window.__showInvestorModal(investor);
                        } else {
                            Swal.fire({
                                title: investor ? investor.name : 'Investor',
                                text: investor ? investor.bio : '',
                                icon: 'info'
                            });
                        }
                    });
                });

                matchingGrid.querySelectorAll('.match-pitch').forEach(btn => {
                    btn.addEventListener('click', e2 => {
                        e2.preventDefault();
                        const id = Number(btn.getAttribute('data-investor-id'));
                        if (targetInvestorIdField) targetInvestorIdField.value = String(id);
                        document.getElementById('pitch').scrollIntoView({ behavior: 'smooth' });
                        const startupNameField = document.getElementById('startupName');
                        startupNameField && startupNameField.focus();
                    });
                });
            }

            // Show success message
            Swal.fire({
                title: 'Pitch Submitted!',
                html: `
                    <div style="text-align: left;">
                        <p>Thank you for submitting your pitch. Our team will review your information and get back to you within 3-5 business days.</p>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 15px;">
                            <h4 style="margin-top: 0; color: #2c3e50;">Next Steps:</h4>
                            <ol style="padding-left: 20px; margin-bottom: 0;">
                                <li>Our team will review your pitch deck and business details</li>
                                <li>If there's a potential match, we'll schedule an introductory call</li>
                                <li>You may be invited to present to our investment committee</li>
                            </ol>
                        </div>
                    </div>
                `,
                icon: 'success',
                confirmButtonText: 'Got it!',
                confirmButtonColor: '#2c3e50'
            }).then(() => {
                // Reset form
                pitchForm.reset();
                if (fileName) fileName.textContent = 'No file chosen';
                if (charCount) charCount.textContent = '0';
                if (targetInvestorIdField) targetInvestorIdField.value = '';

                if (matchingResults && !matchingResults.hidden) {
                    matchingResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    // Style the button
    const style = document.createElement('style');
    style.textContent = `
        #back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--accent-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 99;
            transition: all 0.3s ease;
        }
        #back-to-top:hover {
            background: var(--primary-color);
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        #back-to-top.visible {
            display: flex;
        }
    `;
    document.head.appendChild(style);

    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize AOS (Animate On Scroll)
 */
function initAOS() {
    // Check if AOS is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

/**
 * Initialize print button
 */
function initPrintButton() {
    const printButton = document.createElement('button');
    printButton.id = 'print-page';
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.setAttribute('aria-label', 'Print this page');
    document.body.appendChild(printButton);

    // Style the button
    const style = document.createElement('style');
    style.textContent = `
        #print-page {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        #print-page:hover {
            background-color: #0056b3;
            transform: scale(1.1);
        }
        
        #print-page:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
        }
        
        @media print {
            #print-page {
                display: none;
            }
        }`;
        
    document.head.appendChild(style);
    
    // Add click event listener
    printButton.addEventListener('click', () => {
        window.print();
    });
}