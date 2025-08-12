'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const AnimatedLogo = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.5 
      }}
      transition={{
        duration: 1.2,
        delay: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smooth appearance
      }}
      className="relative"
    >
      <motion.svg
        width="180"
        height="180"
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
      >
        {/* Logo Background Circle */}
        <motion.circle
          cx="90"
          cy="90"
          r="85"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, rotate: -90 }}
          animate={{ pathLength: 1, rotate: 0 }}
          transition={{
            pathLength: { duration: 2, delay: 0.5, ease: "easeInOut" },
            rotate: { duration: 2, delay: 0.5, ease: "easeInOut" }
          }}
        />
        
        {/* Logo Text - T */}
        <motion.path
          d="M 50 60 L 50 50 L 80 50 L 80 60 L 70 60 L 70 90 L 60 90 L 60 60 L 50 60"
          fill="white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        
        {/* Logo Text - M */}
        <motion.path
          d="M 85 50 L 85 90 L 95 90 L 95 70 L 100 80 L 105 70 L 105 90 L 115 90 L 115 50 L 105 50 L 100 65 L 95 50 L 85 50"
          fill="white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        
        {/* Logo Text - B */}
        <motion.path
          d="M 120 50 L 120 90 L 135 90 C 140 90 145 85 145 80 C 145 75 142 72 140 70 C 142 68 143 65 143 60 C 143 55 138 50 133 50 L 120 50 M 130 60 L 133 60 C 134 60 135 61 135 63 C 135 65 134 66 133 66 L 130 66 L 130 60 M 130 76 L 135 76 C 136 76 137 77 137 79 C 137 81 136 82 135 82 L 130 82 L 130 76"
          fill="white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        />
        
        {/* Animated Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={90 + Math.cos((i * 60) * Math.PI / 180) * 70}
            cy={90 + Math.sin((i * 60) * Math.PI / 180) * 70}
            r="3"
            fill="#3b82f6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 1],
              opacity: [0, 1, 0.6]
            }}
            transition={{
              duration: 2,
              delay: 1.6 + i * 0.1,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        ))}
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 blur-xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)',
          zIndex: -1
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}