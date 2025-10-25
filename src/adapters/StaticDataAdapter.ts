import type { CMSAdapter } from './CMSAdapter';
import { products } from '@/data/products';
import type { Product } from '@/data/products';
import { teamMembers } from '@/data/team';
import type { TeamMember } from '@/data/team';
import { roadmaps } from '@/data/roadmaps';
import type { ProductRoadmap } from '@/types/roadmap';

/**
 * 静的データアダプター
 *
 * ローカルの静的データファイルからデータを取得する実装。
 * CMSやAPI統合前のデフォルト実装として使用します。
 */
export class StaticDataAdapter implements CMSAdapter {
  /**
   * すべてのプロダクトを取得
   */
  async getProducts(): Promise<Product[]> {
    // 静的データなので即座に返す（Promiseでラップ）
    return Promise.resolve(products);
  }

  /**
   * IDでプロダクトを取得
   */
  async getProductById(id: string): Promise<Product | null> {
    const product = products.find((p) => p.id === id);
    return Promise.resolve(product || null);
  }

  /**
   * すべてのチームメンバーを取得
   */
  async getTeamMembers(): Promise<TeamMember[]> {
    return Promise.resolve(teamMembers);
  }

  /**
   * IDでチームメンバーを取得
   */
  async getTeamMemberById(id: string): Promise<TeamMember | null> {
    const member = teamMembers.find((m) => m.id === id);
    return Promise.resolve(member || null);
  }

  /**
   * すべてのロードマップを取得
   */
  async getRoadmaps(): Promise<ProductRoadmap[]> {
    return Promise.resolve(roadmaps);
  }

  /**
   * プロダクトIDでロードマップを取得
   */
  async getRoadmapByProductId(productId: string): Promise<ProductRoadmap | null> {
    const roadmap = roadmaps.find((r) => r.productId === productId);
    return Promise.resolve(roadmap || null);
  }

  /**
   * コンテンツの最終更新日時を取得
   *
   * 静的データの場合、ロードマップにlastUpdatedがあればそれを返す。
   * それ以外は現在時刻を返す（ビルド時刻として扱う）。
   */
  async getLastUpdated(
    contentType: 'product' | 'team' | 'roadmap',
    id?: string
  ): Promise<Date | null> {
    if (contentType === 'roadmap' && id) {
      const roadmap = await this.getRoadmapByProductId(id);
      if (roadmap?.lastUpdated) {
        return new Date(roadmap.lastUpdated);
      }
    }

    // 静的データの場合、ビルド時刻を返す
    return new Date();
  }
}

/**
 * デフォルトのデータアダプターインスタンス
 */
export const dataAdapter: CMSAdapter = new StaticDataAdapter();
