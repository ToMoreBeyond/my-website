// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const body = document.body;
const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const scrollProgress = document.querySelector('.scroll-progress');
const loadingScreen = document.querySelector('.loading-screen');
const backButton = document.querySelector('.back-button');

// Loading Screen Animation
window.addEventListener('load', () => {
  const loadingLogo = document.querySelector('.loading-logo');
  
  gsap.timeline()
    .to(loadingLogo, {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut'
    })
    .to(loadingLogo, {
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
      ease: 'power2.inOut'
    })
    .to(loadingScreen, {
      y: '100%',
      duration: 0.8,
      ease: 'power4.inOut'
    });
});

// Navigation Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    nav.classList.remove('hidden');
    return;
  }
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
  
  lastScroll = currentScroll;
});

// Mobile Menu Toggle
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  body.classList.toggle('menu-open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    mobileMenu.classList.remove('active');
    body.classList.remove('menu-open');
  });
});

// Scroll Progress
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  
  gsap.to(scrollProgress, {
    scaleX: scrolled / 100,
    duration: 0.1,
    ease: 'none'
  });
});

// Back Button Visibility
if (backButton) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      backButton.classList.add('visible');
    } else {
      backButton.classList.remove('visible');
    }
  });
}

// Text Reveal Animation
const textReveal = document.querySelectorAll('.text-reveal');
textReveal.forEach(element => {
  const words = element.textContent.split(' ');
  element.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
});

// Section Animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none reverse'
    }
  });
});

// Card Hover Effects
const cards = document.querySelectorAll('.app-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
});

// Initialize Barba.js
barba.init({
  transitions: [{
    name: 'default-transition',
    leave: (data) => {
      return gsap.to(data.current.container, {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    },
    enter: (data) => {
      return gsap.from(data.next.container, {
        y: '100%',
        duration: 0.8,
        ease: 'power4.inOut'
      });
    }
  }]
}); 