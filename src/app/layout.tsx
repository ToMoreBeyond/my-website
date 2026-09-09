import type { Metadata, Viewport } from "next";
import { Syne, Zen_Kaku_Gothic_New } from 'next/font/google';
import "./globals.css";
import RootClient from "./RootClient";
import {
  generateMetadata,
  generateOrganizationStructuredData,
  generateWebSiteStructuredData,
} from "@/lib/seo";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

// Display（英字の見出し）: 横に広く、癖のある Syne
const syne = Syne({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// 本文・日本語: 読みやすく少し幾何学的な Zen Kaku Gothic New
const zenKaku = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zen-kaku',
  preload: true,
  fallback: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'system-ui', 'sans-serif'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0b0f16',
};

export const metadata: Metadata = {
  ...generateMetadata({
    title: "ToMoreBeyond（トモビ）｜革新的モバイルアプリ開発企業｜ヒマップ・キーペット・TOI-RUN",
    description:
      "ToMoreBeyond（トモビ・TMB）は、ヒマップ（Himap）、キーペット（KeyPet）、TOI-RUNなど革新的なモバイルアプリを開発する東京のテクノロジー企業です。最先端技術で社会課題を解決し、人々の生活を豊かにするアプリケーションを提供しています。",
    url: env.NEXT_PUBLIC_SITE_URL,
    keywords: [
      "ToMoreBeyond",
      "トモビ",
      "TMB",
      "株式会社トモビ",
      "ヒマップ",
      "Himap",
      "キーペット",
      "KeyPet",
      "TOI-RUN",
      "モバイルアプリ開発",
      "アプリ開発会社",
      "スマートフォンアプリ",
      "iOS開発",
      "東京",
      "テクノロジー企業",
      "ソフトウェア開発",
      "位置情報アプリ",
      "ゲーミフィケーション",
      "カスタムキーボード",
      "Swift",
      "SwiftUI",
      "TypeScript",
      "モバイルUI/UX",
      "アプリ制作",
      "カスタムアプリ開発",
    ],
  }),
  title: {
    default: "ToMoreBeyond（トモビ）｜革新的モバイルアプリ開発企業｜ヒマップ・キーペット・TOI-RUN",
    template: "%s｜ToMoreBeyond（トモビ）",
  },
  applicationName: "ToMoreBeyond（トモビ）",
  authors: [{ name: "ToMoreBeyond Inc." }],
  creator: "ToMoreBeyond Inc.",
  publisher: "ToMoreBeyond Inc.",
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      ja: env.NEXT_PUBLIC_SITE_URL,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logos/tomorebeyond-logo.png", type: "image/png" },
    ],
    apple: [{ url: "/images/logos/tomorebeyond-logo.png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={cn(syne.variable, zenKaku.variable, "dark font-sans")}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/images/logos/tomorebeyond-logo.png"
          as="image"
          type="image/png"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationStructuredData())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteStructuredData())
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <RootClient>
          {children}
        </RootClient>
      </body>
    </html>
  );
}
