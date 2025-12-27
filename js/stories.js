// Premium Success Stories JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initHeroParallax();
    initStoriesGrid();
    initFilters();
    initTestimonialSlider();
    initMetricsAnimation();
    initModals();
    initMobileMenu();
    
    // Initialize particles
    if (typeof particlesJS !== 'undefined') {
        initParticles();
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

// Particles Background
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        },
        retina_detect: true
    });
}

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

// Stories Data
let storiesData = [];
let currentPage = 1;
const itemsPerPage = 9;

function initStoriesGrid() {
    // Sample stories data
    storiesData = [
        {
            id: 1,
            title: 'AgriTech Solutions: Feeding 50,000 Farmers',
            excerpt: 'How AI-powered mobile platform increased farmer incomes by 300% across Tanzania.',
            content: `
                <div class="story-detail">
                    <div class="story-header">
                        <h2>AgriTech Solutions: Revolutionizing Tanzanian Agriculture</h2>
                        <div class="story-meta">
                            <span class="category"><i class="fas fa-seedling"></i> AgriTech</span>
                            <span class="date"><i class="far fa-calendar"></i> December 15, 2025</span>
                            <span class="reading"><i class="far fa-clock"></i> 8 min read</span>
                        </div>
                    </div>
                    
                    <div class="story-hero">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                             alt="AgriTech Solutions">
                    </div>
                    
                    <div class="story-body">
                        <div class="intro">
                            <h3>From Campus Project to National Impact</h3>
                            <p>In 2022, three Computer Science students at UDSM identified a critical problem: 
                            smallholder farmers were losing up to 40% of their harvest due to market access issues 
                            and price fluctuations. What started as a final year project turned into a mission to 
                            transform Tanzania's agricultural sector.</p>
                        </div>
                        
                        <div class="challenge-solution">
                            <div class="challenge">
                                <h4><i class="fas fa-exclamation-triangle"></i> The Challenge</h4>
                                <p>Smallholder farmers lacked real-time market information, suffered from post-harvest 
                                losses, and had limited access to fair pricing and financial services.</p>
                            </div>
                            <div class="solution">
                                <h4><i class="fas fa-lightbulb"></i> The Solution</h4>
                                <p>An AI-powered mobile platform that provides market prices, connects farmers with buyers, 
                                offers micro-insurance, and delivers agricultural advisory services via SMS.</p>
                            </div>
                        </div>
                        
                        <div class="journey-timeline">
                            <h3>The Journey Timeline</h3>
                            <div class="timeline">
                                <div class="timeline-item">
                                    <div class="timeline-date">March 2022</div>
                                    <div class="timeline-content">
                                        <h5>Idea Born in University Lab</h5>
                                        <p>Started as final year project after surveying 200+ farmers in Morogoro region.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-date">August 2022</div>
                                    <div class="timeline-content">
                                        <h5>Joined UDSM Incubator</h5>
                                        <p>Received seed funding of 5M TZS and mentorship from agricultural experts.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-date">January 2023</div>
                                    <div class="timeline-content">
                                        <h5>First Pilot Launch</h5>
                                        <p>Launched in Morogoro with 500 farmers. Achieved 150% income increase for early adopters.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-date">June 2023</div>
                                    <div class="timeline-content">
                                        <h5>Series A Funding</h5>
                                        <p>Raised $1.2M from impact investors to scale to 5 regions.</p>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-date">December 2025</div>
                                    <div class="timeline-content">
                                        <h5>National Impact</h5>
                                        <p>Now serving 50,000+ farmers across Tanzania with plans to expand to Kenya and Uganda.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="impact-metrics">
                            <h3>Impact Metrics</h3>
                            <div class="metrics-grid">
                                <div class="metric">
                                    <div class="value">300%</div>
                                    <div class="label">Average Income Increase</div>
                                </div>
                                <div class="metric">
                                    <div class="value">50,000+</div>
                                    <div class="label">Farmers Empowered</div>
                                </div>
                                <div class="metric">
                                    <div class="value">65%</div>
                                    <div class="label">Reduction in Post-harvest Loss</div>
                                </div>
                                <div class="metric">
                                    <div class="value">$1.2M</div>
                                    <div class="label">Funding Raised</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="founder-quote-large">
                            <blockquote>
                                "The UDSM incubator didn't just give us resources; it gave us belief. They saw potential 
                                where others saw just another college project. The mentorship and network access were 
                                game-changers for our growth."
                            </blockquote>
                            <div class="author">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                                     alt="Michael Chengo">
                                <div>
                                    <strong>Michael Chengo</strong>
                                    <span>Co-founder & CEO, AgriTech Solutions</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="next-steps">
                            <h3>What's Next?</h3>
                            <p>AgriTech Solutions is expanding to Kenya and Uganda in 2026, with plans to reach 
                            200,000 farmers across East Africa by 2027. They're also developing blockchain-based 
                            supply chain tracking and carbon credit trading for sustainable farming practices.</p>
                        </div>
                    </div>
                </div>
            `,
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'agritech',
            stage: 'growth',
            year: '2025',
            featured: true,
            author: {
                name: 'Michael Chengo',
                role: 'Co-founder & CEO',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                graduation: 'BSc. Computer Science 2022'
            },
            stats: {
                funding: '$1.2M',
                impact: '50,000+ farmers',
                growth: '300% income increase',
                awards: '12 industry awards'
            },
            readingTime: '8 min read',
            video: 'https://www.youtube.com/embed/9No-FiEInLA'
        },
        {
            id: 2,
            title: 'M-Pawa FinTech: Banking the Unbanked',
            excerpt: 'Mobile banking solution reaching 200,000+ Tanzanians in rural areas.',
            content: 'Detailed story content...',
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'fintech',
            stage: 'series-a',
            year: '2024',
            featured: true,
            author: {
                name: 'Sarah Juma',
                role: 'Founder & CEO',
                image: 'https://femina.wwmindia.com/content/2023/apr/harini-sivakumar-women1682061313.jpg'
            },
            stats: {
                funding: '$800K',
                impact: '200,000+ users',
                growth: '400% user growth',
                awards: 'FinTech Innovation Award'
            },
            readingTime: '6 min read',
            video: 'https://www.youtube.com/embed/5G5pV1-gp2g'
        },
        {
            id: 3,
            title: 'EduTech Africa: Transforming Education',
            excerpt: 'AI-powered learning platform serving 10,000+ students across Africa.',
            content: 'Detailed story content...',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'edtech',
            stage: 'seed',
            year: '2025',
            featured: false,
            author: {
                name: 'Ruhumbika John',
                role: 'Co-founder',
                image: 'https://avatars.githubusercontent.com/u/170117036?v=4'
            },
            stats: {
                funding: '$250K',
                impact: '10,000+ students',
                growth: '200% growth',
                awards: 'Education Innovation Prize'
            },
            readingTime: '5 min read'
        },
        {
            id: 4,
            title: 'MediQuick: Healthcare Access Revolution',
            excerpt: 'Telemedicine platform connecting patients with doctors in under 5 minutes.',
            content: 'Detailed story content...',
            image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'healthtech',
            stage: 'growth',
            year: '2024',
            featured: false,
            author: {
                name: 'Dr. Aisha Hassan',
                role: 'Founder',
                image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
            },
            stats: {
                funding: '$1.5M',
                impact: '100,000+ consultations',
                growth: '150% monthly growth',
                awards: 'HealthTech Excellence Award'
            },
            readingTime: '7 min read'
        },
        {
            id: 5,
            title: 'SolarTech: Powering Rural Tanzania',
            excerpt: 'Affordable solar solutions bringing electricity to 50,000 households.',
            content: 'Detailed story content...',
            image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'greentech',
            stage: 'scaling',
            year: '2023',
            featured: true,
            author: {
                name: 'John Mwangi',
                role: 'CEO',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
            },
            stats: {
                funding: '$2M',
                impact: '50,000 households',
                growth: '300% revenue growth',
                awards: 'Green Innovation Award'
            },
            readingTime: '6 min read'
        },
        {
            id: 6,
            title: 'MarketPlace Tanzania: E-commerce Growth',
            excerpt: 'Local e-commerce platform supporting 5,000+ small businesses.',
            content: 'Detailed story content...',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'ecommerce',
            stage: 'series-a',
            year: '2024',
            featured: false,
            author: {
                name: 'Fatima Ali',
                role: 'Co-founder',
                image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
            },
            stats: {
                funding: '$1M',
                impact: '5,000+ businesses',
                growth: '250% GMV growth',
                awards: 'Digital Commerce Award'
            },
            readingTime: '5 min read'
        },
        {
            id: 7,
            title: 'FarmERP: Agricultural Management SaaS',
            excerpt: 'Enterprise software helping large farms increase yield by 40%.',
            content: 'Detailed story content...',
            image: 'https://img.freepik.com/premium-photo/man-hands-gardening-lettuce-farm-with-growth-process-chemical-formula-green-background-with-vr-icon_1300982-3718.jpg',
            category: 'saas',
            stage: 'growth',
            year: '2025',
            featured: false,
            author: {
                name: 'Robert Kimambo',
                role: 'CTO',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
            },
            stats: {
                funding: '$750K',
                impact: '200+ farms',
                growth: '400% revenue growth',
                awards: 'AgriTech Innovation'
            },
            readingTime: '6 min read'
        },
        {
            id: 8,
            title: 'CleanWater Tech: Portable Filtration',
            excerpt: 'Affordable water filtration reaching 100,000+ people in rural areas.',
            content: 'Detailed story content...',
            image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'greentech',
            stage: 'seed',
            year: '2025',
            featured: false,
            author: {
                name: 'Grace Mushi',
                role: 'Founder',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
            },
            stats: {
                funding: '$300K',
                impact: '100,000+ people',
                growth: '200% distribution growth',
                awards: 'Social Impact Award'
            },
            readingTime: '5 min read'
        },
        {
            id: 9,
            title: 'LogisticsAI: Supply Chain Optimization',
            excerpt: 'AI-powered logistics reducing delivery times by 60% for SMEs.',
            content: 'Detailed story content...',
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'saas',
            stage: 'series-a',
            year: '2024',
            featured: false,
            author: {
                name: 'Ahmed Suleiman',
                role: 'CEO',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
            },
            stats: {
                funding: '$1.8M',
                impact: '500+ businesses',
                growth: '350% revenue growth',
                awards: 'Logistics Innovation'
            },
            readingTime: '7 min read'
        }
    ];
    
    // Initial render
    renderStoriesGrid(storiesData.slice(0, itemsPerPage));
    setupPagination();
    initAlumniGrid();
}

