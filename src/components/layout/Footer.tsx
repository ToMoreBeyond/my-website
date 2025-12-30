'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const footerLinks = {
  products: [
    { label: '忠嵩 (TADATAKA)', href: '/products/tadataka' },
    { label: 'TOI-RUN', href: '/products/toirun' },
    { label: 'Meet in the middle', href: '/products/meet-in-the-middle' },
  ],
  legal: [
    { label: 'プライバシーポリシー', href: '/privacy' },
    { label: '利用規約', href: '/terms' },
  ],
};

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const onHome = pathname === '/';
    if (onHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={scrollToTop}
              className="mb-6 focus:outline-none"
              aria-label="トップへ戻る"
            >
              <Image
                src="/images/logos/tomorebeyond-logo.png"
                alt="ToMoreBeyond"
                width={48}
                height={48}
                className="w-12 h-12 invert opacity-90"
              />
            </button>
            <p className="text-gray-400 text-sm leading-relaxed">
              埋もれた記録を、続く面白さへ。
            </p>
            <p className="text-gray-500 text-xs mt-3">
              Tokyo, Japan
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-medium mb-4 tracking-wider text-gray-400 uppercase">
              Navigate
            </h4>
            <ul className="space-y-3">
              {['products', 'team', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="text-gray-300 hover:text-white text-sm transition-colors capitalize"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs font-medium mb-4 tracking-wider text-gray-400 uppercase">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-medium mb-4 tracking-wider text-gray-400 uppercase">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
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
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ToMoreBeyond Inc.
            </p>
            <a
              href="https://x.com/ToMoreBeyond"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              X (Twitter)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
