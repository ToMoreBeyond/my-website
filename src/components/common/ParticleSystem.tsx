'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  opacity: number;
  color: string;
}

interface ParticleSystemProps {
  particleCount?: number;
  className?: string;
}

export function ParticleSystem({ particleCount = 50, className = '' }: ParticleSystemProps) {
  const controls = useAnimation();
  const [mounted, setMounted] = useState(false);
  const [activeSection] = useState('hero');

  // Generate particles
  const particles = useMemo<Particle[]>(() => {
    const colors = [
      'rgba(16, 185, 129, 0.6)', // emerald
      'rgba(14, 165, 233, 0.6)', // sky
      'rgba(217, 70, 239, 0.6)', // fuchsia
      'rgba(251, 191, 36, 0.6)', // amber
      'rgba(139, 92, 246, 0.6)', // violet
    ];

    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 2,
      speed: Math.random() * 2 + 0.5,
      direction: Math.random() * 360,
      opacity: Math.random() * 0.7 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [particleCount]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate particles based on active section
  useEffect(() => {
    if (!mounted) return;

    const sectionConfigs = {
      hero: {
        scale: 1.5,
        intensity: 1,
        movement: 'chaotic',
        color: 'emerald'
      },
      company: {
        scale: 1.2,
        intensity: 0.8,
        movement: 'organized',
        color: 'violet'
      },
      products: {
        scale: 1.0,
        intensity: 0.6,
        movement: 'flowing',
        color: 'sky'
      },
      team: {
        scale: 1.3,
        intensity: 0.9,
        movement: 'collaborative',
        color: 'emerald'
      },
      contact: {
        scale: 0.8,
        intensity: 0.5,
        movement: 'gentle',
        color: 'fuchsia'
      },
    };

    const config = sectionConfigs[activeSection as keyof typeof sectionConfigs] || sectionConfigs.hero;

    controls.start({
      scale: config.scale,
      opacity: config.intensity,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    });
  }, [activeSection, controls, mounted]);

  if (!mounted) return null;

  return (
    <motion.div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      animate={controls}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, ${particle.color}, transparent 70%)`,
            filter: 'blur(1px)',
          }}
          animate={{
            x: [
              0,
              Math.sin(particle.direction * Math.PI / 180) * 100,
              Math.cos(particle.direction * Math.PI / 180) * -50,
              0
            ],
            y: [
              0,
              Math.cos(particle.direction * Math.PI / 180) * 80,
              Math.sin(particle.direction * Math.PI / 180) * -60,
              0
            ],
            scale: [1, 1.5, 0.8, 1],
            opacity: [
              particle.opacity,
              particle.opacity * 1.5,
              particle.opacity * 0.3,
              particle.opacity
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15 + particle.speed * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.1,
          }}
        />
      ))}

      {/* Connecting Lines Between Particles */}
      <svg className="absolute inset-0 w-full h-full">
        {particles.slice(0, 15).map((particle, i) => {
          const nextParticle = particles[(i + 1) % 15];
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${particle.x}%`}
              y1={`${particle.y}%`}
              x2={`${nextParticle.x}%`}
              y2={`${nextParticle.y}%`}
              stroke={particle.color}
              strokeWidth="0.5"
              opacity="0.3"
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          );
        })}
      </svg>

      {/* Pulsing Core Elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`core-${i}`}
          className="absolute rounded-full border"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            width: 40 + i * 20,
            height: 40 + i * 20,
            borderColor: particles[i * 3]?.color || 'rgba(16, 185, 129, 0.3)',
            borderWidth: 1,
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.div>
  );
}