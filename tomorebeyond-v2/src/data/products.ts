export interface Product {
  id: string;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  status: 'in-development' | 'beta' | 'released';
  technologies: string[];
  links?: {
    website?: string;
    appstore?: string;
    playstore?: string;
    github?: string;
  };
}

export const products: Product[] = [
  {
    id: 'tadataka',
    name: '忠嵩',
    nameEn: 'TADATAKA',
    tagline: '歴史と現代を繋ぐ、革新的な地図アプリケーション',
    description: '伊能忠敬の偉業にインスピレーションを得た、次世代の地図・ナビゲーションアプリ。正確な測量技術と現代のGPS技術を融合し、ユーザーの移動体験を革新します。',
    features: [
      '高精度GPSナビゲーション',
      '歴史的地図データとの重ね合わせ表示',
      'AR（拡張現実）による道案内',
      'オフライン地図機能',
      'カスタマイズ可能なルート設定',
      'コミュニティベースの情報共有'
    ],
    image: '/images/products/tadataka.jpg',
    status: 'in-development',
    technologies: ['React Native', 'TypeScript', 'MapBox SDK', 'ARKit', 'Firebase', 'Node.js'],
    links: {
      github: 'https://github.com/tomorebeyond/tadataka'
    }
  },
  {
    id: 'toirun',
    name: 'TOI-RUN',
    nameEn: 'TOI-RUN',
    tagline: 'ランニングを楽しく継続するためのゲーミフィケーション・プラットフォーム',
    description: 'トイ（おもちゃ）のように楽しいランニング体験を提供するアプリ。ゲーム要素を取り入れ、ランニングを継続しやすくサポートします。',
    features: [
      'ゲーミフィケーション要素',
      'バーチャルペット育成システム',
      'コミュニティチャレンジ',
      'パーソナライズされたトレーニングプラン',
      '詳細なランニング分析',
      'ソーシャル機能とランキング'
    ],
    image: '/images/products/toirun.jpg',
    status: 'beta',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Google Fit API', 'TensorFlow Lite'],
    links: {
      website: 'https://toirun.app',
      github: 'https://github.com/tomorebeyond/toirun'
    }
  },
  {
    id: 'meet-in-the-middle',
    name: 'Meet in the middle',
    nameEn: 'Meet in the middle',
    tagline: '人と人を繋ぐ、新しい出会いのプラットフォーム',
    description: '物理的・心理的距離を縮め、真の出会いを創出するソーシャルアプリケーション。共通の興味や価値観を持つ人々を効率的にマッチングします。',
    features: [
      'AIベースのマッチングアルゴリズム',
      '位置情報を活用した近距離マッチング',
      'インタレストベースのコミュニティ',
      'プライバシー重視の設計',
      'リアルタイムチャット機能',
      'イベント企画・参加機能'
    ],
    image: '/images/products/meet-in-the-middle.jpg',
    status: 'in-development',
    technologies: ['React Native', 'TypeScript', 'Python', 'TensorFlow', 'WebSocket', 'PostgreSQL'],
    links: {
      github: 'https://github.com/tomorebeyond/meet-in-the-middle'
    }
  }
];