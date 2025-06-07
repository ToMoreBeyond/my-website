/* ToMoreBeyond - Walking Hero System JavaScript */
/* 歩く主人公と連動する看板システムの制御 */

class WalkingHeroSystem {
  constructor() {
    this.hero = null;
    this.signboardsContainer = null;
    this.signboardsTrack = null;
    this.roadSystem = null;
    this.floatingNav = null;
    
    // アニメーション状態
    this.isWalking = false;
    this.walkDirection = 'right'; // 'left' or 'right'
    this.scrollVelocity = 0;
    this.lastScrollTop = 0;
    this.animationId = null;
    
    // 看板データ
    this.signboards = [
      {
        id: 'hero',
        icon: '🏠',
        title: 'ホーム',
        subtitle: '私たちの始まり',
        section: 'hero',
        link: '#hero'
      },
      {
        id: 'about',
        icon: '🗺️',
        title: '価値観',
        subtitle: '道を歩む理念',
        section: 'about',
        link: '#about'
      },
      {
        id: 'tadataka',
        icon: '👣',
        title: 'TADATAKA',
        subtitle: '足跡を残す道',
        section: 'apps',
        link: 'pages/tadataka.html'
      },
      {
        id: 'toirun',
        icon: '🚽',
        title: 'ToiRun',
        subtitle: '救いの道',
        section: 'apps',
        link: 'pages/toirun.html'
      },
      {
        id: 'midpoint',
        icon: '📍',
        title: 'Meet in the Middle',
        subtitle: '合流の道',
        section: 'apps',
        link: 'pages/midpoint.html'
      },
      {
        id: 'company',
        icon: '🏢',
        title: '会社情報',
        subtitle: '私たちの組織',
        section: 'company',
        link: 'pages/company.html'
      },
      {
        id: 'yamada',
        icon: '👨‍💻',
        title: '山田',
        subtitle: 'CDO / デザイン',
        section: 'team',
        link: 'pages/member_yamada.html'
      },
      {
        id: 'masadome',
        icon: '🚀',
        title: '正留',
        subtitle: 'CEO / エンジニア',
        section: 'team',
        link: 'pages/member_masadome.html'
      },
      {
        id: 'ando',
        icon: '🎨',
        title: '安藤',
        subtitle: 'アート・アニメ',
        section: 'team',
        link: 'pages/member_ando.html'
      },
      {
        id: 'media',
        icon: '📰',
        title: 'メディア',
        subtitle: '私たちの発信',
        section: 'media',
        link: 'pages/media.html'
      },
      {
        id: 'contact',
        icon: '💌',
        title: 'お問い合わせ',
        subtitle: '道の先で会いましょう',
        section: 'contact',
        link: '#contact'
      }
    ];
    
    // パフォーマンス設定
    this.performanceSettings = {
      maxSignboards: 20, // 同時に表示する最大看板数
      signboardSpacing: 300, // 看板間の距離
      renderDistance: window.innerWidth * 2, // レンダリング距離
      poolSize: 30 // オブジェクトプールサイズ
    };
    
    // オブジェクトプール
    this.signboardPool = [];
    this.activeSignboards = [];
    
    // セクション管理
    this.currentSection = 'hero';
    this.sections = ['hero', 'about', 'apps', 'company', 'team', 'media', 'contact'];
    
    this.init();
  }
  
  init() {
    this.createHTML();
    this.setupEventListeners();
    this.initializeSignboardPool();
    this.startAnimation();
    this.updateCurrentSection();
  }
  
  createHTML() {
    // 歩く主人公を作成
    this.createWalkingHero();
    
    // 無限スクロール看板コンテナを作成
    this.createSignboardsContainer();
    
    // 道システムを作成
    this.createRoadSystem();
    
    // 右上ナビゲーションを作成
    this.createFloatingNavigation();
  }
  
