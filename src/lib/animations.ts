/**
 * Lightweight Animation System
 * studio.design/ja inspired performance-first animations
 */

// Animation configuration
export const ANIMATION_CONFIG = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  duration: {
    fast: 150,
    base: 250,
    slow: 350,
  }
} as const;

// Animation types
export type AnimationType = 
  | 'fade-in'
  | 'fade-in-up'
  | 'fade-in-down' 
  | 'fade-in-left'
  | 'fade-in-right'
  | 'scale-in'
  | 'scale-bounce';

// Animation element interface
interface AnimatedElement {
  element: HTMLElement;
  animation: AnimationType;
  delay?: number;
  observed?: boolean;
}

class AnimationController {
  private observer: IntersectionObserver;
  private elements: Map<Element, AnimatedElement> = new Map();
  
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: ANIMATION_CONFIG.threshold,
        rootMargin: ANIMATION_CONFIG.rootMargin,
      }
    );
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const elementData = this.elements.get(entry.target);
        if (elementData && !elementData.observed) {
          this.triggerAnimation(elementData);
          elementData.observed = true;
        }
      }
    });
  }

  private triggerAnimation(elementData: AnimatedElement) {
    const { element, animation, delay = 0 } = elementData;
    
    // Apply initial state
    element.style.opacity = '0';
    element.style.visibility = 'visible';
    
    // Trigger animation with delay
    setTimeout(() => {
      element.classList.add(`animate-${animation}`);
      element.style.opacity = '';
    }, delay);
  }

  // Public methods
  public observe(element: HTMLElement, animation: AnimationType, delay = 0) {
    if (!element) return;
    
    const elementData: AnimatedElement = {
      element,
      animation,
      delay,
      observed: false
    };
    
    this.elements.set(element, elementData);
    this.observer.observe(element);
    
    // Set initial invisible state
    element.style.opacity = '0';
    element.style.visibility = 'hidden';
  }

  public unobserve(element: Element) {
    this.observer.unobserve(element);
    this.elements.delete(element);
  }

  public disconnect() {
    this.observer.disconnect();
    this.elements.clear();
  }
}

// Global animation controller instance
let animationController: AnimationController;

export const getAnimationController = () => {
  if (typeof window === 'undefined') return null;
  
  if (!animationController) {
    animationController = new AnimationController();
  }
  
  return animationController;
};

// React Hook for animations
export const useScrollAnimation = () => {
  const controller = getAnimationController();
  
  const observeElement = (
    element: HTMLElement | null, 
    animation: AnimationType, 
    delay = 0
  ) => {
    if (element && controller) {
      controller.observe(element, animation, delay);
    }
  };

  const unobserveElement = (element: HTMLElement | null) => {
    if (element && controller) {
      controller.unobserve(element);
    }
  };

  return { observeElement, unobserveElement };
};

// Utility functions for manual animations
export const animateElement = (
  element: HTMLElement,
  animation: AnimationType,
  delay = 0
) => {
  if (typeof window === 'undefined') return;
  
  element.style.opacity = '0';
  element.style.visibility = 'visible';
  
  setTimeout(() => {
    element.classList.add(`animate-${animation}`);
    element.style.opacity = '';
  }, delay);
};

// Stagger animation helper
export const staggerElements = (
  elements: NodeListOf<HTMLElement> | HTMLElement[],
  animation: AnimationType,
  baseDelay = 0,
  staggerDelay = 100
) => {
  elements.forEach((element, index) => {
    animateElement(element, animation, baseDelay + (index * staggerDelay));
  });
};

// Parallax scroll effect
export const createParallaxEffect = (element: HTMLElement, speed = 0.5) => {
  if (typeof window === 'undefined') return () => {};
  
  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -speed;
    element.style.transform = `translateY(${rate}px)`;
  };

  // Throttle scroll events for performance
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
};

// Counter animation
export const animateCounter = (
  element: HTMLElement,
  endValue: number,
  duration = 2000,
  startValue = 0
) => {
  const startTime = performance.now();
  const valueRange = endValue - startValue;
  
  const updateCounter = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(startValue + (valueRange * easedProgress));
    
    element.textContent = currentValue.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  };
  
  requestAnimationFrame(updateCounter);
};

// Typing effect
export const createTypingEffect = (
  element: HTMLElement,
  text: string,
  speed = 50
) => {
  let index = 0;
  element.textContent = '';
  
  const typeChar = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(typeChar, speed);
    }
  };
  
  typeChar();
};

// Smooth scroll to element
export const smoothScrollTo = (target: string | HTMLElement, offset = 0) => {
  const element = typeof target === 'string' 
    ? document.querySelector(target) as HTMLElement
    : target;
    
  if (element) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};

// Cleanup function for React components
export const cleanupAnimations = () => {
  if (animationController) {
    animationController.disconnect();
  }
};