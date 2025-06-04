class EnhancedInfiniteScroll {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.track = this.container?.querySelector('.infinite-scroll-track');
    this.cards = this.container?.querySelectorAll('.infinite-card');
    
    this.options = {
      baseSpeed: 1,
      hoverSpeedMultiplier: 0.1,
      mouseSpeedMultiplier: 2,
      touchSpeedMultiplier: 1.5,
      smoothness: 0.1,
      ...options
    };
    
    this.state = {
      isHovered: false,
      mouseX: 0,
      mouseY: 0,
      currentSpeed: this.options.baseSpeed,
      targetSpeed: this.options.baseSpeed,
      direction: 1,
      isPaused: false,
      isDragging: false,
      lastTouchX: 0,
      dragVelocity: 0
    };
    
    this.init();
  }
  
  init() {
    if (!this.container || !this.track) {
      console.warn('Enhanced Infinite Scroll: Container or track not found');
      return;
    }
    
    this.duplicateCards();
    this.setupEventListeners();
    this.startAnimation();
    this.initializeCardEffects();
  }
  
  duplicateCards() {
    // Clone cards for seamless infinite scroll
    const cards = Array.from(this.cards);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.add('cloned');
      this.track.appendChild(clone);
    });
    
    // Update cards reference
    this.cards = this.track.querySelectorAll('.infinite-card');
  }
  
  setupEventListeners() {
    // Mouse events
    this.container.addEventListener('mouseenter', () => this.handleMouseEnter());
    this.container.addEventListener('mouseleave', () => this.handleMouseLeave());
    this.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    
    // Touch events for mobile
    this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
    this.container.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    this.container.addEventListener('touchend', () => this.handleTouchEnd());
    
    // Wheel events for scroll control
    this.container.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
    
    // Keyboard events
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    // Visibility change
    document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
  }
  
  handleMouseEnter() {
    this.state.isHovered = true;
    this.state.targetSpeed = this.options.baseSpeed * this.options.hoverSpeedMultiplier;
  }
  
  handleMouseLeave() {
    this.state.isHovered = false;
    this.state.targetSpeed = this.options.baseSpeed;
  }
  
  handleMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    this.state.mouseX = (e.clientX - centerX) / rect.width;
    this.state.mouseY = (e.clientY - centerY) / rect.height;
    
    if (this.state.isHovered) {
      // Mouse position affects speed and direction
      const distanceFromCenter = Math.abs(this.state.mouseX);
      const speedMultiplier = 1 + (distanceFromCenter * this.options.mouseSpeedMultiplier);
      this.state.targetSpeed = this.options.baseSpeed * this.options.hoverSpeedMultiplier * speedMultiplier;
      this.state.direction = this.state.mouseX > 0 ? 1 : -1;
    }
  }
  
  handleTouchStart(e) {
    this.state.isDragging = true;
    this.state.lastTouchX = e.touches[0].clientX;
    this.state.targetSpeed = 0;
  }
  
  handleTouchMove(e) {
    if (!this.state.isDragging) return;
    
    e.preventDefault();
    const currentTouchX = e.touches[0].clientX;
    const deltaX = currentTouchX - this.state.lastTouchX;
    
    this.state.dragVelocity = deltaX * this.options.touchSpeedMultiplier;
    this.state.direction = deltaX > 0 ? -1 : 1;
    this.state.targetSpeed = Math.abs(this.state.dragVelocity) * 0.1;
    
    this.state.lastTouchX = currentTouchX;
  }
  
  handleTouchEnd() {
    this.state.isDragging = false;
    // Gradually return to base speed
    setTimeout(() => {
      this.state.targetSpeed = this.options.baseSpeed;
      this.state.direction = 1;
    }, 500);
  }
  
  handleWheel(e) {
    e.preventDefault();
    const delta = e.deltaY;
    
    // Temporarily boost speed based on scroll
    const boostMultiplier = Math.abs(delta) * 0.01;
    this.state.targetSpeed = this.options.baseSpeed * (1 + boostMultiplier);
    this.state.direction = delta > 0 ? 1 : -1;
    
    // Reset after a delay
    clearTimeout(this.wheelTimeout);
    this.wheelTimeout = setTimeout(() => {
      this.state.targetSpeed = this.options.baseSpeed;
      this.state.direction = 1;
    }, 300);
  }
  
  handleKeyboard(e) {
    switch(e.key) {
      case ' ':
        e.preventDefault();
        this.togglePause();
        break;
      case 'ArrowLeft':
        this.state.direction = -1;
        this.state.targetSpeed = this.options.baseSpeed * 2;
        break;
      case 'ArrowRight':
        this.state.direction = 1;
        this.state.targetSpeed = this.options.baseSpeed * 2;
        break;
    }
  }
  
  handleVisibilityChange() {
    if (document.hidden) {
      this.state.isPaused = true;
    } else {
      this.state.isPaused = false;
    }
  }
  
  togglePause() {
    this.state.isPaused = !this.state.isPaused;
    this.container.classList.toggle('paused', this.state.isPaused);
  }
  
  initializeCardEffects() {
    this.cards.forEach((card, index) => {
      // Add magnetic effect
      card.addEventListener('mouseenter', () => this.handleCardHover(card, true));
      card.addEventListener('mouseleave', () => this.handleCardHover(card, false));
      card.addEventListener('mousemove', (e) => this.handleCardMouseMove(card, e));
      
      // Add click ripple effect
      card.addEventListener('click', (e) => this.createRipple(card, e));
      
      // Stagger initial animation
      card.style.animationDelay = `${index * 100}ms`;
    });
  }
  
  handleCardHover(card, isHovering) {
    card.classList.toggle('magnetic-hover', isHovering);
    
    if (isHovering) {
      // Slightly slow down the entire track when hovering a card
      this.state.targetSpeed *= 0.3;
    } else {
      // Reset card transform
      card.style.transform = '';
      if (!this.state.isHovered) {
        this.state.targetSpeed = this.options.baseSpeed;
      }
    }
  }
  
  handleCardMouseMove(card, e) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.1;
    const deltaY = (e.clientY - centerY) * 0.1;
    
    card.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.05)`;
  }
  
  createRipple(card, e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    card.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
  
  startAnimation() {
    const animate = () => {
      if (!this.state.isPaused) {
        // Smooth speed transition
        this.state.currentSpeed = this.lerp(
          this.state.currentSpeed, 
          this.state.targetSpeed, 
          this.options.smoothness
        );
        
        // Get current transform
        const currentTransform = this.track.style.transform || 'translateX(0px)';
        const currentX = parseFloat(currentTransform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/)?.[1] || 0);
        
        // Calculate new position
        const speed = this.state.currentSpeed * this.state.direction;
        const newX = currentX - speed;
        
        // Reset position for infinite scroll
        const cardWidth = this.cards[0]?.offsetWidth || 300;
        const trackWidth = cardWidth * (this.cards.length / 2); // Half because we duplicated
        
        if (newX <= -trackWidth) {
          this.track.style.transform = `translateX(0px)`;
        } else if (newX >= 0) {
          this.track.style.transform = `translateX(${-trackWidth}px)`;
        } else {
          this.track.style.transform = `translateX(${newX}px)`;
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
  
  // Public methods
  setSpeed(speed) {
    this.state.targetSpeed = speed;
  }
  
  setDirection(direction) {
    this.state.direction = direction;
  }
  
  pause() {
    this.state.isPaused = true;
  }
  
  resume() {
    this.state.isPaused = false;
  }
  
  destroy() {
    // Remove event listeners
    this.container.removeEventListener('mouseenter', this.handleMouseEnter);
    this.container.removeEventListener('mouseleave', this.handleMouseLeave);
    this.container.removeEventListener('mousemove', this.handleMouseMove);
    // ... other cleanup
  }
}

// Enhanced CSS for the infinite scroll
const enhancedScrollStyles = `
  .infinite-scroll-container {
    overflow: hidden;
    position: relative;
    cursor: grab;
  }
  
  .infinite-scroll-container:active {
    cursor: grabbing;
  }
  
  .infinite-scroll-container.paused .infinite-scroll-track {
    animation-play-state: paused;
  }
  
  .infinite-card {
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    will-change: transform;
  }
  
  .infinite-card.magnetic-hover {
    z-index: 10;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .ripple-effect {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--primary-orange, #FFB300);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    animation: ripple 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @keyframes ripple {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(0);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(20);
    }
  }
  
  .infinite-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 179, 0, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }
  
  .infinite-card:hover::before {
    transform: translateX(100%);
  }
  
  /* Touch-friendly indicators */
  .infinite-scroll-container::after {
    content: '← Drag to control →';
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: var(--neutral-400, #A3A3A3);
    pointer-events: none;
    opacity: 0;
    transition: opacity 300ms;
  }
  
  @media (max-width: 768px) {
    .infinite-scroll-container::after {
      opacity: 1;
    }
  }
`;

// Inject enhanced styles
if (!document.querySelector('#enhanced-scroll-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'enhanced-scroll-styles';
  styleSheet.textContent = enhancedScrollStyles;
  document.head.appendChild(styleSheet);
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  const scrollContainer = document.querySelector('.center-infinite-scroll');
  if (scrollContainer) {
    new EnhancedInfiniteScroll(scrollContainer);
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedInfiniteScroll;
}