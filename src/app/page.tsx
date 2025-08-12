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

      {/* Products Section - シンプル版 */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">プロダクト</h2>
            <p className="text-lg text-gray-600">最先端技術と人間中心設計を融合した、次世代のモバイルアプリケーション</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">忠嵩 (TADATAKA)</h3>
              <p className="text-gray-600 mb-4">歴史と現代を繋ぐ、革新的な地図アプリケーション</p>
              <span className="inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">開発中</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">TOI-RUN</h3>
              <p className="text-gray-600 mb-4">ランニングを楽しく継続するためのゲーミフィケーション・プラットフォーム</p>
              <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">ベータ版</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Meet in the middle</h3>
              <p className="text-gray-600 mb-4">人と人を繋ぐ、新しい出会いのプラットフォーム</p>
              <span className="inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">開発中</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - シンプル版 */}
      <section id="team" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">チーム</h2>
            <p className="text-lg text-gray-600">ToMoreBeyondの優秀なチームメンバー</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">山田</h3>
              <p className="text-gray-600">CEO / Chief Executive Officer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">正留</h3>
              <p className="text-gray-600">CTO / Chief Technology Officer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">安藤</h3>
              <p className="text-gray-600">CDO / Chief Design Officer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - シンプル版 */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">お問い合わせ</h2>
            <p className="text-lg text-gray-300">ご質問・ご相談はお気軽にお問い合わせください</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6" name="contact" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
              <div>
                <label className="block text-sm font-medium mb-2">お名前</label>
                <input type="text" name="name" required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">メールアドレス</label>
                <input type="email" name="email" required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">メッセージ</label>
                <textarea name="message" rows={5} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                  送信する
                </button>
              </div>
            </form>
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