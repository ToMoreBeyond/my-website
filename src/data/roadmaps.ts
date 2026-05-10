import type { ProductRoadmap } from '@/types/roadmap';

/**
 * Himap（ヒマップ）のロードマップ
 */
export const himapRoadmap: ProductRoadmap = {
  productId: 'himap',
  lastUpdated: '2026-05-10',
  phases: [
    {
      id: 'himap-phase-1',
      name: 'Phase 1: MVP開発',
      stage: 'MVP',
      status: 'completed',
      targetDate: '2025-12',
      features: [
        'すごろく風ボードのコア体験実装',
        'Google Places APIによる近隣スポット提案',
        '訪問判定によるポイント・バッジ獲得',
        'ブックマーク（後で行く）機能',
        'ローカルファースト永続化（UserDefaults）',
      ],
      description: 'コアとなるゲーミフィケーション体験の実装',
    },
    {
      id: 'himap-phase-2',
      name: 'Phase 2: ベータ／リリース直前',
      stage: 'Beta',
      status: 'in-progress',
      targetDate: '2026-06',
      features: [
        'チュートリアル・スプラッシュ最終調整',
        'プライバシーマニフェスト整備（PrivacyInfo.xcprivacy）',
        'App Store メタデータ準備',
        'TestFlight配信とフィードバック収集',
        'パフォーマンス・バッテリー最適化',
      ],
      description: 'App Storeリリースに向けた最終仕上げ',
    },
    {
      id: 'himap-phase-3',
      name: 'Phase 3: 正式リリース',
      stage: 'Release',
      status: 'planned',
      targetDate: '2026-09',
      features: [
        'App Store正式公開',
        '対応エリア拡大（主要都市部）',
        'ペース調整可能な散歩ミッション拡張',
        'ユーザーフィードバック反映',
      ],
      description: '日本国内での正式サービス展開',
    },
    {
      id: 'himap-phase-4',
      name: 'Phase 4: 拡張機能',
      stage: 'Enhancement',
      status: 'planned',
      targetDate: '2027-03',
      features: [
        'ウィジェット／ショートカット連携',
        'iPad対応',
        'ご褒美スポットのカテゴリ拡充',
        '多言語対応（英語）',
      ],
      description: 'プラットフォーム横断とグローバル準備',
    },
  ],
};

/**
 * KeyPet（キーペット）のロードマップ
 */
export const keypetRoadmap: ProductRoadmap = {
  productId: 'keypet',
  lastUpdated: '2026-05-10',
  phases: [
    {
      id: 'keypet-phase-1',
      name: 'Phase 1: 企画・プロトタイプ',
      stage: 'Planning',
      status: 'completed',
      targetDate: '2026-03',
      features: [
        'コンセプト設計（キーボード×ペット）',
        'キャラクターデザインの方向性決定',
        'カスタムキーボード Extension の検証',
        'タイピング連動アニメーションの試作',
      ],
      description: 'コンセプト検証とプロトタイプ構築',
    },
    {
      id: 'keypet-phase-2',
      name: 'Phase 2: MVP開発',
      stage: 'MVP',
      status: 'in-progress',
      targetDate: '2026-08',
      features: [
        '複数キャラクターの実装',
        'タイピング連動アニメーション',
        'キャラクター切り替え／設定UI',
        'お気に入り保存',
        'キーボードテーマ（背景・配色）',
      ],
      description: 'コア機能の実装',
    },
    {
      id: 'keypet-phase-3',
      name: 'Phase 3: ベータ版リリース',
      stage: 'Beta',
      status: 'planned',
      targetDate: '2026-11',
      features: [
        'TestFlight配信',
        'タップによるミニインタラクション',
        'パフォーマンス最適化（キーボード Extension のメモリ制約対応）',
        'ユーザーフィードバック収集',
      ],
      description: 'クローズドベータでの検証',
    },
    {
      id: 'keypet-phase-4',
      name: 'Phase 4: 正式リリース',
      stage: 'Release',
      status: 'planned',
      targetDate: '2027-02',
      features: [
        'App Store正式リリース',
        'キャラクターラインナップの拡充',
        'コラボキャラクター展開準備',
        '多言語対応',
      ],
      description: '正式サービス開始',
    },
  ],
};

/**
 * TOI-RUNのロードマップ
 */
export const toirunRoadmap: ProductRoadmap = {
  productId: 'toirun',
  lastUpdated: '2025-01-15',
  phases: [
    {
      id: 'toirun-phase-1',
      name: 'Phase 1: MVP開発',
      stage: 'MVP',
      status: 'in-progress',
      targetDate: '2025-05',
      features: [
        'GPS/位置情報サービスによる現在地特定',
        '一番近いトイレの瞬時検索',
        '営業時間による除外処理',
        '方位磁針的なナビゲーション表示',
        '距離・清潔度（評価）の表示',
        'OpenStreetMapデータ統合',
      ],
      description: '緊急時の基本機能を実装',
    },
    {
      id: 'toirun-phase-2',
      name: 'Phase 2: ベータ版リリース',
      stage: 'Beta',
      status: 'planned',
      targetDate: '2025-07',
      features: [
        '評価順・距離順でのソート表示',
        '別のトイレ選択機能',
        'お気に入りトイレ保存機能',
        'TestFlight配信（千代田区限定）',
        'ユーザーフィードバック収集',
      ],
      description: '千代田区限定でのベータテスト',
    },
    {
      id: 'toirun-phase-3',
      name: 'Phase 3: 正式版リリース',
      stage: 'Release',
      status: 'planned',
      targetDate: '2025-10',
      features: [
        'ユーザーレビュー・清潔度評価機能',
        '東京都全域対応',
        'パフォーマンス最適化',
        'オフライン対応',
        'App Store正式リリース',
      ],
      description: '東京都全域でのサービス展開',
    },
    {
      id: 'toirun-phase-4',
      name: 'Phase 4: AR機能追加',
      stage: 'Enhancement',
      status: 'planned',
      targetDate: '2026-01',
      features: [
        'ARKitによる拡張現実ナビゲーション',
        'リアルタイム方向指示',
        'カメラ越しのトイレ表示',
        '全国展開準備',
      ],
      description: 'AR技術でユーザー体験を向上',
    },
  ],
};

/**
 * すべてのロードマップデータ
 */
export const roadmaps: ProductRoadmap[] = [
  himapRoadmap,
  keypetRoadmap,
  toirunRoadmap,
];

/**
 * プロダクトIDからロードマップを取得
 */
export function getRoadmapByProductId(productId: string): ProductRoadmap | undefined {
  return roadmaps.find((roadmap) => roadmap.productId === productId);
}

/**
 * ロードマップの進捗率を計算
 */
export function calculateRoadmapProgress(roadmap: ProductRoadmap): number {
  const totalPhases = roadmap.phases.length;
  if (totalPhases === 0) return 0;

  const completedPhases = roadmap.phases.filter((phase) => phase.status === 'completed').length;
  const inProgressPhases = roadmap.phases.filter((phase) => phase.status === 'in-progress').length;

  // 完了フェーズは100%、進行中は50%として計算
  const progress = (completedPhases * 100 + inProgressPhases * 50) / totalPhases;

  return Math.round(progress);
}
