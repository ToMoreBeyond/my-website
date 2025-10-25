import { describe, it, expect } from 'vitest';
import {
  defaultSEO,
  generateMetadata,
  generateStructuredData,
  generateOrganizationStructuredData,
  generateWebSiteStructuredData,
  generateSoftwareApplicationStructuredData,
  type SEOConfig,
} from '@/lib/seo';

describe('SEO Utilities', () => {
  describe('defaultSEO', () => {
    it('デフォルト設定が正しく定義されている', () => {
      expect(defaultSEO.type).toBe('website');
      expect(defaultSEO.image).toBe('/images/logos/tomorebeyond-logo.png');
      expect(defaultSEO.keywords).toBeInstanceOf(Array);
      expect(defaultSEO.keywords?.length).toBeGreaterThan(0);
    });

    it('デフォルトキーワードに主要な用語が含まれている', () => {
      expect(defaultSEO.keywords).toContain('ToMoreBeyond');
      expect(defaultSEO.keywords).toContain('TADATAKA');
      expect(defaultSEO.keywords).toContain('TOI-RUN');
    });
  });

  describe('generateMetadata', () => {
    it('基本的なメタデータを正しく生成する', () => {
      const config: SEOConfig = {
        title: 'テストタイトル',
        description: 'テスト説明文',
        url: 'https://example.com/test',
      };

      const metadata = generateMetadata(config);

      expect(metadata.title).toBe('テストタイトル');
      expect(metadata.description).toBe('テスト説明文');
      expect(metadata.alternates?.canonical).toBe('https://example.com/test');
    });

    it('OpenGraphメタデータを正しく生成する', () => {
      const config: SEOConfig = {
        title: 'OGテスト',
        description: 'OG説明',
        url: 'https://example.com/og',
        image: '/test-image.png',
      };

      const metadata = generateMetadata(config);

      expect(metadata.openGraph?.title).toBe('OGテスト');
      expect(metadata.openGraph?.description).toBe('OG説明');
      expect(metadata.openGraph?.url).toBe('https://example.com/og');
      expect(metadata.openGraph?.type).toBe('website');
      expect(metadata.openGraph?.siteName).toBe('ToMoreBeyond（トモビ）');
      expect(metadata.openGraph?.locale).toBe('ja_JP');
      expect(metadata.openGraph?.images).toBeDefined();
      expect(metadata.openGraph?.images).toHaveLength(1);
    });

    it('Twitter Cardメタデータを正しく生成する', () => {
      const config: SEOConfig = {
        title: 'Twitterテスト',
        description: 'Twitter説明',
        url: 'https://example.com/twitter',
        image: '/twitter-image.png',
      };

      const metadata = generateMetadata(config);

      expect(metadata.twitter?.card).toBe('summary_large_image');
      expect(metadata.twitter?.title).toBe('Twitterテスト');
      expect(metadata.twitter?.description).toBe('Twitter説明');
      expect(metadata.twitter?.images).toEqual(['/twitter-image.png']);
    });

    it('デフォルト値を正しく適用する', () => {
      const config: SEOConfig = {
        title: 'デフォルトテスト',
        description: 'デフォルト説明',
        url: 'https://example.com/default',
      };

      const metadata = generateMetadata(config);

      expect(metadata.keywords).toEqual(defaultSEO.keywords);
      expect(metadata.openGraph?.type).toBe('website');
      expect(metadata.openGraph?.images?.[0]).toMatchObject({
        url: defaultSEO.image,
        width: 1200,
        height: 630,
      });
    });

    it('カスタムキーワードを正しく設定する', () => {
      const customKeywords = ['キーワード1', 'キーワード2', 'キーワード3'];
      const config: SEOConfig = {
        title: 'キーワードテスト',
        description: 'キーワード説明',
        url: 'https://example.com/keywords',
        keywords: customKeywords,
      };

      const metadata = generateMetadata(config);

      expect(metadata.keywords).toEqual(customKeywords);
    });

    it('著者情報を正しく設定する', () => {
      const authors = ['著者1', '著者2'];
      const config: SEOConfig = {
        title: '著者テスト',
        description: '著者説明',
        url: 'https://example.com/authors',
        authors,
      };

      const metadata = generateMetadata(config);

      expect(metadata.authors).toBeDefined();
      expect(metadata.authors).toHaveLength(2);
      expect(metadata.authors?.[0]).toEqual({ name: '著者1' });
      expect(metadata.authors?.[1]).toEqual({ name: '著者2' });
    });

    it('画像が空文字列の場合、OpenGraphとTwitterの画像がundefinedになる', () => {
      const config: SEOConfig = {
        title: '画像なしテスト',
        description: '画像なし説明',
        url: 'https://example.com/no-image',
        image: '',
      };

      const metadata = generateMetadata(config);

      expect(metadata.openGraph?.images).toBeUndefined();
      expect(metadata.twitter?.images).toBeUndefined();
    });

    it('記事タイプのメタデータを生成する', () => {
      const config: SEOConfig = {
        title: '記事タイトル',
        description: '記事説明',
        url: 'https://example.com/article',
        type: 'article',
        publishedTime: '2025-01-01T00:00:00Z',
        modifiedTime: '2025-01-15T00:00:00Z',
        authors: ['著者名'],
      };

      const metadata = generateMetadata(config);

      expect(metadata.openGraph?.type).toBe('article');
    });
  });

  describe('generateStructuredData', () => {
    it('基本的な構造化データを生成する', () => {
      const data = generateStructuredData('Organization', {
        name: 'テスト組織',
        url: 'https://example.com',
      });

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('Organization');
      expect(data['name']).toBe('テスト組織');
      expect(data['url']).toBe('https://example.com');
    });

    it('WebSiteタイプの構造化データを生成する', () => {
      const data = generateStructuredData('WebSite', {
        name: 'テストサイト',
        url: 'https://example.com',
      });

      expect(data['@type']).toBe('WebSite');
      expect(data['name']).toBe('テストサイト');
    });

    it('SoftwareApplicationタイプの構造化データを生成する', () => {
      const data = generateStructuredData('SoftwareApplication', {
        name: 'テストアプリ',
        applicationCategory: 'Game',
      });

      expect(data['@type']).toBe('SoftwareApplication');
      expect(data['name']).toBe('テストアプリ');
      expect(data['applicationCategory']).toBe('Game');
    });

    it('Personタイプの構造化データを生成する', () => {
      const data = generateStructuredData('Person', {
        name: 'テスト太郎',
        jobTitle: 'エンジニア',
      });

      expect(data['@type']).toBe('Person');
      expect(data['name']).toBe('テスト太郎');
      expect(data['jobTitle']).toBe('エンジニア');
    });
  });

  describe('generateOrganizationStructuredData', () => {
    it('Organization構造化データを正しく生成する', () => {
      const data = generateOrganizationStructuredData();

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('Organization');
      expect(data['name']).toBe('ToMoreBeyond');
      expect(data['url']).toBe('https://tomorebeyond.co');
      expect(data['logo']).toBe('https://tomorebeyond.co/images/logos/tomorebeyond-logo.png');
    });

    it('組織の別名が正しく設定されている', () => {
      const data = generateOrganizationStructuredData();

      expect(data['alternateName']).toEqual(['トモビ', 'TMB']);
    });

    it('組織の説明が含まれている', () => {
      const data = generateOrganizationStructuredData();

      expect(data['description']).toContain('ToMoreBeyond');
      expect(data['description']).toContain('TADATAKA');
      expect(data['description']).toContain('TOI-RUN');
    });

    it('住所情報が正しく構造化されている', () => {
      const data = generateOrganizationStructuredData();
      const address = data['address'] as Record<string, string>;

      expect(address['@type']).toBe('PostalAddress');
      expect(address['addressLocality']).toBe('Tokyo');
      expect(address['addressCountry']).toBe('JP');
    });

    it('製品情報が含まれている', () => {
      const data = generateOrganizationStructuredData();
      const products = data['hasProduct'] as Array<Record<string, unknown>>;

      expect(products).toBeInstanceOf(Array);
      expect(products.length).toBeGreaterThan(0);
      expect(products.some((p) => p['name'] === '忠嵩')).toBe(true);
      expect(products.some((p) => p['name'] === 'TOI-RUN')).toBe(true);
      expect(products.some((p) => p['name'] === 'Meet in the middle')).toBe(true);
    });

    it('サービス提供情報が含まれている', () => {
      const data = generateOrganizationStructuredData();
      const offers = data['makesOffer'] as Array<Record<string, unknown>>;

      expect(offers).toBeInstanceOf(Array);
      expect(offers.length).toBeGreaterThan(0);
      expect(offers[0]['@type']).toBe('Offer');
    });
  });

  describe('generateWebSiteStructuredData', () => {
    it('WebSite構造化データを正しく生成する', () => {
      const data = generateWebSiteStructuredData();

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('WebSite');
      expect(data['name']).toBe('ToMoreBeyond（トモビ）');
      expect(data['url']).toBe('https://tomorebeyond.co/');
    });

    it('別名が正しく設定されている', () => {
      const data = generateWebSiteStructuredData();

      expect(data['alternateName']).toEqual(['トモビ', 'TMB', 'ToMoreBeyond']);
    });

    it('検索アクションが含まれている', () => {
      const data = generateWebSiteStructuredData();
      const action = data['potentialAction'] as Record<string, unknown>;

      expect(action['@type']).toBe('SearchAction');
      expect(action['query-input']).toBe('required name=search_term_string');
    });
  });

  describe('generateSoftwareApplicationStructuredData', () => {
    it('SoftwareApplication構造化データを正しく生成する', () => {
      const data = generateSoftwareApplicationStructuredData(
        'テストアプリ',
        'TestApp',
        'HealthApplication',
        'テスト用のアプリケーション'
      );

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('SoftwareApplication');
      expect(data['name']).toBe('テストアプリ');
      expect(data['alternateName']).toBe('TestApp');
      expect(data['applicationCategory']).toBe('HealthApplication');
      expect(data['description']).toBe('テスト用のアプリケーション');
    });

    it('異なるカテゴリのアプリケーションを生成できる', () => {
      const categories = ['NavigationApplication', 'HealthApplication', 'SocialApplication'];

      categories.forEach((category) => {
        const data = generateSoftwareApplicationStructuredData(
          'アプリ',
          'App',
          category,
          '説明'
        );

        expect(data['applicationCategory']).toBe(category);
      });
    });
  });
});
