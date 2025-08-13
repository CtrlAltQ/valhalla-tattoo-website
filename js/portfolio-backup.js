// Portfolio Page JavaScript with Error Boundaries
document.addEventListener('DOMContentLoaded', function() {
    
    // Performance monitoring
    const performanceStart = performance.now();
    
    // Global error boundary for portfolio functionality
    window.addEventListener('error', function(event) {
        console.error('Global error in portfolio:', event.error);
        handleGlobalError(event.error, 'Global JavaScript error');
    });
    
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection in portfolio:', event.reason);
        handleGlobalError(event.reason, 'Unhandled promise rejection');
    });
    
    try {
        // Initialize portfolio with artist data
        initializePortfolioData();
        
        // Track performance
        const performanceEnd = performance.now();
        console.log(`Portfolio initialization took ${performanceEnd - performanceStart} milliseconds`);
        
    } catch (error) {
        console.error('Error during portfolio initialization:', error);
        handleGlobalError(error, 'Portfolio initialization failed');
    }
    
    // Handle booking button clicks with artist pre-selection
    const bookingButtons = document.querySelectorAll('.book-with-artist');
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const artistSlug = this.dataset.artist;
            
            // Validate artist exists before proceeding
            if (artistSlug && ArtistManager.getArtistBySlug(artistSlug)) {
                // Smooth scroll to portfolio booking section
                const portfolioBooking = document.getElementById('portfolio-booking');
                if (portfolioBooking) {
                    portfolioBooking.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add visual feedback to the booking form
                    setTimeout(() => {
                        const bookingForm = document.querySelector('.enhanced-booking-form');
                        if (bookingForm) {
                            bookingForm.classList.add('highlight-form');
                            setTimeout(() => {
                                bookingForm.classList.remove('highlight-form');
                            }, 2000);
                        }
                    }, 500);
                } else {
                    // Fallback to main booking page
                    sessionStorage.setItem('selectedArtist', artistSlug);
                    window.location.href = '../index.html#book';
                }
            } else {
                console.error(`Artist not found: ${artistSlug}`);
                // Fallback to main booking page
                window.location.href = '../index.html#book';
            }
        });
    });
    
    // Initialize enhanced booking form functionality
    initializeEnhancedBookingForm();
    
    // Initialize form accessibility features
    initializeFormAccessibility();
    
    // Smooth scroll behavior for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
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
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.3s ease-in-out';
                this.style.opacity = '1';
            });
        }
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe portfolio sections
    const portfolioSections = document.querySelectorAll('.portfolio-gallery, .artist-hero');
    portfolioSections.forEach(section => {
        observer.observe(section);
    });
    
    // Handle breadcrumb navigation
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default behavior for external links
            if (this.href.includes('../index.html')) {
                // Add a small delay to ensure smooth transition
                setTimeout(() => {
                    window.location.href = this.href;
                }, 100);
            }
        });
    });
    
    // Enhanced keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to go back to main site
        if (e.key === 'Escape') {
            // If lightbox is open, close it first
            if (document.querySelector('.lightbox-overlay.active')) {
                closeLightbox();
                return;
            }
            // Otherwise go back to main site
            window.location.href = '../index.html#artists';
        }
        
        // Arrow key navigation for portfolio cards
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const portfolioCards = document.querySelectorAll('.portfolio-card');
            const activeElement = document.activeElement;
            const currentIndex = Array.from(portfolioCards).indexOf(activeElement);
            
            if (currentIndex !== -1) {
                e.preventDefault();
                let nextIndex;
                
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % portfolioCards.length;
                } else {
                    nextIndex = currentIndex === 0 ? portfolioCards.length - 1 : currentIndex - 1;
                }
                
                portfolioCards[nextIndex].focus();
                announceToScreenReader(`Portfolio item ${nextIndex + 1} of ${portfolioCards.length}: ${portfolioCards[nextIndex].getAttribute('aria-label')}`);
            }
        }
    });
    
    // Enhanced focus management for accessibility
    initializeFocusManagement();
});

/**
 * Global error handler for portfolio functionality
 * @param {Error} error - The error that occurred
 * @param {string} context - Context where the error occurred
 */
function handleGlobalError(error, context) {
    console.error(`[PORTFOLIO ERROR] ${context}:`, error);
    
    // Track error
    trackError('global', `${context}: ${error.message}`, window.location.pathname);
    
    // Show user-friendly error message
    showGlobalErrorMessage(context, error);
    
    // Try to recover gracefully
    attemptGracefulRecovery(error, context);
}

/**
 * Show global error message to user
 * @param {string} context - Error context
 * @param {Error} error - The error
 */
function showGlobalErrorMessage(context, error) {
    // Create or update error notification
    let errorNotification = document.getElementById('global-error-notification');
    
    if (!errorNotification) {
        errorNotification = document.createElement('div');
        errorNotification.id = 'global-error-notification';
        errorNotification.className = 'global-error-notification';
        errorNotification.setAttribute('role', 'alert');
        errorNotification.setAttribute('aria-live', 'assertive');
        document.body.appendChild(errorNotification);
    }
    
    errorNotification.innerHTML = `
        <div class="error-notification-content">
            <div class="error-notification-icon">⚠️</div>
            <div class="error-notification-text">
                <strong>Something went wrong</strong>
                <p>We're experiencing a technical issue. Please try refreshing the page.</p>
            </div>
            <button class="error-notification-close" onclick="closeErrorNotification()" aria-label="Close error notification">×</button>
        </div>
    `;
    
    errorNotification.style.display = 'block';
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (errorNotification && errorNotification.style.display !== 'none') {
            closeErrorNotification();
        }
    }, 10000);
}

/**
 * Close error notification
 */
function closeErrorNotification() {
    const errorNotification = document.getElementById('global-error-notification');
    if (errorNotification) {
        errorNotification.style.display = 'none';
    }
}

/**
 * Attempt graceful recovery from errors
 * @param {Error} error - The error
 * @param {string} context - Error context
 */
function attemptGracefulRecovery(error, context) {
    try {
        // Recovery strategies based on error type
        if (context.includes('initialization')) {
            // Try to reinitialize with minimal functionality
            setTimeout(() => {
                try {
                    initializeMinimalPortfolio();
                } catch (recoveryError) {
                    console.error('Recovery attempt failed:', recoveryError);
                }
            }, 1000);
        }
        
        if (context.includes('image') || error.message.includes('image')) {
            // Reinitialize image loading with more conservative settings
            setTimeout(() => {
                try {
                    initializeConservativeImageLoading();
                } catch (recoveryError) {
                    console.error('Image loading recovery failed:', recoveryError);
                }
            }, 2000);
        }
        
    } catch (recoveryError) {
        console.error('Error during recovery attempt:', recoveryError);
    }
}

/**
 * Initialize minimal portfolio functionality as fallback
 */
function initializeMinimalPortfolio() {
    console.log('Attempting minimal portfolio initialization...');
    
    try {
        const currentArtistSlug = getCurrentArtistSlug();
        if (!currentArtistSlug) return;
        
        const artistData = ArtistManager.getArtistBySlug(currentArtistSlug);
        if (!artistData) return;
        
        // Basic page updates without complex functionality
        document.title = `${artistData.name}'s Portfolio | Valhalla Tattoo`;
        
        // Show basic portfolio message
        const portfolioGallery = document.querySelector('.portfolio-gallery');
        if (portfolioGallery) {
            const portfolioGrid = portfolioGallery.querySelector('.portfolio-grid');
            if (portfolioGrid) {
                portfolioGrid.innerHTML = `
                    <div class="portfolio-minimal-message">
                        <h3>${artistData.name}'s Portfolio</h3>
                        <p>Portfolio is loading in simplified mode. Please refresh the page for full functionality.</p>
                        <button onclick="window.location.reload()" class="btn-primary">Refresh Page</button>
                    </div>
                `;
            }
        }
        
        console.log('Minimal portfolio initialized successfully');
        
    } catch (error) {
        console.error('Minimal portfolio initialization failed:', error);
    }
}

/**
 * Initialize conservative image loading as fallback
 */
