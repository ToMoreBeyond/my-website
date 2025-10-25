'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  backgroundColor?: string
  index?: number
}

export function SectionTransition({ 
  children, 
  className = '',
  backgroundColor = '#ffffff',
  index = 0
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Parallax effect for content
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6])
  
  // Scale effect for dramatic entrance
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95])

  return (
    <motion.section
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor,
        opacity,
        scale
      }}
    >
      {/* Decorative gradient overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + index * 10}% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)`,
          y
        }}
      />
      
      {/* Content with parallax */}
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-3%']) }}>
        {children}
      </motion.div>

      {/* Bottom wave transition */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-24 -mb-1"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C240,96 480,32 720,48 C960,64 1200,96 1440,64 L1440,120 L0,120 Z"
          fill={backgroundColor}
          fillOpacity="0.1"
        />
      </svg>
    </motion.section>
  )
}