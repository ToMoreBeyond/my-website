# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ToMoreBeyond is a Japanese technology company website featuring an interactive 8-bit retro game with gamification elements. The site uses an 8bitcn.com-inspired design system with a walking pixel art character that gains experience by viewing cards.

## Architecture

### Core Structure
- **Hybrid architecture**: 8-bit game (100vh) + traditional corporate website sections below
- **Self-contained single-page application**: All code embedded in `index.html` for simplicity
- **Horizontal scrolling game**: Character moves left-to-right through card collection
- **Vanilla JavaScript**: No frameworks, pure JavaScript game engine
- **8bitcn design system**: Pixel-perfect borders, dashed lines, retro typography
- **Vertical scrolling enabled**: Game area fixed at 100vh, corporate sections scroll below
- **Background video system**: 8-bit retro game aesthetic with performance optimizations

### Key Components

#### Main Game Engine (MinimalSite class in `index.html`)
- **Level System**: Players gain 1 level per card click (max level 10 for star state)
- **Character Controller**: Pixel art character with jump functionality
- **Card System**: 10 cards total (blog and video cards removed for simplified UX)
- **Audio System**: Web Audio API for 8-bit sound effects
- **Notification System**: Level up popups and completion effects
- **LocalStorage**: Progress persistence across browser sessions

#### Corporate Website Section
- **Company Introduction**: Mission statement and company overview
- **Services Grid**: Three main apps (TADATAKA, TOIRUN, MEET IN THE MIDDLE)
- **Team Section**: Member profiles with links to detail pages
- **Call-to-Action**: Contact section for business inquiries
- **Navigation**: Smooth scroll between game and corporate sections

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
- **Clean Dependencies**: All external JS references removed from detail pages for simplicity
- **SEO Optimized**: Hybrid structure provides both interactive game experience and traditional corporate content

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
- **Completion Trigger**: Level 10 triggers red character color change and super jump
- **Star State Features**: Red color with glow effect, 5x jump height, same walking animation
- **Reset Function**: Logo click shows confirmation dialog and resets to level 1
- **Level Up Popups**: 3-second popup animations before navigating to detail pages

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
- **Total Cards**: 10 (blog and video cards removed)
- **Sections**: company, apps, members, media, contact
- **No Dividers**: Section divider cards removed for UX simplicity
- **Embedded Data**: All card data is in `window.cardsData` array within index.html

### Adding Game Elements
- **Levels**: Modify star level trigger (`this.currentLevel >= 10`) and adjust `cardsData` array length
- **Cards**: Add entries to `cardsData` array in `loadGameData()` method
- **Sounds**: Add cases to `play8BitSound()` method
- **Animations**: Update character pixel divs in walk frames

## Performance Architecture

### Core Web Vitals Implementation
- **LCP Optimization**: Critical CSS inlined in `<head>`, main CSS in `<body>`
- **FID Improvement**: Game initialization on `DOMContentLoaded`
- **CLS Prevention**: Fixed game viewport height (100vh), controlled vertical scrolling for corporate sections
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
- `/detail/sns.html` (content pages, blog and video removed)
- `/pages/tadataka.html`, `/pages/toirun.html`, `/pages/midpoint.html` (product pages)

Design template pattern includes:
- Consistent navigation with logo and "BACK TO GAME" button
- White background with dark text for improved readability
- 6px dashed borders on cards and sections
- Orbitron/Share Tech Mono typography
- Scroll animations and hover effects
- Responsive grid layouts
- All external JS dependencies removed for clean architecture

## Hybrid Structure Implementation

### Navigation System
- **Scroll Indicator**: Animated "SCROLL DOWN FOR MORE" indicator at bottom of game area
- **Auto-hide**: Indicator disappears when corporate section becomes visible
- **Smooth Scrolling**: Click events trigger smooth scroll to corporate sections
- **Back to Top**: "BACK TO GAME" button in corporate section returns to game area

### Corporate Section Layout
- **Company Introduction**: Mission statement and overview
- **Services Grid**: Three main applications with links to detail pages
- **Team Section**: Member profiles with avatar placeholders and profile links
- **Call-to-Action**: Contact section with business inquiry invitation
- **Consistent Styling**: 8-bit aesthetic maintained throughout corporate sections

### SEO Benefits
- **Traditional Content**: Corporate sections provide crawlable content for search engines
- **Structured Data**: Rich metadata and schema markup in detail pages
- **Content Hierarchy**: Clear information architecture for both users and search bots
- **Internal Linking**: Proper navigation between game elements and corporate pages

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
