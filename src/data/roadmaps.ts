import type { ProductRoadmap } from '@/types/roadmap';

/**
 * TADATAKA（忠嵩）のロードマップ
 */
export const tadatakaRoadmap: ProductRoadmap = {
  productId: 'tadataka',
  lastUpdated: '2025-01-15',
  phases: [
    {
      id: 'tadataka-phase-1',
      name: 'Phase 1: MVP開発',
      stage: 'MVP',
      status: 'in-progress',
      targetDate: '2025-06',
      features: [
        'GPS/BLE/加速度センサーによる位置情報取得',
        'バックグラウンド24時間自動記録',
        '移動手段の自動判定（徒歩・自転車・車・電車）',
        '足あと地図表示（カラフルな経路可視化）',
        '写真の自動位置情報タグ付け',
        '完全オンデバイス処理によるプライバシー保護',
      ],
      description: '基本機能の実装とコア体験の確立',
    },
    {
      id: 'tadataka-phase-2',
      name: 'Phase 2: ベータ版リリース',
      stage: 'Beta',
      status: 'planned',
      targetDate: '2025-09',
      features: [
        '音声メモのワンタップ録音機能',
        '感情スタンプの記録機能',
        '今日のサマリー表示と振り返り',
        'カレンダー連携による過去の振り返り',
        'TestFlight配信開始（東京都内限定）',
        'ユーザーフィードバック収集',
      ],
      description: '東京都内限定でのベータテスト実施',
    },
    {
      id: 'tadataka-phase-3',
      name: 'Phase 3: 正式版リリース',
      stage: 'Release',
      status: 'planned',
      targetDate: '2025-12',
      features: [
        '週次・月次レポート自動生成',
        'CloudKit同期によるエンドツーエンド暗号化',
        'パフォーマンス最適化',
        'バッテリー消費の最適化',
        'App Store正式リリース（日本全国）',
        '多言語対応準備',
      ],
      description: '日本全国でのサービス展開',
    },
    {
      id: 'tadataka-phase-4',
      name: 'Phase 4: 拡張機能',
      stage: 'Enhancement',
      status: 'planned',
      targetDate: '2026-03',
      features: [
        'iPad対応',
        'Apple Watch連携',
        'ウィジェット機能',
        'ショートカット連携',
        'データエクスポート機能',
        'Core ML活用の高度な分析機能',
      ],
      description: 'エコシステム拡張とAI機能強化',
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
 * Meet in the middleのロードマップ
 */
export const meetInTheMiddleRoadmap: ProductRoadmap = {
  productId: 'meet-in-the-middle',
  lastUpdated: '2025-01-15',
  phases: [
    {
      id: 'mitm-phase-1',
      name: 'Phase 1: 企画・設計',
      stage: 'Planning',
      status: 'in-progress',
      targetDate: '2025-08',
      features: [
        'ユーザーリサーチとペルソナ定義',
        'コンセプト設計とUI/UXデザイン',
        'アルゴリズム設計（移動コスト最適化）',
        '技術スタック選定',
        'プロトタイプ作成',
      ],
      description: 'サービスの基礎設計と検証',
    },
    {
      id: 'mitm-phase-2',
      name: 'Phase 2: MVP開発',
      stage: 'MVP',
      status: 'planned',
      targetDate: '2025-12',
      features: [
        'フレンド機能による最寄駅登録',
        'グループ作成機能',
        '基本的な集合場所提案アルゴリズム',
        '電車・地下鉄路線データ統合',
        '目的別集合場所タイプ選択',
      ],
      description: '基本機能の実装',
    },
    {
      id: 'mitm-phase-3',
      name: 'Phase 3: ベータ版リリース',
      stage: 'Beta',
      status: 'planned',
      targetDate: '2026-03',
      features: [
        'お金の平等性を考慮したアルゴリズム',
        '時間の平等性を考慮したアルゴリズム',
        'リアルタイム交通情報対応',
        'TestFlight配信（東京圏限定）',
        'ユーザーフィードバック収集',
      ],
      description: '東京圏でのベータテスト',
    },
    {
      id: 'mitm-phase-4',
      name: 'Phase 4: 正式版リリース',
      stage: 'Release',
      status: 'planned',
      targetDate: '2026-06',
      features: [
        'パフォーマンス最適化',
        '都市部最適化された検索機能',
        'プッシュ通知機能',
        'App Store正式リリース',
        '複数都市対応準備',
      ],
      description: '正式サービス開始',
    },
  ],
};

/**
 * すべてのロードマップデータ
 */
export const roadmaps: ProductRoadmap[] = [
  tadatakaRoadmap,
  toirunRoadmap,
  meetInTheMiddleRoadmap,
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
