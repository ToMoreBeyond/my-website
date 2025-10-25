import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | ToMoreBeyond株式会社',
  description: 'ToMoreBeyond株式会社のプライバシーポリシーです。個人情報の取り扱いについてご説明します。',
  openGraph: {
    title: 'プライバシーポリシー | ToMoreBeyond株式会社',
    description: 'ToMoreBeyond株式会社のプライバシーポリシーです。個人情報の取り扱いについてご説明します。',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
