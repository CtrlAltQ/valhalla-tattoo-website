/**
 * ========================================
 * BLOG/NEWS DATA MANAGEMENT SYSTEM
 * ========================================
 * 
 * This file contains all blog posts and news updates for your studio.
 * This is where you'll add new blog posts and manage content!
 * 
 * COMMON TASKS:
 * - Add new blog post → Add to BlogData.posts array
 * - Update existing post → Edit the post object
 * - Change categories → Update or add new category
 * - Feature/unfeature posts → Change featured: true/false
 * 
 * HOW TO ADD A NEW BLOG POST:
 * 1. Copy an existing post object below
 * 2. Paste it at the TOP of the posts array (most recent first)
 * 3. Update all the fields with your new content
 * 4. Save file and refresh website
 */

// ========================================
// BLOG POST DATA & MANAGEMENT
// ========================================

const BlogData = {
    
    // BLOG CATEGORIES - Add new categories here
    categories: [
        'All',           // Don't remove this - it shows all posts
        'Studio News',
        'Artist Updates', 
        'Community',
        'Events',
        'Promotions',
        'Tips & Aftercare',
        'Behind the Scenes'
    ],
    
    // BLOG POSTS - Add new posts at the TOP (most recent first)
    // Each post needs these fields:
    // - id: Unique number (use next number in sequence)
    // - title: Post headline
    // - date: YYYY-MM-DD format
    // - category: Must match one of the categories above
    // - excerpt: Short preview text (1-2 sentences)
    // - content: Full post content (can include HTML)
    // - tags: Array of keywords for search
    // - featured: true/false (featured posts show differently)
    // - author: Who wrote the post
    // - image: Optional image filename (put in images/blog/)
    
    posts: [
        {
            id: 2,
            title: "Yay! We Have a New Website!",
            date: "2025-08-02", 
            category: "Studio News",
            excerpt: "We're excited to launch our brand new website with enhanced portfolio browsing and easy appointment booking.",
            content: `
                <p>We're thrilled to announce the launch of our completely redesigned website! After months of planning and development, we've created a platform that makes it easier than ever to connect with our studio.</p>
                
                <h3>What's New?</h3>
                <ul>
                    <li><strong>Enhanced Artist Portfolios:</strong> Browse detailed galleries of each artist's work with filtering options</li>
                    <li><strong>Easy Online Booking:</strong> Schedule your consultation directly through our contact form</li>
                    <li><strong>Studio News:</strong> Stay updated with the latest happenings at Valhalla</li>
                    <li><strong>Mobile Optimized:</strong> Perfect experience on any device</li>
                </ul>
                
                <p>We've also added a newsletter signup so you'll never miss important updates, new artist announcements, or special promotions. Welcome to the new digital home of Valhalla Tattoo!</p>
                
                <p>Have feedback about the new site? We'd love to hear from you - drop us a message through our contact form.</p>
            `,
            tags: ['website', 'launch', 'new features', 'portfolio'],
            featured: false,
            author: "Valhalla Team",
            image: null
        },
        
        {
            id: 1,
            title: "Thank You for the School Supplies Drive!",
            date: "2025-08-01",
            category: "Community", 
            excerpt: "A huge thank you to everyone who contributed to our school supplies drive for local students.",
            content: `
                <p>We're overwhelmed by the incredible generosity our community showed during our back-to-school supplies drive! Thanks to your donations, we were able to provide essential school supplies to over 150 local students.</p>
                
                <h3>What We Accomplished Together</h3>
                <ul>
                    <li>150+ backpacks filled with supplies</li>
                    <li>300+ notebooks and folders distributed</li>
                    <li>Countless pencils, pens, and art supplies</li>
                    <li>Special art kits for creative students</li>
                </ul>
                
                <p>The smiles on the kids' faces when they received their supplies reminded us why community involvement is so important to us. At Valhalla Tattoo, we believe in supporting the community that supports us.</p>
                
                <h3>What's Next?</h3>
                <p>Keep an eye out for our upcoming community events! We're already planning our next initiative and would love your continued support. Follow our social media or sign up for our newsletter to stay informed about upcoming community projects.</p>
                
                <p>Thank you again for making this drive such a success. You've made a real difference in our community!</p>
            `,
            tags: ['community', 'school supplies', 'giving back', 'charity'],
            featured: false,
            author: "Valhalla Team", 
            image: "school-supplies-drive.jpg"
        }
        
        // EXAMPLE TEMPLATE - Copy this structure to add new posts:
        /*
        {
            id: 3,                                  // Use next number in sequence
            title: "Your Blog Post Title",         // Post headline
            date: "2025-MM-DD",                    // Date in YYYY-MM-DD format
            category: "Studio News",               // Pick from categories above
            excerpt: "Short preview text...",       // 1-2 sentence summary
            content: `
                <p>Your full blog post content goes here.</p>
                <h3>You can use HTML formatting</h3>
                <ul><li>Like lists</li></ul>
            `,
            tags: ['keyword1', 'keyword2'],        // Search keywords
            featured: false,                       // true for important posts
            author: "Your Name",                   // Who wrote it
            image: "optional-photo.jpg"            // Optional (goes in images/blog/)
        }
        */
    ]
};

