class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.toggleButton = null;
    this.init();
  }
  
  init() {
    this.applyTheme();
    this.createToggleButton();
    this.setupEventListeners();
    this.watchSystemPreference();
  }
  
  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = this.theme === 'dark' ? '#0D0D0D' : '#FFFFFF';
    }
  }
  
  createToggleButton() {
    const existingButton = document.querySelector('.theme-toggle');
    if (existingButton) {
      this.toggleButton = existingButton;
      return;
    }
    
    this.toggleButton = document.createElement('button');
    this.toggleButton.className = 'theme-toggle';
    this.toggleButton.setAttribute('aria-label', 'Toggle theme');
    this.toggleButton.innerHTML = this.getIcon();
    
    const navbar = document.querySelector('.navbar-menu');
    if (navbar) {
      const li = document.createElement('li');
      li.appendChild(this.toggleButton);
      navbar.appendChild(li);
    }
  }
  
  getIcon() {
    if (this.theme === 'dark') {
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
    } else {
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
    }
  }
  
  setupEventListeners() {
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggleTheme());
    }
    
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  }
  
  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
    
    if (this.toggleButton) {
      this.toggleButton.innerHTML = this.getIcon();
    }
    
    this.animateTransition();
  }
  
  animateTransition() {
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
  }
  
  watchSystemPreference() {
    if (!window.matchMedia) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.theme = e.matches ? 'dark' : 'light';
        this.applyTheme();
        if (this.toggleButton) {
          this.toggleButton.innerHTML = this.getIcon();
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});