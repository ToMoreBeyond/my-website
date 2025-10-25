# ToMoreBeyond デザインシステム

このドキュメントは、ToMoreBeyondコーポレートサイトのデザインシステムを定義します。

## カラーパレット

### プライマリカラー（Primary）
温かみのあるオレンジ - ロゴのメインカラー

- `primary-50` - `#fef5f0` - 最も明るい背景
- `primary-100` - `#fde8db`
- `primary-200` - `#fbd0b7`
- `primary-300` - `#f9b893`
- `primary-400` - `#e8956a`
- **`primary-500`** - `#D77A4F` - **メインカラー**
- `primary-600` - `#c2653f`
- `primary-700` - `#a04f2f`
- `primary-800` - `#7d3b1f`
- `primary-900` - `#5a2710` - 最も暗い

### ニュートラル（Neutral）
真のグレースケール - テキストと背景

- `neutral-0` - `#ffffff` - 白
- `neutral-50` - `#fafafa`
- `neutral-100` - `#f5f5f5`
- `neutral-200` - `#e5e5e5`
- `neutral-300` - `#d4d4d4`
- `neutral-400` - `#a3a3a3`
- `neutral-500` - `#737373`
- `neutral-600` - `#525252`
- **`neutral-700`** - `#404040` - **メインテキスト**
- `neutral-800` - `#262626`
- `neutral-900` - `#171717`
- `neutral-950` - `#0a0a0a` - 最も暗い

### セカンダリカラー

#### Olive
研究所的な温かみ × テクノロジー

- `olive-500` - `#8ca070` - メイン
- `olive-800` - `#485c11` - 深みのある olive
- `olive-900` - `#0f1e14` - テキスト用の深いオリーブ

#### Blue
ロゴのブルー

- `blue-500` - `#4BA7CC` - メインブルー

#### Emerald
テクノロジーアクセント

- `emerald-500` - `#10b981` - メインアクセント
- アクション、リンク、フォーカス状態に使用

#### Green
ロゴのグリーン

- `green-500` - `#5EA75D` - メイングリーン

### 使い方

```tsx
// Tailwindクラスで使用
<div className="bg-primary-500 text-neutral-0">...</div>

// CSS変数で使用
<div style={{ color: 'var(--color-primary-500)' }}>...</div>
```

## タイポグラフィ

### フォントファミリー

```css
--font-primary: 'M PLUS Rounded 1c', 'Zen Maru Gothic', 'Noto Sans JP', sans-serif
--font-display: 'M PLUS Rounded 1c', 'Zen Maru Gothic', 'Noto Sans JP', sans-serif
```

### フォントスケール（fluid typography）

| サイズ | 最小 | 最大 | 用途 | className |
|--------|------|------|------|-----------|
| Hero | 3.5rem | 8rem | ヒーローセクション見出し | `text-hero` |
| Display | 2.5rem | 4.5rem | セクション見出し（H2） | `text-display` |
| Headline | 2rem | 3rem | サブセクション見出し（H3） | `text-headline` |
| Title | 1.5rem | 2rem | カード見出し（H4） | `text-title` |
| Subtitle | 1.25rem | 1.5rem | 小見出し（H5） | `text-subtitle` |
| Body Large | 1.125rem | 1.25rem | リード文 | `text-body-lg` |
| **Body** | **1rem** | **1.125rem** | **本文（デフォルト）** | `text-body` |
| Body Small | 0.875rem | 1rem | 補足テキスト | `text-body-sm` |
| Caption | 0.75rem | 0.875rem | キャプション | `text-caption` |

### フォントウェイト

- `font-light` - 300
- `font-normal` - 400 (デフォルト)
- `font-medium` - 500
- `font-semibold` - 600
- `font-bold` - 700
- `font-extrabold` - 800
- `font-black` - 900

### 使い方

```tsx
<h1 className="text-hero font-bold">ヒーロー見出し</h1>
<h2 className="text-display font-bold">セクション見出し</h2>
<p className="text-body">本文テキスト</p>
```

## スペーシング（8pxグリッドシステム）

すべてのスペーシングは8pxの倍数で定義されています。

| 名前 | サイズ | px | 倍数 |
|------|--------|-----|------|
| `space-1` | 0.25rem | 4px | 0.5× |
| `space-2` | 0.5rem | 8px | 1× |
| `space-3` | 0.75rem | 12px | 1.5× |
| `space-4` | 1rem | 16px | 2× |
| `space-6` | 1.5rem | 24px | 3× |
| `space-8` | 2rem | 32px | 4× |
| `space-10` | 2.5rem | 40px | 5× |
| `space-12` | 3rem | 48px | 6× |
| `space-16` | 4rem | 64px | 8× |
| `space-20` | 5rem | 80px | 10× |
| `space-24` | 6rem | 96px | 12× |
| `space-30` | 7.5rem | 120px | 15× |
| `space-40` | 10rem | 160px | 20× |

