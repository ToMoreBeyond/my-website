# テストガイド

ToMoreBeyond Webサイトのテストスイートに関する包括的なガイドです。

## 概要

このプロジェクトでは、4つのレイヤーでテストを実施しています：

1. **ユニットテスト** (Vitest) - 個別の関数やコンポーネントのテスト
2. **統合テスト** (Vitest + Testing Library) - データフローとユーザーインタラクションのテスト
3. **E2Eテスト** (Playwright) - ブラウザベースのエンドツーエンドテスト
4. **パフォーマンステスト** (Lighthouse CI) - Core Web Vitalsとアクセシビリティの監査

## セットアップ

### 初回セットアップ

```bash
# 依存関係のインストール
npm install

# Playwrightブラウザのインストール
npx playwright install
```

## 1. ユニットテスト

### 実行方法

```bash
# ウォッチモードで実行
npm run test

# 1回だけ実行
npm run test:run

# UIモードで実行
npm run test:ui

# カバレッジレポート生成
npm run test:coverage
```

### テスト対象

- フォームバリデーション (`src/lib/validations/`)
- SEOユーティリティ (`src/lib/seo.ts`)
- データアダプター (`src/adapters/`)
- コンテンツ更新ロジック (`src/lib/content-updates.ts`)

### 設定ファイル

- `vitest.config.ts` - Vitestの設定
- `src/__tests__/setup.ts` - テストセットアップファイル

## 2. 統合テスト

### 実行方法

```bash
# ユニットテストと同じコマンドで実行されます
npm run test:run
```

### テスト対象

- データフロー (`src/__tests__/integration/DataFlow.test.tsx`)
- ユーザーインタラクション (`src/__tests__/integration/UserInteraction.test.tsx`)

## 3. E2Eテスト

### 実行方法

```bash
# すべてのブラウザでテスト実行
npm run test:e2e

# UIモードで実行（インタラクティブ）
npm run test:e2e:ui

# ブラウザを表示して実行
npm run test:e2e:headed

# Chromeのみで実行
npm run test:e2e:chrome
```

### テスト対象

- ページナビゲーション (`e2e/navigation.spec.ts`)
- お問い合わせフォーム (`e2e/contact-form.spec.ts`)
- レスポンシブデザイン (`e2e/responsive.spec.ts`)

### ブラウザ対応

以下のブラウザでテストが実行されます：

- Chromium (Desktop Chrome)
- Firefox
- WebKit (Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

### 設定ファイル

- `playwright.config.ts` - Playwrightの設定

詳細は `e2e/README.md` を参照してください。

## 4. パフォーマンステスト

### 実行方法

```bash
# デスクトップのパフォーマンステスト
npm run test:perf

# モバイルのパフォーマンステスト
npm run test:perf:mobile
```

### テスト内容

Lighthouse CIを使用して、以下の項目を監査します：

#### パフォーマンススコア
- **最小スコア**: 85%
- **Core Web Vitals**:
  - Largest Contentful Paint (LCP): 2.5秒以内
  - Cumulative Layout Shift (CLS): 0.1以内
  - Total Blocking Time (TBT): 300ms以内

#### アクセシビリティ
- **最小スコア**: 90%

#### ベストプラクティス
- **最小スコア**: 90%

#### SEO
- **最小スコア**: 90%

### 設定ファイル

- `lighthouserc.json` - Lighthouse CIの設定とパフォーマンスバジェット

### レポート

テスト実行後、以下の場所にレポートが生成されます：

- `.lighthouseci/` - Lighthouse CIの一時ファイル
- CIモードでは、レポートが一時的なパブリックストレージにアップロードされます

### 注意事項

1. **開発サーバーが自動起動します**
   - `npm run dev` が自動的に実行されます
   - ポート3000が使用されます

2. **複数回実行されます**
   - より正確な結果を得るため、3回実行されます
   - 中央値が最終スコアとして使用されます

3. **実行時間**
   - 各実行には2-3分かかります
   - 合計で5-10分程度かかる場合があります

4. **パフォーマンスバジェット違反**
   - バジェット違反があると、テストが失敗します（error）
   - 警告レベル（warn）の項目は失敗になりません

### パフォーマンス最適化のヒント

パフォーマンステストが失敗した場合：

1. **LCP改善**
   - 画像の最適化（WebP形式、適切なサイズ）
   - フォントの最適化（font-display: swap）
   - クリティカルCSSのインライン化

2. **CLS改善**
   - 画像・動画に明示的なサイズ指定
   - フォント読み込み戦略の最適化
   - 動的コンテンツの予約スペース確保

3. **TBT改善**
   - JavaScriptバンドルサイズの削減
   - コード分割（dynamic import）
   - サードパーティスクリプトの最適化

## CI/CD統合

### GitHub Actions例

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      # ユニット・統合テスト
      - run: npm ci
      - run: npm run test:run

      # E2Eテスト
      - run: npx playwright install --with-deps
      - run: npm run test:e2e

      # パフォーマンステスト
      - run: npm run test:perf
```

## テスト結果サマリー

### 現在のテストカバレッジ

- **ユニットテスト**: 112テスト
- **統合テスト**: 22テスト
- **E2Eテスト**: 19テスト × 5ブラウザ = 95テストケース
- **パフォーマンステスト**: 4カテゴリ + 6メトリクス

### 合計: 229+ テストケース

## トラブルシューティング

### Vitestが起動しない

```bash
# キャッシュをクリア
rm -rf node_modules/.vite
npm run test
```

### Playwrightのブラウザエラー

```bash
# ブラウザを再インストール
npx playwright install --force
```

### Lighthouse CIがタイムアウトする

`lighthouserc.json`の`startServerReadyTimeout`を増やしてください：

```json
{
  "ci": {
    "collect": {
      "startServerReadyTimeout": 120000
    }
  }
}
```

### ポート3000が使用中

開発サーバーを停止してから、テストを再実行してください：

```bash
# プロセスを確認
lsof -i :3000

# プロセスを終了
kill -9 <PID>
```

## ベストプラクティス

1. **テストを書く順序**
   - ユニットテスト → 統合テスト → E2Eテスト → パフォーマンステスト

2. **テストの独立性**
   - 各テストは他のテストに依存しないこと
   - テストデータは各テスト内で準備すること

3. **テストの保守性**
   - Page Object パターンの活用（E2Eテスト）
   - 共通ヘルパー関数の作成
   - テストデータの一元管理

4. **CI/CDでの実行**
   - すべてのテストがCIで実行されること
   - テスト失敗時はマージをブロックすること

5. **パフォーマンス監視**
   - 定期的にパフォーマンステストを実行
   - スコア低下時はすぐに対応
   - パフォーマンスバジェットを厳守

## リソース

- [Vitest ドキュメント](https://vitest.dev/)
- [Testing Library ドキュメント](https://testing-library.com/)
- [Playwright ドキュメント](https://playwright.dev/)
- [Lighthouse CI ドキュメント](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
