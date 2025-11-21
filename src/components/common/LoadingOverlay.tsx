'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loaderRef.current || !textRef.current || !barRef.current || !logoRef.current) return

    // Prevent scroll during loading
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline()

    // 1. Logo fade in with float
    tl.fromTo(logoRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
    )
    // 2. Text fade in
    .fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )
    // 3. Progress bar animation
    .fromTo(barRef.current,
      { width: "0%" },
      { width: "100%", duration: 1.2, ease: "power1.inOut" },
      "-=0.2"
    )
    // 4. Fade out elements
    .to([logoRef.current, textRef.current, barRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.in",
      delay: 0.3
    })
    // 5. Curtain rises (height to 0)
    .to(loaderRef.current, {
      height: 0,
      duration: 0.8,
      ease: "power4.inOut",
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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1a1a] overflow-hidden"
      style={{ transformOrigin: 'top' }}
      aria-hidden
    >
      {/* Logo */}
      <div ref={logoRef} className="mb-8 opacity-0">
        <div className="w-40 h-40 md:w-48 md:h-48">
          <Image
            src="/images/logos/tomorebeyond-logo.png"
            alt="ToMoreBeyond"
            width={256}
            height={256}
            priority
            className="w-full h-full invert"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Loading text */}
      <div
        ref={textRef}
        className="text-white text-2xl md:text-3xl font-bold tracking-wider opacity-0"
      >
        TOMOREBEYOND
      </div>

      {/* Progress bar */}
      <div className="w-48 md:w-64 h-[2px] bg-white/20 mt-6 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full bg-white rounded-full"
          style={{ width: '0%' }}
        />
      </div>

      {/* Tagline */}
      <p className="text-white/50 text-sm mt-4 tracking-wide">
        Making hidden traces a lasting wonder
      </p>
    </div>
  )
}
