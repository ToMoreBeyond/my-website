'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Smooth spring animations for cursor
  const springX = useSpring(cursorX, { damping: 25, stiffness: 700 })
  const springY = useSpring(cursorY, { damping: 25, stiffness: 700 })
  
  const isHovering = useRef(false)
  
  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => {
      isHovering.current = true
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(1.5)'
        cursorRef.current.style.backgroundColor = 'rgba(16, 185, 129, 0.3)'
      }
    }

    const handleMouseLeave = () => {
      isHovering.current = false
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(1)'
        cursorRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
      }
    }

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-hover')
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    document.addEventListener('mousemove', updateCursor)
    
    return () => {
      document.removeEventListener('mousemove', updateCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease'
      }}
    />
  )
}