'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ExclamationTriangleIcon, ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            エラーが発生しました
          </h1>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            申し訳ございません。予期しないエラーが発生しました。<br />
            一時的な問題の可能性がありますので、ページを再読み込みしてみてください。
          </p>
        </motion.div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-sm text-red-800 font-mono text-left">
              {error.message}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowPathIcon className="w-5 h-5" />
            再読み込み
          </motion.button>

          <Link href="/">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg hover:border-neutral-400 hover:text-neutral-900 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <HomeIcon className="w-5 h-5" />
              トップページへ戻る
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <p className="text-sm text-neutral-500">
            問題が解決しない場合は、
            <Link
              href="/#contact"
              className="text-primary-600 hover:underline ml-1"
            >
              お問い合わせ
            </Link>
            ください。
          </p>
        </motion.div>
      </div>
    </div>
  );
}
