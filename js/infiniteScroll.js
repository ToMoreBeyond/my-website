class InfiniteScroll {
    constructor() {
        this.containers = document.querySelectorAll('.infinite-scroll-container');
        this.init();
    }

    init() {
        this.containers.forEach(container => {
            this.setupContainer(container);
        });
    }

    setupContainer(container) {
        const track = container.querySelector('.infinite-scroll-track');
        const items = track.querySelectorAll('.infinite-scroll-item');
        
        // アイテムを複製して無限ループを実現
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });

        // GSAPでアニメーション
        gsap.to(track, {
            x: () => -(track.scrollWidth / 2),
            ease: 'none',
            duration: 20,
            repeat: -1
        });

        // ホバー時のアニメーション停止
        container.addEventListener('mouseenter', () => {
            gsap.to(track, { timeScale: 0 });
        });

        container.addEventListener('mouseleave', () => {
            gsap.to(track, { timeScale: 1 });
        });

        // クリックイベントの設定
        items.forEach(item => {
            item.addEventListener('click', () => {
                const link = item.dataset.link;
                if (link) {
                    window.location.href = link;
                }
            });
        });
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    new InfiniteScroll();
}); 