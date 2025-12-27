/**
 * Investor Modal and Utility Functions
 */

// Show investor modal with detailed information
window.showInvestorModal = function(investorId) {
    // In a real app, this would fetch investor data by ID
    const investor = {
        id: 1,
        name: 'John Doe',
        type: 'angel',
        industries: ['technology', 'fintech'],
        location: 'dar',
        minInvestment: 10000,
        maxInvestment: 50000,
        company: 'TechVentures',
        position: 'Managing Partner',
        bio: 'Experienced angel investor with focus on early-stage tech startups. Specializing in AI, blockchain, and SaaS solutions with a proven track record of successful investments.',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        interests: ['AI', 'Blockchain', 'SaaS', 'Fintech', 'Startups'],
        deals: 24,
        successRate: '85%',
        email: 'john@example.com',
        phone: '+255 712 345 678',
        social: {
            linkedin: 'https://linkedin.com/in/johndoe',
            twitter: 'https://twitter.com/johndoe'
        },
        lat: -6.7924,
        lng: 39.2083
    };
    
    // Generate modal HTML
    const modalHTML = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden">
            <div class="md:flex">
                <div class="md:w-1/3 bg-gray-50 p-6 flex flex-col items-center">
                    <img src="${investor.avatar}" alt="${investor.name}" 
                         class="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white shadow">
                    <h3 class="text-xl font-bold">${investor.name}</h3>
                    <p class="text-gray-600 mb-2">${investor.position} at ${investor.company}</p>
                    <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
                        ${getInvestorTypeLabel(investor.type)}
                    </span>
                    
                    <div class="w-full space-y-3 mt-4">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <a href="mailto:${investor.email}" class="text-blue-600 hover:underline">${investor.email}</a>
                        </div>
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <a href="tel:${investor.phone}" class="text-blue-600 hover:underline">${investor.phone}</a>
                        </div>
                        <div class="flex space-x-3 mt-4">
                            ${investor.social.linkedin ? `
                                <a href="${investor.social.linkedin}" target="_blank" class="text-blue-600 hover:text-blue-800">
                                    <span class="sr-only">LinkedIn</span>
                                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>` : ''}
                            ${investor.social.twitter ? `
                                <a href="${investor.social.twitter}" target="_blank" class="text-blue-400 hover:text-blue-600">
                                    <span class="sr-only">Twitter</span>
                                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="md:w-2/3 p-6">
                    <div class="mb-6">
                        <h4 class="text-lg font-semibold mb-2">Investment Focus</h4>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${investor.industries.map(industry => `
                                <span class="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                                    ${getIndustryLabel(industry)}
                                </span>`).join('')}
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p class="text-sm text-gray-600">Investment Range</p>
                                <p class="font-medium">$${investor.minInvestment.toLocaleString()} - $${investor.maxInvestment.toLocaleString()}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">Deals Completed</p>
                                <p class="font-medium">${investor.deals} (${investor.successRate} success rate)</p>
                            </div>
                        </div>
                        
                        <div>
                            <p class="text-sm text-gray-600 mb-1">Areas of Interest</p>
                            <div class="flex flex-wrap gap-2">
                                ${investor.interests.map(interest => `
                                    <span class="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                                        ${interest}
                                    </span>`).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-6">
                        <h4 class="text-lg font-semibold mb-2">About</h4>
                        <p class="text-gray-700">${investor.bio}</p>
                    </div>
                    
                    <div class="mt-6 pt-4 border-t">
                        <button onclick="showPitchForm(${investor.id})" 
                                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                            Send Pitch
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    
    // Show modal using SweetAlert2
    Swal.fire({
        html: modalHTML,
        width: '90%',
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
            container: 'investor-modal-container',
            popup: 'rounded-lg shadow-xl',
            closeButton: 'focus:outline-none focus:ring-2 focus:ring-blue-500',
        },
        didOpen: () => {
            // Initialize AOS for any animations inside the modal
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }
    });
};

// Show pitch form in a modal
window.showPitchForm = function(investorId) {
    // Close the current modal
    Swal.close();
    
    // Show pitch form in a new modal
    Swal.fire({
        title: 'Send Your Pitch',
        html: `
            <form id="pitchForm" class="space-y-4">
                <div>
                    <label for="pitchTitle" class="block text-sm font-medium text-gray-700 mb-1">Pitch Title</label>
                    <input type="text" id="pitchTitle" name="pitchTitle" required
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                
                <div>
                    <label for="pitchContent" class="block text-sm font-medium text-gray-700 mb-1">Pitch Description</label>
                    <textarea id="pitchContent" name="pitchContent" rows="5" required
                              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    <p class="text-xs text-gray-500 mt-1"><span id="wordCount">0/500</span> words</p>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Pitch Deck (Optional)</label>
                    <div class="upload-area border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-400 transition-colors duration-200">
                        <input type="file" id="pitchDeck" name="pitchDeck" class="hidden" accept=".pdf,.ppt,.pptx">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p class="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p class="text-xs text-gray-500 mt-1">PDF, PPT, or PPTX (max. 10MB)</p>
                        <p id="fileName" class="text-sm font-medium text-gray-700 mt-2">No file chosen</p>
                    </div>
                </div>
                
                <div class="mt-6">
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                        Send Pitch
                    </button>
                </div>
            </form>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: '600px',
        customClass: {
            popup: 'rounded-lg shadow-xl',
            closeButton: 'focus:outline-none focus:ring-2 focus:ring-blue-500',
        },
        didOpen: () => {
            // Initialize the pitch form functionality
            initPitchForm();
        }
    });
};
