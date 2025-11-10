'use client'

import { motion } from 'framer-motion'

interface FilterButtonProps {
  label: string
  active: boolean
  onClick: () => void
  count?: number
}

export function FilterButton({ label, active, onClick, count }: FilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-emerald-600 to-olive-600 text-white shadow-lg'
          : 'bg-white/90 text-neutral-700 border-2 border-neutral-200 hover:border-olive-400'
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <span className="flex items-center gap-2">
        {label}
        {count !== undefined && (
          <span
            className={`px-2 py-0.5 text-xs rounded-full ${
              active
                ? 'bg-white/20 text-white'
                : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {count}
          </span>
        )}
      </span>

      {active && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-olive-400 opacity-20"
          layoutId="activeFilter"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  )
}
