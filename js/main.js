// Main site JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Handle smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle dropdown menu accessibility
    const dropdownTriggers = document.querySelectorAll('.dropdown > a');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            const menu = dropdown.querySelector('.dropdown-menu');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            menu.style.display = isExpanded ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!trigger.parentElement.contains(e.target)) {
                trigger.setAttribute('aria-expanded', 'false');
                trigger.parentElement.querySelector('.dropdown-menu').style.display = 'none';
            }
        });
    });
    
    // Handle booking form and artist pre-selection
    const bookingForm = document.querySelector('#book form');
    const artistSelect = document.getElementById('artist');
    
    // Check for pre-selected artist from portfolio pages
    const selectedArtist = sessionStorage.getItem('selectedArtist');
    if (selectedArtist && artistSelect) {
        artistSelect.value = selectedArtist;
        
        // Add visual feedback for pre-selection with enhanced styling
        const preselectionNotice = document.createElement('div');
        preselectionNotice.className = 'artist-preselection-notice';
        preselectionNotice.innerHTML = `
            <span class="notice-icon">✓</span>
            <span class="notice-text">${getArtistDisplayName(selectedArtist)} has been pre-selected from your portfolio visit</span>
        `;
        
        // Insert notice after the select element
        artistSelect.parentElement.insertBefore(preselectionNotice, artistSelect.nextSibling);
        
        // Add visual feedback to select
        artistSelect.style.background = '#A70000';
        artistSelect.style.color = '#F5F3F0';
        artistSelect.style.borderColor = '#A70000';
        
        // Clear the session storage
        sessionStorage.removeItem('selectedArtist');
        
        // Remove visual feedback after a delay
        setTimeout(() => {
            artistSelect.style.background = '';
            artistSelect.style.color = '';
            artistSelect.style.borderColor = '';
            
            if (preselectionNotice) {
                preselectionNotice.style.opacity = '0';
                preselectionNotice.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    preselectionNotice.remove();
                }, 300);
            }
        }, 5000);
        
        // Scroll to booking form if coming from portfolio
        if (window.location.hash === '#book') {
            setTimeout(() => {
                document.getElementById('book').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add highlight effect to booking form
                const bookingForm = document.querySelector('#book form');
                if (bookingForm) {
                    bookingForm.classList.add('highlight-booking-form');
                    setTimeout(() => {
                        bookingForm.classList.remove('highlight-booking-form');
                    }, 3000);
                }
            }, 100);
        }
    }
    
    // Handle form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            // Add loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Re-enable button after a delay (in case of errors)
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 5000);
        });
    }
    
    // Handle hero video loading
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', function() {
            this.style.opacity = '1';
        });
    }
    
    // Handle about video loading
    const aboutVideo = document.querySelector('.about-video-background');
    if (aboutVideo) {
        aboutVideo.addEventListener('loadeddata', function() {
            this.style.opacity = '0.15';
        });
    }
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Handle escape key to close dropdowns
        if (e.key === 'Escape') {
            dropdownTriggers.forEach(trigger => {
                trigger.setAttribute('aria-expanded', 'false');
                trigger.parentElement.querySelector('.dropdown-menu').style.display = 'none';
            });
        }
    });
    
    // Add focus management for accessibility
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

/**
 * Get display name for artist from slug
 * @param {string} slug - Artist slug
 * @returns {string} - Artist display name
 */
function getArtistDisplayName(slug) {
    const artistNames = {
        'micah': 'Micah',
        'pagan': 'Pagan',
        'jimmy': 'Jimmy',
        'kason': 'Kason',
        'sarah': 'Sarah',
        'heather': 'Heather'
    };
    return artistNames[slug] || slug;
}

