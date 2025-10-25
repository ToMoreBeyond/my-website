import { Metadata } from "next";

/**
 * SEO設定インターフェース
 */
export interface SEOConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/**
 * デフォルトSEO設定
 */
export const defaultSEO: Omit<SEOConfig, "title" | "description" | "url"> = {
  type: "website",
  image: "/images/logos/tomorebeyond-logo.png",
  keywords: [
    "ToMoreBeyond",
    "トモビ",
    "TMB",
    "忠嵩",
    "TADATAKA",
    "TOI-RUN",
    "Meet in the middle",
    "モバイルアプリ開発",
    "アプリ開発会社",
    "東京",
    "テクノロジー企業",
  ],
};

/**
 * メタデータを生成
 * 各ページで再利用可能な動的メタデータ生成関数
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    url,
    image = defaultSEO.image,
    type = defaultSEO.type,
    keywords = defaultSEO.keywords,
    publishedTime,
    modifiedTime,
    authors,
  } = config;

  const metadata: Metadata = {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: "ToMoreBeyond（トモビ）",
      locale: "ja_JP",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };

  // 記事タイプの場合は公開日時・更新日時を追加
  if (type === "article" && metadata.openGraph) {
    metadata.openGraph.publishedTime = publishedTime;
    metadata.openGraph.modifiedTime = modifiedTime;
    metadata.openGraph.authors = authors;
  }

  // 著者情報を追加
  if (authors && authors.length > 0) {
    metadata.authors = authors.map((name) => ({ name }));
  }

  return metadata;
}

/**
 * 構造化データを生成
 * JSON-LD形式で検索エンジン向けの構造化データを生成
 */
export function generateStructuredData(
  type: "Organization" | "WebSite" | "SoftwareApplication" | "Person",
  data: Record<string, unknown>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
}

/**
 * Organization（組織）の構造化データを生成
 */
export function generateOrganizationStructuredData(): Record<string, unknown> {
  return generateStructuredData("Organization", {
    name: "ToMoreBeyond",
    alternateName: ["トモビ", "TMB"],
    url: "https://tomorebeyond.co",
    logo: "https://tomorebeyond.co/images/logos/tomorebeyond-logo.png",
    description:
      "ToMoreBeyond（トモビ・TMB）は、忠嵩（TADATAKA）、TOI-RUN、Meet in the middleなど革新的なモバイルアプリを開発する東京のテクノロジー企業。最先端技術で社会課題を解決し、人々の生活を豊かにするアプリケーションを提供しています。",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tokyo",
      addressCountry: "JP",
    },
    foundingDate: "2019",
    industry: "Software Development",
    keywords:
      "モバイルアプリ開発, iOS開発, Android開発, スマートフォンアプリ, React Native, Flutter, ゲーミフィケーション, 地図アプリ, ランニングアプリ, フィットネスアプリ, 東京, アプリ開発会社",
    sameAs: [],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "モバイルアプリケーション開発",
          description: "革新的なスマートフォンアプリケーションの企画・開発・運用",
        },
      },
    ],
    hasProduct: [
      generateSoftwareApplicationStructuredData(
        "忠嵩",
        "TADATAKA",
        "NavigationApplication",
        "歴史と現代を繋ぐ、革新的な地図アプリケーション"
      ),
      generateSoftwareApplicationStructuredData(
        "TOI-RUN",
        "TOI-RUN",
        "HealthApplication",
        "ランニングを楽しく継続するためのゲーミフィケーション・プラットフォーム"
      ),
      generateSoftwareApplicationStructuredData(
        "Meet in the middle",
        "Meet in the middle",
        "SocialApplication",
        "人と人を繋ぐ、新しい出会いのプラットフォーム"
      ),
    ],
  });
}

/**
 * WebSite（ウェブサイト）の構造化データを生成
 */
export function generateWebSiteStructuredData(): Record<string, unknown> {
  return generateStructuredData("WebSite", {
    name: "ToMoreBeyond（トモビ）",
    alternateName: ["トモビ", "TMB", "ToMoreBeyond"],
    url: "https://tomorebeyond.co/",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.google.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  });
}

/**
 * SoftwareApplication（ソフトウェア）の構造化データを生成
 */
export function generateSoftwareApplicationStructuredData(
  name: string,
  alternateName: string,
  category: string,
  description: string
): Record<string, unknown> {
  return generateStructuredData("SoftwareApplication", {
    name,
    alternateName,
    applicationCategory: category,
    description,
  });
}
