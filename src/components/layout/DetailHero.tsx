'use client'

import { ReactNode } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface HeroBadge {
  label: string
  icon?: ReactNode
}

interface DetailHeroProps {
  title: string
  subtitle?: string
  tagline?: string
  description?: string
  badge?: HeroBadge
  imageSrc: string
  imageAlt: string
  imagePosition?: 'left' | 'right'
  /** icon: アプリアイコンとして角丸タイルに収める。photo: 写真として縦長のタイルに敷く */
  imageStyle?: 'icon' | 'photo'
  /** アイコンの角に貼る絵文字のステッカー */
  sticker?: string
  actions?: ReactNode
  eager?: boolean
}

export function DetailHero({
  title,
  subtitle,
  tagline,
  description,
  badge,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  imageStyle = 'photo',
  sticker,
  actions,
  eager = false,
}: DetailHeroProps) {
  const reduce = useReducedMotion()
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section className="relative overflow-hidden py-10 lg:py-16">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Media */}
          <motion.div
            {...fade(0.05)}
            className={cn(
              'flex justify-center lg:col-span-5',
              imagePosition === 'left' ? 'order-1' : 'order-1 lg:order-2'
            )}
          >
            {imageStyle === 'icon' ? (
              <div className="relative">
                <div className="relative size-52 overflow-hidden rounded-[24%] shadow-lift ring-1 ring-foreground/10 sm:size-64 lg:size-80">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 256px, 320px"
                    priority={eager}
                    loading={eager ? undefined : 'lazy'}
                    quality={85}
                  />
                </div>
                {sticker && (
                  <span
                    aria-hidden
                    className="sticker absolute -top-4 -right-5 size-12 -rotate-6 text-2xl md:size-14 md:text-3xl"
                  >
                    {sticker}
                  </span>
                )}
              </div>
            ) : (
              <div className="relative aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-3xl shadow-lift ring-1 ring-foreground/10">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 380px"
                  priority={eager}
                  loading={eager ? undefined : 'lazy'}
                  quality={85}
                />
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            {...fade(0.15)}
            className={cn(
              'flex flex-col gap-5 lg:col-span-7',
              imagePosition === 'left' ? 'order-2' : 'order-2 lg:order-1'
            )}
          >
            <div className="flex flex-wrap items-center gap-3">
              {badge && (
                <Badge
                  variant="secondary"
                  className="h-7 gap-1.5 px-3 font-display text-xs font-semibold"
                >
                  {badge.icon}
                  {badge.label}
                </Badge>
              )}
              {subtitle && (
                <span className="font-display text-sm font-medium text-muted-foreground">
                  {subtitle}
                </span>
              )}
            </div>

            <h1 className="palt text-4xl leading-[1.1] font-bold tracking-[-0.03em] text-foreground md:text-6xl lg:text-7xl">
              {title}
            </h1>

            {tagline && (
              <p className="font-mincho text-xl leading-snug text-foreground md:text-2xl lg:text-3xl">
                {tagline}
              </p>
            )}

            {description && (
              <p className="max-w-prose leading-relaxed text-muted-foreground">{description}</p>
            )}

            {actions && <div className="mt-2 flex flex-wrap items-center gap-3">{actions}</div>}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
