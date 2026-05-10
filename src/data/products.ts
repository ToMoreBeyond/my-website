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
  privacyPolicyUrl?: string;
  createdDate: string;
  updatedDate?: string;
}

export const products: Product[] = [
  {
    id: 'himap',
    name: 'ヒマップ',
    nameEn: 'Himap',
    tagline: '暇な時間を、冒険に変える',
    description: 'すごろく風のゲーミフィケーションで、近くのお店や目的地を提案。実際に訪れるとポイント・バッジを獲得できる、位置情報×ライフスタイルアプリです。',
    longDescription: 'ヒマップは「暇な時間を冒険に変える」をコンセプトにした iOS アプリです。すごろく風のボードでサイコロを振り、止まったマスに応じて現在地周辺のスポットを提案。実際に訪問するとポイントやバッジが手に入り、ステージクリアで新しいエリアが解放されていきます。データはすべてデバイス内に保存されるローカルファースト設計で、アカウント登録不要・サーバー不要で利用できます。',
    features: [
      'すごろく風ボードによる目的地提案（毎日サイコロ）',
      '現在地周辺のお店・スポットを Google Places API で検索',
      '訪問判定によるポイント・バッジ獲得',
      'ステージクリア演出と「ご褒美スポット」機能',
      '行きたい場所を保存できる「後で行く」機能',
      '散歩ミッション（歩行距離追跡）',
      '位置情報は「使用中のみ」取得、バックグラウンド取得なし',
      'ローカルファースト設計（アカウント・サーバー不要）',
      'ライト/ダーク両対応のパステルテーマ',
    ],
    image: '/images/products/himap.png',
    status: 'released',
    technologies: [
      'Swift 6',
      'SwiftUI',
      'MVVM',
      'async/await + @MainActor',
      'Core Location（WhenInUse）',
      'Apple MapKit',
      'Google Places API',
      'UserDefaults（ローカル永続化）',
    ],
    targetUsers: [
      '暇な時間を有意義に使いたい人',
      '近所の新しいお店を発見したい人',
      'ゲーム感覚で散歩・外出を楽しみたい人',
      'プライバシーを重視する人',
    ],
    developmentPhase: 'リリース版（App Store 公開準備中）',
    releaseSchedule: '2026年 リリース予定',
    supportedDevices: ['iPhone'],
    minimumOS: 'iOS 15.0以降',
    targetRegion: '日本（主要都市部）',
    privacyPolicyUrl: '/privacy/himap',
    createdDate: '2025-09-01',
    updatedDate: '2026-05-10',
  },
  {
    id: 'keypet',
    name: 'キーペット',
    nameEn: 'KeyPet',
    tagline: 'キーボードに、ペットが現れる',
    description: 'キーペットは、iOS のカスタムキーボード上にペットや好きなキャラクターが現れるアプリ。文字を打つたびにペットと戯れられる、毎日の入力時間を癒しに変えるカスタムキーボードです。',
    longDescription: 'キーペットは、キーボードを開くたびにあなたの選んだペットやキャラクターが顔を出すカスタムキーボードアプリです。アプリを入れて好きなキャラクターを設定するだけで、メッセージや SNS の入力時間が癒しの時間に変わります。タイピングに反応するアニメーションや、スキマ時間に触れ合えるミニインタラクションを搭載予定です。',
    features: [
      'カスタムキーボード上にペット／キャラクターが登場',
      '複数のペット・キャラクターから選択可能',
      'タイピングに連動したアニメーション',
      'タップでペットと触れ合えるミニインタラクション',
      'お気に入りキャラクターの保存',
      'キーボードテーマ（背景・配色）の切り替え',
      '完全ローカル動作（入力内容は外部送信しない）',
    ],
    image: '/images/products/keypet.png',
    status: 'in-development',
    technologies: [
      'Swift',
      'SwiftUI + UIKit',
      'Custom Keyboard Extension',
      'Core Animation',
      'UserDefaults（ローカル設定）',
    ],
    targetUsers: [
      '日常の入力時間を癒したい人',
      'ペット・動物・キャラクターが好きな人',
      'キーボードをカスタマイズしたい人',
      'iPhone を可愛くしたい人',
    ],
    developmentPhase: 'ベータ版開発中',
    releaseSchedule: 'ベータ版リリース予定',
    supportedDevices: ['iPhone'],
    minimumOS: 'iOS 16.0以降',
    targetRegion: '日本（初期リリース）',
    createdDate: '2026-03-01',
    updatedDate: '2026-05-10',
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
      '将来機能：お気に入りトイレ保存',
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
      '将来実装：Core Data',
    ],
    targetUsers: [
      'お腹が痛い人',
      '外出先でトイレを探す必要がある人',
      '観光客・旅行者',
    ],
    developmentPhase: 'Phase 1: MVP（最小実行可能製品）',
    releaseSchedule: 'ベータ版：千代田区限定、正式版：東京都全域',
    supportedDevices: ['iPhone（初期リリースのみ）'],
    minimumOS: 'iOS 18.0以降',
    targetRegion: '簡易ベータ版：千代田区のみ、将来的：東京都から全国に展開予定',
    createdDate: '2024-12-01',
    updatedDate: '2025-01-10',
  },
];
