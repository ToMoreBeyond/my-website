'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  SparklesIcon,
  ChartBarIcon,
  UsersIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  MapIcon,
  ShieldCheckIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import { DragElement } from '@/components/common/DragElement';
import { AnimatedElement } from '@/components/common/AnimatedElement';

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const section = ref.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const values = [
    {
      icon: <MapIcon className="w-8 h-8" />,
      title: "未活用資源の活用",
      description: "埋もれた地域資源や個人の経験を再発見し、足跡を残していくサービスを提供します。",
      color: "from-emerald-400 to-green-500"
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "プライバシーの保護",
      description: "オンデバイス処理による利用者の行動データの安全な記録・活用を実現します。",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <BuildingStorefrontIcon className="w-8 h-8" />,
      title: "デジタルとリアルの融合",
      description: "アプリやサービスだけでなく、拠点・家具などのリアル側も重視した体験を提供します。",
      color: "from-orange-400 to-amber-500"
    }
  ];

  const stats = [
    { icon: <CodeBracketIcon className="w-6 h-6" />, number: "3+", label: "プロダクト開発中" },
    { icon: <UsersIcon className="w-6 h-6" />, number: "10k+", label: "ユーザーに愛用" },
    { icon: <GlobeAltIcon className="w-6 h-6" />, number: "5+", label: "技術領域をカバー" },
    { icon: <ChartBarIcon className="w-6 h-6" />, number: "99%", label: "アップタイム実績" }
  ];

  return (
    <section 
      ref={ref}
      id="company" 
      className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-blue-950 relative overflow-hidden"
    >
      {/* Interactive Background Effects */}
      <div className="absolute inset-0">
        {/* Mouse-following gradient */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(34, 197, 94, 0.15) 0%, 
                rgba(59, 130, 246, 0.1) 25%,
                rgba(139, 92, 246, 0.05) 50%,
                transparent 70%
              )
            `
          }}
        />
        
        {/* Animated geometric shapes */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-primary-200/30 to-secondary-200/30 dark:from-primary-800/30 dark:to-secondary-800/30"
              style={{
                width: Math.random() * 80 + 40,
                height: Math.random() * 80 + 40,
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
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="w-16 h-16 mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-20" />
              <div className="absolute inset-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                <CpuChipIcon className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8"
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #22c55e 30%, #3b82f6 70%, #8b5cf6 100%)',
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
            私たちについて
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-100 max-w-5xl mx-auto leading-relaxed"
          >
            <span className="font-semibold text-primary-600 dark:text-primary-400">ToMoreBeyond</span>は、テクノロジーの力で人々の生活をより豊かにすることを使命とする
            <br className="hidden md:block" />
            <span className="text-gradient">東京発のテクノロジー企業</span>です。
          </motion.p>
        </motion.div>

        {/* Mission Statement with 3D Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <DragElement
            dragConstraints={{
              top: -100,
              left: -150,
              right: 150,
              bottom: 100,
            }}
            resetOnRelease={true}
            elastic={true}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-gray-200/50 dark:border-gray-700/50 select-none"
              whileHover={{
                rotateY: 2,
                rotateX: -2,
                scale: 1.02,
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
              transition={{ duration: 0.3 }}
            >
            {/* Glowing border effect */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))',
                filter: 'blur(20px)',
              }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="relative z-10 text-center">
              <motion.h3 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6"
                animate={isInView ? {
                  textShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.3)',
                    '0 0 40px rgba(59, 130, 246, 0.3)',
                    '0 0 20px rgba(34, 197, 94, 0.3)',
                  ],
                } : {}}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                ミッション
              </motion.h3>
              <motion.p
                className="text-lg sm:text-xl text-gray-600 dark:text-gray-100 max-w-4xl mx-auto leading-relaxed"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-primary-600 dark:text-primary-400 font-semibold">「技術と情熱で、より遠くへ」</span>
                <br className="hidden sm:block" />
                革新的なモバイルアプリケーションの開発を通じて、社会に新たな価値を創造し、
                人々の可能性を最大限に引き出すテクノロジーソリューションを提供します。
              </motion.p>
            </div>
          </motion.div>
          </DragElement>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <AnimatedElement
              key={stat.label}
              animation="bounceIn"
              delay={0.2 + index * 0.1}
              duration={1.2}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                }}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200/30 dark:border-gray-700/30"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
              <motion.div
                className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-xl flex items-center justify-center"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.5,
                }}
              >
                <span className="text-primary-600 dark:text-primary-400">
                  {stat.icon}
                </span>
              </motion.div>
              <motion.div
                className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2"
                animate={{
                  scale: isInView ? [1, 1.1, 1] : [1, 1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.3,
                }}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>

        {/* Values Section with 3D Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            提供価値
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-100 max-w-3xl mx-auto">
            ToMoreBeyondが提供する3つの主要な価値
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <AnimatedElement
              key={value.title}
              animation="flipIn"
              delay={0.3 + index * 0.2}
              duration={1.2}
            >
              <motion.div
                whileHover={{
                  rotateY: 10,
                  rotateX: -10,
                  scale: 1.05,
                  y: -20,
                }}
                className="group perspective-1000"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 h-full">
                {/* Glowing background */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-gradient-to-br ${value.color}`}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating icon */}
                <motion.div
                  className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.5,
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                  }}
                >
                  {value.icon}
                </motion.div>
                
                <motion.h4 
                  className="text-xl font-bold text-gray-900 dark:text-white mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  {value.title}
                </motion.h4>
                
                <p className="text-gray-600 dark:text-gray-100 text-sm leading-relaxed">
                  {value.description}
                </p>

                {/* Particle effect on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.7,
                  }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 bg-gradient-to-r ${value.color} rounded-full`}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        y: [0, -20, -40],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                        delay: i * 0.3 + index * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>

        {/* Technology Focus */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 text-center"
        >
          <motion.div
            className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full px-8 py-4 mb-8"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <DevicePhoneMobileIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <span className="text-primary-700 dark:text-primary-300 font-semibold">
              モバイルファースト × 最先端技術
            </span>
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              <SparklesIcon className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            </motion.div>
          </motion.div>
          
          <p className="text-gray-600 dark:text-gray-100 max-w-2xl mx-auto">
            React Native、Flutter、AI/MLを駆使した次世代モバイルアプリケーションで、
            ユーザーエクスペリエンスの新たな地平を切り拓いています。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
