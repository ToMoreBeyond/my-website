// Page Transition Manager
class PageTransition {
  constructor() {
    this.overlay = document.querySelector('.page-transition-overlay');
    this.init();
  }

  init() {
    // Initialize Barba.js
    barba.init({
      transitions: [{
        name: 'default-transition',
        leave: (data) => {
          return this.leaveTransition(data);
        },
        enter: (data) => {
          return this.enterTransition(data);
        }
      }]
    });

    // Handle page transitions
    barba.hooks.after(() => {
      this.updateNavigation();
      this.scrollToTop();
    });
  }

  leaveTransition(data) {
    return gsap.timeline()
      .to(this.overlay, {
        y: '0%',
        duration: 0.5,
        ease: 'power4.inOut'
      })
      .to(data.current.container, {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut'
      });
  }

  enterTransition(data) {
    return gsap.timeline()
      .from(data.next.container, {
        y: '100%',
        duration: 0.8,
        ease: 'power4.inOut'
      })
      .to(this.overlay, {
        y: '-100%',
        duration: 0.5,
        ease: 'power4.inOut'
      });
  }

  updateNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
}

// Loading Screen Manager
class LoadingScreen {
  constructor() {
    this.screen = document.querySelector('.loading-screen');
    this.logo = document.querySelector('.loading-logo');
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      this.animate();
    });
  }

  animate() {
    gsap.timeline()
      .to(this.logo, {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(this.logo, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        ease: 'power2.inOut'
      })
      .to(this.screen, {
        y: '100%',
        duration: 0.8,
        ease: 'power4.inOut'
      });
  }
}

// Back Button Manager
class BackButton {
  constructor() {
    this.button = document.querySelector('.back-button');
    this.init();
  }

  init() {
    if (!this.button) return;

    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    });

    // Hover animation
    this.button.addEventListener('mouseenter', () => {
      gsap.to(this.button, {
        x: -10,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    this.button.addEventListener('mouseleave', () => {
      gsap.to(this.button, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  }
}

// Initialize Transitions
document.addEventListener('DOMContentLoaded', () => {
  new PageTransition();
  new LoadingScreen();
  new BackButton();
}); 