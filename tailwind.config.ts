import type { Config } from "tailwindcss";

/**
 * Tailwind v4 では色・フォント・角丸などのトークンは
 * src/app/globals.css の @theme で定義する。
 * ここには content の指定だけを残す。
 */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
