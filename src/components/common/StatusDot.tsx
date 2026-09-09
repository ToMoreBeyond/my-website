import { cn } from '@/lib/utils'

type Tone = 'lit' | 'solid' | 'hollow'

interface StatusDotProps {
  /** lit: 光点が点いている（公開中など）。solid: インクの点。hollow: 中空（予定・開発中） */
  tone?: Tone
  className?: string
}

/**
 * 状態を表す小さな点。光点色になるのは lit だけ。
 */
export function StatusDot({ tone = 'hollow', className }: StatusDotProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block size-2.5 shrink-0 rounded-full',
        tone === 'lit' && 'bg-brand ring-brand-glow',
        tone === 'solid' && 'bg-foreground',
        tone === 'hollow' && 'border-2 border-muted-foreground/70',
        className
      )}
    />
  )
}
