class ScrollResponsiveCards {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.track = this.container?.querySelector('.infinite-scroll-track');
    this.cards = this.container?.querySelectorAll('.infinite-card');
    
    this.options = {
      baseSpeed: 1,
      scrollMultiplier: 0.05,
      maxSpeed: 5,
      minSpeed: 0.1,
      smoothness: 0.1,
      hoverSlowdown: 0.3,
      ...options
    };
    
    this.state = {
      currentSpeed: this.options.baseSpeed,
      targetSpeed: this.options.baseSpeed,
      scrollVelocity: 0,
      lastScrollY: 0,
      isHovered: false,
      animationId: null,
      translateX: 0,
      scrollDirection: -1
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
    let ticking = false;
    let lastTouchX = 0;
    let touchStartX = 0;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const updateScrollSpeed = () => {
      const currentScrollY = window.pageYOffset;
      const scrollDelta = currentScrollY - this.state.lastScrollY;
      
      // Calculate scroll velocity
      this.state.scrollVelocity = Math.abs(scrollDelta) * this.options.scrollMultiplier;
      this.state.lastScrollY = currentScrollY;
      
      // On mobile, reverse direction based on scroll direction
      if (isMobile) {
        // Negative scrollDelta means scrolling up, positive means scrolling down
        this.state.scrollDirection = scrollDelta > 0 ? -1 : 1;
      } else {
        // Desktop keeps original behavior
        this.state.scrollDirection = -1;
      }
      
      // Update target speed based on scroll velocity
      if (this.state.scrollVelocity > 0) {
        this.state.targetSpeed = Math.min(
          this.options.baseSpeed + this.state.scrollVelocity,
          this.options.maxSpeed
        );
      } else {
        this.state.targetSpeed = this.options.baseSpeed;
      }
      
      // Apply hover slowdown
      if (this.state.isHovered) {
        this.state.targetSpeed *= this.options.hoverSlowdown;
      }
      
      // Clamp to minimum speed
      this.state.targetSpeed = Math.max(this.state.targetSpeed, this.options.minSpeed);
      
      ticking = false;
    };
    
    // Handle vertical scroll
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollSpeed);
        ticking = true;
      }
    }, { passive: true });
    
    // Handle horizontal touch gestures on mobile
    if (isMobile) {
      this.container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        lastTouchX = touchStartX;
      }, { passive: true });
      
      this.container.addEventListener('touchmove', (e) => {
        const currentTouchX = e.touches[0].clientX;
        const touchDelta = currentTouchX - lastTouchX;
        
        // Set direction based on horizontal swipe
        if (Math.abs(touchDelta) > 2) {
          this.state.scrollDirection = touchDelta > 0 ? 1 : -1;
          this.state.scrollVelocity = Math.abs(touchDelta) * 0.1;
          this.state.targetSpeed = Math.min(
            this.options.baseSpeed + this.state.scrollVelocity,
            this.options.maxSpeed
          );
        }
        
        lastTouchX = currentTouchX;
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
      // Smooth speed transition
      this.state.currentSpeed = this.lerp(
        this.state.currentSpeed,
        this.state.targetSpeed,
        this.options.smoothness
      );
      
      // Update card positions with direction
      this.state.translateX += this.state.currentSpeed * this.state.scrollDirection;
      
      // Reset position for infinite scroll
      const cardWidth = this.cards[0]?.offsetWidth || 300;
      const gap = parseFloat(getComputedStyle(this.track).gap) || 30;
      const totalCardWidth = cardWidth + gap;
      const trackWidth = totalCardWidth * (this.cards.length / 2); // Assuming cards are duplicated
      
      // Handle wrapping for both directions
      if (this.state.translateX <= -trackWidth) {
        this.state.translateX = 0;
      } else if (this.state.translateX >= 0) {
        this.state.translateX = -trackWidth;
      }
      
      // Apply transform
      this.track.style.transform = `translateX(${this.state.translateX}px)`;
      
      // Enhance cards based on current speed
      this.cards.forEach(card => {
        if (card._enhance) {
          card._enhance();
        }
      });
      
      // Update scroll velocity decay
      this.state.scrollVelocity *= 0.95; // Decay scroll velocity
      
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
  .infinite-scroll-track {
    will-change: transform;
  }
  
  .infinite-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .infinite-card.hover-active {
    transform: translateY(-8px) scale(1.05) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    z-index: 10;
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
  
  /* Speed indicator (optional visual feedback) */
  .scroll-speed-indicator {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    backdrop-filter: blur(10px);
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .scroll-speed-indicator.visible {
    opacity: 1;
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
      baseSpeed: 1.5,
      scrollMultiplier: 0.08,
      maxSpeed: 6,
      minSpeed: 0.2,
      smoothness: 0.12,
      hoverSlowdown: 0.25
    });
    
    // Optional: Add speed indicator
    const addSpeedIndicator = () => {
      const indicator = document.createElement('div');
      indicator.className = 'scroll-speed-indicator';
      indicator.textContent = 'Speed: 1.0x';
      document.body.appendChild(indicator);
      
      let hideTimeout;
      
      const updateIndicator = () => {
        if (window.scrollResponsiveCards) {
          const speed = window.scrollResponsiveCards.state.currentSpeed;
          indicator.textContent = `Speed: ${speed.toFixed(1)}x`;
          indicator.classList.add('visible');
          
          clearTimeout(hideTimeout);
          hideTimeout = setTimeout(() => {
            indicator.classList.remove('visible');
          }, 2000);
        }
      };
      
      window.addEventListener('scroll', updateIndicator, { passive: true });
    };
    
    // Uncomment to enable speed indicator
    // addSpeedIndicator();
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollResponsiveCards;
}