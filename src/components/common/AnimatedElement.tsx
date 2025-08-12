'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'rotateIn' | 'slideInUp' | 'bounceIn' | 'flipIn' | 'zoomIn';
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function AnimatedElement({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  stagger = 0
}: AnimatedElementProps) {

  const getAnimationVariants = (): Variants => {
    switch (animation) {
      case 'fadeInUp':
        return {
          hidden: { opacity: 0, y: 60, filter: 'blur(4px)' },
          visible: { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)',
            transition: { 
              duration, 
              delay: delay + stagger,
              ease: "easeOut" as const 
            }
          }
        };

      case 'fadeInDown':
        return {
          hidden: { opacity: 0, y: -60, filter: 'blur(4px)' },
          visible: { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)',
            transition: { 
              duration, 
              delay: delay + stagger,
              ease: "easeOut" as const 
            }
          }
        };

      case 'fadeInLeft':
        return {
          hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
          visible: { 
            opacity: 1, 
            x: 0, 
            filter: 'blur(0px)',
            transition: { 
              duration, 
              delay: delay + stagger,
              ease: "easeOut" as const 
            }
          }
        };

      case 'fadeInRight':
        return {
          hidden: { opacity: 0, x: 60, filter: 'blur(4px)' },
          visible: { 
            opacity: 1, 
            x: 0, 
            filter: 'blur(0px)',
            transition: { 
              duration, 
              delay: delay + stagger,
              ease: "easeOut" as const 
            }
          }
        };

      case 'scaleIn':
        return {
          hidden: { opacity: 0, scale: 0.5, filter: 'blur(8px)' },
          visible: { 
            opacity: 1, 
            scale: 1, 
            filter: 'blur(0px)',
            transition: { 
              duration, 
              delay: delay + stagger,
              ease: "backOut" as const 
            }
          }
        };

      case 'rotateIn':
        return {
          hidden: { opacity: 0, rotate: -180, scale: 0.5 },
          visible: { 
            opacity: 1, 
            rotate: 0, 
            scale: 1,
            transition: { 
              duration, 
              delay: delay + stagger,
              ease: "easeOut" as const 
            }
          }
        };

      case 'slideInUp':
        return {
          hidden: { 
            opacity: 0, 
            y: 100, 
            scaleY: 0.8,
            transformOrigin: 'bottom'
          },
          visible: { 
            opacity: 1, 
            y: 0, 
            scaleY: 1,
            transition: { 
              duration, 
              delay: delay + stagger,
              ease: "easeOut" as const 
            }
          }
        };

      case 'bounceIn':
        return {
          hidden: { opacity: 0, scale: 0.3 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: duration * 1.5, 
              delay: delay + stagger,
              type: "spring" as const,
              stiffness: 300,
              damping: 10
            }
          }
        };

      case 'flipIn':
        return {
          hidden: { 
            opacity: 0, 
            rotateY: -90, 
            transformOrigin: 'center',
            filter: 'blur(4px)'
          },
          visible: { 
            opacity: 1, 
            rotateY: 0,
            filter: 'blur(0px)',
            transition: { 
              duration, 
              delay: delay + stagger,
              ease: "easeOut" as const 
            }
          }
        };

      case 'zoomIn':
        return {
          hidden: { 
            opacity: 0, 
            scale: 0, 
            filter: 'blur(10px)' 
          },
          visible: { 
            opacity: 1, 
            scale: 1, 
            filter: 'blur(0px)',
            transition: { 
              duration, 
              delay: delay + stagger,
              ease: "backOut" as const 
            }
          }
        };

      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration, 
              delay: delay + stagger 
            }
          }
        };
    }
  };

  return (
    <motion.div
      className={className}
      variants={getAnimationVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
    >
      {children}
    </motion.div>
  );
}