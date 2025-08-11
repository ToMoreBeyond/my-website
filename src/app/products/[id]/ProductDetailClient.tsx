'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  CodeBracketIcon, 
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  BeakerIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { Product } from '@/data/products';
import { clsx } from 'clsx';

const statusConfig = {
  'in-development': {
    icon: <ClockIcon className="w-5 h-5" />,
    label: '開発中',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20'
  },
  'beta': {
    icon: <BeakerIcon className="w-5 h-5" />,
    label: 'ベータ版',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20'
  },
  'released': {
    icon: <CheckCircleIcon className="w-5 h-5" />,
    label: 'リリース済み',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/20'
  }
};

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  
  const status = statusConfig[product.status];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/#products"
              className="flex items-center space-x-3 text-white hover:text-primary-400 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">プロダクト一覧に戻る</span>
            </Link>
            
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">ToMoreBeyond</span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                `radial-gradient(circle at 20% 50%, ${product.id === 'tadataka' ? 'rgba(16, 185, 129, 0.1)' : product.id === 'toirun' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(217, 70, 239, 0.1)'} 0%, transparent 50%)`,
                `radial-gradient(circle at 80% 50%, ${product.id === 'tadataka' ? 'rgba(16, 185, 129, 0.1)' : product.id === 'toirun' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(217, 70, 239, 0.1)'} 0%, transparent 50%)`,
                `radial-gradient(circle at 20% 50%, ${product.id === 'tadataka' ? 'rgba(16, 185, 129, 0.1)' : product.id === 'toirun' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(217, 70, 239, 0.1)'} 0%, transparent 50%)`,
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center space-x-2 mb-6"
              >
                <div className={clsx(
                  'flex items-center space-x-2 px-4 py-2 rounded-full border backdrop-blur-sm',
                  status.bg,
                  status.border,
                  status.color
                )}>
                  {status.icon}
                  <span className="text-sm font-semibold">{status.label}</span>
                </div>
              </motion.div>

              {/* Product Name */}
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  background: `linear-gradient(135deg, #fff 0%, ${product.id === 'tadataka' ? '#10b981' : product.id === 'toirun' ? '#0ea5e9' : '#d946ef'} 50%, #fff 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {product.name}
              </motion.h1>

              <motion.p 
                className="text-xl text-gray-400 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {product.nameEn}
              </motion.p>

              {/* Tagline */}
              <motion.p 
                className="text-2xl text-primary-400 font-medium mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {product.tagline}
              </motion.p>

              {/* Description */}
              <motion.p 
                className="text-lg text-gray-300 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {product.description}
              </motion.p>

              {/* Actions */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {product.links?.website && (
                  <motion.a
                    href={product.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PlayIcon className="w-5 h-5 mr-2" />
                    アプリを試す
                  </motion.a>
                )}
                
                {product.links?.github && (
                  <motion.a
                    href={product.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-400 transition-colors font-semibold"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CodeBracketIcon className="w-5 h-5 mr-2" />
                    コードを見る
                  </motion.a>
                )}
                
                <motion.button
                  className="inline-flex items-center px-8 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-colors font-semibold"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                >
                  <ShareIcon className="w-5 h-5 mr-2" />
                  シェア
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500/20 rounded-full backdrop-blur-sm"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary-500/20 rounded-full backdrop-blur-sm"
                animate={{
                  rotate: -360,
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <SparklesIcon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-6">主な機能</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {product.name}が提供する革新的な機能をご紹介します
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl p-6 hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-primary-400" />
                  </div>
                  <span className="text-white font-semibold">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">技術スタック</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              最新の技術を駆使して開発されています
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {product.technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                }}
                className="px-6 py-3 bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-full text-gray-300 font-medium hover:text-white hover:border-primary-500/50 transition-all duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900/20 to-secondary-900/20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {product.name}について詳しく知りたい方へ
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              プロジェクトの詳細や導入に関するご相談は、お気軽にお問い合わせください
            </p>
            <motion.button
              onClick={() => router.push('/#contact')}
              className="inline-flex items-center px-12 py-4 bg-primary-600 text-white rounded-full text-lg font-semibold hover:bg-primary-700 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              お問い合わせ
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container-custom text-center">
          <p className="text-gray-400 mb-4">
            &copy; 2024 ToMoreBeyond Inc. All rights reserved.
          </p>
          <Link 
            href="/"
            className="text-primary-400 hover:text-primary-300 transition-colors font-medium"
          >
            トップページに戻る
          </Link>
        </div>
      </footer>
    </div>
  );
}