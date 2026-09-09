import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  /** 英字の小さなラベル（Products など） */
  label?: string
  /** 見出し本体 */
  title: string
  /** 補足の一文 */
  description?: string
  align?: 'left' | 'center'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

/**
 * セクション見出し。英字ラベルは灯りの色、日本語見出しは太く詰める。
 */
export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {label && (
        <p className="font-display text-sm font-semibold tracking-wide text-primary">{label}</p>
      )}
      <Tag className="palt text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {title}
      </Tag>
      {description && (
        <p className={cn('max-w-2xl text-muted-foreground', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  )
}
