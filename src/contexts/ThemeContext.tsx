'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'tomorebeyond-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')
  const [mounted, setMounted] = useState(false)

  // システムのカラースキーム設定を取得
  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // テーマを解決（system → light/dark）
  const resolveTheme = (currentTheme: Theme): ResolvedTheme => {
    if (currentTheme === 'system') {
      return getSystemTheme()
    }
    return currentTheme
  }

  // 初期化
  useEffect(() => {
    setMounted(true)

    // LocalStorageからテーマを読み込み
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        setThemeState(stored)
        setResolvedTheme(resolveTheme(stored))
      } else {
        setResolvedTheme(resolveTheme(defaultTheme))
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error)
      setResolvedTheme(resolveTheme(defaultTheme))
    }
  }, [defaultTheme, storageKey])

  // システムテーマ変更の監視
  useEffect(() => {
    if (!mounted) return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      if (theme === 'system') {
        setResolvedTheme(getSystemTheme())
      }
    }

    // モダンブラウザ用
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme, mounted])

  // テーマ適用
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    // 既存のテーマクラスを削除
    root.classList.remove('light', 'dark')

    // 新しいテーマクラスを追加
    root.classList.add(resolvedTheme)

    // data-theme属性も設定（CSS変数用）
    root.setAttribute('data-theme', resolvedTheme)
  }, [resolvedTheme, mounted])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    const resolved = resolveTheme(newTheme)
    setResolvedTheme(resolved)

    // LocalStorageに保存
    try {
      localStorage.setItem(storageKey, newTheme)
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error)
    }
  }

  // ハイドレーションミスマッチ防止
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
