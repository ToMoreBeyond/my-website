// ToMoreBeyond メインゲームエンジン
// 8bitcnスタイルのインタラクティブ体験システム

import { cardsData, sectionConfig, gameConfig } from '../data/cards-data.js';

export class MinimalSite {
  constructor() {
    // Memory Management
    this.isDestroyed = false;
    this.eventListeners = new Map(); // Track event listeners for cleanup
    this.timers = new Set(); // Track timers for cleanup
    this.intervals = new Set(); // Track intervals for cleanup
    this.rafIds = new Set(); // Track RAF IDs for cleanup
    
    // Game State
    this.currentSection = 'company';
    this.sections = ['company', 'apps', 'members', 'media', 'contact'];
    this.sectionIndex = 0;
    this.isScrolling = false;
    this.scrollTimer = null;
    this.baseScrollSpeed = 60;
    this.currentScrollSpeed = this.baseScrollSpeed;
    this.walkSpeed = 0.8;
    this.speedMultiplier = 1.0;
    this.isNavigating = false;
    
    // Animation Management (Memory Optimized)
    this.walkingInterval = null;
    this.pointingTimeout = null;
    this.currentWalkFrame = 0;
    this.walkFrames = ['frame1', 'frame2', 'frame3', 'frame4'];
    
    // Performance Optimized RAF Management
    this.rafId = null;
    this.lastTime = 0;
    this.targetFPS = 60;
    this.frameInterval = 1000 / this.targetFPS;
    
    // 新しい横スクロール構造管理
    this.characterPosition = 0.05; // 開始位置をより左に（ほぼ左端）
    this.totalJourneyWidth = window.innerWidth * 6; // 6画面分の旅路
    this.sectionCheckpoints = [
      { name: 'apps', position: 0.16, title: 'アプリ' },
      { name: 'company', position: 0.32, title: '会社' },
      { name: 'members', position: 0.48, title: 'メンバー' },
      { name: 'media', position: 0.64, title: 'メディア' },
      { name: 'contact', position: 0.8, title: 'コンタクト' }
    ];
    this.currentCheckpoint = -1; // 初期状態は-1
    this.isAtCheckpoint = false;
    this.checkpointPauseTime = 2000; // 2秒間チェックポイントで停止
    
    // レベルアップシステム
    this.currentLevel = 1;
    this.currentExp = 0;
    this.expPerCard = gameConfig.expPerCard;
    this.viewedCards = new Set(); // 既に見たカードを記録
    this.maxLevel = gameConfig.maxLevel; // カードの総数と同じ
    this.expToNextLevel = gameConfig.expToLevelUp; // 1カード見れば1レベルアップ
    this.maxLevelReached = false; // 最大レベル到達フラグ
    
    // LocalStorageから進行状況を読み込む
    this.loadProgress()
    
    // 8bit サウンドシステム
    this.audioContext = null;
    this.isAudioEnabled = false;
    this.initAudio();
    
    // キャラクター進化システム
    this.evolutionLevel = 0; // 0-5の進化レベル
    this.evolutionThresholds = [0.2, 0.4, 0.6, 0.8, 1.0]; // 進化が起こる位置
    
    // カードスクロール管理
    this.cardScrollTimeout = null;
    
    // Core Web Vitals Optimization
    this.intersectionObserver = null;
    this.mutationObserver = null;
    this.performanceMetrics = {
      lcp: null,
      fid: null,
      cls: null
    };
    
    // ローディング管理
    this.loadingProgress = 0;
    this.loadingMessages = [
      '旅の準備中...',
      '道を探しています...',
      'アプリを読み込んでいます...',
      'メンバーを集めています...',
      '最終準備中...',
      '旅立ちの時です！'
    ];
    
    // Initialize optimizations
    this.initCoreWebVitals();
    this.startLoading();
    this.prepareVideoTransition();
  }
  
  // ============================================================================
  // PERFORMANCE OPTIMIZATION METHODS
  // ============================================================================
  
