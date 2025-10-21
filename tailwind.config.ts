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
        // グレースケール（モノトーン）
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
        // より洗練されたタイポグラフィ階層
        'hero': ['clamp(4rem, 12vw, 12rem)', { lineHeight: '0.85', letterSpacing: '-0.04em', fontWeight: '300' }],
        'display-lg': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.03em', fontWeight: '400' }],
        'display': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'headline': ['clamp(2rem, 4vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }],
        'title': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '500' }],
        'subtitle': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        // 増やした余白サイズ
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
        '144': '36rem',
        '160': '40rem',
        '180': '45rem',
        '200': '50rem',
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