  createWalkingHero() {
    const heroContainer = document.createElement('div');
    heroContainer.className = 'walking-hero-container';
    heroContainer.innerHTML = `
      <div class="stickman-wrapper">
        <div class="stickman idle">
          <div class="head"></div>
          <div class="torso"></div>
          
          <div class="arm left upper"></div>
          <div class="arm left lower"></div>
          <div class="hand left"></div>
          <div class="arm right upper"></div>
          <div class="arm right lower"></div>
          <div class="hand right"></div>
          
          <div class="leg left upper"></div>
          <div class="leg left lower"></div>
          <div class="foot left"></div>
          <div class="leg right upper"></div>
          <div class="leg right lower"></div>
          <div class="foot right"></div>
        </div>
      </div>
    `;
    
    document.body.appendChild(heroContainer);
    this.hero = heroContainer.querySelector('.stickman');
  }
  
  createSignboardsContainer() {
    this.signboardsContainer = document.createElement('div');
    this.signboardsContainer.className = 'infinite-signboards-container';
    
    this.signboardsTrack = document.createElement('div');
    this.signboardsTrack.className = 'signboards-track';
    
    this.signboardsContainer.appendChild(this.signboardsTrack);
    document.body.appendChild(this.signboardsContainer);
  }
  
  createRoadSystem() {
    this.roadSystem = document.createElement('div');
    this.roadSystem.className = 'road-system';
    this.roadSystem.innerHTML = `
      <div class="grass-layer"></div>
      <div class="road-layer"></div>
    `;
    
    document.body.appendChild(this.roadSystem);
  }
  
  createFloatingNavigation() {
    this.floatingNav = document.createElement('div');
    this.floatingNav.className = 'floating-navigation';
    
    const navSections = document.createElement('div');
    navSections.className = 'nav-sections';
    
    const sectionIcons = {
      hero: '🏠',
      about: '🗺️',
      apps: '📱',
      company: '🏢',
      team: '👥',
      media: '📰',
      contact: '💌'
    };
    
    this.sections.forEach(section => {
      const btn = document.createElement('a');
      btn.className = 'nav-section-btn';
      btn.href = `#${section}`;
      btn.setAttribute('data-section', section);
      btn.innerHTML = sectionIcons[section] || '📍';
      btn.addEventListener('click', (e) => this.navigateToSection(e, section));
      navSections.appendChild(btn);
    });
    
    this.floatingNav.appendChild(navSections);
    document.body.appendChild(this.floatingNav);
  }
  
  initializeSignboardPool() {
    // オブジェクトプールを初期化
    for (let i = 0; i < this.performanceSettings.poolSize; i++) {
      const signboard = this.createSignboardElement();
      signboard.style.display = 'none';
      this.signboardPool.push(signboard);
      this.signboardsTrack.appendChild(signboard);
    }
    
    // 初期看板を配置
    this.populateSignboards();
  }
  
  createSignboardElement() {
    const signboard = document.createElement('div');
    signboard.className = 'floating-signboard';
    signboard.innerHTML = `
      <div class="signboard-3d">
        <div class="signboard-face front">
          <div class="signboard-content">
            <div class="signboard-icon"></div>
            <div class="signboard-title"></div>
            <div class="signboard-subtitle"></div>
          </div>
        </div>
        <div class="signboard-face back">
          <div class="signboard-content">
            <div class="signboard-icon">✨</div>
            <div class="signboard-title">ToMoreBeyond</div>
            <div class="signboard-subtitle">道を歩む</div>
          </div>
        </div>
      </div>
    `;
    
    // クリックイベント
    signboard.addEventListener('click', () => {
      if (signboard.dataset.link) {
        if (signboard.dataset.link.startsWith('#')) {
          // ページ内リンク
          const target = document.querySelector(signboard.dataset.link);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // 外部リンク
          window.location.href = signboard.dataset.link;
        }
      }
    });
    
    return signboard;
  }
  
  populateSignboards() {
    // 現在のスクロール位置に基づいて看板を配置
    const viewportCenter = window.innerWidth / 2;
    const startX = -this.performanceSettings.renderDistance;
    const endX = window.innerWidth + this.performanceSettings.renderDistance;
    
    for (let x = startX; x < endX; x += this.performanceSettings.signboardSpacing) {
      this.addSignboard(x);
    }
  }
  