// Add CSS for animations and enhancements
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Enhanced dropdown styles */
    .dropdown-menu {
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.2s ease;
    }
    
    .dropdown:hover .dropdown-menu,
    .dropdown-menu[style*="block"] {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Loading states */
    .hero-video,
    .about-video-background {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    /* Form enhancements */
    form button[type="submit"]:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    /* Artist select highlight */
    #artist {
        transition: all 0.3s ease;
    }
    
    /* Artist preselection notice */
    .artist-preselection-notice {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(167, 0, 0, 0.1);
        border: 1px solid rgba(167, 0, 0, 0.3);
        border-radius: 4px;
        padding: 0.5rem 0.75rem;
        margin-top: 0.5rem;
        font-size: 0.85rem;
        color: #F5F3F0;
        transition: all 0.3s ease;
    }
    
    .artist-preselection-notice .notice-icon {
        color: #4CAF50;
        font-weight: bold;
        font-size: 1rem;
    }
    
    .artist-preselection-notice .notice-text {
        color: #ccc;
    }
    
    /* Booking form highlight effect */
    .highlight-booking-form {
        animation: bookingFormHighlight 3s ease-out;
    }
    
    @keyframes bookingFormHighlight {
        0% {
            box-shadow: 0 0 0 0 rgba(191, 164, 111, 0.7);
        }
        25% {
            box-shadow: 0 0 0 15px rgba(191, 164, 111, 0.3);
        }
        50% {
            box-shadow: 0 0 0 10px rgba(191, 164, 111, 0.2);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(191, 164, 111, 0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// NEWSLETTER SIGNUP FUNCTIONALITY
// ========================================
// 
// This handles the mailing list signup form in the footer.
// 
// TO SET UP MAILERLITE:
// 1. Get your MailerLite API key from your account
// 2. Find the "handleNewsletterSignup" function below (around line 380)
// 3. Uncomment the MailerLite integration code (remove /* and */)
// 4. Replace "YOUR_MAILERLITE_API_KEY" with your real API key
// 5. Test the signup form on your website

document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const successMessage = document.getElementById('newsletter-success');
    const errorMessage = document.getElementById('newsletter-error');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Basic email validation
            if (!isValidEmail(email)) {
                showNewsletterMessage('error', 'Please enter a valid email address.');
                return;
            }
            
            // Disable form during submission
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.querySelector('.btn-text').textContent;
            submitButton.disabled = true;
            submitButton.querySelector('.btn-text').textContent = 'Subscribing...';
            
            // TODO: Replace this with actual MailerLite integration
            // MailerLite integration will go here
            handleNewsletterSignup(email)
                .then(success => {
                    if (success) {
                        showNewsletterMessage('success', '✓ Thank you! You\'re subscribed to our mailing list.');
                        newsletterForm.reset();
                    } else {
                        showNewsletterMessage('error', '⚠ Please try again or contact us directly.');
                    }
                })
                .catch(error => {
                    console.error('Newsletter signup error:', error);
                    showNewsletterMessage('error', '⚠ Please try again or contact us directly.');
                })
                .finally(() => {
                    // Re-enable form
                    submitButton.disabled = false;
                    submitButton.querySelector('.btn-text').textContent = originalText;
                });
        });
    }
    
    /**
     * Validate email format
     * @param {string} email - Email address to validate
     * @returns {boolean} - True if valid email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Show newsletter success/error message
     * @param {string} type - 'success' or 'error'
     * @param {string} message - Message text
     */
    function showNewsletterMessage(type, message) {
        // Hide both messages first
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        if (type === 'success') {
            successMessage.querySelector('p').textContent = message;
            successMessage.style.display = 'block';
        } else if (type === 'error') {
            errorMessage.querySelector('p').textContent = message;
            errorMessage.style.display = 'block';
        }
        
        // Auto-hide messages after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
        }, 5000);
    }
    
    /**
     * Handle newsletter signup - placeholder for MailerLite integration
     * @param {string} email - Email address to subscribe
     * @returns {Promise<boolean>} - Success status
     */
    async function handleNewsletterSignup(email) {
        // TODO: Replace with actual MailerLite API call
        // For now, simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate successful signup for demo purposes
                console.log('Newsletter signup for:', email);
                // Store email temporarily in localStorage for demo
                const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
                subscribers.push({
                    email: email,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
                resolve(true);
            }, 1000);
        });
        
        /* 
        // MAILERLITE INTEGRATION TEMPLATE - Uncomment and configure when ready
        try {
            const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-MailerLite-ApiKey': 'YOUR_MAILERLITE_API_KEY' // Replace with actual API key
                },
                body: JSON.stringify({
                    email: email,
                    fields: {
                        // Add custom fields if needed
                        source: 'website_footer'
                    }
                })
            });
            
            if (response.ok) {
                return true;
            } else {
                console.error('MailerLite API error:', response.status);
                return false;
            }
        } catch (error) {
            console.error('MailerLite signup error:', error);
            return false;
        }
        */
    }
});

// ========================================
// STUDIO SLIDER FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.studio-slider');
    const slides = document.querySelectorAll('.studio-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider || slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Add event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Add event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
});