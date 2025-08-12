'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Header />
      
      {/* Hero Section - 拡張版 */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(16, 185, 129, 0.3) 0%, 
              rgba(14, 165, 233, 0.2) 25%,
              rgba(139, 92, 246, 0.1) 50%,
              transparent 70%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)
          `
        }}
      >
        {/* 動的背景グリッド */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 165, 233, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        
        {/* 浮遊パーティクル */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-emerald-400/20 to-blue-400/20 animate-pulse"
            style={{
              width: Math.random() * 80 + 40,
              height: Math.random() * 80 + 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${Math.sin(Date.now() * 0.001 + i) * 30}px, ${Math.cos(Date.now() * 0.001 + i) * 20}px)`,
            }}
          />
        ))}

        <div className="container-custom text-center text-white relative z-10">
          <div className="mb-8">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-400 to-blue-400 bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 40px rgba(16, 185, 129, 0.3)',
              }}
            >
              ToMoreBeyond
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-6"></div>
          </div>
          
          <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-200 font-light">
            技術と情熱で、より遠くへ
          </p>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            革新的なモバイルアプリケーションの開発を通じて、社会に新たな価値を創造し、
            <br className="hidden md:block" />
            人々の可能性を最大限に引き出すテクノロジーソリューションを提供します。
          </p>
          
          {/* CTAボタン */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">製品を見る</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button 
              className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              お問い合わせ
            </button>
          </div>
        </div>
      </section>

      {/* About Section - 拡張版 */}
      <section id="company" className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x * 0.5}px ${mousePosition.y * 0.5}px, 
                  rgba(16, 185, 129, 0.1) 0%, 
                  rgba(59, 130, 246, 0.05) 50%,
                  transparent 70%
                )
              `
            }}
          />
          
          {/* 幾何学模様 */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-emerald-200/30 to-blue-200/30"
              style={{
                width: Math.random() * 100 + 60,
                height: Math.random() * 100 + 60,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
                私たちについて
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-8"></div>
            </div>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold text-emerald-600">ToMoreBeyond</span>は、テクノロジーの力で人々の生活をより豊かにすることを使命とする
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">東京発のテクノロジー企業</span>です。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "ミッション",
                content: "技術と情熱で、より遠くへ。革新的なソリューションを提供します。",
                icon: "🚀",
                color: "from-emerald-500 to-blue-500"
              },
              {
                title: "ビジョン", 
                content: "人々の可能性を最大限に引き出すテクノロジーを創造します。",
                icon: "💡",
                color: "from-blue-500 to-purple-500"
              },
              {
                title: "価値観",
                content: "革新性、情熱、挑戦、品質を大切にしています。",
                icon: "⭐",
                color: "from-purple-500 to-pink-500"
              }
            ].map((item, index) => (
              <div 
                key={item.title}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.content}</p>
                </div>
                
                {/* ホバー時のグラデーション効果 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>

          {/* 統計セクション */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { number: "3+", label: "プロダクト開発中" },
                { number: "10k+", label: "ユーザーに愛用" },
                { number: "5+", label: "技術領域をカバー" },
                { number: "99%", label: "アップタイム実績" }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="group"
                  style={{
                    animation: `bounceIn 0.8s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - 拡張版 */}
      <section id="products" className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 relative overflow-hidden">
        {/* 背景エフェクト */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x * 0.3}px ${mousePosition.y * 0.3}px, 
                  rgba(34, 197, 94, 0.2) 0%, 
                  rgba(59, 130, 246, 0.1) 50%,
                  transparent 70%
                )
              `
            }}
          />
          
          {/* 星空効果 */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-white">
                プロダクト
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-8"></div>
            </div>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              最先端技術と人間中心設計を融合した、
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">次世代のモバイルアプリケーション</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: "忠嵩",
                nameEn: "TADATAKA",
                description: "歴史と現代を繋ぐ、革新的な地図アプリケーション",
                status: "開発中",
                statusColor: "from-yellow-500 to-orange-500",
                icon: "🗺️",
                technologies: ["React Native", "TypeScript", "MapBox SDK"],
                gradient: "from-emerald-600 to-teal-600"
              },
              {
                name: "TOI-RUN",
                nameEn: "TOI-RUN",
                description: "ランニングを楽しく継続するためのゲーミフィケーション・プラットフォーム",
                status: "ベータ版",
                statusColor: "from-blue-500 to-cyan-500",
                icon: "🏃‍♂️",
                technologies: ["Flutter", "Dart", "Firebase"],
                gradient: "from-blue-600 to-indigo-600"
              },
              {
                name: "Meet in the middle",
                nameEn: "MEET IN THE MIDDLE",
                description: "人と人を繋ぐ、新しい出会いのプラットフォーム",
                status: "開発中",
                statusColor: "from-purple-500 to-pink-500",
                icon: "🤝",
                technologies: ["React Native", "TypeScript", "TensorFlow"],
                gradient: "from-purple-600 to-pink-600"
              }
            ].map((product, index) => (
              <div 
                key={product.name}
                className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 lg:p-10 hover:bg-white/15 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{
                  animation: `scaleIn 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                {/* 카드 글로우 효과 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* 아이콘과 상태 */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl">{product.icon}</div>
                    <span className={`px-4 py-2 text-sm font-semibold bg-gradient-to-r ${product.statusColor} text-white rounded-full shadow-lg`}>
                      {product.status}
                    </span>
                  </div>
                  
                  {/* 제품명 */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                    {product.name}
                  </h3>
                  <p className="text-white/60 text-sm font-mono mb-6 tracking-wider">
                    {product.nameEn}
                  </p>
                  
                  {/* 설명 */}
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    {product.description}
                  </p>
                  
                  {/* 技術스택 */}
                  <div className="mb-8">
                    <h4 className="text-white/80 text-sm font-semibold mb-4">使用技術</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA 버튼 */}
                  <button 
                    className={`w-full py-4 px-6 bg-gradient-to-r ${product.gradient} text-white font-semibold rounded-2xl opacity-80 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg hover:scale-105`}
                    onClick={() => window.location.href = `/products/${product.name.toLowerCase().replace(/\s+/g, '-').replace('meet-in-the-middle', 'meet-in-the-middle')}`}
                  >
                    詳細を見る
                  </button>
                </div>
                
                {/* 光る border 효과 */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/0 via-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
              </div>
            ))}
          </div>
          
          {/* 하단 CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-300 text-lg mb-8">すべてのプロダクトを詳しく見る</p>
            <button className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              <span className="group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                ポートフォリオ全体を見る
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Team Section - 拡張版 */}
      <section id="team" className="py-20 lg:py-32 bg-gradient-to-br from-white via-slate-50 to-blue-50 relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x * 0.4}px ${mousePosition.y * 0.4}px, 
                  rgba(59, 130, 246, 0.1) 0%, 
                  rgba(139, 92, 246, 0.05) 50%,
                  transparent 70%
                )
              `
            }}
          />
          
          {/* 浮遊要素 */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20"
              style={{
                width: Math.random() * 120 + 80,
                height: Math.random() * 120 + 80,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                チーム
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            </div>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold text-blue-600">ToMoreBeyond</span>の優秀なチームメンバー
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: "山田",
                nameEn: "Yamada",
                position: "Chief Design Officer",
                positionShort: "CDO",
                bio: "ユーザーエクスペリエンス設計のエキスパート。革新的なプロダクト体験を提供します。",
                image: "/images/team/yamada.jpg",
                expertise: ["UI/UXデザイン", "デザインシステム", "ユーザーリサーチ"],
                gradient: "from-emerald-500 to-blue-500",
                social: {
                  twitter: "#",
                  github: "#"
                }
              },
              {
                name: "正留",
                nameEn: "Masadome", 
                position: "Chief Executive Officer",
                positionShort: "CEO",
                bio: "テクノロジーベンチャー経営のスペシャリスト。戦略的ビジョンと実行力を兼ね備えます。",
                image: "/images/team/masadome.jpg",
                expertise: ["ビジネス戦略", "プロダクト管理", "チームマネジメント"],
                gradient: "from-blue-500 to-purple-500",
                social: {
                  twitter: "#"
                }
              },
              {
                name: "安藤",
                nameEn: "Ando",
                position: "Chief Technology Officer", 
                positionShort: "CTO",
                bio: "フルスタック開発の専門家。スケーラブルで堅牢なシステムアーキテクチャを設計・構築します。",
                image: "/images/team/ando.jpg",
                expertise: ["システムアーキテクチャ", "モバイルアプリ開発", "DevOps"],
                gradient: "from-purple-500 to-pink-500",
                social: {
                  github: "#",
                  twitter: "#"
                }
              }
            ].map((member, index) => (
              <div 
                key={member.name}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-200/50"
                style={{
                  animation: `slideInFromLeft 0.8s ease-out ${index * 0.2}s both`
                }}
              >
                {/* ホバー時のグラデーション効果 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="text-center relative z-10">
                  {/* プロフィール画像 */}
                  <div className="relative inline-block mb-8">
                    <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50 group-hover:ring-8 transition-all duration-300">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-size='24' text-anchor='middle' dy='0.35em' fill='%236b7280'%3E${member.name}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                    </div>
                    {/* グロー効果 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
                  </div>
                  
                  {/* 役職バッジ */}
                  <div className={`inline-block px-4 py-2 bg-gradient-to-r ${member.gradient} text-white text-sm font-bold rounded-full mb-4 shadow-lg`}>
                    {member.positionShort}
                  </div>
                  
                  {/* 名前 */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-mono mb-4 tracking-wider uppercase">
                    {member.nameEn}
                  </p>
                  
                  {/* 役職 */}
                  <p className="text-lg text-gray-600 font-medium mb-6">
                    {member.position}
                  </p>
                  
                  {/* 略歴 */}
                  <p className="text-gray-600 leading-relaxed mb-8 text-base">
                    {member.bio}
                  </p>
                  
                  {/* 専門分野 */}
                  <div className="mb-8">
                    <h4 className="text-gray-800 text-sm font-semibold mb-4">専門分野</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.expertise.map((skill) => (
                        <span 
                          key={skill}
                          className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border hover:bg-gray-200 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* ソーシャルリンク */}
                  <div className="flex justify-center space-x-4">
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                        <span className="text-xl">𝕏</span>
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="text-gray-400 hover:text-gray-900 transition-colors duration-200">
                        <span className="text-xl">⚡</span>
                      </a>
                    )}
                  </div>
                  
                  {/* 詳細ボタン */}
                  <button 
                    className={`mt-6 w-full py-3 px-6 bg-gradient-to-r ${member.gradient} text-white font-semibold rounded-2xl opacity-80 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg hover:scale-105`}
                    onClick={() => window.location.href = `/team/${member.name.toLowerCase()}`}
                  >
                    詳細プロフィール
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - 拡張版 */}
      <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* 背景エフェクト */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(circle at ${mousePosition.x * 0.6}px ${mousePosition.y * 0.6}px, 
                  rgba(16, 185, 129, 0.2) 0%, 
                  rgba(59, 130, 246, 0.15) 30%,
                  rgba(139, 92, 246, 0.1) 60%,
                  transparent 80%
                )
              `
            }}
          />
          
          {/* 動的な線 */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animation: `fadeInOut ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-block">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-white">
                お問い合わせ
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            </div>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              ご質問・ご相談はお気軽にお問い合わせください
              <br className="hidden md:block" />
              <span className="text-emerald-400 font-semibold">一緒に革新的なプロダクトを作りましょう</span>
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* 左側：連絡先情報 */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8">
                    Let's <span className="text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text">Connect</span>
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    新しいアイデアをお持ちですか？技術的な相談が必要ですか？
                    <br />私たちはいつでもお話を伺う準備ができています。
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Email</p>
                      <p className="text-gray-300">contact@tomorebeyond.co</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">🌍</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Location</p>
                      <p className="text-gray-300">Tokyo, Japan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">⚡</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Response Time</p>
                      <p className="text-gray-300">24時間以内</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 右側：フォーム */}
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 lg:p-10">
                <form className="space-y-6" name="contact" method="POST" data-netlify="true">
                  <input type="hidden" name="form-name" value="contact" />
                  
                  <div>
                    <label className="block text-white text-sm font-semibold mb-3">お名前 *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300" 
                      placeholder="山田太郎"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-semibold mb-3">メールアドレス *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300" 
                      placeholder="example@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-semibold mb-3">件名</label>
                    <input 
                      type="text" 
                      name="subject" 
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300" 
                      placeholder="お問い合わせの件名"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-semibold mb-3">メッセージ *</label>
                    <textarea 
                      name="message" 
                      rows={6} 
                      required 
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none" 
                      placeholder="お気軽にお聞かせください..."
                    ></textarea>
                  </div>
                  
                  <div className="text-center pt-4">
                    <button 
                      type="submit" 
                      className="group relative w-full py-4 px-8 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
                    >
                      <span className="relative z-10 text-lg">送信する</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* 送信ボタンのグロー効果 */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ToMoreBeyond</h3>
              <p className="text-gray-400">技術と情熱で、より遠くへ。</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">プロダクト</h4>
              <ul className="space-y-2 text-gray-400">
                <li>忠嵩 (TADATAKA)</li>
                <li>TOI-RUN</li>
                <li>Meet in the middle</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">リンク</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#company" className="hover:text-white transition-colors">会社概要</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">チーム</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ToMoreBeyond Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}