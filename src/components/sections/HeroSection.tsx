'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { READY_EVENT, isSiteReady } from '@/lib/ready'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

/** ロゴのタイルに貼る 3 枚のステッカー。3 つのアプリの顔（すごろく・ペット・方位磁針） */
const stickers = [
  { emoji: '🎲', className: '-top-5 -left-7', rotate: -12, delay: 0.85 },
  { emoji: '🐾', className: 'top-10 -right-7', rotate: 8, delay: 0.95 },
  { emoji: '🧭', className: '-bottom-5 -left-4', rotate: 6, delay: 1.05 },
]

/**
 * トップの Hero。
 * 起動画面の紙がめくれた瞬間に 1 回だけ:
 * 言葉が立ち上がり、ロゴのタイルが置かれ、ステッカーが貼られる。
 */
export function HeroSection() {
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (isSiteReady()) {
      setReady(true)
      return
    }
    const onReady = () => setReady(true)
    window.addEventListener(READY_EVENT, onReady)
    // 合図が来なくても、待ちすぎずに出す
    const fallback = window.setTimeout(() => setReady(true), 3200)
    return () => {
      window.removeEventListener(READY_EVENT, onReady)
      window.clearTimeout(fallback)
    }
  }, [])

  // 動きを減らす設定では最初から完成形を出す
  const show = reduce || ready

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.7, delay, ease },
  })

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-5 text-center md:gap-16 md:px-8">
        {/* Copy */}
        <div className="flex flex-col items-center gap-6 md:gap-7">
          <motion.div {...rise(0.1)}>
            <Badge
              variant="outline"
              className="h-7 rounded-full px-3 font-display text-xs font-medium text-muted-foreground"
            >
              Mobile App Studio · Tokyo
            </Badge>
          </motion.div>

          <motion.h1
            {...rise(0.2)}
            className="font-display text-[clamp(3.25rem,13vw,5.75rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-foreground md:text-[clamp(5rem,9.5vw,8rem)]"
          >
            JUST DO IT!
          </motion.h1>

          <motion.p
            {...rise(0.32)}
            className="max-w-2xl font-mincho text-lg leading-relaxed text-muted-foreground md:text-2xl"
          >
            革新的なモバイルアプリケーションで、人々の日常をより豊かに
          </motion.p>
        </div>

        {/* Logo tile with stickers */}
        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.94 }}
          animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.94 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
        >
          <div className="relative size-44 overflow-hidden rounded-[24%] shadow-lift ring-1 ring-foreground/10 sm:size-56 md:size-64 lg:size-72">
            <Image
              src="/images/logos/tomorebeyond-logo.png"
              alt="ToMoreBeyond"
              fill
              priority
              sizes="(max-width: 768px) 224px, 288px"
              className="object-cover"
            />
          </div>

          {stickers.map((s) => (
            <motion.span
              key={s.emoji}
              aria-hidden
              className={cn('sticker absolute size-12 text-2xl md:size-14 md:text-3xl', s.className)}
              initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: s.rotate - 14 }}
              animate={
                show
                  ? { opacity: 1, scale: 1, rotate: s.rotate }
                  : { opacity: 0, scale: 0.6, rotate: s.rotate - 14 }
              }
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: s.delay }}
            >
              {s.emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
