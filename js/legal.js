// Premium Legal & IP JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initHeroParallax();
    initTemplatesGrid();
    initFilters();
    initComplianceTabs();
    initFAQ();
    initContactForm();
    initIPAssessment();
    initModals();
    initMobileMenu();
    
    // Initialize Select2
    if (typeof $ !== 'undefined' && $.fn.select2) {
        $('.styled-select').select2({
            theme: 'bootstrap-5',
            width: '100%'
        });
    }
    
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

// Hero Parallax Effect
function initHeroParallax() {
    const hero = document.querySelector('.premium-hero');
    const parallaxImage = document.querySelector('.parallax-image');
    
    if (hero && parallaxImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            parallaxImage.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        });
    }
}

// Legal Templates Data
let templatesData = [];
let currentPage = 1;
const itemsPerPage = 9;

function initTemplatesGrid() {
    // Sample legal templates data
    templatesData = [
        {
            id: 1,
            title: 'Founders Agreement',
            description: 'Essential agreement for co-founders covering equity, roles, and responsibilities.',
            category: 'business',
            stage: 'ideation',
            industry: 'all',
            fileType: 'DOCX',
            pages: 8,
            downloads: 1245,
            popular: true,
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tags: ['Founders', 'Equity', 'Agreement'],
            preview: `
                <div class="template-preview">
                    <h2>Founders Agreement Template</h2>
                    <div class="template-info">
                        <div class="info-item">
                            <i class="fas fa-file-word"></i>
                            <span>File Type: DOCX (Editable)</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-file-alt"></i>
                            <span>Pages: 8</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-download"></i>
                            <span>Downloads: 1,245</span>
                        </div>
                    </div>
                    
                    <div class="template-sections">
                        <h3>Template Includes:</h3>
                        <ul>
                            <li>Company Structure & Ownership</li>
                            <li>Roles & Responsibilities</li>
                            <li>Equity Distribution & Vesting</li>
                            <li>Decision-making Processes</li>
                            <li>Intellectual Property Assignment</li>
                            <li>Dispute Resolution</li>
                            <li>Exit Strategies</li>
                        </ul>
                    </div>
                    
                    <div class="template-actions">
                        <button class="btn btn-primary download-template" data-id="1">
                            <i class="fas fa-download"></i> Download Template
                        </button>
                        <button class="btn btn-outline close-preview">
                            <i class="fas fa-times"></i> Close Preview
                        </button>
                    </div>
                </div>
            `
        },
        {
            id: 2,
            title: 'Non-Disclosure Agreement (NDA)',
            description: 'Confidentiality agreement for protecting sensitive business information.',
            category: 'nda',
            stage: 'all',
            industry: 'all',
            fileType: 'PDF',
            pages: 4,
            downloads: 2345,
            popular: true,
            image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tags: ['Confidentiality', 'Legal', 'Agreement']
        },
        {
            id: 3,
            title: 'Service Agreement',
            description: 'Comprehensive service contract for client engagements.',
            category: 'contracts',
            stage: 'growth',
            industry: 'saas',
            fileType: 'DOCX',
            pages: 12,
            downloads: 987,
            popular: false,
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tags: ['Services', 'Contract', 'Client']
        },
        {
            id: 4,
            title: 'Employee Contract',
            description: 'Standard employment agreement for full-time employees.',
            category: 'employment',
            stage: 'growth',
            industry: 'all',
            fileType: 'DOCX',
            pages: 10,
            downloads: 1567,
            popular: true,
            image: 'https://images.unsplash.com/photo-1551836026-d5c2d5f1f0d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tags: ['Employment', 'HR', 'Contract']
        },
        {
            id: 5,
            title: 'Privacy Policy Template',
            description: 'GDPR-compliant privacy policy for websites and apps.',
            category: 'terms',
            stage: 'startup',
            industry: 'tech',
            fileType: 'HTML',
            pages: 6,
            downloads: 3123,
            popular: true,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tags: ['Privacy', 'GDPR', 'Compliance']
        },
        {
            id: 6,
            title: 'Term Sheet Template',
            description: 'Investment term sheet for seed funding rounds.',
            category: 'funding',
            stage: 'seed',
            industry: 'all',
            fileType: 'DOCX',
            pages: 5,
            downloads: 876,
            popular: false,
            image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tags: ['Investment', 'Funding', 'Term Sheet']
        },
        {
            id: 7,
            title: 'Shareholders Agreement',
            description: 'Agreement governing relationships between shareholders.',
            category: 'business',
            stage: 'growth',
            industry: 'all',
            fileType: 'DOCX',
            pages: 15,
            downloads: 654,
            popular: false,
            image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tags: ['Shareholders', 'Corporate', 'Agreement']
        },
        {
            id: 8,
            title: 'Software License Agreement',
            description: 'License agreement for software products and services.',
            category: 'ip',
            stage: 'startup',
            industry: 'tech',
            fileType: 'DOCX',
            pages: 8,
            downloads: 1432,
            popular: true,
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tags: ['Software', 'License', 'IP']
        },
        {
            id: 9,
            title: 'Website Terms of Service',
            description: 'Comprehensive terms of service for websites and online platforms.',
            category: 'terms',
            stage: 'startup',
            industry: 'ecommerce',
            fileType: 'HTML',
            pages: 7,
            downloads: 1987,
            popular: false,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tags: ['Terms', 'Website', 'Legal']
        }
    ];
    
    // Initial render
    renderTemplatesGrid(templatesData.slice(0, itemsPerPage));
    setupPagination();
}

