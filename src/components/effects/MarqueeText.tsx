'use client';

interface MarqueeTextProps {
  text: string
  speed?: number // pixels per second
  direction?: 'left' | 'right'
  className?: string
  pauseOnHover?: boolean
  separator?: string
  repeat?: number
}

// Simple, dependency-free marquee component with accessible fallbacks
export function MarqueeText({
  text,
  speed = 80,
  direction = 'left',
  className = '',
  pauseOnHover = true,
  separator = ' \u2213 ',
  repeat = 8,
}: MarqueeTextProps) {
  const content = Array.from({ length: repeat }).map((_, i) => (
    <span key={i} className="mx-4 whitespace-nowrap">
      {text}
      <span aria-hidden="true" className="opacity-40">{separator}</span>
    </span>
  ))

  const duration = 60_000 / Math.max(speed, 1) // convert speed to approx duration
  const dir = direction === 'left' ? 'normal' : 'reverse'

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`} role="region" aria-label="流れるテキスト">
      <div
        className={`flex items-center py-3 will-change-transform [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]`}
      >
        <div
          className={`shrink-0 min-w-full flex items-center animate-[marquee_linear_infinite] motion-reduce:animate-none`}
          style={{
            animationDuration: `${duration}s`,
            animationDirection: dir,
            animationPlayState: pauseOnHover ? 'running' : undefined,
          }}
        >
          {content}
        </div>
        <div
          className={`shrink-0 min-w-full flex items-center animate-[marquee_linear_infinite] motion-reduce:animate-none`}
          style={{
            animationDuration: `${duration}s`,
            animationDirection: dir,
            animationPlayState: pauseOnHover ? 'running' : undefined,
          }}
        >
          {content}
        </div>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}

