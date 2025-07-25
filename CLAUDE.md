# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ToMoreBeyond is a Japanese technology company website featuring an interactive 8-bit retro game with gamification elements. The site uses an 8bitcn.com-inspired design system with a walking pixel art character that gains experience by viewing cards.

## Architecture

### Core Structure
- **Self-contained single-page application**: All code embedded in `index.html` for simplicity
- **Horizontal scrolling game**: Character moves left-to-right through card collection
- **Vanilla JavaScript**: No frameworks, pure JavaScript game engine
- **8bitcn design system**: Pixel-perfect borders, dashed lines, retro typography
- **Fixed viewport**: No vertical scrolling, 100vh height
- **Background video system**: 8-bit retro game aesthetic with performance optimizations

### Key Components

#### Main Game Engine (MinimalSite class in `index.html`)
- **Level System**: Players gain 1 level per card click (max level 12)
- **Character Controller**: Pixel art character with jump functionality
- **Card System**: 12 simplified cards without section dividers
- **Audio System**: Web Audio API for 8-bit sound effects
- **Notification System**: Completion notification when all cards are viewed
- **LocalStorage**: Progress persistence across browser sessions

#### Game Initialization System
- **GameInitializer**: Loading sequence and DOM ready initialization
- **Critical CSS**: Inlined for fast rendering, non-critical CSS in `<style>` tags
- **Card Creation**: Dynamic HTML generation from `cardsData` array
- **Performance Optimization**: Hardware acceleration and memory management

#### Game Features
- **Leveling**: `currentLevel`, `viewedCards` Set, experience tracking with persistence
- **Character States**: Walking animations, jumping, color change at max level
- **Sound Effects**: Level up, jump, walk, completion sounds via Web Audio API
- **Visual Feedback**: Level display UI, experience bar, completion effects
- **Accessibility**: ARIA attributes, keyboard navigation, screen reader support
- **Mobile Controls**: Touch-based drag controls for character movement, arrow buttons with long-press support
- **Desktop Controls**: Vertical scroll for horizontal movement, keyboard navigation (arrow keys, space for jump)

### File Organization
```
/index.html              - Main game interface (self-contained with embedded CSS/JS)
/detail/                - Card detail pages for individual content
/pages/                 - Product pages (tadataka.html, toirun.html, etc.)
/css/                   - Legacy CSS files (currently unused)
/js/components/         - Legacy JS modules (currently unused)
/assets/                - Media content specifications and brand guidelines
/metadata.json          - Site-wide metadata and SEO configuration
/site.webmanifest       - PWA manifest file
/VIDEO_SETUP.md         - Background video configuration guide
/.gitignore             - Excludes large video files (backvideo.mp4)
```

### Current Architecture Notes
- **Monolithic Structure**: All game logic, styles, and data are embedded in `index.html`
- **No Build Process**: Direct HTML/CSS/JS - no compilation or bundling required
- **Static Hosting**: Can be served from any static file server
- **Legacy Files**: External CSS/JS files exist but are not currently used

## Development Commands

Static HTML site - no build process required:

```bash
# Local development
python -m http.server 8000
# or
npx serve .
```

## Key Technical Details

### Game Mechanics
- **Experience System**: Click-based leveling, 1 level per card click
- **Starting Position**: Character begins at position 0 (leftmost card)
- **Card Interaction**: Only card clicks trigger level progression
- **Jump Mechanics**: 0.6s animation, accessible via click/tap/spacebar
  - Normal jump: 80px height with `jumpAnimation` keyframes
  - Star state jump: 400px height with `maxLevelJumpAnimation` keyframes
- **Completion Trigger**: Level 12 triggers red character color change and super jump
- **Star State Features**: Red color with glow effect, 5x jump height, same walking animation
- **Reset Function**: RESET button clears LocalStorage and returns to level 1

