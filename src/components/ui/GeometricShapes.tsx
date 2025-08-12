'use client'

import { motion } from 'framer-motion'

export const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large Floating Cubes */}
      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40"
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 180, 360],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: 'linear-gradient(135deg, #10b981, #06d6a0, #118ab2)',
          transform: 'perspective(1000px) rotateX(45deg) rotateY(45deg)',
          boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)'
        }}
      />

      {/* Medium Cylinder */}
      <motion.div
        className="absolute top-1/4 right-20 w-32 h-64 rounded-full"
        animate={{
          rotateZ: [0, 360],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'linear-gradient(90deg, #667eea, #764ba2)',
          transform: 'perspective(1000px) rotateX(75deg)',
          boxShadow: '0 30px 80px rgba(102, 126, 234, 0.4)'
        }}
      />

      {/* Small Cubes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            background: i % 2 === 0 
              ? 'linear-gradient(45deg, #f093fb, #f5576c)' 
              : 'linear-gradient(45deg, #4facfe, #00f2fe)',
            transform: 'perspective(800px) rotateX(45deg) rotateY(45deg)',
            boxShadow: '0 15px 40px rgba(79, 172, 254, 0.3)'
          }}
          animate={{
            rotateY: [0, 360],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Large Background Spheres */}
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'radial-gradient(circle, #10b981, #059669)',
          filter: 'blur(20px)',
        }}
      />

      <motion.div
        className="absolute top-20 right-10 w-64 h-64 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          background: 'radial-gradient(circle, #667eea, #764ba2)',
          filter: 'blur(25px)',
        }}
      />

      {/* Floating Rectangles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`rect-${i}`}
          className="absolute"
          style={{
            width: `${60 + i * 20}px`,
            height: `${20 + i * 10}px`,
            left: `${60 + i * 20}%`,
            top: `${40 + i * 15}%`,
            background: 'linear-gradient(45deg, #a8edea, #fed6e3)',
            transform: 'perspective(600px) rotateX(60deg)',
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(168, 237, 234, 0.4)'
          }}
          animate={{
            rotateZ: [0, 180, 360],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}