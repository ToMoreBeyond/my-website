import { describe, it, expect } from 'vitest';
import { getProducts, getTeamMembers, getRoadmaps } from '@/lib/data';
import { products } from '@/data/products';
import { teamMembers } from '@/data/team';
import { roadmaps } from '@/data/roadmaps';

describe('Data Flow Integration Tests', () => {
  describe('プロダクトデータフロー', () => {
    it('データアダプターから正しいプロダクトデータを取得できる', async () => {
      const fetchedProducts = await getProducts();

      expect(fetchedProducts).toEqual(products);
      expect(fetchedProducts.length).toBe(3);
    });

    it('取得したプロダクトデータが表示に必要な情報を持っている', async () => {
      const fetchedProducts = await getProducts();

      fetchedProducts.forEach((product) => {
        // 基本情報
        expect(product.id).toBeDefined();
        expect(product.name).toBeDefined();
        expect(product.nameEn).toBeDefined();
        expect(product.tagline).toBeDefined();
        expect(product.description).toBeDefined();

        // ステータス
        expect(product.status).toMatch(/in-development|beta|released/);

        // 技術情報
        expect(Array.isArray(product.technologies)).toBe(true);
        expect(product.technologies.length).toBeGreaterThan(0);

        // ターゲットユーザー
        expect(Array.isArray(product.targetUsers)).toBe(true);

        // 日付情報
        expect(product.createdDate).toBeDefined();
      });
    });

    it('各プロダクトが一意のIDを持っている', async () => {
      const fetchedProducts = await getProducts();
      const ids = fetchedProducts.map((p) => p.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('チームメンバーデータフロー', () => {
    it('データアダプターから正しいチームメンバーデータを取得できる', async () => {
      const fetchedMembers = await getTeamMembers();

      expect(fetchedMembers).toEqual(teamMembers);
      expect(fetchedMembers.length).toBe(3);
    });

    it('取得したチームメンバーデータが表示に必要な情報を持っている', async () => {
      const fetchedMembers = await getTeamMembers();

      fetchedMembers.forEach((member) => {
        // 基本情報
        expect(member.id).toBeDefined();
        expect(member.name).toBeDefined();
        expect(member.nameEn).toBeDefined();
        expect(member.position).toBeDefined();
        expect(member.positionEn).toBeDefined();

        // 詳細情報
        expect(member.bio).toBeDefined();
        expect(member.detailedBio).toBeDefined();
        expect(member.background).toBeDefined();
        expect(member.motto).toBeDefined();

        // 専門分野
        expect(Array.isArray(member.expertise)).toBe(true);
        expect(member.expertise.length).toBeGreaterThan(0);

        // 実績
        expect(Array.isArray(member.achievements)).toBe(true);
        expect(member.achievements.length).toBeGreaterThan(0);

        // 画像
        expect(member.image).toBeDefined();

        // 日付情報
        expect(member.createdDate).toBeDefined();
      });
    });

    it('各チームメンバーが一意のIDを持っている', async () => {
      const fetchedMembers = await getTeamMembers();
      const ids = fetchedMembers.map((m) => m.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('ロードマップデータフロー', () => {
    it('データアダプターから正しいロードマップデータを取得できる', async () => {
      const fetchedRoadmaps = await getRoadmaps();

      expect(fetchedRoadmaps).toEqual(roadmaps);
      expect(fetchedRoadmaps.length).toBe(3);
    });

    it('取得したロードマップデータが表示に必要な情報を持っている', async () => {
      const fetchedRoadmaps = await getRoadmaps();

      fetchedRoadmaps.forEach((roadmap) => {
        // 基本情報
        expect(roadmap.productId).toBeDefined();
        expect(roadmap.lastUpdated).toBeDefined();

        // フェーズ情報
        expect(Array.isArray(roadmap.phases)).toBe(true);
        expect(roadmap.phases.length).toBeGreaterThan(0);

        roadmap.phases.forEach((phase) => {
          expect(phase.id).toBeDefined();
          expect(phase.name).toBeDefined();
          expect(phase.stage).toBeDefined();
          expect(phase.status).toMatch(/completed|in-progress|planned/);
          expect(phase.targetDate).toBeDefined();
          expect(Array.isArray(phase.features)).toBe(true);
          expect(phase.features.length).toBeGreaterThan(0);
        });
      });
    });

    it('ロードマップとプロダクトのIDが一致する', async () => {
      const fetchedProducts = await getProducts();
      const fetchedRoadmaps = await getRoadmaps();

      const productIds = fetchedProducts.map((p) => p.id);
      const roadmapProductIds = fetchedRoadmaps.map((r) => r.productId);

      roadmapProductIds.forEach((id) => {
        expect(productIds).toContain(id);
      });
    });
  });

  describe('データ統合性', () => {
    it('すべてのデータソースが同期的に取得できる', async () => {
      const [products, members, roadmaps] = await Promise.all([
        getProducts(),
        getTeamMembers(),
        getRoadmaps(),
      ]);

      expect(products.length).toBeGreaterThan(0);
      expect(members.length).toBeGreaterThan(0);
      expect(roadmaps.length).toBeGreaterThan(0);
    });

    it('プロダクトにはロードマップが紐づいている', async () => {
      const products = await getProducts();
      const roadmaps = await getRoadmaps();

      products.forEach((product) => {
        const relatedRoadmap = roadmaps.find((r) => r.productId === product.id);
        expect(relatedRoadmap).toBeDefined();
      });
    });

    it('データの更新日時が正しいフォーマットである', async () => {
      const products = await getProducts();
      const members = await getTeamMembers();

      // プロダクトの日付チェック
      products.forEach((product) => {
        expect(() => new Date(product.createdDate)).not.toThrow();
        if (product.updatedDate) {
          expect(() => new Date(product.updatedDate)).not.toThrow();
        }
      });

      // チームメンバーの日付チェック
      members.forEach((member) => {
        expect(() => new Date(member.createdDate)).not.toThrow();
        if (member.updatedDate) {
          expect(() => new Date(member.updatedDate)).not.toThrow();
        }
      });
    });
  });
});
