// pitch.js - Premium Pitch Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Pitch page initialized');
    
    // Initialize all components
    initAnimations();
    initFormSteps();
    initFileUploads();
    initCounters();
    initFAQ();
    initMobileMenu();
    initFormValidation();
    initSuccessModal();
    
    // Check form completion on load
    updateFormProgress();
});

// ==================== ANIMATIONS ====================
function initAnimations() {
    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe animated elements
    document.querySelectorAll('.animate-fade-up, .feature-card, .story-card, .process-step').forEach(el => {
        observer.observe(el);
    });
    
    // Parallax effect on hero
    const hero = document.querySelector('.pitch-hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
}

// ==================== FORM STEPS ====================
function initFormSteps() {
    const formSteps = document.querySelectorAll('.form-step');
    const stepNavs = document.querySelectorAll('.step-nav');
    const progressBar = document.getElementById('formProgress');
    const progressText = document.getElementById('progressPercent');
    
    // Initialize step navigation
    stepNavs.forEach((nav, index) => {
        nav.addEventListener('click', function() {
            const stepNumber = this.getAttribute('data-step');
            navigateToStep(stepNumber);
        });
    });
    
    // Next/Previous buttons
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = document.querySelector('.form-step.active');
            const nextStepNumber = this.getAttribute('data-next');
            
            // Validate current step before proceeding
            if (validateStep(currentStep.id)) {
                navigateToStep(nextStepNumber);
            }
        });
    });
    
    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStepNumber = this.getAttribute('data-prev');
            navigateToStep(prevStepNumber);
        });
    });
    
    // Function to navigate between steps
    function navigateToStep(stepNumber) {
        // Update active navigation
        stepNavs.forEach(nav => nav.classList.remove('active'));
        const activeNav = document.querySelector(`.step-nav[data-step="${stepNumber}"]`);
        if (activeNav) activeNav.classList.add('active');
        
        // Update active step
        formSteps.forEach(step => step.classList.remove('active'));
        const activeStep = document.getElementById(`step${stepNumber}`);
        if (activeStep) activeStep.classList.add('active');
        
        // Update progress
        updateFormProgress();
        
        // Scroll to form section
        document.querySelector('.pitch-form-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Update progress bar
    function updateFormProgress() {
        const currentStep = document.querySelector('.form-step.active');
        if (!currentStep || !progressBar || !progressText) return;
        
        const stepIndex = Array.from(formSteps).indexOf(currentStep) + 1;
        const progress = (stepIndex / formSteps.length) * 100;
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
        
        // Update step completion based on validation
        updateStepCompletion();
    }
    
    // Mark steps as completed
    function updateStepCompletion() {
        stepNavs.forEach((nav, index) => {
            const stepNumber = index + 1;
            const stepId = `step${stepNumber}`;
            const step = document.getElementById(stepId);
            
            if (validateStep(stepId, true)) {
                nav.classList.add('completed');
            } else {
                nav.classList.remove('completed');
            }
        });
    }
    
    // Initial progress update
    updateFormProgress();
}

// ==================== FILE UPLOADS ====================
function initFileUploads() {
    // Pitch Deck Upload
    const pitchDeckArea = document.getElementById('pitchDeckArea');
    const pitchDeckInput = document.getElementById('pitchDeck');
    const pitchDeckPreview = document.getElementById('pitchDeckPreview');
    
    if (pitchDeckArea && pitchDeckInput) {
        // Click to upload
        pitchDeckArea.addEventListener('click', () => pitchDeckInput.click());
        
        // Drag and drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            pitchDeckArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            pitchDeckArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            pitchDeckArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            pitchDeckArea.classList.add('highlight');
        }
        
        function unhighlight() {
            pitchDeckArea.classList.remove('highlight');
        }
        
        // Handle file drop
        pitchDeckArea.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            pitchDeckInput.files = files;
            handleFileUpload(files[0], pitchDeckPreview, true);
        }
        
        // Handle file selection
        pitchDeckInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFileUpload(this.files[0], pitchDeckPreview, true);
            }
        });
    }
    
    // Additional Files Upload
    const addFilesBtn = document.getElementById('addFilesBtn');
    const additionalFilesList = document.getElementById('additionalFilesList');
    const additionalFilesInput = document.createElement('input');
    additionalFilesInput.type = 'file';
    additionalFilesInput.multiple = true;
    additionalFilesInput.accept = '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png';
    
    if (addFilesBtn) {
        addFilesBtn.addEventListener('click', () => additionalFilesInput.click());
        
        additionalFilesInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                Array.from(this.files).forEach(file => {
                    addFileToList(file);
                });
            }
        });
    }
    
    // Handle individual file upload
    function handleFileUpload(file, previewElement, isRequired = false) {
        // Validate file
        const validation = validateFile(file, isRequired);
        if (!validation.isValid) {
            showError(validation.message, previewElement);
            return;
        }
        
        // Create preview
        const fileInfo = createFilePreview(file);
        previewElement.innerHTML = '';
        previewElement.appendChild(fileInfo);
        
        // Add remove functionality
        const removeBtn = fileInfo.querySelector('.remove-file');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                previewElement.innerHTML = '';
                if (pitchDeckInput) pitchDeckInput.value = '';
            });
        }
        
        // Update form validation
        updateFormProgress();
    }
    
    // Add file to additional files list
    function addFileToList(file) {
        const validation = validateFile(file, false);
        if (!validation.isValid) {
            showToast(validation.message, 'error');
            return;
        }
        
        const fileItem = createFileListItem(file);
        if (additionalFilesList.querySelector('.empty-state')) {
            additionalFilesList.innerHTML = '';
        }
        additionalFilesList.appendChild(fileItem);
        
        // Update form validation
        updateFormProgress();
    }
    
    // Create file preview element
    function createFilePreview(file) {
        const div = document.createElement('div');
        div.className = 'file-info';
        div.innerHTML = `
            <i class="fas fa-file-pdf"></i>
            <div>
                <strong>${file.name}</strong>
                <span>${formatFileSize(file.size)} • ${file.type.split('/')[1].toUpperCase()}</span>
            </div>
            <button type="button" class="remove-file">&times;</button>
        `;
        return div;
    }
    
    // Create file list item
    function createFileListItem(file) {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.innerHTML = `
            <div class="file-item-content">
                <i class="fas fa-file-alt"></i>
                <div>
                    <strong>${file.name}</strong>
                    <span>${formatFileSize(file.size)}</span>
                </div>
            </div>
            <button type="button" class="remove-file-item" data-filename="${file.name}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add remove functionality
        const removeBtn = div.querySelector('.remove-file-item');
        removeBtn.addEventListener('click', function() {
            div.remove();
            if (additionalFilesList.children.length === 0) {
                showEmptyState();
            }
        });
        
        return div;
    }
    
    // Show empty state
    function showEmptyState() {
        additionalFilesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-import"></i>
                <p>No files added</p>
            </div>
        `;
    }
    
    // Validate file upload
    function validateFile(file, isRequired) {
        if (!file && isRequired) {
            return { isValid: false, message: 'This file is required' };
        }
        
        if (file) {
            // Check file size
            const maxSize = isRequired ? 10 * 1024 * 1024 : 25 * 1024 * 1024; // 10MB or 25MB
            if (file.size > maxSize) {
                const maxMB = maxSize / 1024 / 1024;
                return { 
                    isValid: false, 
                    message: `File too large. Maximum size is ${maxMB}MB` 
                };
            }
            
            // Check file type
            const allowedTypes = isRequired 
                ? ['pdf', 'ppt', 'pptx']
                : ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'mp4'];
            
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!allowedTypes.includes(fileExtension)) {
                return { 
                    isValid: false, 
                    message: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` 
                };
            }
        }
        
        return { isValid: true, message: '' };
    }
    
    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// ==================== COUNTERS ====================
function initCounters() {
    // Animated number counters
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counterInterval = setInterval(() => {
                        frame++;
                        const progress = frame / totalFrames;
                        const currentValue = target * progress;
                        
                        if (frame === totalFrames) {
                            counter.textContent = target.toLocaleString() + suffix;
                            clearInterval(counterInterval);
                        } else {
                            counter.textContent = Math.round(currentValue).toLocaleString() + suffix;
                        }
                    }, frameDuration);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
    
    // Character counters for textareas
    const textareas = document.querySelectorAll('textarea[data-max]');
    textareas.forEach(textarea => {
        const maxLength = parseInt(textarea.getAttribute('data-max')) || 500;
        const counterId = textarea.id + 'Counter';
        let counter = document.getElementById(counterId);
        
        if (!counter) {
            counter = document.createElement('div');
            counter.id = counterId;
            counter.className = 'char-counter';
            textarea.parentNode.appendChild(counter);
        }
        
        function updateCounter() {
            const length = textarea.value.length;
            counter.textContent = `${length} / ${maxLength} characters`;
            
            if (length > maxLength * 0.9) {
                counter.style.color = '#F59E0B';
            } else if (length > maxLength) {
                counter.style.color = '#EF4444';
            } else {
                counter.style.color = '#6B7280';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial update
    });
    
    // Team size slider
    const teamSlider = document.getElementById('teamSize');
    const teamSizeValue = document.getElementById('teamSizeValue');
    
    if (teamSlider && teamSizeValue) {
        function updateTeamSize() {
            const value = parseInt(teamSlider.value);
            teamSizeValue.textContent = value === 1 ? 'Solo Founder' : `${value} members`;
        }
        
        teamSlider.addEventListener('input', updateTeamSize);
        updateTeamSize(); // Initial update
    }
}

// ==================== FORM VALIDATION ====================
function initFormValidation() {
    // Real-time validation for all inputs
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Validate on input for immediate feedback
        if (input.type !== 'select-one') {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    clearError(this);
                }
            });
        }
    });
    
    // Custom validation patterns
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                showFieldError(this, 'Please enter a valid email address');
            } else {
                clearError(this);
            }
        });
    }
    
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            const phoneRegex = /^[0-9\s\-\(\)]+$/;
            if (this.value && !phoneRegex.test(this.value)) {
                showFieldError(this, 'Please enter a valid phone number');
            } else {
                clearError(this);
            }
        });
    }
    
    // Funding amount validation
    const fundingInput = document.getElementById('fundingAsk');
    if (fundingInput) {
        fundingInput.addEventListener('input', function() {
            const minAmount = 5000000; // 5M TZS
            const value = parseInt(this.value) || 0;
            
            if (value < minAmount) {
                showFieldError(this, `Minimum funding request is ${formatCurrency(minAmount)}`);
            } else {
                clearError(this);
            }
        });
    }
}

// Validate individual step
function validateStep(stepId, silent = false) {
    const step = document.getElementById(stepId);
    if (!step) return true;
    
    let isValid = true;
    const requiredFields = step.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field, silent)) {
            isValid = false;
        }
    });
    
    // Special validation for file uploads
    if (stepId === 'step4') {
        const pitchDeck = document.getElementById('pitchDeck');
        if (pitchDeck && !pitchDeck.files.length) {
            if (!silent) {
                showToast('Pitch deck is required', 'error');
            }
            isValid = false;
        }
    }
    
    return isValid;
}

// Validate individual field
function validateField(field, silent = false) {
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is empty
    if (!field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\sm]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // URL validation
    else if (field.type === 'url' && field.value) {
        try {
            new URL(field.value);
        } catch {
            isValid = false;
            errorMessage = 'Please enter a valid URL';
        }
    }
    
    // Phone validation
    else if (field.name === 'phone') {
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Text length validation
    else if (field.hasAttribute('data-min-length')) {
        const minLength = parseInt(field.getAttribute('data-min-length'));
        if (field.value.length < minLength) {
            isValid = false;
            errorMessage = `Minimum ${minLength} characters required`;
        }
    }
    
    // Show error if not silent
    if (!isValid && !silent) {
        showFieldError(field, errorMessage);
    } else if (isValid) {
        clearError(field);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    clearError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.classList.add('error');
    field.parentNode.appendChild(errorDiv);
    
    // Scroll to error
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Clear field error
function clearError(field) {
    field.classList.remove('error');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// ==================== FORM SUBMISSION ====================
function initFormSubmission() {
    const pitchForm = document.getElementById('pitchForm');
    
    if (pitchForm) {
        pitchForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate all steps
            let allValid = true;
            for (let i = 1; i <= 4; i++) {
                if (!validateStep(`step${i}`)) {
                    allValid = false;
                    // Navigate to first invalid step
                    document.querySelector(`.step-nav[data-step="${i}"]`).click();
                    break;
                }
            }
            
            if (!allValid) {
                showToast('Please fix errors before submitting', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Create form data (in real app, this would send to server)
                const formData = new FormData(this);
                const pitchData = {
                    founder: {
                        name: formData.get('fullName'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        linkedin: formData.get('linkedin'),
                        teamSize: formData.get('teamSize')
                    },
                    idea: {
                        title: formData.get('ideaTitle'),
                        category: formData.get('category'),
                        problem: formData.get('problem'),
                        solution: formData.get('solution'),
                        stage: formData.get('stage')
                    },
                    business: {
                        targetMarket: formData.get('targetMarket'),
                        revenueModel: formData.get('revenueModel'),
                        fundingAsk: formData.get('fundingAsk'),
                        competition: formData.get('competition')
                    },
                    files: {
                        pitchDeck: formData.get('pitchDeck')?.name,
                        additionalFiles: []
                    },
                    submittedAt: new Date().toISOString()
                };
                
                // Store in localStorage for demo purposes
                localStorage.setItem('lastPitchSubmission', JSON.stringify(pitchData));
                localStorage.setItem('pitchSubmissionTime', new Date().toISOString());
                
                // Show success
                showSuccessModal();
                
                // Reset form
                this.reset();
                document.querySelector('.step-nav[data-step="1"]').click();
                updateFormProgress();
                
                // Clear file previews
                document.querySelectorAll('.file-preview, .file-list').forEach(el => {
                    el.innerHTML = '';
                });
                
                // Show empty state for additional files
                const additionalFilesList = document.getElementById('additionalFilesList');
                if (additionalFilesList) {
                    additionalFilesList.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-file-import"></i>
                            <p>No files added</p>
                        </div>
                    `;
                }
                
            } catch (error) {
                console.error('Submission error:', error);
                showToast('Submission failed. Please try again.', 'error');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// ==================== SUCCESS MODAL ====================
function initSuccessModal() {
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.modal-close');
    const submitAnother = document.getElementById('submitAnother');
    const viewDashboard = document.getElementById('viewDashboard');
    
    if (successModal) {
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                successModal.classList.remove('active');
            });
        }
        
        // Close on background click
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
        
        // Submit another pitch
        if (submitAnother) {
            submitAnother.addEventListener('click', () => {
                successModal.classList.remove('active');
                document.querySelector('.step-nav[data-step="1"]').click();
                document.getElementById('step1').scrollIntoView({ behavior: 'smooth' });
            });
        }
        
        // View dashboard
        if (viewDashboard) {
            viewDashboard.addEventListener('click', () => {
                successModal.classList.remove('active');
                // In real app, redirect to dashboard
                showToast('Dashboard feature coming soon!', 'info');
            });
        }
    }
}

