'use client'

/**
 * Enhanced smooth scroll with custom easing and momentum
 */
export class SmoothScroll {
  private element: HTMLElement
  private targetY: number = 0
  private currentY: number = 0
  private ease: number = 0.08
  private isScrolling: boolean = false
  private animationId: number | null = null

  constructor(element: HTMLElement = document.documentElement, ease: number = 0.08) {
    this.element = element
    this.ease = ease
    this.init()
  }

  private init() {
    if (typeof window === 'undefined') return

    // Set initial height
    this.updateBodyHeight()

    // Bind events
    window.addEventListener('scroll', this.onScroll.bind(this))
    window.addEventListener('resize', this.updateBodyHeight.bind(this))
    
    // Start animation loop
    this.animate()
  }

  private updateBodyHeight() {
    const height = this.element.scrollHeight
    document.body.style.height = `${height}px`
  }

  private onScroll() {
    this.targetY = window.scrollY
    if (!this.isScrolling) {
      this.isScrolling = true
    }
  }

  private animate() {
    if (this.isScrolling) {
      // Smooth easing calculation
      this.currentY += (this.targetY - this.currentY) * this.ease
      
      // Apply transform
      this.element.style.transform = `translateY(-${this.currentY}px)`
      
      // Stop when close enough to target
      if (Math.abs(this.targetY - this.currentY) < 0.5) {
        this.currentY = this.targetY
        this.isScrolling = false
        this.element.style.transform = `translateY(-${this.currentY}px)`
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate())
  }

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener('scroll', this.onScroll.bind(this))
    window.removeEventListener('resize', this.updateBodyHeight.bind(this))
    
    // Reset styles
    this.element.style.transform = ''
    document.body.style.height = ''
  }

  public scrollTo(target: number, duration: number = 1000) {
    const start = this.currentY
    const startTime = performance.now()
    
    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Eased progress
      const easedProgress = this.easeOutCubic(progress)
      
      const newY = start + (target - start) * easedProgress
      window.scrollTo(0, newY)
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }
    
    requestAnimationFrame(animateScroll)
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3)
  }
}

/**
 * Initialize smooth scroll with parallax layers
 */
export const initSmoothScroll = () => {
  if (typeof window === 'undefined') return null
  
  // Enable smooth scroll only on desktop
  if (window.innerWidth > 1024) {
    return new SmoothScroll(document.body, 0.08)
  }
  
  return null
}

/**
 * Enhanced parallax with multiple layers and different speeds
 */
export const createEnhancedParallax = () => {
  if (typeof window === 'undefined') return

  let ticking = false

  const updateParallax = () => {
    const scrolled = window.scrollY
    const windowHeight = window.innerHeight
    
    // Slow parallax elements (background)
    document.querySelectorAll('.parallax-slow').forEach((element) => {
      const rect = element.getBoundingClientRect()
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const speed = -0.5
        const yPos = scrolled * speed
        ;(element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`
      }
    })

    // Medium parallax elements
    document.querySelectorAll('.parallax-medium').forEach((element) => {
      const rect = element.getBoundingClientRect()
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const speed = -0.3
        const yPos = scrolled * speed
        ;(element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`
      }
    })

    // Fast parallax elements (foreground)
    document.querySelectorAll('.parallax-fast').forEach((element) => {
      const rect = element.getBoundingClientRect()
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const speed = -0.8
        const yPos = scrolled * speed
        ;(element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`
      }
    })

    // Floating elements with organic movement
    document.querySelectorAll('.floating').forEach((element, index) => {
      const rect = element.getBoundingClientRect()
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const time = Date.now() * 0.002
        const amplitude = 20
        const frequency = 0.5 + index * 0.1
        const yOffset = Math.sin(time * frequency) * amplitude
        const xOffset = Math.cos(time * frequency * 0.7) * (amplitude * 0.5)
        
        ;(element as HTMLElement).style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`
      }
    })

    ticking = false
  }

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax)
      ticking = true
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true })
  
  return () => {
    window.removeEventListener('scroll', requestTick)
  }
}