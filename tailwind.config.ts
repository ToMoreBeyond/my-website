import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // レスポンシブブレークポイント（モバイルファースト）
    screens: {
      'sm': '640px',   // Small devices (landscape phones)
      'md': '768px',   // Medium devices (tablets)
      'lg': '1024px',  // Large devices (desktops)
      'xl': '1280px',  // Extra large devices (large desktops)
      '2xl': '1536px', // 2X Extra large devices (larger desktops)
    },
    extend: {
      colors: {
        // CSS変数参照でDRY原則を適用
        background: "var(--background)",
        foreground: "var(--foreground)",
        // メインカラー：温かみのあるオレンジ（ロゴから）
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          DEFAULT: 'var(--color-primary-500)',
        },
        // Neutral - True grayscale
        neutral: {
          0: 'var(--color-neutral-0)',
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },
        // Olive - 研究所的な温かみ × テクノロジー
        olive: {
          50: 'var(--color-olive-50)',
          100: 'var(--color-olive-100)',
          200: 'var(--color-olive-200)',
          300: 'var(--color-olive-300)',
          400: 'var(--color-olive-400)',
          500: 'var(--color-olive-500)',
          600: 'var(--color-olive-600)',
          700: 'var(--color-olive-700)',
          800: 'var(--color-olive-800)',
          900: 'var(--color-olive-900)',
        },
        // セカンダリカラー：ブルー（ロゴから）
        blue: {
          50: 'var(--color-blue-50)',
          100: 'var(--color-blue-100)',
          200: 'var(--color-blue-200)',
          300: 'var(--color-blue-300)',
          400: 'var(--color-blue-400)',
          500: 'var(--color-blue-500)',
          600: 'var(--color-blue-600)',
          700: 'var(--color-blue-700)',
          800: 'var(--color-blue-800)',
          900: 'var(--color-blue-900)',
        },
        // セカンダリカラー：Emerald - テクノロジーアクセント
        emerald: {
          50: 'var(--color-emerald-50)',
          100: 'var(--color-emerald-100)',
          200: 'var(--color-emerald-200)',
          300: 'var(--color-emerald-300)',
          400: 'var(--color-emerald-400)',
          500: 'var(--color-emerald-500)',
          600: 'var(--color-emerald-600)',
          700: 'var(--color-emerald-700)',
          800: 'var(--color-emerald-800)',
          900: 'var(--color-emerald-900)',
        },
        // セカンダリカラー：グリーン（ロゴから）
        green: {
          50: 'var(--color-green-50)',
          100: 'var(--color-green-100)',
          200: 'var(--color-green-200)',
          300: 'var(--color-green-300)',
          400: 'var(--color-green-400)',
          500: 'var(--color-green-500)',
          600: 'var(--color-green-600)',
          700: 'var(--color-green-700)',
          800: 'var(--color-green-800)',
          900: 'var(--color-green-900)',
        },
        // グレースケール（モノトーン） - 研究所的な温かみ
        gray: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          850: '#1a1a1a',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },
        // Warm Neutral - 温かみのあるニュートラル
        sand: {
          50: 'var(--color-sand-50)',
          100: 'var(--color-sand-100)',
          200: 'var(--color-sand-200)',
          300: 'var(--color-sand-300)',
          400: 'var(--color-sand-400)',
          500: 'var(--color-sand-500)',
          600: 'var(--color-sand-600)',
          700: 'var(--color-sand-700)',
          800: 'var(--color-sand-800)',
          900: 'var(--color-sand-900)',
        },
        // アクセントカラー（極めて限定的に使用）
        accent: {
          light: 'var(--color-accent-light)',
          DEFAULT: 'var(--color-accent-default)',
          dark: 'var(--color-accent-dark)',
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
        // 洗練されたアニメーション - スムーズで自然
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-down': 'fadeInDown 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-left': 'fadeInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-right': 'fadeInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'subtle-float': 'subtleFloat 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gentle-pulse': 'gentlePulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gentlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} satisfies Config;