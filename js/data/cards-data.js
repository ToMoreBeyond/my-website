// ToMoreBeyond カードデータ
// 8bitcn風アスキーアート表現でのカード情報

export const cardsData = [
  // 会社セクション区切りカード（８bitドット絵風アスキーアート）
  { icon: '[#]', title: '会社', description: 'TOMOREBEYOND について', section: 'company', type: 'divider', link: '#' },
  { icon: '[]', title: '会社概要', description: 'MICHI NAKI MICHI WO KIRU', section: 'company', link: 'detail/company.html' },
  { icon: 'X', title: 'ミッション', description: 'OMOSHIROI KOTO DAKE WO SURU', section: 'company', link: 'detail/mission.html' },
  
  // アプリセクション区切りカード
  { icon: '[A]', title: 'アプリ', description: 'WATASHITACHI NO PRODUCT', section: 'apps', type: 'divider', link: '#' },
  { icon: '+', title: 'TADATAKA', description: 'IDOU GA SONO MAMA NIKKI NI', section: 'apps', link: 'pages/tadataka.html' },
  { icon: 'T', title: 'TOIRUN', description: 'IMA SUGU TOIRE WO SAITAN DE', section: 'apps', link: 'pages/toirun.html' },
  { icon: 'M', title: 'MEET IN THE MIDDLE', description: 'SAITEKI NA SHUUGOU CHITEN WO', section: 'apps', link: 'pages/midpoint.html' },
  
  // チームメンバーセクション区切りカード
  { icon: '[M]', title: 'チームメンバー', description: 'ISSHO NI AYUMU NAKAMA TACHI', section: 'members', type: 'divider', link: '#' },
  { icon: 'Y', title: '山田', description: 'CDO / DESIGNER', section: 'members', link: 'detail/yamada.html' },
  { icon: 'M', title: '正留', description: 'CEO / ENGINEER', section: 'members', link: 'detail/masadome.html' },
  { icon: 'A', title: '安藤', description: 'ARTIST', section: 'members', link: 'detail/ando.html' },
  
  // メディアセクション区切りカード
  { icon: '[I]', title: 'メディア', description: 'JOUHOU HASSHIN TO KATSUDOU', section: 'media', type: 'divider', link: '#' },
  { icon: 'B', title: 'ブログ', description: 'KAIHATSU NO URA BANASHI', section: 'media', link: 'detail/blog.html' },
  { icon: 'V', title: '動画', description: 'PRODUCT SHOUKAI', section: 'media', link: 'detail/video.html' },
  { icon: 'S', title: 'SNS', description: 'HIBI NO HASSHIN', section: 'media', link: 'detail/sns.html' },
  
  // コンタクトセクション区切りカード
  { icon: '[C]', title: 'コンタクト', description: 'TSUNAGARI WO TAISETSU NI', section: 'contact', type: 'divider', link: '#' },
  { icon: '@', title: 'お問い合わせ', description: 'OKI GARU NI DOUZO', section: 'contact', link: 'detail/contact.html' }
];

// セクション別設定
export const sectionConfig = {
  company: {
    name: '会社',
    color: '#FFB300',
    pathColor: '#FFB300'
  },
  apps: {
    name: 'アプリ',
    color: '#4CAF50',
    pathColor: '#4CAF50'
  },
  members: {
    name: 'チームメンバー',
    color: '#9C27B0',
    pathColor: '#9C27B0'
  },
  media: {
    name: 'メディア',
    color: '#2196F3',
    pathColor: '#2196F3'
  },
  contact: {
    name: 'コンタクト',
    color: '#FF5722',
    pathColor: '#FF5722'
  }
};

// ゲーム設定
export const gameConfig = {
  maxLevel: 18,
  expPerCard: 10,
  expToLevelUp: 10,
  jumpDuration: 600,
  walkFrameRate: 250,
  scrollThreshold: 50
};