'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { smoothScrollTo } from '@/lib/animations';

const footerLinks = {
  company: [
    { label: '会社概要', href: '#about' },
    { label: 'ビジョン', href: '#about' },
    { label: 'チーム', href: '#team' },
  ],
  products: [
    { label: '忠嵩 (TADATAKA)', href: '/products/tadataka' },
    { label: 'TOI-RUN', href: '/products/toirun' },
    { label: 'Meet in the middle', href: '/products/meet-in-the-middle' },
  ],
  support: [
    { label: 'お問い合わせ', href: '#contact' },
    { label: 'プライバシーポリシー', href: '/privacy' },
    { label: '利用規約', href: '/terms' },
  ],
};

const socialLinks = [
  { label: 'X (Twitter)', href: 'https://x.com/ToMoreBeyond', icon: 'X' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  };

  return (
    <footer className="bg-white border-t border-neutral-200 py-16 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info with Logo */}
          <div className="lg:col-span-1">
            <motion.button
              onClick={scrollToTop}
              className="mb-6 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="トップへ戻る"
            >
              <div className="relative w-24 h-auto lg:w-32">
                <Image
                  src="/images/logos/tomorebeyond-logo.png"
                  alt="ToMoreBeyond"
                  width={200}
                  height={50}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1024px) 96px, 128px"
                  loading="lazy"
                  quality={90}
                />
              </div>
            </motion.button>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              埋もれた記録を、続く面白さへ。<br />
              Making hidden traces a lasting wonder.
            </p>
            <p className="text-neutral-500 text-xs">
              Tokyo, Japan – 東京から、面白さの循環を。
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wider">
              会社情報
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-neutral-600 hover:text-primary-600 text-sm transition-colors inline-block"
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wider">
              プロダクト
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-600 hover:text-primary-600 text-sm transition-colors inline-block"
                  >
                    <motion.span whileHover={{ x: 4 }} className="inline-block">
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-4 uppercase tracking-wider">
              サポート
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('#') ? (
                    <motion.a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-neutral-600 hover:text-primary-600 text-sm transition-colors inline-block"
                      whileHover={{ x: 4 }}
                    >
                      {link.label}
                    </motion.a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-neutral-600 hover:text-primary-600 text-sm transition-colors inline-block"
                    >
                      <motion.span whileHover={{ x: 4 }} className="inline-block">
                        {link.label}
                      </motion.span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 pb-8 border-b border-neutral-200">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-primary-600 text-sm font-medium transition-colors"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} ToMoreBeyond Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
