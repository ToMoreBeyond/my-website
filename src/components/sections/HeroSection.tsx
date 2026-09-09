'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { READY_EVENT, isSiteReady } from '@/lib/ready'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * トップの Hero。
 * 起動画面の幕が上がった瞬間に「電源が入る」1 回だけの演出:
 * 床のグリッドが浮かび、ロゴの灯りが立ち上がり、見出しが結像する。
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
    return () => window.removeEventListener(READY_EVENT, onReady)
  }, [])

  // 動きを減らす設定では最初から完成形を出す
  const show = reduce || ready

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    transition: { duration: 0.8, delay, ease },
  })

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 lg:pt-28">
      {/* 床: 遠近のついたグリッドが地平線へ消える */}
      <motion.div
        aria-hidden
        className="hero-floor"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 1.6, delay: 0.1, ease: 'easeOut' }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <div className="order-2 flex flex-col items-start gap-6 lg:order-1 lg:col-span-7">
          <motion.div {...rise(0.55)}>
            <Badge
              variant="outline"
              className="h-7 rounded-full px-3 text-xs text-muted-foreground"
            >
              Mobile App Studio · Tokyo
            </Badge>
          </motion.div>

          <motion.h1
            {...rise(0.7)}
            className="font-display text-glow text-[clamp(3.25rem,13vw,5.5rem)] leading-[0.95] font-extrabold tracking-[-0.04em] text-foreground md:text-[clamp(4.5rem,9vw,7.5rem)]"
          >
            JUST DO IT!
          </motion.h1>

          <motion.p
            {...rise(0.85)}
            className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            革新的なモバイルアプリケーションで、人々の日常をより豊かに
          </motion.p>
        </div>

        {/* Logo with bloom */}
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <motion.div
            className="relative"
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
          >
            <motion.div
              aria-hidden
              className="bloom inset-[-35%]"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: show ? 1 : 0 }}
              transition={{ duration: 1.6, delay: 0.5, ease: 'easeOut' }}
            />
            <Image
              src="/images/logos/tomorebeyond-logo.png"
              alt="ToMoreBeyond"
              width={360}
              height={360}
              priority
              className="relative size-40 md:size-56 lg:size-80 xl:size-[22rem]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
