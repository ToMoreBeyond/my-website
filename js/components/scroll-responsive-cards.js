class ScrollResponsiveCards {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.track = this.container?.querySelector('.infinite-scroll-track');
    this.cards = this.container?.querySelectorAll('.infinite-card');
    
    this.options = {
      baseSpeed: 0.5,
      scrollMultiplier: 0.15,
      touchMultiplier: 1.2,
      maxSpeed: 8,
      minSpeed: 0,
      smoothness: 0.08,
      friction: 0.92,
      hoverSlowdown: 0.3,
      responsiveness: 0.15,
      ...options
    };
    
    this.state = {
      currentSpeed: 0,
      targetSpeed: 0,
      velocity: 0,
      lastScrollY: 0,
      lastTouchX: 0,
      lastTouchY: 0,
      lastTimestamp: Date.now(),
      isHovered: false,
      isTouching: false,
      animationId: null,
      translateX: 0,
      momentum: 0,
      lastDelta: 0
    };
    
    this.init();
  }
  
  init() {
    if (!this.container || !this.track) {
      console.warn('Scroll Responsive Cards: Container or track not found');
      return;
    }
    
    this.setupScrollDetection();
    this.setupHoverEffects();
    this.startAnimation();
    this.enhanceCards();
  }
  
  setupScrollDetection() {
    let scrollRaf = null;
    let touchRaf = null;
    
    // Unified scroll handler for both wheel and touch
    const handleMovement = (deltaX, deltaY, isTouch = false) => {
      const now = Date.now();
      const timeDelta = Math.max(1, now - this.state.lastTimestamp);
      this.state.lastTimestamp = now;
      
      // Calculate velocity based on movement
      const delta = isTouch ? deltaX : deltaY;
      const instantVelocity = delta / timeDelta;
      
      // Smooth velocity tracking
      this.state.velocity = this.lerp(
        this.state.velocity,
        instantVelocity,
        this.options.responsiveness
      );
      
      // Update momentum
      const multiplier = isTouch ? this.options.touchMultiplier : this.options.scrollMultiplier;
      this.state.momentum += delta * multiplier;
      
      // Clamp momentum
      const maxMomentum = this.options.maxSpeed * 10;
      this.state.momentum = Math.max(-maxMomentum, Math.min(maxMomentum, this.state.momentum));
    };
    
    // Mouse wheel handler
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(() => {
        // Use horizontal delta if available, otherwise vertical
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        handleMovement(delta, delta, false);
      });
    }, { passive: false });
    
    // Touch handlers
    this.container.addEventListener('touchstart', (e) => {
      this.state.isTouching = true;
      this.state.lastTouchX = e.touches[0].clientX;
      this.state.lastTouchY = e.touches[0].clientY;
      this.state.lastTimestamp = Date.now();
      
      // Stop any existing momentum
      this.state.momentum *= 0.3;
    }, { passive: true });
    
    this.container.addEventListener('touchmove', (e) => {
      if (!this.state.isTouching) return;
      
      if (touchRaf) cancelAnimationFrame(touchRaf);
      touchRaf = requestAnimationFrame(() => {
        const touch = e.touches[0];
        const deltaX = touch.clientX - this.state.lastTouchX;
        const deltaY = touch.clientY - this.state.lastTouchY;
        
        // Prioritize horizontal movement
        if (Math.abs(deltaX) > Math.abs(deltaY) * 0.5) {
          e.preventDefault();
          // Natural direction: swipe right moves cards right, swipe left moves cards left
          handleMovement(deltaX, 0, true);
        } else {
          // For vertical scrolling, disable horizontal movement
          // This prevents interference with page scroll
        }
        
        this.state.lastTouchX = touch.clientX;
        this.state.lastTouchY = touch.clientY;
      });
    }, { passive: false });
    
    this.container.addEventListener('touchend', () => {
      this.state.isTouching = false;
      
      // Apply inertia boost based on final velocity
      const boostFactor = Math.min(2, Math.abs(this.state.velocity) * 0.5);
      this.state.momentum *= boostFactor;
    }, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.state.momentum -= 30;
      } else if (e.key === 'ArrowRight') {
        this.state.momentum += 30;
      }
    });
    
    // Page scroll sync (desktop only - disabled on mobile for natural touch behavior)
    const isMobile = 'ontouchstart' in window;
    if (!isMobile) {
      let lastScrollY = window.pageYOffset;
      window.addEventListener('scroll', () => {
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
        scrollRaf = requestAnimationFrame(() => {
          const deltaY = window.pageYOffset - lastScrollY;
          lastScrollY = window.pageYOffset;
          
          if (!this.state.isTouching) {
            handleMovement(0, deltaY, false);
          }
        });
      }, { passive: true });
    }
  }
  
  setupHoverEffects() {
    this.container.addEventListener('mouseenter', () => {
      this.state.isHovered = true;
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.state.isHovered = false;
    });
    
    // Individual card hover effects
    this.cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hover-active');
        this.createHoverRipple(card);
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('hover-active');
      });
    });
  }
  
  createHoverRipple(card) {
    // Remove existing ripples
    const existingRipples = card.querySelectorAll('.hover-ripple');
    existingRipples.forEach(ripple => ripple.remove());
    
    // Create new ripple
    const ripple = document.createElement('div');
    ripple.className = 'hover-ripple';
    
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
      position: absolute;
      left: 50%;
      top: 50%;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(255, 179, 0, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
      z-index: 1;
    `;
    
    card.appendChild(ripple);
    
    // Animate ripple
    ripple.animate([
      { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).onfinish = () => ripple.remove();
  }
  
  enhanceCards() {
    this.cards.forEach((card, index) => {
      // Add enhanced styling
      card.style.willChange = 'transform';
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      
      // Add speed-based transform effects
      const enhanceCard = () => {
        const speedRatio = this.state.currentSpeed / this.options.maxSpeed;
        const skew = speedRatio * 3; // Max 3 degrees skew
        const scale = 1 + (speedRatio * 0.05); // Slight scale effect
        
        if (!card.classList.contains('hover-active')) {
          card.style.transform = `skewX(${skew}deg) scale(${scale})`;
        }
      };
      
      // Store enhance function for later use
      card._enhance = enhanceCard;
    });
  }
  
  startAnimation() {
    const animate = () => {
      // Apply momentum with friction
      if (!this.state.isTouching) {
        this.state.momentum *= this.options.friction;
        
        // Stop if momentum is negligible
        if (Math.abs(this.state.momentum) < 0.01) {
          this.state.momentum = 0;
        }
      }
      
      // Add base speed when not interacting
      let movement = this.state.momentum;
      if (!this.state.isTouching && !this.state.isHovered && Math.abs(this.state.momentum) < 0.5) {
        movement += this.options.baseSpeed;
      }
      
      // Apply hover slowdown
      if (this.state.isHovered) {
        movement *= this.options.hoverSlowdown;
      }
      
      // Update position
      this.state.translateX += movement;
      
      // Get dimensions for infinite loop
      const cardWidth = this.cards[0]?.offsetWidth || 300;
      const gap = parseFloat(getComputedStyle(this.track).gap) || 30;
      const totalCardWidth = cardWidth + gap;
      const trackWidth = totalCardWidth * (this.cards.length / 2);
      
      // Seamless infinite scroll
      if (this.state.translateX <= -trackWidth) {
        this.state.translateX += trackWidth;
      } else if (this.state.translateX >= 0) {
        this.state.translateX -= trackWidth;
      }
      
      // Apply smooth transform
      this.track.style.transform = `translate3d(${this.state.translateX}px, 0, 0)`;
      
      // Enhanced card effects based on velocity
      const speed = Math.abs(movement);
      const speedRatio = Math.min(speed / this.options.maxSpeed, 1);
      
      this.cards.forEach((card, index) => {
        if (card._enhance) {
          // Dynamic effects based on speed
          const skew = speedRatio * 2;
          const scale = 1 + (speedRatio * 0.02);
          const blur = speedRatio > 0.5 ? speedRatio * 0.5 : 0;
          
          if (!card.classList.contains('hover-active')) {
            card.style.transform = `skewX(${movement > 0 ? -skew : skew}deg) scale(${scale})`;
            card.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';
          }
        }
      });
      
      this.state.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
  
  // Public methods
  setBaseSpeed(speed) {
    this.options.baseSpeed = speed;
  }
  
  setScrollMultiplier(multiplier) {
    this.options.scrollMultiplier = multiplier;
  }
  
  pause() {
    if (this.state.animationId) {
      cancelAnimationFrame(this.state.animationId);
      this.state.animationId = null;
    }
  }
  
  resume() {
    if (!this.state.animationId) {
      this.startAnimation();
    }
  }
  
  destroy() {
    this.pause();
    // Reset card styles
    this.cards.forEach(card => {
      card.style.transform = '';
      card.style.willChange = '';
      card._enhance = null;
    });
  }
}

// Enhanced CSS for scroll-responsive cards
const scrollResponsiveStyles = `
  .center-infinite-scroll {
    touch-action: pan-y pinch-zoom;
    -webkit-overflow-scrolling: touch;
    user-select: none;
    -webkit-user-select: none;
  }
  
  .infinite-scroll-track {
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform-style: preserve-3d;
  }
  
  .infinite-card {
    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                filter 0.2s ease-out;
    position: relative;
    overflow: hidden;
    will-change: transform, filter;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  
  .infinite-card.hover-active {
    transform: translateY(-8px) scale(1.05) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    z-index: 10;
    filter: none !important;
  }
  
  .infinite-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 179, 0, 0.1), transparent);
    transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }
  
  .infinite-card:hover::before {
    left: 100%;
  }
  
  .hover-ripple {
    animation: rippleExpand 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @keyframes rippleExpand {
    from {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
  
  /* Smooth scrolling on touch devices */
  @media (hover: none) and (pointer: coarse) {
    .infinite-card {
      transition-duration: 0.1s;
    }
    
    .center-infinite-scroll {
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
  }
  
  /* Performance optimizations */
  @media (prefers-reduced-motion: reduce) {
    .infinite-card {
      transition: none;
    }
    
    .infinite-scroll-track {
      animation: none;
    }
  }
`;

// Inject enhanced styles
if (!document.querySelector('#scroll-responsive-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'scroll-responsive-styles';
  styleSheet.textContent = scrollResponsiveStyles;
  document.head.appendChild(styleSheet);
}

// Auto-initialize with scroll detection
document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.querySelector('.center-infinite-scroll');
  if (scrollContainer) {
    window.scrollResponsiveCards = new ScrollResponsiveCards(scrollContainer, {
      baseSpeed: 0.5,
      scrollMultiplier: 0.15,
      touchMultiplier: 1.5,
      maxSpeed: 10,
      minSpeed: 0,
      smoothness: 0.08,
      friction: 0.95,
      hoverSlowdown: 0.3,
      responsiveness: 0.25
    });
    
    // Optimize for mobile
    if ('ontouchstart' in window) {
      scrollContainer.style.cursor = 'grab';
      scrollContainer.addEventListener('touchstart', () => {
        scrollContainer.style.cursor = 'grabbing';
      });
      scrollContainer.addEventListener('touchend', () => {
        scrollContainer.style.cursor = 'grab';
      });
    }
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollResponsiveCards;
}