/**
 * WEBSITE CONFIGURATION - EASY SETTINGS TO CHANGE
 * 
 * This file contains the most commonly changed settings for your website.
 * When you need to update contact info, social links, or other basic details,
 * change them here instead of hunting through multiple files.
 */

const WebsiteConfig = {
    
    // ==========================================
    // STUDIO CONTACT INFORMATION
    // ==========================================
    
    studioInfo: {
        name: "Valhalla Tattoo",
        address: {
            street: "404 McLemor Ave, Ste 4",
            city: "Spring Hill",
            state: "TN", 
            zip: "37174",
            // This creates the full address display
            get full() {
                return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
            },
            // This creates the two-line address display
            get twoLine() {
                return `${this.street}<br>${this.city}, ${this.state} ${this.zip}`;
            }
        },
        phone: "931-451-5313",
        hours: "Mon–Fri, 8am–5pm",
        email: "info@valhallatattoo.com" // Update this with real email
    },

    // ==========================================
    // SOCIAL MEDIA LINKS
    // ==========================================
    
    socialMedia: {
        instagram: "https://www.instagram.com/thevalhallatattoo/",
        facebook: "https://www.facebook.com/Valhallatattoollc",
        twitter: "https://twitter.com/valhallatattoo"
    },

    // ==========================================
    // WEBSITE COLORS (HEX CODES)
    // ==========================================
    
    colors: {
        // Main brand colors
        darkBackground: "#0B0B0B",      // Dark black background
        lightText: "#F5F3F0",           // Light cream text
        goldAccent: "#BFA46F",          // Gold accent color
        goldLight: "#D4B885",           // Lighter gold for hovers
        
        // Supporting colors
        darkGray: "#333",               // Dark gray borders/dividers
        mediumGray: "#666",             // Medium gray for placeholders
        lightGray: "#ccc",              // Light gray for secondary text
        
        // Status colors
        success: "#2ecc71",             // Green for success messages
        error: "#e74c3c",               // Red for error messages
        warning: "#f39c12"              // Orange for warnings
    },

    // ==========================================
    // NEWSLETTER SETTINGS
    // ==========================================
    
    newsletter: {
        // Set this to true once you've set up MailerLite
        mailerliteEnabled: false,
        
        // Your MailerLite API key goes here
        mailerliteApiKey: "YOUR_MAILERLITE_API_KEY",
        
        // Newsletter signup messages
        messages: {
            success: "✓ Thank you! You're subscribed to our mailing list.",
            error: "⚠ Please try again or contact us directly.",
            invalidEmail: "Please enter a valid email address.",
            subscribing: "Subscribing...",
            subscribe: "Subscribe"
        }
    },

    // ==========================================
    // ARTIST ORDER (TOP TO BOTTOM)
    // ==========================================
    
    artistOrder: [
        'pagan',    // Shows first
        'micah', 
        'jimmy',
        'kason',
        'sarah',
        'heather'   // Shows last
    ],

    // ==========================================
    // WEBSITE METADATA
    // ==========================================
    
    meta: {
        title: "Valhalla Tattoo - Professional Tattoo Studio in Spring Hill, TN",
        description: "Valhalla Tattoo offers professional tattooing by expert artists in Spring Hill, TN. Book your custom tattoo or explore our portfolio.",
        keywords: "tattoo, Valhalla Tattoo, Spring Hill TN, custom tattoos, Norse tattoos, professional tattoo studio"
    }
};

// ==========================================
// HOW TO USE THIS CONFIG FILE
// ==========================================

/*
COMMON UPDATES:

1. CHANGE STUDIO ADDRESS:
   Update WebsiteConfig.studioInfo.address values above

2. CHANGE PHONE NUMBER:
   Update WebsiteConfig.studioInfo.phone above

3. UPDATE SOCIAL MEDIA:
   Update links in WebsiteConfig.socialMedia above

4. CHANGE WEBSITE COLORS:
   Update hex codes in WebsiteConfig.colors above

5. SET UP MAILERLITE:
   - Change WebsiteConfig.newsletter.mailerliteEnabled to true
   - Add your API key to WebsiteConfig.newsletter.mailerliteApiKey

6. REORDER ARTISTS:
   Change the order in WebsiteConfig.artistOrder array above
*/

// Make config available to other scripts
if (typeof window !== 'undefined') {
    window.WebsiteConfig = WebsiteConfig;
}

// For Node.js environments (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebsiteConfig;
}