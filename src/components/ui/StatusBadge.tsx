'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Rocket, Sparkles } from 'lucide-react'

export type BadgeStatus = 'released' | 'beta' | 'in-development' | 'coming-soon'
export type BadgeVariant = 'default' | 'compact'

interface StatusBadgeProps {
  status: BadgeStatus
  variant?: BadgeVariant
  animated?: boolean
  className?: string
}

const statusConfig = {
  released: {
    label: 'リリース済',
    icon: CheckCircle2,
    gradient: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    shadow: 'shadow-emerald-100',
  },
  beta: {
    label: 'ベータ版',
    icon: Sparkles,
    gradient: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    shadow: 'shadow-amber-100',
  },
  'in-development': {
    label: '開発中',
    icon: Clock,
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    shadow: 'shadow-blue-100',
  },
  'coming-soon': {
    label: '近日公開',
    icon: Rocket,
    gradient: 'from-purple-500 to-pink-600',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    shadow: 'shadow-purple-100',
  },
}

export function StatusBadge({
  status,
  variant = 'default',
  animated = true,
  className = '',
}: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  const badgeVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.05, y: -2 },
  }

  const iconVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
  }

  if (variant === 'compact') {
    return (
      <motion.div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg} ${config.text} border ${config.border} shadow-sm ${className}`}
        variants={animated ? badgeVariants : undefined}
        initial={animated ? 'initial' : undefined}
        animate={animated ? 'animate' : undefined}
        whileHover={animated ? 'hover' : undefined}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
        <span className="text-xs font-bold tracking-wide">{config.label}</span>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${config.bg} border ${config.border} shadow-lg ${config.shadow} backdrop-blur-sm ${className}`}
      variants={animated ? badgeVariants : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      whileHover={animated ? 'hover' : undefined}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`w-8 h-8 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center`}
        variants={animated ? iconVariants : undefined}
        transition={{
          duration: 0.6,
          ease: 'easeInOut',
        }}
      >
        <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
      </motion.div>
      <div className="flex flex-col">
        <span className={`text-sm font-bold ${config.text}`}>{config.label}</span>
      </div>
    </motion.div>
  )
}

// Category badge for filtering
interface CategoryBadgeProps {
  category: string
  className?: string
}

export function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  return (
    <motion.span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md bg-olive-100 text-olive-700 border border-olive-200 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {category}
    </motion.span>
  )
}