// Show success modal
function showSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        // Update modal content with submission details
        const submission = JSON.parse(localStorage.getItem('lastPitchSubmission') || '{}');
        const submissionTime = localStorage.getItem('pitchSubmissionTime');
        
        if (submission.idea) {
            const modalMessage = successModal.querySelector('.modal-message');
            if (modalMessage) {
                modalMessage.innerHTML = `
                    <p>Thank you for submitting <strong>"${submission.idea.title}"</strong>.</p>
                    <p>Our review team will evaluate your ${submission.idea.category} startup idea and get back to you within <strong>5-7 business days</strong>.</p>
                    <p class="submission-id">Reference: ${generateReferenceId()}</p>
                `;
            }
        }
        
        successModal.classList.add('active');
        
        // Auto-close after 30 seconds
        setTimeout(() => {
            if (successModal.classList.contains('active')) {
                successModal.classList.remove('active');
            }
        }, 30000);
    }
}

// Generate reference ID
function generateReferenceId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `PITCH-${timestamp}-${random}`;
}

// ==================== FAQ ====================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });
            
            // Toggle current FAQ
            if (!isActive) {
                this.classList.add('active');
                const answer = this.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle aria-expanded
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// ==================== UTILITIES ====================
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${getToastIcon(type)}"></i>
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
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

function showError(message, container) {
    if (container) {
        container.innerHTML = `
            <div class="upload-error">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            </div>
        `;
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-TZ', {
        style: 'currency',
        currency: 'TZS',
        minimumFractionDigits: 0
    }).format(amount);
}

