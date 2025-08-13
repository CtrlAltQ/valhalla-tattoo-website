// Artist Section Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Validate artist data on page load
    if (typeof ArtistManager !== 'undefined') {
        const validationResults = ArtistManager.validateAllData();
        let hasErrors = false;
        
        Object.keys(validationResults).forEach(slug => {
            if (!validationResults[slug].isValid) {
                console.error(`Artist data validation failed for ${slug}:`, validationResults[slug].errors);
                hasErrors = true;
            }
        });
        
        if (!hasErrors) {
            console.log('All artist data validated successfully');
        }
    }
    
    // Handle portfolio view buttons with enhanced transitions
    const portfolioButtons = document.querySelectorAll('.view-portfolio-btn');
    portfolioButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const artistCard = this.closest('.artist-card');
            const artistSlug = artistCard.dataset.artist;
            
            // Validate artist exists in data before navigation
            if (artistSlug && ArtistManager.getArtistBySlug(artistSlug)) {
                // Add loading state to button
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                // Add transition effect to card
                artistCard.style.transform = 'scale(0.95)';
                artistCard.style.opacity = '0.7';
                artistCard.style.transition = 'all 0.3s ease-out';
                
                // Store navigation context for smooth return
                sessionStorage.setItem('navigationSource', 'artist-card');
                sessionStorage.setItem('sourceArtist', artistSlug);
                
                // Navigate with slight delay for smooth transition
                setTimeout(() => {
                    window.location.href = `portfolio/${artistSlug}.html`;
                }, 200);
                
                // Reset button state if navigation fails
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    artistCard.style.transform = '';
                    artistCard.style.opacity = '';
                }, 3000);
            } else {
                console.error(`Artist not found: ${artistSlug}`);
                // Show error feedback
                this.textContent = 'Error';
                this.style.background = '#A70000';
                setTimeout(() => {
                    this.textContent = 'View Portfolio';
                    this.style.background = '';
                }, 2000);
                
                // Fallback to main artists section
                document.getElementById('artists').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Handle book artist buttons
    const bookButtons = document.querySelectorAll('.book-artist-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const artistSlug = this.dataset.artist;
            
            // Get artist data to ensure consistency
            const artistData = ArtistManager.getArtistBySlug(artistSlug);
            if (!artistData) {
                console.error(`Artist not found: ${artistSlug}`);
                return;
            }
            
            // Scroll to booking form and pre-select the artist
            const bookingSection = document.getElementById('book');
            const artistSelect = document.getElementById('artist');
            
            if (bookingSection && artistSelect) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
                artistSelect.value = artistSlug;
                
                // Add visual feedback with consistent colors
                artistSelect.style.background = '#A70000';
                artistSelect.style.color = '#F5F3F0';
                setTimeout(() => {
                    artistSelect.style.background = '';
                    artistSelect.style.color = '';
                }, 2000);
            }
        });
    });
    
    // Add click effect to artist cards
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add data attributes for enhanced functionality
        const artistSlug = card.dataset.artist;
        const artistData = ArtistManager.getArtistBySlug(artistSlug);
        if (artistData) {
            card.setAttribute('data-specialty', artistData.specialty);
            card.setAttribute('data-experience', artistData.experience);
            card.setAttribute('data-portfolio-count', artistData.portfolio ? artistData.portfolio.length : 0);
        }
    });
    
    // Intersection Observer for scroll animations
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
    
    // Observe all artist cards
    artistCards.forEach(card => {
        observer.observe(card);
    });
    
    // Handle return navigation from portfolio pages
    handleReturnNavigation();
});

/**
 * Handle return navigation from portfolio pages with visual feedback
 */
function handleReturnNavigation() {
    const navigationSource = sessionStorage.getItem('navigationSource');
    const sourceArtist = sessionStorage.getItem('sourceArtist');
    
    if (navigationSource === 'artist-card' && sourceArtist) {
        // Skip the return navigation indicator popup
        // showReturnNavigationIndicator(sourceArtist);
        
        // Highlight the source artist card
        const sourceCard = document.querySelector(`[data-artist="${sourceArtist}"]`);
        if (sourceCard) {
            // Scroll to the artist card
            setTimeout(() => {
                sourceCard.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                // Add highlight effect
                sourceCard.classList.add('return-highlight');
                setTimeout(() => {
                    sourceCard.classList.remove('return-highlight');
                }, 3000);
            }, 500);
        }
        
        // Clear navigation context
        sessionStorage.removeItem('navigationSource');
        sessionStorage.removeItem('sourceArtist');
    }
}

/**
 * Show return navigation indicator
 * @param {string} artistSlug - Artist slug that was visited
 */
function showReturnNavigationIndicator(artistSlug) {
    const artistData = ArtistManager.getArtistBySlug(artistSlug);
    if (!artistData) return;
    
    // Create indicator element
    const indicator = document.createElement('div');
    indicator.className = 'navigation-return-indicator';
    indicator.innerHTML = `
        <span>↩️</span>
        <span>Returned from ${artistData.name}'s portfolio</span>
    `;
    
    document.body.appendChild(indicator);
    
    // Show indicator
    setTimeout(() => {
        indicator.classList.add('show');
    }, 100);
    
    // Hide indicator after 4 seconds
    setTimeout(() => {
        indicator.classList.remove('show');
        setTimeout(() => {
            indicator.remove();
        }, 300);
    }, 4000);
}

// Artist data utility functions
const ArtistUtils = {
    /**
     * Get artist data for booking form population
     * @param {string} artistSlug - Artist slug
     * @returns {Object|null} - Artist data for booking
     */
    getBookingData(artistSlug) {
        const artist = ArtistManager.getArtistBySlug(artistSlug);
        if (!artist) return null;
        
        return {
            slug: artist.slug,
            name: artist.name,
            specialty: artist.specialty,
            experience: artist.experience
        };
    },
    
    /**
     * Get portfolio preview data for artist cards
     * @param {string} artistSlug - Artist slug
     * @param {number} limit - Number of preview images
     * @returns {Array} - Preview portfolio images
     */
    getPortfolioPreview(artistSlug, limit = 3) {
        const portfolio = ArtistManager.getArtistPortfolio(artistSlug);
        if (!portfolio) return [];
        
        return portfolio.slice(0, limit);
    },
    
    /**
     * Get artist statistics for display
     * @param {string} artistSlug - Artist slug
     * @returns {Object} - Artist statistics
     */
    getArtistStats(artistSlug) {
        const artist = ArtistManager.getArtistBySlug(artistSlug);
        if (!artist) return null;
        
        const portfolio = artist.portfolio || [];
        const styles = new Set(portfolio.map(img => img.style));
        
        return {
            portfolioCount: portfolio.length,
            uniqueStyles: styles.size,
            stylesList: Array.from(styles),
            experience: artist.experience,
            rating: artist.rating
        };
    }
};

// Make utility functions globally available
window.ArtistUtils = ArtistUtils;
