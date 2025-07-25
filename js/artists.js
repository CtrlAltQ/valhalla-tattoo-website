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
                // Add loading feedback
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.background = '#BFA46F';
                
                // Add smooth transition effect
                artistCard.style.transform = 'scale(0.98)';
                artistCard.style.opacity = '0.8';
                
                // Navigate to portfolio with slight delay for visual feedback
                setTimeout(() => {
                    window.location.href = `portfolio/${artistSlug}.html`;
                }, 300);
            } else {
                console.error(`Artist not found: ${artistSlug}`);
                // Show error feedback
                this.textContent = 'Error';
                this.style.background = '#dc2626';
                setTimeout(() => {
                    this.textContent = 'View Portfolio';
                    this.style.background = '#A70000';
                }, 1500);
                
                // Fallback to main artists section
                document.getElementById('artists').scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Add enhanced hover preview
        button.addEventListener('mouseenter', function() {
            const artistCard = this.closest('.artist-card');
            const artistSlug = artistCard.dataset.artist;
            const artistData = ArtistManager.getArtistBySlug(artistSlug);
            
            if (artistData && artistData.portfolio) {
                // Update button text with portfolio count
                this.setAttribute('title', `View ${artistData.portfolio.length} portfolio pieces`);
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
});

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

// Add CSS for ripple effect and highlights
const style = document.createElement('style');
style.textContent = `
    .artist-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(167, 0, 0, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .portfolio-item.highlighted {
        transform: scale(1.05);
        box-shadow: 0 0 30px rgba(167, 0, 0, 0.6);
        transition: all 0.3s ease;
    }
    
    .animate-in {
        animation: slideInFromBottom 0.8s ease forwards;
    }
    
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Enhanced artist card data attributes styling */
    .artist-card[data-portfolio-count="0"]::after {
        content: "Portfolio Coming Soon";
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(167, 0, 0, 0.8);
        color: #F5F3F0;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: bold;
    }
    
    /* Portfolio count indicator */
    .artist-card[data-portfolio-count]:not([data-portfolio-count="0"])::before {
        content: attr(data-portfolio-count) " pieces";
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(191, 164, 111, 0.9);
        color: #0B0B0B;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: bold;
    }
`;
document.head.appendChild(style);