function renderTemplatesGrid(data) {
    const grid = document.getElementById('templatesGrid');
    if (!grid) return;
    
    // Clear loading state
    const loading = document.getElementById('loadingTemplates');
    if (loading) loading.style.display = 'none';
    
    // Clear grid
    grid.innerHTML = '';
    
    // Create cards
    data.forEach(item => {
        const card = createTemplateCard(item);
        grid.appendChild(card);
    });
    
    // Add animation
    const cards = grid.querySelectorAll('.template-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fade-up');
    });
}

function createTemplateCard(item) {
    const card = document.createElement('div');
    card.className = `template-card card-hover ${item.popular ? 'popular' : ''}`;
    
    card.innerHTML = `
        <div class="template-header">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="template-overlay"></div>
            <div class="template-category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</div>
            ${item.popular ? '<div class="popular-badge">Most Popular</div>' : ''}
        </div>
        
        <div class="template-content">
            <h3 class="template-title">${item.title}</h3>
            <p class="template-description">${item.description}</p>
            
            <div class="template-meta">
                <div class="meta-item">
                    <i class="fas fa-file-alt"></i>
                    <span>${item.fileType}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-file"></i>
                    <span>${item.pages} pages</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-download"></i>
                    <span>${item.downloads.toLocaleString()} downloads</span>
                </div>
            </div>
            
            <div class="template-tags">
                ${item.tags.map(tag => `<span class="template-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="template-actions">
                <button class="btn btn-small btn-primary download-template" data-id="${item.id}">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="btn btn-small btn-outline preview-template" data-id="${item.id}">
                    <i class="fas fa-eye"></i> Preview
                </button>
                <button class="btn btn-small btn-outline save-template" data-id="${item.id}">
                    <i class="fas fa-bookmark"></i> Save
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    card.querySelector('.download-template').addEventListener('click', () => downloadTemplate(item.id));
    card.querySelector('.preview-template').addEventListener('click', () => previewTemplate(item.id));
    card.querySelector('.save-template').addEventListener('click', () => saveTemplate(item.id));
    
    return card;
}

// Filters
function initFilters() {
    const searchInput = document.getElementById('templateSearch');
    const categoryFilter = document.getElementById('templateCategory');
    const stageFilter = document.getElementById('templateStage');
    const industryFilter = document.getElementById('templateIndustry');
    const filterBtn = document.querySelector('.btn-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (stageFilter) {
        stageFilter.addEventListener('change', applyFilters);
    }
    
    if (industryFilter) {
        industryFilter.addEventListener('change', applyFilters);
    }
    
    if (filterBtn) {
        filterBtn.addEventListener('click', applyFilters);
    }
}

function applyFilters() {
    const searchTerm = document.getElementById('templateSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('templateCategory').value;
    const stageFilter = document.getElementById('templateStage').value;
    const industryFilter = document.getElementById('templateIndustry').value;
    
    const filtered = templatesData.filter(item => {
        // Search filter
        const matchesSearch = !searchTerm || 
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        // Category filter
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        
        // Stage filter
        const matchesStage = !stageFilter || item.stage === stageFilter || item.stage === 'all';
        
        // Industry filter
        const matchesIndustry = !industryFilter || item.industry === industryFilter || item.industry === 'all';
        
        return matchesSearch && matchesCategory && matchesStage && matchesIndustry;
    });
    
    currentPage = 1;
    renderTemplatesGrid(filtered.slice(0, itemsPerPage));
    updatePagination(filtered.length);
}

// Pagination
function setupPagination() {
    const prevBtn = document.getElementById('prevTemplatesPage');
    const nextBtn = document.getElementById('nextTemplatesPage');
    const pageNumbers = document.getElementById('templatesPageNumbers');
    
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
            const totalPages = Math.ceil(templatesData.length / itemsPerPage);
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
    
    updatePagination(templatesData.length);
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const prevBtn = document.getElementById('prevTemplatesPage');
    const nextBtn = document.getElementById('nextTemplatesPage');
    const pageNumbers = document.getElementById('templatesPageNumbers');
    
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
    renderTemplatesGrid(templatesData.slice(start, end));
    updatePagination(templatesData.length);
    
    // Scroll to grid
    const grid = document.getElementById('templatesGrid');
    if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Compliance Tabs
function initComplianceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding pane
            tabPanes.forEach(pane => {
                pane.style.display = 'none';
                pane.classList.remove('active');
            });
            
            const activePane = document.getElementById(`${tabId}-tab`);
            if (activePane) {
                activePane.style.display = 'block';
                setTimeout(() => {
                    activePane.classList.add('active');
                }, 10);
            }
            
            // Load tab content if not loaded
            loadTabContent(tabId);
        });
    });
}

