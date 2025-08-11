'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  SparklesIcon,
  RocketLaunchIcon,
  HeartIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      icon: <LightBulbIcon className="w-8 h-8" />,
      title: "革新性",
      description: "最先端の技術と創造性を融合し、業界に新たな価値を提供します。"
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: "情熱",
      description: "プロダクト開発への深い情熱が、質の高いソリューションを生み出します。"
    },
    {
      icon: <RocketLaunchIcon className="w-8 h-8" />,
      title: "挑戦",
      description: "困難な課題にも恐れず立ち向かい、限界を突破し続けます。"
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: "品質",
      description: "妥協のない品質へのこだわりが、信頼できるプロダクトを実現します。"
    }
  ];

  return (
    <section id="company" className="py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            style={{
              background: 'linear-gradient(135deg, #1f2937 0%, #22c55e 50%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            私たちについて
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            ToMoreBeyondは、テクノロジーの力で人々の生活をより豊かにすることを使命とする東京発のテクノロジー企業です。
            革新的なモバイルアプリケーションの開発を通じて、社会に新たな価値を創造し続けています。
          </motion.p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="text-center">
            <motion.h3 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
              whileHover={{ scale: 1.02 }}
            >
              "技術と情熱で、より遠くへ"
            </motion.h3>
            <motion.p 
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
              whileHover={{ scale: 1.01 }}
            >
              私たちは単なるアプリ開発会社ではありません。ユーザーの日常に寄り添い、
              本当に価値のある体験を提供することで、テクノロジーと人間の距離を縮める架け橋となることを目指しています。
            </motion.p>
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            私たちの価値観
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-2xl mb-4"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {value.icon}
                </motion.div>
                
                <motion.h4 
                  className="text-xl font-bold text-gray-900 dark:text-white mb-3"
                  whileHover={{ scale: 1.05 }}
                >
                  {value.title}
                </motion.h4>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 leading-relaxed"
                  whileHover={{ scale: 1.02 }}
                >
                  {value.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-gray-900 dark:bg-gray-700 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">3</div>
              <div className="text-lg text-gray-300">革新的プロダクト</div>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="text-4xl md:text-5xl font-bold text-secondary-400 mb-2">2024</div>
              <div className="text-lg text-gray-300">設立年</div>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">∞</div>
              <div className="text-lg text-gray-300">可能性</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}