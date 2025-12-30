'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

export function HeroSection() {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
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
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-white pt-20 lg:pt-24"
    >
      <div className="container max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="text-center">
          {/* Company Name */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8 md:mb-12"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-3">
              ToMoreBeyond
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-normal">
              トモビ
            </p>
          </motion.div>

          {/* Tagline - JUST DO IT! */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="mb-10 md:mb-16"
          >
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold tracking-tight">
              JUST DO IT!
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="mb-12 md:mb-20"
          >
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              革新的なモバイルアプリケーションと最先端技術で、
              <br className="hidden sm:block" />
              人々の日常をより豊かに変革する東京のテクノロジー企業
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToProducts}
              className="w-full sm:w-auto px-8 py-4 text-base font-medium rounded-lg transition-colors duration-200"
              style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF' }}
            >
              製品を見る
            </button>

            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto px-8 py-4 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
            >
              お問い合わせ
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToProducts}
          className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-label="下へスクロール"
        >
          <ArrowDownIcon className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