function loadTabContent(tabId) {
    const tabContent = {
        'business': `
            <div class="pane-header">
                <h3>Business Registration Process</h3>
                <p>Complete guide to registering your business in Tanzania</p>
            </div>
            
            <div class="process-timeline">
                <div class="process-step">
                    <div class="step-marker">
                        <div class="step-number">1</div>
                        <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                        <h4>Business Name Registration</h4>
                        <p>Register your business name with BRELA (Business Registrations and Licensing Agency)</p>
                        <div class="step-details">
                            <div class="detail-item">
                                <i class="fas fa-clock"></i>
                                <span>Processing Time: 3-5 business days</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-money-bill"></i>
                                <span>Cost: TZS 50,000</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-file-alt"></i>
                                <span>Required: 3 preferred names</span>
                            </div>
                        </div>
                        <a href="#" class="btn btn-small btn-primary">
                            <i class="fas fa-external-link-alt"></i> Start Registration
                        </a>
                    </div>
                </div>
                
                <div class="process-step">
                    <div class="step-marker">
                        <div class="step-number">2</div>
                        <div class="step-line"></div>
                    </div>
                    <div class="step-content">
                        <h4>Business License Application</h4>
                        <p>Apply for appropriate business license based on your industry and location</p>
                        <div class="step-details">
                            <div class="detail-item">
                                <i class="fas fa-clock"></i>
                                <span>Processing Time: 7-14 days</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-money-bill"></i>
                                <span>Cost: Varies by industry</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-file-alt"></i>
                                <span>Required: Business plan, premises details</span>
                            </div>
                        </div>
                        <a href="#" class="btn btn-small btn-primary">
                            <i class="fas fa-external-link-alt"></i> Check Requirements
                        </a>
                    </div>
                </div>
            </div>
        `,
        'tax': `
            <div class="pane-header">
                <h3>Tax Compliance Requirements</h3>
                <p>Understanding your tax obligations in Tanzania</p>
            </div>
            
            <div class="tax-overview">
                <div class="tax-cards">
                    <div class="tax-card">
                        <div class="tax-icon">
                            <i class="fas fa-id-card"></i>
                        </div>
                        <h4>TIN Registration</h4>
                        <p>Taxpayer Identification Number registration with TRA</p>
                        <a href="#" class="btn-link">Register Online</a>
                    </div>
                    
                    <div class="tax-card">
                        <div class="tax-icon">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <h4>VAT Registration</h4>
                        <p>Required for businesses with annual turnover above TZS 100M</p>
                        <a href="#" class="btn-link">Check Eligibility</a>
                    </div>
                </div>
            </div>
        `,
        'labor': `
            <div class="pane-header">
                <h3>Employment Law Compliance</h3>
                <p>Requirements for hiring and managing employees in Tanzania</p>
            </div>
            
            <div class="labor-requirements">
                <h4>Key Requirements:</h4>
                <ul>
                    <li>Written employment contracts for all employees</li>
                    <li>Registration with Social Security Regulatory Authority (SSRA)</li>
                    <li>Compliance with minimum wage regulations</li>
                    <li>Workplace health and safety standards</li>
                    <li>Annual leave and public holiday entitlements</li>
                </ul>
            </div>
        `,
        'sector': `
            <div class="pane-header">
                <h3>Sector-Specific Regulations</h3>
                <p>Industry-specific compliance requirements in Tanzania</p>
            </div>
            
            <div class="sector-selector">
                <select class="styled-select">
                    <option value="">Select your industry</option>
                    <option value="technology">Technology & IT Services</option>
                    <option value="agriculture">Agriculture & Agribusiness</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="healthcare">Healthcare Services</option>
                    <option value="education">Education & Training</option>
                    <option value="tourism">Tourism & Hospitality</option>
                </select>
            </div>
        `
    };
    
    const pane = document.getElementById(`${tabId}-tab`);
    if (pane && tabContent[tabId]) {
        pane.innerHTML = tabContent[tabId];
    }
}

