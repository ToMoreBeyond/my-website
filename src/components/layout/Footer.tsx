'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
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
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 lg:py-20">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Logo & Tagline */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={scrollToTop}
              className="mb-6 outline-none focus-visible:opacity-80"
              aria-label="トップへ戻る"
            >
              <Image
                src="/images/logos/tomorebeyond-logo.png"
                alt="ToMoreBeyond"
                width={48}
                height={48}
                className="size-12 opacity-90 invert"
              />
            </button>
            <p className="text-sm leading-relaxed text-background/70">
              埋もれた記録を、続く面白さへ。
            </p>
            <p className="mt-3 text-xs text-background/50">Tokyo, Japan</p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-background/50">
              Navigate
            </h4>
            <ul className="flex flex-col gap-3">
              {['products', 'team', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="text-sm capitalize text-background/70 transition-colors hover:text-background"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-background/50">
              Products
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-background/50">
              Legal
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-background/15" />

        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} ToMoreBeyond Inc.
          </p>
          <a
            href="https://x.com/ToMoreBeyond"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-background/70 transition-colors hover:text-background"
          >
            X (Twitter)
          </a>
        </div>
      </div>
    </footer>
  );
}