function initializeConservativeImageLoading() {
    console.log('Attempting conservative image loading...');
    
    try {
        // Simple image loading without intersection observer
        const images = document.querySelectorAll('.portfolio-image img[data-src]');
        
        images.forEach((img, index) => {
            setTimeout(() => {
                const src = img.dataset.src;
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    
                    img.onload = () => {
                        const container = img.parentElement;
                        if (container) {
                            container.classList.remove('loading');
                            container.classList.add('loaded');
                        }
                    };
                    
                    img.onerror = () => {
                        const container = img.parentElement;
                        if (container) {
                            container.classList.remove('loading');
                            container.classList.add('error');
                        }
                    };
                }
            }, index * 200); // Stagger loading to reduce server load
        });
        
        console.log('Conservative image loading initialized');
        
    } catch (error) {
        console.error('Conservative image loading failed:', error);
    }
}

/**
 * Performance monitoring utilities
 */
const PerformanceMonitor = {
    /**
     * Measure and log performance metrics
     */
    measurePerformance() {
        try {
            // Core Web Vitals monitoring
            if ('web-vital' in window) {
                // This would integrate with web-vitals library if available
                console.log('Web Vitals monitoring available');
            }
            
            // Basic performance metrics
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                console.log('Page Load Performance:', {
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                    totalTime: navigation.loadEventEnd - navigation.fetchStart
                });
            }
            
            // Image loading performance
            const imageEntries = performance.getEntriesByType('resource').filter(entry => 
                entry.name.includes('images/portfolio')
            );
            
            if (imageEntries.length > 0) {
                const avgImageLoadTime = imageEntries.reduce((sum, entry) => 
                    sum + (entry.responseEnd - entry.requestStart), 0) / imageEntries.length;
                
                console.log('Average image load time:', avgImageLoadTime + 'ms');
            }
            
        } catch (error) {
            console.warn('Performance monitoring failed:', error);
        }
    },
    
    /**
     * Monitor memory usage
     */
    monitorMemory() {
        try {
            if ('memory' in performance) {
                const memory = performance.memory;
                console.log('Memory Usage:', {
                    used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
                    total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
                    limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
                });
            }
        } catch (error) {
            console.warn('Memory monitoring failed:', error);
        }
    }
};

// Monitor performance periodically
const performanceInterval = setInterval(() => {
    PerformanceMonitor.measurePerformance();
    PerformanceMonitor.monitorMemory();
}, 30000); // Every 30 seconds

// Cleanup functionality
window.addEventListener('beforeunload', function() {
    try {
        // Clear performance monitoring
        clearInterval(performanceInterval);
        
        // Cleanup image observer
        if (window.portfolioImageObserver) {
            window.portfolioImageObserver.disconnect();
        }
        
        // Clear any pending timeouts
        const highestTimeoutId = setTimeout(() => {}, 0);
        for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }
        
        // Clear error notification
        closeErrorNotification();
        
        console.log('Portfolio cleanup completed');
        
    } catch (error) {
        console.warn('Error during cleanup:', error);
    }
});

// Page visibility API for performance optimization
document.addEventListener('visibilitychange', function() {
    try {
        if (document.hidden) {
            // Page is hidden, pause non-essential operations
            if (window.portfolioImageObserver) {
                window.portfolioImageObserver.disconnect();
            }
            console.log('Portfolio paused (page hidden)');
        } else {
            // Page is visible, resume operations
            setTimeout(() => {
                initializeLazyLoading();
                console.log('Portfolio resumed (page visible)');
            }, 100);
        }
    } catch (error) {
        console.warn('Error handling visibility change:', error);
    }
});

// Portfolio data initialization and management
function initializePortfolioData() {
    // Get current artist from URL or page context
    const currentArtistSlug = getCurrentArtistSlug();
    
    if (!currentArtistSlug) {
        console.warn('No artist slug found in current page');
        handle404Error('No artist specified in URL');
        return;
    }
    
    // Validate artist data
    const artistData = ArtistManager.getArtistBySlug(currentArtistSlug);
    if (!artistData) {
        console.error(`Artist data not found for: ${currentArtistSlug}`);
        handle404Error(`Artist "${currentArtistSlug}" not found`);
        return;
    }
    
    // Validate artist data structure
    const validation = DataValidator.validateArtist(artistData);
    if (!validation.isValid) {
        console.error('Artist data validation failed:', validation.errors);
        handleDataError('Artist data is invalid', validation.errors);
        return;
    }
    
    try {
        // Update page with artist data
        updatePageWithArtistData(artistData);
        
        // Initialize portfolio gallery if it exists
        initializePortfolioGallery(artistData);
        
        console.log(`Portfolio initialized for ${artistData.name}`);
        
        // Track successful initialization
        trackPortfolioView(artistData.slug);
        
    } catch (error) {
        console.error('Error initializing portfolio:', error);
        handleInitializationError(error, artistData);
    }
}

/**
 * Handle 404 errors for invalid artist portfolio URLs
 * @param {string} reason - Reason for the 404 error
 */
