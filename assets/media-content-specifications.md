# ToMoreBeyond メディアコンテンツ仕様書

## 必要な画像・動画ファイル一覧

### 1. ブランドアセット

#### ロゴファイル
- **logo.png** (512x512px, 透明背景)
  - 8ビット風ピクセルアート
  - 会社ロゴ
  - PNG形式、透明背景
  - カラーパレット: #22c55e (緑)、#ffffff (白)

#### ファビコン
- **favicon.ico** (16x16, 32x32, 48x48px)
  - logo.pngを元に作成
  - ICO形式

### 2. OGP・SNS共有画像

#### OGP画像
- **og-image.jpg** (1200x630px)
  - 8ビット風デザイン
  - ToMoreBeyondロゴ + キャッチフレーズ
  - 背景色: #0f172a (ダーク)
  - JPEGフォーマット、最適化済み

### 3. 製品・サービス画像

#### 忠嵩（tadataka）
- **tadataka-hero.png** (800x600px)
  - 地図アプリのスクリーンショット
  - モックアップまたは実機画面
  - 8ビット風フィルター適用

- **tadataka-features.png** (600x400px)
  - 主要機能の紹介画像
  - 4分割レイアウト推奨

#### TOI-RUN
- **toirun-hero.png** (800x600px)
  - ランニングアプリのスクリーンショット
  - アクション中の画面推奨

- **toirun-features.png** (600x400px)
  - アプリ機能説明画像

### 4. チームメンバー画像

#### プロフィール写真
- **yamada-profile.jpg** (400x400px)
  - 正方形、顔が中央に配置
  - 8ビット風ピクセル化エフェクト
  - JPEG、圧縮最適化

- **ando-profile.jpg** (400x400px)
  - 同上仕様

- **masadome-profile.jpg** (400x400px)
  - 同上仕様

### 5. 背景・装飾画像

#### ゲーム背景
- **game-background.png** (1920x1080px)
  - 8ビット風ドット絵背景
  - 透明度対応
  - アニメーション用フレーム（オプション）

#### アイコンセット
- **icons-8bit.png** (スプライトシート)
  - 32x32px単位のアイコン
  - 会社、ミッション、製品、チーム用

### 6. 動画コンテンツ（将来拡張用）

#### 製品デモ動画
- **tadataka-demo.mp4** (1280x720px, 30fps)
  - 30秒以内
  - H.264エンコード
  - 8ビット風エフェクト

## 技術仕様

### 画像最適化
- PNG: TinyPNG等で圧縮
- JPEG: 85%品質、プログレッシブ
- WebP: 次世代フォーマット対応（フォールバック付き）

### ファイル命名規則
- 小文字、ハイフン区切り
- 例: `company-hero-image.jpg`
- 日本語文字は使用しない

### レスポンシブ対応
- @2x（Retina）バージョンも用意
- 例: `logo.png` + `logo@2x.png`

### カラーパレット
- プライマリ: #22c55e (緑)
- セカンダリ: #3b82f6 (青)
- アクセント: #eab308 (黄)、#ef4444 (赤)、#8b5cf6 (紫)
- 背景: #0f172a (ダーク)、#1e293b (ライト)
- テキスト: #ffffff (白)、#94a3b8 (グレー)

## 制作ガイドライン

### 8ビット風デザイン
- ピクセルパーフェクト
- 限定カラーパレット
- ドット絵風テクスチャ
- ハードエッジ（アンチエイリアス無し）

### ブランド統一
- Orbitronフォント（見出し）
- Share Tech Monoフォント（本文）
- 6pxの破線ボーダー
- translateY(-2px)のホバーエフェクト

## 実装優先度

### 高優先度（即座に必要）
1. logo.png
2. favicon.ico
3. og-image.jpg

### 中優先度（1週間以内）
4. 製品画像（tadataka, toirun）
5. プロフィール写真

### 低優先度（2週間以内）
6. 背景・装飾画像
7. 動画コンテンツ

## ファイル配置

```
/assets/
  /images/
    /brand/
      logo.png
      logo@2x.png
      favicon.ico
    /og/
      og-image.jpg
      og-image@2x.jpg
    /products/
      tadataka-hero.png
      tadataka-features.png
      toirun-hero.png
      toirun-features.png
    /team/
      yamada-profile.jpg
      ando-profile.jpg
      masadome-profile.jpg
    /backgrounds/
      game-background.png
      icons-8bit.png
  /videos/
    tadataka-demo.mp4
```

---

**注意**: すべての画像は8ビット風のピクセルアート調で統一し、ToMoreBeyondのブランドアイデンティティを反映してください。