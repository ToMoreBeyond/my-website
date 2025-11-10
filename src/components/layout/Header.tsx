'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { usePathname, useRouter } from 'next/navigation';

const navigation = [
  { name: '私たちについて', href: '#about', id: 'about' },
  { name: 'プロダクト', href: '#products', id: 'products' },
  { name: 'チーム', href: '#team', id: 'team' },
  { name: 'お問い合わせ', href: '#contact', id: 'contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(nav => nav.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-label="Toggle menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when pressing Escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const id = href.startsWith('#') ? href.substring(1) : href;
    const onHome = pathname === '/';
    if (onHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        router.push('/#' + id);
      }
    } else {
      router.push('/#' + id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-transparent"
    >
      <nav className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-12 h-12 lg:w-16 lg:h-16">
              <Image
                src="/images/logos/tomorebeyond-logo.png"
                alt="ToMoreBeyond"
                width={512}
                height={512}
                className="w-full h-full object-contain"
                sizes="(max-width: 1024px) 48px, 64px"
                priority
                quality={95}
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={clsx('relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105',
                  activeSection === item.id ? 'text-primary-700' : 'text-neutral-700 hover:text-primary-700')}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className={clsx('absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary-600')}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              className={clsx('p-2 rounded-lg transition-colors text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100')}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-neutral-200/60"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={clsx('block w-full text-left px-3 py-2 text-base font-medium rounded-lg transition-colors',
                      activeSection === item.id ? 'text-primary-700 bg-primary-50' : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50')}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
