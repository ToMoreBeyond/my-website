export interface Product {
  id: string;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  image: string;
  status: 'in-development' | 'beta' | 'released';
  technologies: string[];
  targetUsers: string[];
  developmentPhase: string;
  releaseSchedule: string;
  supportedDevices: string[];
  minimumOS: string;
  targetRegion: string;
  roadmapUrl?: string;
  createdDate: string;
  updatedDate?: string;
}

export const products: Product[] = [
  {
    id: 'tadataka',
    name: '忠嵩',
    nameEn: 'TADATAKA',
    tagline: 'あなたの歩いた道が、そのまま日記になる',
    description: 'GPS/BLE/加速度センサーによる高精度な移動記録。プライバシー完全保護（オンデバイス処理）で、毎日の足跡を美しい地図として残します。',
    longDescription: 'TADATAKAは、移動がそのまま日記になる革新的なiOSライフログアプリです。GPS、Bluetooth Low Energy、加速度センサーを活用した高精度位置情報取得により、バックグラウンドで24時間自動記録を行います。完全オンデバイス処理によりプライバシーを重視し、移動データは外部に送信されません。',
    features: [
      'GPS/BLE/加速度センサーによる高精度位置情報取得',
      'バックグラウンドでの24時間自動記録',
      '移動手段の自動判定（徒歩・自転車・車・電車）',
      '足あと地図表示（カラフルな経路可視化）',
      '写真の自動位置情報タグ付け',
      '音声メモのワンタップ録音',
      '感情スタンプの簡単記録',
      '今日のサマリー表示と振り返り機能',
      'カレンダー連携による過去の振り返り',
      '週次・月次レポート自動生成',
      '完全オンデバイス処理（プライバシー重視）',
      'CloudKit同期によるエンドツーエンド暗号化'
    ],
    image: '/images/products/tadataka.jpg',
    status: 'in-development',
    technologies: [
      'Swift 5.9+',
      'SwiftUI + UIKit（ハイブリッド構成）',
      'Core Location',
      'Core Motion',
      'Apple MapKit',
      'Core Data',
      'CloudKit',
      'Core ML + Create ML',
      'Natural Language',
      'Vision'
    ],
    targetUsers: [
      '日常を振り返りたい人',
      '健康的な生活習慣を身につけたい人',
      '自分の成長を実感したい人',
      'プライバシーを重視する人'
    ],
    developmentPhase: 'Phase 1: MVP（最小実行可能製品）',
    releaseSchedule: 'ベータ版：2025年Q3（東京都内限定）、正式版：2025年Q4（日本全国）',
    supportedDevices: ['iPhone（初期リリース）', 'iPad（将来対応予定）'],
    minimumOS: 'iOS 16.0以降',
    targetRegion: '簡易ベータ版：東京都内のみ、将来的：全国、そしてグローバル展開予定',
    roadmapUrl: '/products/tadataka#roadmap',
    createdDate: '2024-11-01',
    updatedDate: '2025-01-15',
  },
  {
    id: 'toirun',
    name: 'TOI-RUN',
    nameEn: 'TOIRUN',
    tagline: '緊急時に最速でトイレを見つける',
    description: 'アプリを開いた瞬間、方位磁針のように最寄りトイレの方向と距離を表示。営業時間・清潔度を考慮した賢い検索。',
    longDescription: 'TOIRUN（トイラン）は、緊急時にトイレの場所をすぐに見つけられるiOSアプリです。スプラッシュスクリーンに方位磁針的なナビゲーションが表示され、最寄りのトイレまでの方向と距離を瞬時に把握できます。営業時間や清潔度を考慮した検索機能により、最適なトイレを素早く見つけることができます。',
    features: [
      'GPS/位置情報サービスによる現在地特定',
      '一番近いトイレの瞬時検索',
      '営業時間による除外処理',
      '方位磁針的なナビゲーション表示',
      '距離・清潔度（評価）の表示',
      '評価順・距離順でのソート表示',
      '別のトイレ選択機能',
      '将来機能：ARKitによる拡張現実ナビゲーション',
      '将来機能：ユーザーレビュー・清潔度評価',
      '将来機能：お気に入りトイレ保存'
    ],
    image: '/images/products/toirun.jpg',
    status: 'in-development',
    technologies: [
      'Swift',
      'SwiftUI',
      'Core Location',
      'Apple MapKit',
      'OpenStreetMap（無料地図データ）',
      '将来実装：ARKit',
      '将来実装：Core Data'
    ],
    targetUsers: [
      'お腹が痛い人',
      '外出先でトイレを探す必要がある人',
      '観光客・旅行者'
    ],
    developmentPhase: 'Phase 1: MVP（最小実行可能製品）',
    releaseSchedule: 'ベータ版：千代田区限定、正式版：東京都全域',
    supportedDevices: ['iPhone（初期リリースのみ）'],
    minimumOS: 'iOS 18.0以降',
    targetRegion: '簡易ベータ版：千代田区のみ、将来的：東京都から全国に展開予定',
    createdDate: '2024-12-01',
    updatedDate: '2025-01-10',
  },
  {
    id: 'meet-in-the-middle',
    name: 'Meet in the middle',
    nameEn: 'MEET IN THE MIDDLE',
    tagline: '公平な待ち合わせ場所を、AIが提案',
    description: '移動コスト・時間的公平性を考慮したアルゴリズムで、全員にとって最適な集合場所を自動提案。都市部最適化。',
    longDescription: 'Meet in the middleは、都会で生活する人々のための集合場所決定アプリです。フレンド機能により事前に各自の最寄駅を登録し、グループを作成して待ち合わせ場所を効率的に決定できます。目的に応じて集合場所の種類を変更でき、移動コストの平等性や時間的な公平性を考慮したアルゴリズムにより、全員にとって最適な場所を提案します。',
    features: [
      'フレンド機能による最寄駅事前登録',
      'グループ作成と待ち合わせ場所決定',
      '目的別集合場所タイプ選択',
      'お金の平等性を考慮したアルゴリズム',
      '時間の平等性を考慮したアルゴリズム',
      '楽な初期登録システム',
      '都市部最適化された検索機能',
      '電車・地下鉄路線連携',
      'リアルタイム交通情報対応'
    ],
    image: '/images/products/meet-in-the-middle.jpg',
    status: 'in-development',
    technologies: [
      '開発中（技術スタック検討中）',
      '地図・位置情報API',
      '交通情報API',
      '最適化アルゴリズム'
    ],
    targetUsers: [
      '都会の人間',
      '友人・同僚と頻繁に待ち合わせをする人',
      'グループでの外出が多い人',
      '効率的な集合場所を求める人'
    ],
    developmentPhase: '企画・設計段階',
    releaseSchedule: '未定（開発中）',
    supportedDevices: ['未定'],
    minimumOS: '未定',
    targetRegion: '都市部（東京圏を想定）',
    createdDate: '2024-10-01',
  }
];