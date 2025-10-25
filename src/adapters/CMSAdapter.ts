import type { Product } from '@/data/products';
import type { TeamMember } from '@/data/team';
import type { ProductRoadmap } from '@/types/roadmap';

/**
 * CMSアダプター抽象インターフェース
 *
 * このインターフェースは、データソース（静的データ、CMS、API等）の
 * 抽象化レイヤーを提供します。実装を切り替えることで、
 * データソースを変更できます。
 */
export interface CMSAdapter {
  /**
   * すべてのプロダクトを取得
   */
  getProducts(): Promise<Product[]>;

  /**
   * IDでプロダクトを取得
   * @param id プロダクトID
   */
  getProductById(id: string): Promise<Product | null>;

  /**
   * すべてのチームメンバーを取得
   */
  getTeamMembers(): Promise<TeamMember[]>;

  /**
   * IDでチームメンバーを取得
   * @param id チームメンバーID
   */
  getTeamMemberById(id: string): Promise<TeamMember | null>;

  /**
   * すべてのロードマップを取得
   */
  getRoadmaps(): Promise<ProductRoadmap[]>;

  /**
   * プロダクトIDでロードマップを取得
   * @param productId プロダクトID
   */
  getRoadmapByProductId(productId: string): Promise<ProductRoadmap | null>;

  /**
   * コンテンツの最終更新日時を取得
   * @param contentType コンテンツタイプ
   * @param id コンテンツID（オプション）
   */
  getLastUpdated(contentType: 'product' | 'team' | 'roadmap', id?: string): Promise<Date | null>;
}

/**
 * データソース設定
 */
export interface DataSourceConfig {
  /**
   * データソースタイプ
   */
  type: 'static' | 'cms' | 'api';

  /**
   * API設定（type: 'api' の場合）
   */
  apiConfig?: {
    baseUrl: string;
    apiKey?: string;
  };

  /**
   * CMS設定（type: 'cms' の場合）
   */
  cmsConfig?: {
    endpoint: string;
    accessToken?: string;
  };
}
