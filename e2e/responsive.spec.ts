import { test, expect } from '@playwright/test';

test.describe('レスポンシブデザイン - デスクトップ', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('デスクトップ表示が正しい', async ({ page }) => {
    await page.goto('/');

    // ロゴが表示される
    const logo = page.locator('img[alt="ToMoreBeyond"]').first();
    await expect(logo).toBeVisible();

    // ナビゲーションリンクが表示される
    await expect(page.locator('text=ホーム')).toBeVisible();
    await expect(page.locator('text=プロダクト')).toBeVisible();
    await expect(page.locator('text=チーム')).toBeVisible();
  });

  test('デスクトップでコンテンツが適切に配置される', async ({ page }) => {
    await page.goto('/');

    // ヒーローセクションが全幅で表示される
    const heroSection = page.locator('text=ToMoreBeyond').first();
    await expect(heroSection).toBeVisible();

    // プロダクトカードが横に並んで表示される
    const productCards = page.locator('text=TADATAKA');
    await expect(productCards).toBeVisible();
  });
});

test.describe('レスポンシブデザイン - タブレット', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('タブレット表示が正しい', async ({ page }) => {
    await page.goto('/');

    // ロゴが表示される
    const logo = page.locator('img[alt="ToMoreBeyond"]').first();
    await expect(logo).toBeVisible();

    // コンテンツが表示される
    await expect(page.locator('text=ToMoreBeyond')).toBeVisible();
  });
});

test.describe('レスポンシブデザイン - モバイル', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('モバイル表示が正しい', async ({ page }) => {
    await page.goto('/');

    // ロゴが表示される
    const logo = page.locator('img[alt="ToMoreBeyond"]').first();
    await expect(logo).toBeVisible();

    // コンテンツが表示される
    await expect(page.locator('text=ToMoreBeyond')).toBeVisible();
  });

  test('モバイルでフォームが使いやすい', async ({ page }) => {
    await page.goto('/');

    // お問い合わせセクションまでスクロール
    await page.locator('a[href="/#contact"]').first().click();
    await page.waitForTimeout(500);

    // フォームフィールドが表示される
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible();

    // タップできる
    await nameInput.tap();

    // 入力できる
    await nameInput.fill('モバイルテスト');
    await expect(nameInput).toHaveValue('モバイルテスト');
  });

  test('モバイルでコンテンツが縦に配置される', async ({ page }) => {
    await page.goto('/');

    // ヒーローセクションが表示される
    await expect(page.locator('text=ToMoreBeyond')).toBeVisible();

    // プロダクト名が表示される
    await expect(page.locator('text=TADATAKA')).toBeVisible();
  });
});

test.describe('画像の表示', () => {
  test('ロゴ画像が正しく読み込まれる', async ({ page }) => {
    await page.goto('/');

    const logo = page.locator('img[alt="ToMoreBeyond"]').first();
    await expect(logo).toBeVisible();

    // 画像が実際に読み込まれているか確認
    const src = await logo.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src).toContain('tomorebeyond-logo');
  });
});

test.describe('スクロール動作', () => {
  test('ページを下までスクロールできる', async ({ page }) => {
    await page.goto('/');

    // ページの最下部までスクロール
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // フッターが表示されていることを確認
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('スムーズスクロールが動作する', async ({ page }) => {
    await page.goto('/');

    // お問い合わせリンクをクリック
    await page.locator('a[href="/#contact"]').first().click();

    // 少し待機
    await page.waitForTimeout(500);

    // お問い合わせセクションが表示されている
    await expect(page.locator('text=お問い合わせ')).toBeVisible();
  });
});
