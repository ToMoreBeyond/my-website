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
        // メインカラー：洗練されたダークグリーン（1色のみ）
        primary: {
          50: '#f0f4f3',
          100: '#d9e2df',
          200: '#b3c5be',
          300: '#8ca89d',
          400: '#668b7c',
          500: '#406e5b',  // メインカラー
          600: '#335849',
          700: '#264237',
          800: '#1a2c25',
          900: '#0d1613',
          950: '#060b09',
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
          light: '#e8f4f0',  // 薄い緑（背景用）
          DEFAULT: '#406e5b', // プライマリと同じ
          dark: '#1a2c25',   // ダークグリーン
        },
      },
      fontFamily: {
        sans: [
          'DM Sans',
          'Inter',
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
        serif: [
          'Crimson Text',
          'Georgia',
          'serif',
        ],
        mono: [
          'Roboto Mono',
          'monospace',
        ],
        display: [
          'DM Sans',
          'Inter',
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