function handle404Error(reason) {
    console.error('404 Error:', reason);
    
    // Update page title
    document.title = 'Artist Not Found | Valhalla Tattoo';
    
    // Show 404 error in main content area
    const mainContent = document.querySelector('.portfolio-main');
    if (mainContent) {
        mainContent.innerHTML = `
            <section class="error-section">
                <div class="error-container">
                    <div class="error-content">
                        <div class="error-icon">🔍</div>
                        <h1 class="error-title">Artist Not Found</h1>
                        <p class="error-message">Sorry, we couldn't find the artist portfolio you're looking for.</p>
                        <div class="error-details">
                            <p><strong>What happened?</strong></p>
                            <p>${reason}</p>
                        </div>
                        <div class="error-actions">
                            <a href="../index.html#artists" class="btn-primary">View All Artists</a>
                            <button onclick="window.history.back()" class="btn-secondary">Go Back</button>
                        </div>
                        <div class="available-artists">
                            <h3>Available Artists:</h3>
                            <div class="artist-links">
                                <a href="micah.html">Micah</a>
                                <a href="pagan.html">Pagan</a>
                                <a href="jimmy.html">Jimmy</a>
                                <a href="kason.html">Kason</a>
                                <a href="sarah.html">Sarah</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', 'Artist portfolio not found. View all available tattoo artists at Valhalla Tattoo in Spring Hill, TN.');
    }
    
    // Announce error to screen readers
    announceToScreenReader('Artist portfolio not found. Please select from available artists or return to the main artists page.');
    
    // Track 404 error for analytics
    trackError('404', reason, window.location.pathname);
}

/**
 * Handle data validation errors
 * @param {string} message - Error message
 * @param {Array} errors - Array of validation errors
 */
function handleDataError(message, errors) {
    console.error('Data Error:', message, errors);
    
    const mainContent = document.querySelector('.portfolio-main');
    if (mainContent) {
        mainContent.innerHTML = `
            <section class="error-section">
                <div class="error-container">
                    <div class="error-content">
                        <div class="error-icon">⚠️</div>
                        <h1 class="error-title">Data Error</h1>
                        <p class="error-message">${message}</p>
                        <div class="error-actions">
                            <a href="../index.html#artists" class="btn-primary">View All Artists</a>
                            <button onclick="window.location.reload()" class="btn-secondary">Refresh Page</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
    
    // Track data error
    trackError('data_validation', message, window.location.pathname);
}

/**
 * Handle initialization errors
 * @param {Error} error - The error that occurred
 * @param {Object} artistData - Artist data that was being processed
 */
function handleInitializationError(error, artistData) {
    console.error('Initialization Error:', error);
    
    const mainContent = document.querySelector('.portfolio-main');
    if (mainContent) {
        mainContent.innerHTML = `
            <section class="error-section">
                <div class="error-container">
                    <div class="error-content">
                        <div class="error-icon">🔧</div>
                        <h1 class="error-title">Loading Error</h1>
                        <p class="error-message">There was a problem loading ${artistData ? artistData.name + "'s" : 'the'} portfolio.</p>
                        <div class="error-details">
                            <p><strong>Error:</strong> ${error.message}</p>
                        </div>
                        <div class="error-actions">
                            <button onclick="window.location.reload()" class="btn-primary">Try Again</button>
                            <a href="../index.html#artists" class="btn-secondary">View All Artists</a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
    
    // Track initialization error
    trackError('initialization', error.message, window.location.pathname);
}

/**
 * Track portfolio view for analytics
 * @param {string} artistSlug - Artist slug
 */
function trackPortfolioView(artistSlug) {
    try {
        // Track page view (can be integrated with analytics services)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                artist: artistSlug
            });
        }
        
        // Store in session for user experience tracking
        const viewData = {
            artist: artistSlug,
            timestamp: Date.now(),
            userAgent: navigator.userAgent
        };
        
        sessionStorage.setItem('lastPortfolioView', JSON.stringify(viewData));
        
    } catch (error) {
        console.warn('Failed to track portfolio view:', error);
    }
}

/**
 * Track errors for debugging and analytics
 * @param {string} errorType - Type of error
 * @param {string} message - Error message
 * @param {string} path - Current path
 */
function trackError(errorType, message, path) {
    try {
        // Log to console for development
        console.error(`[${errorType.toUpperCase()}] ${message} at ${path}`);
        
        // Track error (can be integrated with error tracking services)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: `${errorType}: ${message}`,
                fatal: false,
                custom_map: {
                    error_type: errorType,
                    path: path
                }
            });
        }
        
        // Store error for debugging
        const errorData = {
            type: errorType,
            message: message,
            path: path,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            connectionType: getConnectionInfo()
        };
        
        // Store in localStorage for debugging (limit to last 10 errors)
        const storedErrors = JSON.parse(localStorage.getItem('portfolioErrors') || '[]');
        storedErrors.unshift(errorData);
        storedErrors.splice(10); // Keep only last 10 errors
        localStorage.setItem('portfolioErrors', JSON.stringify(storedErrors));
        
    } catch (error) {
        console.warn('Failed to track error:', error);
    }
}

/**
 * Get connection information for debugging
 * @returns {Object} Connection information
 */
function getConnectionInfo() {
    try {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            return {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
        }
        return { type: 'unknown' };
    } catch (error) {
        return { type: 'error', error: error.message };
    }
}

/**
 * Network-aware image loading with retry logic
 * @param {string} src - Image source URL
 * @param {HTMLImageElement} img - Image element
 * @param {HTMLElement} container - Container element
 * @param {number} retryCount - Current retry attempt
 * @returns {Promise} Promise that resolves when image loads or fails permanently
 */
function loadImageWithRetry(src, img, container, retryCount = 0) {
    const maxRetries = 3;
    const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff
    
    return new Promise((resolve, reject) => {
        const newImg = new Image();
        let loadTimeout;
        
        // Adjust timeout based on connection speed
        const connectionInfo = getConnectionInfo();
        let timeoutDuration = 10000; // Default 10 seconds
        
        if (connectionInfo.effectiveType) {
            switch (connectionInfo.effectiveType) {
                case 'slow-2g':
                case '2g':
                    timeoutDuration = 30000; // 30 seconds for slow connections
                    break;
                case '3g':
                    timeoutDuration = 15000; // 15 seconds for 3G
                    break;
                case '4g':
                default:
                    timeoutDuration = 10000; // 10 seconds for fast connections
                    break;
            }
        }
        
        loadTimeout = setTimeout(() => {
            console.warn(`Image loading timeout (attempt ${retryCount + 1}): ${src}`);
            
            if (retryCount < maxRetries) {
                // Retry with exponential backoff
                setTimeout(() => {
                    loadImageWithRetry(src, img, container, retryCount + 1)
                        .then(resolve)
                        .catch(reject);
                }, retryDelay);
            } else {
                reject(new Error(`Image loading failed after ${maxRetries} retries: timeout`));
            }
        }, timeoutDuration);
        
        newImg.onload = () => {
            clearTimeout(loadTimeout);
            
            // Apply loaded image
            img.style.transition = 'filter 0.3s ease-out, transform 0.3s ease-out';
            img.src = src;
            img.style.filter = 'blur(0px)';
            img.style.transform = 'scale(1)';
            
            container.classList.remove('loading');
            container.classList.add('loaded');
            img.removeAttribute('data-src');
            
            resolve();
        };
        
        newImg.onerror = () => {
            clearTimeout(loadTimeout);
            console.error(`Image loading error (attempt ${retryCount + 1}): ${src}`);
            
            if (retryCount < maxRetries) {
                // Retry with exponential backoff
                setTimeout(() => {
                    loadImageWithRetry(src, img, container, retryCount + 1)
                        .then(resolve)
                        .catch(reject);
                }, retryDelay);
            } else {
                reject(new Error(`Image loading failed after ${maxRetries} retries: network error`));
            }
        };
        
        newImg.src = src;
    });
}

function getCurrentArtistSlug() {
    // Extract artist slug from current page URL
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename.replace('.html', '');
}

function updatePageWithArtistData(artistData) {
    // Update page title if needed
    const titleElement = document.querySelector('title');
    if (titleElement && !titleElement.textContent.includes(artistData.name)) {
        titleElement.textContent = `${artistData.name}'s Portfolio - ${artistData.specialty} | Valhalla Tattoo`;
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', 
            `View ${artistData.name}'s tattoo portfolio at Valhalla Tattoo - ${artistData.specialty} specialist with ${artistData.experience} experience in Spring Hill, TN.`
        );
    }
    
    // Update breadcrumb if needed
    const breadcrumbCurrent = document.querySelector('.breadcrumb li[aria-current="page"]');
    if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = artistData.name;
    }
    
    // Update booking buttons with correct artist slug
    const bookingButtons = document.querySelectorAll('.book-with-artist');
    bookingButtons.forEach(button => {
        button.setAttribute('data-artist', artistData.slug);
        if (button.textContent.includes('[Artist]')) {
            button.textContent = button.textContent.replace('[Artist]', artistData.name);
        }
    });
}

function initializePortfolioGallery(artistData) {
    const portfolioGallery = document.querySelector('.portfolio-gallery');
    if (!portfolioGallery || !artistData.portfolio) {
        console.warn('Portfolio gallery or artist portfolio data not found');
        return;
    }
    
    // Add data attributes
    portfolioGallery.setAttribute('data-artist', artistData.slug);
    portfolioGallery.setAttribute('data-portfolio-count', artistData.portfolio.length);
    
    // Create and render portfolio grid
    renderPortfolioGrid(artistData);
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    // Initialize portfolio filters
    initializePortfolioFilters(artistData);
    
    console.log(`Portfolio gallery initialized for ${artistData.name}:`, {
        portfolioCount: artistData.portfolio.length,
        styles: getUniqueStyles(artistData.portfolio)
    });
}

/**
 * Render the portfolio grid with image cards
 * @param {Object} artistData - Artist data with portfolio
 */
function renderPortfolioGrid(artistData) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;
    
    // Clear existing content
    portfolioGrid.innerHTML = '';
    
    // Check if portfolio has images
    if (!artistData.portfolio || artistData.portfolio.length === 0) {
        portfolioGrid.innerHTML = `
            <div class="portfolio-empty">
                <p>Portfolio coming soon! ${artistData.name} is working on adding their latest work.</p>
            </div>
        `;
        return;
    }
    
    // Create filter controls
    createFilterControls(artistData);
    
    // Create portfolio cards
    artistData.portfolio.forEach(image => {
        const card = createPortfolioCard(image, artistData.slug);
        portfolioGrid.appendChild(card);
    });
}

/**
 * Create filter controls for portfolio styles and tags
 * @param {Object} artistData - Artist data with portfolio
 */
