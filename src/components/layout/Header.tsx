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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
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
        'fixed top-0 z-50 w-full transition-colors duration-300',
        isScrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="ToMoreBeyond ホーム">
          <Image
            src="/images/logos/tomorebeyond-logo.png"
            alt="ToMoreBeyond"
            width={44}
            height={44}
            className="size-10 lg:size-11"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => scrollToSection(item.href)}
            >
              {item.name}
            </Button>
          ))}
          <Button
            size="sm"
            className="ml-2"
            onClick={() => scrollToSection('#contact')}
          >
            お問い合わせ
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="メニューを開く">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="px-5 pt-5 text-base">Menu</SheetTitle>
              <div className="flex flex-col gap-1 px-3 py-2">
                {navigation.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Button
                      variant="ghost"
                      className="h-11 justify-start text-base text-muted-foreground hover:text-foreground"
                      onClick={() => scrollToSection(item.href)}
                    >
                      {item.name}
                    </Button>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    className="mt-3 h-11 text-base"
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
