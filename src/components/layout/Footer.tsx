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

/**
 * 暗い区画。インクの地にクリームの文字（ロゴの黒いタイルと同じ世界）。
 */
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

  const linkClass =
    'h-auto min-h-10 justify-start px-0 py-1.5 text-left text-sm whitespace-normal text-primary-foreground/80 hover:text-primary-foreground';

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 lg:py-24">
        <div className="mb-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:gap-12">
          {/* Logo & Tagline */}
          <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={scrollToTop}
              className="size-12 rounded-2xl hover:bg-primary-foreground/10"
              aria-label="トップへ戻る"
            >
              <Image
                src="/images/logos/tomorebeyond-logo.png"
                alt="ToMoreBeyond"
                width={48}
                height={48}
                className="size-12 rounded-[24%]"
              />
            </Button>
            <p className="font-mincho text-base leading-relaxed text-primary-foreground/85">
              埋もれた記録を、続く面白さへ。
            </p>
            <p className="font-display text-xs tracking-wide text-primary-foreground/60">Tokyo, Japan</p>
          </div>

          {/* Navigate */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-semibold text-primary-foreground/60">
              Navigate
            </h4>
            <ul className="flex flex-col gap-1">
              {['products', 'team', 'contact'].map((item) => (
                <li key={item}>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => scrollToSection(item)}
                    className={`${linkClass} capitalize`}
                  >
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-semibold text-primary-foreground/60">
              Products
            </h4>
            <ul className="flex flex-col gap-1">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Button asChild variant="link" size="sm" className={linkClass}>
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-semibold text-primary-foreground/60">
              Legal
            </h4>
            <ul className="flex flex-col gap-1">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Button asChild variant="link" size="sm" className={linkClass}>
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-primary-foreground/15" />

        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} ToMoreBeyond Inc.
          </p>
          <Button asChild variant="link" size="sm" className={linkClass}>
            <a href="https://x.com/ToMoreBeyond" target="_blank" rel="noopener noreferrer">
              X (Twitter)
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