function createFilterControls(artistData) {
    const portfolioGallery = document.querySelector('.portfolio-gallery');
    const existingFilters = portfolioGallery.querySelector('.portfolio-filters');
    
    // Remove existing filters if they exist
    if (existingFilters) {
        existingFilters.remove();
    }
    
    // Get unique styles and tags from artist's portfolio
    const styles = getUniqueStyles(artistData.portfolio);
    const tags = getUniqueTags(artistData.portfolio);
    
    // Only create filters if there are multiple styles or tags
    if (styles.length <= 1 && tags.length <= 1) return;
    
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'portfolio-filters';
    
    // Create style filters section
    if (styles.length > 1) {
        const styleFiltersSection = document.createElement('div');
        styleFiltersSection.className = 'filter-section style-filters';
        
        const styleLabel = document.createElement('h3');
        styleLabel.className = 'filter-section-label';
        styleLabel.textContent = 'Filter by Style:';
        styleFiltersSection.appendChild(styleLabel);
        
        const styleButtonsContainer = document.createElement('div');
        styleButtonsContainer.className = 'filter-buttons-container';
        
        // Add "All" filter with accessibility attributes
        const allFilter = document.createElement('button');
        allFilter.className = 'filter-button style-filter active';
        allFilter.textContent = 'All Styles';
        allFilter.setAttribute('data-filter', 'all');
        allFilter.setAttribute('data-filter-type', 'style');
        allFilter.setAttribute('aria-pressed', 'true');
        allFilter.setAttribute('aria-label', 'Show all portfolio items');
        allFilter.setAttribute('role', 'button');
        styleButtonsContainer.appendChild(allFilter);
        
        // Add style filters with accessibility attributes
        styles.forEach(style => {
            const filterButton = document.createElement('button');
            filterButton.className = 'filter-button style-filter';
            filterButton.textContent = style;
            filterButton.setAttribute('data-filter', style);
            filterButton.setAttribute('data-filter-type', 'style');
            filterButton.setAttribute('aria-pressed', 'false');
            filterButton.setAttribute('aria-label', `Filter portfolio to show only ${style} tattoos`);
            filterButton.setAttribute('role', 'button');
            styleButtonsContainer.appendChild(filterButton);
        });
        
        styleFiltersSection.appendChild(styleButtonsContainer);
        filtersContainer.appendChild(styleFiltersSection);
    }
    
    // Create tag filters section if there are enough tags
    if (tags.length > 3) {
        const tagFiltersSection = document.createElement('div');
        tagFiltersSection.className = 'filter-section tag-filters';
        
        const tagLabel = document.createElement('h3');
        tagLabel.className = 'filter-section-label';
        tagLabel.textContent = 'Filter by Tags:';
        tagFiltersSection.appendChild(tagLabel);
        
        const tagButtonsContainer = document.createElement('div');
        tagButtonsContainer.className = 'filter-buttons-container tag-buttons';
        
        // Add "All Tags" filter
        const allTagsFilter = document.createElement('button');
        allTagsFilter.className = 'filter-button tag-filter active';
        allTagsFilter.textContent = 'All Tags';
        allTagsFilter.setAttribute('data-filter', 'all');
        allTagsFilter.setAttribute('data-filter-type', 'tag');
        allTagsFilter.setAttribute('aria-pressed', 'true');
        allTagsFilter.setAttribute('aria-label', 'Show all portfolio items');
        allTagsFilter.setAttribute('role', 'button');
        tagButtonsContainer.appendChild(allTagsFilter);
        
        // Add most common tags (limit to prevent overcrowding)
        const popularTags = getPopularTags(artistData.portfolio, 8);
        popularTags.forEach(tag => {
            const filterButton = document.createElement('button');
            filterButton.className = 'filter-button tag-filter';
            filterButton.textContent = `#${tag}`;
            filterButton.setAttribute('data-filter', tag);
            filterButton.setAttribute('data-filter-type', 'tag');
            filterButton.setAttribute('aria-pressed', 'false');
            filterButton.setAttribute('aria-label', `Filter portfolio to show tattoos tagged with ${tag}`);
            filterButton.setAttribute('role', 'button');
            tagButtonsContainer.appendChild(filterButton);
        });
        
        tagFiltersSection.appendChild(tagButtonsContainer);
        filtersContainer.appendChild(tagFiltersSection);
    }
    
    // Add clear filters button if both style and tag filters exist
    if (styles.length > 1 && tags.length > 3) {
        const clearFiltersButton = document.createElement('button');
        clearFiltersButton.className = 'filter-button clear-filters';
        clearFiltersButton.textContent = 'Clear All Filters';
        clearFiltersButton.setAttribute('aria-label', 'Clear all active filters and show all portfolio items');
        clearFiltersButton.setAttribute('role', 'button');
        filtersContainer.appendChild(clearFiltersButton);
    }
    
    // Insert filters before the grid
    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioGallery.insertBefore(filtersContainer, portfolioGrid);
}

/**
 * Create a portfolio card element
 * @param {Object} image - Portfolio image data
 * @param {string} artistSlug - Artist slug
 * @returns {HTMLElement} - Portfolio card element
 */
function createPortfolioCard(image, artistSlug) {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    
    const img = document.createElement('img');
    img.src = `../images/portfolio/${artistSlug}/${image.filename}`;
    img.alt = `Tattoo by ${ArtistManager.getArtistBySlug(artistSlug)?.name || artistSlug}`;
    img.loading = 'lazy';
    
    card.appendChild(img);
    
    // Add click handler to open lightbox
    card.addEventListener('click', () => {
        openLightbox(image, artistSlug);
    });
    
    return card;
}

/**
 * Handle portfolio card click - opens lightbox
 * @param {Object} image - Portfolio image data
 * @param {string} artistSlug - Artist slug
 */
function handlePortfolioCardClick(image, artistSlug) {
    openLightbox(image, artistSlug);
}

/**
 * Initialize progressive image loading with blur-up technique
 */
function initializeLazyLoading() {
    // Create placeholder blur data URLs for different aspect ratios
    const createBlurPlaceholder = (width = 40, height = 40) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        
        // Create a simple gradient blur effect
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#1E1E1E');
        gradient.addColorStop(0.5, '#2A2A2A');
        gradient.addColorStop(1, '#1E1E1E');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        return canvas.toDataURL('image/jpeg', 0.1);
    };
    
    // Enhanced Intersection Observer for progressive loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const container = img.parentElement;
                const originalSrc = img.dataset.src;
                
                if (!originalSrc) {
                    observer.unobserve(img);
                    return;
                }
                
                // Set blur placeholder immediately
                if (!img.src || img.src === '') {
                    img.src = createBlurPlaceholder();
                    img.style.filter = 'blur(5px)';
                    img.style.transform = 'scale(1.1)';
                }
                
                // Create new image for preloading with timeout
                const newImg = new Image();
                let loadTimeout;
                
                // Use network-aware loading with retry logic
                loadImageWithRetry(originalSrc, img, container)
                    .then(() => {
                        announceToScreenReader(`Image loaded: ${img.alt}`);
                    })
                    .catch((error) => {
                        console.error('Image loading failed permanently:', error);
                        handleImageLoadError(img, container, originalSrc);
                    });
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px 0px', // Load images 100px before they come into view
        threshold: 0.01
    });
    
    // Observe all portfolio images with data-src
    const portfolioImages = document.querySelectorAll('.portfolio-image img[data-src]');
    portfolioImages.forEach(img => {
        // Add loading state immediately
        const container = img.parentElement;
        container.classList.add('loading');
        
        // Set initial blur placeholder
        img.src = createBlurPlaceholder();
        img.style.filter = 'blur(5px)';
        img.style.transform = 'scale(1.1)';
        
        imageObserver.observe(img);
    });
    
    // Store observer for cleanup
    window.portfolioImageObserver = imageObserver;
}

/**
 * Handle image load errors with fallback strategies
 * @param {HTMLImageElement} img - The image element that failed to load
 * @param {HTMLElement} container - The image container element
 * @param {string} originalSrc - The original image source that failed
 */
function handleImageLoadError(img, container, originalSrc) {
    console.error(`Failed to load portfolio image: ${originalSrc}`);
    
    // Update container state
    container.classList.remove('loading');
    container.classList.add('error');
    
    // Try fallback strategies
    const fallbackStrategies = [
        // Strategy 1: Try different image format
        () => {
            if (originalSrc.includes('.jpg')) {
                return originalSrc.replace('.jpg', '.png');
            } else if (originalSrc.includes('.png')) {
                return originalSrc.replace('.png', '.jpg');
            }
            return null;
        },
        
        // Strategy 2: Try without any query parameters
        () => {
            const url = new URL(originalSrc, window.location.origin);
            url.search = '';
            return url.toString();
        },
        
        // Strategy 3: Try a generic placeholder from the same directory
        () => {
            const pathParts = originalSrc.split('/');
            pathParts[pathParts.length - 1] = 'placeholder.jpg';
            return pathParts.join('/');
        }
    ];
    
    let strategyIndex = 0;
    
    const tryFallback = () => {
        if (strategyIndex >= fallbackStrategies.length) {
            // All strategies failed, show error state
            showImageErrorState(img, container, originalSrc);
            return;
        }
        
        const fallbackSrc = fallbackStrategies[strategyIndex]();
        strategyIndex++;
        
        if (!fallbackSrc || fallbackSrc === originalSrc) {
            tryFallback();
            return;
        }
        
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
            img.src = fallbackSrc;
            img.style.filter = 'blur(0px)';
            img.style.transform = 'scale(1)';
            container.classList.remove('error');
            container.classList.add('loaded');
            console.log(`Fallback image loaded: ${fallbackSrc}`);
        };
        
        fallbackImg.onerror = () => {
            tryFallback();
        };
        
        fallbackImg.src = fallbackSrc;
    };
    
    // Start fallback process
    tryFallback();
}

