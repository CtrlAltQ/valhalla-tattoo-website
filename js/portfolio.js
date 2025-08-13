// Simplified Portfolio Gallery JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    const currentArtistSlug = getCurrentArtistSlug();
    if (!currentArtistSlug) return;

    const artistData = ArtistManager.getArtistBySlug(currentArtistSlug);
    if (!artistData) return;

    renderPortfolioGallery(artistData);
}

function getCurrentArtistSlug() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename.replace('.html', '');
}

function renderPortfolioGallery(artistData) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid || !artistData.portfolio) return;

    portfolioGrid.innerHTML = '';

    artistData.portfolio.forEach((image, index) => {
        const card = createPortfolioCard(image, artistData.slug, index);
        portfolioGrid.appendChild(card);
    });
}

function createPortfolioCard(image, artistSlug, index) {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    
    const img = document.createElement('img');
    img.src = `../images/portfolio/${artistSlug}/${image.filename}`;
    img.alt = `Tattoo by ${ArtistManager.getArtistBySlug(artistSlug)?.name || artistSlug}`;
    img.loading = 'lazy';
    
    card.appendChild(img);
    
    // Add click handler to open lightbox
    card.addEventListener('click', () => {
        openLightbox(artistSlug, index);
    });
    
    return card;
}

// Simple lightbox functionality
let currentLightbox = null;
let currentArtist = null;
let currentIndex = 0;

function openLightbox(artistSlug, imageIndex) {
    const artistData = ArtistManager.getArtistBySlug(artistSlug);
    if (!artistData || !artistData.portfolio) return;

    currentArtist = artistData;
    currentIndex = imageIndex;

    if (!document.querySelector('.lightbox-overlay')) {
        createLightbox();
    }

    updateLightbox();
    document.querySelector('.lightbox-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createLightbox() {
    const lightboxHTML = `
        <div class="lightbox-overlay">
            <div class="lightbox-container">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">‹</button>
                <button class="lightbox-next">›</button>
                <img class="lightbox-image" src="" alt="" />
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Add event listeners
    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
    document.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));
    document.querySelector('.lightbox-overlay').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (!document.querySelector('.lightbox-overlay.active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigateLightbox(-1);
                break;
            case 'ArrowRight':
                navigateLightbox(1);
                break;
        }
    });
}

function updateLightbox() {
    if (!currentArtist) return;
    
    const image = currentArtist.portfolio[currentIndex];
    const lightboxImage = document.querySelector('.lightbox-image');
    
    lightboxImage.src = `../images/portfolio/${currentArtist.slug}/${image.filename}`;
    lightboxImage.alt = `Tattoo by ${currentArtist.name}`;
    
    // Update navigation buttons
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    prevBtn.style.display = currentIndex > 0 ? 'block' : 'none';
    nextBtn.style.display = currentIndex < currentArtist.portfolio.length - 1 ? 'block' : 'none';
}

function navigateLightbox(direction) {
    if (!currentArtist) return;
    
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < currentArtist.portfolio.length) {
        currentIndex = newIndex;
        updateLightbox();
    }
}

function closeLightbox() {
    const overlay = document.querySelector('.lightbox-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}