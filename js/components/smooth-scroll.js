class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.offset = 80;
    this.duration = 800;
    this.init();
  }
  
  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
    
    this.handleHashChange();
    window.addEventListener('hashchange', () => this.handleHashChange());
  }
  
  handleClick(e) {
    const href = e.currentTarget.getAttribute('href');
    
    if (href === '#') {
      e.preventDefault();
      this.scrollToTop();
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      this.scrollToElement(target);
      
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    }
  }
  
  handleHashChange() {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          this.scrollToElement(target, 0);
        }, 0);
      }
    }
  }
  
  scrollToElement(element, duration = this.duration) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - this.offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const ease = this.easeInOutCubic(progress);
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        element.focus({ preventScroll: true });
        
        if (!element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '-1');
        }
      }
    };
    
    requestAnimationFrame(animation);
  }
  
  scrollToTop() {
    const startPosition = window.pageYOffset;
    let startTime = null;
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / this.duration, 1);
      
      const ease = this.easeInOutCubic(progress);
      window.scrollTo(0, startPosition * (1 - ease));
      
      if (timeElapsed < this.duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }
  
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SmoothScroll();
});