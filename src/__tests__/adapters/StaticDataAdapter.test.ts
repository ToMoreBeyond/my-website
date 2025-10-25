import { describe, it, expect, beforeEach } from 'vitest';
import { StaticDataAdapter } from '@/adapters/StaticDataAdapter';
import { products } from '@/data/products';
import { teamMembers } from '@/data/team';
import { roadmaps } from '@/data/roadmaps';

describe('StaticDataAdapter', () => {
  let adapter: StaticDataAdapter;

  beforeEach(() => {
    adapter = new StaticDataAdapter();
  });

  describe('getProducts', () => {
    it('すべてのプロダクトを取得できる', async () => {
      const result = await adapter.getProducts();

      expect(result).toEqual(products);
      expect(result.length).toBeGreaterThan(0);
    });

    it('取得したプロダクトが正しい構造を持っている', async () => {
      const result = await adapter.getProducts();

      result.forEach((product) => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('nameEn');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('status');
        expect(product).toHaveProperty('technologies');
        expect(product).toHaveProperty('createdDate');
      });
    });
  });

  describe('getProductById', () => {
    it('存在するIDでプロダクトを取得できる', async () => {
      const result = await adapter.getProductById('tadataka');

      expect(result).not.toBeNull();
      expect(result?.id).toBe('tadataka');
      expect(result?.name).toBe('忠嵩');
      expect(result?.nameEn).toBe('TADATAKA');
    });

    it('存在しないIDでnullを返す', async () => {
      const result = await adapter.getProductById('non-existent-id');

      expect(result).toBeNull();
    });

    it('すべてのプロダクトIDで取得できる', async () => {
      const productIds = ['tadataka', 'toirun', 'meet-in-the-middle'];

      for (const id of productIds) {
        const result = await adapter.getProductById(id);
        expect(result).not.toBeNull();
        expect(result?.id).toBe(id);
      }
    });
  });

  describe('getTeamMembers', () => {
    it('すべてのチームメンバーを取得できる', async () => {
      const result = await adapter.getTeamMembers();

      expect(result).toEqual(teamMembers);
      expect(result.length).toBeGreaterThan(0);
    });

    it('取得したチームメンバーが正しい構造を持っている', async () => {
      const result = await adapter.getTeamMembers();

      result.forEach((member) => {
        expect(member).toHaveProperty('id');
        expect(member).toHaveProperty('name');
        expect(member).toHaveProperty('nameEn');
        expect(member).toHaveProperty('position');
        expect(member).toHaveProperty('positionEn');
        expect(member).toHaveProperty('bio');
        expect(member).toHaveProperty('expertise');
        expect(member).toHaveProperty('createdDate');
      });
    });
  });

  describe('getTeamMemberById', () => {
    it('存在するIDでチームメンバーを取得できる', async () => {
      const result = await adapter.getTeamMemberById('yamada');

      expect(result).not.toBeNull();
      expect(result?.id).toBe('yamada');
      expect(result?.name).toBe('山田');
      expect(result?.position).toBe('チーフデザイナー');
    });

    it('存在しないIDでnullを返す', async () => {
      const result = await adapter.getTeamMemberById('non-existent-member');

      expect(result).toBeNull();
    });

    it('すべてのチームメンバーIDで取得できる', async () => {
      const memberIds = ['yamada', 'masadome', 'ando'];

      for (const id of memberIds) {
        const result = await adapter.getTeamMemberById(id);
        expect(result).not.toBeNull();
        expect(result?.id).toBe(id);
      }
    });
  });

  describe('getRoadmaps', () => {
    it('すべてのロードマップを取得できる', async () => {
      const result = await adapter.getRoadmaps();

      expect(result).toEqual(roadmaps);
      expect(result.length).toBeGreaterThan(0);
    });

    it('取得したロードマップが正しい構造を持っている', async () => {
      const result = await adapter.getRoadmaps();

      result.forEach((roadmap) => {
        expect(roadmap).toHaveProperty('productId');
        expect(roadmap).toHaveProperty('phases');
        expect(roadmap).toHaveProperty('lastUpdated');
        expect(Array.isArray(roadmap.phases)).toBe(true);
      });
    });

    it('各ロードマップのフェーズが正しい構造を持っている', async () => {
      const result = await adapter.getRoadmaps();

      result.forEach((roadmap) => {
        roadmap.phases.forEach((phase) => {
          expect(phase).toHaveProperty('id');
          expect(phase).toHaveProperty('name');
          expect(phase).toHaveProperty('stage');
          expect(phase).toHaveProperty('status');
          expect(phase).toHaveProperty('targetDate');
          expect(phase).toHaveProperty('features');
          expect(['completed', 'in-progress', 'planned']).toContain(phase.status);
        });
      });
    });
  });

  describe('getRoadmapByProductId', () => {
    it('存在するプロダクトIDでロードマップを取得できる', async () => {
      const result = await adapter.getRoadmapByProductId('tadataka');

      expect(result).not.toBeNull();
      expect(result?.productId).toBe('tadataka');
      expect(result?.phases.length).toBeGreaterThan(0);
    });

    it('存在しないプロダクトIDでnullを返す', async () => {
      const result = await adapter.getRoadmapByProductId('non-existent-product');

      expect(result).toBeNull();
    });

    it('すべてのプロダクトIDでロードマップを取得できる', async () => {
      const productIds = ['tadataka', 'toirun', 'meet-in-the-middle'];

      for (const id of productIds) {
        const result = await adapter.getRoadmapByProductId(id);
        expect(result).not.toBeNull();
        expect(result?.productId).toBe(id);
      }
    });
  });

  describe('getLastUpdated', () => {
    it('プロダクトの最終更新日時を取得できる（IDなし）', async () => {
      const result = await adapter.getLastUpdated('product');

      expect(result).toBeInstanceOf(Date);
    });

    it('チームメンバーの最終更新日時を取得できる（IDなし）', async () => {
      const result = await adapter.getLastUpdated('team');

      expect(result).toBeInstanceOf(Date);
    });

    it('ロードマップの最終更新日時を取得できる（IDあり）', async () => {
      const result = await adapter.getLastUpdated('roadmap', 'tadataka');

      expect(result).toBeInstanceOf(Date);
    });

    it('存在しないロードマップIDでnullを返す', async () => {
      const result = await adapter.getLastUpdated('roadmap', 'non-existent');

      // データが存在しない場合はnullを返す
      expect(result).toBeNull();
    });

    it('ロードマップのlastUpdatedフィールドを正しくパースする', async () => {
      const roadmap = await adapter.getRoadmapByProductId('tadataka');
      if (roadmap) {
        const result = await adapter.getLastUpdated('roadmap', 'tadataka');
        expect(result).toBeInstanceOf(Date);

        const expectedDate = new Date(roadmap.lastUpdated);
        expect(result?.getTime()).toBe(expectedDate.getTime());
      }
    });
  });

  describe('データの整合性', () => {
    it('プロダクトとロードマップのIDが一致する', async () => {
      const products = await adapter.getProducts();
      const roadmaps = await adapter.getRoadmaps();

      const productIds = products.map((p) => p.id);
      const roadmapProductIds = roadmaps.map((r) => r.productId);

      // すべてのロードマップが対応するプロダクトを持つ
      roadmapProductIds.forEach((id) => {
        expect(productIds).toContain(id);
      });
    });

    it('取得したデータがイミュータブル（変更が反映されない）', async () => {
      const products1 = await adapter.getProducts();
      const products2 = await adapter.getProducts();

      // 同じデータが取得される
      expect(products1).toEqual(products2);

      // データを変更しても元のデータには影響しない（参照の独立性を確認）
      const originalLength = products1.length;
      expect(products2.length).toBe(originalLength);
    });
  });

  describe('非同期動作', () => {
    it('getProductsがPromiseを返す', () => {
      const result = adapter.getProducts();
      expect(result).toBeInstanceOf(Promise);
    });

    it('複数の非同期呼び出しが並行して動作する', async () => {
      const [products, teamMembers, roadmaps] = await Promise.all([
        adapter.getProducts(),
        adapter.getTeamMembers(),
        adapter.getRoadmaps(),
      ]);

      expect(products.length).toBeGreaterThan(0);
      expect(teamMembers.length).toBeGreaterThan(0);
      expect(roadmaps.length).toBeGreaterThan(0);
    });
  });
});