/**
 * Show error state for failed image loads
 * @param {HTMLImageElement} img - The image element
 * @param {HTMLElement} container - The image container
 * @param {string} originalSrc - The original source that failed
 */
function showImageErrorState(img, container, originalSrc) {
    // Create error placeholder
    const errorPlaceholder = document.createElement('div');
    errorPlaceholder.className = 'image-error-placeholder';
    errorPlaceholder.innerHTML = `
        <div class="error-icon">⚠️</div>
        <div class="error-text">Image unavailable</div>
        <div class="error-details">Failed to load image</div>
    `;
    
    // Replace image with error placeholder
    img.style.display = 'none';
    container.appendChild(errorPlaceholder);
    
    // Update alt text for accessibility
    img.alt = 'Image failed to load - please try refreshing the page';
    
    // Log error for debugging
    console.error('All fallback strategies failed for image:', originalSrc);
    
    // Announce error to screen readers
    announceToScreenReader('Image failed to load. Please try refreshing the page.');
}

/**
 * Initialize portfolio filter functionality with style and tag filtering
 * @param {Object} artistData - Artist data with portfolio
 */
function initializePortfolioFilters(artistData) {
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const clearFiltersButton = document.querySelector('.clear-filters');
    
    // Track active filters
    let activeStyleFilter = 'all';
    let activeTagFilter = 'all';
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            const filterType = button.getAttribute('data-filter-type');
            
            // Handle clear filters button
            if (button.classList.contains('clear-filters')) {
                clearAllFilters();
                return;
            }
            
            // Update active filter tracking
            if (filterType === 'style') {
                activeStyleFilter = filter;
                updateActiveButton(button, '.style-filter');
            } else if (filterType === 'tag') {
                activeTagFilter = filter;
                updateActiveButton(button, '.tag-filter');
            } else {
                // Legacy single filter support
                activeStyleFilter = filter;
                activeTagFilter = 'all';
                updateActiveButton(button, '.filter-button');
            }
            
            // Apply combined filters with animation
            applyFiltersWithAnimation();
        });
        
        // Add keyboard support for filter buttons
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
    
    /**
     * Update active button state within a specific filter group
     * @param {HTMLElement} activeButton - The button that was clicked
     * @param {string} selector - CSS selector for the filter group
     */
    function updateActiveButton(activeButton, selector) {
        const groupButtons = document.querySelectorAll(selector);
        groupButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
    }
    
    /**
     * Clear all active filters and show all items
     */
    function clearAllFilters() {
        activeStyleFilter = 'all';
        activeTagFilter = 'all';
        
        // Reset all filter buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        // Activate "All" buttons
        const allStyleButton = document.querySelector('.style-filter[data-filter="all"]');
        const allTagButton = document.querySelector('.tag-filter[data-filter="all"]');
        
        if (allStyleButton) {
            allStyleButton.classList.add('active');
            allStyleButton.setAttribute('aria-pressed', 'true');
        }
        if (allTagButton) {
            allTagButton.classList.add('active');
            allTagButton.setAttribute('aria-pressed', 'true');
        }
        
        applyFiltersWithAnimation();
        announceToScreenReader('All filters cleared. Showing all portfolio items.');
    }
    
    /**
     * Apply combined style and tag filters with smooth animations
     */
    function applyFiltersWithAnimation() {
        let visibleCount = 0;
        const animationDelay = 50; // Stagger animation for smooth effect
        
        // First pass: hide cards that don't match filters
        portfolioCards.forEach((card, index) => {
            const cardStyle = card.getAttribute('data-style');
            const cardTags = card.getAttribute('data-tags').split(',').filter(tag => tag.trim());
            
            const matchesStyle = activeStyleFilter === 'all' || cardStyle === activeStyleFilter;
            const matchesTag = activeTagFilter === 'all' || cardTags.includes(activeTagFilter);
            
            if (matchesStyle && matchesTag) {
                // Card should be visible
                card.classList.remove('filter-hidden');
                card.setAttribute('aria-hidden', 'false');
                
                // Add staggered animation
                setTimeout(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    card.style.display = 'block';
                    
                    // Trigger animation
                    requestAnimationFrame(() => {
                        card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    });
                }, index * animationDelay);
                
                visibleCount++;
            } else {
                // Card should be hidden
                card.classList.add('filter-hidden');
                card.setAttribute('aria-hidden', 'true');
                card.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-10px) scale(0.9)';
                
                setTimeout(() => {
                    if (card.classList.contains('filter-hidden')) {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Announce filter results to screen readers
        const styleText = activeStyleFilter === 'all' ? 'all styles' : activeStyleFilter;
        const tagText = activeTagFilter === 'all' ? 'all tags' : `#${activeTagFilter}`;
        
        let filterDescription = '';
        if (activeStyleFilter !== 'all' && activeTagFilter !== 'all') {
            filterDescription = `${styleText} tattoos tagged with ${tagText}`;
        } else if (activeStyleFilter !== 'all') {
            filterDescription = `${styleText} tattoos`;
        } else if (activeTagFilter !== 'all') {
            filterDescription = `tattoos tagged with ${tagText}`;
        } else {
            filterDescription = 'all portfolio items';
        }
        
        const resultText = visibleCount === 0 ? 
            `No ${filterDescription} found` : 
            `Showing ${visibleCount} ${filterDescription}`;
        
        setTimeout(() => {
            announceToScreenReader(resultText);
            
            // Show/hide no results message
            if (visibleCount === 0) {
                showNoResultsMessage(filterDescription);
            } else {
                hideNoResultsMessage();
            }
        }, 500);
    }
}

/**
 * Show no results message when filter returns no items
 * @param {string} filterDescription - Description of active filters
 */
function showNoResultsMessage(filterDescription) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    let noResultsMsg = portfolioGrid.querySelector('.no-results-message');
    
    if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'portfolio-empty no-results-message';
        noResultsMsg.setAttribute('role', 'status');
        noResultsMsg.setAttribute('aria-live', 'polite');
        portfolioGrid.appendChild(noResultsMsg);
    }
    
    // Create more helpful no results message
    const suggestions = [
        'Try selecting a different style or tag',
        'Clear all filters to view the complete portfolio',
        'Use the "All Styles" or "All Tags" buttons to broaden your search'
    ];
    
    noResultsMsg.innerHTML = `
        <div class="no-results-icon">🔍</div>
        <h3>No ${filterDescription} found</h3>
        <p>We couldn't find any tattoos matching your current filters.</p>
        <ul class="no-results-suggestions">
            ${suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
        </ul>
    `;
    noResultsMsg.style.display = 'block';
    noResultsMsg.style.animation = 'fadeInUp 0.3s ease-out';
}

/**
 * Hide no results message
 */
function hideNoResultsMessage() {
    const noResultsMsg = document.querySelector('.no-results-message');
    if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

/**
 * Get unique styles from portfolio
 * @param {Array} portfolio - Portfolio images array
 * @returns {Array} - Array of unique styles
 */
function getUniqueStyles(portfolio) {
    const styles = new Set();
    portfolio.forEach(image => {
        if (image.style) {
            styles.add(image.style);
        }
    });
    return Array.from(styles).sort();
}

/**
 * Get unique tags from portfolio
 * @param {Array} portfolio - Portfolio images array
 * @returns {Array} - Array of unique tags
 */
function getUniqueTags(portfolio) {
    const tags = new Set();
    portfolio.forEach(image => {
        if (image.tags && Array.isArray(image.tags)) {
            image.tags.forEach(tag => tags.add(tag));
        }
    });
    return Array.from(tags).sort();
}

/**
 * Get most popular tags from portfolio
 * @param {Array} portfolio - Portfolio images array
 * @param {number} limit - Maximum number of tags to return
 * @returns {Array} - Array of popular tags sorted by frequency
 */
function getPopularTags(portfolio, limit = 8) {
    const tagCounts = {};
    
    portfolio.forEach(image => {
        if (image.tags && Array.isArray(image.tags)) {
            image.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        }
    });
    
    // Sort tags by frequency and return top ones
    return Object.entries(tagCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, limit)
        .map(([tag]) => tag);
}

// Portfolio utility functions
const PortfolioUtils = {
    /**
     * Get current artist data
     * @returns {Object|null} - Current artist data
     */
    getCurrentArtist() {
        const slug = getCurrentArtistSlug();
        return slug ? ArtistManager.getArtistBySlug(slug) : null;
    },
    
    /**
     * Get portfolio images for current artist
     * @returns {Array} - Portfolio images
     */
    getCurrentPortfolio() {
        const slug = getCurrentArtistSlug();
        return slug ? ArtistManager.getArtistPortfolio(slug) : [];
    },
    
    /**
     * Filter current portfolio by style
     * @param {string} style - Style to filter by
     * @returns {Array} - Filtered portfolio images
     */
    filterCurrentPortfolioByStyle(style) {
        const slug = getCurrentArtistSlug();
        return slug ? ArtistManager.filterPortfolioByStyle(slug, style) : [];
    },
    
    /**
     * Get portfolio image by ID
     * @param {number} imageId - Image ID
     * @returns {Object|null} - Portfolio image
     */
    getPortfolioImageById(imageId) {
        const slug = getCurrentArtistSlug();
        return slug ? ArtistManager.getPortfolioImage(slug, imageId) : null;
    }
};

// Make utility functions globally available
window.PortfolioUtils = PortfolioUtils;

// Accessibility utilities
function initializeFocusManagement() {
    // Ensure proper focus order for all interactive elements
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    // Add focus indicators and proper tabindex
    focusableElements.forEach((element, index) => {
        // Ensure proper tabindex
        if (!element.hasAttribute('tabindex') && !['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName)) {
            element.setAttribute('tabindex', '0');
        }
        
        // Add focus event listeners for screen reader announcements
        element.addEventListener('focus', function() {
            // Announce context for screen readers
            if (this.classList.contains('portfolio-card')) {
                const imageTitle = this.querySelector('h3')?.textContent || 'Portfolio image';
                const style = this.getAttribute('data-style') || 'Unknown style';
                announceToScreenReader(`${imageTitle}, ${style} tattoo. Press Enter or Space to view details.`);
            } else if (this.classList.contains('filter-button')) {
                const filterText = this.textContent;
                const isActive = this.classList.contains('active');
                announceToScreenReader(`${filterText} filter${isActive ? ', currently active' : ''}. Press Enter to apply filter.`);
            }
        });
    });
    
    // Add skip links for better navigation
    addSkipLinks();
}

function announceToScreenReader(message) {
    // Create or update live region for screen reader announcements
    let liveRegion = document.getElementById('sr-live-region');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'sr-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }
    
    // Clear and set new message
    liveRegion.textContent = '';
    setTimeout(() => {
        liveRegion.textContent = message;
    }, 100);
}

function addSkipLinks() {
    // Add skip link to portfolio gallery if it doesn't exist
    const existingSkipLink = document.querySelector('.skip-link[href="#portfolio-gallery"]');
    if (!existingSkipLink) {
        const skipLink = document.createElement('a');
        skipLink.href = '#portfolio-gallery';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to portfolio gallery';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
            border-radius: 4px;
        `;
        
        // Show on focus
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Lightbox/Modal functionality
let currentLightboxImage = null;
let currentArtistSlug = null;
let currentPortfolio = [];
let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

/**
 * Open lightbox with image details
 * @param {Object} image - Portfolio image data
 * @param {string} artistSlug - Artist slug
 */
function openLightbox(image, artistSlug) {
    // Validate input parameters
    if (!image || !artistSlug) {
        console.error('Invalid parameters for openLightbox:', { image, artistSlug });
        return;
    }
    
    currentLightboxImage = image;
    currentArtistSlug = artistSlug;
    currentPortfolio = ArtistManager.getArtistPortfolio(artistSlug) || [];
    currentImageIndex = currentPortfolio.findIndex(img => img.id === image.id);
    
    // Handle case where image is not found in portfolio
    if (currentImageIndex === -1) {
        console.error('Image not found in portfolio:', image.id);
        currentImageIndex = 0;
    }
    
    // Create lightbox if it doesn't exist
    if (!document.querySelector('.lightbox-overlay')) {
        createLightboxHTML();
    }
    
    // Update lightbox content
    updateLightboxContent();
    
    // Show lightbox
    const lightbox = document.querySelector('.lightbox-overlay');
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');
    
    // Focus management for accessibility
    const closeButton = lightbox.querySelector('.lightbox-close');
    if (closeButton) {
        closeButton.focus();
    }
    
    // Add event listeners
    addLightboxEventListeners();
    
    // Announce to screen readers
    const announcement = `Opened lightbox for ${image.title}, ${image.style} tattoo. Use arrow keys to navigate, escape to close.`;
    announceToScreenReader(announcement);
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox-overlay');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
        
        // Return focus to the portfolio card that was clicked
        const portfolioCard = document.querySelector(`[data-image-id="${currentLightboxImage?.id}"]`);
        if (portfolioCard) {
            portfolioCard.focus();
        }
    }
    
    // Remove event listeners
    removeLightboxEventListeners();
    
    // Clear current data
    currentLightboxImage = null;
    currentArtistSlug = null;
    currentPortfolio = [];
    currentImageIndex = 0;
}

/**
 * Navigate to next image in portfolio
 */
function nextLightboxImage() {
    if (currentPortfolio.length <= 1) return;
    
    currentImageIndex = (currentImageIndex + 1) % currentPortfolio.length;
    currentLightboxImage = currentPortfolio[currentImageIndex];
    updateLightboxContent();
}

/**
 * Navigate to previous image in portfolio
 */
function previousLightboxImage() {
    if (currentPortfolio.length <= 1) return;
    
    currentImageIndex = currentImageIndex === 0 ? currentPortfolio.length - 1 : currentImageIndex - 1;
    currentLightboxImage = currentPortfolio[currentImageIndex];
    updateLightboxContent();
}

/**
 * Create lightbox HTML structure
 */
function createLightboxHTML() {
    const lightboxHTML = `
        <div class="lightbox-overlay">
            <div class="lightbox-container">
                <button class="lightbox-close" aria-label="Close">&times;</button>
                <button class="lightbox-nav lightbox-prev" aria-label="Previous">‹</button>
                <button class="lightbox-nav lightbox-next" aria-label="Next">›</button>
                <img class="lightbox-image" src="" alt="" />
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
}

/**
 * Update lightbox content with current image data
 */
function updateLightboxContent() {
    if (!currentLightboxImage || !currentArtistSlug) return;
    
    const lightbox = document.querySelector('.lightbox-overlay');
    if (!lightbox) return;
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    if (!lightboxImage) return;
    
    // Set image source and alt text
    lightboxImage.src = `../images/portfolio/${currentArtistSlug}/${currentLightboxImage.filename}`;
    lightboxImage.alt = `Tattoo by ${ArtistManager.getArtistBySlug(currentArtistSlug)?.name || currentArtistSlug}`;
}
    lightbox.querySelector('.lightbox-placement').textContent = currentLightboxImage.placement;
    lightbox.querySelector('.lightbox-session-time').textContent = currentLightboxImage.sessionTime;
    lightbox.querySelector('.lightbox-healed').textContent = currentLightboxImage.isHealed ? 'Healed' : 'Fresh';
    lightbox.querySelector('.lightbox-description').textContent = currentLightboxImage.description || '';
    
    // Update hidden description for screen readers
    const hiddenDesc = lightbox.querySelector('#lightbox-description');
    if (hiddenDesc) {
        hiddenDesc.textContent = `Viewing ${currentLightboxImage.title}, a ${currentLightboxImage.style} tattoo on ${currentLightboxImage.placement}. Session time: ${currentLightboxImage.sessionTime}. Status: ${currentLightboxImage.isHealed ? 'Healed' : 'Fresh'}. ${currentLightboxImage.description || ''}`;
    }
    
    // Handle before/after images
    const beforeAfterContainer = lightbox.querySelector('.lightbox-before-after');
    const beforeImageContainer = lightbox.querySelector('.before-image-container');
    const beforeImage = lightbox.querySelector('.lightbox-before-image');
    
    if (currentLightboxImage.beforeImage) {
        // Show before/after controls
        beforeAfterContainer.style.display = 'block';
        
        // Set up before image
        const beforeImageSrc = `../images/portfolio/${currentArtistSlug}/${currentLightboxImage.beforeImage}`;
        beforeImage.src = beforeImageSrc;
        beforeImage.alt = `${currentLightboxImage.title} - Before image`;
        
        // Handle before image load error
        beforeImage.onerror = () => {
            beforeImageContainer.innerHTML = `
                <div class="lightbox-error">
                    <p>Before image unavailable</p>
                    <p class="error-details">${currentLightboxImage.title}</p>
                </div>
            `;
            console.error(`Failed to load before image: ${beforeImageSrc}`);
        };
        
        // Add toggle functionality
        const toggleButtons = lightbox.querySelectorAll('.toggle-btn');
        toggleButtons.forEach(btn => {
            // Remove existing listeners to prevent duplicates
            btn.replaceWith(btn.cloneNode(true));
        });
        
        // Re-query after cloning and add fresh listeners
        const freshToggleButtons = lightbox.querySelectorAll('.toggle-btn');
        freshToggleButtons.forEach(btn => {
            btn.addEventListener('click', () => handleBeforeAfterToggle(btn.dataset.view));
        });
        
        // Reset to "after" view
        handleBeforeAfterToggle('after');
    } else {
        // Hide before/after controls
        beforeAfterContainer.style.display = 'none';
    }
    
    // Update counter with accessibility announcement
    const currentNum = currentImageIndex + 1;
    const totalNum = currentPortfolio.length;
    lightbox.querySelector('.current-image').textContent = currentNum;
    lightbox.querySelector('.total-images').textContent = totalNum;
    
    // Update navigation button states
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    if (totalNum <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        
        // Update ARIA labels with context
        prevBtn.setAttribute('aria-label', `View previous image (${currentNum === 1 ? totalNum : currentNum - 1} of ${totalNum})`);
        nextBtn.setAttribute('aria-label', `View next image (${currentNum === totalNum ? 1 : currentNum + 1} of ${totalNum})`);
    }
    
    // Show/hide navigation buttons based on portfolio size
    const prevButton = lightbox.querySelector('.lightbox-prev');
    const nextButton = lightbox.querySelector('.lightbox-next');
    
    if (currentPortfolio.length <= 1) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
    } else {
        prevButton.style.display = 'flex';
        nextButton.style.display = 'flex';
    }
}

/**
 * Handle before/after image toggle in lightbox
 * @param {string} view - 'before' or 'after'
 */
function handleBeforeAfterToggle(view) {
    const lightbox = document.querySelector('.lightbox-overlay');
    if (!lightbox) return;
    
    const mainImageContainer = lightbox.querySelector('.lightbox-image-container');
    const beforeImageContainer = lightbox.querySelector('.before-image-container');
    const toggleButtons = lightbox.querySelectorAll('.toggle-btn');
    
    // Update button states
    toggleButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    if (view === 'before') {
        // Show before image
        mainImageContainer.style.display = 'none';
        beforeImageContainer.style.display = 'flex';
    } else {
        // Show after image (main image)
        mainImageContainer.style.display = 'flex';
        beforeImageContainer.style.display = 'none';
    }
}

/**
 * Add event listeners for lightbox functionality
 */
function addLightboxEventListeners() {
    const lightbox = document.querySelector('.lightbox-overlay');
    if (!lightbox) return;
    
    // Close button
    const closeButton = lightbox.querySelector('.lightbox-close');
    closeButton.addEventListener('click', closeLightbox);
    
    // Navigation buttons
    const prevButton = lightbox.querySelector('.lightbox-prev');
    const nextButton = lightbox.querySelector('.lightbox-next');
    
    prevButton.addEventListener('click', previousLightboxImage);
    nextButton.addEventListener('click', nextLightboxImage);
    
    // Overlay click to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleLightboxKeydown);
    
    // Touch/swipe support
    const imageContainer = lightbox.querySelector('.lightbox-image-container');
    imageContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    imageContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
}

/**
 * Remove event listeners for lightbox functionality
 */
function removeLightboxEventListeners() {
    document.removeEventListener('keydown', handleLightboxKeydown);
}

/**
 * Handle keyboard navigation in lightbox
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleLightboxKeydown(e) {
    if (!document.querySelector('.lightbox-overlay.active')) return;
    
    switch (e.key) {
        case 'Escape':
            e.preventDefault();
            announceToScreenReader('Closing lightbox');
            closeLightbox();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            if (currentPortfolio.length > 1) {
                previousLightboxImage();
                const newIndex = currentImageIndex === 0 ? currentPortfolio.length - 1 : currentImageIndex - 1;
                const newImage = currentPortfolio[newIndex];
                announceToScreenReader(`Previous image: ${newImage.title}, ${newImage.style} tattoo`);
            }
            break;
        case 'ArrowRight':
            e.preventDefault();
            if (currentPortfolio.length > 1) {
                nextLightboxImage();
                const newIndex = (currentImageIndex + 1) % currentPortfolio.length;
                const newImage = currentPortfolio[newIndex];
                announceToScreenReader(`Next image: ${newImage.title}, ${newImage.style} tattoo`);
            }
            break;
        case 'Tab':
            // Trap focus within lightbox
            trapFocusInLightbox(e);
            break;
        case 'Home':
            e.preventDefault();
            if (currentPortfolio.length > 1 && currentImageIndex !== 0) {
                currentImageIndex = 0;
                currentLightboxImage = currentPortfolio[0];
                updateLightboxContent();
                announceToScreenReader(`First image: ${currentLightboxImage.title}`);
            }
            break;
        case 'End':
            e.preventDefault();
            if (currentPortfolio.length > 1 && currentImageIndex !== currentPortfolio.length - 1) {
                currentImageIndex = currentPortfolio.length - 1;
                currentLightboxImage = currentPortfolio[currentImageIndex];
                updateLightboxContent();
                announceToScreenReader(`Last image: ${currentLightboxImage.title}`);
            }
            break;
    }
}

/**
 * Trap focus within lightbox for accessibility
 * @param {KeyboardEvent} e - Keyboard event
 */
function trapFocusInLightbox(e) {
    const lightbox = document.querySelector('.lightbox-overlay.active');
    if (!lightbox) return;
    
    const focusableElements = lightbox.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
        }
    } else {
        // Tab
        if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
        }
    }
}

