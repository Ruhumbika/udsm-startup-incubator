/**
 * Pitch Form Functionality
 * Handles form validation, file upload preview, and submission
 */

function initPitchForm() {
    const pitchForm = document.getElementById('pitchForm');
    const pitchContent = document.getElementById('pitchContent');
    const wordCount = document.getElementById('wordCount');
    const fileInput = document.getElementById('pitchDeck');
    const fileNameDisplay = document.getElementById('fileName');
    const uploadArea = document.querySelector('.upload-area');
    
    if (!pitchForm) return;
    
    // Word count for pitch content
    if (pitchContent && wordCount) {
        const updateWordCount = () => {
            const text = pitchContent.value.trim();
            const words = text ? text.split(/\s+/).length : 0;
            wordCount.textContent = `${words}/500 words`;
            
            // Change color based on word count
            if (words > 500) {
                wordCount.classList.add('text-red-600');
                wordCount.classList.remove('text-gray-500');
            } else {
                wordCount.classList.remove('text-red-600');
                wordCount.classList.add('text-gray-500');
            }
        };
        
        pitchContent.addEventListener('input', updateWordCount);
        updateWordCount(); // Initial count
    }
    
    // File upload preview
    if (fileInput && fileNameDisplay && uploadArea) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                fileNameDisplay.textContent = file.name;
                uploadArea.classList.add('border-green-500', 'bg-green-50');
                
                // Show file size
                const fileSize = (file.size / 1024 / 1024).toFixed(2); // Convert to MB
                const fileSizeElement = document.createElement('div');
                fileSizeElement.className = 'text-xs text-gray-500 mt-1';
                fileSizeElement.textContent = `Size: ${fileSize} MB`;
                
                // Remove any existing file size element
                const existingSizeElement = uploadArea.querySelector('.file-size');
                if (existingSizeElement) {
                    existingSizeElement.remove();
                }
                
                fileSizeElement.classList.add('file-size');
                uploadArea.appendChild(fileSizeElement);
                
                // Validate file type
                const validTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 
                                  'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
                if (!validTypes.includes(file.type)) {
                    const errorElement = document.createElement('p');
                    errorElement.className = 'text-red-600 text-xs mt-1';
                    errorElement.textContent = 'Please upload a PDF or PowerPoint file.';
                    
                    // Remove any existing error message
                    const existingError = uploadArea.querySelector('.file-error');
                    if (existingError) {
                        existingError.remove();
                    }
                    
                    errorElement.classList.add('file-error');
                    uploadArea.appendChild(errorElement);
                    fileInput.value = '';
                    fileNameDisplay.textContent = 'No file chosen';
                    uploadArea.classList.remove('border-green-500', 'bg-green-50');
                    uploadArea.classList.add('border-red-500', 'bg-red-50');
                }
            } else {
                fileNameDisplay.textContent = 'No file chosen';
                uploadArea.classList.remove('border-green-500', 'bg-green-50');
                
                // Remove file size element if it exists
                const fileSizeElement = uploadArea.querySelector('.file-size');
                if (fileSizeElement) {
                    fileSizeElement.remove();
                }
            }
        });
        
        // Drag and drop functionality
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            uploadArea.classList.add('border-blue-500', 'bg-blue-50');
        }
        
        function unhighlight() {
            uploadArea.classList.remove('border-blue-500', 'bg-blue-50');
        }
        
        // Handle dropped files
        uploadArea.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length) {
                fileInput.files = files;
                const event = new Event('change');
                fileInput.dispatchEvent(event);
            }
        }
    }
    
    // Form submission
    pitchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        const requiredFields = pitchForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
                
                // Add error message if it doesn't exist
                if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'text-red-600 text-xs mt-1 error-message';
                    errorMsg.textContent = 'This field is required';
                    field.parentNode.insertBefore(errorMsg, field.nextSibling);
                }
            } else {
                field.classList.remove('border-red-500');
                
                // Remove error message if it exists
                if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                    field.nextElementSibling.remove();
                }
            }
        });
        
        // Validate word count
        if (pitchContent) {
            const text = pitchContent.value.trim();
            const words = text ? text.split(/\s+/).length : 0;
            
            if (words > 500) {
                isValid = false;
                if (!document.getElementById('wordCountError')) {
                    const errorMsg = document.createElement('p');
                    errorMsg.id = 'wordCountError';
                    errorMsg.className = 'text-red-600 text-xs mt-1';
                    errorMsg.textContent = 'Pitch content must be 500 words or less';
                    wordCount.parentNode.insertBefore(errorMsg, wordCount.nextSibling);
                }
            } else if (document.getElementById('wordCountError')) {
                document.getElementById('wordCountError').remove();
            }
        }
        
        // If form is valid, submit it
        if (isValid) {
            // Show loading state
            const submitButton = pitchForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
            `;
            
            // Simulate API call (replace with actual form submission)
            setTimeout(() => {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Pitch Sent!',
                    text: 'Your pitch has been successfully sent to the investor.',
                    confirmButtonText: 'Great!',
                    customClass: {
                        confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md'
                    }
                });
                
                // Reset form
                pitchForm.reset();
                if (wordCount) wordCount.textContent = '0/500 words';
                if (fileNameDisplay) fileNameDisplay.textContent = 'No file chosen';
                if (uploadArea) {
                    uploadArea.classList.remove('border-green-500', 'bg-green-50');
                    const fileSizeElement = uploadArea.querySelector('.file-size');
                    if (fileSizeElement) fileSizeElement.remove();
                }
                
            }, 1500);
        }
    });
}
