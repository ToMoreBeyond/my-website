import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約 | ToMoreBeyond株式会社',
  description: 'ToMoreBeyond株式会社が提供するサービスの利用規約です。',
  openGraph: {
    title: '利用規約 | ToMoreBeyond株式会社',
    description: 'ToMoreBeyond株式会社が提供するサービスの利用規約です。',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
