// Main site JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Lenis smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Reinitialize Lenis on content changes
    const lenisReinit = document.querySelector('.lenis-reinit');
    if (lenisReinit) {
        const observer = new MutationObserver(() => {
            lenis.resize();
        });

        observer.observe(lenisReinit, {
            childList: true,
            subtree: true,
        });
    }
    
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
    
    // Character counter for textarea
    const messageTextarea = document.getElementById('message');
    const charCounter = document.querySelector('.char-counter');
    
    if (messageTextarea && charCounter) {
        messageTextarea.addEventListener('input', function() {
            const remaining = 500 - this.value.length;
            charCounter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                charCounter.style.color = '#C8860D';
            } else if (remaining < 100) {
                charCounter.style.color = '#E8940D';
            } else {
                charCounter.style.color = '#888';
            }
        });
    }
    
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
            e.preventDefault(); // Prevent default form submission

            // Add loading state
            const submitButton = this.querySelector('button[type="submit"]');
            
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Simulate a network request
            setTimeout(() => {
                const successMessage = document.querySelector('.booking-success-message');
                if (successMessage) {
                    bookingForm.style.display = 'none';
                    successMessage.style.display = 'block';
                }
            }, 1000);
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
    if (window.ArtistManager) {
        const artist = window.ArtistManager.getArtistBySlug(slug);
        if (artist) {
            return artist.name;
        }
    }
    // Fallback to capitalized slug if artist not found
    return slug.charAt(0).toUpperCase() + slug.slice(1);
}


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
     * Handle newsletter signup - MailerLite integration
     * @param {string} email - Email address to subscribe
     * @returns {Promise<boolean>} - Success status
     */
    async function handleNewsletterSignup(email) {
        if (window.WebsiteConfig && window.WebsiteConfig.newsletter.mailerliteEnabled) {
            try {
                const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.WebsiteConfig.newsletter.mailerliteApiKey}`,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        fields: {
                            source: 'website_footer'
                        },
                        status: 'active'
                    })
                });
                
                if (response.ok) {
                    console.log('Successfully subscribed to MailerLite:', email);
                    return true;
                } else {
                    const errorData = await response.json();
                    console.error('MailerLite API error:', response.status, errorData);
                    return false;
                }
            } catch (error) {
                console.error('MailerLite signup error:', error);
                return false;
            }
        } else {
            console.log('MailerLite not enabled, using demo mode');
            return true;
        }
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