'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  color: string
}

interface ParticleFieldProps {
  particleCount?: number
  className?: string
  colors?: string[]
  interactive?: boolean
}

export const ParticleField = ({ 
  particleCount = 50, 
  className = '',
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  interactive = true
}: ParticleFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isMouseNear, setIsMouseNear] = useState(false)

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      life: 0,
      maxLife: Math.random() * 1000 + 1000,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
  }

  // Update particle
  const updateParticle = (particle: Particle, width: number, height: number, deltaTime: number) => {
    // Mouse interaction
    if (interactive && isMouseNear) {
      const dx = mouseRef.current.x - particle.x
      const dy = mouseRef.current.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 100) {
        const force = (100 - distance) / 100
        particle.vx -= (dx / distance) * force * 0.01
        particle.vy -= (dy / distance) * force * 0.01
      }
    }

    // Update position
    particle.x += particle.vx * deltaTime
    particle.y += particle.vy * deltaTime

    // Boundary check
    if (particle.x < 0 || particle.x > width) particle.vx *= -1
    if (particle.y < 0 || particle.y > height) particle.vy *= -1

    // Keep in bounds
    particle.x = Math.max(0, Math.min(width, particle.x))
    particle.y = Math.max(0, Math.min(height, particle.y))

    // Update life
    particle.life += deltaTime
    if (particle.life > particle.maxLife) {
      particle.life = 0
      particle.x = Math.random() * width
      particle.y = Math.random() * height
      particle.vx = (Math.random() - 0.5) * 0.5
      particle.vy = (Math.random() - 0.5) * 0.5
    }

    // Breathing effect
    const breathe = Math.sin(particle.life * 0.005) * 0.2 + 0.8
    particle.opacity = (Math.sin(particle.life * 0.003) + 1) * 0.25 * breathe
  }

  // Render particles
  const render = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height)

    // Draw connections
    particlesRef.current.forEach((particle, i) => {
      particlesRef.current.slice(i + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          const opacity = (120 - distance) / 120 * 0.1
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      })
    })

    // Draw particles
    particlesRef.current.forEach(particle => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()

      // Glow effect
      ctx.shadowColor = particle.color
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    })
  }

  // Animation loop
  const animate = (currentTime: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const deltaTime = 16 // Assume 60fps

    // Update particles
    particlesRef.current.forEach(particle => 
      updateParticle(particle, canvas.width, canvas.height, deltaTime)
    )

    // Render
    render(ctx, canvas.width, canvas.height)

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    const handleMouseEnter = () => setIsMouseNear(true)
    const handleMouseLeave = () => setIsMouseNear(false)

    // Setup
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', handleMouseEnter)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.6 }}
    />
  )
}