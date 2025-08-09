/**
 * ========================================
 * STUDIO PAGE - BLOG/NEWS FUNCTIONALITY
 * ========================================
 * 
 * This file handles all the blog functionality on the studio page.
 * It loads posts from blog-data.js and handles search, filtering, and pagination.
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // BLOG SYSTEM INITIALIZATION
    // ========================================
    
    let currentPosts = [];
    let displayedPosts = [];
    let postsPerPage = 5;
    let currentPage = 1;
    
    // Initialize all blog functionality
    initializeBlogSystem();
    
    /**
     * Initialize the complete blog system
     */
    function initializeBlogSystem() {
        loadBlogCategories();
        loadAllPosts();
        initializeSearch();
        initializeFiltering();
        initializePagination();
        initializeAnimations();
    }
    
    // ========================================
    // BLOG POST LOADING & DISPLAY
    // ========================================
    
    /**
     * Load and display all blog posts
     */
    function loadAllPosts() {
        showLoading();
        
        // Get all posts from BlogManager
        currentPosts = BlogManager.getAllPosts();
        displayPosts(currentPosts);
        updatePaginationInfo();
        
        hideLoading();
    }
    
    /**
     * Display posts in the timeline
     * @param {Array} posts - Posts to display
     */
    function displayPosts(posts) {
        const container = document.getElementById('blog-posts-container');
        const noResults = document.getElementById('no-results');
        
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        if (posts.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        // Calculate posts to show based on current page
        const startIndex = 0;
        const endIndex = currentPage * postsPerPage;
        displayedPosts = posts.slice(startIndex, endIndex);
        
        // Create timeline items for each post
        displayedPosts.forEach(post => {
            const timelineItem = createTimelineItem(post);
            container.appendChild(timelineItem);
        });
        
        // Update load more button visibility
        updateLoadMoreButton(posts);
        
        // Apply animations to new items
        animateTimelineItems();
    }
    
    /**
     * Create a timeline item element from post data
     * @param {Object} post - Post data
     * @returns {HTMLElement} - Timeline item element
     */
    function createTimelineItem(post) {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        // Add featured class if post is featured
        if (post.featured) {
            timelineItem.classList.add('featured-post');
        }
        
        // Create post content
        const formattedDate = BlogManager.formatDate(post.date);
        const tagsHtml = post.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        timelineItem.innerHTML = `
            <div class="timeline-date">
                <span class="date">${formattedDate}</span>
                ${post.featured ? '<span class="featured-badge">Featured</span>' : ''}
            </div>
            <div class="timeline-content">
                <div class="post-header">
                    <h3>${post.title}</h3>
                    <div class="post-meta">
                        <span class="category">${post.category}</span>
                        ${post.author ? `<span class="author">by ${post.author}</span>` : ''}
                    </div>
                </div>
                
                ${post.image ? `<div class="post-image">
                    <img src="images/blog/${post.image}" alt="${post.title}" loading="lazy">
                </div>` : ''}
                
                <div class="post-excerpt">
                    <p>${post.excerpt}</p>
                </div>
                
                <div class="post-content" id="content-${post.id}" style="display: none;">
                    ${post.content}
                </div>
                
                <div class="post-actions">
                    <button class="btn-read-more" onclick="togglePostContent(${post.id})" id="btn-${post.id}">
                        Read More
                    </button>
                </div>
                
                <div class="timeline-tags">
                    ${tagsHtml}
                </div>
            </div>
        `;
        
        return timelineItem;
    }
    
    // ========================================
    // SEARCH & FILTERING
    // ========================================
    
    /**
     * Load blog categories into the filter dropdown
     */
    function loadBlogCategories() {
        const categorySelect = document.getElementById('category-filter');
        if (!categorySelect) return;
        
        // Clear existing options
        categorySelect.innerHTML = '';
        
        // Add categories from BlogData
        BlogData.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }
    
    /**
     * Initialize search functionality
     */
    function initializeSearch() {
        const searchInput = document.getElementById('blog-search');
        const searchButton = document.querySelector('.search-btn');
        
        if (!searchInput) return;
        
        // Search on input change (with debouncing)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch();
            }, 300);
        });
        
        // Search on button click
        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    
    /**
     * Perform search based on current search input
     */
    function performSearch() {
        const searchTerm = document.getElementById('blog-search').value.trim();
        const selectedCategory = document.getElementById('category-filter').value;
        
        let posts = BlogManager.getAllPosts();
        
        // Apply search filter
        if (searchTerm) {
            posts = BlogManager.searchPosts(searchTerm);
        }
        
        // Apply category filter
        if (selectedCategory && selectedCategory !== 'All') {
            posts = posts.filter(post => post.category === selectedCategory);
        }
        
        currentPosts = posts;
        currentPage = 1; // Reset to first page
        displayPosts(currentPosts);
        updatePaginationInfo();
    }
    
    /**
     * Initialize category filtering
     */
    function initializeFiltering() {
        const categorySelect = document.getElementById('category-filter');
        
        if (categorySelect) {
            categorySelect.addEventListener('change', performSearch);
        }
    }
    
    // ========================================
    // PAGINATION
    // ========================================
    
    /**
     * Initialize pagination controls
     */
    function initializePagination() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMorePosts);
        }
    }
    
    /**
     * Load more posts (pagination)
     */
    function loadMorePosts() {
        currentPage++;
        displayPosts(currentPosts);
        updatePaginationInfo();
    }
    
    /**
     * Update load more button visibility
     * @param {Array} allPosts - All available posts
     */
    function updateLoadMoreButton(allPosts) {
        const loadMoreBtn = document.getElementById('load-more-btn');
        const hasMorePosts = (currentPage * postsPerPage) < allPosts.length;
        
        if (loadMoreBtn) {
            loadMoreBtn.style.display = hasMorePosts ? 'inline-block' : 'none';
        }
    }
    
    /**
     * Update pagination information display
     */
    function updatePaginationInfo() {
        const postsCountSpan = document.getElementById('posts-count');
        const paginationInfo = document.getElementById('pagination-info');
        
        if (postsCountSpan && paginationInfo) {
            const totalPosts = currentPosts.length;
            const displayedCount = Math.min(currentPage * postsPerPage, totalPosts);
            
            postsCountSpan.textContent = `${displayedCount} of ${totalPosts}`;
            paginationInfo.style.display = totalPosts > 0 ? 'block' : 'none';
        }
    }
    
    // ========================================
    // UI HELPERS
    // ========================================
    
    /**
     * Show loading state
     */
    function showLoading() {
        const loading = document.getElementById('blog-loading');
        if (loading) {
            loading.style.display = 'block';
        }
    }
    
    /**
     * Hide loading state
     */
    function hideLoading() {
        const loading = document.getElementById('blog-loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }
    
    // ========================================
    // ANIMATIONS
    // ========================================
    
    /**
     * Initialize scroll animations
     */
    function initializeAnimations() {
        // Set up intersection observer for timeline items
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
        
        // Store observer for later use
        window.timelineObserver = observer;
    }
    
    /**
     * Apply animations to timeline items
     */
    function animateTimelineItems() {
        // Wait a bit for DOM to update
        setTimeout(() => {
            document.querySelectorAll('.timeline-item').forEach(item => {
                // Set initial state for animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                // Observe for intersection
                if (window.timelineObserver) {
                    window.timelineObserver.observe(item);
                }
            });
        }, 100);
    }
    
    // ========================================
    // SOCIAL MEDIA INTEGRATION (PLACEHOLDER)
    // ========================================
    
    /**
     * Initialize social media feeds
     */
    function initializeSocialFeeds() {
        // Placeholder for social media integration
        // In production, integrate with Instagram/Facebook APIs
        console.log('Social media feeds ready for API integration');
    }
    
    // Initialize social feeds
    initializeSocialFeeds();
});

// ========================================
// GLOBAL FUNCTIONS
// ========================================

/**
 * Toggle post content visibility (Read More functionality)
 * @param {number} postId - Post ID
 */
function togglePostContent(postId) {
    const content = document.getElementById(`content-${postId}`);
    const button = document.getElementById(`btn-${postId}`);
    
    if (content && button) {
        const isExpanded = content.style.display !== 'none';
        
        content.style.display = isExpanded ? 'none' : 'block';
        button.textContent = isExpanded ? 'Read More' : 'Read Less';
        
        // Smooth scroll to keep post in view when collapsing
        if (isExpanded) {
            const timelineItem = button.closest('.timeline-item');
            if (timelineItem) {
                timelineItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
}

// Export functions for external use if needed
window.StudioBlog = {
    togglePostContent
};