/**
 * Handle touch start for swipe navigation
 * @param {TouchEvent} e - Touch event
 */
function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

/**
 * Handle touch end for swipe navigation
 * @param {TouchEvent} e - Touch event
 */
function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

/**
 * Handle swipe gesture
 */
function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) < swipeThreshold) return;
    
    if (swipeDistance > 0) {
        // Swipe right - previous image
        previousLightboxImage();
    } else {
        // Swipe left - next image
        nextLightboxImage();
    }
}

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Make lightbox functions globally available for testing
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

// Add CSS for animations
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .animate-in {
        animation: slideInFromBottom 0.8s ease forwards;
    }
    
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Loading state for images */
    img {
        transition: opacity 0.3s ease-in-out;
    }
    
    /* Enhanced focus styles */
    .breadcrumb a:focus,
    .book-with-artist:focus {
        outline: 2px solid #BFA46F;
        outline-offset: 2px;
        border-radius: 4px;
    }
    
    /* Smooth transitions for interactive elements */
    .book-with-artist {
        position: relative;
        overflow: hidden;
    }
    
    .book-with-artist::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: left 0.5s;
    }
    
    .book-with-artist:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(animationStyle);
// Form accessibility enhancements
function initializeFormAccessibility() {
    const form = document.querySelector('.enhanced-booking-form');
    if (!form) return;
    
    // Add real-time validation with accessibility announcements
    const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    requiredFields.forEach(field => {
        // Add ARIA invalid initially false
        field.setAttribute('aria-invalid', 'false');
        
        // Real-time validation on blur
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear validation on input
        field.addEventListener('input', function() {
            if (this.getAttribute('aria-invalid') === 'true') {
                clearFieldError(this);
            }
        });
    });
    
    // Form submission with accessibility
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const firstInvalidField = validateForm();
        
        if (firstInvalidField) {
            isValid = false;
            firstInvalidField.focus();
            announceToScreenReader('Form has errors. Please correct the highlighted fields.');
        }
        
        if (isValid) {
            announceToScreenReader('Form is valid. Submitting booking request...');
            // Continue with form submission logic
        }
    });
}

