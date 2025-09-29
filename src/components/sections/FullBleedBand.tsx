'use client';

import { MarqueeText } from '@/components/effects/MarqueeText'

interface FullBleedBandProps {
  text: string
  tone?: 'light' | 'dark'
  speed?: number
}

export function FullBleedBand({ text, tone = 'light', speed = 80 }: FullBleedBandProps) {
  const bg = tone === 'light'
    ? 'bg-[linear-gradient(180deg,rgba(64,110,91,0.06),rgba(64,110,91,0.06))]'
    : 'bg-[linear-gradient(180deg,rgba(12,18,15,0.92),rgba(12,18,15,0.92))]'

  const textClass = tone === 'light' ? 'text-olive-800' : 'text-white/90'

  return (
    <div className={`relative w-screen left-[50%] right-[50%] -mx-[50vw] py-6 md:py-8 ${bg}`}>
      <MarqueeText
        text={text}
        speed={speed}
        separator=" ︱ "
        className={`px-6 md:px-12 font-semibold tracking-wide ${textClass}`}
      />
    </div>
  )
}

