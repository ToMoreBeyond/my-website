'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  MapPinIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Netlify Forms submission
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      
      alert('お問い合わせありがとうございます。後日担当者よりご連絡させていただきます。');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      alert('送信中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: '所在地',
      info: '東京都渋谷区',
      href: null
    }
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-850 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 text-gray-900 dark:text-white mb-6">
            お気軽に
            <span className="text-gradient"> お問い合わせ</span>
            ください
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-100 max-w-3xl mx-auto">
            プロジェクトのご相談、採用に関するお問い合わせ、その他ご質問がございましたら、
            お気軽にご連絡ください。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="heading-3 text-gray-900 dark:text-white mb-8">
              コンタクト情報
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex-shrink-0 p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-600 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {item.info}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-100">{item.info}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 lg:mt-12 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                営業時間
              </h4>
              <div className="text-gray-600 dark:text-gray-100 space-y-2">
                <p>平日: 9:00 - 18:00</p>
                <p>土日祝: 休業</p>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>※緊急時は24時間対応可能です</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true"
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                    お名前 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="山田太郎"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                    メールアドレス *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                    placeholder="yamada@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                  会社名・組織名
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                  placeholder="株式会社サンプル"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                  お問い合わせ内容 *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors resize-none"
                  placeholder="お問い合わせ内容をご記入ください..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary px-6 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                    送信中...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                    メッセージを送信
                  </div>
                )}
              </motion.button>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                送信いただいた情報は、お問い合わせ対応のみに使用いたします。
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
