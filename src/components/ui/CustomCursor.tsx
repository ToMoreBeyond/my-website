'use client'

import { useEffect, useRef, useState } from 'react'

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  isClicking: boolean
  hoverType: 'default' | 'text' | 'button' | 'link' | 'image'
}

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    hoverType: 'default'
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateCursor = (e: MouseEvent) => {
      setCursorState(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY
      }))

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }

      if (followerRef.current) {
        followerRef.current.style.left = `${e.clientX}px`
        followerRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, isClicking: true }))
    }

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, isClicking: false }))
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      let hoverType: CursorState['hoverType'] = 'default'

      if (target.matches('button, .btn, [role="button"]')) {
        hoverType = 'button'
      } else if (target.matches('a, [role="link"]')) {
        hoverType = 'link'
      } else if (target.matches('img, .image-hover')) {
        hoverType = 'image'
      } else if (target.matches('h1, h2, h3, h4, h5, h6, p, span, .text-hover')) {
        hoverType = 'text'
      }

      setCursorState(prev => ({
        ...prev,
        isHovering: true,
        hoverType
      }))
    }

    const handleMouseLeave = () => {
      setCursorState(prev => ({
        ...prev,
        isHovering: false,
        hoverType: 'default'
      }))
    }

    // Mouse move
    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, .btn, a, img, h1, h2, h3, h4, h5, h6, p, span, .card, .hover-target'
    )

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)

      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  if (typeof window === 'undefined') return null

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={`
          fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference
          transition-all duration-200 ease-out
          ${cursorState.isHovering ? 'scale-150' : 'scale-100'}
          ${cursorState.isClicking ? 'scale-75' : ''}
          ${cursorState.hoverType === 'button' ? 'bg-blue-500' : 'bg-white'}
          ${cursorState.hoverType === 'link' ? 'bg-emerald-500' : ''}
          ${cursorState.hoverType === 'image' ? 'bg-purple-500' : ''}
          ${cursorState.hoverType === 'text' ? 'bg-yellow-500' : ''}
        `}
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Follower */}
      <div
        ref={followerRef}
        className={`
          fixed top-0 left-0 pointer-events-none z-[9998] border-2 border-white/30
          transition-all duration-300 ease-out
          ${cursorState.isHovering ? 'scale-200 border-opacity-60' : 'scale-100 border-opacity-30'}
          ${cursorState.isClicking ? 'scale-50' : ''}
          ${cursorState.hoverType === 'button' ? 'border-blue-500/60' : ''}
          ${cursorState.hoverType === 'link' ? 'border-emerald-500/60' : ''}
          ${cursorState.hoverType === 'image' ? 'border-purple-500/60' : ''}
          ${cursorState.hoverType === 'text' ? 'border-yellow-500/60' : ''}
        `}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Hover Text */}
      {cursorState.isHovering && cursorState.hoverType !== 'default' && (
        <div
          className="fixed pointer-events-none z-[9997] bg-black/80 text-white px-2 py-1 rounded text-xs font-medium"
          style={{
            left: `${cursorState.x + 20}px`,
            top: `${cursorState.y - 30}px`,
            transform: 'translateY(-100%)',
          }}
        >
          {cursorState.hoverType === 'button' && 'Click'}
          {cursorState.hoverType === 'link' && 'Visit'}
          {cursorState.hoverType === 'image' && 'View'}
          {cursorState.hoverType === 'text' && 'Read'}
        </div>
      )}
    </>
  )
}