function renderStoriesGrid(data) {
    const grid = document.getElementById('storiesGrid');
    if (!grid) return;
    
    // Clear loading state
    const loading = document.getElementById('loadingStories');
    if (loading) loading.style.display = 'none';
    
    // Clear grid
    grid.innerHTML = '';
    
    // Create cards
    data.forEach(item => {
        const card = createStoryCard(item);
        grid.appendChild(card);
    });
    
    // Add animation
    const cards = grid.querySelectorAll('.story-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fade-up');
    });
}

function createStoryCard(item) {
    const card = document.createElement('div');
    card.className = `story-card card-hover ${item.featured ? 'featured' : ''}`;
    
    // Category colors
    const categoryColors = {
        agritech: '#10B981',
        fintech: '#3B82F6',
        healthtech: '#EF4444',
        edtech: '#8B5CF6',
        greentech: '#10B981',
        ecommerce: '#F59E0B',
        saas: '#6366F1'
    };
    
    // Category icons
    const categoryIcons = {
        agritech: 'fas fa-seedling',
        fintech: 'fas fa-coins',
        healthtech: 'fas fa-heartbeat',
        edtech: 'fas fa-graduation-cap',
        greentech: 'fas fa-leaf',
        ecommerce: 'fas fa-shopping-cart',
        saas: 'fas fa-cloud'
    };
    
    card.innerHTML = `
        <div class="story-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="story-category-badge" style="background: ${categoryColors[item.category] || '#4A5568'}">
                <i class="${categoryIcons[item.category] || 'fas fa-star'}"></i>
                ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </div>
            ${item.featured ? '<div class="featured-label">Featured</div>' : ''}
        </div>
        
        <div class="story-content">
            <div class="story-meta-small">
                <span class="story-date">
                    <i class="far fa-calendar"></i> ${item.year}
                </span>
                <span class="story-reading-time">
                    <i class="far fa-clock"></i> ${item.readingTime}
                </span>
            </div>
            
            <h3 class="story-title-small">${item.title}</h3>
            <p class="story-excerpt-small">${item.excerpt}</p>
            
            <div class="story-author">
                <img src="${item.author.image}" alt="${item.author.name}">
                <div>
                    <strong>${item.author.name}</strong>
                    <span>${item.author.role}</span>
                </div>
            </div>
            
            <div class="story-stats-small">
                <div class="stat-item-small">
                    <div class="stat-value-small">${item.stats.funding}</div>
                    <div class="stat-label-small">Funding</div>
                </div>
                <div class="stat-item-small">
                    <div class="stat-value-small">${item.stats.impact.split('+')[0]}+</div>
                    <div class="stat-label-small">Impact</div>
                </div>
                <div class="stat-item-small">
                    <div class="stat-value-small">${item.stats.awards.split(' ')[0]}</div>
                    <div class="stat-label-small">Awards</div>
                </div>
            </div>
            
            <div class="story-actions-small">
                <button class="btn btn-story btn-primary read-story" data-id="${item.id}">
                    <i class="fas fa-book-open"></i> Read Story
                </button>
                ${item.video ? `
                <button class="btn btn-story btn-outline watch-story" data-video="${item.video}">
                    <i class="fas fa-play-circle"></i> Watch
                </button>
                ` : ''}
                <button class="btn btn-story btn-outline share-story" data-id="${item.id}">
                    <i class="fas fa-share-alt"></i> Share
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    card.querySelector('.read-story').addEventListener('click', () => viewStoryDetails(item.id));
    if (item.video) {
        card.querySelector('.watch-story').addEventListener('click', () => playVideo(item.video));
    }
    card.querySelector('.share-story').addEventListener('click', () => shareStory(item.id));
    
    return card;
}

// Filters
function initFilters() {
    const searchInput = document.getElementById('storySearch');
    const industryFilter = document.getElementById('industryFilter');
    const stageFilter = document.getElementById('stageFilter');
    const yearFilter = document.getElementById('yearFilter');
    const filterBtn = document.querySelector('.btn-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (industryFilter) {
        industryFilter.addEventListener('change', applyFilters);
    }
    
    if (stageFilter) {
        stageFilter.addEventListener('change', applyFilters);
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', applyFilters);
    }
    
    if (filterBtn) {
        filterBtn.addEventListener('click', applyFilters);
    }
    
    // Featured story buttons
    document.querySelector('.read-full-story')?.addEventListener('click', () => {
        viewStoryDetails(1); // AgriTech story
    });
    
    document.querySelector('.watch-video')?.addEventListener('click', () => {
        playVideo('https://www.youtube.com/embed/9No-FiEInLA');
    });
    
    // Play video from featured image
    document.querySelector('.play-video')?.addEventListener('click', function() {
        const videoUrl = this.getAttribute('data-video');
        playVideo(videoUrl);
    });
}

function applyFilters() {
    const searchTerm = document.getElementById('storySearch').value.toLowerCase();
    const industryFilter = document.getElementById('industryFilter').value;
    const stageFilter = document.getElementById('stageFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;
    
    const filtered = storiesData.filter(item => {
        // Search filter
        const matchesSearch = !searchTerm || 
            item.title.toLowerCase().includes(searchTerm) ||
            item.excerpt.toLowerCase().includes(searchTerm) ||
            item.author.name.toLowerCase().includes(searchTerm);
        
        // Industry filter
        const matchesIndustry = !industryFilter || item.category === industryFilter;
        
        // Stage filter
        const matchesStage = !stageFilter || item.stage === stageFilter;
        
        // Year filter
        const matchesYear = !yearFilter || item.year === yearFilter;
        
        return matchesSearch && matchesIndustry && matchesStage && matchesYear;
    });
    
    currentPage = 1;
    renderStoriesGrid(filtered.slice(0, itemsPerPage));
    updatePagination(filtered.length);
}

// Pagination
function setupPagination() {
    const prevBtn = document.getElementById('prevStoriesPage');
    const nextBtn = document.getElementById('nextStoriesPage');
    const pageNumbers = document.getElementById('storiesPageNumbers');
    
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
            const totalPages = Math.ceil(storiesData.length / itemsPerPage);
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
    
    updatePagination(storiesData.length);
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const prevBtn = document.getElementById('prevStoriesPage');
    const nextBtn = document.getElementById('nextStoriesPage');
    const pageNumbers = document.getElementById('storiesPageNumbers');
    
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
    renderStoriesGrid(storiesData.slice(start, end));
    updatePagination(storiesData.length);
    
    // Scroll to grid
    const grid = document.getElementById('storiesGrid');
    if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonialData = [
        {
            quote: "The UDSM incubator transformed my student project into a real business. The mentorship and network access were invaluable.",
            author: "Michael Chengo",
            role: "CEO, AgriTech Solutions",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            quote: "As a female founder, I found incredible support and resources. The incubator believed in my vision when others didn't.",
            author: "Sarah Juma",
            role: "Founder, M-Pawa FinTech",
            image: "https://femina.wwmindia.com/content/2023/apr/harini-sivakumar-women1682061313.jpg"
        },
        {
            quote: "The investor connections through UDSM helped us raise $1.5M. This wouldn't have been possible without their guidance.",
            author: "Dr. Aisha Hassan",
            role: "Founder, MediQuick",
            image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        },
        {
            quote: "From ideation to Series A, the incubator was with us every step. The peer community alone is worth joining for.",
            author: "John Mwangi",
            role: "CEO, SolarTech",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
        }
    ];
    
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;
    
    const slidesWrapper = slider.querySelector('.swiper-wrapper');
    slidesWrapper.innerHTML = '';
    
    testimonialData.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="testimonial-card card-hover">
                <div class="testimonial-content">
                    <div class="quote-icon-small">
                        <i class="fas fa-quote-left"></i>
                    </div>
                    <p class="testimonial-text">"${item.quote}"</p>
                    <div class="testimonial-author">
                        <img src="${item.image}" alt="${item.author}">
                        <div>
                            <h4>${item.author}</h4>
                            <p>${item.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        slidesWrapper.appendChild(slide);
    });
    
    // Initialize Swiper
    new Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
}

// Alumni Grid
function initAlumniGrid() {
    const alumniData = [
        {
            name: "Sarah Juma",
            role: "Founder & CEO, M-Pawa FinTech",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            graduation: "MBA 2021",
            stats: "200,000+ users served",
            featured: true
        },
        {
            name: "Ruhumbika John",
            role: "Co-founder, EduTech Africa",
            image: "https://avatars.githubusercontent.com/u/170117036?v=4",
            graduation: "BSc. in Business information System 2020",
            stats: "10,000+ students impacted",
            featured: false
        },
        {
            name: "Fatima Ali",
            role: "Co-founder, MarketPlace Tanzania",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            graduation: "BCom 2022",
            stats: "5,000+ businesses supported",
            featured: false
        },
        {
            name: "Robert Kimambo",
            role: "CTO, FarmERP",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            graduation: "MSc. Computer Science 2021",
            stats: "200+ farms optimized",
            featured: false
        }
    ];
    
    const alumniGrid = document.querySelector('.alumni-grid');
    if (!alumniGrid) return;
    
    // Clear existing cards except first one
    const existingCards = alumniGrid.querySelectorAll('.alumni-card:not(:first-child)');
    existingCards.forEach(card => card.remove());
    
    // Add more alumni cards
    alumniData.forEach((alumni, index) => {
        if (index === 0) return; // Skip first since it's in HTML
        
        const card = document.createElement('div');
        card.className = `alumni-card card-hover ${alumni.featured ? 'featured' : ''}`;
        
        card.innerHTML = `
            <div class="alumni-image">
                <img src="${alumni.image}" alt="${alumni.name}" loading="lazy">
                ${alumni.featured ? '<div class="alumni-badge"><i class="fas fa-crown"></i><span>Top Founder</span></div>' : ''}
            </div>
            <div class="alumni-info">
                <h3>${alumni.name}</h3>
                <p class="alumni-role">${alumni.role}</p>
                <div class="alumni-stats">
                    <span><i class="fas fa-graduation-cap"></i> ${alumni.graduation}</span>
                    <span><i class="fas fa-bullseye"></i> ${alumni.stats}</span>
                </div>
                <div class="alumni-links">
                    <a href="#" class="linkedin-link">
                        <i class="fab fa-linkedin"></i> Connect
                    </a>
                    <a href="#" class="story-link">
                        <i class="fas fa-book-open"></i> Full Story
                    </a>
                </div>
            </div>
        `;
        
        alumniGrid.appendChild(card);
    });
}

// Metrics Animation
function initMetricsAnimation() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseFloat(target.getAttribute('data-target'));
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
    
    metricNumbers.forEach(metric => observer.observe(metric));
    
    // Also animate hero stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => observer.observe(stat));
}

// Modals
function initModals() {
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Close on outside click
    document.querySelectorAll('.story-modal, .video-modal, .share-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
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

function viewStoryDetails(storyId) {
    const story = storiesData.find(item => item.id === storyId);
    if (!story) return;
    
    const modalContent = document.getElementById('storyModalContent');
    if (modalContent) {
        modalContent.innerHTML = story.content;
        
        // Add share button
        const shareBtn = document.createElement('div');
        shareBtn.className = 'story-share-actions';
        shareBtn.innerHTML = `
            <button class="btn btn-primary share-story-modal" data-id="${storyId}">
                <i class="fas fa-share-alt"></i> Share This Story
            </button>
            ${story.video ? `
            <button class="btn btn-outline watch-story-modal" data-video="${story.video}">
                <i class="fas fa-play-circle"></i> Watch Documentary
            </button>
            ` : ''}
        `;
        modalContent.querySelector('.story-body').appendChild(shareBtn);
        
        // Add event listeners
        modalContent.querySelector('.share-story-modal')?.addEventListener('click', () => {
            closeAllModals();
            setTimeout(() => shareStory(storyId), 300);
        });
        
        modalContent.querySelector('.watch-story-modal')?.addEventListener('click', () => {
            closeAllModals();
            setTimeout(() => playVideo(story.video), 300);
        });
    }
    
    // Show modal
    const modal = document.getElementById('storyModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function playVideo(videoUrl) {
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
        videoPlayer.src = videoUrl;
    }
    
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function shareStory(storyId) {
    const story = storiesData.find(item => item.id === storyId);
    if (!story) return;
    
    const shareUrl = window.location.origin + window.location.pathname + '?story=' + storyId;
    const shareText = `Check out this inspiring startup story: ${story.title}`;
    
    // Update share options with current URL
    document.querySelectorAll('.share-option').forEach(option => {
        const platform = option.getAttribute('data-platform');
        option.onclick = () => shareOnPlatform(platform, shareUrl, shareText, story.title);
    });
    
    const modal = document.getElementById('shareModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function shareOnPlatform(platform, url, text, title) {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    
    let shareUrl;
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%20${encodedUrl}`;
            window.location.href = shareUrl;
            return;
        case 'copy':
            navigator.clipboard.writeText(url).then(() => {
                showToast('Link copied to clipboard!', 'success');
            });
            closeAllModals();
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
    closeAllModals();
}