// ==================== ADDITIONAL FEATURES ====================

// Auto-save form progress
function initAutoSave() {
    const form = document.getElementById('pitchForm');
    if (!form) return;
    
    // Save form data every 30 seconds
    setInterval(() => {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        localStorage.setItem('pitchFormDraft', JSON.stringify(data));
        localStorage.setItem('pitchFormDraftTime', new Date().toISOString());
        
        // Show auto-save indicator
        showAutoSaveIndicator();
    }, 30000);
    
    // Load draft on page load
    const draft = localStorage.getItem('pitchFormDraft');
    if (draft) {
        const data = JSON.parse(draft);
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field && field.type !== 'file') {
                field.value = data[key];
            }
        });
        
        // Show draft loaded notification
        const draftTime = localStorage.getItem('pitchFormDraftTime');
        if (draftTime) {
            const time = new Date(draftTime).toLocaleTimeString();
            showToast(`Draft from ${time} loaded`, 'info');
        }
    }
}

function showAutoSaveIndicator() {
    let indicator = document.getElementById('autoSaveIndicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'autoSaveIndicator';
        indicator.className = 'auto-save-indicator';
        document.body.appendChild(indicator);
    }
    
    indicator.textContent = 'Draft saved';
    indicator.classList.add('show');
    
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);
}

