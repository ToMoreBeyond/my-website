'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { products } from '@/data/products';

const statusColors = {
  'in-development': {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    label: '開発中'
  },
  'beta': {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    label: 'ベータ版'
  },
  'released': {
    bg: 'bg-gray-900',
    text: 'text-white',
    label: 'リリース済み'
  }
};

export function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();

  return (
    <section id="products" className="py-24 lg:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            プロダクト
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            最先端技術と人間中心設計を融合した、
            <br className="hidden sm:block" />
            次世代のモバイルアプリケーションを開発しています。
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <div className="h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all duration-200">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={clsx(
                      'px-3 py-1.5 text-xs font-medium rounded-full',
                      statusColors[product.status].bg,
                      statusColors[product.status].text
                    )}>
                      {statusColors[product.status].label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.nameEn}
                    </p>
                  </div>

                  {/* Tagline */}
                  <p className="text-gray-700 font-medium mb-3">
                    {product.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {product.technologies.length > 3 && (
                      <span className="px-2.5 py-1 text-xs text-gray-400">
                        +{product.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action */}
                  <div className="flex items-center text-gray-900 font-medium group-hover:text-gray-600 transition-colors">
                    <span className="text-sm">詳細を見る</span>
                    <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16 lg:mt-20"
        >
          <p className="text-gray-600 mb-6">
            プロダクトに興味がございましたら、お気軽にお問い合わせください。
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg hover:opacity-90 transition-opacity duration-200"
            style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
          >
            お問い合わせ
            <ArrowRightIcon className="ml-2 w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
