'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

export function GlobalMouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsMoving(true);

    // Clear the moving state after a delay
    const timeout = setTimeout(() => setIsMoving(false), 150);
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsMoving(false);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mounted, handleMouseMove, handleMouseLeave]);

  if (!mounted) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
        }}
        animate={{
          scale: isMoving ? 1.5 : 1,
          opacity: isMoving ? 0.8 : 0.6,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-difference"
        style={{
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
        }}
        animate={{
          scale: isMoving ? 1.2 : 1,
          opacity: isMoving ? 0.4 : 0.2,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
      >
        <div className="w-10 h-10 border-2 border-white rounded-full" />
      </motion.div>

      {/* Global gradient following cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9990] w-full h-full"
        style={{
          background: `
            radial-gradient(
              600px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(16, 185, 129, 0.08) 0%,
              rgba(14, 165, 233, 0.05) 30%,
              rgba(217, 70, 239, 0.03) 60%,
              transparent 100%
            )
          `,
        }}
        animate={{
          opacity: isMoving ? 1 : 0.6,
        }}
        transition={{
          duration: 0.3,
        }}
      />

      {/* Trailing particles */}
      {isMoving && (
        <motion.div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
              style={{
                left: Math.cos((i / 8) * Math.PI * 2) * 20,
                top: Math.sin((i / 8) * Math.PI * 2) * 20,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                x: [0, Math.cos((i / 8) * Math.PI * 2) * 40],
                y: [0, Math.sin((i / 8) * Math.PI * 2) * 40],
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: i * 0.05,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Color pulse effect */}
      <motion.div
        className="fixed pointer-events-none z-[9991] w-full h-full mix-blend-overlay"
        animate={{
          background: [
            `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
            `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.1) 0%, transparent 50%)`,
            `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(217, 70, 239, 0.1) 0%, transparent 50%)`,
            `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}