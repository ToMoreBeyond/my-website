'use client'

import { ReactNode, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
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
  actions,
  eager = false,
}: DetailHeroProps) {
  const heroRef = useRef(null)
  const isInView = useInView(heroRef, { once: true, margin: '-100px' })
  const active = eager || isInView

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className={imagePosition === 'left' ? 'order-1' : 'order-1 lg:order-2'}
          >
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-2xl bg-muted ring-1 ring-foreground/10 lg:max-w-none">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 448px"
                priority={eager}
                loading={eager ? undefined : 'lazy'}
                quality={85}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 24 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={imagePosition === 'left' ? 'order-2' : 'order-2 lg:order-1'}
          >
            {badge && (
              <Badge variant="secondary" className="mb-6 gap-1.5">
                {badge.icon}
                {badge.label}
              </Badge>
            )}

            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {title}
            </h1>

            {subtitle && <p className="mb-3 text-lg text-muted-foreground">{subtitle}</p>}

            {tagline && (
              <p className="mb-6 text-xl font-medium text-foreground">{tagline}</p>
            )}

            {description && (
              <p className="mb-8 leading-relaxed text-muted-foreground">{description}</p>
            )}

            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
