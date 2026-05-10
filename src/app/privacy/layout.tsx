import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | ToMoreBeyond',
  description: 'ToMoreBeyondのプライバシーポリシーです。個人情報の取り扱いについてご説明します。',
  openGraph: {
    title: 'プライバシーポリシー | ToMoreBeyond',
    description: 'ToMoreBeyondのプライバシーポリシーです。個人情報の取り扱いについてご説明します。',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