function closeAllModals() {
    document.querySelectorAll('.story-modal, .video-modal, .share-modal').forEach(modal => {
        modal.style.display = 'none';
    });
    
    // Stop video
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
        videoPlayer.src = '';
    }
    
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
    .story-detail {
        max-width: 800px;
        margin: 0 auto;
    }
    
    .story-header {
        margin-bottom: 3rem;
        text-align: center;
    }
    
    .story-header h2 {
        color: var(--primary-purple);
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        font-family: 'Playfair Display', serif;
    }
    
    .story-header .story-meta {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
    }
    
    .story-header .category,
    .story-header .date,
    .story-header .reading {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #64748B;
        font-weight: 500;
    }
    
    .story-header .category {
        background: rgba(245, 158, 11, 0.1);
        color: var(--accent-gold);
        padding: 0.5rem 1rem;
        border-radius: 50px;
    }
    
    .story-hero {
        margin-bottom: 3rem;
        border-radius: 20px;
        overflow: hidden;
        height: 400px;
    }
    
    .story-hero img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .story-body {
        color: #4A5568;
        line-height: 1.8;
    }
    
    .story-body h3 {
        color: var(--primary-purple);
        margin: 2.5rem 0 1rem;
        font-size: 1.75rem;
    }
    
    .story-body h4 {
        color: var(--primary-purple);
        margin: 2rem 0 1rem;
        font-size: 1.25rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .story-body p {
        margin-bottom: 1.5rem;
        font-size: 1.125rem;
    }
    
    .challenge-solution {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin: 2.5rem 0;
    }
    
    .challenge, .solution {
        background: #F8FAFC;
        padding: 2rem;
        border-radius: 15px;
        border-left: 4px solid;
    }
    
    .challenge {
        border-left-color: #EF4444;
    }
    
    .solution {
        border-left-color: #10B981;
    }
    
    .journey-timeline {
        margin: 3rem 0;
    }
    
    .journey-timeline .timeline {
        position: relative;
        padding-left: 2rem;
        margin-left: 1rem;
    }
    
    .journey-timeline .timeline::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--accent-gold);
    }
    
    .timeline-item {
        position: relative;
        margin-bottom: 2rem;
        padding-left: 2rem;
    }
    
    .timeline-item::before {
        content: '';
        position: absolute;
        left: -6px;
        top: 0;
        width: 14px;
        height: 14px;
        background: var(--accent-gold);
        border-radius: 50%;
    }
    
    .timeline-date {
        font-weight: 600;
        color: var(--primary-purple);
        margin-bottom: 0.5rem;
    }
    
    .timeline-content h5 {
        color: var(--primary-purple);
        margin-bottom: 0.5rem;
    }
    
    .impact-metrics .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }
    
    .impact-metrics .metric {
        text-align: center;
        padding: 1.5rem;
        background: #F8FAFC;
        border-radius: 15px;
    }
    
    .impact-metrics .value {
        font-size: 2rem;
        font-weight: 800;
        color: var(--primary-purple);
        margin-bottom: 0.5rem;
    }
    
    .impact-metrics .label {
        color: #64748B;
        font-size: 0.875rem;
    }
    
    .founder-quote-large {
        background: #FFF7ED;
        border-left: 4px solid var(--accent-gold);
        padding: 2.5rem;
        border-radius: 15px;
        margin: 3rem 0;
        position: relative;
    }
    
    .founder-quote-large blockquote {
        font-size: 1.25rem;
        color: #4A5568;
        line-height: 1.8;
        margin-bottom: 2rem;
        font-style: italic;
    }
    
    .founder-quote-large .author {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .founder-quote-large .author img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .founder-quote-large .author strong {
        display: block;
        color: var(--primary-purple);
    }
    
    .founder-quote-large .author span {
        color: #64748B;
        font-size: 0.875rem;
    }
    
    .story-share-actions {
        display: flex;
        gap: 1rem;
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid #E2E8F0;
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
        border-left: 4px solid #10B981;
    }
    
    .toast-error {
        border-left: 4px solid #EF4444;
    }
    
    .toast-warning {
        border-left: 4px solid #F59E0B;
    }
    
    .toast-info {
        border-left: 4px solid #0EA5E9;
    }
    
    .toast i {
        font-size: 1.25rem;
    }
    
    .toast-success i {
        color: #10B981;
    }
    
    .toast-error i {
        color: #EF4444;
    }
    
    .toast-warning i {
        color: #F59E0B;
    }
    
    .toast-info i {
        color: #0EA5E9;
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
        .challenge-solution {
            grid-template-columns: 1fr;
        }
        
        .story-header h2 {
            font-size: 2rem;
        }
        
        .story-hero {
            height: 250px;
        }
        
        .story-share-actions {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(dynamicStyles);