import { cn } from '@/lib/utils'

type Tone = 'lit' | 'solid' | 'hollow'

interface StatusDotProps {
  /** lit: 灯りが点いている（公開中など）。solid: 白い点。hollow: 中空（予定・開発中） */
  tone?: Tone
  className?: string
}

/**
 * 状態を表す小さな点。発光するのは lit だけ。
 */
export function StatusDot({ tone = 'hollow', className }: StatusDotProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block size-2 shrink-0 rounded-full',
        tone === 'lit' && 'bg-primary glow-ring',
        tone === 'solid' && 'bg-foreground',
        tone === 'hollow' && 'border border-muted-foreground',
        className
      )}
    />
  )
}
