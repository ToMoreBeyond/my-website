class TextAnimations {
  constructor() {
    this.observer = null;
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupTextReveal();
    this.setupStaggeredAnimations();
    this.setupTypewriter();
    this.setupSplitText();
  }
  
  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Trigger specific animations
            if (entry.target.classList.contains('typewriter')) {
              this.startTypewriter(entry.target);
            }
            
            if (entry.target.classList.contains('split-text')) {
              this.animateSplitText(entry.target);
            }
            
            // Stop observing after animation triggers
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-10% 0px -10% 0px'
      }
    );
  }
  
  setupTextReveal() {
    const textRevealElements = document.querySelectorAll('.text-reveal');
    textRevealElements.forEach((element) => {
      // Wrap text content
      const content = element.textContent;
      element.innerHTML = `<span class="text-reveal-content">${content}</span>`;
      
      this.observer.observe(element);
    });
  }
  
  setupStaggeredAnimations() {
    const staggerElements = document.querySelectorAll('.stagger-children');
    staggerElements.forEach((element) => {
      this.observer.observe(element);
    });
  }
  
  setupTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    typewriterElements.forEach((element) => {
      element.setAttribute('data-original-text', element.textContent);
      element.textContent = '';
      this.observer.observe(element);
    });
  }
  
  startTypewriter(element) {
    const text = element.getAttribute('data-original-text');
    const speed = parseInt(element.getAttribute('data-speed')) || 50;
    const delay = parseInt(element.getAttribute('data-delay')) || 0;
    
    setTimeout(() => {
      let index = 0;
      const typing = setInterval(() => {
        element.textContent = text.slice(0, index + 1);
        index++;
        
        if (index >= text.length) {
          clearInterval(typing);
          element.classList.add('typewriter-complete');
        }
      }, speed);
    }, delay);
  }
  
  setupSplitText() {
    const splitTextElements = document.querySelectorAll('.split-text');
    splitTextElements.forEach((element) => {
      this.splitTextIntoSpans(element);
      this.observer.observe(element);
    });
  }
  
  splitTextIntoSpans(element) {
    const text = element.textContent;
    const splitType = element.getAttribute('data-split') || 'chars';
    
    if (splitType === 'chars') {
      const chars = text.split('');
      element.innerHTML = chars.map((char, index) => 
        char === ' ' 
          ? ' ' 
          : `<span class="split-char" style="transition-delay: ${index * 30}ms">${char}</span>`
      ).join('');
    } else if (splitType === 'words') {
      const words = text.split(' ');
      element.innerHTML = words.map((word, index) => 
        `<span class="split-word" style="transition-delay: ${index * 100}ms">${word}</span>`
      ).join(' ');
    }
  }
  
  animateSplitText(element) {
    const splitType = element.getAttribute('data-split') || 'chars';
    const selector = splitType === 'chars' ? '.split-char' : '.split-word';
    const spans = element.querySelectorAll(selector);
    
    spans.forEach((span) => {
      span.classList.add('animate');
    });
  }
  
  // Utility method to add text animation to any element
  static addAnimation(element, animationType, options = {}) {
    element.classList.add(animationType);
    
    if (animationType === 'typewriter') {
      if (options.speed) element.setAttribute('data-speed', options.speed);
      if (options.delay) element.setAttribute('data-delay', options.delay);
    }
    
    if (animationType === 'split-text') {
      if (options.split) element.setAttribute('data-split', options.split);
    }
    
    // Re-initialize if needed
    const textAnimations = new TextAnimations();
  }
}

// CSS Animation Classes (to be applied via JavaScript)
const textAnimationStyles = `
  .text-reveal {
    overflow: hidden;
    position: relative;
  }
  
  .text-reveal-content {
    display: inline-block;
    transform: translateY(100%);
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .text-reveal.in-view .text-reveal-content {
    transform: translateY(0);
  }
  
  .stagger-children > * {
    opacity: 0;
    transform: translateY(20px);
    transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .stagger-children.in-view > * {
    opacity: 1;
    transform: translateY(0);
  }
  
  .typewriter {
    position: relative;
  }
  
  .typewriter::after {
    content: '|';
    animation: blink 1s infinite;
    color: var(--primary-orange, #FFB300);
  }
  
  .typewriter-complete::after {
    display: none;
  }
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  .split-char,
  .split-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px) rotateX(90deg);
    transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .split-text.in-view .split-char.animate,
  .split-text.in-view .split-word.animate {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
  
  /* Hover Effects */
  .text-hover-slide {
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  
  .text-hover-slide::before {
    content: attr(data-hover);
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(100%);
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    color: var(--primary-orange, #FFB300);
  }
  
  .text-hover-slide:hover::before {
    transform: translateY(0);
  }
  
  .text-hover-slide:hover {
    transform: translateY(-100%);
  }
  
  /* Gradient Text Animation */
  .text-gradient-animate {
    background: linear-gradient(
      90deg,
      var(--neutral-800, #262626) 0%,
      var(--primary-orange, #FFB300) 50%,
      var(--neutral-800, #262626) 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s ease-in-out infinite;
  }
  
  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
  
  /* Bounce In Animation */
  .text-bounce-in {
    opacity: 0;
    transform: scale(0.3);
    transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .text-bounce-in.in-view {
    opacity: 1;
    transform: scale(1);
  }
  
  /* Float Animation */
  .text-float {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

// Inject styles
if (!document.querySelector('#text-animation-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'text-animation-styles';
  styleSheet.textContent = textAnimationStyles;
  document.head.appendChild(styleSheet);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TextAnimations();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TextAnimations;
}