import { z } from 'zod';

/**
 * お問い合わせフォームのバリデーションスキーマ
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'お名前を入力してください')
    .max(100, 'お名前は100文字以内で入力してください'),

  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),

  company: z
    .string()
    .max(200, '会社名・組織名は200文字以内で入力してください')
    .optional(),

  message: z
    .string()
    .min(1, 'お問い合わせ内容を入力してください')
    .max(5000, 'お問い合わせ内容は5000文字以内で入力してください'),
});

/**
 * お問い合わせフォームデータの型
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * フォームデータのバリデーション
 * @param data バリデーション対象のデータ
 * @returns バリデーション結果
 */
export function validateContactForm(data: unknown) {
  return contactFormSchema.safeParse(data);
}
