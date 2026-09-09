"use client";

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * スキップリンクコンポーネント
 * キーボードユーザーがメインコンテンツに直接ジャンプできるようにする
 * WAI-ARIA: https://www.w3.org/WAI/WCAG21/Techniques/general/G1
 */
export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-warm"
    >
      {children}
    </a>
  );
}
