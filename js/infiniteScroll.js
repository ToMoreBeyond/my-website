class InfiniteScroll {
    constructor() {
        this.containers = document.querySelectorAll('.center-infinite-scroll');
        this.init();
    }

    init() {
        this.containers.forEach(container => {
            this.setupContainer(container);
        });
    }

    setupContainer(container) {
        const track = container.querySelector('.infinite-scroll-track');
        if (!track) return;

        // 既存のアニメーションをクリア
        gsap.killTweensOf(track);

        // 新しいアニメーション設定
        gsap.to(track, {
            x: () => -(track.scrollWidth / 2),
            ease: 'none',
            duration: 32,
            repeat: -1,
            onRepeat: () => {
                // アニメーションのリセット
                gsap.set(track, { x: 0 });
            }
        });

        // ホバー時のアニメーション停止
        container.addEventListener('mouseenter', () => {
            gsap.to(track, { timeScale: 0, duration: 0.3 });
        });

        container.addEventListener('mouseleave', () => {
            gsap.to(track, { timeScale: 1, duration: 0.3 });
        });

        // タッチデバイス対応
        container.addEventListener('touchstart', () => {
            gsap.to(track, { timeScale: 0, duration: 0.3 });
        });

        container.addEventListener('touchend', () => {
            gsap.to(track, { timeScale: 1, duration: 0.3 });
        });
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new InfiniteScroll();
}); 