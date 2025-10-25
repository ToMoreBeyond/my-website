import { test, expect } from '@playwright/test';

test.describe('ページナビゲーション', () => {
  test('ホームページが正しく表示される', async ({ page }) => {
    await page.goto('/');

    // ページタイトルの確認
    await expect(page).toHaveTitle(/ToMoreBeyond/);

    // 主要な要素の確認
    await expect(page.locator('text=ToMoreBeyond')).toBeVisible();
    await expect(page.locator('text=トモビ')).toBeVisible();
  });

  test('ヘッダーナビゲーションリンクが機能する', async ({ page }) => {
    await page.goto('/');

    // ホームリンクのクリック
    const homeLink = page.locator('a[href="/"]').first();
    await homeLink.click();
    await expect(page).toHaveURL('/');

    // お問い合わせセクションへのスクロール
    const contactLink = page.locator('a[href="/#contact"]').first();
    await contactLink.click();

    // URLハッシュの確認
    await expect(page).toHaveURL('/#contact');
  });

  test('スムーズスクロールが動作する', async ({ page }) => {
    await page.goto('/');

    // お問い合わせセクションへスクロール
    await page.locator('a[href="/#contact"]').first().click();

    // 少し待機してスクロールが完了するのを待つ
    await page.waitForTimeout(500);

    // お問い合わせフォームが表示されていることを確認
    await expect(page.locator('text=お問い合わせ')).toBeVisible();
  });

  test('ロゴクリックでトップに戻る', async ({ page }) => {
    await page.goto('/');

    // 下にスクロール
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);

    // ロゴをクリック
    await page.locator('img[alt="ToMoreBeyond"]').first().click();

    // トップページにいることを確認
    await expect(page).toHaveURL('/');
  });
});
