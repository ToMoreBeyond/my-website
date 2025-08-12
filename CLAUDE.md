# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ToMoreBeyond is a modern Japanese technology company website built with Next.js 15, featuring advanced animations, interactive elements, and a focus on mobile application development. The site showcases three main products (TADATAKA, TOI-RUN, Meet in the middle) and a three-member team.

## Architecture

### Core Technology Stack
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS v4 with custom color palette
- **Animations**: Framer Motion for complex interactions and transitions
- **Icons**: Heroicons and Lucide React
- **Fonts**: Geist Sans and Geist Mono from Vercel
- **Deployment**: Netlify with static export (`output: 'export'`)
- **Domain**: Production at https://tomorebeyond.co

### Key Architectural Decisions
- **Static Site Generation**: Uses `output: 'export'` for deployment to Netlify
- **Dynamic Routes**: Products and team members use `generateStaticParams` for SSG
- **Image Optimization**: Disabled (`unoptimized: true`) for static export compatibility
- **Japanese Primary Language**: All content and UI in Japanese with English alternates

## Development Commands

```bash
# Development with Turbopack
npm run dev

# Production build and export
npm run build

# Start production server (for testing)
npm start

# Lint check
npm run lint
```

## File Structure and Components

### Data Layer
- `/src/data/products.ts` - Product information with TypeScript interfaces
- `/src/data/team.ts` - Team member profiles and social links

### Component Architecture
```
/src/components/
├── common/           # Reusable UI components
│   ├── AnimatedElement.tsx      # Animation wrapper with 10+ animation types
│   ├── DragElement.tsx          # Draggable elements with physics
│   ├── GlobalMouseTracker.tsx   # Site-wide mouse tracking cursor
│   ├── ParticleSystem.tsx       # Animated particle backgrounds
│   └── SectionTransition.tsx    # Complex section transition effects
├── layout/
│   └── Header.tsx              # Main navigation with scroll detection
└── sections/
    ├── HeroSection.tsx         # Landing hero with mouse tracking
    ├── AboutSection.tsx        # Company information with 3D effects
    ├── ProductsSection.tsx     # Product showcases
    ├── TeamSection.tsx         # Team member cards
    └── ContactSection.tsx      # Contact form with Netlify Forms
```

### Routing Structure
- `/` - Main landing page
- `/products/[id]` - Dynamic product detail pages (tadataka, toirun, meet-in-the-middle)
- `/team/[id]` - Dynamic team member pages (yamada, masadome, ando)

## Key Technical Features

### Animation System
- **Framer Motion Integration**: Complex scroll-triggered animations, mouse tracking, 3D transforms
- **Custom Animation Types**: fadeIn, scaleIn, bounceIn, flipIn, rotateIn, slideIn variants
- **Performance Optimized**: Hardware acceleration, will-change properties
- **Accessibility**: Respects `prefers-reduced-motion` settings

### Interactive Elements
- **Global Mouse Tracking**: Custom cursor with blend modes and physics
- **Drag and Drop**: Elastic drag elements with constraints and auto-reset
- **Scroll Animations**: Section-based background transitions and element reveals
- **3D Transforms**: Perspective effects on hover and interaction

### Production Issue Resolution
The site previously had complex animation components that caused production errors. The current `page.tsx` uses a minimal, safe implementation without Framer Motion dependencies to ensure stability. Complex animation components are preserved in separate files for future re-implementation.

## Netlify Configuration

### Build Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `out`
- **Node Version**: Uses package.json engines specification

### Domain and Redirects
- **Primary Domain**: tomorebeyond.co (HTTPS enforced)
- **Redirects**: HTTP to HTTPS, www to non-www automatic redirects
- **Headers**: Security headers (DENY X-Frame-Options, XSS Protection, etc.)

### Forms Integration
Contact form uses Netlify Forms with:
- `data-netlify="true"` attribute
- Hidden `form-name` field for identification  
- Email notifications configured to `contact@tomorebeyond.co`

## Content Management

### Team Data Structure
```typescript
interface TeamMember {
  id: string;
  name: string;           // Japanese name
  nameEn: string;         // English name
  position: string;       // Japanese title
  positionEn: string;     // English acronym (CEO, CTO, CDO)
  bio: string;
  expertise: string[];
  image: string;
  social: { twitter?, github? };
  achievements: string[];
}
```

### Product Data Structure  
```typescript
interface Product {
  id: string;
  name: string;           // Japanese name
  nameEn: string;         // English name
  tagline: string;
  description: string;
  features: string[];
  image: string;
  status: 'in-development' | 'beta' | 'released';
  technologies: string[];
  links?: { website?, github? };
}
```

## Styling System

### Color Palette
- **Primary**: Green scale (#10b981 - emerald-500)
- **Secondary**: Blue scale (#0ea5e9 - sky-500)  
- **Accent**: Purple scale (#d946ef - fuchsia-500)
- **Warm**: Amber scale (#f59e0b - amber-500)
- **Slate**: Extended gray scale with slate-850 (#0f172a)

### Typography
- **Primary Font**: Inter with Noto Sans JP fallback
- **System Fonts**: Full system font stack for performance
- **Font Features**: Japanese character support, variable font loading

### Responsive Design
- **Mobile-First**: Tailwind's responsive breakpoints (sm, md, lg, xl, 2xl)
- **Component Scaling**: Dynamic font sizes and spacing based on screen size
- **Touch Optimization**: Mobile-specific interactions and touch targets

## Development Guidelines

### Component Patterns
- **Client Components**: Use `'use client'` directive for interactive components
- **Server Components**: Default for static content and data fetching
- **Dynamic Routes**: Implement `generateStaticParams` for SSG compatibility
- **TypeScript**: Strict typing for all components and data structures

### Performance Considerations
- **Bundle Optimization**: Tree-shaking enabled, dynamic imports where beneficial
- **Animation Performance**: Use `transform` properties, avoid layout-triggering changes
- **Image Handling**: Unoptimized for static export, consider external CDN for production
- **Memory Management**: Proper cleanup for complex animation components

### Production Debugging
If production errors occur:
1. Test the minimal `page.tsx` version (currently implemented)
2. Gradually re-enable complex components
3. Check browser console for client-side hydration issues
4. Verify Next.js 15 compatibility for all dependencies
5. Test static export generation locally before deployment

## Common Issues and Solutions

### Next.js 15 Compatibility
- **Async Params**: Dynamic route params are now Promises, use `await params`
- **Client/Server Boundaries**: Cannot use `generateStaticParams` in client components
- **TypeScript**: Update param interfaces to `Promise<{ id: string }>`

### Framer Motion Issues
- **SSR Hydration**: Complex animations can cause hydration mismatches
- **Performance**: Limit concurrent animations, use `will-change` carefully
- **Browser Support**: Test animations across different browsers and devices

### Netlify Deployment
- **Static Export**: Ensure `output: 'export'` in next.config.ts
- **Path Issues**: Use relative paths for assets in static export
- **Form Handling**: Netlify Forms require specific HTML attributes and setup