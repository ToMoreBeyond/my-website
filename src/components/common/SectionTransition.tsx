'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  sectionId: string;
  className?: string;
  transitionType?: 'slide' | 'fade' | 'split' | 'spiral' | 'wave';
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function SectionTransition({
  children,
  sectionId,
  className = '',
  transitionType = 'slide',
  direction = 'up'
}: SectionTransitionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-10%' });

  const getTransitionVariants = (): Variants => {
    const directionMultiplier = {
      up: { x: 0, y: 100 },
      down: { x: 0, y: -100 },
      left: { x: 100, y: 0 },
      right: { x: -100, y: 0 }
    };

    const offset = directionMultiplier[direction];

    switch (transitionType) {
      case 'slide':
        return {
          hidden: {
            opacity: 0,
            x: offset.x,
            y: offset.y,
            scale: 0.9,
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: {
              duration: 1.2,
              ease: "easeOut" as const,
              staggerChildren: 0.1,
            }
          }
        };

      case 'fade':
        return {
          hidden: {
            opacity: 0,
            filter: 'blur(10px)',
          },
          visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
              duration: 1.5,
              ease: "easeOut",
            }
          }
        };

      case 'split':
        return {
          hidden: {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
            opacity: 0,
          },
          visible: {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 1,
            transition: {
              duration: 1.8,
              ease: "easeInOut" as const,
            }
          }
        };

      case 'spiral':
        return {
          hidden: {
            opacity: 0,
            scale: 0.5,
            rotate: -180,
            filter: 'blur(5px)',
          },
          visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 1.5,
              ease: "backOut" as const,
              staggerChildren: 0.15,
            }
          }
        };

      case 'wave':
        return {
          hidden: {
            opacity: 0,
            y: 60,
            scaleY: 0.8,
          },
          visible: {
            opacity: 1,
            y: 0,
            scaleY: 1,
            transition: {
              duration: 1.4,
              ease: "easeOut" as const,
              staggerChildren: 0.08,
            }
          }
        };

      default:
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      id={sectionId}
      className={`relative overflow-hidden ${className}`}
      variants={getTransitionVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Decorative Border Animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* Top border */}
        <motion.div
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        />
        
        {/* Bottom border */}
        <motion.div
          className="absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-primary-500 via-secondary-500 to-accent-500"
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
        />
        
        {/* Left border */}
        <motion.div
          className="absolute top-0 left-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500"
          initial={{ height: 0 }}
          animate={isInView ? { height: '100%' } : { height: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
        />
        
        {/* Right border */}
        <motion.div
          className="absolute top-0 right-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500"
          initial={{ height: 0 }}
          animate={isInView ? { height: '100%' } : { height: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
        />
      </motion.div>

      {/* Corner Glow Effects */}
      <motion.div
        className="absolute -top-2 -left-2 w-4 h-4 bg-primary-500/50 rounded-full blur-sm"
        animate={isInView ? {
          scale: [0, 1.5, 1],
          opacity: [0, 0.8, 0.4],
        } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 2,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
      
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-secondary-500/50 rounded-full blur-sm"
        animate={isInView ? {
          scale: [0, 1.5, 1],
          opacity: [0, 0.8, 0.4],
        } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 2,
          ease: "easeOut",
          delay: 0.7,
        }}
      />

      <motion.div
        className="absolute -bottom-2 -left-2 w-4 h-4 bg-accent-500/50 rounded-full blur-sm"
        animate={isInView ? {
          scale: [0, 1.5, 1],
          opacity: [0, 0.8, 0.4],
        } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 2,
          ease: "easeOut",
          delay: 0.9,
        }}
      />

      <motion.div
        className="absolute -bottom-2 -right-2 w-4 h-4 bg-primary-500/50 rounded-full blur-sm"
        animate={isInView ? {
          scale: [0, 1.5, 1],
          opacity: [0, 0.8, 0.4],
        } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 2,
          ease: "easeOut",
          delay: 1.1,
        }}
      />

      {/* Section Content */}
      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            }
          }
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}