class PageTransition {
  constructor() {
    this.isTransitioning = false;
    this.transitionDuration = 1000;
    this.init();
  }
  
  init() {
    this.setupNavigationInterception();
    this.createMiniLoader();
  }
  
  setupNavigationInterception() {
    // Intercept all internal links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) {
        return; // Skip external links, anchors, and mailto links
      }
      
      // Check if it's an internal page
      if (href.includes('.html') || href.startsWith('/pages/') || href.startsWith('pages/')) {
        e.preventDefault();
        this.transitionToPage(href);
      }
    });
  }
  
  createMiniLoader() {
    // Create compact loading overlay for page transitions
    const miniLoader = document.createElement('div');
    miniLoader.className = 'mini-loader-overlay';
    miniLoader.innerHTML = `
      <div class="mini-loader-content">
        <div class="mini-text-container">
          <div class="mini-tomobi">トモビ</div>
          <div class="mini-tomorebeyond">ToMoreBeyond</div>
        </div>
        <div class="mini-progress-bar">
          <div class="mini-progress-fill"></div>
        </div>
      </div>
    `;
    
    // Add styles
    const styles = `
      .mini-loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(13, 13, 13, 0.95);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .mini-loader-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      
      .mini-loader-content {
        text-align: center;
        max-width: 300px;
      }
      
      .mini-text-container {
        position: relative;
        height: 80px;
        margin-bottom: 20px;
      }
      
      .mini-tomobi {
        font-size: 2.5rem;
        font-weight: 800;
        color: #FFB300;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 1;
        transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      
      .mini-tomorebeyond {
        font-size: 1.8rem;
        font-weight: 800;
        color: #FFB300;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
        transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      
      .mini-text-container.morphing .mini-tomobi {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.5) rotateY(90deg);
        filter: blur(10px);
      }
      
      .mini-text-container.morphing .mini-tomorebeyond {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      
      .mini-progress-bar {
        width: 200px;
        height: 3px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        overflow: hidden;
        margin: 0 auto;
      }
      
      .mini-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #FFB300, #FFA000);
        width: 0;
        border-radius: 2px;
        transition: width 800ms cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 0 10px rgba(255, 179, 0, 0.5);
      }
      
      @media (max-width: 768px) {
        .mini-tomobi {
          font-size: 2rem;
        }
        .mini-tomorebeyond {
          font-size: 1.4rem;
        }
        .mini-progress-bar {
          width: 150px;
        }
      }
    `;
    
    // Inject styles
    if (!document.querySelector('#mini-loader-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'mini-loader-styles';
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(miniLoader);
    this.miniLoader = miniLoader;
  }
  
  async transitionToPage(href) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    // Show mini loader
    this.miniLoader.classList.add('active');
    
    // Start text morphing animation
    setTimeout(() => {
      const textContainer = this.miniLoader.querySelector('.mini-text-container');
      textContainer.classList.add('morphing');
    }, 200);
    
    // Start progress bar
    setTimeout(() => {
      const progressFill = this.miniLoader.querySelector('.mini-progress-fill');
      progressFill.style.width = '100%';
    }, 300);
    
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, this.transitionDuration));
    
    // Navigate to new page
    window.location.href = href;
  }
  
  hideLoader() {
    if (this.miniLoader) {
      this.miniLoader.classList.remove('active');
      setTimeout(() => {
        const textContainer = this.miniLoader.querySelector('.mini-text-container');
        const progressFill = this.miniLoader.querySelector('.mini-progress-fill');
        textContainer.classList.remove('morphing');
        progressFill.style.width = '0';
        this.isTransitioning = false;
      }, 300);
    }
  }
  
  // Public method to manually trigger transition
  static triggerTransition(url) {
    const transition = new PageTransition();
    transition.transitionToPage(url);
  }
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', () => {
  new PageTransition();
});

// Hide loader when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    const pageTransition = document.querySelector('.mini-loader-overlay');
    if (pageTransition) {
      pageTransition.classList.remove('active');
    }
  }, 100);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PageTransition;
}