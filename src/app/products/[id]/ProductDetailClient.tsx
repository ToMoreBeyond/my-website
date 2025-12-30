'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckIcon, ClockIcon, BeakerIcon, CheckCircleIcon, ShareIcon } from '@heroicons/react/24/outline';
import { Product } from '@/data/products';
import { DetailHero } from '@/components/layout/DetailHero';
import { RoadmapTimeline } from '@/components/roadmap/RoadmapTimeline';
import { getRoadmapByProductId } from '@/data/roadmaps';

const statusConfig = {
  'in-development': {
    icon: <ClockIcon className="w-4 h-4" />,
    label: '開発中',
  },
  'beta': {
    icon: <BeakerIcon className="w-4 h-4" />,
    label: 'ベータ版',
  },
  'released': {
    icon: <CheckCircleIcon className="w-4 h-4" />,
    label: 'リリース済み',
  }
};

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const status = statusConfig[product.status];
  const roadmap = getRoadmapByProductId(product.id);
  const featuresRef = useRef(null);
  const techRef = useRef(null);
  const infoRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const techInView = useInView(techRef, { once: true, margin: '-100px' });
  const infoInView = useInView(infoRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-white">
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
            <span
              className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium"
              style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
            >
              リリース予定: {product.releaseSchedule}
            </span>
            <button
              className="inline-flex items-center px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
              onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
            >
              <ShareIcon className="w-4 h-4 mr-2" />
              シェア
            </button>
          </>
        }
      />

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 lg:py-32 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">主な機能</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {product.name}が提供する機能
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 24 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-900 font-medium">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section ref={techRef} className="py-24 lg:py-32 bg-white">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={techInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">技術スタック</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              最新の技術を駆使して開発
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {product.technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={techInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      {roadmap && (
        <section id="roadmap" className="py-24 lg:py-32 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-6 md:px-8">
            <RoadmapTimeline roadmap={roadmap} />
          </div>
        </section>
      )}

      {/* Additional Info Section */}
      <section ref={infoRef} className="py-24 lg:py-32 bg-white">
        <div className="container max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Target Users */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">ターゲットユーザー</h3>
              <div className="space-y-3">
                {product.targetUsers.map((user) => (
                  <div
                    key={user}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200"
                  >
                    <CheckIcon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="text-gray-700">{user}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Platform Details */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">対応プラットフォーム</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">対応デバイス</h4>
                  <ul className="space-y-2">
                    {product.supportedDevices.map((device) => (
                      <li key={device} className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3" />
                        {device}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">システム要件</h4>
                  <p className="text-gray-700">{product.minimumOS}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">対象地域</h4>
                  <p className="text-gray-700">{product.targetRegion}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
