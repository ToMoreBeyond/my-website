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
  /** icon: アプリアイコンとして角丸タイルに収める。photo: 写真としてタイル全面に敷く */
  imageStyle?: 'icon' | 'photo'
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
  actions,
  eager = false,
}: DetailHeroProps) {
  const reduce = useReducedMotion()
  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Media */}
          <motion.div
            {...fade(0.05)}
            className={cn(
              'lg:col-span-5',
              imagePosition === 'left' ? 'order-1' : 'order-1 lg:order-2'
            )}
          >
            <div className="relative mx-auto w-full max-w-[420px]">
              <div aria-hidden className="bloom inset-[-18%] opacity-80" />
              <div className="glass relative aspect-square overflow-hidden rounded-3xl">
                {imageStyle === 'icon' ? (
                  <div className="flex size-full items-center justify-center p-[14%]">
                    <div className="relative size-full overflow-hidden rounded-[22%] shadow-2xl">
                      <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 80vw, 420px"
                        priority={eager}
                        loading={eager ? undefined : 'lazy'}
                        quality={85}
                      />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 420px"
                    priority={eager}
                    loading={eager ? undefined : 'lazy'}
                    quality={85}
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            {...fade(0.15)}
            className={cn(
              'flex flex-col gap-4 lg:col-span-7',
              imagePosition === 'left' ? 'order-2' : 'order-2 lg:order-1'
            )}
          >
            {badge && (
              <Badge variant="outline" className="h-7 w-fit gap-1.5 px-3">
                {badge.icon}
                {badge.label}
              </Badge>
            )}

            <div className="flex flex-col gap-1">
              {subtitle && (
                <p className="font-display text-sm font-semibold tracking-wide text-primary">
                  {subtitle}
                </p>
              )}
              <h1 className="palt text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {title}
              </h1>
            </div>

            {tagline && (
              <p className="text-xl font-medium text-foreground md:text-2xl">{tagline}</p>
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
