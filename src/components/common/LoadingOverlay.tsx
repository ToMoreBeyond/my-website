'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setHiding(true)
      // Allow fade-out animation to complete
      const t2 = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(t2)
    }, 700)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-300 ${hiding ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="flex flex-col items-center gap-4">
        <Image src="/images/logos/tomorebeyond-logo.png" alt="ToMoreBeyond" width={220} height={88} priority />
        <div className="h-6 flex items-center gap-2 text-neutral-600">
          <span className="inline-block w-2 h-2 rounded-full bg-neutral-400 animate-pulse" />
          <span className="inline-block w-2 h-2 rounded-full bg-neutral-400 animate-pulse [animation-delay:120ms]" />
          <span className="inline-block w-2 h-2 rounded-full bg-neutral-400 animate-pulse [animation-delay:240ms]" />
        </div>
      </div>
    </div>
  )
}

