'use client'

/**
 * Premium text reveal animation with character splitting
 * Inspired by Diana's Seafood site animations
 */
export const createPremiumTextReveal = (selector: string, options?: {
  duration?: number
  stagger?: number
  delay?: number
  splitBy?: 'chars' | 'words' | 'lines'
}) => {
  const {
    duration = 0.8,
    stagger = 0.03,
    delay = 0,
    splitBy = 'chars'
  } = options || {}

  if (typeof window === 'undefined') return

  const elements = document.querySelectorAll(selector)
  
  elements.forEach((element, elementIndex) => {
    const text = element.textContent || ''
    element.innerHTML = ''
    
    // Split text based on option
    let parts: string[] = []
    if (splitBy === 'chars') {
      parts = text.split('')
    } else if (splitBy === 'words') {
      parts = text.split(' ')
    } else {
      parts = text.split('\n')
    }
    
    parts.forEach((part, index) => {
      const span = document.createElement('span')
      span.style.display = 'inline-block'
      span.style.overflow = 'hidden'
      
      const inner = document.createElement('span')
      inner.textContent = splitBy === 'words' ? part + ' ' : part
      inner.style.display = 'inline-block'
      inner.style.transform = 'translateY(110%)'
      inner.style.transition = `transform ${duration}s cubic-bezier(0.77, 0, 0.175, 1)`
      inner.style.transitionDelay = `${delay + (index * stagger) + (elementIndex * 0.1)}s`
      
      span.appendChild(inner)
      element.appendChild(span)
      
      // Trigger animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          inner.style.transform = 'translateY(0)'
        })
      })
    })
  })
}

/**
 * Smooth parallax with different speeds for layers
 */
export const createSmoothParallax = (selector: string, speed: number = 0.5) => {
  if (typeof window === 'undefined') return

  let ticking = false
  const elements = document.querySelectorAll<HTMLElement>(selector)

  const updateParallax = () => {
    const scrolled = window.scrollY
    
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const top = rect.top + scrolled
      const center = top + rect.height / 2
      const distance = scrolled + window.innerHeight / 2 - center
      const movement = distance * speed
      
      element.style.transform = `translateY(${movement}px)`
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

/**
 * Magnetic cursor effect for premium feel
 */
export const createMagneticCursor = (selector: string, strength: number = 0.3) => {
  if (typeof window === 'undefined') return

  const elements = document.querySelectorAll<HTMLElement>(selector)
  
  elements.forEach((element) => {
    let animationId: number | null = null
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      if (animationId) cancelAnimationFrame(animationId)
      
      animationId = requestAnimationFrame(() => {
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
      })
    }
    
    const handleMouseLeave = () => {
      if (animationId) cancelAnimationFrame(animationId)
      
      element.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      element.style.transform = 'translate(0, 0)'
      
      setTimeout(() => {
        element.style.transition = ''
      }, 400)
    }
    
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)
  })
}

/**
 * Floating animation for decorative elements
 */
export const createFloatingAnimation = (selector: string, options?: {
  distance?: number
  duration?: number
  delay?: number
}) => {
  const {
    distance = 20,
    duration = 4,
    delay = 0
  } = options || {}

  if (typeof window === 'undefined') return

  const elements = document.querySelectorAll<HTMLElement>(selector)
  
  elements.forEach((element, index) => {
    element.style.animation = `floating ${duration}s ease-in-out ${delay + index * 0.2}s infinite`
  })

  // Add keyframes if not exists
  if (!document.querySelector('#floating-keyframes')) {
    const style = document.createElement('style')
    style.id = 'floating-keyframes'
    style.textContent = `
      @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-${distance}px); }
      }
    `
    document.head.appendChild(style)
  }
}

/**
 * Curtain transition between sections
 */
