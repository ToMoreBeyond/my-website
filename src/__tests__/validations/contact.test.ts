import { describe, it, expect } from 'vitest';
import { contactFormSchema, validateContactForm } from '@/lib/validations/contact';

describe('Contact Form Validation', () => {
  describe('contactFormSchema', () => {
    it('正しいデータでバリデーションが成功する', () => {
      const validData = {
        name: '山田太郎',
        email: 'yamada@example.com',
        company: '株式会社サンプル',
        message: 'お問い合わせ内容です',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('会社名がオプショナルでバリデーションが成功する', () => {
      const validData = {
        name: '山田太郎',
        email: 'yamada@example.com',
        message: 'お問い合わせ内容です',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('会社名が空文字列でバリデーションが成功する', () => {
      const validData = {
        name: '山田太郎',
        email: 'yamada@example.com',
        company: '',
        message: 'お問い合わせ内容です',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('name フィールド', () => {
    it('名前が空文字列の場合エラーになる', () => {
      const invalidData = {
        name: '',
        email: 'yamada@example.com',
        message: 'メッセージ',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('お名前を入力してください');
      }
    });

    it('名前が100文字を超える場合エラーになる', () => {
      const invalidData = {
        name: 'あ'.repeat(101),
        email: 'yamada@example.com',
        message: 'メッセージ',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('お名前は100文字以内で入力してください');
      }
    });

    it('名前が100文字の場合成功する', () => {
      const validData = {
        name: 'あ'.repeat(100),
        email: 'yamada@example.com',
        message: 'メッセージ',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('email フィールド', () => {
    it('メールアドレスが空文字列の場合エラーになる', () => {
      const invalidData = {
        name: '山田太郎',
        email: '',
        message: 'メッセージ',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('メールアドレスを入力してください');
      }
    });

    it('メールアドレスの形式が不正な場合エラーになる', () => {
      const invalidEmails = [
        'invalid-email',
        'invalid@',
        '@example.com',
        'invalid@example',
        'invalid..email@example.com',
      ];

      invalidEmails.forEach((email) => {
        const invalidData = {
          name: '山田太郎',
          email,
          message: 'メッセージ',
        };

        const result = contactFormSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('正しいメールアドレスを入力してください');
        }
      });
    });

    it('正しいメールアドレス形式で成功する', () => {
      const validEmails = [
        'yamada@example.com',
        'test.user@example.co.jp',
        'user+tag@example.com',
        'user_name@sub.example.com',
      ];

      validEmails.forEach((email) => {
        const validData = {
          name: '山田太郎',
          email,
          message: 'メッセージ',
        };

        const result = contactFormSchema.safeParse(validData);
        expect(result.success).toBe(true);
      });
    });
  });

  describe('company フィールド', () => {
    it('会社名が200文字を超える場合エラーになる', () => {
      const invalidData = {
        name: '山田太郎',
        email: 'yamada@example.com',
        company: 'あ'.repeat(201),
        message: 'メッセージ',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('会社名・組織名は200文字以内で入力してください');
      }
    });

    it('会社名が200文字の場合成功する', () => {
      const validData = {
        name: '山田太郎',
        email: 'yamada@example.com',
        company: 'あ'.repeat(200),
        message: 'メッセージ',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('message フィールド', () => {
    it('メッセージが空文字列の場合エラーになる', () => {
      const invalidData = {
        name: '山田太郎',
        email: 'yamada@example.com',
        message: '',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('お問い合わせ内容を入力してください');
      }
    });

    it('メッセージが5000文字を超える場合エラーになる', () => {
      const invalidData = {
        name: '山田太郎',
        email: 'yamada@example.com',
        message: 'あ'.repeat(5001),
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('お問い合わせ内容は5000文字以内で入力してください');
      }
    });

    it('メッセージが5000文字の場合成功する', () => {
      const validData = {
        name: '山田太郎',
        email: 'yamada@example.com',
        message: 'あ'.repeat(5000),
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('validateContactForm ヘルパー関数', () => {
    it('正しいデータで成功する', () => {
      const validData = {
        name: '山田太郎',
        email: 'yamada@example.com',
        message: 'メッセージ',
      };

      const result = validateContactForm(validData);
      expect(result.success).toBe(true);
    });

    it('不正なデータで失敗する', () => {
      const invalidData = {
        name: '',
        email: 'invalid-email',
        message: '',
      };

      const result = validateContactForm(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });

    it('未知のフィールドを含むデータを処理できる', () => {
      const dataWithUnknownFields = {
        name: '山田太郎',
        email: 'yamada@example.com',
        message: 'メッセージ',
        unknownField: 'unknown',
      };

      const result = validateContactForm(dataWithUnknownFields);
      expect(result.success).toBe(true);
    });
  });
});
