'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { markSiteReady } from '@/lib/ready'

/**
 * 起動画面。紙の上にロゴのタイルが置かれ、短いバーが走り、紙がめくれる。
 * 終わったら markSiteReady() で Hero に合図を送る。
 * 動きを減らす設定の環境では即座に消える。
 */
export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (
      !loaderRef.current ||
      !textRef.current ||
      !barRef.current ||
      !logoRef.current ||
      !tagRef.current
    ) {
      return
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      document.body.style.overflow = 'auto'
      setVisible(false)
      markSiteReady()
      return
    }

    // Prevent scroll during loading
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline()

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 10, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' }
    )
      .fromTo(
        [textRef.current, tagRef.current],
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        '-=0.25'
      )
      .fromTo(
        barRef.current,
        { width: '0%' },
        { width: '100%', duration: 0.8, ease: 'power1.inOut' },
        '-=0.2'
      )
      .to([logoRef.current, textRef.current, barRef.current, tagRef.current], {
        opacity: 0,
        y: -8,
        duration: 0.3,
        stagger: 0.04,
        ease: 'power2.in',
        delay: 0.1,
      })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => {
          document.body.style.overflow = 'auto'
          setVisible(false)
          markSiteReady()
        },
      })

    return () => {
      tl.kill()
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 overflow-hidden bg-background"
      aria-hidden
    >
      {/* Logo tile */}
      <div
        ref={logoRef}
        className="relative size-28 overflow-hidden rounded-[24%] bg-card opacity-0 shadow-lift md:size-32"
      >
        <Image
          src="/images/logos/tomorebeyond-logo.png"
          alt="ToMoreBeyond"
          width={256}
          height={256}
          priority
          className="size-full object-cover"
        />
      </div>

      {/* Loading text */}
      <div
        ref={textRef}
        className="font-display text-xl font-bold tracking-[0.12em] text-foreground opacity-0 md:text-2xl"
      >
        TOMOREBEYOND
      </div>

      {/* Progress bar */}
      <div className="h-1 w-40 overflow-hidden rounded-full bg-secondary md:w-56">
        <div ref={barRef} className="h-full rounded-full bg-brand" style={{ width: '0%' }} />
      </div>

      {/* Tagline */}
      <p ref={tagRef} className="font-mincho text-sm text-muted-foreground opacity-0">
        Making hidden traces a lasting wonder
      </p>
    </div>
  )
}
