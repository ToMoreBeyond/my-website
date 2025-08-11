export interface TeamMember {
  id: string;
  name: string;
  nameEn: string;
  position: string;
  positionEn: string;
  bio: string;
  expertise: string[];
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
  achievements: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 'yamada',
    name: '山田 隼大',
    nameEn: 'Jundai Yamada',
    position: 'Chief Design Officer',
    positionEn: 'CDO',
    bio: 'ユーザーエクスペリエンス設計のエキスパート。人間中心設計の哲学に基づき、直感的で美しいインターフェースを創造します。デザイン思考とテクノロジーを融合させ、革新的なプロダクト体験を提供します。',
    expertise: [
      'UI/UXデザイン',
      'デザインシステム構築',
      'ユーザーリサーチ',
      'プロトタイピング',
      'アクセシビリティ',
      'デザイン思考'
    ],
    image: '/images/team/yamada.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/jundai-yamada',
      twitter: 'https://twitter.com/jundai_yamada',
      github: 'https://github.com/jundai-yamada',
      email: 'yamada@tomorebeyond.co'
    },
    achievements: [
      'Good Design Award 2023 受賞',
      'UX デザイン国際コンペティション入賞',
      '日本デザイン学会発表',
      '多数のモバイルアプリUI設計実績'
    ]
  },
  {
    id: 'masadome',
    name: '正留',
    nameEn: 'Masadome',
    position: 'Chief Executive Officer',
    positionEn: 'CEO',
    bio: 'テクノロジーベンチャー経営のスペシャリスト。戦略的ビジョンと実行力を兼ね備え、チーム全体を牽引します。市場分析からプロダクト戦略まで、幅広い経営領域で卓越した手腕を発揮します。',
    expertise: [
      'ビジネス戦略',
      'プロダクト管理',
      '市場分析',
      'チームマネジメント',
      '資金調達',
      '事業開発'
    ],
    image: '/images/team/masadome.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/masadome',
      twitter: 'https://twitter.com/masadome_ceo',
      email: 'masadome@tomorebeyond.co'
    },
    achievements: [
      'スタートアップ経営経験 5年以上',
      '複数の技術系ベンチャー立ち上げ',
      'エンジェル投資家としても活動',
      'テクノロジービジネス講演多数'
    ]
  },
  {
    id: 'ando',
    name: '安藤',
    nameEn: 'Ando',
    position: 'Chief Technology Officer',
    positionEn: 'CTO',
    bio: 'フルスタック開発の専門家として、スケーラブルで堅牢なシステムアーキテクチャを設計・構築します。最新技術トレンドを常にキャッチアップし、チーム全体の技術力向上を牽引します。',
    expertise: [
      'システムアーキテクチャ',
      'モバイルアプリ開発',
      'クラウドインフラ',
      'DevOps',
      '機械学習',
      'データベース設計'
    ],
    image: '/images/team/ando.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/ando-cto',
      github: 'https://github.com/ando-dev',
      twitter: 'https://twitter.com/ando_tech',
      email: 'ando@tomorebeyond.co'
    },
    achievements: [
      '大規模システム設計・運用経験 10年以上',
      'AWS認定ソリューションアーキテクト',
      'オープンソースプロジェクト主要コントリビューター',
      '技術カンファレンス登壇実績多数'
    ]
  }
];