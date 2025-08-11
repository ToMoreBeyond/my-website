'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDownIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
        mouseX.set(x - rect.width / 2);
        mouseY.set(y - rect.height / 2);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('company');
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-none"
    >
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(34, 197, 94, 0.1) 0%, 
              transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
          `
        }}
      >
        {/* Animated Grid Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating Geometric Shapes */}
        {mounted && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary-400/20 to-secondary-400/20 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Custom Cursor */}
      {mounted && (
        <motion.div
          className="fixed w-6 h-6 bg-primary-500/50 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            left: springX,
            top: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20 container-custom text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Company Name with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-8"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6"
              style={{
                textShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
                background: 'linear-gradient(135deg, #fff 0%, #22c55e 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              ToMoreBeyond
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 font-light tracking-wide"
            >
              技術と情熱で、より遠くへ
            </motion.div>
          </motion.div>

          {/* Interactive Description */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              革新的なモバイルアプリケーションと最先端技術で、
              <br className="hidden md:block" />
              <motion.span
                className="text-primary-400 font-semibold"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(34, 197, 94, 0.5)',
                    '0 0 20px rgba(34, 197, 94, 0.8)',
                    '0 0 10px rgba(34, 197, 94, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                人々の日常をより豊かに変革
              </motion.span>
              する東京のテクノロジー企業
            </motion.p>
          </motion.div>

          {/* Interactive CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              onClick={scrollToProducts}
              className="group relative px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-full overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center">
                製品を見る
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <motion.button
              onClick={scrollToContact}
              className="group relative px-12 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full backdrop-blur-sm overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.8)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative">お問い合わせ</span>
            </motion.button>
          </motion.div>

          {/* Scroll Indicator with Physics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToAbout}
              className="p-3 rounded-full border-2 border-white/20 backdrop-blur-sm hover:border-primary-400 hover:bg-primary-400/10 transition-all duration-300"
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
              whileHover={{ 
                scale: 1.2,
                backgroundColor: 'rgba(34, 197, 94, 0.2)'
              }}
            >
              <ChevronDownIcon className="w-6 h-6 text-white" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 200],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}