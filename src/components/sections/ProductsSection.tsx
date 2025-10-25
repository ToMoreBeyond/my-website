'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { products } from '@/data/products';
import { DragElement } from '@/components/common/DragElement';
import { AnimatedElement } from '@/components/common/AnimatedElement';

const statusColors = {
  'in-development': {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-800 dark:text-yellow-300',
    label: '開発中'
  },
  'beta': {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-300',
    label: 'ベータ版'
  },
  'released': {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-300',
    label: 'リリース済み'
  }
};

export function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();

  return (
    <section id="products" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <DragElement
            dragConstraints={{
              top: -80,
              left: -120,
              right: 120,
              bottom: 80,
            }}
            resetOnRelease={true}
            elastic={true}
          >
            <h2 className="heading-2 text-gray-900 dark:text-white mb-6 select-none">
              革新的な
              <span className="text-gradient"> プロダクト</span>
            </h2>
          </DragElement>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            最先端技術と人間中心設計を融合した、次世代のモバイルアプリケーションを開発しています。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <AnimatedElement
              key={product.id}
              animation="scaleIn"
              delay={index * 0.2}
              duration={1.0}
            >
              <motion.div
                className="group cursor-pointer"
                onClick={() => router.push(`/products/${product.id}`)}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
              <div className="card h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={clsx(
                      'px-3 py-1 text-xs font-semibold rounded-full',
                      statusColors[product.status].bg,
                      statusColors[product.status].text
                    )}>
                      {statusColors[product.status].label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="heading-4 text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {product.nameEn}
                      </span>
                    </div>

                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                      {product.tagline}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        主な機能
                      </h4>
                      <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-1 h-1 bg-primary-500 rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        技術スタック
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {product.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {product.technologies.length > 4 && (
                          <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                            +{product.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(`/products/${product.id}`)}
                      className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      詳細を見る
                      <ArrowRightIcon className="ml-1 w-4 h-4" />
                    </motion.button>
                    {product.roadmapUrl && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(product.roadmapUrl!);
                        }}
                        className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                      >
                        ロードマップ
                        <ArrowRightIcon className="ml-1 w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            これらのプロダクトに興味がございましたら、お気軽にお問い合わせください。
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
              }
            }}
            className="btn-primary px-8 py-3 text-lg font-semibold"
          >
            プロジェクトについて相談する
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
