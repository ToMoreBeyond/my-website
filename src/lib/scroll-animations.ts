import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface ScrollAnimationConfig {
  trigger: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  anticipatePin?: number
  refreshPriority?: number
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

// Text reveal animation
export const createTextReveal = (selector: string, options: Partial<ScrollAnimationConfig> = {}) => {
  if (typeof window === 'undefined') return null

  const elements = document.querySelectorAll(selector)
  
  elements.forEach((element, index) => {
    // Split text into spans
    const text = element.textContent || ''
    element.innerHTML = text
      .split('')
      .map(char => char === ' ' ? ' ' : `<span class="char">${char}</span>`)
      .join('')

    const chars = element.querySelectorAll('.char')
    
    gsap.set(chars, { 
      opacity: 0,
      y: 50,
      rotateX: -90,
    })

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.02,
        })
      },
      ...options,
    })
  })
}

// Parallax scroll effect
export const createParallax = (selector: string, speed: number = 0.5, options: Partial<ScrollAnimationConfig> = {}) => {
  if (typeof window === 'undefined') return null

  const elements = document.querySelectorAll(selector)
  
  elements.forEach(element => {
    gsap.to(element, {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        ...options,
      }
    })
  })
}

// Magnetic hover effect
export const createMagneticHover = (selector: string, strength: number = 0.3) => {
  if (typeof window === 'undefined') return

  const elements = document.querySelectorAll(selector)
  
  elements.forEach(element => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    // Cleanup function
    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  })
}

// Morphing shapes animation
export const createMorphingBackground = (selector: string) => {
  if (typeof window === 'undefined') return null

  const element = document.querySelector(selector)
  if (!element) return null

  const shapes = [
    'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
  ]

  let currentShape = 0

  const morphShape = () => {
    currentShape = (currentShape + 1) % shapes.length
    gsap.to(element, {
      clipPath: shapes[currentShape],
      duration: 2,
      ease: 'power2.inOut',
    })
  }

  // Start morphing
  const interval = setInterval(morphShape, 3000)
  
  return () => clearInterval(interval)
}

// Scroll-triggered counter animation
export const createCounterAnimation = (selector: string, options: Partial<ScrollAnimationConfig> = {}) => {
  if (typeof window === 'undefined') return null

  const elements = document.querySelectorAll(selector)
  
  elements.forEach(element => {
    const endValue = parseInt(element.textContent || '0')
    const startValue = 0

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        gsap.to({ value: startValue }, {
          value: endValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            element.textContent = Math.round(this.targets()[0].value).toLocaleString()
          }
        })
      },
      ...options,
    })
  })
}

// Stagger animation for cards
export const createStaggerAnimation = (selector: string, options: Partial<ScrollAnimationConfig> = {}) => {
  if (typeof window === 'undefined') return null

  const container = document.querySelector(selector)
  if (!container) return null

  const cards = container.children

  gsap.set(cards, {
    opacity: 0,
    y: 100,
    scale: 0.8,
    rotateX: -15,
  })

  ScrollTrigger.create({
    trigger: container,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.1,
      })
    },
    ...options,
  })
}

// Image reveal with mask
export const createImageReveal = (selector: string, direction: 'left' | 'right' | 'up' | 'down' = 'right') => {
  if (typeof window === 'undefined') return null

  const elements = document.querySelectorAll(selector)
  
  elements.forEach(element => {
    const img = element.querySelector('img')
    if (!img) return

    // Create mask overlay
    const mask = document.createElement('div')
    mask.className = 'absolute inset-0 bg-gray-900 z-10'
    element.appendChild(mask)

    const maskAnimation = {
      left: { x: '-100%' },
      right: { x: '100%' },
      up: { y: '-100%' },
      down: { y: '100%' },
    }

    gsap.set(mask, {
      x: direction === 'left' ? '100%' : direction === 'right' ? '-100%' : '0%',
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : '0%',
    })

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(mask, {
          ...maskAnimation[direction],
          duration: 1.2,
          ease: 'power3.inOut',
        })
        
        gsap.fromTo(img, 
          { scale: 1.2 },
          { 
            scale: 1, 
            duration: 1.2, 
            ease: 'power3.out' 
          }
        )
      },
    })
  })
}

// Cleanup all ScrollTriggers
export const cleanupScrollTriggers = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
}