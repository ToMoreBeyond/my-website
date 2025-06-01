// Text Animation
class TextAnimation {
  constructor(element) {
    this.element = element;
    this.text = element.textContent;
    this.splitText();
    this.animate();
  }

  splitText() {
    const words = this.text.split(' ');
    this.element.innerHTML = words.map(word => 
      `<span class="word">${word}</span>`
    ).join(' ');
  }

  animate() {
    const words = this.element.querySelectorAll('.word');
    gsap.from(words, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.element,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    });
  }
}

// Image Parallax
class ImageParallax {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    gsap.to(this.element, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: this.element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}

// Scroll Progress
class ScrollProgress {
  constructor() {
    this.progress = document.querySelector('.scroll-progress');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      gsap.to(this.progress, {
        scaleX: scrolled / 100,
        duration: 0.1,
        ease: 'none'
      });
    });
  }
}

// Section Reveal
class SectionReveal {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    gsap.from(this.element, {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: this.element,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    });
  }
}

// Card Hover
class CardHover {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.addEventListener('mousemove', (e) => {
      const rect = this.element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      gsap.to(this.element, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    this.element.addEventListener('mouseleave', () => {
      gsap.to(this.element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }
}

// Initialize Animations
document.addEventListener('DOMContentLoaded', () => {
  // Text Animations
  document.querySelectorAll('.text-reveal').forEach(element => {
    new TextAnimation(element);
  });

  // Image Parallax
  document.querySelectorAll('.parallax-image').forEach(element => {
    new ImageParallax(element);
  });

  // Scroll Progress
  new ScrollProgress();

  // Section Reveals
  document.querySelectorAll('section').forEach(element => {
    new SectionReveal(element);
  });

  // Card Hovers
  document.querySelectorAll('.app-card').forEach(element => {
    new CardHover(element);
  });
}); 