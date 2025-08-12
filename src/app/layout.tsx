import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToMoreBeyond (トモビ・TMB) | 忠嵩・TOI-RUN・Meet in the middle | モバイルアプリ開発",
  description: "ToMoreBeyond（トモビ・TMB）は忠嵩（TADATAKA）、TOI-RUN、Meet in the middleなど革新的なモバイルアプリを開発する東京のテクノロジー企業です。技術と情熱で、より遠くへ。",
  keywords: [
    "ToMoreBeyond", "トモビ", "TMB", "忠嵩", "TADATAKA", "TOI-RUN", "Meet in the middle",
    "モバイルアプリ開発", "アプリ開発", "スマートフォンアプリ", "東京", "テクノロジー企業",
    "ソフトウェア開発", "地図アプリ", "ランニングアプリ", "出会いアプリ", "ゲーミフィケーション"
  ],
  authors: [{ name: "ToMoreBeyond Inc." }],
  creator: "ToMoreBeyond Inc.",
  publisher: "ToMoreBeyond Inc.",
  metadataBase: new URL('https://tomorebeyond.co'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ToMoreBeyond (トモビ・TMB) | 革新的モバイルアプリ開発",
    description: "忠嵩・TOI-RUN・Meet in the middleを開発するモバイルアプリ企業",
    url: 'https://tomorebeyond.co',
    siteName: 'ToMoreBeyond',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/images/logos/tomorebeyond-logo.png',
        width: 500,
        height: 200,
        alt: 'ToMoreBeyond Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "ToMoreBeyond (トモビ・TMB) | モバイルアプリ開発",
    description: "忠嵩・TOI-RUN・Meet in the middleを開発",
    images: ['/images/logos/tomorebeyond-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ToMoreBeyond",
              "alternateName": ["トモビ", "TMB"],
              "url": "https://tomorebeyond.co",
              "logo": "https://tomorebeyond.co/images/logos/tomorebeyond-logo.png",
              "description": "ToMoreBeyond（トモビ・TMB）は忠嵩（TADATAKA）、TOI-RUN、Meet in the middleなど革新的なモバイルアプリを開発する東京のテクノロジー企業です。",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tokyo",
                "addressCountry": "JP"
              },
              "foundingDate": "2019",
              "industry": "Software Development",
              "keywords": "モバイルアプリ開発, スマートフォンアプリ, ゲーミフィケーション, 地図アプリ, ランニングアプリ",
              "sameAs": [],
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "モバイルアプリケーション開発",
                    "description": "革新的なスマートフォンアプリケーションの企画・開発・運用"
                  }
                }
              ],
              "hasProduct": [
                {
                  "@type": "SoftwareApplication",
                  "name": "忠嵩",
                  "alternateName": "TADATAKA",
                  "applicationCategory": "NavigationApplication",
                  "description": "歴史と現代を繋ぐ、革新的な地図アプリケーション"
                },
                {
                  "@type": "SoftwareApplication", 
                  "name": "TOI-RUN",
                  "applicationCategory": "HealthApplication",
                  "description": "ランニングを楽しく継続するためのゲーミフィケーション・プラットフォーム"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "Meet in the middle",
                  "applicationCategory": "SocialApplication", 
                  "description": "人と人を繋ぐ、新しい出会いのプラットフォーム"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