// FAQ System
function initFAQ() {
    const faqData = [
        {
            id: 1,
            question: 'How do I protect my business idea before launching?',
            answer: `
                <p>To protect your business idea before launching:</p>
                <ol>
                    <li><strong>Use Non-Disclosure Agreements (NDAs):</strong> Always have potential partners, employees, and investors sign NDAs before discussing sensitive information.</li>
                    <li><strong>Document Everything:</strong> Keep detailed records of your idea development with dates, including sketches, notes, and prototypes.</li>
                    <li><strong>File Provisional Patents:</strong> For inventions, consider filing provisional patent applications to establish priority dates.</li>
                    <li><strong>Trademark Search:</strong> Conduct a trademark search before finalizing your business name and logo.</li>
                    <li><strong>Trade Secret Protection:</strong> Implement confidentiality protocols for sensitive business information.</li>
                </ol>
                <p>Our legal team can help you develop a comprehensive IP protection strategy tailored to your specific business.</p>
            `,
            category: 'ip',
            views: 1245
        },
        {
            id: 2,
            question: "What's the difference between sole proprietorship and LLC?",
            answer: `
                <p>The main differences between a sole proprietorship and a Limited Liability Company (LLC):</p>
                <table>
                    <thead>
                        <tr>
                            <th>Aspect</th>
                            <th>Sole Proprietorship</th>
                            <th>LLC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Liability Protection</strong></td>
                            <td>Owner is personally liable for business debts and lawsuits</td>
                            <td>Members have limited personal liability</td>
                        </tr>
                        <tr>
                            <td><strong>Taxation</strong></td>
                            <td>Business income reported on personal tax returns</td>
                            <td>Flexible taxation (can choose pass-through or corporate)</td>
                        </tr>
                        <tr>
                            <td><strong>Registration</strong></td>
                            <td>Minimal formal registration required</td>
                            <td>Must file Articles of Organization with BRELA</td>
                        </tr>
                        <tr>
                            <td><strong>Management</strong></td>
                            <td>Owner makes all decisions</td>
                            <td>Can be member-managed or manager-managed</td>
                        </tr>
                        <tr>
                            <td><strong>Credibility</strong></td>
                            <td>Less formal, may affect investor perception</td>
                            <td>More credible for investors and partners</td>
                        </tr>
                    </tbody>
                </table>
                <p>The best choice depends on your business size, risk factors, and growth plans.</p>
            `,
            category: 'business',
            views: 987
        },
        {
            id: 3,
            question: 'How do I register a trademark in Tanzania?',
            answer: `
                <p>The trademark registration process in Tanzania involves these steps:</p>
                <div class="process-steps">
                    <div class="process-step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Trademark Search</h4>
                            <p>Conduct a search in the BRELA database to ensure your mark is available.</p>
                        </div>
                    </div>
                    <div class="process-step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Application Filing</h4>
                            <p>Submit trademark application with BRELA along with required documents and fees.</p>
                        </div>
                    </div>
                    <div class="process-step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Examination</h4>
                            <p>BRELA examines the application for compliance with trademark laws.</p>
                        </div>
                    </div>
                    <div class="process-step">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Publication</h4>
                            <p>If approved, the mark is published in the Trademark Journal for opposition.</p>
                        </div>
                    </div>
                    <div class="process-step">
                        <div class="step-number">5</div>
                        <div class="step-content">
                            <h4>Registration</h4>
                            <p>If no opposition, the trademark is registered for 10 years (renewable).</p>
                        </div>
                    </div>
                </div>
                <p>The entire process typically takes 12-18 months. We can help expedite this process.</p>
            `,
            category: 'ip',
            views: 765
        },
        {
            id: 4,
            question: 'What are the tax obligations for startups in Tanzania?',
            answer: `
                <p>Startups in Tanzania have several tax obligations:</p>
                <div class="tax-obligations">
                    <div class="obligation">
                        <h4><i class="fas fa-id-card"></i> TIN Registration</h4>
                        <p>All businesses must register for a Taxpayer Identification Number (TIN) within 30 days of commencement.</p>
                    </div>
                    <div class="obligation">
                        <h4><i class="fas fa-percentage"></i> Income Tax</h4>
                        <p>Corporate tax rate is 30% for resident companies. Small businesses may qualify for presumptive tax.</p>
                    </div>
                    <div class="obligation">
                        <h4><i class="fas fa-receipt"></i> VAT Registration</h4>
                        <p>Mandatory for businesses with annual turnover exceeding TZS 100 million.</p>
                    </div>
                    <div class="obligation">
                        <h4><i class="fas fa-users"></i> PAYE</h4>
                        <p>Pay As You Earn tax for employees must be deducted and remitted monthly.</p>
                    </div>
                    <div class="obligation">
                        <h4><i class="fas fa-file-invoice"></i> Withholding Tax</h4>
                        <p>Applies to payments for services, rent, and certain other transactions.</p>
                    </div>
                </div>
                <p>We recommend consulting with a tax expert to ensure full compliance.</p>
            `,
            category: 'tax',
            views: 543
        }
    ];
    
    const faqAccordion = document.querySelector('.faq-accordion');
    if (!faqAccordion) return;
    
    // Create FAQ items
    faqData.forEach(item => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.setAttribute('data-category', item.category);
        faqItem.setAttribute('data-id', item.id);
        
        faqItem.innerHTML = `
            <button class="faq-question">
                ${item.question}
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="faq-answer">
                ${item.answer}
                <div class="faq-footer">
                    <span class="views"><i class="fas fa-eye"></i> ${item.views} views</span>
                    <button class="btn-link helpful-btn" data-id="${item.id}">
                        <i class="far fa-thumbs-up"></i> Helpful?
                    </button>
                    <button class="btn-link share-faq" data-id="${item.id}">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>
            </div>
        `;
        
        faqAccordion.appendChild(faqItem);
    });
    
    // Initialize accordion functionality
    initAccordion();
    
    // Initialize FAQ filtering
    initFAQFiltering();
    
    // Initialize FAQ search
    initFAQSearch();
}

function initAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

function initFAQFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter FAQ items
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function initFAQSearch() {
    const searchInput = document.querySelector('.faq-search input');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// IP Assessment
function initIPAssessment() {
    const nextStepBtn = document.getElementById('nextStep');
    const prevStepBtn = document.getElementById('prevStep');
    const assessmentOptions = document.querySelectorAll('.assessment-option input');
    
    let currentStep = 1;
    const totalSteps = 4;
    const assessmentData = {};
    
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                updateAssessmentStep();
            } else {
                completeAssessment();
            }
        });
    }
    
    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateAssessmentStep();
            }
        });
    }
    
    assessmentOptions.forEach(option => {
        option.addEventListener('change', () => {
            const stepId = option.closest('.form-step').id;
            assessmentData[stepId] = option.value;
        });
    });
    
    function updateAssessmentStep() {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.style.display = 'none';
        });
        
        // Show current step
        const currentStepElement = document.getElementById(`step${currentStep}`);
        if (currentStepElement) {
            currentStepElement.style.display = 'block';
        }
        
        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            const progress = (currentStep / totalSteps) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        // Update step indicator
        const stepIndicator = document.querySelector('.assessment-progress span');
        if (stepIndicator) {
            stepIndicator.textContent = `Step ${currentStep} of ${totalSteps}`;
        }
        
        // Update button states
        if (prevStepBtn) {
            prevStepBtn.disabled = currentStep === 1;
        }
        
        if (nextStepBtn) {
            nextStepBtn.textContent = currentStep === totalSteps ? 'Get Results' : 'Next';
        }
    }
    
    function completeAssessment() {
        // Generate assessment results based on data
        const results = generateAssessmentResults(assessmentData);
        
        // Show results in preview
        const previewResult = document.querySelector('.preview-result');
        if (previewResult) {
            previewResult.innerHTML = `
                <h4>Your IP Protection Plan:</h4>
                ${results.map(result => `
                    <div class="result-item">
                        <i class="fas ${result.icon}"></i>
                        <div>
                            <strong>${result.type}</strong>
                            <span>${result.description}</span>
                        </div>
                    </div>
                `).join('')}
                <div class="result-actions">
                    <button class="btn btn-primary" id="downloadPlan">
                        <i class="fas fa-download"></i> Download Plan
                    </button>
                    <button class="btn btn-outline" id="consultExpert">
                        <i class="fas fa-user-tie"></i> Consult Expert
                    </button>
                </div>
            `;
            
            // Scroll to results
            previewResult.scrollIntoView({ behavior: 'smooth' });
            
            // Add event listeners to new buttons
            document.getElementById('downloadPlan')?.addEventListener('click', downloadIPPlan);
            document.getElementById('consultExpert')?.addEventListener('click', () => {
                showConsultationModal('ip-protection');
            });
        }
        
        // Show success message
        showToast('Assessment completed! Your IP protection plan is ready.', 'success');
    }
    
    function generateAssessmentResults(data) {
        // This would be more complex in a real application
        return [
            {
                type: 'Trademark',
                description: 'Protect your brand name and logo',
                icon: 'fa-trademark'
            },
            {
                type: 'Copyright',
                description: 'Secure your creative works',
                icon: 'fa-copyright'
            },
            {
                type: 'NDA Templates',
                description: 'For confidential discussions',
                icon: 'fa-file-contract'
            }
        ];
    }
    
    // Initialize first step
    updateAssessmentStep();
}