// ========================================
// BLOG MANAGEMENT UTILITIES
// ========================================

const BlogManager = {
    
    /**
     * Get all blog posts
     * @returns {Array} - All blog posts
     */
    getAllPosts() {
        return BlogData.posts;
    },
    
    /**
     * Get posts by category
     * @param {string} category - Category name
     * @returns {Array} - Filtered posts
     */
    getPostsByCategory(category) {
        if (category === 'All') {
            return BlogData.posts;
        }
        return BlogData.posts.filter(post => post.category === category);
    },
    
    /**
     * Get featured posts
     * @returns {Array} - Featured posts only
     */
    getFeaturedPosts() {
        return BlogData.posts.filter(post => post.featured);
    },
    
    /**
     * Search posts by title, excerpt, or tags
     * @param {string} searchTerm - Search query
     * @returns {Array} - Matching posts
     */
    searchPosts(searchTerm) {
        const term = searchTerm.toLowerCase();
        return BlogData.posts.filter(post => 
            post.title.toLowerCase().includes(term) ||
            post.excerpt.toLowerCase().includes(term) ||
            post.tags.some(tag => tag.toLowerCase().includes(term))
        );
    },
    
    /**
     * Get post by ID
     * @param {number} id - Post ID
     * @returns {Object|null} - Post object or null
     */
    getPostById(id) {
        return BlogData.posts.find(post => post.id === id) || null;
    },
    
    /**
     * Get recent posts
     * @param {number} limit - Number of posts to return
     * @returns {Array} - Recent posts
     */
    getRecentPosts(limit = 5) {
        return BlogData.posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit);
    },
    
    /**
     * Format date for display
     * @param {string} dateString - Date in YYYY-MM-DD format
     * @returns {string} - Formatted date
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    },
    
    /**
     * Get all unique tags
     * @returns {Array} - Array of unique tags
     */
    getAllTags() {
        const tags = new Set();
        BlogData.posts.forEach(post => {
            post.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    },
    
    /**
     * Get posts by tag
     * @param {string} tag - Tag name
     * @returns {Array} - Posts with matching tag
     */
    getPostsByTag(tag) {
        return BlogData.posts.filter(post => 
            post.tags.includes(tag.toLowerCase())
        );
    }
};

// ========================================
// HOW TO USE THIS FILE
// ========================================

/*
ADDING A NEW BLOG POST:

1. Copy this template:
{
    id: [NEXT_NUMBER],
    title: "Your Post Title Here",
    date: "2025-MM-DD",
    category: "Studio News",
    excerpt: "Short preview of your post (1-2 sentences)",
    content: `
        <p>Your full post content goes here.</p>
        <h3>You can use HTML tags</h3>
        <ul>
            <li>Like lists</li>
            <li>And other formatting</li>
        </ul>
    `,
    tags: ['keyword1', 'keyword2', 'keyword3'],
    featured: false,
    author: "Your Name",
    image: "optional-image.jpg"
}

2. Paste it at the TOP of the posts array above
3. Update all the fields with your content
4. Save the file

TIPS:
- Use highest ID number + 1 for new posts
- Date format: YYYY-MM-DD (like 2025-03-15)
- Categories must match those in the categories array
- Images go in images/blog/ folder
- Use featured: true for important announcements
*/

// Make blog data available to other scripts
if (typeof window !== 'undefined') {
    window.BlogData = BlogData;
    window.BlogManager = BlogManager;
}

// For Node.js environments (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BlogData, BlogManager };
}