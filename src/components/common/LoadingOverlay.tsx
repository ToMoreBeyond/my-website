'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

/**
 * 起動画面。ロゴが灯り、バーが走り、幕が上がる。
 * 動きを減らす設定の環境では即座に消える。
 */
export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaderRef.current || !textRef.current || !barRef.current || !logoRef.current) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      document.body.style.overflow = 'auto'
      setVisible(false)
      return
    }

    // Prevent scroll during loading
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline()

    // 1. Logo lights up
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.94, filter: 'brightness(0.4)' },
      { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 0.8, ease: 'power2.out' }
    )
    // 2. Text fade in
    .fromTo(textRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    // 3. Progress bar animation
    .fromTo(barRef.current,
      { width: '0%' },
      { width: '100%', duration: 1.0, ease: 'power1.inOut' },
      '-=0.2'
    )
    // 4. Fade out elements
    .to([logoRef.current, textRef.current, barRef.current], {
      opacity: 0,
      y: -12,
      duration: 0.35,
      stagger: 0.05,
      ease: 'power2.in',
      delay: 0.2
    })
    // 5. Curtain rises (height to 0)
    .to(loaderRef.current, {
      height: 0,
      duration: 0.7,
      ease: 'power4.inOut',
      onComplete: () => {
        document.body.style.overflow = 'auto'
        setVisible(false)
      }
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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-background"
      style={{ transformOrigin: 'top' }}
      aria-hidden
    >
      {/* Logo */}
      <div ref={logoRef} className="relative mb-6 opacity-0">
        <div className="bloom inset-[-30%]" />
        <div className="relative size-36 md:size-44">
          <Image
            src="/images/logos/tomorebeyond-logo.png"
            alt="ToMoreBeyond"
            width={256}
            height={256}
            priority
            className="size-full object-contain"
          />
        </div>
      </div>

      {/* Loading text */}
      <div
        ref={textRef}
        className="font-display text-xl font-bold tracking-[0.18em] text-foreground opacity-0 md:text-2xl"
      >
        TOMOREBEYOND
      </div>

      {/* Progress bar */}
      <div className="mt-6 h-px w-44 overflow-hidden rounded-full bg-border md:w-60">
        <div
          ref={barRef}
          className="h-full rounded-full bg-primary glow"
          style={{ width: '0%' }}
        />
      </div>

      {/* Tagline */}
      <p className="mt-4 text-sm tracking-wide text-muted-foreground">
        Making hidden traces a lasting wonder
      </p>
    </div>
  )
}
