import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Full-page section scroll snap
export const createSectionScroll = () => {
  if (typeof window === 'undefined') return

  const sections = gsap.utils.toArray('.scroll-section') as HTMLElement[]
  
  sections.forEach((section, i) => {
    const isLast = i === sections.length - 1
    
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: isLast ? 'bottom bottom' : 'bottom top',
      pin: !isLast,
      pinSpacing: !isLast,
      scrub: 1,
      onEnter: () => {
        // Add active class for section-specific animations
        section.classList.add('section-active')
      },
      onLeave: () => {
        section.classList.remove('section-active')
      },
      onEnterBack: () => {
        section.classList.add('section-active')
      },
      onLeaveBack: () => {
        section.classList.remove('section-active')
      }
    })
  })
}

// Horizontal scroll for sections
export const createHorizontalScroll = (selector: string) => {
  if (typeof window === 'undefined') return

  const container = document.querySelector(selector) as HTMLElement
  if (!container) return

  const sections = gsap.utils.toArray(`${selector} .horizontal-section`) as HTMLElement[]
  const totalWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0)

  gsap.to(sections, {
    x: -totalWidth + window.innerWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: () => `+=${totalWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  })
}

// Zoom in/out on scroll
export const createZoomEffect = (selector: string, maxScale: number = 2) => {
  if (typeof window === 'undefined') return

  const element = document.querySelector(selector) as HTMLElement
  if (!element) return

  gsap.to(element, {
    scale: maxScale,
    opacity: 0,
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const scale = 1 + (maxScale - 1) * progress
        const opacity = 1 - progress
        gsap.set(element, { scale, opacity })
      }
    }
  })
}

// Reveal sections with curtain effect
export const createCurtainReveal = (selector: string) => {
  if (typeof window === 'undefined') return

  const sections = document.querySelectorAll(selector)
  
  sections.forEach(section => {
    const curtain = document.createElement('div')
    curtain.className = 'curtain-overlay'
    curtain.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 10;
      transform-origin: top center;
    `
    section.appendChild(curtain)

    gsap.to(curtain, {
      scaleY: 0,
      duration: 1.5,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1
      }
    })
  })
}

// Skew sections on scroll
export const createSkewEffect = () => {
  if (typeof window === 'undefined') return

  let currentScroll = 0
  let isScrolling: NodeJS.Timeout

  const skewElements = document.querySelectorAll('.skew-element')

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY
    const skew = Math.min(Math.max((scrollY - currentScroll) * 0.5, -10), 10)
    
    skewElements.forEach(element => {
      gsap.to(element, {
        skewY: skew,
        duration: 0.8,
        ease: 'power3.out'
      })
    })

    currentScroll = scrollY

    clearTimeout(isScrolling)
    isScrolling = setTimeout(() => {
      skewElements.forEach(element => {
        gsap.to(element, {
          skewY: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
      })
    }, 100)
  })
}

// Layered parallax with depth
export const createLayeredParallax = () => {
  if (typeof window === 'undefined') return

  const layers = [
    { selector: '.parallax-layer-1', speed: 0.2 },
    { selector: '.parallax-layer-2', speed: 0.5 },
    { selector: '.parallax-layer-3', speed: 0.8 },
    { selector: '.parallax-layer-4', speed: 1.2 }
  ]

  layers.forEach(layer => {
    const elements = document.querySelectorAll(layer.selector)
    
    elements.forEach(element => {
      gsap.to(element, {
        y: () => -ScrollTrigger.maxScroll(window) * layer.speed,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true
        }
      })
    })
  })
}

// Sticky elements with progress indicator
export const createStickyProgress = (selector: string) => {
  if (typeof window === 'undefined') return

  const element = document.querySelector(selector) as HTMLElement
  if (!element) return

  const progress = document.createElement('div')
  progress.className = 'sticky-progress'
  progress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #10b981);
    z-index: 9999;
    transition: width 0.1s ease-out;
  `
  document.body.appendChild(progress)

  ScrollTrigger.create({
    trigger: element,
    start: 'top top',
    end: 'bottom bottom',
    pin: true,
    scrub: 1,
    onUpdate: (self) => {
      progress.style.width = `${self.progress * 100}%`
    }
  })
}