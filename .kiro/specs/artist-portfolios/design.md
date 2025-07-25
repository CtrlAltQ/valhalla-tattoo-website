# Design Document

## Overview

The artist portfolio feature will create individual portfolio pages for each of the five tattoo artists at Valhalla Tattoo (Micah, James Pegan, Jimmy, Kason, and Sarah). Each portfolio page will showcase the artist's work in a dedicated, immersive experience that maintains the existing site's dark, professional aesthetic while providing enhanced functionality for viewing tattoo work and booking appointments.

The design will leverage the existing design system including the dark color palette (#0B0B0B background, #BFA46F gold accents, #A70000 red highlights), typography (Inter font family, Bebas Neue Pro for headers), and responsive grid layouts. The portfolio pages will feel like a natural extension of the main site while providing specialized functionality for showcasing tattoo work.

## Architecture

### URL Structure
- Individual portfolio pages will use the pattern: `/portfolio/{artist-slug}.html`
- Artist slugs: `micah`, `james-pegan`, `jimmy`, `kason`, `sarah`
- Each portfolio page will be a standalone HTML file that can be accessed directly or via navigation from the main site

### Navigation Flow
1. User clicks "View Portfolio" button on artist card → Navigate to artist's portfolio page
2. Portfolio page displays artist info and tattoo gallery
3. User can click individual tattoos to view in lightbox/modal
4. User can book appointment directly from portfolio page
5. User can navigate back to main artists section

### File Structure
```
/
├── portfolio/
│   ├── micah.html
│   ├── james-pegan.html
│   ├── jimmy.html
│   ├── kason.html
│   └── sarah.html
├── css/
│   ├── portfolio.css (new)
│   └── existing files...
├── js/
│   ├── portfolio.js (new)
│   └── existing files...
└── images/
    └── portfolio/
        ├── micah/
        ├── james-pegan/
        ├── jimmy/
        ├── kason/
        └── sarah/
```

## Components and Interfaces

### 1. Portfolio Page Layout

**Header Section**
- Maintains existing main navigation from index.html
- Breadcrumb navigation: "Artists > [Artist Name]"
- Artist hero section with large profile image and key information

**Artist Info Section**
- Artist name, specialty, experience, and description (from existing data)
- Enhanced with additional details like artistic philosophy, favorite styles
- Social media links if available
- "Book with [Artist]" CTA button

**Portfolio Gallery Section**
- Responsive masonry/grid layout for tattoo images
- Image categories/filters (Traditional, Realism, Black & Grey, etc.)
- Hover effects showing basic tattoo info
- Click to open detailed view

**Booking Integration**
- Prominent booking section at bottom of page
- Pre-filled form with artist selection
- Smooth scroll to booking form on CTA click

### 2. Image Gallery Component

**Grid Layout**
- CSS Grid with responsive columns (4 cols desktop, 2 cols tablet, 1 col mobile)
- Masonry-style layout to accommodate different image aspect ratios
- Lazy loading for performance optimization

**Image Cards**
- Hover overlay with tattoo style, session info, placement
- Smooth transitions matching existing site animations
- Click handler to open detailed view

### 3. Lightbox/Modal Component

**Image Detail View**
- Full-screen overlay with large image display
- Navigation arrows for next/previous image
- Image metadata display (style, placement, session time)
- Close button and ESC key support
- Touch/swipe support for mobile navigation

**Accessibility Features**
- Focus trap within modal
- ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements

### 4. Booking Integration Component

**Enhanced Booking Form**
- Inherits styling from existing contact form
- Pre-selects current artist
- Additional fields for tattoo style preference, size, placement
- Visual confirmation of artist selection

## Data Models

### Artist Data Structure
```javascript
const artistData = {
  slug: 'micah',
  name: 'Micah',
  specialty: 'Traditional & Black & Grey',
  experience: '8+ years',
  rating: '★★★★★',
  description: 'Bold traditional designs with expert black and grey work...',
  extendedBio: 'Longer biography for portfolio page...',
  philosophy: 'Artist\'s approach to tattooing...',
  socialMedia: {
    instagram: '@micah_tattoo',
    facebook: 'micah.tattoo'
  },
  portfolio: [
    {
      id: 1,
      filename: 'traditional-eagle.jpg',
      title: 'Traditional Eagle',
      style: 'Traditional',
      placement: 'Upper Arm',
      sessionTime: '4 hours',
      description: 'Classic American traditional eagle...',
      tags: ['traditional', 'eagle', 'color']
    }
    // ... more portfolio items
  ]
}
```

### Portfolio Image Metadata
```javascript
const portfolioImage = {
  id: Number,
  filename: String,
  title: String,
  style: String, // 'Traditional', 'Realism', 'Black & Grey', etc.
  placement: String, // 'Upper Arm', 'Back', 'Leg', etc.
  sessionTime: String, // '2 hours', '6 hours', 'Multiple sessions'
  description: String,
  tags: Array, // For filtering functionality
  beforeImage: String, // Optional for cover-ups
  isHealed: Boolean // Show healed vs fresh
}
```

## Error Handling

### Image Loading
- Progressive image loading with blur-up technique
- Fallback placeholder images for failed loads
- Graceful degradation for slow connections
- Error boundaries for JavaScript failures

### Navigation Errors
- 404 handling for invalid artist slugs
- Fallback to main artists section on errors
- User-friendly error messages matching site design

### Form Submission
- Client-side validation with visual feedback
- Server-side validation error handling
- Success/failure state management
- Loading states during submission

## Testing Strategy

### Unit Testing
- Image gallery component functionality
- Lightbox navigation and keyboard controls
- Form validation logic
- Data model validation

### Integration Testing
- Navigation flow from main site to portfolios
- Booking form integration with existing backend
- Image loading and lazy loading behavior
- Responsive design across breakpoints

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation flow
- Color contrast validation
- Focus management in modals

### Performance Testing
- Image optimization and loading times
- Mobile performance on slower connections
- Bundle size impact of new JavaScript
- Core Web Vitals metrics

### Cross-Browser Testing
- Modern browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile browser testing (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## Visual Design Specifications

### Color Palette (Inherited)
- Primary Background: #0B0B0B
- Secondary Background: #121212
- Card Background: #1E1E1E
- Text Primary: #F5F3F0
- Text Secondary: #888
- Accent Gold: #BFA46F
- Accent Red: #A70000 (hover states, CTAs)

### Typography (Inherited)
- Body Text: 'Inter', sans-serif
- Headers: 'Bebas Neue Pro', sans-serif
- Consistent with existing site hierarchy

### Layout Specifications
- Max-width: 1200px (consistent with existing)
- Grid gaps: 2rem (consistent with existing)
- Border radius: 8px for cards, 4px for buttons
- Consistent padding and margins with existing components

### Animation and Transitions
- Hover effects: 100ms ease-out (consistent with existing)
- Transform effects: translateY(-2px) on hover
- Box shadows: 0 0 10px #A70000 for hover states
- Smooth scrolling for navigation
- Fade-in animations for image loading

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px
- Consistent with existing site breakpoints

## Implementation Considerations

### Performance Optimization
- Image compression and WebP format support
- Lazy loading for portfolio images
- CSS and JavaScript minification
- Critical CSS inlining for above-fold content

### SEO Optimization
- Individual meta tags for each portfolio page
- Structured data for artist information
- Optimized image alt tags
- Semantic HTML structure

### Accessibility Compliance
- WCAG 2.1 AA compliance
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Screen reader compatibility

### Browser Support
- Modern browsers (last 2 versions)
- Progressive enhancement approach
- Graceful degradation for older browsers
- Mobile-first responsive design