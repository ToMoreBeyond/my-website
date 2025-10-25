import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactSection } from '@/components/sections/ContactSection';

// Framer Motionのモック
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    input: ({ value, onChange, ...props }: any) => (
      <input value={value} onChange={onChange} {...props} />
    ),
    textarea: ({ value, onChange, ...props }: any) => (
      <textarea value={value} onChange={onChange} {...props} />
    ),
  },
  useInView: () => true,
}));

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

    it('会社名フィールドはオプショナルである', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const companyInput = screen.getByLabelText(/会社名/i) as HTMLInputElement;

      expect(companyInput).not.toHaveAttribute('required');

      await user.type(companyInput, '株式会社サンプル');
      expect(companyInput.value).toBe('株式会社サンプル');
    });

    it('必須フィールドにrequired属性が設定されている', () => {
      render(<ContactSection />);

      const nameInput = screen.getByLabelText(/お名前/i);
      const emailInput = screen.getByLabelText(/メールアドレス/i);
      const messageInput = screen.getByLabelText(/お問い合わせ内容/i);

      expect(nameInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('required');
      expect(messageInput).toHaveAttribute('required');
    });

    it('送信ボタンをクリックできる', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const submitButton = screen.getByRole('button', { name: /メッセージを送信/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).not.toBeDisabled();
    });

    it('フォームの入力値がクリアされる（送信成功時）', async () => {
      const user = userEvent.setup();

      // fetch APIのモック
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        } as Response)
      );

      // alertのモック
      global.alert = vi.fn();

      render(<ContactSection />);

      const nameInput = screen.getByLabelText(/お名前/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/メールアドレス/i) as HTMLInputElement;
      const messageInput = screen.getByLabelText(/お問い合わせ内容/i) as HTMLTextAreaElement;
      const submitButton = screen.getByRole('button', { name: /メッセージを送信/i });

      // フォームに入力
      await user.type(nameInput, '山田太郎');
      await user.type(emailInput, 'yamada@example.com');
      await user.type(messageInput, 'テストメッセージ');

      // 送信
      await user.click(submitButton);

      // フォームがクリアされることを確認
      await waitFor(() => {
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(messageInput.value).toBe('');
      });
    });

    it('メールアドレスフィールドがemailタイプである', () => {
      render(<ContactSection />);

      const emailInput = screen.getByLabelText(/メールアドレス/i);
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('プレースホルダーが表示される', () => {
      render(<ContactSection />);

      const nameInput = screen.getByLabelText(/お名前/i);
      const emailInput = screen.getByLabelText(/メールアドレス/i);
      const companyInput = screen.getByLabelText(/会社名/i);

      expect(nameInput).toHaveAttribute('placeholder');
      expect(emailInput).toHaveAttribute('placeholder');
      expect(companyInput).toHaveAttribute('placeholder');
    });
  });

  describe('フォーム送信処理', () => {
    it('送信中はボタンが無効化される', async () => {
      const user = userEvent.setup();

      // fetch APIのモック（遅延を追加）
      global.fetch = vi.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: () => Promise.resolve({}),
              } as Response);
            }, 100);
          })
      );

      render(<ContactSection />);

      const nameInput = screen.getByLabelText(/お名前/i);
      const emailInput = screen.getByLabelText(/メールアドレス/i);
      const messageInput = screen.getByLabelText(/お問い合わせ内容/i);
      const submitButton = screen.getByRole('button', { name: /メッセージを送信/i });

      // フォームに入力
      await user.type(nameInput, '山田太郎');
      await user.type(emailInput, 'yamada@example.com');
      await user.type(messageInput, 'テスト');

      // 送信
      await user.click(submitButton);

      // 送信中はボタンが無効化される
      expect(submitButton).toBeDisabled();

      // 送信完了後、ボタンが有効化される
      await waitFor(
        () => {
          expect(submitButton).not.toBeDisabled();
        },
        { timeout: 2000 }
      );
    });
  });

  describe('アクセシビリティ', () => {
    it('フォームフィールドにラベルが関連付けられている', () => {
      render(<ContactSection />);

      const nameInput = screen.getByLabelText(/お名前/i);
      const emailInput = screen.getByLabelText(/メールアドレス/i);
      const companyInput = screen.getByLabelText(/会社名/i);
      const messageInput = screen.getByLabelText(/お問い合わせ内容/i);

      expect(nameInput).toHaveAttribute('id');
      expect(emailInput).toHaveAttribute('id');
      expect(companyInput).toHaveAttribute('id');
      expect(messageInput).toHaveAttribute('id');
    });

    it('送信ボタンが適切な役割を持っている', () => {
      render(<ContactSection />);

      const submitButton = screen.getByRole('button', { name: /メッセージを送信/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });
});