  addSignboard(x) {
    if (this.signboardPool.length === 0) return;
    
    const signboard = this.signboardPool.pop();
    const signboardData = this.getSignboardDataForPosition(x);
    
    this.updateSignboardContent(signboard, signboardData);
    signboard.style.display = 'block';
    signboard.style.transform = `translateX(${x}px)`;
    
    this.activeSignboards.push({ element: signboard, x: x, data: signboardData });
  }
  
  getSignboardDataForPosition(x) {
    // 位置に基づいて適切な看板データを返す
    const index = Math.floor(Math.abs(x) / this.performanceSettings.signboardSpacing) % this.signboards.length;
    return this.signboards[index];
  }
  
  updateSignboardContent(signboard, data) {
    const front = signboard.querySelector('.signboard-face.front .signboard-content');
    front.querySelector('.signboard-icon').textContent = data.icon;
    front.querySelector('.signboard-title').textContent = data.title;
    front.querySelector('.signboard-subtitle').textContent = data.subtitle;
    
    signboard.dataset.section = data.section;
    signboard.dataset.link = data.link;
  }
  
  setupEventListeners() {
    // スクロールイベント
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      
      this.handleScroll();
      
      // スクロール終了検出
      scrollTimer = setTimeout(() => {
        this.stopWalking();
      }, 100);
    }, { passive: true });
    
    // リサイズイベント
    window.addEventListener('resize', () => {
      this.handleResize();
    });
    
    // セクション変更検出
    this.observeSection();
  }
  
  handleScroll() {
    const currentScrollTop = window.pageYOffset;
    const deltaScroll = currentScrollTop - this.lastScrollTop;
    
    // スクロール速度を計算
    this.scrollVelocity = Math.abs(deltaScroll);
    
    // 歩行方向を決定
    if (deltaScroll > 0) {
      this.walkDirection = 'right'; // 下スクロール = 右向き
    } else if (deltaScroll < 0) {
      this.walkDirection = 'left'; // 上スクロール = 左向き
    }
    
    this.lastScrollTop = currentScrollTop;
    this.startWalking();
    
    // 看板の位置を更新
    this.updateSignboards(deltaScroll);
  }
  
  updateSignboards(deltaScroll) {
    // 看板を移動（逆方向に）
    const moveSpeed = this.scrollVelocity * 0.5;
    const direction = deltaScroll > 0 ? -1 : 1;
    
    this.activeSignboards.forEach(item => {
      item.x += direction * moveSpeed;
      item.element.style.transform = `translateX(${item.x}px)`;
      
      // 3D回転効果
      const rotationY = (item.x - window.innerWidth / 2) * 0.02;
      const signboard3d = item.element.querySelector('.signboard-3d');
      signboard3d.style.transform = `rotateY(${rotationY}deg)`;
    });
    
    // 画面外に出た看板をプールに戻す
    this.cullSignboards();
    
    // 新しい看板を追加
    this.spawnSignboards();
  }
  
  cullSignboards() {
    const margin = 200;
    this.activeSignboards = this.activeSignboards.filter(item => {
      if (item.x < -margin || item.x > window.innerWidth + margin) {
        item.element.style.display = 'none';
        this.signboardPool.push(item.element);
        return false;
      }
      return true;
    });
  }
  
  spawnSignboards() {
    const margin = this.performanceSettings.renderDistance;
    const spacing = this.performanceSettings.signboardSpacing;
    
    // 左端チェック
    const leftmostX = Math.min(...this.activeSignboards.map(item => item.x));
    if (leftmostX > -margin) {
      for (let x = leftmostX - spacing; x > -margin; x -= spacing) {
        this.addSignboard(x);
      }
    }
    
    // 右端チェック
    const rightmostX = Math.max(...this.activeSignboards.map(item => item.x));
    if (rightmostX < window.innerWidth + margin) {
      for (let x = rightmostX + spacing; x < window.innerWidth + margin; x += spacing) {
        this.addSignboard(x);
      }
    }
  }
  
  startWalking() {
    if (this.isWalking) return;
    
    this.isWalking = true;
    this.hero.classList.remove('idle');
    this.hero.classList.add('walking');
    
    // 歩行速度をスクロール速度に合わせて調整（0.45s基準）
    const walkSpeed = Math.max(0.5, Math.min(2.0, this.scrollVelocity / 5));
    const duration = 0.45 / walkSpeed;
    
    // すべてのアニメーション要素の速度を調整
    const animatedElements = this.hero.querySelectorAll('[class*="arm"], [class*="leg"], [class*="hand"], [class*="foot"], .torso');
    animatedElements.forEach(element => {
      element.style.animationDuration = `${duration}s`;
    });
    
    // 向きの制御を改善
    if (this.walkDirection === 'left') {
      this.hero.classList.add('face-left');
      this.hero.classList.remove('face-right');
    } else {
      this.hero.classList.remove('face-left');
      this.hero.classList.add('face-right');
    }
  }
  
  stopWalking() {
    if (!this.isWalking) return;
    
    this.isWalking = false;
    this.hero.classList.remove('walking');
    this.hero.classList.add('idle');
    this.scrollVelocity = 0;
  }
  
  startAnimation() {
    // 自動歩行（damso.comのような）
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  animate() {
    // 常に一定速度で看板を移動
    const baseSpeed = 0.5;
    
    if (!this.isWalking) {
      this.activeSignboards.forEach(item => {
        item.x -= baseSpeed;
        item.element.style.transform = `translateX(${item.x}px)`;
        
        // 3D回転効果
        const rotationY = (item.x - window.innerWidth / 2) * 0.02;
        const signboard3d = item.element.querySelector('.signboard-3d');
        signboard3d.style.transform = `rotateY(${rotationY}deg)`;
      });
      
      this.cullSignboards();
      this.spawnSignboards();
    }
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  observeSection() {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || 'hero';
          this.updateCurrentSection(sectionId);
        }
      });
    }, observerOptions);
    
    // セクションを監視
    this.sections.forEach(sectionId => {
      const element = document.getElementById(sectionId) || 
                    document.querySelector(`[data-section="${sectionId}"]`) ||
                    document.querySelector('section');
      if (element) {
        observer.observe(element);
      }
    });
  }
  
  updateCurrentSection(sectionId = null) {
    if (sectionId) {
      this.currentSection = sectionId;
    }
    
    // 道の色を変更
    document.body.className = document.body.className.replace(/section-\w+/g, '');
    document.body.classList.add(`section-${this.currentSection}`);
    
    // ナビゲーションの状態を更新
    this.floatingNav.querySelectorAll('.nav-section-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-section') === this.currentSection) {
        btn.classList.add('active');
      }
    });
  }
  
  navigateToSection(e, sectionId) {
    e.preventDefault();
    
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      this.updateCurrentSection(sectionId);
    }
  }
  
  handleResize() {
    // リサイズ時の処理
    this.performanceSettings.renderDistance = window.innerWidth * 2;
    
    // 看板の再配置
    this.activeSignboards.forEach(item => {
      this.signboardPool.push(item.element);
      item.element.style.display = 'none';
    });
    this.activeSignboards = [];
    this.populateSignboards();
  }
  
  destroy() {
    // クリーンアップ
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    // DOM要素を削除
    if (this.hero) this.hero.parentElement.remove();
    if (this.signboardsContainer) this.signboardsContainer.remove();
    if (this.roadSystem) this.roadSystem.remove();
    if (this.floatingNav) this.floatingNav.remove();
  }
}

// システムを初期化
let walkingHeroSystem;

document.addEventListener('DOMContentLoaded', () => {
  // 既存のナビゲーションを隠す
  const existingNav = document.querySelector('.nature-nav');
  if (existingNav) {
    existingNav.style.display = 'none';
  }
  
  // システムを開始
  walkingHeroSystem = new WalkingHeroSystem();
});

// パフォーマンス監視
if (typeof window.performance !== 'undefined') {
  let frameCount = 0;
  let lastTime = performance.now();
  
  function trackFPS() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      console.log(`FPS: ${fps}`);
      
      // FPSが低い場合はパフォーマンス設定を調整
      if (fps < 30 && walkingHeroSystem) {
        walkingHeroSystem.performanceSettings.maxSignboards = Math.max(10, 
          walkingHeroSystem.performanceSettings.maxSignboards - 2);
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(trackFPS);
  }
  
  requestAnimationFrame(trackFPS);
}