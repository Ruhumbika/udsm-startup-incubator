// Premium Funding Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initCalculator();
    initFundingGrid();
    initFilters();
    initTimeline();
    initStatsAnimation();
    initMobileMenu();
    initModals();
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Funding Calculator
function initCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    const teamSizeInput = document.getElementById('teamSize');
    const teamSizeValue = document.getElementById('teamSizeValue');
    const runwayInput = document.getElementById('runway');
    const runwayValue = document.getElementById('runwayValue');
    
    // Update team size display
    if (teamSizeInput && teamSizeValue) {
        teamSizeInput.addEventListener('input', function() {
            teamSizeValue.textContent = this.value;
            updateTotalExpenses();
        });
    }
    
    // Update runway display
    if (runwayInput && runwayValue) {
        runwayInput.addEventListener('input', function() {
            runwayValue.textContent = this.value;
        });
    }
    
    // Expense inputs
    const expenseInputs = ['salaries', 'office', 'marketing', 'technology'];
    expenseInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', updateTotalExpenses);
        }
    });
    
    // Calculate button
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateFunding);
    }
    
    // Save plan button
    const savePlanBtn = document.getElementById('savePlan');
    if (savePlanBtn) {
        savePlanBtn.addEventListener('click', saveFundingPlan);
    }
    
    // Find investors button
    const findInvestorsBtn = document.getElementById('findInvestors');
    if (findInvestorsBtn) {
        findInvestorsBtn.addEventListener('click', findInvestors);
    }
    
    // Initial calculation
    updateTotalExpenses();
}

function updateTotalExpenses() {
    const expenseInputs = [
        { id: 'salaries', value: 0 },
        { id: 'office', value: 0 },
        { id: 'marketing', value: 0 },
        { id: 'technology', value: 0 }
    ];
    
    let total = 0;
    expenseInputs.forEach(expense => {
        const input = document.getElementById(expense.id);
        if (input) {
            const value = parseFloat(input.value) || 0;
            total += value;
        }
    });
    
    const totalElement = document.getElementById('totalMonthlyExpenses');
    if (totalElement) {
        totalElement.textContent = formatCurrency(total) + ' TZS';
    }
}