  initCoreWebVitals() {
    // Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            if (element.dataset.src) {
              element.src = element.dataset.src;
              element.removeAttribute('data-src');
              this.intersectionObserver.unobserve(element);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.1
      });
    }
    
    // Performance metrics tracking
    this.trackCoreWebVitals();
    
    // Passive event listeners for better performance
    this.setupPassiveEventListeners();
  }
  
  trackCoreWebVitals() {
    // Track LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.performanceMetrics.lcp = lastEntry.startTime;
          console.log('LCP:', this.performanceMetrics.lcp);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Track FID (First Input Delay)
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.performanceMetrics.fid = entry.processingStart - entry.startTime;
            console.log('FID:', this.performanceMetrics.fid);
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // Track CLS (Cumulative Layout Shift)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          this.performanceMetrics.cls = clsValue;
          console.log('CLS:', this.performanceMetrics.cls);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.log('Performance Observer not fully supported');
      }
    }
  }
  
  setupPassiveEventListeners() {
    // Add passive event listeners for better performance
    const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'scroll'];
    passiveEvents.forEach(eventType => {
      document.addEventListener(eventType, this.handlePassiveEvent.bind(this), { passive: true });
      this.eventListeners.set(eventType, this.handlePassiveEvent.bind(this));
    });
  }
  
  handlePassiveEvent(event) {
    // Handle passive events without blocking main thread
    if (this.isDestroyed) return;
    
    // Throttle expensive operations
    if (!this.passiveEventThrottle) {
      this.passiveEventThrottle = this.throttle(() => {
        // Handle the actual event logic here
        this.updatePerformanceState();
      }, 16); // ~60fps
    }
    
    this.passiveEventThrottle();
  }
  
  updatePerformanceState() {
    // Update performance-sensitive state
    if (this.isDestroyed) return;
    
    // Use requestIdleCallback for non-critical updates
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.performNonCriticalUpdates();
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => this.performNonCriticalUpdates(), 0);
    }
  }
  
  performNonCriticalUpdates() {
    // Perform non-critical updates when the browser is idle
    if (this.isDestroyed) return;
    
    // Clean up unused references
    this.cleanupUnusedReferences();
  }
  
  cleanupUnusedReferences() {
    // Clean up weak references and unused DOM elements
    if (this.viewedCards.size > 100) {
      // Limit the size of viewed cards set to prevent memory bloat
      const cardsArray = Array.from(this.viewedCards);
      this.viewedCards = new Set(cardsArray.slice(-50));
    }
  }
  
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
  
  // Memory management and cleanup
  destroy() {
    if (this.isDestroyed) return;
    
    this.isDestroyed = true;
    
    // Clear all timers
    this.timers.forEach(timerId => clearTimeout(timerId));
    this.timers.clear();
    
    // Clear all intervals
    this.intervals.forEach(intervalId => clearInterval(intervalId));
    this.intervals.clear();
    
    // Cancel all RAF
    this.rafIds.forEach(rafId => cancelAnimationFrame(rafId));
    this.rafIds.clear();
    
    // Remove event listeners
    this.eventListeners.forEach((handler, eventType) => {
      document.removeEventListener(eventType, handler);
    });
    this.eventListeners.clear();
    
    // Disconnect observers
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    
    // Close audio context
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
    
    // Clear references
    this.viewedCards.clear();
    this.performanceMetrics = null;
  }
  
  prepareVideoTransition() {
    // 動画遷移シーケンスの準備
    this.videoBackground = document.getElementById('videoBackground');
    this.transitionOverlay = document.getElementById('transitionOverlay');
    this.logoPopup = document.getElementById('logoPopup');
  }
  
  startVideoSequence() {
    // 将来的に動画が準備されたらここで制御
    // 1. 動画開始
    // 2. ロゴポップアップ表示
    // 3. フェードアウト
    // 4. ゲーム世界表示
    
    // 現在は直接ゲーム画面を表示
    setTimeout(() => {
      this.showLogoPopup();
    }, 500);
  }

  // ============================================================================
  // GAME INITIALIZATION METHODS (続きは次のファイルで定義)
  // ============================================================================
  
  // プログレス保存機能
  saveProgress() {
    const progress = {
      currentLevel: this.currentLevel,
      currentExp: this.currentExp,
      viewedCards: Array.from(this.viewedCards),
      maxLevelReached: this.maxLevelReached,
      characterPosition: this.characterPosition,
      currentCheckpoint: this.currentCheckpoint
    };
    
    try {
      localStorage.setItem('tomorebeyond_progress', JSON.stringify(progress));
    } catch (error) {
      console.warn('Failed to save progress:', error);
    }
  }
  
  loadProgress() {
    try {
      const saved = localStorage.getItem('tomorebeyond_progress');
      if (saved) {
        const progress = JSON.parse(saved);
        this.currentLevel = progress.currentLevel || 1;
        this.currentExp = progress.currentExp || 0;
        this.viewedCards = new Set(progress.viewedCards || []);
        this.maxLevelReached = progress.maxLevelReached || false;
        this.characterPosition = progress.characterPosition || 0.05;
        this.currentCheckpoint = progress.currentCheckpoint || -1;
      }
    } catch (error) {
      console.warn('Failed to load progress:', error);
    }
  }
  
  resetProgress() {
    this.currentLevel = 1;
    this.currentExp = 0;
    this.viewedCards.clear();
    this.maxLevelReached = false;
    this.characterPosition = 0.05;
    this.currentCheckpoint = -1;
    
    try {
      localStorage.removeItem('tomorebeyond_progress');
    } catch (error) {
      console.warn('Failed to clear progress:', error);
    }
    
    this.updateLevelDisplay();
    this.updateCharacterPosition();
  }
}