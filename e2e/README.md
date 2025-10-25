# E2Eテスト (Playwright)

このディレクトリには、Playwrightを使用したエンドツーエンド（E2E）テストが含まれています。

## セットアップ

Playwrightブラウザのインストール:

```bash
npx playwright install
```

## テストの実行

### すべてのテストを実行

```bash
npm run test:e2e
```

### UIモードで実行（インタラクティブ）

```bash
npm run test:e2e:ui
```

### ブラウザを表示して実行

```bash
npm run test:e2e:headed
```

### Chromeのみで実行

```bash
npm run test:e2e:chrome
```

## テストファイル

- `navigation.spec.ts` - ページナビゲーションのテスト
- `contact-form.spec.ts` - お問い合わせフォームのテスト
- `responsive.spec.ts` - レスポンシブデザインのテスト

## 注意事項

- E2Eテストは開発サーバーが起動している必要があります
- `playwright.config.ts`で自動的にサーバーが起動されます
- テスト実行には数分かかる場合があります

## ブラウザ対応

以下のブラウザでテストが実行されます:

- Chromium (Desktop Chrome)
- Firefox
- WebKit (Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)
