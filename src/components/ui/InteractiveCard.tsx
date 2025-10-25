'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  glowEffect?: boolean
  onClick?: () => void
}

export const InteractiveCard = ({ 
  children, 
  className = '', 
  intensity = 1,
  glowEffect = true,
  onClick 
}: InteractiveCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    setMousePosition({ x: mouseX, y: mouseY })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const rotateX = mousePosition.y * -0.1 * intensity
  const rotateY = mousePosition.x * 0.1 * intensity

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative group cursor-pointer transform-gpu perspective-1000
        transition-all duration-300 ease-out
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: isHovering ? rotateX : 0,
        rotateY: isHovering ? rotateY : 0,
        scale: isHovering ? 1.05 : 1,
        z: isHovering ? 50 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Glow Effect */}
      {glowEffect && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          animate={{
            opacity: isHovering ? 0.3 : 0,
          }}
          style={{
            transform: 'translateZ(-1px)',
          }}
        />
      )}

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl opacity-0"
        animate={{
          opacity: isHovering ? 1 : 0,
          x: isHovering ? mousePosition.x * 0.1 : 0,
          y: isHovering ? mousePosition.y * 0.1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          transform: `translateZ(1px)`,
        }}
      />

      {/* Content */}
      <div 
        className="relative z-10 w-full h-full"
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        {children}
      </div>

      {/* Shadow */}
      <motion.div
        className="absolute inset-0 bg-black/20 rounded-xl blur-xl opacity-0 -z-10"
        animate={{
          opacity: isHovering ? 0.4 : 0,
          scale: isHovering ? 1.1 : 1,
          y: isHovering ? 10 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}