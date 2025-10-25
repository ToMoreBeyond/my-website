'use client'

import { PropsWithChildren, useEffect } from 'react'
import LoadingOverlay from '@/components/common/LoadingOverlay'
import { SkipLink } from '@/components/common/SkipLink'

export default function RootClient({ children }: PropsWithChildren) {
  // Optional: lock scroll during loading for visual stability
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      document.body.style.overflow = original
    }, 800)
    return () => {
      document.body.style.overflow = original
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <SkipLink href="#main-content">メインコンテンツへスキップ</SkipLink>
      <LoadingOverlay />
      {children}
    </>
  )
}

