'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export const CompanyLogo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: 0
      }}
      transition={{
        duration: 1.5,
        delay: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      className="relative inline-block"
    >
      {/* Glowing background */}
      <motion.div
        className="absolute inset-0 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4), transparent)',
          zIndex: -1
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Logo Image */}
      <motion.div
        className="relative"
        whileHover={{ 
          scale: 1.05,
          filter: 'brightness(1.2)'
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/images/logos/tomorebeyond-logo.png"
          alt="ToMoreBeyond"
          width={512}
          height={512}
          className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
          priority
        />
      </motion.div>
      
      {/* Floating particles around logo */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-emerald-400 rounded-full"
          style={{
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [0, Math.cos((i * 90) * Math.PI / 180) * 60, 0],
            y: [0, Math.sin((i * 90) * Math.PI / 180) * 60, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            delay: 0.5 + i * 0.2,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
      ))}
    </motion.div>
  )
}