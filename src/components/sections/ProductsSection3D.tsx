'use client';

import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRightIcon, CodeBracketIcon, PlayIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { products } from '@/data/products';

const statusColors = {
  'in-development': {
    bg: 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20',
    text: 'text-yellow-300',
    label: '開発中',
    glow: 'shadow-yellow-400/20'
  },
  'beta': {
    bg: 'bg-gradient-to-r from-blue-400/20 to-cyan-400/20',
    text: 'text-blue-300',
    label: 'ベータ版',
    glow: 'shadow-blue-400/20'
  },
  'released': {
    bg: 'bg-gradient-to-r from-green-400/20 to-emerald-400/20',
    text: 'text-green-300',
    label: 'リリース済み',
    glow: 'shadow-green-400/20'
  }
};

export function ProductsSection() {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="products" className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <SparklesIcon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #22c55e 50%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={isInView ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            革新的なプロダクト
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            最先端技術と人間中心設計を融合した、次世代のモバイルアプリケーションを開発しています。
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 45 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group perspective-1000"
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <motion.div
                className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 h-full"
                whileHover={{
                  rotateY: 5,
                  rotateX: -5,
                  scale: 1.02,
                  boxShadow: `0 25px 50px -12px ${statusColors[product.status].glow}`,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Glowing Border Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${product.id === 'tadataka' ? '#22c55e' : product.id === 'toirun' ? '#3b82f6' : '#8b5cf6'}/20, transparent)`,
                    filter: 'blur(1px)',
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Product Image with Parallax */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      scale: hoveredCard === product.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  
                  {/* Overlay with Animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"
                    animate={hoveredCard === product.id ? {
                      background: [
                        'linear-gradient(to top, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.2), transparent)',
                        'linear-gradient(to top, rgba(34, 197, 94, 0.1), rgba(17, 24, 39, 0.2), transparent)',
                        'linear-gradient(to top, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.2), transparent)',
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Status Badge with Glow */}
                  <motion.div
                    className="absolute top-4 left-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className={clsx(
                      'px-4 py-2 text-sm font-semibold rounded-full backdrop-blur-sm border',
                      statusColors[product.status].bg,
                      statusColors[product.status].text,
                      'border-current/20'
                    )}>
                      {statusColors[product.status].label}
                    </div>
                  </motion.div>

                  {/* Floating Tech Icons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {product.technologies.slice(0, 2).map((tech, i) => (
                      <motion.div
                        key={tech}
                        className="w-8 h-8 bg-black/40 rounded-full backdrop-blur-sm flex items-center justify-center text-xs text-white font-mono"
                        animate={hoveredCard === product.id ? {
                          y: [0, -5, 0],
                          rotate: [0, 180, 360],
                        } : {}}
                        transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                      >
                        {tech.charAt(0)}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Content with 3D Transform */}
                <motion.div
                  className="p-4 sm:p-6 relative"
                  style={{
                    transform: hoveredCard === product.id ? 'translateZ(20px)' : 'translateZ(0px)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <motion.h3 
                        className="text-xl sm:text-2xl font-bold text-white"
                        whileHover={{ scale: 1.05 }}
                      >
                        {product.name}
                      </motion.h3>
                      <span className="text-sm text-gray-400 font-mono">
                        {product.nameEn}
                      </span>
                    </div>

                    <motion.p 
                      className="text-primary-400 font-medium mb-3"
                      animate={hoveredCard === product.id ? {
                        textShadow: [
                          '0 0 10px rgba(34, 197, 94, 0.3)',
                          '0 0 20px rgba(34, 197, 94, 0.6)',
                          '0 0 10px rgba(34, 197, 94, 0.3)',
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {product.tagline}
                    </motion.p>

                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Features with Stagger Animation */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-2">
                        主な機能
                      </h4>
                      <motion.ul className="text-xs text-gray-300 space-y-1">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <motion.li 
                            key={idx}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.2 + idx * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 animate-pulse" />
                            {feature}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                    {/* Technologies with Float Animation */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-2">
                        技術スタック
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {product.technologies.slice(0, 4).map((tech, i) => (
                          <motion.span
                            key={tech}
                            className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded backdrop-blur-sm"
                            whileHover={{ 
                              scale: 1.1, 
                              backgroundColor: 'rgba(34, 197, 94, 0.2)',
                              color: '#fff'
                            }}
                            animate={hoveredCard === product.id ? {
                              y: [0, -2, 0],
                            } : {}}
                            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {product.technologies.length > 4 && (
                          <span className="px-2 py-1 text-xs text-gray-400">
                            +{product.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions with 3D Hover */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="flex space-x-2">
                      {product.links?.github && (
                        <motion.a
                          href={product.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-primary-400 transition-colors"
                          whileHover={{ 
                            scale: 1.2, 
                            rotateY: 180,
                            color: '#22c55e'
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <CodeBracketIcon className="w-5 h-5" />
                        </motion.a>
                      )}
                      {product.links?.website && (
                        <motion.a
                          href={product.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-primary-400 transition-colors"
                          whileHover={{ 
                            scale: 1.2, 
                            rotateY: 180,
                            color: '#22c55e'
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <PlayIcon className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>

                    <motion.button
                      className="flex items-center text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(`/products/${product.id}`)}
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-1 w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Holographic Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: hoveredCard === product.id 
                      ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
                      : 'transparent',
                    opacity: hoveredCard === product.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            これらのプロダクトに興味がございましたら、お気軽にお問い合わせください。
          </motion.p>
          
          <motion.button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
              }
            }}
            className="group relative px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)',
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-secondary-400 to-primary-400"
              initial={{ x: '-100%', skewX: 45 }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative flex items-center">
              プロジェクトについて相談する
              <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}