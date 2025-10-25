import { dataAdapter } from '@/adapters/StaticDataAdapter';
import type { Product } from '@/data/products';
import type { TeamMember } from '@/data/team';
import type { ProductRoadmap } from '@/types/roadmap';

/**
 * データ取得ユーティリティ
 *
 * アプリケーション全体で統一されたデータアクセス方法を提供します。
 * データソース（静的データ、CMS、API等）の切り替えは
 * dataAdapterの実装を変更することで行えます。
 */

/**
 * すべてのプロダクトを取得
 */
export async function getProducts(): Promise<Product[]> {
  return dataAdapter.getProducts();
}

/**
 * IDでプロダクトを取得
 * @param id プロダクトID
 */
export async function getProductById(id: string): Promise<Product | null> {
  return dataAdapter.getProductById(id);
}

/**
 * すべてのチームメンバーを取得
 */
export async function getTeamMembers(): Promise<TeamMember[]> {
  return dataAdapter.getTeamMembers();
}

/**
 * IDでチームメンバーを取得
 * @param id チームメンバーID
 */
export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  return dataAdapter.getTeamMemberById(id);
}

/**
 * すべてのロードマップを取得
 */
export async function getRoadmaps(): Promise<ProductRoadmap[]> {
  return dataAdapter.getRoadmaps();
}

/**
 * プロダクトIDでロードマップを取得
 * @param productId プロダクトID
 */
export async function getRoadmapByProductId(productId: string): Promise<ProductRoadmap | null> {
  return dataAdapter.getRoadmapByProductId(productId);
}

/**
 * コンテンツの最終更新日時を取得
 * @param contentType コンテンツタイプ
 * @param id コンテンツID（オプション）
 */
export async function getLastUpdated(
  contentType: 'product' | 'team' | 'roadmap',
  id?: string
): Promise<Date | null> {
  return dataAdapter.getLastUpdated(contentType, id);
}

/**
 * プロダクトIDの一覧を取得（generateStaticParams用）
 */
export async function getProductIds(): Promise<string[]> {
  const products = await getProducts();
  return products.map((p) => p.id);
}

/**
 * チームメンバーIDの一覧を取得（generateStaticParams用）
 */
export async function getTeamMemberIds(): Promise<string[]> {
  const members = await getTeamMembers();
  return members.map((m) => m.id);
}
