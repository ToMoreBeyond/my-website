import { test, expect } from '@playwright/test';

test.describe('お問い合わせフォーム', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // お問い合わせセクションまでスクロール
    await page.locator('a[href="/#contact"]').first().click();
    await page.waitForTimeout(500);
  });

  test('フォームが表示される', async ({ page }) => {
    // フォームフィールドの確認
    await expect(page.locator('label:has-text("お名前")')).toBeVisible();
    await expect(page.locator('label:has-text("メールアドレス")')).toBeVisible();
    await expect(page.locator('label:has-text("会社名")')).toBeVisible();
    await expect(page.locator('label:has-text("お問い合わせ内容")')).toBeVisible();

    // 送信ボタンの確認
    await expect(page.locator('button:has-text("メッセージを送信")')).toBeVisible();
  });

  test('フォームフィールドに入力できる', async ({ page }) => {
    // 名前を入力
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill('山田太郎');
    await expect(nameInput).toHaveValue('山田太郎');

    // メールアドレスを入力
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('yamada@example.com');
    await expect(emailInput).toHaveValue('yamada@example.com');

    // 会社名を入力
    const companyInput = page.locator('input[name="company"]');
    await companyInput.fill('株式会社サンプル');
    await expect(companyInput).toHaveValue('株式会社サンプル');

    // メッセージを入力
    const messageInput = page.locator('textarea[name="message"]');
    await messageInput.fill('これはテストメッセージです。');
    await expect(messageInput).toHaveValue('これはテストメッセージです。');
  });

  test('必須フィールドのバリデーション', async ({ page }) => {
    // 送信ボタンをクリック（空のフォーム）
    const submitButton = page.locator('button:has-text("メッセージを送信")');

    // 名前フィールドが必須であることを確認
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('required');

    // メールアドレスフィールドが必須であることを確認
    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute('required');

    // メッセージフィールドが必須であることを確認
    const messageInput = page.locator('textarea[name="message"]');
    await expect(messageInput).toHaveAttribute('required');

    // 会社名はオプショナル
    const companyInput = page.locator('input[name="company"]');
    const hasRequired = await companyInput.getAttribute('required');
    expect(hasRequired).toBeNull();
  });

  test('メールアドレス形式のバリデーション', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');

    // typeがemailであることを確認
    await expect(emailInput).toHaveAttribute('type', 'email');
  });

  test('プレースホルダーが表示される', async ({ page }) => {
    // 各フィールドのプレースホルダーを確認
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toHaveAttribute('placeholder');

    const emailInput = page.locator('input[name="email"]');
    await expect(emailInput).toHaveAttribute('placeholder');

    const companyInput = page.locator('input[name="company"]');
    await expect(companyInput).toHaveAttribute('placeholder');

    const messageInput = page.locator('textarea[name="message"]');
    await expect(messageInput).toHaveAttribute('placeholder');
  });

  test('フォームの視覚的な要素が正しく表示される', async ({ page }) => {
    // コンタクト情報セクションが表示されている
    await expect(page.locator('text=コンタクト情報')).toBeVisible();

    // 営業時間が表示されている
    await expect(page.locator('text=営業時間')).toBeVisible();
    await expect(page.locator('text=平日: 9:00 - 18:00')).toBeVisible();
  });
});
