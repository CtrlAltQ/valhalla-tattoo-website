// Studio Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize studio page features
    initializeLoadMore();
    initializeSocialFeeds();
    
    // Load More Timeline Items
    function initializeLoadMore() {
        const loadMoreBtn = document.querySelector('.load-more-btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                loadMoreTimelineItems();
            });
        }
    }
    
    function loadMoreTimelineItems() {
        const timeline = document.querySelector('.timeline');
        const loadMoreBtn = document.querySelector('.load-more-btn');
        
        // No additional timeline items - only showing real studio updates
        const additionalItems = [];
        
        additionalItems.forEach(item => {
            const timelineItem = createTimelineItem(item);
            timeline.appendChild(timelineItem);
        });
        
        // Hide load more button after loading
        loadMoreBtn.style.display = 'none';
    }
    
    function createTimelineItem(item) {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-date">
                <span class="date">${item.date}</span>
            </div>
            <div class="timeline-content">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
                <div class="timeline-tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        return timelineItem;
    }
    
    // Social Media Feed Integration
    function initializeSocialFeeds() {
        // Note: For real implementation, you would integrate with actual social media APIs
        // This is a placeholder structure for demonstration
        
        // Instagram feed placeholder
        const instagramFeed = document.getElementById('instagram-feed');
        if (instagramFeed) {
            // In a real implementation, you would use Instagram Basic Display API
            // or a service like Elfsight, SnapWidget, or Taggbox
            console.log('Instagram feed container ready for API integration');
        }
        
        // Facebook feed placeholder
        const facebookFeed = document.getElementById('facebook-feed');
        if (facebookFeed) {
            // In a real implementation, you would use Facebook Graph API
            // or Facebook Page Plugin
            console.log('Facebook feed container ready for API integration');
        }
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation to timeline items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe timeline items for animations
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// Social Media Integration Functions
// These functions provide a structure for integrating with social media APIs

function loadInstagramFeed() {
    // Placeholder for Instagram feed loading
    // In production, you would use Instagram Basic Display API
    // or a third-party service like:
    // - Elfsight Instagram Feed
    // - SnapWidget
    // - Taggbox
    
    const instagramContainer = document.getElementById('instagram-feed');
    if (instagramContainer) {
        // Example structure for Instagram posts
        const samplePosts = [
            {
                id: '1',
                image: 'https://via.placeholder.com/300x300',
                caption: 'Latest tattoo work by our amazing artists...',
                permalink: 'https://instagram.com/p/example1'
            },
            // Add more sample posts
        ];
        
        // Render posts (this would be replaced with actual API data)
        // renderInstagramPosts(samplePosts);
    }
}

function loadFacebookFeed() {
    // Placeholder for Facebook feed loading
    // In production, you would use Facebook Graph API
    // or Facebook Page Plugin
    
    const facebookContainer = document.getElementById('facebook-feed');
    if (facebookContainer) {
        // Facebook Page Plugin can be embedded directly:
        // <div class="fb-page" 
        //      data-href="https://www.facebook.com/Valhallatattoollc"
        //      data-tabs="timeline"
        //      data-width="500"
        //      data-height="500"
        //      data-small-header="false"
        //      data-adapt-container-width="true"
        //      data-hide-cover="false"
        //      data-show-facepile="true">
        // </div>
    }
}

// Export functions for use in other scripts if needed
window.StudioPage = {
    loadInstagramFeed,
    loadFacebookFeed
};