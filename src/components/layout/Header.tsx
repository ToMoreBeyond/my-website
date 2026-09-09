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

/**
 * 紙の上に浮かぶ丸いバー。スクロールすると影が少し濃くなる。
 * スマホでは Sheet のメニューに畳む。
 */
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <nav
        className={cn(
          'mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full bg-card/85 pr-1.5 pl-1.5 ring-1 ring-border backdrop-blur-md transition-shadow duration-300 md:h-16 md:pr-2 md:pl-2',
          isScrolled ? 'shadow-warm' : 'shadow-none'
        )}
        aria-label="グローバルナビゲーション"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex size-11 items-center justify-center rounded-full md:size-12"
          aria-label="ToMoreBeyond ホーム"
        >
          <Image
            src="/images/logos/tomorebeyond-logo.png"
            alt="ToMoreBeyond"
            width={44}
            height={44}
            className="size-9 rounded-[24%] md:size-10"
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
              className="h-10 rounded-full px-4 font-display text-[0.95rem]"
              onClick={() => scrollToSection(item.href)}
            >
              {item.name}
            </Button>
          ))}
          <Button
            size="lg"
            className="ml-2 h-10 rounded-full px-5 text-[0.95rem]"
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
                className="size-11 rounded-full"
                aria-label="メニューを開く"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[82vw] max-w-xs bg-background">
              <SheetTitle className="px-5 pt-5 font-display text-base font-semibold">
                Menu
              </SheetTitle>
              <div className="flex flex-col gap-1 px-3 py-2">
                {navigation.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="h-12 justify-start rounded-xl px-3 font-display text-base"
                      onClick={() => scrollToSection(item.href)}
                    >
                      {item.name}
                    </Button>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    size="lg"
                    className="mt-3 h-12 rounded-full text-base"
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
