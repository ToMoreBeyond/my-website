'use client'

import { ReactNode, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

interface Badge {
  label: string
  icon?: ReactNode
}

interface DetailHeroProps {
  title: string
  subtitle?: string
  tagline?: string
  description?: string
  badge?: Badge
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
    <section className="py-24 lg:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className={imagePosition === 'left' ? 'order-1' : 'order-1 lg:order-2'}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 max-w-md mx-auto lg:max-w-none">
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 mb-6">
                {badge.icon}
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              {title}
            </h1>

            {subtitle && (
              <p className="text-lg text-gray-500 mb-3">
                {subtitle}
              </p>
            )}

            {tagline && (
              <p className="text-xl text-gray-700 font-medium mb-6">
                {tagline}
              </p>
            )}

            {description && (
              <p className="text-gray-600 leading-relaxed mb-8">
                {description}
              </p>
            )}

            {actions && (
              <div className="flex flex-wrap gap-3">
                {actions}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
