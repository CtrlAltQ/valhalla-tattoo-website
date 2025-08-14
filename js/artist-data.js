/**
 * ========================================
 * ARTIST DATA - PORTFOLIO & INFORMATION
 * ========================================
 * 
 * This file contains all artist information and portfolio images.
 * This is where you'll make most of your updates!
 * 
 * COMMON TASKS:
 * - Add new portfolio photos → Add to artist's portfolio array
 * - Update artist bio → Change description or extendedBio
 * - Change artist specialty → Update specialty field
 * - Reorder artists → Change order in ArtistData object
 * 
 * HOW TO ADD A NEW PORTFOLIO PHOTO:
 * 1. Upload photo to images/portfolio/[artist-name]/
 * 2. Add new object to artist's portfolio array (see examples below)
 * 3. Save file and refresh website
 */

// Data validation utilities
const DataValidator = {
    /**
     * Validates portfolio image metadata
     * @param {Object} image - Portfolio image object
     * @returns {Object} - Validation result with isValid boolean and errors array
     */
    validatePortfolioImage(image) {
        const errors = [];
        
        // Required fields validation
        if (!image.id || typeof image.id !== 'number') {
            errors.push('Image ID is required and must be a number');
        }
        
        if (!image.filename || typeof image.filename !== 'string') {
            errors.push('Filename is required and must be a string');
        }
        
        if (!image.title || typeof image.title !== 'string') {
            errors.push('Title is required and must be a string');
        }
        
        if (!image.style || typeof image.style !== 'string') {
            errors.push('Style is required and must be a string');
        }
        
        if (!image.placement || typeof image.placement !== 'string') {
            errors.push('Placement is required and must be a string');
        }
        
        if (!image.sessionTime || typeof image.sessionTime !== 'string') {
            errors.push('Session time is required and must be a string');
        }
        
        // Optional fields validation
        if (image.description && typeof image.description !== 'string') {
            errors.push('Description must be a string');
        }
        
        if (image.tags && !Array.isArray(image.tags)) {
            errors.push('Tags must be an array');
        }
        
        if (image.beforeImage && typeof image.beforeImage !== 'string') {
            errors.push('Before image must be a string');
        }
        
        if (image.isHealed !== undefined && typeof image.isHealed !== 'boolean') {
            errors.push('isHealed must be a boolean');
        }
        
        // Style validation against allowed values
        const allowedStyles = ['Traditional', 'Realism', 'Black & Grey', 'Neo-Traditional', 'Illustrative', 'Fineline', 'Minimalist', 'Watercolor', 'Blackwork', 'Norse'];
        if (image.style && !allowedStyles.includes(image.style)) {
            errors.push(`Style must be one of: ${allowedStyles.join(', ')}`);
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },
    
    /**
     * Validates artist data structure
     * @param {Object} artist - Artist object
     * @returns {Object} - Validation result with isValid boolean and errors array
     */
    validateArtist(artist) {
        const errors = [];
        
        // Required fields validation
        if (!artist.slug || typeof artist.slug !== 'string') {
            errors.push('Artist slug is required and must be a string');
        }
        
        if (!artist.name || typeof artist.name !== 'string') {
            errors.push('Artist name is required and must be a string');
        }
        
        if (!artist.specialty || typeof artist.specialty !== 'string') {
            errors.push('Artist specialty is required and must be a string');
        }
        
        if (!artist.experience || typeof artist.experience !== 'string') {
            errors.push('Artist experience is required and must be a string');
        }
        
        if (!artist.description || typeof artist.description !== 'string') {
            errors.push('Artist description is required and must be a string');
        }
        
        // Portfolio validation
        if (artist.portfolio && Array.isArray(artist.portfolio)) {
            artist.portfolio.forEach((image, index) => {
                const imageValidation = this.validatePortfolioImage(image);
                if (!imageValidation.isValid) {
                    errors.push(`Portfolio image ${index + 1}: ${imageValidation.errors.join(', ')}`);
                }
            });
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
};

// ========================================
// ARTIST INFORMATION & PORTFOLIOS
// ========================================
// 
// Each artist has these fields you can edit:
// - name: Display name
// - specialty: What styles they specialize in
// - experience: How many years of experience
// - description: Short bio for listings
// - extendedBio: Longer bio for their portfolio page
// - portfolio: Array of their tattoo photos
//
// ARTIST ORDER: The order here determines the order on the website
// Currently: Pagan (first), Micah, Jimmy, Kason, Sarah (last)

const ArtistData = {
    
    // ========================================
    // PAGAN - Lead Artist
    // ========================================
    pagan: {
        slug: 'pagan',
        name: 'Pagan',
        specialty: 'Norse Blackwork & Realism',
        experience: '10+ years',
        rating: '★★★★★',
        description: 'Master of Norse-inspired blackwork and photorealistic portraits. Creates powerful, meaningful pieces with incredible detail.',
        extendedBio: 'With over a decade of experience, James has become renowned for his Norse-inspired blackwork and incredibly detailed realistic portraits. His deep knowledge of Norse mythology and symbolism allows him to create meaningful pieces that resonate with clients seeking powerful, spiritual tattoos.',
        philosophy: 'Tattooing is a sacred art form that connects us to ancient traditions. I strive to honor both the craft and the client\'s story in every piece I create.',
        socialMedia: {
            instagram: '@thevalhallatattoo',
            facebook: 'Valhallatattoollc'
        },
        
        // PORTFOLIO PHOTOS - Add new tattoos here
        // Each photo needs these fields:
        // - id: Unique number (use next number in sequence)  
        // - filename: Photo filename (must match file in images/portfolio/pagan/)
        // - title: Descriptive title for the tattoo
        // - style: Art style (Traditional, Realism, Blackwork, etc.)
        // - placement: Body location (Back, Arm, Chest, etc.)  
        // - sessionTime: How long the tattoo took
        // - description: Description of the tattoo
        // - tags: Array of keywords for filtering ['norse', 'blackwork', etc.]
        // - isHealed: true if photo shows healed tattoo, false if fresh
        
        portfolio: [
            {
                id: 1,
                filename: 'norse-raven.jpg',
                title: 'Norse Raven',
                style: 'Norse',
                placement: 'Shoulder',
                sessionTime: '6 hours',
                description: 'Powerful Norse raven with intricate blackwork details',
                tags: ['norse', 'raven', 'blackwork', 'mythology'],
                isHealed: true
            },
            {
                id: 2,
                filename: 'realistic-portrait.jpg',
                title: 'Realistic Portrait',
                style: 'Realism',
                placement: 'Forearm',
                sessionTime: '8 hours',
                description: 'Photorealistic portrait with incredible detail and shading',
                tags: ['realism', 'portrait', 'detailed', 'photorealistic'],
                isHealed: true
            },
            {
                id: 3,
                filename: '20250729_145017.jpg',
                title: 'Norse Blackwork Design',
                style: 'Blackwork',
                placement: 'Back',
                sessionTime: '10 hours',
                description: 'Large Norse-inspired blackwork piece with traditional symbolism',
                tags: ['norse', 'blackwork', 'large', 'traditional'],
                isHealed: true
            },
            {
                id: 4,
                filename: 'IMG_3111.jpg',
                title: 'Celtic Knot Detail',
                style: 'Blackwork',
                placement: 'Wrist',
                sessionTime: '3 hours',
                description: 'Intricate Celtic knot work with precise linework',
                tags: ['celtic', 'blackwork', 'knot', 'intricate'],
                isHealed: true
            },
            {
                id: 5,
                filename: 'IMG_3129.jpg',
                title: 'Viking Symbol',
                style: 'Norse',
                placement: 'Chest',
                sessionTime: '5 hours',
                description: 'Traditional Viking symbol with bold blackwork execution',
                tags: ['viking', 'norse', 'symbol', 'blackwork'],
                isHealed: true
            },
            {
                id: 6,
                filename: 'image0(1).jpeg',
                title: 'Realistic Animal Portrait',
                style: 'Realism',
                placement: 'Thigh',
                sessionTime: '7 hours',
                description: 'Detailed animal portrait showcasing realistic technique',
                tags: ['realism', 'animal', 'portrait', 'detailed'],
                isHealed: true
            },
            {
                id: 7,
                filename: 'image0(3).jpeg',
                title: 'Norse Mythology Scene',
                style: 'Norse',
                placement: 'Upper Arm',
                sessionTime: '9 hours',
                description: 'Complex Norse mythology scene with multiple elements',
                tags: ['norse', 'mythology', 'complex', 'scene'],
                isHealed: true
            },
            {
                id: 8,
                filename: 'image1(2).jpeg',
                title: 'Blackwork Geometric',
                style: 'Blackwork',
                placement: 'Forearm',
                sessionTime: '4 hours',
                description: 'Geometric blackwork design with precise patterns',
                tags: ['blackwork', 'geometric', 'patterns', 'precise'],
                isHealed: true
            },
            {
                id: 9,
                filename: 'image1.jpeg',
                title: 'Viking Warrior',
                style: 'Realism',
                placement: 'Calf',
                sessionTime: '8 hours',
                description: 'Realistic Viking warrior with detailed armor and features',
                tags: ['viking', 'warrior', 'realism', 'detailed'],
                isHealed: true
            }
        ]
    },
    
    // ========================================
    // MICAH - Traditional & Black & Grey
    // ========================================
    micah: {
        slug: 'micah',
        name: 'Micah',
        specialty: 'Traditional & Black & Grey',
        experience: '8+ years',
        rating: '★★★★★',
        description: 'Bold traditional designs with expert black and grey work. Specializes in classic American traditional and detailed realism.',
        extendedBio: 'Micah has been perfecting the art of traditional tattooing for over 8 years, drawing inspiration from classic American traditional artists while incorporating modern techniques. His expertise in black and grey work allows him to create stunning realistic portraits and detailed shading that brings tattoos to life.',
        philosophy: 'Every tattoo should tell a story. I work closely with each client to ensure their vision becomes a timeless piece of art that they\'ll be proud to wear forever.',
        socialMedia: {
            instagram: '@micah_valhalla',
            facebook: 'micah.valhalla.tattoo'
        },
        portfolio: [
            {
                id: 1,
                filename: 'blackgrey-portrait.jpg',
                title: 'Black & Grey Portrait',
                style: 'Black & Grey',
                placement: 'Forearm',
                sessionTime: '6 hours',
                description: 'Detailed black and grey portrait showcasing realistic shading',
                tags: ['portrait', 'black-grey', 'realistic', 'detailed'],
                isHealed: true
            },
            {
                id: 2,
                filename: 'traditional-eagle.jpg',
                title: 'Traditional Eagle',
                style: 'Traditional',
                placement: 'Chest',
                sessionTime: '4 hours',
                description: 'Classic American traditional eagle with bold lines',
                tags: ['traditional', 'eagle', 'bold', 'classic'],
                isHealed: true
            },
            {
                id: 3,
                filename: 'traditional-rose.jpg',
                title: 'Traditional Rose',
                style: 'Traditional',
                placement: 'Shoulder',
                sessionTime: '3 hours',
                description: 'Vibrant traditional rose with classic styling',
                tags: ['traditional', 'rose', 'vibrant', 'classic'],
                isHealed: true
            },
            {
                id: 4,
                filename: 'Messenger_creation_263C33BD-0726-46E3-8FE0-E7BD0C494296.jpeg',
                title: 'Custom Traditional Piece',
                style: 'Traditional',
                placement: 'Upper Arm',
                sessionTime: '5 hours',
                description: 'Bold traditional tattoo with custom design elements',
                tags: ['traditional', 'custom', 'bold', 'detailed'],
                isHealed: true
            },
            {
                id: 5,
                filename: 'Messenger_creation_3101BC6C-B9BD-4C12-AEF6-9B1667A9C184.jpeg',
                title: 'Black & Grey Shading',
                style: 'Black & Grey',
                placement: 'Leg',
                sessionTime: '4 hours',
                description: 'Expert black and grey work with smooth shading',
                tags: ['black-grey', 'shading', 'smooth', 'expert'],
                isHealed: true
            },
            {
                id: 6,
                filename: 'Messenger_creation_4C1CC18F-1D13-4E87-8BCF-23C95B16FC2A.jpeg',
                title: 'Traditional Design',
                style: 'Traditional',
                placement: 'Forearm',
                sessionTime: '3.5 hours',
                description: 'Clean traditional tattoo with bold color work',
                tags: ['traditional', 'clean', 'bold', 'colorwork'],
                isHealed: true
            },
            {
                id: 7,
                filename: 'Messenger_creation_51D6B834-A69A-4429-BD20-FDFF80B50B83.jpeg',
                title: 'Detailed Black Work',
                style: 'Black & Grey',
                placement: 'Back',
                sessionTime: '7 hours',
                description: 'Intricate black and grey piece with fine detail',
                tags: ['black-grey', 'detailed', 'intricate', 'large'],
                isHealed: true
            },
            {
                id: 8,
                filename: 'Messenger_creation_7332848750778413037.jpeg',
                title: 'Traditional Flash',
                style: 'Traditional',
                placement: 'Calf',
                sessionTime: '2.5 hours',
                description: 'Classic flash design with traditional execution',
                tags: ['traditional', 'flash', 'classic', 'small'],
                isHealed: true
            },
            {
                id: 9,
                filename: 'Messenger_creation_7332848750782917803.jpeg',
                title: 'Black & Grey Portrait',
                style: 'Black & Grey',
                placement: 'Ribcage',
                sessionTime: '6 hours',
                description: 'Realistic portrait work in black and grey',
                tags: ['portrait', 'black-grey', 'realistic', 'detailed'],
                isHealed: true
            },
            {
                id: 10,
                filename: 'Messenger_creation_7332848750783349603.jpeg',
                title: 'Traditional Anchor',
                style: 'Traditional',
                placement: 'Wrist',
                sessionTime: '2 hours',
                description: 'Small traditional anchor with clean lines',
                tags: ['traditional', 'anchor', 'small', 'clean'],
                isHealed: true
            },
            {
                id: 11,
                filename: 'Messenger_creation_7332848750784236948.jpeg',
                title: 'Grey Scale Work',
                style: 'Black & Grey',
                placement: 'Thigh',
                sessionTime: '5 hours',
                description: 'Stunning grey scale tattoo with depth',
                tags: ['black-grey', 'greyscale', 'depth', 'stunning'],
                isHealed: true
            },
            {
                id: 12,
                filename: 'Messenger_creation_CCAB9748-CB96-4E28-B528-D89253D97CB4.jpeg',
                title: 'Traditional Banner',
                style: 'Traditional',
                placement: 'Arm',
                sessionTime: '3 hours',
                description: 'Bold traditional banner with script lettering',
                tags: ['traditional', 'banner', 'script', 'bold'],
                isHealed: true
            },
            {
                id: 13,
                filename: 'Messenger_creation_D59A6904-6065-4078-A0AE-B8889D4DB6DD.jpeg',
                title: 'Black & Grey Realism',
                style: 'Black & Grey',
                placement: 'Shoulder',
                sessionTime: '6 hours',
                description: 'Photorealistic black and grey tattoo',
                tags: ['black-grey', 'realism', 'photorealistic', 'detailed'],
                isHealed: true
            },
            {
                id: 14,
                filename: 'Messenger_creation_F51EDE92-0E39-4170-B60F-C9A4571A860D.jpeg',
                title: 'Traditional Snake',
                style: 'Traditional',
                placement: 'Forearm',
                sessionTime: '4 hours',
                description: 'Classic traditional snake with bold shading',
                tags: ['traditional', 'snake', 'bold', 'classic'],
                isHealed: true
            },
            {
                id: 15,
                filename: 'Screenshot_20250529_045831_Facebook.jpg',
                title: 'Custom Black & Grey',
                style: 'Black & Grey',
                placement: 'Chest',
                sessionTime: '8 hours',
                description: 'Large custom black and grey piece',
                tags: ['black-grey', 'custom', 'large', 'detailed'],
                isHealed: true
            }
        ]
    },
    
    // ========================================
    // JIMMY - Illustrative & Neo-Traditional
    // ========================================
    jimmy: {
        slug: 'jimmy',
        name: 'Jimmy',
        specialty: 'Illustrative & Neo-Traditional',
        experience: '6+ years',
        rating: '★★★★★',
        description: 'Detailed illustrative designs with a modern twist. Known for vibrant colors and intricate linework in neo-traditional style.',
        extendedBio: 'Jimmy brings a fresh perspective to traditional tattooing with his illustrative and neo-traditional approach. His background in graphic design shines through in his bold use of color and innovative compositions that push the boundaries of traditional tattoo art.',
        philosophy: 'Art should evolve while respecting its roots. I love taking classic tattoo elements and giving them a modern, illustrative twist that feels both timeless and contemporary.',
        socialMedia: {
            instagram: '@jimmy_illustrative',
            facebook: 'jimmy.valhalla.tattoo'
        },
        portfolio: [
            {
                id: 1,
                filename: 'FB_IMG_1754792182200.jpg',
                title: 'Illustrative Design',
                style: 'Illustrative',
                placement: 'Arm',
                sessionTime: '5 hours',
                description: 'Creative illustrative tattoo with detailed linework and shading',
                tags: ['illustrative', 'detailed', 'linework', 'creative'],
                isHealed: true
            },
            {
                id: 2,
                filename: 'FB_IMG_1754792184630.jpg',
                title: 'Neo-Traditional Piece',
                style: 'Neo-Traditional',
                placement: 'Leg',
                sessionTime: '6 hours',
                description: 'Bold neo-traditional tattoo with vibrant colors and modern styling',
                tags: ['neo-traditional', 'color', 'bold', 'modern'],
                isHealed: true
            },
            {
                id: 3,
                filename: 'FB_IMG_1754792186833.jpg',
                title: 'Custom Artwork',
                style: 'Illustrative',
                placement: 'Forearm',
                sessionTime: '4 hours',
                description: 'Custom illustrative design with unique artistic elements',
                tags: ['illustrative', 'custom', 'artistic', 'unique'],
                isHealed: true
            },
            {
                id: 4,
                filename: 'FB_IMG_1754792189094.jpg',
                title: 'Detailed Illustration',
                style: 'Illustrative',
                placement: 'Upper Arm',
                sessionTime: '5 hours',
                description: 'Intricate illustrative work with fine detail and precision',
                tags: ['illustrative', 'detailed', 'intricate', 'precision'],
                isHealed: true
            },
            {
                id: 5,
                filename: 'FB_IMG_1754792191890.jpg',
                title: 'Neo-Traditional Art',
                style: 'Neo-Traditional',
                placement: 'Shoulder',
                sessionTime: '4 hours',
                description: 'Stylized neo-traditional tattoo with contemporary flair',
                tags: ['neo-traditional', 'stylized', 'contemporary', 'artistic'],
                isHealed: true
            },
            {
                id: 6,
                filename: 'FB_IMG_1754792208078.jpg',
                title: 'Illustrative Design',
                style: 'Illustrative',
                placement: 'Back',
                sessionTime: '7 hours',
                description: 'Large-scale illustrative piece with complex composition',
                tags: ['illustrative', 'large-scale', 'complex', 'composition'],
                isHealed: true
            },
            {
                id: 7,
                filename: 'FB_IMG_1754792232185.jpg',
                title: 'Creative Artwork',
                style: 'Illustrative',
                placement: 'Thigh',
                sessionTime: '6 hours',
                description: 'Creative illustrative tattoo showcasing artistic innovation',
                tags: ['illustrative', 'creative', 'innovative', 'artistic'],
                isHealed: true
            },
            {
                id: 8,
                filename: 'FB_IMG_1754792253508.jpg',
                title: 'Neo-Traditional Design',
                style: 'Neo-Traditional',
                placement: 'Calf',
                sessionTime: '5 hours',
                description: 'Modern neo-traditional piece with bold color work',
                tags: ['neo-traditional', 'modern', 'bold', 'colorwork'],
                isHealed: true
            },
            {
                id: 9,
                filename: 'FB_IMG_1754792255949.jpg',
                title: 'Illustrative Piece',
                style: 'Illustrative',
                placement: 'Ribcage',
                sessionTime: '6 hours',
                description: 'Flowing illustrative design with organic elements',
                tags: ['illustrative', 'flowing', 'organic', 'artistic'],
                isHealed: true
            },
            {
                id: 10,
                filename: 'FB_IMG_1754792270756.jpg',
                title: 'Custom Design',
                style: 'Illustrative',
                placement: 'Forearm',
                sessionTime: '4 hours',
                description: 'Personalized illustrative tattoo with meaningful symbolism',
                tags: ['illustrative', 'custom', 'symbolic', 'meaningful'],
                isHealed: true
            },
            {
                id: 11,
                filename: 'FB_IMG_1754792295914.jpg',
                title: 'Neo-Traditional Art',
                style: 'Neo-Traditional',
                placement: 'Upper Arm',
                sessionTime: '5 hours',
                description: 'Vibrant neo-traditional tattoo with contemporary elements',
                tags: ['neo-traditional', 'vibrant', 'contemporary', 'artistic'],
                isHealed: true
            }
        ]
    },
    
    // ========================================
    // KASON - Fineline & Minimalist  
    // ========================================
    kason: {
        slug: 'kason',
        name: 'Kason',
        specialty: 'Fineline & Minimalist',
        experience: '5+ years',
        rating: '★★★★★',
        description: 'Mystical and minimal fineline tattoos with incredible precision. Specializes in delicate, meaningful designs with clean execution.',
        extendedBio: 'Kason has mastered the delicate art of fineline tattooing, creating intricate designs that appear almost ethereal on the skin. His minimalist approach focuses on clean lines, precise execution, and meaningful symbolism that speaks to the soul.',
        philosophy: 'Less is more. Every line should have purpose, every element should contribute to the overall harmony of the design. Precision and intention are everything.',
        socialMedia: {
            instagram: '@kason_fineline',
            facebook: 'kason.valhalla.tattoo'
        },
        portfolio: [
            {
                id: 1,
                filename: 'IMG_20250610_143859.heic',
                title: 'Delicate Fineline Design',
                style: 'Fineline',
                placement: 'Wrist',
                sessionTime: '2 hours',
                description: 'Precise fineline tattoo showcasing minimal elegance',
                tags: ['fineline', 'minimal', 'delicate', 'precise'],
                isHealed: true
            },
            {
                id: 2,
                filename: 'IMG_20250610_143911.heic',
                title: 'Minimalist Symbol',
                style: 'Minimalist',
                placement: 'Forearm',
                sessionTime: '1.5 hours',
                description: 'Clean minimalist design with meaningful symbolism',
                tags: ['minimalist', 'symbolic', 'clean', 'meaningful'],
                isHealed: true
            },
            {
                id: 3,
                filename: 'IMG_20250610_143914.heic',
                title: 'Fine Line Art',
                style: 'Fineline',
                placement: 'Ankle',
                sessionTime: '2.5 hours',
                description: 'Intricate fineline work with ethereal quality',
                tags: ['fineline', 'intricate', 'ethereal', 'artistic'],
                isHealed: true
            },
            {
                id: 4,
                filename: 'IMG_20250610_143946.heic',
                title: 'Minimal Composition',
                style: 'Minimalist',
                placement: 'Behind Ear',
                sessionTime: '1 hour',
                description: 'Subtle minimal tattoo with perfect placement',
                tags: ['minimalist', 'subtle', 'placement', 'small'],
                isHealed: true
            }
        ]
    },
    
    // ========================================
    // SARAH - Creative & Elegant
    // ========================================
    sarah: {
        slug: 'sarah',
        name: 'Sarah',
        specialty: 'Creative & Elegant',
        experience: '7+ years',
        rating: '★★★★★',
        description: 'Creative and elegant tattoo work with a focus on feminine designs. Expert in watercolor techniques and botanical illustrations.',
        extendedBio: 'Sarah brings an elegant, feminine touch to tattooing with her expertise in watercolor techniques and botanical illustrations. Her artistic background in fine arts allows her to create flowing, organic designs that celebrate natural beauty and feminine strength.',
        philosophy: 'Tattoos should enhance natural beauty and celebrate individuality. I love creating pieces that flow with the body\'s natural curves and tell each client\'s unique story.',
        socialMedia: {
            instagram: '@sarah_watercolor',
            facebook: 'sarah.valhalla.tattoo'
        },
        portfolio: [
            {
                id: 1,
                filename: 'FB_IMG_1754792189094.jpg',
                title: 'Watercolor Rose',
                style: 'Watercolor',
                placement: 'Shoulder',
                sessionTime: '4 hours',
                description: 'A vibrant watercolor rose with a soft, blended effect.',
                tags: ['watercolor', 'rose', 'botanical', 'color'],
                isHealed: true
            },
            {
                id: 2,
                filename: 'FB_IMG_1754792232185.jpg',
                title: 'Elegant Botanical Illustration',
                style: 'Illustrative',
                placement: 'Thigh',
                sessionTime: '5 hours',
                description: 'An elegant botanical piece with fine lines and a delicate feel.',
                tags: ['illustrative', 'botanical', 'elegant', 'feminine'],
                isHealed: false
            }
        ]
    },
    
    // ========================================
    // HEATHER - Creative & Detail-Oriented
    // ========================================
    heather: {
        slug: 'heather',
        name: 'Heather',
        specialty: 'Creative & Detail-Oriented',
        experience: '4+ years',
        rating: '★★★★★',
        description: 'Creative and detail-oriented tattoo artist with a passion for bringing unique designs to life.',
        extendedBio: 'Heather brings fresh creativity and meticulous attention to detail to every piece she creates. With a growing portfolio and dedication to her craft, she specializes in creating meaningful tattoos that reflect each client\'s individual style and story.',
        philosophy: 'Every tattoo should be as unique as the person wearing it. I take pride in working closely with clients to create something truly special.',
        socialMedia: {
            instagram: '@heather_valhalla',
            facebook: 'heather.valhalla.tattoo'
        },
        portfolio: [
            {
                id: 1,
                filename: 'FB_IMG_1754792182200.jpg',
                title: 'Creative Custom Piece',
                style: 'Illustrative',
                placement: 'Arm',
                sessionTime: '5 hours',
                description: 'A creative and unique custom design with intricate details.',
                tags: ['creative', 'custom', 'detailed', 'illustrative'],
                isHealed: true
            }
        ]
    }
};

// Artist management utilities
const ArtistManager = {
    /**
     * Get all artists data
     * @returns {Object} - All artists data
     */
    getAllArtists() {
        return ArtistData;
    },
    
    /**
     * Get artist by slug
     * @param {string} slug - Artist slug
     * @returns {Object|null} - Artist data or null if not found
     */
    getArtistBySlug(slug) {
        return ArtistData[slug] || null;
    },
    
    /**
     * Get artist portfolio by slug
     * @param {string} slug - Artist slug
     * @returns {Array|null} - Portfolio array or null if artist not found
     */
    getArtistPortfolio(slug) {
        const artist = this.getArtistBySlug(slug);
        return artist ? artist.portfolio : null;
    },
    
    /**
     * Get portfolio image by artist slug and image ID
     * @param {string} slug - Artist slug
     * @param {number} imageId - Image ID
     * @returns {Object|null} - Portfolio image or null if not found
     */
    getPortfolioImage(slug, imageId) {
        const portfolio = this.getArtistPortfolio(slug);
        if (!portfolio) return null;
        
        return portfolio.find(image => image.id === imageId) || null;
    },
    
    /**
     * Filter portfolio by style
     * @param {string} slug - Artist slug
     * @param {string} style - Style to filter by
     * @returns {Array} - Filtered portfolio images
     */
    filterPortfolioByStyle(slug, style) {
        const portfolio = this.getArtistPortfolio(slug);
        if (!portfolio) return [];
        
        return portfolio.filter(image => image.style === style);
    },
    
    /**
     * Filter portfolio by tags
     * @param {string} slug - Artist slug
     * @param {Array} tags - Tags to filter by
     * @returns {Array} - Filtered portfolio images
     */
    filterPortfolioByTags(slug, tags) {
        const portfolio = this.getArtistPortfolio(slug);
        if (!portfolio) return [];
        
        return portfolio.filter(image => 
            tags.some(tag => image.tags && image.tags.includes(tag))
        );
    },
    
    /**
     * Get all unique styles across all artists
     * @returns {Array} - Array of unique styles
     */
    getAllStyles() {
        const styles = new Set();
        Object.values(ArtistData).forEach(artist => {
            if (artist.portfolio) {
                artist.portfolio.forEach(image => {
                    styles.add(image.style);
                });
            }
        });
        return Array.from(styles).sort();
    },
    
    /**
     * Get all unique tags across all artists
     * @returns {Array} - Array of unique tags
     */
    getAllTags() {
        const tags = new Set();
        Object.values(ArtistData).forEach(artist => {
            if (artist.portfolio) {
                artist.portfolio.forEach(image => {
                    if (image.tags) {
                        image.tags.forEach(tag => tags.add(tag));
                    }
                });
            }
        });
        return Array.from(tags).sort();
    },
    
    /**
     * Validate all artist data
     * @returns {Object} - Validation results for all artists
     */
    validateAllData() {
        const results = {};
        Object.keys(ArtistData).forEach(slug => {
            results[slug] = DataValidator.validateArtist(ArtistData[slug]);
        });
        return results;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ArtistData, ArtistManager, DataValidator };
} else {
    // Browser environment
    window.ArtistData = ArtistData;
    window.ArtistManager = ArtistManager;
    window.DataValidator = DataValidator;
}