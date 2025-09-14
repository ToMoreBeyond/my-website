import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootClient from "./RootClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToMoreBeyond（トモビ）｜革新的モバイルアプリ開発企業｜忠嵩・TOI-RUN・Meet in the middle",
  description: "ToMoreBeyond（トモビ・TMB）は、忠嵩（TADATAKA）、TOI-RUN、Meet in the middleなど革新的なモバイルアプリを開発する東京のテクノロジー企業です。最先端技術で社会課題を解決し、人々の生活を豊かにするアプリケーションを提供しています。",
  keywords: [
    "ToMoreBeyond", "トモビ", "TMB", "株式会社トモビ", "忠嵩", "TADATAKA", "TOI-RUN", "Meet in the middle",
    "モバイルアプリ開発", "アプリ開発会社", "スマートフォンアプリ", "iOS開発", "Android開発", "東京", "テクノロジー企業",
    "ソフトウェア開発", "地図アプリ", "ランニングアプリ", "フィットネスアプリ", "出会いアプリ", "ゲーミフィケーション",
    "React Native", "Flutter", "Swift", "Kotlin", "TypeScript", "モバイルUI/UX", "アプリ制作", "カスタムアプリ開発"
  ],
  authors: [{ name: "ToMoreBeyond Inc." }],
  creator: "ToMoreBeyond Inc.",
  publisher: "ToMoreBeyond Inc.",
  metadataBase: new URL('https://tomorebeyond.co'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ToMoreBeyond｜革新的モバイルアプリ開発企業｜東京",
    description: "ToMoreBeyondは、忠嵩・TOI-RUN・Meet in the middleなど革新的なモバイルアプリを開発。最先端技術で社会課題を解決するテクノロジー企業です。",
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
    title: "ToMoreBeyond｜革新的モバイルアプリ開発｜東京",
    description: "忠嵩・TOI-RUN・Meet in the middle - 最先端技術で社会課題を解決するアプリケーション開発",
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
              "description": "ToMoreBeyond（トモビ・TMB）は、忠嵩（TADATAKA）、TOI-RUN、Meet in the middleなど革新的なモバイルアプリを開発する東京のテクノロジー企業。最先端技術で社会課題を解決し、人々の生活を豊かにするアプリケーションを提供しています。",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Tokyo",
                "addressCountry": "JP"
              },
              "foundingDate": "2019",
              "industry": "Software Development",
              "keywords": "モバイルアプリ開発, iOS開発, Android開発, スマートフォンアプリ, React Native, Flutter, ゲーミフィケーション, 地図アプリ, ランニングアプリ, フィットネスアプリ, 東京, アプリ開発会社",
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
        <RootClient>
          {children}
        </RootClient>
      </body>
    </html>
  );
}
