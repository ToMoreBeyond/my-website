'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const navigation = [
  { name: 'Products', href: '#products', id: 'products' },
  { name: 'Team', href: '#team', id: 'team' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.startsWith('#') ? href.substring(1) : href;
    if (pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        router.push('/#' + id);
      }
    } else {
      router.push('/#' + id);
    }
    setOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-300',
        isScrolled
          ? 'glass border-x-0 border-t-0 border-b'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8 lg:h-[72px]"
        aria-label="グローバルナビゲーション"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex size-11 items-center justify-center rounded-lg"
          aria-label="ToMoreBeyond ホーム"
        >
          <Image
            src="/images/logos/tomorebeyond-logo.png"
            alt="ToMoreBeyond"
            width={44}
            height={44}
            className="size-9 lg:size-10"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="lg"
              className="px-3 text-muted-foreground hover:text-foreground"
              onClick={() => scrollToSection(item.href)}
            >
              {item.name}
            </Button>
          ))}
          <Button
            size="lg"
            className="ml-3 px-4 hover:glow-ring"
            onClick={() => scrollToSection('#contact')}
          >
            お問い合わせ
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="size-11"
                aria-label="メニューを開く"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[82vw] max-w-xs">
              <SheetTitle className="px-5 pt-5 font-display text-base tracking-wide">
                Menu
              </SheetTitle>
              <div className="flex flex-col gap-1 px-3 py-2">
                {navigation.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="h-12 justify-start px-3 text-base text-muted-foreground hover:text-foreground"
                      onClick={() => scrollToSection(item.href)}
                    >
                      {item.name}
                    </Button>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    size="lg"
                    className="mt-3 h-12 text-base"
                    onClick={() => scrollToSection('#contact')}
                  >
                    お問い合わせ
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
