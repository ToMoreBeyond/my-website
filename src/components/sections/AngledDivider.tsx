'use client';

import React from 'react'

interface AngledDividerProps {
  direction?: 'up' | 'down'
  height?: number
  tone?: 'light' | 'dark'
}

export function AngledDivider({ direction = 'down', height = 96, tone = 'light' }: AngledDividerProps) {
  const bg = tone === 'light'
    ? 'bg-[rgba(64,110,91,0.06)]'
    : 'bg-[rgba(12,18,15,0.92)]'

  const style: React.CSSProperties = {
    clipPath: direction === 'down'
      ? 'polygon(0 0, 100% 0, 100% 65%, 0 100%)'
      : 'polygon(0 0, 100% 35%, 100% 100%, 0 100%)'
  }

  return (
    <div className="relative w-screen left-[50%] right-[50%] -mx-[50vw]" aria-hidden>
      <div className={`${bg}`} style={{ height, ...style }} />
    </div>
  )
}

