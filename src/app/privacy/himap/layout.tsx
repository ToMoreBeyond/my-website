import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー（ヒマップ / Himap） | ToMoreBeyond',
  description:
    'iOSアプリ「ヒマップ（Himap）」のプライバシーポリシーです。位置情報・利用データの取り扱いについて説明します。',
  openGraph: {
    title: 'プライバシーポリシー（ヒマップ / Himap） | ToMoreBeyond',
    description:
      'iOSアプリ「ヒマップ（Himap）」のプライバシーポリシーです。位置情報・利用データの取り扱いについて説明します。',
  },
  alternates: {
    canonical: '/privacy/himap',
  },
};

export default function HimapPrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