### 8bitcn Design Implementation
- **Colors**: Dark theme (#0f172a, #1e293b), accent colors (#22c55e, #3b82f6, #eab308)
- **Fonts**: Orbitron (headers), Share Tech Mono (content), pixelated rendering
- **Card Design**: 6px dashed borders, pixel-perfect corners, 8-bit shadow effects
- **Text Rendering**: `image-rendering: pixelated`, hard shadows
- **Unified Design**: All detail pages follow consistent 8-bit aesthetic
- **Navigation**: Consistent navbar with "← BACK TO GAME" button across all pages

### Responsive Breakpoints
- Mobile: ≤768px (adjusted card sizes, smaller fonts, touch optimizations)
- Desktop: >768px (full-size cards, hover effects)

## Content Management

### Card Data Structure (embedded in index.html)
```javascript
{
  icon: '[]',         // ASCII icon
  title: '会社概要',  // Japanese title
  description: 'MICHI NAKI MICHI WO KIRU', // Uppercase description
  section: 'company', // Section grouping
  link: 'detail/company.html'
}
```

### Current Card Configuration
- **Total Cards**: 12 (simplified from original 18)
- **Sections**: company, apps, members, media, contact
- **No Dividers**: Section divider cards removed for UX simplicity
- **Embedded Data**: All card data is in `window.cardsData` array within index.html

### Adding Game Elements
- **Levels**: Modify `this.maxLevel = 12` and adjust `cardsData` array length
- **Cards**: Add entries to `cardsData` array in `loadGameData()` method
- **Sounds**: Add cases to `play8BitSound()` method
- **Animations**: Update character pixel divs in walk frames

## Performance Architecture

### Core Web Vitals Implementation
- **LCP Optimization**: Critical CSS inlined in `<head>`, main CSS in `<body>`
- **FID Improvement**: Game initialization on `DOMContentLoaded`
- **CLS Prevention**: Fixed viewport height (100vh), no vertical scrolling
- **Memory Management**: Complete cleanup system with `destroy()` methods

### Performance Features
- **Hardware acceleration**: `translateZ(0)`, `will-change: transform`
- **Monolithic loading**: Single HTML file reduces HTTP requests
- **Event delegation**: Optimized card interactions
- **Device detection**: Low-end device optimizations
- **Memory limits**: Auto-cleanup for `viewedCards` Set
- **Background video**: Auto-disabled on low-end devices, reduced opacity on mobile
- **Progress persistence**: Multiple save points (beforeunload, pagehide, visibility change)
- **Auto-save interval**: 5-second periodic saves for level progress

## Design System

### 8bitcn Aesthetic (Unified Across All Pages)
- **Colors**: Dark theme (#0f172a, #1e293b), accent colors (#22c55e, #3b82f6, #eab308)
- **Typography**: Orbitron (headers), Share Tech Mono (content), pixelated rendering
- **Borders**: 6px dashed borders, pixel-perfect corners
- **Interactions**: Instant feedback (0.1s-0.3s transitions), translateY hover effects
- **Game Elements**: ASCII icons, uppercase descriptions, retro color palette
- **Japanese content**: All UI text in Japanese
- **Page Templates**: All detail pages follow tadataka.html design pattern
- **Navigation Structure**: Consistent navbar across company, member, media, and contact pages

### Accessibility Standards
- **WCAG 2.1 AA compliance**: Color contrast, keyboard navigation
- **ARIA attributes**: Labels, roles, live regions for screen readers
- **Keyboard support**: Tab navigation, Enter/Space activation, Arrow key movement
- **High contrast mode**: Windows and browser high contrast support
- **Reduced motion**: `prefers-reduced-motion` media query support

### Brand Guidelines
Reference `/assets/brand-guidelines.md` for complete design specifications including:
- Color palette definitions and usage rules
- Typography hierarchy and font specifications  
- UI component patterns and responsive breakpoints
- Asset requirements in `/assets/media-content-specifications.md`

## Data Management

### Metadata System
- **Central configuration**: `/metadata.json` contains all site metadata
- **SEO data**: Page titles, descriptions, keywords, OGP settings
- **Team information**: Member profiles, roles, specialties
- **Product data**: Application features, descriptions, status
- **Technology stack**: Frontend, backend, mobile, and tooling specs

### Content Structure
- **Modular content**: Each page references metadata for consistent information
- **Multilingual ready**: Japanese primary with English alternate names
- **Asset management**: Organized media specifications for required images/videos

## Video Background Setup

For local development, place `backvideo.mp4` in the project root. For production, use external hosting (see VIDEO_SETUP.md for details). The video file is excluded from git via `.gitignore` due to size constraints (>100MB).

## Deployment & SEO

### Netlify Configuration
- **Static Site Hosting**: Deployed via Netlify with custom domain `tomorebeyond.co`
- **Form Handling**: Contact form uses Netlify Forms with `data-netlify="true"` attribute
- **Form Notifications**: Configured to send submissions to `contact@tomorebeyond.co`
- **DNS Management**: Uses Netlify DNS with Google Workspace MX records for email
- **SSL/TLS**: Automatic Let's Encrypt certificates for HTTPS

### SEO & Search Console
- **Sitemap**: `/sitemap.xml` with 12 pages, proper priorities and change frequencies
- **Search Console**: Registered with Google Search Console for `tomorebeyond.co`
- **Meta Tags**: All pages include comprehensive OGP, Twitter Cards, and Schema.org markup
- **Canonical URLs**: Proper canonical tags to prevent duplicate content issues

## Recent Critical Fixes

### Background Video System
- **Issue**: Complex device detection and fallback systems causing playback failures
- **Solution**: Simplified to basic HTML5 video with `autoplay`, `muted`, `loop`, `playsinline`
- **Implementation**: Single `initializeBackgroundVideo()` method with multiple play attempt strategies
- **Current Video**: Uses `Timeline 1.mp4` as background video file

### Character Movement & Positioning System
- **Issue**: Character stopping midway and disappearing during scroll
- **Solution**: Completely rewritten `updatePositions()` method with linear interpolation
- **Implementation**: 
  - Simplified position calculation: `charX = minPosition + (travelDistance * this.characterPosition)`
  - Added explicit visibility properties in each RAF update
  - Removed complex three-phase positioning logic (start/middle/end)
  - Perfect synchronization between character position and card scrolling

### Card Interaction & Level System
- **Issue**: Card clicks causing unwanted character position changes
- **Solution**: Separated card viewing from character movement
- **Implementation**: 
  - Card clicks trigger level progression only (1 card = 1 level)
  - Character movement controlled exclusively by scroll/keyboard input
  - Maximum level (12) triggers red character color + super jump ability
  - Star state: Only visual changes (red color, glow) and enhanced jump height (400px)

### Level Persistence Across Pages
- **Issue**: Level resetting when returning from detail pages
- **Solution**: Added URL parameter system and LocalStorage backup
- **Implementation**: 
  - URL parameters: `?level=persist&from=detail&cardIndex=N`
  - LocalStorage key: `tomorebeyond_game_state`
  - Auto-save on card view, page unload, and every 5 seconds

### Scroll Direction & Natural Controls
- **Issue**: Unnatural scroll direction (left scroll = right movement)
- **Solution**: Inverted scroll handling for intuitive controls
- **Implementation**: Right scroll = right movement, works on both mobile and desktop

## Troubleshooting Common Issues

### Background Video Not Playing
1. Verify `Timeline 1.mp4` exists in project root (current video file)
2. Check browser autoplay policies (modern browsers require user interaction)
3. Ensure video attributes: `autoplay muted loop playsinline`
4. Video status indicator shows in top-right corner during development
5. Video initialization happens in `initializeBackgroundVideo()` method

### Character Position Issues
- Character movement is controlled by `updatePositions()` with linear interpolation
- Character should move smoothly from `minPosition` (50px) to `maxPosition` (screenWidth - 100px)
- If character disappears: Check that `opacity: '1'`, `visibility: 'visible'`, `display: 'block'` are set
- Card clicks should NOT move character - they only trigger level progression
- Scroll-based movement uses `characterPosition` (0-1 range) for precise synchronization

### Level/Progress Loss
- Check LocalStorage for `tomorebeyond_game_state`
- Verify URL parameters are preserved when navigating between pages  
- Progress saves occur: on card view, before page unload, every 5 seconds, on visibility change
- Ensure `saveGameState()` is called after level changes

### Performance Issues
- Low-end devices automatically get `.low-performance-mode` class
- RAF optimization prevents excessive position updates
- Memory monitoring runs every 30 seconds on low-end devices
- Emergency cleanup stops animations and pauses video if memory usage > 80%
### Character Animation System
- **Pixel Art Character**: 8-bit style stick figure with walking animation frames
- **Walking States**: Idle, frame1 (left leg forward), frame2 (right leg forward)
- **Jump Animation**: Two distinct animations based on character state:
  - `jumpAnimation`: Normal jump (80px) for levels 1-11
  - `maxLevelJumpAnimation`: Super jump (400px) for level 12+ star state
- **Star State Mechanics**: 
  - Visual only: Red color (#dc3545) with glow effect
  - Enhanced jump height (5x normal)
  - Walking animation remains unchanged
  - No rotation or complex movement changes

### CSS Animation Architecture
- **Frame-based Walking**: Uses opacity switching between `.walk-frame` elements
- **Hardware Acceleration**: All animations use `transform` properties for GPU acceleration
- **Performance Optimization**: `will-change`, `transform: translateZ(0)`, `backface-visibility: hidden`
- **State Management**: CSS classes control character states (`.walking`, `.jumping`, `.max-level-achieved`)

### Page Design Unification
All detail pages have been unified to follow the 8-bit design system:
- `/detail/company.html`, `/detail/mission.html`, `/detail/contact.html`
- `/detail/yamada.html`, `/detail/masadome.html`, `/detail/ando.html` (member profiles)
- `/detail/blog.html`, `/detail/video.html`, `/detail/sns.html` (content pages)
- `/pages/tadataka.html`, `/pages/toirun.html`, `/pages/midpoint.html` (product pages)

Design template pattern includes:
- Consistent navigation with logo and "BACK TO GAME" button
- Dark theme color scheme with accent colors
- 6px dashed borders on cards and sections
- Orbitron/Share Tech Mono typography
- Scroll animations and hover effects
- Responsive grid layouts

## Development Best Practices

### Performance Considerations
- **Detail Page Editing**: When modifying detail pages, work in small increments to prevent application crashes due to large data processing
- **Profile Images**: Member profile images (yamada.jpg, masadome.jpg, ando.jpg) are located in project root and referenced via `../filename.jpg` in detail pages
- **Memory Management**: Use TodoWrite tool for complex multi-step tasks to track progress and prevent incomplete implementations

### Contact Form Integration
- **Netlify Forms**: Contact form in `/detail/contact.html` uses Netlify's native form handling
- **Spam Protection**: Honeypot field (`bot-field`) included for spam prevention
- **Success Page**: Form redirects to `/contact-success.html` after successful submission
- **Email Notifications**: Configure in Netlify dashboard: Forms → Settings → Add Email notification to `contact@tomorebeyond.co`