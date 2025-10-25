import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // メインカラー：温かみのあるオレンジ（ロゴから）
        primary: {
          50: '#fef5f0',
          100: '#fde8db',
          200: '#fbd0b7',
          300: '#f9b893',
          400: '#e8956a',
          500: '#D77A4F',  // メインカラー（ロゴのオレンジ）
          600: '#c2653f',
          700: '#a04f2f',
          800: '#7d3b1f',
          900: '#5a2710',
          950: '#3d1a0a',
        },
        // Olive - 研究所的な温かみ × テクノロジー
        olive: {
          50: '#f8f9f5',
          100: '#eef1e8',
          200: '#dde3d1',
          300: '#c4cfb3',
          400: '#a8b891',
          500: '#8ca070',
          600: '#758a5c',
          700: '#5d6e49',
          800: '#485c11',  // 深みのある olive
          900: '#0f1e14',  // テキスト用の深いオリーブ
        },
        // セカンダリカラー：ブルー（ロゴから）
        blue: {
          50: '#edf7fc',
          100: '#d6eef8',
          200: '#aeddf1',
          300: '#85cceb',
          400: '#5dbbe4',
          500: '#4BA7CC',
          600: '#3a8fb5',
          700: '#2e7091',
          800: '#22526d',
          900: '#163349',
        },
        // セカンダリカラー：Emerald - テクノロジーアクセント
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',  // メインアクセント
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // セカンダリカラー：グリーン（ロゴから）
        green: {
          50: '#f0f8f1',
          100: '#d9eedb',
          200: '#b3ddb7',
          300: '#8dcc93',
          400: '#71ba78',
          500: '#5EA75D',
          600: '#4d8f4c',
          700: '#3d713c',
          800: '#2d542c',
          900: '#1d371c',
        },
        // グレースケール（モノトーン） - 研究所的な温かみ
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          850: '#1a1a1a',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Warm Neutral - 温かみのあるニュートラル
        sand: {
          50: '#f8f7f5',   // Background warm
          100: '#e5e3df',  // Light neutral
          200: '#d4d1ca',
          300: '#c4b9a6',  // Mid neutral
          400: '#aea396',
          500: '#978d80',
          600: '#7d7166',
          700: '#635a50',
          800: '#4a443c',
          900: '#312d28',
        },
        // アクセントカラー（極めて限定的に使用）
        accent: {
          light: '#fef5f0',
          DEFAULT: '#D77A4F',
          dark: '#7d3b1f',
        },
      },
      fontFamily: {
        sans: [
          'M PLUS Rounded 1c',
          'Zen Maru Gothic',
          'Noto Sans JP',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        display: [
          'M PLUS Rounded 1c',
          'Zen Maru Gothic',
          'Noto Sans JP',
          'sans-serif',
        ],
      },
      fontSize: {
        // 明確なタイポグラフィ階層
        // H1 - Hero（最大の見出し）
        'hero': ['clamp(3.5rem, 10vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: '700' }],
        // H2 - Display（セクション見出し）
        'display': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
        // H3 - Headline（サブセクション見出し）
        'headline': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        // H4 - Title（カード見出し）
        'title': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        // H5 - Subtitle（小見出し）
        'subtitle': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '500' }],
        // Body - 本文
        'body-lg': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['clamp(1rem, 1.25vw, 1.125rem)', { lineHeight: '1.7', fontWeight: '400' }],
        'body-sm': ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.6', fontWeight: '400' }],
        // Caption - キャプション
        'caption': ['clamp(0.75rem, 0.875vw, 0.875rem)', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        // 8pxグリッドシステム (8px = 0.5rem)
        // 基本単位
        '18': '4.5rem',   // 72px (9 × 8px)
        '22': '5.5rem',   // 88px (11 × 8px)
        '30': '7.5rem',   // 120px (15 × 8px) - セクション間最小
        '40': '10rem',    // 160px (20 × 8px) - セクション間最大
        '88': '22rem',    // 352px (44 × 8px)
        '100': '25rem',   // 400px (50 × 8px)
        '120': '30rem',   // 480px (60 × 8px)
        '144': '36rem',   // 576px (72 × 8px)
        '160': '40rem',   // 640px (80 × 8px)
        '180': '45rem',   // 720px (90 × 8px)
        '200': '50rem',   // 800px (100 × 8px)
      },
      maxWidth: {
        'screen-3xl': '1800px',
      },
      borderRadius: {
        'blob': '60% 40% 30% 70% / 60% 30% 70% 40%',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        // シンプルで洗練されたアニメーション（控えめ）
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'subtle-float': 'subtleFloat 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gentle-pulse': 'gentlePulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },  // 控えめな移動量
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },  // 控えめな移動量
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },  // より微細なスケール
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },  // 控えめな浮遊
        },
        gentlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },  // より控えめなパルス
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} satisfies Config;