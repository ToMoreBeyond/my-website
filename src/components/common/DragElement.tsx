'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, ReactNode } from 'react';

interface DragElementProps {
  children: ReactNode;
  className?: string;
  dragConstraints?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  onDragStart?: () => void;
  onDragEnd?: () => void;
  resetOnRelease?: boolean;
  elastic?: boolean;
}

export function DragElement({
  children,
  className = '',
  dragConstraints,
  onDragStart,
  onDragEnd,
  resetOnRelease = false,
  elastic = true
}: DragElementProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform values for visual effects
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  const scale = useTransform([x, y], ([xVal, yVal]) => {
    const xNum = typeof xVal === 'number' ? xVal : 0;
    const yNum = typeof yVal === 'number' ? yVal : 0;
    const distance = Math.sqrt(xNum * xNum + yNum * yNum);
    return Math.max(0.8, 1 - distance / 500);
  });

  // Reset position if needed
  useEffect(() => {
    if (resetOnRelease) {
      const unsubscribeX = x.on('change', (latest) => {
        if (Math.abs(latest) < 1) {
          x.set(0);
        }
      });
      
      const unsubscribeY = y.on('change', (latest) => {
        if (Math.abs(latest) < 1) {
          y.set(0);
        }
      });

      return () => {
        unsubscribeX();
        unsubscribeY();
      };
    }
  }, [x, y, resetOnRelease]);

  return (
    <motion.div
      className={`cursor-grab active:cursor-grabbing select-none ${className}`}
      drag
      dragMomentum={elastic}
      dragElastic={elastic ? 0.1 : 0}
      dragConstraints={dragConstraints}
      style={{
        x,
        y,
        rotateX: elastic ? rotateX : 0,
        rotateY: elastic ? rotateY : 0,
        scale: elastic ? scale : 1,
      }}
      onDragStart={() => {
        onDragStart?.();
      }}
      onDragEnd={() => {
        onDragEnd?.();
        if (resetOnRelease) {
          x.set(0);
          y.set(0);
        }
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 1000,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
        filter: 'brightness(1.1)',
      }}
      whileHover={{
        scale: 1.02,
        filter: 'brightness(1.05)',
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
}