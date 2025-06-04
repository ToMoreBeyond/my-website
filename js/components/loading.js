class LoadingScreen {
  constructor() {
    this.container = null;
    this.minimumLoadTime = 4000; // 最低表示時間
    this.startTime = Date.now();
    this.init();
  }
  
  init() {
    this.createLoadingScreen();
    this.startAnimation();
    this.handlePageLoad();
  }
  
  createLoadingScreen() {
    // Create loading container
    this.container = document.createElement('div');
    this.container.className = 'loading-container';
    
    // Create inner HTML structure
    this.container.innerHTML = `
      <div class="glow-effect"></div>
      <div class="loading-text-container">
        <div class="tomobi-wrapper">
          <div class="tomobi-text">
            <span class="letter">ト</span>
            <span class="letter">モ</span>
            <span class="letter">ビ</span>
          </div>
        </div>
        <div class="tomorebeyond-text">ToMoreBeyond</div>
      </div>
      <div class="loading-progress">
        <div class="loading-progress-bar"></div>
      </div>
    `;
    
    // Append to body
    document.body.appendChild(this.container);
  }
  
  startAnimation() {
    // Get elements
    const tomobiWrapper = this.container.querySelector('.tomobi-wrapper');
    const tomorebeyondText = this.container.querySelector('.tomorebeyond-text');
    const textContainer = this.container.querySelector('.loading-text-container');
    
    // Create particles when トモビ bounces
    setTimeout(() => {
      this.createParticles(textContainer);
    }, 1000);
    
    // Start morphing animation with improved timing
    setTimeout(() => {
      tomobiWrapper.classList.add('tomobi-fadeout');
    }, 1600);
    
    setTimeout(() => {
      tomorebeyondText.classList.add('morph-to-tomorebeyond');
    }, 1800);
    
    // Add final flourish effect
    setTimeout(() => {
      this.addFinalFlourish(tomorebeyondText);
    }, 3800);
  }
  
  createParticles(container) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position and direction
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 50 + Math.random() * 50;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.transform = 'translate(-50%, -50%)';
      
      container.appendChild(particle);
      
      // Trigger animation
      setTimeout(() => {
        particle.classList.add('particle-animate');
      }, i * 50);
      
      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
      }, 2000);
    }
  }
  
  addFinalFlourish(element) {
    // Create final particle burst
    this.createFinalBurst(element);
    
    // Add subtle glow pulse
    element.style.animation += ', finalGlow 1s ease-out';
    
    // Add final flourish keyframes
    if (!document.querySelector('#finalFlowKeyframes')) {
      const style = document.createElement('style');
      style.id = 'finalFlowKeyframes';
      style.textContent = `
        @keyframes finalGlow {
          0%, 100% { 
            text-shadow: 0 0 10px rgba(255, 179, 0, 0.3);
          }
          50% { 
            text-shadow: 0 0 20px rgba(255, 179, 0, 0.6), 0 0 30px rgba(255, 179, 0, 0.4);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  createFinalBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = 'final-burst-particle';
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 3px;
        height: 3px;
        background: #FFB300;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
      `;
      
      document.body.appendChild(particle);
      
      const angle = (Math.PI * 2 * i) / 12;
      const distance = 100 + Math.random() * 50;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
      ], {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => particle.remove();
    }
  }
  
  handlePageLoad() {
    // Wait for page to fully load
    window.addEventListener('load', () => {
      const loadTime = Date.now() - this.startTime;
      const remainingTime = Math.max(0, this.minimumLoadTime - loadTime);
      
      // Hide loading screen after minimum time
      setTimeout(() => {
        this.hideLoadingScreen();
      }, remainingTime);
    });
  }
  
  hideLoadingScreen() {
    this.container.classList.add('loading-exit');
    
    // Remove container after animation
    setTimeout(() => {
      this.container.remove();
      document.body.classList.add('loaded');
      
      // Dispatch custom event
      window.dispatchEvent(new Event('loadingComplete'));
    }, 800);
  }
}

// Initialize loading screen immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen();
  });
} else {
  new LoadingScreen();
}