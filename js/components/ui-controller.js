// ToMoreBeyond UIコントローラー
// ローディング画面、レベル表示、通知システムの管理

export class UIController {
  constructor() {
    this.loadingProgress = 0;
    this.loadingMessages = [
      '旅の準備中...',
      '道を探しています...',
      'アプリを読み込んでいます...',
      'メンバーを集めています...',
      '最終準備中...',
      '旅立ちの時です！'
    ];
    
    this.progressFill = null;
    this.loadingText = null;
    this.levelDisplay = null;
    
    this.initElements();
  }
  
  initElements() {
    this.progressFill = document.getElementById('progressFill');
    this.loadingText = document.getElementById('loadingText');
    this.levelDisplay = document.querySelector('.level-display');
  }
  
  updateLoadingProgress(progress) {
    this.loadingProgress = progress;
    if (this.progressFill) {
      this.progressFill.style.width = progress + '%';
    }
    
    const messageIndex = Math.min(Math.floor(progress / 20), this.loadingMessages.length - 1);
    if (this.loadingText) {
      this.loadingText.textContent = this.loadingMessages[messageIndex];
    }
  }
  
  completeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      
      // Remove from DOM after transition
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
    
    // Update body class
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
  }
  
  showLogoPopup() {
    const logoPopup = document.getElementById('logoPopup');
    if (logoPopup) {
      logoPopup.classList.add('show');
      
      setTimeout(() => {
        logoPopup.classList.remove('show');
        logoPopup.classList.add('hide');
        
        setTimeout(() => {
          logoPopup.style.display = 'none';
        }, 800);
      }, 3000);
    }
  }
  
  updateLevelDisplay(currentLevel, currentExp, expToNextLevel) {
    const levelText = document.querySelector('.level-text span:last-child');
    const expFill = document.querySelector('.exp-fill');
    
    if (levelText) {
      levelText.textContent = `${currentLevel}`;
    }
    
    if (expFill) {
      const expPercentage = (currentExp / expToNextLevel) * 100;
      expFill.style.width = `${expPercentage}%`;
    }
  }
  
  showLevelUpEffect(newLevel) {
    // 8bitcn風レベルアップエフェクトを表示
    const effect = document.createElement('div');
    effect.className = 'level-up-effect';
    effect.textContent = `LEVEL ${newLevel}!`;
    document.body.appendChild(effect);
    
    // アニメーション完了後に削除
    setTimeout(() => {
      if (effect.parentNode) {
        effect.parentNode.removeChild(effect);
      }
    }, 2000);
  }
  
  showCompletionNotification() {
    // 完走通知の表示
    const notification = document.createElement('div');
    notification.className = 'completion-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">🎉</div>
        <div class="notification-title">旅路完走</div>
        <div class="notification-message">全ての道を歩き切りました</div>
        <div class="notification-submessage">おめでとうございます！</div>
        <button class="notification-button" onclick="this.parentElement.parentElement.remove()">
          了解
        </button>
      </div>
    `;
    document.body.appendChild(notification);
    
    // 背景エフェクト
    const effect = document.createElement('div');
    effect.className = 'completion-effect';
    document.body.appendChild(effect);
    
    setTimeout(() => {
      if (effect.parentNode) {
        effect.parentNode.removeChild(effect);
      }
    }, 3000);
  }
  
  showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--bg-secondary);
      color: var(--text-primary);
      padding: 12px 16px;
      border: 2px solid var(--border-primary);
      border-radius: 0;
      font-family: 'Share Tech Mono', monospace;
      font-size: 12px;
      z-index: 2000;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
      box-shadow: 
        2px 2px 0 var(--border-accent),
        4px 4px 0 rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show animation
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
  }
  
  updateCharacterColor(isMaxLevel) {
    const character = document.querySelector('.tiny-character');
    if (character) {
      if (isMaxLevel) {
        character.classList.add('max-level-achieved');
      } else {
        character.classList.remove('max-level-achieved');
      }
    }
  }
  
  createPixelCharacter() {
    // ピクセルキャラクターのSVG生成
    const characterElement = document.querySelector('.tiny-character');
    if (!characterElement) return;
    
    characterElement.innerHTML = `
      <div class="walking-animation-container">
        <div class="walk-frame frame1 active idle">
          <svg viewBox="0 0 16 16" class="char-svg">
            <g fill="#000">
              <!-- 頭 -->
              <rect x="6" y="2" width="4" height="4"></rect>
              <!-- 体 -->
              <rect x="7" y="6" width="2" height="4"></rect>
              <!-- 腕（アイドル） -->
              <rect x="5" y="7" width="2" height="1"></rect>
              <rect x="9" y="7" width="2" height="1"></rect>
              <!-- 足（揃える） -->
              <rect x="6" y="10" width="1" height="3"></rect>
              <rect x="9" y="10" width="1" height="3"></rect>
            </g>
          </svg>
        </div>
        
        <div class="walk-frame frame2">
          <svg viewBox="0 0 16 16" class="char-svg">
            <g fill="#000">
              <!-- 頭 -->
              <rect x="6" y="2" width="4" height="4"></rect>
              <!-- 体 -->
              <rect x="7" y="6" width="2" height="4"></rect>
              <!-- 腕（歩行1） -->
              <rect x="5" y="6" width="2" height="1"></rect>
              <rect x="9" y="8" width="2" height="1"></rect>
              <!-- 足（歩行1） -->
              <rect x="6" y="10" width="1" height="3"></rect>
              <rect x="8" y="11" width="1" height="2"></rect>
            </g>
          </svg>
        </div>
        
        <div class="walk-frame frame3">
          <svg viewBox="0 0 16 16" class="char-svg">
            <g fill="#000">
              <!-- 頭 -->
              <rect x="6" y="2" width="4" height="4"></rect>
              <!-- 体 -->
              <rect x="7" y="6" width="2" height="4"></rect>
              <!-- 腕（歩行2） -->
              <rect x="5" y="8" width="2" height="1"></rect>
              <rect x="9" y="6" width="2" height="1"></rect>
              <!-- 足（歩行2） -->
              <rect x="8" y="10" width="1" height="3"></rect>
              <rect x="6" y="11" width="1" height="2"></rect>
            </g>
          </svg>
        </div>
        
        <div class="walk-frame frame4">
          <svg viewBox="0 0 16 16" class="char-svg">
            <g fill="#000">
              <!-- 頭 -->
              <rect x="6" y="2" width="4" height="4"></rect>
              <!-- 体 -->
              <rect x="7" y="6" width="2" height="4"></rect>
              <!-- 腕（歩行3） -->
              <rect x="5" y="7" width="2" height="1"></rect>
              <rect x="9" y="7" width="2" height="1"></rect>
              <!-- 足（歩行3） -->
              <rect x="7" y="10" width="1" height="3"></rect>
              <rect x="8" y="10" width="1" height="3"></rect>
            </g>
          </svg>
        </div>
        
        <div class="walk-frame pointing">
          <svg viewBox="0 0 16 16" class="char-svg">
            <g fill="#000">
              <!-- 頭 -->
              <rect x="6" y="2" width="4" height="4"></rect>
              <!-- 体 -->
              <rect x="7" y="6" width="2" height="4"></rect>
              <!-- 指差しポーズ -->
              <rect x="9" y="6" width="3" height="1"></rect>
              <rect x="5" y="8" width="2" height="1"></rect>
              <!-- 足 -->
              <rect x="6" y="10" width="1" height="3"></rect>
              <rect x="9" y="10" width="1" height="3"></rect>
            </g>
          </svg>
        </div>
      </div>
    `;
  }
}