function validateField(field) {
    const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = `${field.labels[0].textContent.replace('*', '').trim()} is required.`;
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Update field state
    field.setAttribute('aria-invalid', isValid ? 'false' : 'true');
    
    if (!isValid && errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.remove('sr-only');
        field.classList.add('error');
    } else if (errorElement) {
        clearFieldError(field);
    }
    
    return isValid;
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '';
        errorElement.classList.add('sr-only');
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
    }
}

function validateForm() {
    const form = document.querySelector('.enhanced-booking-form');
    const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let firstInvalidField = null;
    
    requiredFields.forEach(field => {
        if (!validateField(field) && !firstInvalidField) {
            firstInvalidField = field;
        }
    });
    
    return firstInvalidField;
}

/**
 * Initialize enhanced booking form functionality
 */
function initializeEnhancedBookingForm() {
    const bookingForm = document.querySelector('.enhanced-booking-form');
    if (!bookingForm) return;
    
    // Get current artist data for form customization
    const currentArtist = PortfolioUtils.getCurrentArtist();
    if (!currentArtist) return;
    
    // Pre-populate artist-specific style options
    populateArtistStyles(currentArtist);
    
    // Handle form submission
    bookingForm.addEventListener('submit', handleBookingFormSubmission);
    
    // Add form validation
    addFormValidation(bookingForm);
    
    // Add visual feedback for form interactions
    addFormInteractionFeedback(bookingForm);
    
    console.log(`Enhanced booking form initialized for ${currentArtist.name}`);
}

