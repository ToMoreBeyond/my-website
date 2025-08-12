'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';

interface ScrollContextType {
  scrollY: any;
  scrollYProgress: any;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within ScrollAnimationProvider');
  }
  return context;
};

interface ScrollAnimationProviderProps {
  children: ReactNode;
}

export function ScrollAnimationProvider({ children }: ScrollAnimationProviderProps) {
  const { scrollY, scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState('');
  const [mounted, setMounted] = useState(false);

  // Smooth scroll values
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Section detection
  useEffect(() => {
    if (!mounted) return;

    const sections = ['hero', 'company', 'products', 'team', 'contact'];
    let currentSection = '';

    const handleScroll = () => {
      try {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        for (const section of sections) {
          const element = document.getElementById(section === 'hero' ? 'hero' : section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              currentSection = section;
              break;
            }
          }
        }

        if (currentSection !== activeSection) {
          setActiveSection(currentSection);
        }
      } catch (error) {
        console.warn('Error in handleScroll:', error);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, activeSection]);

  if (!mounted) return <div>{children}</div>;

  return (
    <ScrollContext.Provider 
      value={{ 
        scrollY: smoothScrollY, 
        scrollYProgress: smoothScrollYProgress, 
        activeSection,
        setActiveSection
      }}
    >
      {/* Dynamic Background Based on Active Section */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[1]"
        animate={{
          background: activeSection === 'hero' 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)'
            : activeSection === 'company'
            ? 'linear-gradient(135deg, #1e293b 0%, #374151 50%, #111827 100%)'
            : activeSection === 'products'
            ? 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)'
            : activeSection === 'team'
            ? 'linear-gradient(135deg, #f9fafb 0%, #f1f5f9 50%, #e2e8f0 100%)'
            : 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)',
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut"
        }}
      />

      {/* Floating Elements Based on Scroll */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          opacity: useTransform(smoothScrollYProgress, [0, 0.2, 0.8, 1], [0.8, 0.4, 0.6, 0.2])
        }}
      >
        {/* Animated geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary-200/20 to-secondary-200/20"
            style={{
              width: 60 + (i * 10),
              height: 60 + (i * 10),
              left: `${15 + (i * 7)}%`,
              top: `${10 + (i * 8)}%`,
              x: useTransform(
                smoothScrollY,
                [0, 2000],
                [0, (i % 2 === 0 ? 100 : -100) * (i + 1)]
              ),
              y: useTransform(
                smoothScrollY,
                [0, 2000],
                [0, (i % 3 === 0 ? -50 : 50) * (i + 1)]
              ),
              rotate: useTransform(
                smoothScrollY,
                [0, 2000],
                [0, 360 * (i % 2 === 0 ? 1 : -1)]
              ),
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + (i * 0.5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 z-50 origin-left"
        style={{
          scaleX: smoothScrollYProgress,
        }}
      />

      {/* Section Transition Overlay */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[3]"
        animate={{
          opacity: activeSection ? [0, 0.1, 0] : 0,
          background: activeSection === 'hero' 
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
            : activeSection === 'company'
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
            : activeSection === 'products'
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
            : activeSection === 'team'
            ? 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(217, 70, 239, 0.1) 0%, transparent 70%)',
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </ScrollContext.Provider>
  );
}