'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './FallingTextCursor.module.css'

interface FallingChar {
  id: number
  char: string
  x: number
  y: number
  rotation: number
  scale: number
  opacity: number
  velocity: number
  color: string
}

const CHAR_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export const FallingTextCursor = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [chars, setChars] = useState<FallingChar[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const charIdRef = useRef(0)
  const lastSpawnTimeRef = useRef(0)

  // Generate random character
  const createChar = (x: number, y: number): FallingChar => {
    const randomChar = CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)]
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
    
    return {
      id: charIdRef.current++,
      char: randomChar,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      opacity: 1,
      velocity: Math.random() * 2 + 1,
      color: randomColor
    }
  }

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setIsActive(true)
      
      const now = Date.now()
      if (now - lastSpawnTimeRef.current > 50) {
        lastSpawnTimeRef.current = now
        
        setChars(prev => {
          const newChar = createChar(e.clientX, e.clientY)
          const updated = [...prev, newChar]
          // Keep only last 30 characters
          return updated.slice(-30)
        })
      }
    }

    const handleMouseLeave = () => {
      setIsActive(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Animate falling characters
  useEffect(() => {
    const interval = setInterval(() => {
      setChars(prev => 
        prev
          .map(char => ({
            ...char,
            y: char.y + char.velocity * 2,
            rotation: char.rotation + char.velocity * 3,
            opacity: Math.max(0, char.opacity - 0.02),
            scale: char.scale * 0.99
          }))
          .filter(char => char.opacity > 0 && char.y < window.innerHeight + 100)
      )
    }, 16) // 60fps

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Trailing effect */}
      <div 
        className="absolute w-8 h-8 rounded-full"
        style={{
          left: mousePos.x - 16,
          top: mousePos.y - 16,
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent)`,
          filter: 'blur(10px)',
          opacity: isActive ? 0.5 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
      
      {/* Falling characters */}
      {chars.map(char => (
        <div
          key={char.id}
          className={styles.fallingChar}
          style={{
            left: char.x,
            top: char.y,
            transform: `rotate(${char.rotation}deg) scale(${char.scale})`,
            opacity: char.opacity,
            color: char.color,
            position: 'absolute',
            fontFamily: 'monospace',
            fontSize: '20px',
            fontWeight: 'bold',
            textShadow: `0 0 10px ${char.color}`,
            pointerEvents: 'none',
            userSelect: 'none',
            willChange: 'transform, opacity'
          }}
        >
          {char.char}
        </div>
      ))}

      {/* Main cursor dot */}
      <div
        className="absolute w-3 h-3 rounded-full bg-white mix-blend-difference"
        style={{
          left: mousePos.x - 6,
          top: mousePos.y - 6,
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  )
}