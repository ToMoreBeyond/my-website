'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            ページが見つかりません
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
            お探しのページは存在しないか、移動または削除された可能性があります。<br />
            URLをご確認いただくか、トップページからお探しください。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 dark:bg-primary-700 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <HomeIcon className="w-5 h-5" />
              トップページへ戻る
            </motion.button>
          </Link>

          <motion.button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 border-2 border-neutral-300 dark:border-gray-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:border-neutral-400 dark:hover:border-gray-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            前のページへ戻る
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            引き続き問題が発生する場合は、
            <Link
              href="/#contact"
              className="text-primary-600 dark:text-primary-400 hover:underline ml-1"
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