function downloadIPPlan() {
    // Simulate download
    showToast('IP Protection Plan downloaded successfully!', 'success');
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('legalContactForm');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const bookConsultationBtn = document.getElementById('bookConsultation');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', () => {
            charCount.textContent = messageTextarea.value.length;
        });
    }
    
    if (bookConsultationBtn) {
        bookConsultationBtn.addEventListener('click', () => {
            showConsultationModal('general');
        });
    }
    
    // File upload preview
    const fileUpload = document.querySelector('.file-upload input[type="file"]');
    if (fileUpload) {
        fileUpload.addEventListener('change', handleFileUpload);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Basic validation
    const requiredFields = ['name', 'email', 'legalArea', 'message'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = form.querySelector(`[name="${field}"]`);
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    if (!isValid) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Success simulation
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success modal
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        
        // Reset form
        form.reset();
        
        // Reset character counter
        const charCount = document.getElementById('charCount');
        if (charCount) {
            charCount.textContent = '0';
        }
        
        // Clear file preview
        const uploadArea = document.querySelector('.upload-area');
        if (uploadArea) {
            uploadArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt"></i>
                <span>Drop files here or click to upload</span>
                <small>Max file size: 10MB each (PDF, DOC, JPG, PNG)</small>
            `;
        }
        
        // Track submission
        trackContactSubmission(formData);
        
    }, 1500);
}

function handleFileUpload(e) {
    const files = e.target.files;
    const uploadArea = document.querySelector('.upload-area');
    
    if (!uploadArea || files.length === 0) return;
    
    const fileList = Array.from(files).map(file => `
        <div class="file-item">
            <i class="fas fa-file"></i>
            <div>
                <strong>${file.name}</strong>
                <span>${formatFileSize(file.size)}</span>
            </div>
        </div>
    `).join('');
    
    uploadArea.innerHTML = fileList;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function trackContactSubmission(formData) {
    // In a real application, this would send data to analytics
    console.log('Contact form submitted:', Object.fromEntries(formData));
}

// Template Actions
function downloadTemplate(templateId) {
    const template = templatesData.find(t => t.id === templateId);
    if (!template) return;
    
    // Simulate download
    showToast(`Downloading "${template.title}"...`, 'info');
    
    setTimeout(() => {
        showToast(`"${template.title}" downloaded successfully!`, 'success');
        
        // Track download
        trackTemplateDownload(templateId);
    }, 1000);
}

function previewTemplate(templateId) {
    const template = templatesData.find(t => t.id === templateId);
    if (!template) return;
    
    const modalContent = document.getElementById('templatePreviewContent');
    if (modalContent && template.preview) {
        modalContent.innerHTML = template.preview;
        
        // Add event listeners for buttons in preview
        modalContent.querySelector('.download-template')?.addEventListener('click', () => {
            closeModal('templatePreviewModal');
            setTimeout(() => downloadTemplate(templateId), 300);
        });
        
        modalContent.querySelector('.close-preview')?.addEventListener('click', () => {
            closeModal('templatePreviewModal');
        });
    }
    
    const modal = document.getElementById('templatePreviewModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Track preview
    trackTemplatePreview(templateId);
}

function saveTemplate(templateId) {
    const template = templatesData.find(t => t.id === templateId);
    if (!template) return;
    
    // Get saved templates from localStorage
    let savedTemplates = JSON.parse(localStorage.getItem('savedTemplates') || '[]');
    
    // Check if already saved
    if (!savedTemplates.includes(templateId)) {
        savedTemplates.push(templateId);
        localStorage.setItem('savedTemplates', JSON.stringify(savedTemplates));
        
        showToast(`"${template.title}" saved to your library`, 'success');
    } else {
        showToast(`"${template.title}" is already in your library`, 'info');
    }
}

function trackTemplateDownload(templateId) {
    // In a real application, this would send data to analytics
    console.log('Template downloaded:', templateId);
}

function trackTemplatePreview(templateId) {
    // In a real application, this would send data to analytics
    console.log('Template previewed:', templateId);
}

// Consultation Modal
function showConsultationModal(type) {
    const modalContent = document.getElementById('consultationContent');
    if (!modalContent) return;
    
    let content = '';
    
    switch(type) {
        case 'ip-protection':
            content = `
                <div class="consultation-form">
                    <h3><i class="fas fa-shield-alt"></i> IP Protection Consultation</h3>
                    <p>Schedule a consultation with our intellectual property experts.</p>
                    
                    <div class="expert-selection">
                        <h4>Select Expert Type:</h4>
                        <div class="expert-options">
                            <label class="expert-option">
                                <input type="radio" name="expertType" value="trademark" checked>
                                <div class="option-content">
                                    <i class="fas fa-trademark"></i>
                                    <span>Trademark Specialist</span>
                                    <small>For brand protection</small>
                                </div>
                            </label>
                            <label class="expert-option">
                                <input type="radio" name="expertType" value="patent">
                                <div class="option-content">
                                    <i class="fas fa-lightbulb"></i>
                                    <span>Patent Attorney</span>
                                    <small>For inventions & innovations</small>
                                </div>
                            </label>
                            <label class="expert-option">
                                <input type="radio" name="expertType" value="copyright">
                                <div class="option-content">
                                    <i class="fas fa-copyright"></i>
                                    <span>Copyright Expert</span>
                                    <small>For creative works</small>
                                </div>
                            </label>
                        </div>
                    </div>
                    
                    <div class="consultation-actions">
                        <button class="btn btn-primary" id="scheduleIPConsultation">
                            <i class="fas fa-calendar-check"></i> Schedule Consultation
                        </button>
                        <button class="btn btn-outline close-modal-btn">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    </div>
                </div>
            `;
            break;
            
        default:
            content = `
                <div class="consultation-form">
                    <h3><i class="fas fa-user-tie"></i> General Legal Consultation</h3>
                    <p>Book a consultation with our legal experts for comprehensive advice.</p>
                    
                    <div class="form-group">
                        <label for="consultationDate">Preferred Date</label>
                        <input type="date" id="consultationDate" min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    
                    <div class="form-group">
                        <label for="consultationTime">Preferred Time</label>
                        <select id="consultationTime">
                            <option value="9:00">9:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="consultationTopic">Consultation Topic</label>
                        <textarea id="consultationTopic" rows="3" placeholder="Briefly describe what you'd like to discuss..."></textarea>
                    </div>
                    
                    <div class="consultation-actions">
                        <button class="btn btn-primary" id="confirmConsultation">
                            <i class="fas fa-calendar-plus"></i> Confirm Booking
                        </button>
                        <button class="btn btn-outline close-modal-btn">
                            <i class="fas fa-times"></i> Cancel
                        </button>
                    </div>
                </div>
            `;
    }
    
    modalContent.innerHTML = content;
    
    // Add event listeners
    modalContent.querySelector('#scheduleIPConsultation')?.addEventListener('click', scheduleIPConsultation);
    modalContent.querySelector('#confirmConsultation')?.addEventListener('click', confirmConsultation);
    modalContent.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal('consultationModal');
        });
    });
    
    const modal = document.getElementById('consultationModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function scheduleIPConsultation() {
    const expertType = document.querySelector('input[name="expertType"]:checked')?.value;
    
    if (!expertType) {
        showToast('Please select an expert type', 'error');
        return;
    }
    
    showToast(`Scheduling ${expertType} consultation...`, 'info');
    
    setTimeout(() => {
        closeModal('consultationModal');
        showToast('Consultation scheduled successfully! Our team will contact you within 24 hours.', 'success');
    }, 1500);
}

function confirmConsultation() {
    const date = document.getElementById('consultationDate')?.value;
    const time = document.getElementById('consultationTime')?.value;
    const topic = document.getElementById('consultationTopic')?.value;
    
    if (!date || !time || !topic.trim()) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    showToast('Confirming your consultation...', 'info');
    
    setTimeout(() => {
        closeModal('consultationModal');
        showToast('Consultation confirmed! You will receive a confirmation email shortly.', 'success');
    }, 1500);
}

// Modals
function initModals() {
    // Close buttons
    document.querySelectorAll('.modal-close, .btn-close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.consultation-modal, .template-modal, .success-modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close on outside click
    document.querySelectorAll('.consultation-modal, .template-modal, .success-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function closeAllModals() {
    document.querySelectorAll('.consultation-modal, .template-modal, .success-modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = '';
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
    .error {
        border-color: #EF4444 !important;
    }
    
    .template-preview {
        padding: 2rem;
    }
    
    .template-preview h2 {
        color: var(--primary-navy);
        margin-bottom: 1.5rem;
        font-family: 'Source Serif Pro', serif;
    }
    
    .template-info {
        display: flex;
        gap: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 2px solid #E5E7EB;
    }
    
    .info-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #6B7280;
    }
    
    .info-item i {
        color: var(--accent-teal);
    }
    
    .template-sections {
        margin-bottom: 2rem;
    }
    
    .template-sections h3 {
        color: var(--primary-navy);
        margin-bottom: 1rem;
    }
    
    .template-sections ul {
        list-style: none;
        padding-left: 0;
    }
    
    .template-sections li {
        padding: 0.5rem 0;
        color: #6B7280;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .template-sections li:before {
        content: '✓';
        color: var(--success-emerald);
        font-weight: bold;
    }
    
    .template-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .consultation-form {
        padding: 2rem;
    }
    
    .consultation-form h3 {
        color: var(--primary-navy);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .consultation-form p {
        color: #6B7280;
        margin-bottom: 2rem;
    }
    
    .expert-selection {
        margin-bottom: 2rem;
    }
    
    .expert-selection h4 {
        color: var(--primary-navy);
        margin-bottom: 1rem;
    }
    
    .expert-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .expert-option {
        position: relative;
        cursor: pointer;
    }
    
    .expert-option input {
        display: none;
    }
    
    .expert-option input:checked + .option-content {
        border-color: var(--accent-teal);
        background: rgba(13, 148, 136, 0.05);
    }
    
    .option-content {
        background: #F9FAFB;
        border: 2px solid #E5E7EB;
        border-radius: 10px;
        padding: 1.5rem;
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .option-content i {
        font-size: 2rem;
        color: var(--accent-teal);
        margin-bottom: 1rem;
    }
    
    .option-content span {
        display: block;
        font-weight: 600;
        color: var(--primary-navy);
        margin-bottom: 0.25rem;
    }
    
    .option-content small {
        color: #6B7280;
        font-size: 0.875rem;
    }
    
    .consultation-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .faq-footer {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid #E5E7EB;
        font-size: 0.875rem;
    }
    
    .views {
        color: #6B7280;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
    .btn-link {
        background: none;
        border: none;
        color: var(--accent-teal);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        padding: 0;
    }
    
    .btn-link:hover {
        text-decoration: underline;
    }
    
    .tax-obligations {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .obligation {
        background: #F9FAFB;
        border-radius: 10px;
        padding: 1.5rem;
        border-left: 4px solid var(--accent-teal);
    }
    
    .obligation h4 {
        color: var(--primary-navy);
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .obligation p {
        color: #6B7280;
        margin: 0;
    }
    
    .labor-requirements ul {
        list-style: none;
        padding-left: 0;
    }
    
    .labor-requirements li {
        padding: 0.5rem 0;
        color: #6B7280;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .labor-requirements li:before {
        content: '•';
        color: var(--accent-teal);
        font-weight: bold;
    }
    
    .sector-selector {
        margin-top: 2rem;
    }
    
    .tax-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
    }
    
    .tax-card {
        background: #F9FAFB;
        border-radius: 10px;
        padding: 1.5rem;
        text-align: center;
    }
    
    .tax-icon {
        width: 60px;
        height: 60px;
        background: rgba(13, 148, 136, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: var(--accent-teal);
        margin: 0 auto 1rem;
    }
    
    .tax-card h4 {
        color: var(--primary-navy);
        margin-bottom: 0.5rem;
    }
    
    .tax-card p {
        color: #6B7280;
        margin-bottom: 1rem;
        font-size: 0.875rem;
    }
    
    .file-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        background: white;
        border-radius: 8px;
        border: 1px solid #E5E7EB;
        margin-bottom: 0.5rem;
    }
    
    .file-item i {
        font-size: 1.25rem;
        color: var(--accent-teal);
    }
    
    .file-item div {
        flex: 1;
    }
    
    .file-item strong {
        display: block;
        color: var(--primary-navy);
        font-size: 0.875rem;
    }
    
    .file-item span {
        color: #6B7280;
        font-size: 0.75rem;
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
        border-left: 4px solid var(--success-emerald);
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
        color: var(--success-emerald);
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
    
    @media (max-width: 768px) {
        .template-info {
            flex-direction: column;
            gap: 1rem;
        }
        
        .template-actions {
            flex-direction: column;
        }
        
        .consultation-actions {
            flex-direction: column;
        }
        
        .expert-options {
            grid-template-columns: 1fr;
        }
        
        .faq-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .tax-cards {
            grid-template-columns: 1fr;
        }
    }
`;

document.head.appendChild(dynamicStyles);

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltipText = e.target.getAttribute('data-tooltip');
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.zIndex = '9999';
    
    e.target._tooltip = tooltip;
}

function hideTooltip(e) {
    if (e.target._tooltip) {
        e.target._tooltip.remove();
        e.target._tooltip = null;
    }
}

// Initialize on load
initTooltips();