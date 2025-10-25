'use client';

import { motion } from 'framer-motion';
import { PlayIcon, CheckCircleIcon, ClockIcon, BeakerIcon, SparklesIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Product } from '@/data/products';
import { DetailHero } from '@/components/layout/DetailHero';

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
  const status = statusConfig[product.status];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <DetailHero
        title={product.name}
        subtitle={product.nameEn}
        tagline={product.tagline}
        description={product.description}
        badge={{ label: status.label, icon: status.icon }}
        imageSrc={product.image}
        imageAlt={product.name}
        imagePosition="right"
        actions={
          <>
            <motion.div
              className="inline-flex items-center px-8 py-3 bg-olive-600 dark:bg-olive-700 text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              リリース予定: {product.releaseSchedule}
            </motion.div>
            <motion.button
              className="inline-flex items-center px-8 py-3 border border-neutral-300 dark:border-gray-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:border-neutral-400 dark:hover:border-gray-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors font-semibold"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
            >
              <ShareIcon className="w-5 h-5 mr-2" />
              シェア
            </motion.button>
          </>
        }
      />

      {/* Features Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <SparklesIcon className="w-12 h-12 text-olive-700 dark:text-olive-400 mx-auto mb-4" />
            <h2 className="text-4xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 mb-6">主な機能</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
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
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-neutral-200 dark:border-gray-700 rounded-xl p-6 hover:border-olive-600/40 dark:hover:border-olive-500/40 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-olive-50 dark:bg-olive-900/30 rounded-lg border border-olive-200/60 dark:border-olive-700/60 flex items-center justify-center">
                    <CheckCircleIcon className="w-6 h-6 text-olive-700 dark:text-olive-400" />
                  </div>
                  <span className="text-neutral-900 dark:text-neutral-100 font-semibold">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 mb-6">技術スタック</h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
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
                  scale: 1.06,
                }}
                className="px-6 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-neutral-200 dark:border-gray-700 rounded-full text-neutral-700 dark:text-neutral-300 font-medium hover:border-olive-600/40 dark:hover:border-olive-500/40 transition-all duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      {product.roadmapUrl && (
        <section id="roadmap" className="section bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-serif font-semibold text-neutral-900 dark:text-neutral-100 mb-6">開発ロードマップ</h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
                {product.name}の開発予定と将来のビジョンをご紹介します
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {/* Development Phase */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-neutral-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className={`w-3 h-3 rounded-full ${status.color.replace('text-', 'bg-')} mr-3`} />
                    <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">現在のフェーズ</h3>
                  </div>
                  <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-4">
                    {product.developmentPhase}
                  </p>
                  <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span>{product.releaseSchedule}</span>
                  </div>
                </div>
              </motion.div>

              {/* Target Users */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-neutral-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">ターゲットユーザー</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.targetUsers.map((user, index) => (
                      <motion.div
                        key={user}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-3 p-4 bg-olive-50 dark:bg-olive-900/20 rounded-lg border border-olive-200/40 dark:border-olive-700/40"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-olive-700 dark:text-olive-400 flex-shrink-0" />
                        <span className="text-neutral-800 dark:text-neutral-200">{user}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Platform Details */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-neutral-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">対応プラットフォーム</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">対応デバイス</h4>
                      <ul className="space-y-2">
                        {product.supportedDevices.map((device) => (
                          <li key={device} className="flex items-center text-neutral-700 dark:text-neutral-300">
                            <div className="w-1.5 h-1.5 bg-olive-600 dark:bg-olive-400 rounded-full mr-3" />
                            {device}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">システム要件</h4>
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4">{product.minimumOS}</p>
                      <h4 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-3">対象地域</h4>
                      <p className="text-neutral-700 dark:text-neutral-300">{product.targetRegion}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTA moved to DetailLayout */}
    </div>
  );
}
