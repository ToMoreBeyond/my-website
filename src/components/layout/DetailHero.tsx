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
    <section className="section relative overflow-hidden">
      {/* Subtle moving radial background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.10) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(14, 165, 233, 0.10) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.10) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container relative z-10">
        <div
          className={
            imagePosition === 'left'
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
              : 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'
          }
        >
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === 'left' ? -50 : 50 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: imagePosition === 'left' ? -50 : 50 }}
            transition={{ duration: 0.8 }}
            className={imagePosition === 'left' ? 'order-2 lg:order-1' : 'order-1 lg:order-2'}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 max-w-md mx-auto">
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            {/* Floating soft accents */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500/20 rounded-full backdrop-blur-sm"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-500/20 rounded-full backdrop-blur-sm"
              animate={{ rotate: -360, scale: [1, 0.9, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, x: imagePosition === 'left' ? 50 : -50 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: imagePosition === 'left' ? 50 : -50 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={imagePosition === 'left' ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}
          >
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 text-olive-700 mb-6"
              >
                {badge.icon}
                <span className="text-sm font-semibold">{badge.label}</span>
              </motion.div>
            )}

            <motion.h1
              className="font-serif text-display md:text-hero font-semibold text-neutral-900 mb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                className="text-xl text-neutral-500 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {subtitle}
              </motion.p>
            )}

            {tagline && (
              <motion.p
                className="text-2xl text-olive-700 font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                {tagline}
              </motion.p>
            )}

            {description && (
              <motion.p
                className="text-lg text-neutral-600 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {description}
              </motion.p>
            )}

            {actions && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {actions}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
