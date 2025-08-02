// Test script to verify the complete navigation flow
// This script can be run in the browser console to test the functionality

console.log('🧪 Testing Portfolio Navigation Flow...');

// Test 1: Verify all artist cards have portfolio buttons
function testPortfolioButtons() {
    console.log('\n📋 Test 1: Portfolio Buttons');
    
    const artistCards = document.querySelectorAll('.artist-card');
    const portfolioButtons = document.querySelectorAll('.view-portfolio-btn');
    
    console.log(`✓ Found ${artistCards.length} artist cards`);
    console.log(`✓ Found ${portfolioButtons.length} portfolio buttons`);
    
    if (artistCards.length === portfolioButtons.length && artistCards.length === 5) {
        console.log('✅ All artist cards have portfolio buttons');
        return true;
    } else {
        console.log('❌ Mismatch in artist cards and portfolio buttons');
        return false;
    }
}

// Test 2: Verify artist data attributes
function testArtistDataAttributes() {
    console.log('\n📋 Test 2: Artist Data Attributes');
    
    const expectedArtists = ['micah', 'james-pegan', 'jimmy', 'kason', 'sarah'];
    const artistCards = document.querySelectorAll('.artist-card');
    
    let validCards = 0;
    artistCards.forEach(card => {
        const artistSlug = card.dataset.artist;
        if (expectedArtists.includes(artistSlug)) {
            validCards++;
            console.log(`✓ ${artistSlug} card has valid data attribute`);
        } else {
            console.log(`❌ ${artistSlug} card has invalid data attribute`);
        }
    });
    
    if (validCards === 5) {
        console.log('✅ All artist cards have valid data attributes');
        return true;
    } else {
        console.log(`❌ Only ${validCards}/5 cards have valid data attributes`);
        return false;
    }
}

// Test 3: Verify booking form integration
function testBookingIntegration() {
    console.log('\n📋 Test 3: Booking Integration');
    
    const bookingForm = document.querySelector('#book form');
    const artistSelect = document.getElementById('artist');
    
    if (!bookingForm) {
        console.log('❌ Booking form not found');
        return false;
    }
    
    if (!artistSelect) {
        console.log('❌ Artist select not found');
        return false;
    }
    
    const options = artistSelect.querySelectorAll('option');
    console.log(`✓ Found booking form with ${options.length} artist options`);
    
    if (options.length === 5) {
        console.log('✅ Booking form has all 5 artists');
        return true;
    } else {
        console.log(`❌ Expected 5 artist options, found ${options.length}`);
        return false;
    }
}

// Test 4: Simulate portfolio navigation
function testPortfolioNavigation() {
    console.log('\n📋 Test 4: Portfolio Navigation Simulation');
    
    // Test sessionStorage functionality
    const testArtist = 'micah';
    sessionStorage.setItem('selectedArtist', testArtist);
    
    const storedArtist = sessionStorage.getItem('selectedArtist');
    if (storedArtist === testArtist) {
        console.log('✅ SessionStorage working correctly');
        sessionStorage.removeItem('selectedArtist'); // Clean up
        return true;
    } else {
        console.log('❌ SessionStorage not working');
        return false;
    }
}

// Test 5: Verify navigation transitions
function testNavigationTransitions() {
    console.log('\n📋 Test 5: Navigation Transitions');
    
    // Check if CSS transitions are defined
    const artistCard = document.querySelector('.artist-card');
    if (!artistCard) {
        console.log('❌ No artist card found for transition test');
        return false;
    }
    
    const computedStyle = window.getComputedStyle(artistCard);
    const transition = computedStyle.transition;
    
    if (transition && transition !== 'none') {
        console.log('✅ CSS transitions are defined');
        return true;
    } else {
        console.log('❌ No CSS transitions found');
        return false;
    }
}

// Run all tests
function runAllTests() {
    console.log('🚀 Running Complete Navigation Flow Tests...\n');
    
    const tests = [
        testPortfolioButtons,
        testArtistDataAttributes,
        testBookingIntegration,
        testPortfolioNavigation,
        testNavigationTransitions
    ];
    
    let passedTests = 0;
    tests.forEach((test, index) => {
        try {
            if (test()) {
                passedTests++;
            }
        } catch (error) {
            console.log(`❌ Test ${index + 1} failed with error:`, error);
        }
    });
    
    console.log(`\n📊 Test Results: ${passedTests}/${tests.length} tests passed`);
    
    if (passedTests === tests.length) {
        console.log('🎉 All tests passed! Portfolio navigation is working correctly.');
    } else {
        console.log('⚠️ Some tests failed. Please check the implementation.');
    }
    
    return passedTests === tests.length;
}

// Auto-run tests if this script is executed
if (typeof window !== 'undefined' && window.document) {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAllTests);
    } else {
        runAllTests();
    }
}

// Export for manual testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testPortfolioButtons,
        testArtistDataAttributes,
        testBookingIntegration,
        testPortfolioNavigation,
        testNavigationTransitions,
        runAllTests
    };
}