// Print/Export functionality
function initExport() {
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn-outline';
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Export Form';
    exportBtn.style.marginTop = '1rem';
    
    const formHeader = document.querySelector('.form-header');
    if (formHeader) {
        formHeader.appendChild(exportBtn);
        
        exportBtn.addEventListener('click', () => {
            const formData = collectFormData();
            const blob = new Blob([JSON.stringify(formData, null, 2)], { 
                type: 'application/json' 
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `pitch-application-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            showToast('Form data exported successfully', 'success');
        });
    }
}

function collectFormData() {
    const form = document.getElementById('pitchForm');
    const data = {};
    
    if (form) {
        const formData = new FormData(form);
        formData.forEach((value, key) => {
            if (value instanceof File) {
                data[key] = {
                    name: value.name,
                    size: value.size,
                    type: value.type
                };
            } else {
                data[key] = value;
            }
        });
    }
    
    return {
        submissionDate: new Date().toISOString(),
        applicationId: generateReferenceId(),
        data: data
    };
}

// Initialize all features
initFormSubmission();
initAutoSave();
initExport();

// Add CSS for additional components
const style = document.createElement('style');
style.textContent = `
    .toast {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 9999;
        max-width: 400px;
    }
    
    .toast.show {
        transform: translateY(0);
        opacity: 1;
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
        border-left: 4px solid #3B82F6;
    }
    
    .toast i {
        font-size: 1.25rem;
    }
    
    .toast-success i { color: #10B981; }
    .toast-error i { color: #EF4444; }
    .toast-warning i { color: #F59E0B; }
    .toast-info i { color: #3B82F6; }
    
    .toast-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #6B7280;
        cursor: pointer;
        margin-left: auto;
        padding: 0 0.5rem;
    }
    
    .upload-error {
        color: #EF4444;
        padding: 1rem;
        background: #FEF2F2;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .field-error {
        color: #EF4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    input.error, select.error, textarea.error {
        border-color: #EF4444 !important;
    }
    
    .step-nav.completed {
        background: #10B981 !important;
        border-color: #10B981 !important;
        color: white !important;
    }
    
    .auto-save-indicator {
        position: fixed;
        bottom: 1rem;
        left: 1rem;
        background: #3B82F6;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.875rem;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        z-index: 9998;
    }
    
    .auto-save-indicator.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .file-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem;
        background: white;
        border-radius: 8px;
        margin-bottom: 0.5rem;
        border: 1px solid #E5E7EB;
    }
    
    .file-item-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
    }
    
    .remove-file-item {
        background: none;
        border: none;
        color: #9CA3AF;
        cursor: pointer;
        padding: 0.25rem;
        font-size: 1.25rem;
    }
    
    .remove-file-item:hover {
        color: #EF4444;
    }
    
    .submission-id {
        font-family: monospace;
        background: #F3F4F6;
        padding: 0.5rem;
        border-radius: 4px;
        margin-top: 1rem;
        font-size: 0.875rem;
    }
    
    .highlight {
        border-color: #00C2D1 !important;
        background: rgba(0, 194, 209, 0.05) !important;
    }
`;
document.head.appendChild(style);

console.log('✅ Pitch page JavaScript loaded successfully');