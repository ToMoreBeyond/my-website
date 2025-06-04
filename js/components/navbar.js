class Navbar {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.toggle = document.querySelector('.navbar-toggle');
    this.menu = document.querySelector('.navbar-menu');
    this.links = document.querySelectorAll('.navbar-link');
    this.isOpen = false;
    this.lastScroll = 0;
    
    this.init();
  }
  
  init() {
    if (this.toggle && this.menu) {
      this.toggle.addEventListener('click', () => this.toggleMenu());
    }
    
    this.links.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target) && this.isOpen) {
        this.closeMenu();
      }
    });
    
    this.handleScroll();
    
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menu.classList.toggle('active');
    this.toggle.classList.toggle('active');
    
    this.toggle.setAttribute('aria-expanded', this.isOpen);
    
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  closeMenu() {
    this.isOpen = false;
    this.menu.classList.remove('active');
    this.toggle.classList.remove('active');
    this.toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  
  handleScroll() {
    let ticking = false;
    
    const updateNavbar = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
      
      if (currentScroll > this.lastScroll && currentScroll > 200) {
        this.navbar.classList.add('hidden');
      } else {
        this.navbar.classList.remove('hidden');
      }
      
      this.lastScroll = currentScroll;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Navbar();
});