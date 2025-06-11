# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ToMoreBeyond is a Japanese technology company website featuring an interactive 8-bit retro game aesthetic with a walking character animation system. The site is built as a single-page application with pixel art animations and synchronized card scrolling.

## Architecture

### Core Structure
- **Single-page architecture**: Main content in `index.html` with separate detail pages
- **Self-contained styling**: All CSS embedded in HTML files (no external stylesheets used)
- **Vanilla JavaScript**: No frameworks, pure JavaScript for all interactions
- **8-bit pixel art system**: Custom CSS-based pixel character animations

### Key Components

#### Main Application (`index.html`)
- **MinimalSite class**: Core application controller managing character movement, card scrolling, and animations
- **cardsData array**: Defines all content cards with sections (company, apps, members, media, contact)
- **Walking character system**: 8-bit pixel art character with 4-frame walking animation synchronized to scroll
- **Liquid Glass effect**: Modern glassmorphism styling applied to cards

#### Character Animation System
- 5 walk frames: `idle`, `frame1`, `frame2`, `frame3`, `frame4`
- Pixel-based construction using absolute positioned divs
- Synchronized movement with horizontal card scrolling
- Scale-based responsive sizing

#### Scroll Synchronization
- Character position (0-1) directly maps to card scroll position
- Perfect sync: character at right edge (1.0) shows contact card at rightmost position
- Damping and smoothing factors for natural movement feel

### File Organization
```
/detail/          - Individual page details (company, team members, etc.)
/pages/           - Product and feature pages (apps, privacy, terms)
/js/components/   - Unused JavaScript components (legacy)
/css/            - Unused stylesheets (legacy)
```

## Development Commands

This is a static HTML site with no build system. Development workflow:

### Local Development
```bash
# Serve locally (use any static server)
python -m http.server 8000
# or
npx serve .
```

### Testing
- Open in browser and test scroll interactions
- Verify character-card synchronization
- Test mobile responsiveness (especially touch scrolling)

## Key Technical Details

### Scroll Sensitivity Settings
- **dampingFactor**: Controls scroll-to-movement ratio (mobile: 0.008, desktop: 0.01)
- **smoothingFactor**: Controls animation smoothness (mobile: 0.0015, desktop: 0.002)
- **min-height**: Body height for scroll distance (mobile: 2800vh, desktop: 3000vh)

### Character Positioning
- **characterPosition**: Float 0-1 representing progress across journey
- **updateCharacterPosition()**: Syncs character screen position with progress
- **updateCardScrollProgress()**: Syncs card container scroll with character

### Mobile Optimization
- Removed complex scale transforms that caused layout issues
- Unified scroll behavior between mobile and desktop
- Hardware acceleration with `translate3d()` and `translateZ()`
- Touch-optimized interactions with disabled hover effects

### Card System
- Cards defined in `cardsData` with section grouping
- Divider cards (`type: 'divider'`) for section headers
- Responsive card sizing: desktop 256px, mobile 240px width
- Dynamic highlighting based on character proximity

## Content Management

### Adding New Cards
Modify the `cardsData` array with structure:
```javascript
{
  icon: 'X',           // ASCII icon for 8-bit aesthetic
  title: 'Title',      // Card title
  description: 'DESC', // Card description (uppercase for consistency)
  section: 'category', // Section grouping
  link: 'path.html',   // Navigation target
  type: 'divider'      // Optional: for section headers
}
```

### Creating Detail Pages
- Follow existing pattern in `/detail/` folder
- Include comprehensive SEO meta tags
- Use consistent styling patterns from existing pages
- Maintain responsive design principles

## Performance Considerations

- Character animations use CSS transforms for hardware acceleration
- RAF (requestAnimationFrame) for smooth animations
- Mobile-specific optimizations to prevent layout thrashing
- Minimal DOM manipulation during scroll events
- GPU-accelerated card scrolling with `translateZ(0)`

## Design System

- **8-bit aesthetic**: Monospace fonts, pixel art, ASCII icons
- **Liquid Glass cards**: Semi-transparent with backdrop-filter blur
- **White background**: Clean base with subtle pixel grid overlay
- **Responsive typography**: Scales appropriately for mobile devices
- **Japanese content**: All text content is in Japanese