/**
 * Investor Filtering and Pagination
 */

function initInvestorFiltering() {
    // DOM elements
    const investorTypeFilter = document.getElementById('investor-type');
    const industrySectorFilter = document.getElementById('industry-sector');
    const investmentRangeFilter = document.getElementById('investment-range');
    const locationFilter = document.getElementById('location');
    const searchInput = document.getElementById('search-investors');
    const investorsContainer = document.getElementById('investors-container');
    const paginationContainer = document.getElementById('pagination');
    
    // Initialize Select2 for multi-select dropdowns
    if (industrySectorFilter) {
        $(industrySectorFilter).select2({
            placeholder: 'Select industries',
            allowClear: true,
            width: '100%'
        });
    }
    
    if (locationFilter) {
        $(locationFilter).select2({
            placeholder: 'Select locations',
            allowClear: true,
            width: '100%'
        });
    }

    // Filter investors based on criteria
    function filterInvestors() {
        const type = investorTypeFilter ? investorTypeFilter.value : 'all';
        const industries = industrySectorFilter ? $(industrySectorFilter).val() || [] : [];
        const range = investmentRangeFilter ? investmentRangeFilter.value : 'all';
        const locations = locationFilter ? $(locationFilter).val() || [] : [];
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        return window.investors.filter(investor => {
            const matchesType = type === 'all' || investor.type === type;
            const matchesIndustry = industries.length === 0 || 
                industries.some(industry => investor.industries.includes(industry));
            
            let matchesRange = true;
            if (range !== 'all') {
                const [min, max] = range.split('-').map(Number);
                if (max) {
                    matchesRange = investor.minInvestment >= min && investor.maxInvestment <= max;
                } else {
                    matchesRange = investor.minInvestment >= min;
                }
            }
            
            const matchesLocation = locations.length === 0 || 
                locations.includes(investor.location);
                
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

    // Render investors with pagination
    function renderInvestors(page = 1, itemsPerPage = 9) {
        const filtered = filterInvestors();
        const start = (page - 1) * itemsPerPage;
        const paginatedInvestors = filtered.slice(start, start + itemsPerPage);
        
        if (investorsContainer) {
            if (filtered.length === 0) {
                investorsContainer.innerHTML = `
                    <div class="col-span-3 text-center py-10">
                        <p class="text-gray-600">No investors found matching your criteria.</p>
                        <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
                                onclick="resetFilters()">
                            Reset Filters
                        </button>
                    </div>`;
                return;
            }
            
            investorsContainer.innerHTML = paginatedInvestors.map(investor => `
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300" 
                     data-aos="fade-up" data-aos-delay="${Math.random() * 100}">
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <img src="${investor.avatar}" alt="${investor.name}" 
                                 class="w-16 h-16 rounded-full object-cover mr-4">
                            <div>
                                <h3 class="text-lg font-semibold">${investor.name}</h3>
                                <p class="text-gray-600">${investor.position} at ${investor.company}</p>
                                <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                                    ${getInvestorTypeLabel(investor.type)}
                                </span>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-3 line-clamp-3">${investor.bio}</p>
                        <div class="flex flex-wrap gap-1 mb-3">
                            ${investor.industries.map(industry => `
                                <span class="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                    ${getIndustryLabel(industry)}
                                </span>`).join('')}
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-medium">
                                $${investor.minInvestment.toLocaleString()} - $${investor.maxInvestment.toLocaleString()}
                            </span>
                            <button onclick="showInvestorModal(${investor.id})" 
                                    class="text-blue-600 hover:text-blue-800 font-medium">
                                View Profile →
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        // Render pagination
        renderPagination(filtered.length, page, itemsPerPage);
    }
    
    // Render pagination controls
    function renderPagination(totalItems, currentPage, itemsPerPage) {
        if (!paginationContainer) return;
        
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        
        let paginationHTML = '<div class="flex justify-center mt-8 space-x-2">';
        
        // Previous button
        paginationHTML += `
            <button onclick="changePage(${currentPage - 1}, ${totalPages})" 
                    class="px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-gray-100 border'}"
                    ${currentPage === 1 ? 'disabled' : ''}>
                &laquo; Prev
            </button>`;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                paginationHTML += `
                    <button onclick="changePage(${i}, ${totalPages})" 
                            class="w-10 h-10 rounded-full ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100 border'}">
                        ${i}
                    </button>`;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                paginationHTML += '<span class="px-2 py-1">...</span>';
            }
        }
        
        // Next button
        paginationHTML += `
            <button onclick="changePage(${currentPage + 1}, ${totalPages})" 
                    class="px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white hover:bg-gray-100 border'}"
                    ${currentPage === totalPages ? 'disabled' : ''}>
                Next &raquo;
            </button>`;
        
        paginationHTML += '</div>';
        paginationContainer.innerHTML = paginationHTML;
    }
    
    // Global functions for pagination
    window.changePage = function(newPage, totalPages) {
        if (newPage < 1 || newPage > totalPages) return;
        renderInvestors(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // Reset all filters
    window.resetFilters = function() {
        if (investorTypeFilter) investorTypeFilter.value = 'all';
        if (industrySectorFilter) $(industrySectorFilter).val(null).trigger('change');
        if (investmentRangeFilter) investmentRangeFilter.value = 'all';
        if (locationFilter) $(locationFilter).val(null).trigger('change');
        if (searchInput) searchInput.value = '';
        
        renderInvestors(1);
    };
    
    // Add event listeners for filter changes
    const filterInputs = [investorTypeFilter, industrySectorFilter, investmentRangeFilter, locationFilter, searchInput];
    filterInputs.forEach(input => {
        if (input) {
            input.addEventListener('change', () => renderInvestors(1));
        }
    });
    
    if (searchInput) {
        // Add debounce for search input
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                renderInvestors(1);
            }, 500);
        });
    }
    
    // Initial render
    renderInvestors(1);
}
