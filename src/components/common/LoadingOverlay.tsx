'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [textIndex, setTextIndex] = useState(0)

  const loadingTexts = [
    'Loading experience...',
    'Preparing innovation...',
    'Making hidden traces...',
    'A lasting wonder...'
  ]

  useEffect(() => {
    // Text rotation
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length)
    }, 600)

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Start hiding when progress reaches 100
          setTimeout(() => setVisible(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => {
      clearInterval(textInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-olive-50 via-white to-emerald-50"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-8 px-4">
            {/* Logo with animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-64 h-64"
              >
                <Image
                  src="/images/logos/tomorebeyond-logo.png"
                  alt="ToMoreBeyond"
                  width={512}
                  height={512}
                  priority
                  className="w-full h-full"
                  style={{
                    objectFit: 'contain',
                    mixBlendMode: 'multiply'
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-olive-200/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-600 via-olive-600 to-emerald-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Animated text */}
            <div className="h-8 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={textIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg font-medium text-olive-700 tracking-wide"
                >
                  {loadingTexts[textIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm text-olive-600/70 italic tracking-wider"
            >
              Making hidden traces a lasting wonder
            </motion.p>

            {/* Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-2xl font-bold text-olive-800"
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

