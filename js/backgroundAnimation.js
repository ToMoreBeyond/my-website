class BackgroundAnimation {
    constructor() {
        this.backgrounds = document.querySelectorAll('.background-animation');
        this.init();
    }

    init() {
        this.backgrounds.forEach(background => {
            const type = background.dataset.type;
            const src = background.dataset.src;
            
            if (type === 'video') {
                this.setupVideo(background, src);
            } else if (type === 'image') {
                this.setupImage(background, src);
            }
        });
    }

    setupVideo(container, src) {
        const video = document.createElement('video');
        video.src = src;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        
        // パフォーマンス最適化
        video.preload = 'auto';
        video.setAttribute('loading', 'lazy');
        
        container.appendChild(video);
        
        // 再生開始
        video.play().catch(error => {
            console.warn('Video autoplay failed:', error);
        });
    }

    setupImage(container, src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        img.loading = 'lazy';
        
        container.appendChild(img);
        
        // 画像のアニメーション効果
        gsap.from(img, {
            scale: 1.1,
            duration: 2,
            ease: 'power2.out'
        });
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new BackgroundAnimation();
}); 