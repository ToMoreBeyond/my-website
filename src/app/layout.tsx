import type { Metadata, Viewport } from "next";
import { M_PLUS_Rounded_1c, Zen_Maru_Gothic, Noto_Sans_JP, Geist } from 'next/font/google';
import "./globals.css";
import RootClient from "./RootClient";
import {
  generateMetadata,
  generateOrganizationStructuredData,
  generateWebSiteStructuredData,
} from "@/lib/seo";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// Optimized font loading with next/font
const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ['300', '400', '500', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-m-plus-rounded',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zen-maru',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
    <html lang="ja" className={cn(mPlusRounded.variable, zenMaruGothic.variable, notoSansJP.variable, "font-sans", geist.variable)}>
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

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
      <body className={`${mPlusRounded.className} antialiased`}>
        <RootClient>
          {children}
        </RootClient>
      </body>
    </html>
  );
}
