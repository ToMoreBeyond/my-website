import { z } from "zod";

// 環境変数スキーマ定義
const envSchema = z.object({
  // 公開環境変数（クライアント側で利用可能）
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://tomorebeyond.co"),

  // サーバー環境変数（サーバー側のみ）
  CONTACT_EMAIL: z.string().email().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().regex(/^\d+$/).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
});

// 環境変数の型推論
export type Env = z.infer<typeof envSchema>;

// 環境変数のバリデーションと取得
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

// エクスポート：型安全な環境変数
export const env = validateEnv();
