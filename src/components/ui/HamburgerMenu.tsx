'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { smoothScrollTo } from '@/lib/animations'

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: '私たちについて', target: '#about' },
    { label: 'プロダクト', target: '#products' },
    { label: 'チーム', target: '#team' },
    { label: 'お問い合わせ', target: '#contact' },
  ]

  const handleItemClick = (target: string) => {
    smoothScrollTo(target)
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        className="fixed top-6 right-6 z-50 w-12 h-12 flex flex-col justify-center items-center bg-white/95 backdrop-blur-md rounded-lg border border-neutral-200 shadow"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className={`block w-6 h-0.5 ${isOpen ? 'bg-white' : 'bg-neutral-900'} mb-1`}
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={`block w-6 h-0.5 ${isOpen ? 'bg-white' : 'bg-neutral-900'} mb-1`}
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={`block w-6 h-0.5 ${isOpen ? 'bg-white' : 'bg-neutral-900'}`}
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-gradient-to-br from-purple-900 via-blue-900 to-emerald-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center min-h-screen">
              <motion.nav
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleItemClick(item.target)}
                    className="block w-full py-6 px-8 text-4xl md:text-5xl font-bold text-white hover:text-emerald-300 transition-colors"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05, x: 20 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.nav>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 border border-white/10 rounded-lg"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [0.5, 1, 0.5],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