### セクション間スペーシング

- `--section-padding`: 120px - 160px (15-20 × 8px)
- `--section-gap`: 120px - 160px (15-20 × 8px)

### コンテナ

- `--container-max-width`: 1200px
- `--container-padding`: 32px - 64px (4-8 × 8px)

### 使い方

```tsx
<div className="p-8 mb-12">
  <h2 className="mb-6">見出し</h2>
  <p className="mb-4">テキスト</p>
</div>
```

## レスポンシブブレークポイント

モバイルファースト方式を採用しています。

| ブレークポイント | 最小幅 | デバイス |
|-----------------|--------|----------|
| デフォルト | - | モバイル (< 640px) |
| `sm` | 640px | 横向きスマートフォン |
| `md` | 768px | タブレット |
| `lg` | 1024px | デスクトップ |
| `xl` | 1280px | 大型デスクトップ |
| `2xl` | 1536px | 超大型ディスプレイ |

### 使い方

```tsx
<div className="
  text-base       /* モバイル: 1rem */
  sm:text-lg      /* 640px+: 1.125rem */
  md:text-xl      /* 768px+: 1.25rem */
  lg:text-2xl     /* 1024px+: 1.5rem */
">
  レスポンシブテキスト
</div>

<div className="
  grid
  grid-cols-1     /* モバイル: 1列 */
  sm:grid-cols-2  /* 640px+: 2列 */
  lg:grid-cols-3  /* 1024px+: 3列 */
  gap-6
">
  {/* カード */}
</div>
```

## アニメーション

### トランジション

```css
--transition-fast: 200ms cubic-bezier(0.16, 1, 0.3, 1)
--transition-base: 300ms cubic-bezier(0.16, 1, 0.3, 1)
--transition-slow: 500ms cubic-bezier(0.16, 1, 0.3, 1)
--transition-smooth: 600ms cubic-bezier(0.23, 1, 0.32, 1)
--transition-bounce: 800ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

### アニメーション

- `animate-fade-in` - フェードイン
- `animate-fade-in-up` - 下からフェードイン
- `animate-scale-in` - スケールイン
- `animate-subtle-float` - 緩やかな浮遊
- `animate-gentle-pulse` - 緩やかなパルス

### 使い方

```tsx
<div className="animate-fade-in-up animate-delay-200">
  アニメーション要素
</div>
```

## シャドウ

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
```

### 使い方

```tsx
<div className="shadow-lg hover:shadow-xl transition-shadow">
  ホバーでシャドウ増加
</div>
```

## ボーダー半径

```css
--radius-sm: 0.375rem   (6px)
--radius-md: 0.5rem     (8px)
--radius-lg: 0.75rem    (12px)
--radius-xl: 1rem       (16px)
--radius-2xl: 1.5rem    (24px)
--radius-3xl: 2rem      (32px)
--radius-full: 9999px   (完全な円)
```

### 使い方

```tsx
<div className="rounded-xl">角丸16px</div>
<button className="rounded-full">完全な円</button>
```

## ベストプラクティス

### 1. カラー使用のガイドライン

- **メインテキスト**: `neutral-700` または `neutral-800`
- **セカンダリテキスト**: `neutral-600`
- **ボーダー**: `neutral-200` または `neutral-300`
- **背景**: `neutral-0` (白) または `neutral-50`
- **アクション**: `primary-500` または `emerald-500`
- **ホバー**: アクションカラーの `600` 系

### 2. タイポグラフィ階層

```tsx
// 正しい階層
<section>
  <h2 className="text-display font-bold">セクション見出し</h2>
  <h3 className="text-headline font-semibold">サブセクション</h3>
  <h4 className="text-title font-medium">カード見出し</h4>
  <p className="text-body">本文</p>
  <p className="text-caption text-neutral-600">補足情報</p>
</section>
```

### 3. スペーシング一貫性

```tsx
// セクション
<section className="section">  {/* padding-y: 120-160px */}
  <div className="container">  {/* max-width: 1200px, padding-x: 32-64px */}
    <div className="mb-12">    {/* margin-bottom: 48px */}
      ...
    </div>
  </div>
</section>
```

### 4. レスポンシブデザイン

```tsx
// モバイルファースト
<div className="
  p-4 sm:p-6 lg:p-8
  text-body sm:text-body-lg lg:text-lg
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  ...
</div>
```

## アクセシビリティ

- タッチターゲットは最低44×44px
- コントラスト比はWCAG 2.1 AA準拠（最低4.5:1）
- フォーカス状態を明確に表示
- プリファースモーションに対応

```tsx
<button className="
  min-h-[44px] min-w-[44px]
  focus:outline-2 focus:outline-emerald-500
">
  アクセシブルボタン
</button>
```
