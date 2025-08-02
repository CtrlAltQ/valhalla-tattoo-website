/**
 * Artist Data Management System
 * Centralized data structure for artist information and portfolio management
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

// Centralized artist data with extended portfolio information
const ArtistData = {
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
                filename: 'traditional-eagle.jpg',
                title: 'Traditional Eagle',
                style: 'Traditional',
                placement: 'Upper Arm',
                sessionTime: '4 hours',
                description: 'Classic American traditional eagle with bold lines and vibrant colors',
                tags: ['traditional', 'eagle', 'color', 'american'],
                isHealed: true
            },
            {
                id: 2,
                filename: 'blackgrey-portrait.jpg',
                title: 'Portrait Study',
                style: 'Black & Grey',
                placement: 'Forearm',
                sessionTime: '6 hours',
                description: 'Detailed black and grey portrait with realistic shading',
                tags: ['portrait', 'blackgrey', 'realism'],
                isHealed: true
            },
            {
                id: 3,
                filename: 'traditional-rose.jpg',
                title: 'Traditional Rose',
                style: 'Traditional',
                placement: 'Shoulder',
                sessionTime: '3 hours',
                description: 'Bold traditional rose with classic color palette',
                tags: ['traditional', 'rose', 'color', 'floral'],
                isHealed: false
            },
            {
                id: 4,
                filename: 'coverup-before-after.jpg',
                title: 'Cover-up Transformation',
                style: 'Traditional',
                placement: 'Forearm',
                sessionTime: '8 hours',
                description: 'Complete cover-up transformation from old tribal to bold traditional eagle',
                tags: ['traditional', 'coverup', 'eagle', 'transformation'],
                beforeImage: 'coverup-before.jpg',
                isHealed: true
            }
        ]
    },
    
    pagen: {
        slug: 'pagen',
        name: 'Pagen',
        specialty: 'Norse Blackwork & Realism',
        experience: '10+ years',
        rating: '★★★★★',
        description: 'Master of Norse-inspired blackwork and photorealistic portraits. Creates powerful, meaningful pieces with incredible detail.',
        extendedBio: 'With over a decade of experience, James has become renowned for his Norse-inspired blackwork and incredibly detailed realistic portraits. His deep knowledge of Norse mythology and symbolism allows him to create meaningful pieces that resonate with clients seeking powerful, spiritual tattoos.',
        philosophy: 'Tattooing is a sacred art form that connects us to ancient traditions. I strive to honor both the craft and the client\'s story in every piece I create.',
        socialMedia: {
            instagram: '@jamespegan_tattoo',
            facebook: 'james.pegan.tattoo'
        },
        portfolio: [
            {
                id: 1,
                filename: 'norse-raven.jpg',
                title: 'Odin\'s Ravens',
                style: 'Blackwork',
                placement: 'Back',
                sessionTime: '8 hours',
                description: 'Detailed Norse ravens representing Huginn and Muninn with intricate knotwork',
                tags: ['norse', 'blackwork', 'ravens', 'mythology'],
                isHealed: true
            },
            {
                id: 2,
                filename: 'realistic-portrait.jpg',
                title: 'Memorial Portrait',
                style: 'Realism',
                placement: 'Chest',
                sessionTime: '10 hours',
                description: 'Photorealistic memorial portrait with incredible detail and emotion',
                tags: ['portrait', 'realism', 'memorial'],
                isHealed: true
            },
            {
                id: 3,
                filename: 'scar-coverup-after.jpg',
                title: 'Scar Cover-up',
                style: 'Blackwork',
                placement: 'Upper Arm',
                sessionTime: '6 hours',
                description: 'Artistic blackwork design covering surgical scars with Norse-inspired patterns',
                tags: ['blackwork', 'coverup', 'norse', 'healing'],
                beforeImage: 'scar-coverup-before.jpg',
                isHealed: true
            }
        ]
    },
    
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
                filename: 'neo-traditional-wolf.jpg',
                title: 'Neo-Traditional Wolf',
                style: 'Neo-Traditional',
                placement: 'Thigh',
                sessionTime: '7 hours',
                description: 'Vibrant neo-traditional wolf with geometric elements and bold colors',
                tags: ['neo-traditional', 'wolf', 'geometric', 'color'],
                isHealed: false
            },
            {
                id: 2,
                filename: 'illustrative-flowers.jpg',
                title: 'Botanical Illustration',
                style: 'Illustrative',
                placement: 'Forearm',
                sessionTime: '5 hours',
                description: 'Detailed botanical illustration with watercolor elements',
                tags: ['illustrative', 'botanical', 'flowers', 'watercolor'],
                isHealed: true
            },
            {
                id: 3,
                filename: 'old-tattoo-rework.jpg',
                title: 'Vintage Tattoo Rework',
                style: 'Neo-Traditional',
                placement: 'Calf',
                sessionTime: '4 hours',
                description: 'Complete rework of an old faded tattoo into vibrant neo-traditional design',
                tags: ['neo-traditional', 'rework', 'vintage', 'color'],
                beforeImage: 'old-tattoo-before.jpg',
                isHealed: false
            }
        ]
    },
    
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
                filename: 'fineline-mandala.jpg',
                title: 'Sacred Geometry',
                style: 'Fineline',
                placement: 'Wrist',
                sessionTime: '3 hours',
                description: 'Intricate fineline mandala with sacred geometry elements',
                tags: ['fineline', 'mandala', 'geometry', 'sacred'],
                isHealed: true
            },
            {
                id: 2,
                filename: 'minimalist-moon.jpg',
                title: 'Lunar Phases',
                style: 'Minimalist',
                placement: 'Spine',
                sessionTime: '2 hours',
                description: 'Minimalist representation of lunar phases with delicate linework',
                tags: ['minimalist', 'moon', 'phases', 'delicate'],
                isHealed: false
            }
        ]
    },
    
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
                filename: 'watercolor-butterfly.jpg',
                title: 'Watercolor Butterfly',
                style: 'Watercolor',
                placement: 'Shoulder Blade',
                sessionTime: '4 hours',
                description: 'Delicate watercolor butterfly with flowing color transitions',
                tags: ['watercolor', 'butterfly', 'feminine', 'color'],
                isHealed: true
            },
            {
                id: 2,
                filename: 'botanical-wreath.jpg',
                title: 'Botanical Wreath',
                style: 'Illustrative',
                placement: 'Ribcage',
                sessionTime: '6 hours',
                description: 'Elegant botanical wreath with detailed floral elements',
                tags: ['botanical', 'wreath', 'floral', 'elegant'],
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