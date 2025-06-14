// ToMoreBeyond レイジーゲームローダー
// パフォーマンス最適化されたローディング実装

import { cardsData } from '../data/cards-data.js';
import { MinimalSite } from './game-engine.js';
import { UIController } from './ui-controller.js';

export class LazyGameLoader {
  constructor() {
    this.gameInstance = null;
    this.uiController = null;
    this.isGameLoaded = false;
    this.loadingStarted = false;
    this.userInteracted = false;
    
    // Initialize critical components immediately
    this.initCriticalComponents();
    
    // Start loading process
    this.startLoadingSequence();
  }
  
  initCriticalComponents() {
    // Initialize UI controller
    this.uiController = new UIController();
    
    // Initialize loading screen immediately
    this.initLoadingScreen();
    
    // Add first user interaction listener for audio context
    this.addUserInteractionListener();
  }
  
  addUserInteractionListener() {
    const handleFirstInteraction = () => {
      this.userInteracted = true;
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      
      // Load game components after first interaction
      if (!this.loadingStarted) {
        this.loadGameComponents();
      }
    };
    
    document.addEventListener('click', handleFirstInteraction, { passive: true });
    document.addEventListener('keydown', handleFirstInteraction, { passive: true });
    document.addEventListener('touchstart', handleFirstInteraction, { passive: true });
  }
  
  initLoadingScreen() {
    this.loadingProgress = 0;
    this.progressFill = document.getElementById('progressFill');
    this.loadingText = document.getElementById('loadingText');
  }
  
  startLoadingSequence() {
    // Start simulated loading with realistic timing
    setTimeout(() => this.updateLoadingProgress(0), 100);
    setTimeout(() => this.updateLoadingProgress(15), 300);
    setTimeout(() => this.updateLoadingProgress(35), 600);
    setTimeout(() => this.updateLoadingProgress(50), 1000);
    setTimeout(() => this.updateLoadingProgress(70), 1400);
    setTimeout(() => this.updateLoadingProgress(85), 1800);
    setTimeout(() => this.updateLoadingProgress(100), 2200);
    
    // Auto-load after minimal delay even without interaction
    setTimeout(() => {
      if (!this.loadingStarted) {
        this.loadGameComponents();
      }
    }, 2500);
  }
  
  updateLoadingProgress(progress) {
    if (this.uiController) {
      this.uiController.updateLoadingProgress(progress);
    }
    
    if (progress >= 100) {
      setTimeout(() => this.completeLoading(), 500);
    }
  }
  
  async loadGameComponents() {
    if (this.loadingStarted) return;
    this.loadingStarted = true;
    
    try {
      // Load game data and components asynchronously
      await this.loadGameData();
      await this.loadGameClass();
      
      this.isGameLoaded = true;
    } catch (error) {
      console.error('Failed to load game components:', error);
      // Fallback: still complete loading
      this.isGameLoaded = true;
    }
  }
  
  async loadGameData() {
    // Load card data asynchronously
    return new Promise(resolve => {
      // Simulate async data loading
      setTimeout(() => {
        // Cards data is now imported from separate module
        window.cardsData = cardsData;
        resolve();
      }, 50);
    });
  }
  
  async loadGameClass() {
    // Load main game class asynchronously
    return new Promise(resolve => {
      // The MinimalSite class is imported from separate module
      window.MinimalSite = MinimalSite;
      setTimeout(resolve, 100);
    });
  }
  
  completeLoading() {
    if (this.uiController) {
      this.uiController.completeLoading();
    }
    
    // Initialize game after loading is complete
    this.initializeGame();
  }
  
  initializeGame() {
    if (this.isGameLoaded && window.cardsData && window.MinimalSite) {
      this.gameInstance = new window.MinimalSite();
      this.gameInstance.uiController = this.uiController;
      window.gameInstance = this.gameInstance;
      
      // Create pixel character
      if (this.uiController) {
        this.uiController.createPixelCharacter();
      }
    } else {
      // Retry after short delay
      setTimeout(() => this.initializeGame(), 100);
    }
  }
  
  destroy() {
    if (this.gameInstance && typeof this.gameInstance.destroy === 'function') {
      this.gameInstance.destroy();
    }
    
    this.gameInstance = null;
    this.uiController = null;
    this.isGameLoaded = false;
    this.loadingStarted = false;
    this.userInteracted = false;
  }
}