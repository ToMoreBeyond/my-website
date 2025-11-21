'use client';

import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  products: [
    { label: '忠嵩 (TADATAKA)', href: '/products/tadataka' },
    { label: 'TOI-RUN', href: '/products/toirun' },
    { label: 'Meet in the middle', href: '/products/meet-in-the-middle' },
  ],
  support: [
    { label: 'プライバシーポリシー', href: '/privacy' },
    { label: '利用規約', href: '/terms' },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <button
              onClick={scrollToTop}
              className="mb-6 focus:outline-none"
              aria-label="トップへ戻る"
            >
              <Image
                src="/images/logos/tomorebeyond-logo.png"
                alt="ToMoreBeyond"
                width={80}
                height={80}
                className="w-16 h-16 invert"
              />
            </button>
            <p className="text-gray-400 text-sm leading-relaxed">
              埋もれた記録を、続く面白さへ。
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Tokyo, Japan
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold mb-4 tracking-widest text-gray-300">
              NAVIGATE
            </h4>
            <ul className="space-y-3">
              {['products', 'team', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(`#${item}`)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {item.toUpperCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-bold mb-4 tracking-widest text-gray-300">
              PRODUCTS
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold mb-4 tracking-widest text-gray-300">
              LEGAL
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ToMoreBeyond Inc.
            </p>
            <a
              href="https://x.com/ToMoreBeyond"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm font-bold transition-colors"
            >
              X (Twitter)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
