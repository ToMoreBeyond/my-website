import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactSection } from '@/components/sections/ContactSection';

/**
 * お問い合わせフォームは Netlify Forms へ素の POST で送る（JS の送信処理は持たない）。
 * ここでは入力できること・必須と型・ラベルの関連付け・Netlify 用の属性を確かめる。
 */
describe('User Interaction Integration Tests', () => {
  describe('ContactSection フォーム操作', () => {
    it('フォームフィールドに入力できる', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const nameInput = screen.getByLabelText(/お名前/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/メールアドレス/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/お問い合わせ内容/i) as HTMLTextAreaElement;

      await user.type(nameInput, '山田太郎');
      await user.type(emailInput, 'yamada@example.com');
      await user.type(messageInput, 'テストメッセージです');

      expect(nameInput.value).toBe('山田太郎');
      expect(emailInput.value).toBe('yamada@example.com');
      expect(messageInput.value).toBe('テストメッセージです');
    });

    it('必須フィールドにrequired属性が設定されている', () => {
      render(<ContactSection />);

      expect(screen.getByLabelText(/お名前/i)).toHaveAttribute('required');
      expect(screen.getByLabelText(/メールアドレス/i)).toHaveAttribute('required');
      expect(screen.getByLabelText(/お問い合わせ内容/i)).toHaveAttribute('required');
    });

    it('送信ボタンが有効で、submit タイプである', () => {
      render(<ContactSection />);

      const submitButton = screen.getByRole('button', { name: /送信する/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('メールアドレスフィールドがemailタイプである', () => {
      render(<ContactSection />);

      expect(screen.getByLabelText(/メールアドレス/i)).toHaveAttribute('type', 'email');
    });

    it('プレースホルダーが表示される', () => {
      render(<ContactSection />);

      expect(screen.getByLabelText(/お名前/i)).toHaveAttribute('placeholder');
      expect(screen.getByLabelText(/メールアドレス/i)).toHaveAttribute('placeholder');
      expect(screen.getByLabelText(/お問い合わせ内容/i)).toHaveAttribute('placeholder');
    });
  });

  describe('Netlify Forms との接続', () => {
    it('form に name / method / data-netlify が設定されている', () => {
      const { container } = render(<ContactSection />);

      const form = container.querySelector('form[name="contact"]');
      expect(form).not.toBeNull();
      expect(form).toHaveAttribute('method', 'POST');
      expect(form).toHaveAttribute('data-netlify', 'true');
    });

    it('hidden の form-name フィールドを持つ', () => {
      const { container } = render(<ContactSection />);

      const hidden = container.querySelector(
        'input[type="hidden"][name="form-name"]'
      ) as HTMLInputElement | null;
      expect(hidden).not.toBeNull();
      expect(hidden?.value).toBe('contact');
    });
  });

  describe('アクセシビリティ', () => {
    it('フォームフィールドにラベルが関連付けられている', () => {
      render(<ContactSection />);

      expect(screen.getByLabelText(/お名前/i)).toHaveAttribute('id');
      expect(screen.getByLabelText(/メールアドレス/i)).toHaveAttribute('id');
      expect(screen.getByLabelText(/お問い合わせ内容/i)).toHaveAttribute('id');
    });

    it('連絡先の情報が表示される', () => {
      render(<ContactSection />);

      expect(screen.getByText('contact@tomorebeyond.co')).toBeInTheDocument();
      expect(screen.getByText('Tokyo, Japan')).toBeInTheDocument();
    });
  });
});
