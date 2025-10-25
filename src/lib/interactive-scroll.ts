import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Smooth section entrance with fade and slide
export const createSmoothEntrance = () => {
  if (typeof window === 'undefined') return

  const sections = document.querySelectorAll('.section-entrance')
  
  sections.forEach((section, index) => {
    const elements = section.querySelectorAll('.entrance-element')
    
    gsap.set(elements, {
      opacity: 0,
      y: 60,
    })

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          delay: index * 0.1
        })
      },
      once: true // Only animate once
    })
  })
}

// Card float animation on scroll
export const createFloatingCards = () => {
  if (typeof window === 'undefined') return

  const cards = document.querySelectorAll('.float-card')
  
  cards.forEach((card, index) => {
    gsap.to(card, {
      y: -20,
      rotation: index % 2 === 0 ? 2 : -2,
      duration: 2,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'bottom 15%',
        scrub: 1,
        onEnter: () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3
          })
        },
        onLeave: () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3
          })
        }
      }
    })
  })
}

// Rotating elements on scroll
export const createRotatingElements = () => {
  if (typeof window === 'undefined') return

  const elements = document.querySelectorAll('.rotate-on-scroll')
  
  elements.forEach(element => {
    gsap.to(element, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    })
  })
}

// Wave animation for sections
export const createWaveAnimation = () => {
  if (typeof window === 'undefined') return

  const waves = document.querySelectorAll('.wave-section')
  
  waves.forEach(wave => {
    const children = wave.children
    
    gsap.set(children, {
      y: (index) => Math.sin(index * 0.5) * 30
    })

    gsap.to(children, {
      y: (index) => Math.sin(index * 0.5 + 3) * 30,
      duration: 3,
      ease: 'sine.inOut',
      stagger: 0.1,
      scrollTrigger: {
        trigger: wave,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: 1
      }
    })
  })
}

// Progressive blur on scroll
export const createProgressiveBlur = () => {
  if (typeof window === 'undefined') return

  const blurElements = document.querySelectorAll('.blur-on-scroll')
  
  blurElements.forEach(element => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      onUpdate: (self) => {
        const blur = self.progress * 5
        gsap.set(element, {
          filter: `blur(${blur}px)`,
          opacity: 1 - self.progress * 0.3
        })
      }
    })
  })
}

// 3D tilt effect on scroll
export const create3DTilt = () => {
  if (typeof window === 'undefined') return

  const tiltElements = document.querySelectorAll('.tilt-3d')
  
  tiltElements.forEach(element => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress - 0.5
        const rotateX = progress * 20
        const rotateY = Math.sin(progress * Math.PI) * 10
        
        gsap.set(element, {
          rotateX,
          rotateY,
          transformPerspective: 1000
        })
      }
    })
  })
}

// Bounce entrance animation
export const createBounceEntrance = () => {
  if (typeof window === 'undefined') return

  const bounceElements = document.querySelectorAll('.bounce-in')
  
  bounceElements.forEach((element, index) => {
    gsap.set(element, {
      scale: 0,
      opacity: 0
    })

    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(element, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'back.out(1.7)'
        })
      },
      once: true
    })
  })
}

// Text scramble effect on scroll
export const createTextScramble = () => {
  if (typeof window === 'undefined') return

  const scrambleTexts = document.querySelectorAll('.scramble-text')
  
  scrambleTexts.forEach(element => {
    const originalText = element.textContent || ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        let iteration = 0
        const interval = setInterval(() => {
          element.textContent = originalText
            .split('')
            .map((_char, index) => {
              if (index < iteration) return originalText[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join('')
          
          if (iteration >= originalText.length) {
            clearInterval(interval)
          }
          iteration += 1/3
        }, 30)
      },
      once: true
    })
  })
}