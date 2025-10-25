/**
 * ロードマップフェーズのステータス
 */
export type RoadmapStatus = 'completed' | 'in-progress' | 'planned';

/**
 * ロードマップフェーズ
 */
export interface RoadmapPhase {
  /** フェーズID */
  id: string;
  /** フェーズ名 */
  name: string;
  /** 開発ステージ（例: MVP, Beta, Release） */
  stage: string;
  /** ステータス */
  status: RoadmapStatus;
  /** 目標日付（YYYY-MM形式） */
  targetDate: string;
  /** 機能リスト */
  features: string[];
  /** 説明文 */
  description?: string;
  /** 完了日（completed の場合） */
  completedDate?: string;
}

/**
 * プロダクトロードマップ
 */
export interface ProductRoadmap {
  /** プロダクトID */
  productId: string;
  /** フェーズリスト */
  phases: RoadmapPhase[];
  /** ロードマップ最終更新日 */
  lastUpdated: string;
}

/**
 * ロードマップステータスに応じた色を取得
 */
export function getRoadmapStatusColor(status: RoadmapStatus): string {
  switch (status) {
    case 'completed':
      return 'bg-emerald-500';
    case 'in-progress':
      return 'bg-primary-500';
    case 'planned':
      return 'bg-neutral-400';
    default:
      return 'bg-neutral-400';
  }
}

/**
 * ロードマップステータスに応じたテキストを取得
 */
export function getRoadmapStatusText(status: RoadmapStatus): string {
  switch (status) {
    case 'completed':
      return '完了';
    case 'in-progress':
      return '開発中';
    case 'planned':
      return '予定';
    default:
      return '不明';
  }
}

/**
 * 日付フォーマット（YYYY-MM → YYYY年MM月）
 */
export function formatRoadmapDate(date: string): string {
  if (!date || !date.match(/^\d{4}-\d{2}$/)) {
    return date;
  }

  const [year, month] = date.split('-');
  return `${year}年${parseInt(month, 10)}月`;
}

/**
 * 四半期表記に変換（YYYY-MM → YYYY Q1/Q2/Q3/Q4）
 */
export function formatRoadmapQuarter(date: string): string {
  if (!date || !date.match(/^\d{4}-\d{2}$/)) {
    return date;
  }

  const [year, month] = date.split('-');
  const monthNum = parseInt(month, 10);

  let quarter: number;
  if (monthNum <= 3) {
    quarter = 1;
  } else if (monthNum <= 6) {
    quarter = 2;
  } else if (monthNum <= 9) {
    quarter = 3;
  } else {
    quarter = 4;
  }

  return `${year} Q${quarter}`;
}
