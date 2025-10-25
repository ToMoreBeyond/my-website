export interface TeamMember {
  id: string;
  name: string;
  nameEn: string;
  position: string;
  positionEn: string;
  bio: string;
  detailedBio: string;
  expertise: string[];
  background: string;
  motto: string;
  image: string;
  achievements: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: 'yamada',
    name: '山田',
    nameEn: 'Yamada',
    position: 'チーフデザイナー',
    positionEn: 'CDO',
    bio: '異なる視点で世界を観察し、形にする。',
    detailedBio: '大学時代は醸造学を専攻し、発酵の科学と伝統的な技術について深く学びました。一方で、個人的にiOSアプリ開発にも取り組んでおり、プログラミングとデザインの両方の視点を持っています。この独特な経歴により、他の人とは異なる視点からアプローチできることが強みです。ToMoreBeyondの会社ロゴも山田が手がけており、シンプルで使いやすいデザインを追求しています。',
    expertise: [
      'UI/UXデザイン',
      'iOSアプリ開発',
      'ブランドデザイン',
      'ロゴデザイン',
      'プロトタイピング',
      'デザインシステム構築'
    ],
    background: '醸造学専攻、個人でiOSアプリ開発',
    motto: '人とは違う視点からのデザインを実装していく',
    image: '/images/team/yamada.jpg',
    achievements: [
      'ToMoreBeyond会社ロゴデザイン',
      'iOSアプリ個人開発プロジェクト',
      'UI/UXデザインシステム構築',
      'ブランドアイデンティティデザイン'
    ],
    social: {}
  },
  {
    id: 'masadome',
    name: '正留',
    nameEn: 'Masadome',
    position: '代表',
    positionEn: 'CEO',
    bio: '面白いと思うことだけをする。技術と想像力で未来を創る。',
    detailedBio: '大学時代は情報学を専攻し、大学院では大規模言語モデル（LLM）の研究に従事しました。最先端のAI技術に精通しており、技術的な知見と経営センスを併せ持っています。ToMoreBeyondでは開発全体を主導し、アイディアの発想から実装まで幅広く監督しています。「面白いと思うことだけをする」というモットーのもと、このチームを立ち上げ、革新的なプロダクト開発を牽引しています。人のことと自分のことを日々考え、チーム全体の成長を大切にしています。',
    expertise: [
      '大規模言語モデル（LLM）研究',
      'AI・機械学習',
      'プロダクト開発',
      'チームマネジメント',
      '技術戦略',
      'アイディア発想・企画'
    ],
    background: '情報学専攻、大学院でLLM研究',
    motto: '面白いと思うことだけをする',
    image: '/images/team/masadome.jpg',
    achievements: [
      '大学院でのLLM（大規模言語モデル）研究',
      'ToMoreBeyondチーム立ち上げ',
      'プロダクト開発全体の技術統括',
      'AI・機械学習技術の実用化研究'
    ],
    social: {}
  },
  {
    id: 'ando',
    name: '安藤',
    nameEn: 'Ando',
    position: 'お金関係',
    positionEn: 'CAO',
    bio: '俯瞰的な視点でチームを支え、持続可能な仕組みを設計する。',
    detailedBio: '大学時代は法学部で学び、現在は公認会計士を目指して会計の勉強に励んでいます。法務と財務の両方の知識を活かし、ToMoreBeyondの経営基盤を支えています。チームの中で最も俯瞰的な視点を持ち、客観的にチーム全体を観察しながらコントロールできる貴重な人材です。個人的には都市部の喧騒を離れ、人里離れた場所での静かな生活に憧れを抱いており、この価値観がチーム運営においても冷静で的確な判断力に繋がっています。',
    expertise: [
      '法務',
      '会計・財務',
      'コンプライアンス',
      'リスクマネジメント',
      'チーム分析・観察',
      '俯瞰的コントロール'
    ],
    background: '法学部卒業、公認会計士試験勉強中',
    motto: '俯瞰的な視点でチームをコントロール',
    image: '/images/team/ando.jpg',
    achievements: [
      '法学部での法務知識習得',
      '公認会計士試験勉強による財務スキル向上',
      'チーム運営における俯瞰的分析力',
      'リスクマネジメント体制構築'
    ],
    social: {}
  }
];