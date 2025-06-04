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
    }, 800);
    
    // Start morphing animation
    setTimeout(() => {
      tomobiWrapper.classList.add('tomobi-fadeout');
      tomorebeyondText.classList.add('morph-to-tomorebeyond');
    }, 1400);
    
    // Add bounce effect on ToMoreBeyond appearance
    setTimeout(() => {
      this.addBounceEffect(tomorebeyondText);
    }, 3000);
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
  
  addBounceEffect(element) {
    element.style.animation = 'none';
    void element.offsetHeight; // Trigger reflow
    element.style.animation = 'subtleBounce 0.6s ease-out';
    
    // Add subtle bounce keyframes
    if (!document.querySelector('#subtleBounceKeyframes')) {
      const style = document.createElement('style');
      style.id = 'subtleBounceKeyframes';
      style.textContent = `
        @keyframes subtleBounce {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          30% { transform: translate(-50%, -50%) scale(1.1); }
          60% { transform: translate(-50%, -50%) scale(0.95); }
        }
      `;
      document.head.appendChild(style);
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