/**
 * Populate style options based on artist specialty
 * @param {Object} artist - Artist data
 */
function populateArtistStyles(artist) {
    const styleSelect = document.getElementById('booking-style');
    if (!styleSelect || !artist.portfolio) return;
    
    // Get unique styles from artist's portfolio
    const artistStyles = getUniqueStyles(artist.portfolio);
    
    // Reorder options to prioritize artist's styles
    const allOptions = Array.from(styleSelect.options);
    const prioritizedOptions = [];
    const otherOptions = [];
    
    allOptions.forEach(option => {
        if (option.value === '') {
            prioritizedOptions.push(option);
        } else if (artistStyles.includes(option.textContent)) {
            prioritizedOptions.push(option);
        } else {
            otherOptions.push(option);
        }
    });
    
    // Clear and repopulate select
    styleSelect.innerHTML = '';
    prioritizedOptions.forEach(option => styleSelect.appendChild(option));
    otherOptions.forEach(option => styleSelect.appendChild(option));
    
    // Pre-select artist's primary style if available
    const primaryStyle = artist.specialty.toLowerCase();
    const matchingOption = Array.from(styleSelect.options).find(option => 
        option.textContent.toLowerCase().includes(primaryStyle.split(' ')[0])
    );
    
    if (matchingOption) {
        matchingOption.selected = true;
    }
}

/**
 * Handle booking form submission
 * @param {Event} e - Form submission event
 */
function handleBookingFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.booking-submit');
    const submitText = submitButton.querySelector('.submit-text');
    const submitLoading = submitButton.querySelector('.submit-loading');
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    submitText.style.display = 'none';
    submitLoading.style.display = 'inline';
    
    // Get form data
    const formData = new FormData(form);
    const bookingData = Object.fromEntries(formData.entries());
    
    // Add portfolio context
    const currentArtist = PortfolioUtils.getCurrentArtist();
    if (currentArtist) {
        bookingData.portfolio_source = `${currentArtist.name} Portfolio`;
        bookingData.artist_specialty = currentArtist.specialty;
    }
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
        // Show success message
        showBookingSuccess(form, currentArtist);
        
        // Reset loading state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitText.style.display = 'inline';
        submitLoading.style.display = 'none';
        
        // Track booking attempt
        console.log('Booking submitted:', bookingData);
        
        // Optional: Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'booking_submission', {
                'artist': bookingData.artist,
                'source': 'portfolio_page',
                'style': bookingData.style
            });
        }
    }, 2000);
}

/**
 * Show booking success message
 * @param {HTMLElement} form - Booking form element
 * @param {Object} artist - Artist data
 */
function showBookingSuccess(form, artist) {
    const successMessage = form.querySelector('.booking-success-message');
    if (!successMessage) return;
    
    // Update success message with artist name
    const artistName = artist ? artist.name : 'the artist';
    const successText = successMessage.querySelector('p');
    if (successText) {
        successText.textContent = `Thank you for your booking request. ${artistName} will review your details and get back to you within 24-48 hours to discuss your tattoo and schedule your appointment.`;
    }
    
    // Hide form and show success message
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Scroll to success message
    successMessage.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    
    // Auto-hide after delay and show form again
    setTimeout(() => {
        successMessage.style.display = 'none';
        form.style.display = 'flex';
        form.reset();
        
        // Re-populate artist selection
        const artistSelect = form.querySelector('#booking-artist');
        if (artistSelect && artist) {
            artistSelect.value = artist.slug;
        }
    }, 8000);
}

/**
 * Add form validation
 * @param {HTMLElement} form - Booking form element
 */
function addFormValidation(form) {
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearFieldError);
    });
    
    // Custom validation for email
    const emailField = form.querySelector('#booking-email');
    if (emailField) {
        emailField.addEventListener('blur', validateEmail);
    }
    
    // Custom validation for phone (if provided)
    const phoneField = form.querySelector('#booking-phone');
    if (phoneField) {
        phoneField.addEventListener('blur', validatePhone);
    }
}

/**
 * Validate individual form field
 * @param {Event} e - Field blur event
 */
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (!value && field.required) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

/**
 * Validate email field
 * @param {Event} e - Email field blur event
 */
function validateEmail(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (!value && field.required) {
        showFieldError(field, 'Email is required');
        return false;
    }
    
    if (value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

/**
 * Validate phone field
 * @param {Event} e - Phone field blur event
 */
function validatePhone(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Phone is optional, but if provided should be valid
    if (value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid phone number');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

/**
 * Show field error message
 * @param {HTMLElement} field - Form field element
 * @param {string} message - Error message
 */
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#A70000';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentElement.appendChild(errorElement);
    field.style.borderColor = '#A70000';
}

/**
 * Clear field error message
 * @param {HTMLElement} field - Form field element
 */
function clearFieldError(field) {
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = '';
}

/**
 * Add form interaction feedback
 * @param {HTMLElement} form - Booking form element
 */
function addFormInteractionFeedback(form) {
    // Add focus effects
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('field-focused');
        });
        
        field.addEventListener('blur', () => {
            field.parentElement.classList.remove('field-focused');
        });
    });
    
    // Add hover effects to submit button
    const submitButton = form.querySelector('.booking-submit');
    if (submitButton) {
        submitButton.addEventListener('mouseenter', () => {
            if (!submitButton.disabled) {
                submitButton.style.transform = 'translateY(-2px)';
                submitButton.style.boxShadow = '0 8px 20px rgba(167, 0, 0, 0.4)';
            }
        });
        
        submitButton.addEventListener('mouseleave', () => {
            if (!submitButton.disabled) {
                submitButton.style.transform = '';
                submitButton.style.boxShadow = '';
            }
        });
    }
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} - Is valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format
 * @param {string} phone - Phone number
 * @returns {boolean} - Is valid phone
 */
function isValidPhone(phone) {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Check if it's a valid US phone number (10 digits)
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

// Add CSS for form highlight effect
const portfolioBookingStyle = document.createElement('style');
portfolioBookingStyle.textContent = `
    .highlight-form {
        animation: formHighlight 2s ease-out;
    }
    
    @keyframes formHighlight {
        0% {
            box-shadow: 0 0 0 0 rgba(191, 164, 111, 0.7);
        }
        50% {
            box-shadow: 0 0 0 10px rgba(191, 164, 111, 0.3);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(191, 164, 111, 0);
        }
    }
    
    .field-focused {
        transform: scale(1.02);
        transition: transform 200ms ease-out;
    }
    
    .field-error {
        animation: errorShake 0.5s ease-out;
    }
    
    @keyframes errorShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(portfolioBookingStyle);