/* ToMoreBeyond - Performance Manager */
/* メモリ効率とパフォーマンス最適化システム */

class PerformanceManager {
  constructor() {
    this.isLowEndDevice = this.detectDeviceCapability();
    this.memoryUsage = {
      peak: 0,
      current: 0,
      threshold: 100 * 1024 * 1024 // 100MB
    };
    
    this.performanceSettings = {
      // デバイス能力に基づく設定
      maxSignboards: this.isLowEndDevice ? 8 : 20,
      animationQuality: this.isLowEndDevice ? 'low' : 'high',
      shadowQuality: this.isLowEndDevice ? 'low' : 'high',
      textureDetail: this.isLowEndDevice ? 'low' : 'high',
      
      // フレームレート管理
      targetFPS: 60,
      minFPS: 30,
      currentFPS: 60,
      
      // レンダリング設定
      renderDistance: this.isLowEndDevice ? window.innerWidth : window.innerWidth * 2,
      cullDistance: this.isLowEndDevice ? window.innerWidth * 0.5 : window.innerWidth,
      
      // オブジェクトプール設定
      poolSize: this.isLowEndDevice ? 15 : 30,
      recycleThreshold: this.isLowEndDevice ? 5 : 10
    };
    
    this.observers = {
      fps: [],
      memory: [],
      performance: []
    };
    
    this.init();
  }
  
  init() {
    this.startMonitoring();
    this.setupAdaptiveSettings();
    this.optimizeForDevice();
  }
  
  detectDeviceCapability() {
    // デバイスの能力を検出
    const factors = {
      memory: navigator.deviceMemory || 4,
      cores: navigator.hardwareConcurrency || 4,
      connection: navigator.connection?.effectiveType || '4g',
      webgl: this.checkWebGLSupport(),
      mobile: /Mobi|Android/i.test(navigator.userAgent)
    };
    
    // スコア計算
    let score = 0;
    score += Math.min(factors.memory / 4, 2); // メモリ
    score += Math.min(factors.cores / 4, 2); // CPU
    score += factors.connection === '4g' ? 2 : factors.connection === '3g' ? 1 : 0.5;
    score += factors.webgl ? 1 : 0;
    score -= factors.mobile ? 1 : 0; // モバイルは性能を下げる
    
    return score < 4; // 4未満は低性能デバイス
  }
  
  checkWebGLSupport() {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }
  
  startMonitoring() {
    // FPS監視
    this.startFPSMonitoring();
    
    // メモリ監視
    this.startMemoryMonitoring();
    
    // パフォーマンス監視
    this.startPerformanceMonitoring();
  }
  
  startFPSMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        this.performanceSettings.currentFPS = Math.round(
          (frameCount * 1000) / (currentTime - lastTime)
        );
        
        // FPS低下時の対応
        if (this.performanceSettings.currentFPS < this.performanceSettings.minFPS) {
          this.degradePerformance();
        } else if (this.performanceSettings.currentFPS > this.performanceSettings.targetFPS * 0.9) {
          this.improvePerformance();
        }
        
