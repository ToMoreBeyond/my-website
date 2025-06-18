// ローディング画面を即座に非表示にする修正スクリプト
document.addEventListener('DOMContentLoaded', function() {
  // ローディング画面を即座に非表示
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
  
  // body のクラスを即座に変更
  document.body.classList.remove('loading');
  document.body.classList.add('loaded');
  
  // 動画の自動再生を確実に開始
  const video = document.getElementById('backgroundVideo');
  if (video) {
    video.muted = true;
    video.play().catch(() => {
      // 自動再生が失敗した場合のフォールバック
      console.log('Video autoplay failed, waiting for user interaction');
    });
  }
});

// ページロード完了時にも念のため実行
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen && loadingScreen.style.display !== 'none') {
    loadingScreen.style.display = 'none';
  }
});