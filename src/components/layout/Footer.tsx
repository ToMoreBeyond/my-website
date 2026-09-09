'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  products: [
    { label: 'ヒマップ (Himap)', href: '/products/himap' },
    { label: 'キーペット (KeyPet)', href: '/products/keypet' },
    { label: 'TOI-RUN', href: '/products/toirun' },
  ],
  legal: [
    { label: 'プライバシーポリシー', href: '/privacy' },
    { label: 'プライバシーポリシー（ヒマップ）', href: '/privacy/himap' },
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
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <footer className="relative border-t border-border bg-background">
      {/* 上辺に 1 本だけ光る線 */}
      <div aria-hidden className="beam absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 lg:py-20">
        <div className="mb-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:gap-12">
          {/* Logo & Tagline */}
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={scrollToTop}
              className="size-12 rounded-xl"
              aria-label="トップへ戻る"
            >
              <Image
                src="/images/logos/tomorebeyond-logo.png"
                alt="ToMoreBeyond"
                width={48}
                height={48}
                className="size-10"
              />
            </Button>
            <p className="text-sm leading-relaxed text-muted-foreground">
              埋もれた記録を、続く面白さへ。
            </p>
            <p className="font-display text-xs tracking-wide text-muted-foreground/80">Tokyo, Japan</p>
          </div>

          {/* Navigate */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-semibold tracking-wide text-muted-foreground">
              Navigate
            </h4>
            <ul className="flex flex-col gap-2">
              {['products', 'team', 'contact'].map((item) => (
                <li key={item}>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => scrollToSection(item)}
                    className="h-9 px-0 text-sm capitalize text-muted-foreground hover:text-foreground"
                  >
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-semibold tracking-wide text-muted-foreground">
              Products
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Button
                    asChild
                    variant="link"
                    size="sm"
                    className="h-9 px-0 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-semibold tracking-wide text-muted-foreground">
              Legal
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Button
                    asChild
                    variant="link"
                    size="sm"
                    className="h-auto min-h-9 justify-start px-0 py-1 text-left text-sm whitespace-normal text-muted-foreground hover:text-foreground"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ToMoreBeyond Inc.
          </p>
          <Button
            asChild
            variant="link"
            size="sm"
            className="h-9 px-0 text-sm text-muted-foreground hover:text-foreground"
          >
            <a href="https://x.com/ToMoreBeyond" target="_blank" rel="noopener noreferrer">
              X (Twitter)
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