function calculateFunding() {
    const totalMonthly = getTotalMonthlyExpenses();
    const runway = parseInt(document.getElementById('runway').value) || 12;
    
    // Calculate funding needs
    const monthlyBurnRate = totalMonthly;
    const recommendedFunding = totalMonthly * runway;
    const fundingToRaise = recommendedFunding * 1.15; // Add 15% buffer
    
    // Update display
    document.getElementById('monthlyBurnRate').textContent = formatCurrency(monthlyBurnRate) + ' TZS';
    document.getElementById('recommendedFunding').textContent = formatCurrency(recommendedFunding) + ' TZS';
    document.getElementById('fundingToRaise').textContent = formatCurrency(fundingToRaise) + ' TZS';
    
    // Show results with animation
    const results = document.getElementById('calculatorResults');
    if (results) {
        results.style.display = 'block';
        results.style.animation = 'fadeInUp 0.6s ease';
        
        // Scroll to results
        setTimeout(() => {
            results.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

function getTotalMonthlyExpenses() {
    const expenseInputs = ['salaries', 'office', 'marketing', 'technology'];
    let total = 0;
    
    expenseInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            total += parseFloat(input.value) || 0;
        }
    });
    
    return total;
}

function formatCurrency(amount) {
    if (amount >= 1000000) {
        return (amount / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (amount >= 1000) {
        return (amount / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return amount.toLocaleString();
}

function saveFundingPlan() {
    const planData = {
        monthlyBurnRate: getTotalMonthlyExpenses(),
        runway: document.getElementById('runway').value,
        recommendedFunding: parseFloat(document.getElementById('recommendedFunding').textContent),
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('fundingPlan', JSON.stringify(planData));
    
    // Show success message
    showToast('Funding plan saved successfully!', 'success');
}

function findInvestors() {
    const amountNeeded = parseFloat(document.getElementById('fundingToRaise').textContent);
    const businessStage = document.getElementById('businessStage').value;
    
    // Filter funding options based on needs
    const filteredFunding = fundingData.filter(item => {
        const itemAmount = parseFloat(item.amount.replace(/[^\d.]/g, ''));
        return itemAmount >= amountNeeded * 0.8 && 
               itemAmount <= amountNeeded * 1.2 &&
               item.stage.includes(businessStage);
    });
    
    // Update funding grid with filtered results
    renderFundingGrid(filteredFunding.slice(0, 6));
    
    // Show message
    showToast(`Found ${filteredFunding.length} matching investors!`, 'info');
}

// Funding Opportunities Grid
let fundingData = [];
let currentPage = 1;
const itemsPerPage = 6;

function initFundingGrid() {
    // Sample funding data
    fundingData = [
        {
            id: 1,
            title: 'Innovation Grant Program',
            description: 'Non-dilutive funding for early-stage tech startups with innovative solutions.',
            amount: '10,000,000 TZS',
            type: 'grant',
            stage: 'ideation,prototype',
            industry: 'tech,health,fintech',
            deadline: '2024-03-15',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            featured: true,
            tags: ['Non-dilutive', 'No Equity', 'Grant']
        },
        {
            id: 2,
            title: 'Seed Africa Fund',
            description: 'Equity investment for scalable startups with proven traction.',
            amount: '50,000,000 TZS',
            type: 'equity',
            stage: 'seed,early',
            industry: 'tech,fintech',
            deadline: '2024-04-30',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            featured: false,
            tags: ['Equity', 'Seed', 'Growth']
        },
        {
            id: 3,
            title: 'CRDB Startup Loan',
            description: 'Low-interest loans for revenue-generating businesses.',
            amount: '25,000,000 TZS',
            type: 'loan',
            stage: 'early,growth',
            industry: 'all',
            deadline: '2024-03-31',
            image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            featured: false,
            tags: ['Loan', 'Low Interest', 'Flexible']
        },
        {
            id: 4,
            title: 'Pitch Competition 2024',
            description: 'Win cash prizes and investor connections in our annual pitch competition.',
            amount: '15,000,000 TZS',
            type: 'competition',
            stage: 'ideation,prototype,seed',
            industry: 'all',
            deadline: '2024-03-20',
            image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            featured: true,
            tags: ['Competition', 'Prize', 'Exposure']
        },
        {
            id: 5,
            title: 'AgriTech Accelerator',
            description: 'Funding and mentorship for agriculture technology startups.',
            amount: '30,000,000 TZS',
            type: 'accelerator',
            stage: 'prototype,seed',
            industry: 'agriculture',
            deadline: '2024-04-15',
            image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            featured: false,
            tags: ['Accelerator', 'AgriTech', 'Mentorship']
        },
        {
            id: 6,
            title: 'HealthTech Innovation Fund',
            description: 'Grant funding for healthcare technology innovations.',
            amount: '20,000,000 TZS',
            type: 'grant',
            stage: 'prototype,seed',
            industry: 'health',
            deadline: '2024-05-10',
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            featured: false,
            tags: ['HealthTech', 'Grant', 'Innovation']
        },
        {
            id: 7,
            title: 'FinTech Growth Capital',
            description: 'Equity investment for scaling fintech companies.',
            amount: '100,000,000 TZS',
            type: 'equity',
            stage: 'growth',
            industry: 'fintech',
            deadline: '2024-06-30',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            featured: true,
            tags: ['FinTech', 'Growth', 'Series A']
        },
        {
            id: 8,
            title: 'Renewable Energy Grant',
            description: 'Funding for sustainable energy solutions and innovations.',
            amount: '40,000,000 TZS',
            type: 'grant',
            stage: 'ideation,prototype,seed',
            industry: 'renewable',
            deadline: '2024-04-30',
            image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            featured: false,
            tags: ['Renewable', 'Sustainability', 'Grant']
        }
    ];
    
    // Initial render
    renderFundingGrid(fundingData.slice(0, itemsPerPage));
    setupPagination();
}

function renderFundingGrid(data) {
    const grid = document.getElementById('fundingGrid');
    if (!grid) return;
    
    // Clear loading state
    const loading = document.getElementById('loadingFunding');
    if (loading) loading.style.display = 'none';
    
    // Clear grid
    grid.innerHTML = '';
    
    // Create cards
    data.forEach(item => {
        const card = createFundingCard(item);
        grid.appendChild(card);
    });
    
    // Add animation
    const cards = grid.querySelectorAll('.funding-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fade-up');
    });
}

function createFundingCard(item) {
    const card = document.createElement('div');
    card.className = `funding-card ${item.featured ? 'featured' : ''}`;
    
    // Type badge colors
    const typeColors = {
        grant: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
        equity: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
        loan: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
        competition: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
        accelerator: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)'
    };
    
    // Type labels
    const typeLabels = {
        grant: 'Grant',
        equity: 'Equity',
        loan: 'Loan',
        competition: 'Competition',
        accelerator: 'Accelerator'
    };
    
    card.innerHTML = `
        <div class="funding-header">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="funding-overlay"></div>
            ${item.featured ? '<div class="featured-badge">Featured</div>' : ''}
            <div class="funding-type" style="background: ${typeColors[item.type] || '#4A5568'}">
                ${typeLabels[item.type] || 'Funding'}
            </div>
            <div class="funding-amount">
                <div class="amount">${item.amount.split(' ')[0]}</div>
                <div class="currency">${item.amount.split(' ').slice(1).join(' ')}</div>
            </div>
        </div>
        <div class="funding-content">
            <h3 class="funding-title">${item.title}</h3>
            <p class="funding-description">${item.description}</p>
            
            <div class="funding-meta">
                <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>Deadline: ${formatDate(item.deadline)}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-bullseye"></i>
                    <span>${getStageLabel(item.stage)}</span>
                </div>
            </div>
            
            <div class="funding-tags">
                ${item.tags.map(tag => `<span class="funding-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="funding-actions">
                <button class="btn btn-small btn-outline view-details" data-id="${item.id}">
                    <i class="fas fa-info-circle"></i> Details
                </button>
                <button class="btn btn-small btn-primary apply-now" data-id="${item.id}">
                    <i class="fas fa-rocket"></i> Apply Now
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    card.querySelector('.view-details').addEventListener('click', () => viewFundingDetails(item.id));
    card.querySelector('.apply-now').addEventListener('click', () => applyForFunding(item.id));
    
    return card;
}

function getStageLabel(stages) {
    const stageLabels = {
        ideation: 'Ideation',
        prototype: 'Prototype',
        seed: 'Seed',
        early: 'Early Revenue',
        growth: 'Growth'
    };
    
    return stages.split(',').map(s => stageLabels[s] || s).join(', ');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Filters
function initFilters() {
    const searchInput = document.getElementById('fundingSearch');
    const typeFilter = document.getElementById('fundingType');
    const amountFilter = document.getElementById('fundingAmount');
    const industryFilter = document.getElementById('industry');
    const filterBtn = document.querySelector('.btn-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
    
    if (amountFilter) {
        amountFilter.addEventListener('change', applyFilters);
    }
    
    if (industryFilter) {
        industryFilter.addEventListener('change', applyFilters);
    }
    
    if (filterBtn) {
        filterBtn.addEventListener('click', applyFilters);
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('fundingSearch').value.toLowerCase();
    const typeFilter = document.getElementById('fundingType').value;
    const amountFilter = document.getElementById('fundingAmount').value;
    const industryFilter = document.getElementById('industry').value;
    
    const filtered = fundingData.filter(item => {
        // Search filter
        const matchesSearch = !searchTerm || 
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        // Type filter
        const matchesType = !typeFilter || item.type === typeFilter;
        
        // Amount filter
        const matchesAmount = !amountFilter || checkAmountRange(item.amount, amountFilter);
        
        // Industry filter
        const matchesIndustry = !industryFilter || item.industry.includes(industryFilter);
        
        return matchesSearch && matchesType && matchesAmount && matchesIndustry;
    });
    
    currentPage = 1;
    renderFundingGrid(filtered.slice(0, itemsPerPage));
    updatePagination(filtered.length);
}

function checkAmountRange(itemAmount, range) {
    const amount = parseFloat(itemAmount.replace(/[^\d.]/g, ''));
    
    switch(range) {
        case '0-500000':
            return amount <= 500000;
        case '500000-5000000':
            return amount >= 500000 && amount <= 5000000;
        case '5000000-50000000':
            return amount >= 5000000 && amount <= 50000000;
        case '50000000+':
            return amount >= 50000000;
        default:
            return true;
    }
}

// Pagination
function setupPagination() {
    const prevBtn = document.getElementById('prevFundingPage');
    const nextBtn = document.getElementById('nextFundingPage');
    const pageNumbers = document.getElementById('fundingPageNumbers');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateGridForPage();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(fundingData.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                updateGridForPage();
            }
        });
    }
    
    if (pageNumbers) {
        pageNumbers.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-number')) {
                currentPage = parseInt(e.target.textContent);
                updateGridForPage();
            }
        });
    }
    
    updatePagination(fundingData.length);
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const prevBtn = document.getElementById('prevFundingPage');
    const nextBtn = document.getElementById('nextFundingPage');
    const pageNumbers = document.getElementById('fundingPageNumbers');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
    
    if (pageNumbers) {
        pageNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('span');
            pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageNumbers.appendChild(pageBtn);
        }
    }
}

function updateGridForPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    renderFundingGrid(fundingData.slice(start, end));
    updatePagination(fundingData.length);
    
    // Scroll to grid
    const grid = document.getElementById('fundingGrid');
    if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Timeline
function initTimeline() {
    const timelineData = [
        {
            date: '2024-03-15',
            title: 'Innovation Grant Deadline',
            description: 'Ministry of Innovation - Up to 10M TZS',
            type: 'grant'
        },
        {
            date: '2024-03-20',
            title: 'Pitch Competition Finals',
            description: 'Annual startup pitch competition with 15M TZS in prizes',
            type: 'competition'
        },
        {
            date: '2024-03-31',
            title: 'CRDB Startup Loan Deadline',
            description: 'Low-interest loans for growing businesses',
            type: 'loan'
        },
        {
            date: '2024-04-15',
            title: 'AgriTech Accelerator Applications',
            description: 'Funding and mentorship program for agriculture startups',
            type: 'accelerator'
        },
        {
            date: '2024-04-30',
            title: 'Seed Africa Fund Deadline',
            description: 'Equity investment for scalable startups',
            type: 'equity'
        },
        {
            date: '2024-05-10',
            title: 'HealthTech Innovation Fund',
            description: 'Grant funding for healthcare technology',
            type: 'grant'
        }
    ];
    
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const daysLeft = Math.ceil((new Date(item.date) - new Date()) / (1000 * 60 * 60 * 24));
        const status = daysLeft > 30 ? 'upcoming' : daysLeft > 0 ? 'soon' : 'past';
        
        timelineItem.innerHTML = `
            <div class="timeline-date ${status}">
                <strong>${formatDate(item.date)}</strong>
                <span>${daysLeft > 0 ? `${daysLeft} days left` : 'Closed'}</span>
            </div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <button class="btn btn-small apply-timeline" data-id="${index}">
                    ${status === 'past' ? 'View Details' : 'Apply Now'}
                </button>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Stats Animation
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000;
                const increment = finalValue / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        target.textContent = finalValue + (target.getAttribute('data-target').includes('.') ? '' : '+');
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + (target.getAttribute('data-target').includes('.') ? '' : '+');
                    }
                }, 16);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.main-nav') && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            }
        });
    }
}

// Modals
function initModals() {
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.querySelector('.btn-close-modal');
    
    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
}

function viewFundingDetails(fundingId) {
    const funding = fundingData.find(item => item.id === fundingId);
    if (!funding) return;
    
    // Create modal for details
    const modalContent = `
        <div class="funding-details-modal">
            <h2>${funding.title}</h2>
            <div class="detail-section">
                <h3><i class="fas fa-info-circle"></i> Description</h3>
                <p>${funding.description}</p>
            </div>
            <div class="detail-grid">
                <div class="detail-item">
                    <i class="fas fa-coins"></i>
                    <div>
                        <strong>Amount</strong>
                        <p>${funding.amount}</p>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-calendar"></i>
                    <div>
                        <strong>Deadline</strong>
                        <p>${formatDate(funding.deadline)}</p>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-bullseye"></i>
                    <div>
                        <strong>Stage</strong>
                        <p>${getStageLabel(funding.stage)}</p>
                    </div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-industry"></i>
                    <div>
                        <strong>Industry</strong>
                        <p>${funding.industry.split(',').map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ')}</p>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-outline close-details">Close</button>
                <button class="btn btn-primary apply-from-details" data-id="${funding.id}">Apply Now</button>
            </div>
        </div>
    `;
    
    showModal('Funding Details', modalContent);
    
    // Add event listeners for modal buttons
    document.querySelector('.close-details')?.addEventListener('click', () => {
        closeModal();
    });
    
    document.querySelector('.apply-from-details')?.addEventListener('click', () => {
        closeModal();
        applyForFunding(funding.id);
    });
}

function applyForFunding(fundingId) {
    const funding = fundingData.find(item => item.id === fundingId);
    if (!funding) return;
    
    const applicationForm = `
        <form id="fundingApplication" class="premium-form">
            <div class="form-group">
                <label for="applicantName"><i class="fas fa-user"></i> Full Name *</label>
                <input type="text" id="applicantName" required>
            </div>
            
            <div class="form-group">
                <label for="applicantEmail"><i class="fas fa-envelope"></i> Email *</label>
                <input type="email" id="applicantEmail" required>
            </div>
            
            <div class="form-group">
                <label for="startupName"><i class="fas fa-building"></i> Startup Name *</label>
                <input type="text" id="startupName" required>
            </div>
            
            <div class="form-group">
                <label for="requestAmount"><i class="fas fa-money-bill-wave"></i> Requested Amount (TZS) *</label>
                <input type="number" id="requestAmount" value="${funding.amount.replace(/[^\d.]/g, '')}" required>
            </div>
            
            <div class="form-group">
                <label for="pitchDeck"><i class="fas fa-file-pdf"></i> Pitch Deck (PDF, max 10MB) *</label>
                <input type="file" id="pitchDeck" accept=".pdf" required>
            </div>
            
            <div class="form-group">
                <label for="additionalInfo"><i class="fas fa-comment-alt"></i> Additional Information</label>
                <textarea id="additionalInfo" rows="4" placeholder="Tell us about your startup, team, and why you're a good fit for this funding..."></textarea>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-outline cancel-application">Cancel</button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-paper-plane"></i> Submit Application
                </button>
            </div>
        </form>
    `;
    
    showModal(`Apply for: ${funding.title}`, applicationForm);
    
    // Handle form submission
    document.getElementById('fundingApplication')?.addEventListener('submit', (e) => {
        e.preventDefault();
        submitApplication(fundingId);
    });
    
    document.querySelector('.cancel-application')?.addEventListener('click', closeModal);
}

function submitApplication(fundingId) {
    // Simulate API call
    setTimeout(() => {
        closeModal();
        
        // Show success modal
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.style.display = 'flex';
        }
        
        // Track in localStorage
        const applications = JSON.parse(localStorage.getItem('fundingApplications') || '[]');
        applications.push({
            fundingId,
            timestamp: new Date().toISOString(),
            status: 'submitted'
        });
        localStorage.setItem('fundingApplications', JSON.stringify(applications));
        
        showToast('Application submitted successfully!', 'success');
    }, 1500);
}

function showModal(title, content) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-container animate-fade-up">
            <div class="modal-header">
                <h2>${title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
    
    // Add close handlers
    modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Toast notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${getToastIcon(type)}"></i>
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    document.body.appendChild(toast);
    
    // Add close button handler
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Add CSS for dynamic elements
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(10, 36, 99, 0.9);
        backdrop-filter: blur(5px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }
    
    .modal-container {
        background: white;
        border-radius: 20px;
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: var(--shadow-2xl);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #E2E8F0;
    }
    
    .modal-header h2 {
        color: var(--primary-blue);
        font-size: 1.5rem;
        margin: 0;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #64748B;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.3s;
    }
    
    .modal-close:hover {
        background: #F1F5F9;
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .premium-form .form-group {
        margin-bottom: 1.5rem;
    }
    
    .premium-form label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: var(--primary-blue);
        margin-bottom: 0.5rem;
    }
    
    .premium-form input,
    .premium-form textarea,
    .premium-form select {
        width: 100%;
        padding: 0.875rem 1rem;
        border: 2px solid #E2E8F0;
        border-radius: 10px;
        font-size: 1rem;
        font-family: inherit;
        transition: border-color 0.3s;
    }
    
    .premium-form input:focus,
    .premium-form textarea:focus,
    .premium-form select:focus {
        outline: none;
        border-color: var(--accent-teal);
    }
    
    .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        justify-content: flex-end;
    }
    
    .toast {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-xl);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 99999;
        animation: slideInRight 0.3s ease;
    }
    
    .toast-success {
        border-left: 4px solid var(--success-green);
    }
    
    .toast-error {
        border-left: 4px solid var(--danger-red);
    }
    
    .toast-warning {
        border-left: 4px solid var(--warning-amber);
    }
    
    .toast-info {
        border-left: 4px solid var(--accent-teal);
    }
    
    .toast i {
        font-size: 1.25rem;
    }
    
    .toast-success i {
        color: var(--success-green);
    }
    
    .toast-error i {
        color: var(--danger-red);
    }
    
    .toast-warning i {
        color: var(--warning-amber);
    }
    
    .toast-info i {
        color: var(--accent-teal);
    }
    
    .toast-close {
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        color: #94A3B8;
        margin-left: 1rem;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .funding-details-modal .detail-section {
        margin-bottom: 2rem;
    }
    
    .funding-details-modal .detail-section h3 {
        color: var(--primary-blue);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .funding-details-modal .detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }
    
    .funding-details-modal .detail-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: #F8FAFC;
        border-radius: 10px;
    }
    
    .funding-details-modal .detail-item i {
        font-size: 1.5rem;
        color: var(--accent-teal);
    }
    
    .timeline-item {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #E2E8F0;
    }
    
    .timeline-date {
        text-align: right;
        display: flex;
        flex-direction: column;
    }
    
    .timeline-date.upcoming span {
        color: var(--success-green);
    }
    
    .timeline-date.soon span {
        color: var(--warning-amber);
    }
    
    .timeline-date.past span {
        color: var(--danger-red);
    }
    
    .timeline-content {
        padding-left: 2rem;
        border-left: 2px solid var(--accent-teal);
    }
    
    .timeline-content h3 {
        color: var(--primary-blue);
        margin-bottom: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .timeline-item {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .timeline-date {
            text-align: left;
        }
        
        .timeline-content {
            padding-left: 0;
            border-left: none;
            padding-top: 1rem;
            border-top: 2px solid var(--accent-teal);
        }
    }
`;

document.head.appendChild(dynamicStyles);