export const createCurtainTransition = (fromSelector: string, toSelector: string) => {
  if (typeof window === 'undefined') return

  const from = document.querySelector<HTMLElement>(fromSelector)
  const to = document.querySelector<HTMLElement>(toSelector)
  
  if (!from || !to) return

  // Create curtain overlay
  const curtain = document.createElement('div')
  curtain.style.position = 'fixed'
  curtain.style.top = '0'
  curtain.style.left = '0'
  curtain.style.width = '100%'
  curtain.style.height = '100%'
  curtain.style.background = 'linear-gradient(180deg, #131313 0%, #2a2a2a 100%)'
  curtain.style.transform = 'translateY(-100%)'
  curtain.style.transition = 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)'
  curtain.style.zIndex = '9999'
  
  document.body.appendChild(curtain)
  
  // Animate curtain down
  requestAnimationFrame(() => {
    curtain.style.transform = 'translateY(0)'
    
    setTimeout(() => {
      // Hide from, show to
      from.style.display = 'none'
      to.style.display = 'block'
      
      // Animate curtain up
      curtain.style.transform = 'translateY(100%)'
      
      setTimeout(() => {
        document.body.removeChild(curtain)
      }, 800)
    }, 800)
  })
}

/**
 * Stagger fade in animation for lists
 */
export const createStaggerFade = (containerSelector: string, itemSelector?: string) => {
  if (typeof window === 'undefined') return

  const containers = document.querySelectorAll<HTMLElement>(containerSelector)
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const container = entry.target as HTMLElement
        const items = container.querySelectorAll<HTMLElement>(itemSelector || '> *')
        
        items.forEach((item, index) => {
          item.style.opacity = '0'
          item.style.transform = 'translateY(30px)'
          item.style.transition = `opacity 0.6s ease, transform 0.6s ease`
          item.style.transitionDelay = `${index * 0.1}s`
          
          requestAnimationFrame(() => {
            item.style.opacity = '1'
            item.style.transform = 'translateY(0)'
          })
        })
        
        observer.unobserve(container)
      }
    })
  }, { threshold: 0.1 })

  containers.forEach(container => observer.observe(container))
  
  return () => {
    containers.forEach(container => observer.unobserve(container))
  }
}

/**
 * Smooth counter animation
 */
export const createSmoothCounter = (selector: string, options?: {
  duration?: number
  prefix?: string
  suffix?: string
}) => {
  const {
    duration = 2000,
    prefix = '',
    suffix = ''
  } = options || {}

  if (typeof window === 'undefined') return

  const elements = document.querySelectorAll<HTMLElement>(selector)
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement
        const target = parseInt(element.getAttribute('data-target') || element.textContent || '0')
        const start = 0
        const startTime = performance.now()
        
        const updateCounter = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3)
          const current = Math.floor(start + (target - start) * easeProgress)
          
          element.textContent = `${prefix}${current.toLocaleString()}${suffix}`
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter)
          }
        }
        
        requestAnimationFrame(updateCounter)
        observer.unobserve(element)
      }
    })
  }, { threshold: 0.5 })

  elements.forEach(element => observer.observe(element))
  
  return () => {
    elements.forEach(element => observer.unobserve(element))
  }
}

/**
 * Morph shape animation
 */
export const createShapeMorph = (selector: string) => {
  if (typeof window === 'undefined') return

  const elements = document.querySelectorAll<HTMLElement>(selector)
  
  elements.forEach((element) => {
    let animationId: number | null = null
    let time = 0
    
    const animate = () => {
      time += 0.01
      
      const morphAmount = (Math.sin(time) + 1) / 2
      const borderRadius = `${50 + morphAmount * 30}% ${50 - morphAmount * 30}% ${50 - morphAmount * 20}% ${50 + morphAmount * 20}%`
      
      element.style.borderRadius = borderRadius
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    // Clean up on unmount
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  })
}

/**
 * Initialize all premium animations
 */
export const initPremiumAnimations = () => {
  // Text reveals
  createPremiumTextReveal('.reveal-chars', { splitBy: 'chars', stagger: 0.02 })
  createPremiumTextReveal('.reveal-words', { splitBy: 'words', stagger: 0.05 })
  
  // Parallax effects
  createSmoothParallax('.parallax-slow', 0.2)
  createSmoothParallax('.parallax-medium', 0.4)
  createSmoothParallax('.parallax-fast', 0.6)
  
  // Interactive elements
  createMagneticCursor('.magnetic', 0.2)
  createFloatingAnimation('.floating')
  
  // Stagger animations
  createStaggerFade('.stagger-fade')
  
  // Counters
  createSmoothCounter('.counter')
  
  // Shape morphing
  createShapeMorph('.morph-shape')
}