        this.notifyObservers('fps', this.performanceSettings.currentFPS);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }
  
  startMemoryMonitoring() {
    if (!performance.memory) return;
    
    const checkMemory = () => {
      this.memoryUsage.current = performance.memory.usedJSHeapSize;
      this.memoryUsage.peak = Math.max(this.memoryUsage.peak, this.memoryUsage.current);
      
      // メモリ使用量が閾値を超えた場合
      if (this.memoryUsage.current > this.memoryUsage.threshold) {
        this.forceGarbageCollection();
        this.reduceMemoryUsage();
      }
      
      this.notifyObservers('memory', this.memoryUsage);
      
      setTimeout(checkMemory, 5000); // 5秒ごとにチェック
    };
    
    checkMemory();
  }
  
  startPerformanceMonitoring() {
    // Intersection Observer for visibility optimization
    this.setupVisibilityOptimization();
    
    // Resize observer for adaptive scaling
    this.setupResizeOptimization();
  }
  
  setupVisibilityOptimization() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        if (entry.isIntersecting) {
          this.enableElementOptimizations(element);
        } else {
          this.disableElementOptimizations(element);
        }
      });
    }, {
      rootMargin: '50px'
    });
    
    // 重要な要素を監視
    document.querySelectorAll('.floating-signboard, .walking-hero').forEach(el => {
      observer.observe(el);
    });
  }
  
  setupResizeOptimization() {
    const resizeObserver = new ResizeObserver(entries => {
      this.adaptToViewportSize();
    });
    
    resizeObserver.observe(document.body);
  }
  
  degradePerformance() {
    // パフォーマンス低下時の対策
    this.performanceSettings.maxSignboards = Math.max(
      5, 
      this.performanceSettings.maxSignboards - 2
    );
    
    this.performanceSettings.animationQuality = 'low';
    this.performanceSettings.shadowQuality = 'low';
    
    // アニメーションを簡素化
    this.simplifyAnimations();
    
    console.log('Performance degraded:', this.performanceSettings);
  }
  
  improvePerformance() {
    // パフォーマンス改善時の対策
    if (this.performanceSettings.currentFPS > this.performanceSettings.targetFPS * 0.95) {
      this.performanceSettings.maxSignboards = Math.min(
        this.isLowEndDevice ? 12 : 25,
        this.performanceSettings.maxSignboards + 1
      );
      
      if (!this.isLowEndDevice) {
        this.performanceSettings.animationQuality = 'high';
        this.performanceSettings.shadowQuality = 'high';
      }
    }
  }
  
  simplifyAnimations() {
    // アニメーションの簡素化
    const style = document.createElement('style');
    style.id = 'performance-optimizations';
    style.textContent = `
      .floating-signboard {
        transition: transform 0.2s ease !important;
      }
      
      .walking-hero * {
        animation-duration: 0.4s !important;
      }
      
      .signboard-3d {
        transform: none !important;
      }
      
      ${this.performanceSettings.shadowQuality === 'low' ? `
        .trail-card,
        .wooden-sign,
        .hero-wooden-sign {
          box-shadow: 0 2px 8px rgba(0,0,0,0.2) !important;
        }
      ` : ''}
    `;
    
    // 既存のスタイルを削除して新しいものを追加
    const existing = document.getElementById('performance-optimizations');
    if (existing) existing.remove();
    document.head.appendChild(style);
  }
  
  forceGarbageCollection() {
    // ガベージコレクションを促す
    if (window.gc) {
      window.gc();
    }
    
    // 不要なリスナーを削除
    this.cleanupEventListeners();
  }
  
  reduceMemoryUsage() {
    // メモリ使用量を減らす
    this.performanceSettings.maxSignboards = Math.max(
      3,
      Math.floor(this.performanceSettings.maxSignboards * 0.7)
    );
    
    this.performanceSettings.poolSize = Math.max(
      10,
      Math.floor(this.performanceSettings.poolSize * 0.8)
    );
    
    // 古いオブジェクトを削除
    this.purgeOldObjects();
  }
  
  purgeOldObjects() {
    // 使用されていないDOMエレメントを削除
    const signboards = document.querySelectorAll('.floating-signboard');
    const toRemove = Array.from(signboards).slice(this.performanceSettings.maxSignboards);
    
    toRemove.forEach(el => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
  }
  
  cleanupEventListeners() {
    // 不要なイベントリスナーを削除
    const elements = document.querySelectorAll('[data-cleanup="true"]');
    elements.forEach(el => {
      const newElement = el.cloneNode(true);
      el.parentNode.replaceChild(newElement, el);
    });
  }
  
  enableElementOptimizations(element) {
    element.style.willChange = 'transform, opacity';
    element.style.transform = 'translateZ(0)'; // GPU加速
  }
  
  disableElementOptimizations(element) {
    element.style.willChange = 'auto';
  }
  
  adaptToViewportSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // ビューポートサイズに基づく調整
    if (width < 768) {
      this.performanceSettings.maxSignboards = Math.max(
        5,
        Math.floor(this.performanceSettings.maxSignboards * 0.6)
      );
    } else if (width > 1920) {
      this.performanceSettings.maxSignboards = Math.min(
        this.isLowEndDevice ? 15 : 30,
        Math.floor(this.performanceSettings.maxSignboards * 1.2)
      );
    }
    
    this.performanceSettings.renderDistance = width * (this.isLowEndDevice ? 1 : 2);
  }
  
  setupAdaptiveSettings() {
    // ネットワーク状態に基づく調整
    if (navigator.connection) {
      const connection = navigator.connection;
      
      const updateForConnection = () => {
        switch (connection.effectiveType) {
          case '2g':
            this.performanceSettings.animationQuality = 'low';
            this.performanceSettings.maxSignboards = Math.max(3, this.performanceSettings.maxSignboards * 0.5);
            break;
          case '3g':
            this.performanceSettings.animationQuality = 'medium';
            this.performanceSettings.maxSignboards = Math.max(5, this.performanceSettings.maxSignboards * 0.7);
            break;
          case '4g':
          default:
            // 現在の設定を維持
            break;
        }
      };
      
      connection.addEventListener('change', updateForConnection);
      updateForConnection();
    }
  }
  
  optimizeForDevice() {
    // 特定デバイス向けの最適化
    if (this.isLowEndDevice) {
      // 低性能デバイス向け最適化
      document.body.classList.add('low-performance-mode');
      
      // CSSアニメーションを無効化
      const style = document.createElement('style');
      style.textContent = `
        .low-performance-mode * {
          animation-duration: 0.3s !important;
          transition-duration: 0.2s !important;
        }
        
        .low-performance-mode .animate-sway,
        .low-performance-mode .animate-float {
          animation: none !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    // バッテリー状態に基づく最適化
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        const optimizeForBattery = () => {
          if (battery.level < 0.2 || !battery.charging) {
            this.enablePowerSaveMode();
          } else {
            this.disablePowerSaveMode();
          }
        };
        
        battery.addEventListener('levelchange', optimizeForBattery);
        battery.addEventListener('chargingchange', optimizeForBattery);
        optimizeForBattery();
      });
    }
  }
  
  enablePowerSaveMode() {
    document.body.classList.add('power-save-mode');
    this.performanceSettings.maxSignboards = Math.max(3, this.performanceSettings.maxSignboards * 0.5);
    this.performanceSettings.animationQuality = 'low';
    
    console.log('Power save mode enabled');
  }
  
  disablePowerSaveMode() {
    document.body.classList.remove('power-save-mode');
    // 設定を元に戻す
    this.performanceSettings.maxSignboards = this.isLowEndDevice ? 8 : 20;
    this.performanceSettings.animationQuality = this.isLowEndDevice ? 'low' : 'high';
    
    console.log('Power save mode disabled');
  }
  
  // オブザーバーパターン
  addObserver(type, callback) {
    if (this.observers[type]) {
      this.observers[type].push(callback);
    }
  }
  
  notifyObservers(type, data) {
    if (this.observers[type]) {
      this.observers[type].forEach(callback => callback(data));
    }
  }
  
  // パブリックAPI
  getSettings() {
    return { ...this.performanceSettings };
  }
  
  updateSettings(newSettings) {
    Object.assign(this.performanceSettings, newSettings);
  }
  
  getCurrentFPS() {
    return this.performanceSettings.currentFPS;
  }
  
  getMemoryUsage() {
    return { ...this.memoryUsage };
  }
  
  // デバッグ用
  getDebugInfo() {
    return {
      isLowEndDevice: this.isLowEndDevice,
      settings: this.performanceSettings,
      memory: this.memoryUsage,
      deviceInfo: {
        memory: navigator.deviceMemory,
        cores: navigator.hardwareConcurrency,
        connection: navigator.connection?.effectiveType,
        userAgent: navigator.userAgent
      }
    };
  }
}

// グローバルインスタンス
let performanceManager;

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  performanceManager = new PerformanceManager();
  
  // Walking Hero Systemにパフォーマンス設定を適用
  if (window.walkingHeroSystem) {
    const settings = performanceManager.getSettings();
    window.walkingHeroSystem.performanceSettings = {
      ...window.walkingHeroSystem.performanceSettings,
      ...settings
    };
  }
  
  // パフォーマンス情報をコンソールに表示（開発用）
  if (localStorage.getItem('debug') === 'true') {
    console.log('Performance Manager initialized:', performanceManager.getDebugInfo());
    
    performanceManager.addObserver('fps', (fps) => {
      console.log(`FPS: ${fps}`);
    });
    
    performanceManager.addObserver('memory', (memory) => {
      console.log(`Memory: ${(memory.current / 1024 / 1024).toFixed(2)}MB`);
    });
  }
});

// エクスポート
window.PerformanceManager = PerformanceManager;