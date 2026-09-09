import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  /** 英字の小さなラベル（Products など）。丸いタグとして貼る */
  label?: string
  /** 見出し本体 */
  title: string
  /** 補足の一文。明朝で組む */
  description?: string
  align?: 'left' | 'center'
  /** 暗い区画（インクの地）に置くとき */
  inverted?: boolean
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

/**
 * セクション見出し。英字ラベルは光点色の丸いタグ、日本語見出しは太く詰める。
 */
export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  inverted = false,
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {label && (
        <span
          className={cn(
            'inline-flex h-7 w-fit items-center rounded-full px-3 font-display text-sm font-semibold',
            inverted ? 'bg-primary-foreground/12 text-primary-foreground' : 'bg-brand-soft text-foreground'
          )}
        >
          {label}
        </span>
      )}
      <Tag
        className={cn(
          'palt text-4xl leading-[1.15] font-bold tracking-[-0.03em] md:text-5xl lg:text-6xl',
          inverted ? 'text-primary-foreground' : 'text-foreground'
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            'max-w-2xl font-mincho text-lg leading-relaxed',
            inverted ? 'text-primary-foreground/75' : 'text-muted-foreground',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
