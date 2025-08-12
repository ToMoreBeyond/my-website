'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { DragElement } from '@/components/common/DragElement';

const navigation = [
  { name: 'Company', href: '#company', id: 'company' },
  { name: 'Products', href: '#products', id: 'products' },
  { name: 'Team', href: '#team', id: 'team' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionInView = () => {
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
    window.addEventListener('scroll', handleSectionInView);
    
    handleScroll();
    handleSectionInView();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionInView);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/20 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <DragElement
            dragConstraints={{
              top: -50,
              left: -100,
              right: 100,
              bottom: 50,
            }}
            resetOnRelease={true}
            elastic={true}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <Image
                  src="/images/logos/tomorebeyond-logo.png"
                  alt="ToMoreBeyond"
                  fill
                  className="object-contain"
                />
              </div>
              <span className={clsx(
                'font-bold text-xl lg:text-2xl transition-colors',
                isScrolled ? 'text-gray-900' : 'text-white'
              )}>
                ToMoreBeyond
              </span>
            </Link>
          </DragElement>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={clsx(
                  'relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105',
                  activeSection === item.id
                    ? isScrolled
                      ? 'text-primary-600'
                      : 'text-white'
                    : isScrolled
                      ? 'text-gray-600 hover:text-primary-600'
                      : 'text-white/80 hover:text-white'
                )}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className={clsx(
                      'absolute bottom-0 left-0 right-0 h-0.5 rounded-full',
                      isScrolled ? 'bg-primary-600' : 'bg-white'
                    )}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={clsx(
                'p-2 rounded-lg transition-colors',
                isScrolled
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              )}
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-200/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={clsx(
                      'block w-full text-left px-3 py-2 text-base font-medium rounded-lg transition-colors',
                      activeSection === item.id
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    )}
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