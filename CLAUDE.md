# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ToMoreBeyond is a Japanese technology company website featuring an interactive 8-bit retro game with gamification elements. The site uses an 8bitcn.com-inspired design system with a walking pixel art character that gains experience by viewing cards.

## Architecture

### Core Structure
- **Modular single-page application**: Main game interface in `index.html` with ES6 modules
- **Separated concerns**: CSS/JS split into external files with critical CSS inlined
- **Vanilla JavaScript**: No frameworks, pure JavaScript game engine with ES6 modules
- **8bitcn design system**: Pixel-perfect borders, dashed lines, retro typography
- **Progressive enhancement**: Lazy loading for non-critical features

### Key Components

#### Main Game Engine (`/js/components/game-engine.js` - MinimalSite class)
- **Level System**: Players gain 1 level per card viewed (max level 18)
- **Character Controller**: Pixel art character with jump functionality
- **Card System**: 18 cards across 5 sections with 8bitcn-style design
- **Audio System**: Web Audio API for 8-bit sound effects
- **Notification System**: Completion notification when all cards are viewed
- **LocalStorage**: Progress persistence across browser sessions

#### Module System
- **LazyGameLoader** (`/js/components/lazy-game-loader.js`): Performance-optimized initialization
- **UIController** (`/js/components/ui-controller.js`): Loading screens, notifications, level display
- **PerformanceManager** (`/js/components/performance-manager.js`): Core Web Vitals tracking
- **CardsData** (`/js/data/cards-data.js`): Game content and configuration

#### Game Features
- **Leveling**: `currentLevel`, `viewedCards` Set, experience tracking with persistence
- **Character States**: Walking animations, jumping, color change at max level
- **Sound Effects**: Level up, jump, walk, completion sounds via Web Audio API
- **Visual Feedback**: Level display UI, experience bar, completion effects
- **Accessibility**: ARIA attributes, keyboard navigation, screen reader support

### File Organization
```
/index.html              - Main game interface with critical CSS inlined
/css/                   - Modular CSS architecture
  ├── styles.css        - Main 8bitcn design system
  ├── game.css          - Game-specific styles
  └── responsive.css    - Mobile/desktop breakpoints
/js/                    - ES6 module system
  ├── components/       - Feature modules
  │   ├── game-engine.js        - Core game logic
  │   ├── lazy-game-loader.js   - Performance loader
  │   ├── ui-controller.js      - UI management
  │   └── performance-manager.js - Web Vitals tracking
  └── data/
      └── cards-data.js - Game content configuration
/detail/                - Card detail pages
/pages/                 - Product and feature pages
/assets/                - Media content specifications and brand guidelines
/metadata.json          - Site-wide metadata and SEO configuration
```

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
- **Experience System**: 10 exp per card, 10 exp to level up
- **Jump Mechanics**: 0.6s animation, accessible via click/tap/spacebar
- **Completion Trigger**: Level 18 triggers red character + notification

### 8bitcn Design Implementation
- **Colors**: Dark theme (#0f172a, #1e293b), accent colors (green, blue, yellow, red, purple)
- **Fonts**: Orbitron (titles), Share Tech Mono (content)
- **Card Design**: 6px dashed borders, pixel corners, translateY hover effect
- **Text Rendering**: `image-rendering: pixelated`, hard shadows

### Responsive Breakpoints
- Mobile: ≤768px (adjusted card sizes, smaller fonts, touch optimizations)
- Desktop: >768px (full-size cards, hover effects)

## Content Management

### Card Data Structure
```javascript
{
  icon: '[#]',        // ASCII icon
  title: '会社',      // Japanese title
  description: 'DESC', // Uppercase description
  section: 'company',  // Section grouping
  link: 'detail/company.html',
  type: 'divider'     // Optional: section header
}
```

### Adding Game Elements
- Levels: Modify `maxLevel` and adjust `cardsData` array
- Sounds: Add cases to `play8BitSound()` method
- Animations: Update character pixel divs in walk frames

## Performance Architecture

### Core Web Vitals Implementation
- **LCP Optimization**: Critical CSS inlined, resource prioritization
- **FID Improvement**: Lazy game loading, passive event listeners
- **CLS Prevention**: Fallback fonts, layout stabilization
- **Memory Management**: Complete cleanup system with `destroy()` methods

### Performance Features
- **Hardware acceleration**: `translateZ(0)`, `will-change: transform`
- **RAF throttling**: 60fps animations with `requestAnimationFrame`
- **Event delegation**: Optimized card interactions
- **Lazy initialization**: Sound and game features load on user interaction
- **Device detection**: Low-end device optimizations
- **Memory limits**: Auto-cleanup for `viewedCards` Set

## Design System

### 8bitcn Aesthetic
- **Colors**: Dark theme (#0f172a, #1e293b), accent colors (#22c55e, #3b82f6, #eab308)
- **Typography**: Orbitron (headers), Share Tech Mono (content), pixelated rendering
- **Borders**: 6px dashed borders, pixel-perfect corners
- **Interactions**: Instant feedback (0.1s-0.3s transitions), translateY hover effects
- **Game Elements**: ASCII icons, uppercase descriptions, retro color palette
- **Japanese content**: All UI text in Japanese

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