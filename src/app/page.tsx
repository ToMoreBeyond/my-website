'use client'

import { useEffect, useRef } from 'react'
import { useScrollAnimation, smoothScrollTo } from '@/lib/animations'
import Image from 'next/image'

export default function Home() {
  const { observeElement } = useScrollAnimation()

  // Refs for animations
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const productsRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Observe elements for scroll animations
    if (heroRef.current) observeElement(heroRef.current, 'fade-in-up', 200)
    if (aboutRef.current) observeElement(aboutRef.current, 'fade-in-up', 100)
    if (productsRef.current) observeElement(productsRef.current, 'fade-in-up', 100)
    if (teamRef.current) observeElement(teamRef.current, 'fade-in-up', 100)
    if (contactRef.current) observeElement(contactRef.current, 'fade-in-up', 100)
  }, [observeElement])

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
        <div className="container flex items-center justify-between py-4">
          <div className="font-semibold text-xl gradient-text">
            ToMoreBeyond
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => smoothScrollTo('#about')}
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              私たちについて
            </button>
            <button 
              onClick={() => smoothScrollTo('#products')}
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              プロダクト
            </button>
            <button 
              onClick={() => smoothScrollTo('#team')}
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              チーム
            </button>
            <button 
              onClick={() => smoothScrollTo('#contact')}
              className="btn btn-primary"
            >
              お問い合わせ
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="section min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100"
      >
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            技術と情熱で、
            <span className="gradient-text block">より遠くへ</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            ToMoreBeyondは、革新的なモバイルアプリケーションの開発を通じて、
            社会に新たな価値を創造する東京発のテクノロジー企業です。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => smoothScrollTo('#products')}
              className="btn btn-primary"
            >
              製品を見る
            </button>
            <button 
              onClick={() => smoothScrollTo('#about')}
              className="btn btn-secondary"
            >
              詳しく知る
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              私たちについて
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              人々の可能性を最大限に引き出すテクノロジーを創造し、
              より良い未来の実現に貢献します。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'ミッション',
                description: '技術と情熱で、より遠くへ。革新的なソリューションを提供します。',
                icon: '🚀'
              },
              {
                title: 'ビジョン',
                description: '人々の可能性を最大限に引き出すテクノロジーを創造します。',
                icon: '💡'
              },
              {
                title: '価値観',
                description: '革新性、情熱、挑戦、品質を大切にしています。',
                icon: '⭐'
              }
            ].map((item, index) => (
              <div 
                key={item.title}
                className="card text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="card-content">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productsRef} id="products" className="section bg-neutral-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              プロダクト
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              最先端技術と人間中心設計を融合した、次世代のモバイルアプリケーション
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                id: 'tadataka',
                name: '忠嵩',
                nameEn: 'TADATAKA',
                description: '歴史と現代を繋ぐ、革新的な地図アプリケーション',
                status: '開発中',
                image: '/images/products/tadataka.jpg'
              },
              {
                id: 'toirun',
                name: 'TOI-RUN',
                nameEn: 'TOI-RUN',
                description: 'ランニングを楽しく継続するためのゲーミフィケーション・プラットフォーム',
                status: 'ベータ版',
                image: '/images/products/toirun.jpg'
              },
              {
                id: 'meet-in-the-middle',
                name: 'Meet in the middle',
                nameEn: 'MEET IN THE MIDDLE',
                description: '人と人を繋ぐ、新しい出会いのプラットフォーム',
                status: '開発中',
                image: '/images/products/meet-in-the-middle.jpg'
              }
            ].map((product, index) => (
              <div 
                key={product.id}
                className="card group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => window.location.href = `/products/${product.id}`}
              >
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                      {product.status}
                    </span>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-3 font-medium">
                    {product.nameEn}
                  </p>
                  <p className="text-neutral-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <button className="btn btn-ghost w-full">
                    詳細を見る
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} id="team" className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              チーム
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              ToMoreBeyondの優秀なチームメンバー
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 'yamada',
                name: '山田',
                nameEn: 'Yamada',
                position: 'Chief Design Officer',
                positionShort: 'CDO',
                bio: 'ユーザーエクスペリエンス設計のエキスパート。革新的なプロダクト体験を提供します。',
                image: '/yamada.jpg'
              },
              {
                id: 'masadome',
                name: '正留',
                nameEn: 'Masadome',
                position: 'Chief Executive Officer',
                positionShort: 'CEO',
                bio: 'テクノロジーベンチャー経営のスペシャリスト。戦略的ビジョンと実行力を兼ね備えます。',
                image: '/masadome.jpg'
              },
              {
                id: 'ando',
                name: '安藤',
                nameEn: 'Ando',
                position: 'Chief Technology Officer',
                positionShort: 'CTO',
                bio: 'フルスタック開発の専門家。スケーラブルで堅牢なシステムアーキテクチャを設計・構築します。',
                image: '/ando.jpg'
              }
            ].map((member, index) => (
              <div 
                key={member.id}
                className="card text-center group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => window.location.href = `/team/${member.id}`}
              >
                <div className="card-content">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                      {member.positionShort}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-2 font-medium">
                    {member.nameEn}
                  </p>
                  <p className="text-base text-neutral-600 font-medium mb-3">
                    {member.position}
                  </p>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="section bg-neutral-900 text-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              お問い合わせ
            </h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              ご質問・ご相談はお気軽にお問い合わせください
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">お気軽にご連絡ください</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">📧</span>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-neutral-300">contact@tomorebeyond.co</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">🌍</span>
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-neutral-300">Tokyo, Japan</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">⚡</span>
                  </div>
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-neutral-300">24時間以内</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-800 rounded-xl p-6">
              <form className="space-y-4" name="contact" method="POST" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                
                <div>
                  <label className="block text-sm font-medium mb-2">お名前 *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors" 
                    placeholder="山田太郎"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">メールアドレス *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors" 
                    placeholder="example@company.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">メッセージ *</label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    required 
                    className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors resize-none" 
                    placeholder="お気軽にお聞かせください..."
                  />
                </div>
                
                <button 
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  送信する
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-800 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ToMoreBeyond</h3>
              <p className="text-neutral-400">技術と情熱で、より遠くへ。</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">プロダクト</h4>
              <ul className="space-y-2 text-neutral-400 text-sm">
                <li>忠嵩 (TADATAKA)</li>
                <li>TOI-RUN</li>
                <li>Meet in the middle</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">リンク</h4>
              <ul className="space-y-2 text-neutral-400 text-sm">
                <li>
                  <button 
                    onClick={() => smoothScrollTo('#about')}
                    className="hover:text-white transition-colors"
                  >
                    会社概要
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => smoothScrollTo('#team')}
                    className="hover:text-white transition-colors"
                  >
                    チーム
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => smoothScrollTo('#contact')}
                    className="hover:text-white transition-colors"
                  >
                    お問い合わせ
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400 text-sm">
            <p>&copy; 2024 ToMoreBeyond Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}