'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FallingTextCursor } from '@/components/ui/FallingTextCursor'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { GeometricShapes } from '@/components/ui/GeometricShapes'
import { HamburgerMenu } from '@/components/ui/HamburgerMenu'
import { ParticleField } from '@/components/effects/ParticleField'
import { smoothScrollTo } from '@/lib/animations'
import {
  createTextReveal,
  createParallax,
  createMagneticHover,
  createStaggerAnimation,
  createImageReveal,
  createCounterAnimation,
  cleanupScrollTriggers
} from '@/lib/scroll-animations'
import {
  createSmoothEntrance,
  createFloatingCards,
  createRotatingElements,
  createWaveAnimation,
  create3DTilt,
  createBounceEntrance,
  createTextScramble
} from '@/lib/interactive-scroll'

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Initialize scroll animations after component mount with proper delays
    const timer = setTimeout(() => {
      // Text reveal animations with smooth timing
      setTimeout(() => createTextReveal('.reveal-text'), 300)
      
      // Parallax backgrounds - subtle movement
      createParallax('.parallax-bg', 0.3)
      createParallax('.parallax-slow', 0.15)
      
      // Magnetic hover effects - reduced strength
      createMagneticHover('.magnetic', 0.1)
      
      // Stagger animations for card grids with delay
      setTimeout(() => createStaggerAnimation('.stagger-container'), 500)
      
      // Image reveals
      createImageReveal('.image-reveal', 'right')
      
      // Counter animations with delay
      setTimeout(() => createCounterAnimation('.counter'), 800)
      
      // Interactive scroll animations
      setTimeout(() => {
        createSmoothEntrance()
        createFloatingCards()
        createRotatingElements()
        createWaveAnimation()
        create3DTilt()
        createBounceEntrance()
        createTextScramble()
      }, 1000)
    }, 500) // Increased initial delay for smoother load

    return () => {
      clearTimeout(timer)
      cleanupScrollTriggers()
    }
  }, [])

  return (
    <>
      <FallingTextCursor />
      
      <div className="min-h-screen overflow-hidden">
        {/* Navigation - Hamburger Menu Only */}
        <HamburgerMenu />

        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background - internfes style */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-800 to-emerald-600" />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 via-transparent to-cyan-400/20" />
          </div>

          {/* 3D Geometric Shapes */}
          <GeometricShapes />
          
          <div className="container text-center relative z-10">
            {/* Large Typography like internfes */}
            <motion.div
              className="flex flex-col items-center justify-center min-h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              {/* Company Name Box */}
              <motion.div
                className="bg-white/95 backdrop-blur-sm border-4 border-gray-300 p-8 mb-8 transform -rotate-2"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: -2 }}
                transition={{ duration: 1.2, delay: 0.8, type: "spring", stiffness: 100 }}
                style={{
                  boxShadow: '20px 20px 60px rgba(0,0,0,0.3)'
                }}
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-emerald-600 tracking-tight">
                  TMB
                </h1>
              </motion.div>

              {/* Subtitle Box */}
              <motion.div
                className="bg-white/90 backdrop-blur-sm border-4 border-gray-300 px-6 py-3 transform rotate-1 mb-12"
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 1 }}
                transition={{ duration: 1.2, delay: 1.2, type: "spring", stiffness: 100 }}
                style={{
                  boxShadow: '15px 15px 40px rgba(0,0,0,0.2)'
                }}
              >
                <p className="text-xl md:text-2xl text-gray-800 font-semibold">
                  モバイルアプリケーション開発企業
                </p>
              </motion.div>

              {/* Main Title */}
              <motion.h2
                className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                style={{
                  textShadow: '4px 4px 20px rgba(0,0,0,0.5)'
                }}
              >
                技術と情熱で、
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  より遠くへ
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                className="text-xl md:text-2xl text-white/90 max-w-4xl leading-relaxed mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 2.2 }}
                style={{
                  textShadow: '2px 2px 10px rgba(0,0,0,0.5)'
                }}
              >
                革新的なモバイルアプリケーションの開発を通じて、<br />
                社会に新たな価値を創造する東京発のテクノロジー企業です。
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2.8 }}
              >
                <motion.button
                  onClick={() => smoothScrollTo('#products')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: '0 15px 35px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  製品を見る
                </motion.button>
                
                <motion.button
                  onClick={() => smoothScrollTo('#about')}
                  className="bg-white/20 border-3 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-6 text-xl font-bold rounded-2xl backdrop-blur-md shadow-2xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  詳しく知る
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm">Scroll</span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="section bg-white relative overflow-hidden scroll-section curtain-section skew-element">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl parallax-layer-2" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl parallax-layer-3" />
          </div>

          <div className="container relative z-10">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 reveal-text"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                私たちについて
              </motion.h2>
              <motion.p 
                className="text-xl text-neutral-600 max-w-3xl mx-auto reveal-text"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                人々の可能性を最大限に引き出すテクノロジーを創造し、
                より良い未来の実現に貢献します。
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 stagger-container">
              {[
                {
                  title: 'ミッション',
                  description: '技術と情熱で、より遠くへ。革新的なソリューションを提供します。',
                  icon: '🚀',
                  gradient: 'from-blue-500 to-purple-500'
                },
                {
                  title: 'ビジョン',
                  description: '人々の可能性を最大限に引き出すテクノロジーを創造します。',
                  icon: '💡',
                  gradient: 'from-emerald-500 to-blue-500'
                },
                {
                  title: '価値観',
                  description: '革新性、情熱、挑戦、品質を大切にしています。',
                  icon: '⭐',
                  gradient: 'from-yellow-500 to-emerald-500'
                }
              ].map((item, index) => (
                <InteractiveCard
                  key={item.title}
                  className="text-center"
                  intensity={1.2}
                >
                  <div className="card-content relative">
                    <motion.div 
                      className="text-6xl mb-6"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Gradient Border */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl -z-10`} />
                  </div>
                </InteractiveCard>
              ))}
            </div>

            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 stagger-container"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { label: 'Projects', value: '50', suffix: '+' },
                { label: 'Clients', value: '100', suffix: '+' },
                { label: 'Years', value: '5', suffix: '+' },
                { label: 'Awards', value: '15', suffix: '+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    <span className="counter">{stat.value}</span>{stat.suffix}
                  </div>
                  <div className="text-neutral-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="section bg-neutral-50 relative overflow-hidden scroll-section curtain-section">
          <div className="container">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 reveal-text"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                プロダクト
              </motion.h2>
              <motion.p 
                className="text-xl text-neutral-600 max-w-3xl mx-auto reveal-text"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                最先端技術と人間中心設計を融合した、次世代のモバイルアプリケーション
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 stagger-container">
              {[
                {
                  id: 'tadataka',
                  name: '忠嵩',
                  nameEn: 'TADATAKA',
                  description: '歴史と現代を繋ぐ、革新的な地図アプリケーション',
                  status: '開発中',
                  image: '/images/products/tadataka.jpg',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  id: 'toirun',
                  name: 'TOI-RUN',
                  nameEn: 'TOI-RUN',
                  description: 'ランニングを楽しく継続するためのゲーミフィケーション・プラットフォーム',
                  status: 'ベータ版',
                  image: '/images/products/toirun.jpg',
                  color: 'from-emerald-500 to-green-500'
                },
                {
                  id: 'meet-in-the-middle',
                  name: 'Meet in the middle',
                  nameEn: 'MEET IN THE MIDDLE',
                  description: '人と人を繋ぐ、新しい出会いのプラットフォーム',
                  status: '開発中',
                  image: '/images/products/meet-in-the-middle.jpg',
                  color: 'from-purple-500 to-pink-500'
                }
              ].map((product, index) => (
                <InteractiveCard
                  key={product.id}
                  onClick={() => window.location.href = `/products/${product.id}`}
                  className="group overflow-hidden bg-white rounded-xl"
                  intensity={1.5}
                >
                  <div className="relative h-64 overflow-hidden image-reveal">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    <motion.div 
                      className="absolute top-4 right-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="px-3 py-1 bg-primary text-white text-sm rounded-full font-medium">
                        {product.status}
                      </span>
                    </motion.div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-2 magnetic">
                      {product.name}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-4 font-medium">
                      {product.nameEn}
                    </p>
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <motion.div
                      className="btn btn-ghost w-full magnetic"
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      詳細を見る →
                    </motion.div>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="section bg-white relative overflow-hidden scroll-section skew-element">
          <div className="container">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 reveal-text"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                チーム
              </motion.h2>
              <motion.p 
                className="text-xl text-neutral-600 max-w-3xl mx-auto reveal-text"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                ToMoreBeyondの優秀なチームメンバー
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 stagger-container">
              {[
                {
                  id: 'yamada',
                  name: '山田',
                  nameEn: 'Yamada',
                  position: 'Chief Design Officer',
                  positionShort: 'CDO',
                  bio: 'ユーザーエクスペリエンス設計のエキスパート。革新的なプロダクト体験を提供します。',
                  image: '/images/team/yamada.jpg',
                  color: 'from-blue-500 to-purple-500'
                },
                {
                  id: 'masadome',
                  name: '正留',
                  nameEn: 'Masadome',
                  position: 'Chief Executive Officer',
                  positionShort: 'CEO',
                  bio: 'テクノロジーベンチャー経営のスペシャリスト。戦略的ビジョンと実行力を兼ね備えます。',
                  image: '/images/team/masadome.jpg',
                  color: 'from-emerald-500 to-blue-500'
                },
                {
                  id: 'ando',
                  name: '安藤',
                  nameEn: 'Ando',
                  position: 'Chief Technology Officer',
                  positionShort: 'CTO',
                  bio: 'フルスタック開発の専門家。スケーラブルで堅牢なシステムアーキテクチャを設計・構築します。',
                  image: '/images/team/ando.jpg',
                  color: 'from-yellow-500 to-emerald-500'
                }
              ].map((member, index) => (
                <InteractiveCard
                  key={member.id}
                  onClick={() => window.location.href = `/team/${member.id}`}
                  className="text-center group"
                  intensity={1.3}
                >
                  <div className="card-content">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          unoptimized
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${member.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      </div>
                    </div>
                    
                    <motion.div 
                      className="mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className={`px-4 py-2 bg-gradient-to-r ${member.color} text-white text-sm font-medium rounded-full`}>
                        {member.positionShort}
                      </span>
                    </motion.div>
                    
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-2 magnetic">
                      {member.name}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-2 font-medium">
                      {member.nameEn}
                    </p>
                    <p className="text-base text-neutral-600 font-medium mb-4">
                      {member.position}
                    </p>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section bg-neutral-900 text-white relative overflow-hidden">
          <ParticleField 
            particleCount={60} 
            colors={['#10b981', '#34d399', '#6ee7b7']}
            className="opacity-30"
          />
          
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 reveal-text"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                お問い合わせ
              </motion.h2>
              <motion.p 
                className="text-xl text-neutral-300 max-w-3xl mx-auto reveal-text"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                ご質問・ご相談はお気軽にお問い合わせください
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-6">お気軽にご連絡ください</h3>
                
                <div className="space-y-4">
                  {[
                    { icon: '📧', label: 'Email', value: 'contact@tomorebeyond.co' },
                    { icon: '🌍', label: 'Location', value: 'Tokyo, Japan' },
                    { icon: '⚡', label: 'Response Time', value: '24時間以内' },
                  ].map((item, index) => (
                    <motion.div 
                      key={item.label}
                      className="flex items-center gap-4 magnetic"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">{item.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-neutral-300">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <InteractiveCard 
                className="bg-neutral-800 rounded-xl p-6"
                intensity={0.8}
              >
                <form className="space-y-4" name="contact" method="POST" data-netlify="true">
                  <input type="hidden" name="form-name" value="contact" />
                  
                  {[
                    { label: 'お名前', type: 'text', name: 'name', placeholder: '山田太郎' },
                    { label: 'メールアドレス', type: 'email', name: 'email', placeholder: 'example@company.com' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-2">{field.label} *</label>
                      <motion.input
                        type={field.type}
                        name={field.name}
                        required
                        className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary transition-all duration-300"
                        placeholder={field.placeholder}
                        whileFocus={{ scale: 1.02 }}
                      />
                    </div>
                  ))}
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">メッセージ *</label>
                    <motion.textarea
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-primary transition-all duration-300 resize-none"
                      placeholder="お気軽にお聞かせください..."
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 magnetic"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    送信する
                  </motion.button>
                </form>
              </InteractiveCard>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-neutral-800 text-white py-12 relative overflow-hidden">
          <div className="container relative z-10">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4 magnetic">ToMoreBeyond</h3>
                <p className="text-neutral-400">技術と情熱で、より遠くへ。</p>
              </motion.div>
              
              <div>
                <h4 className="font-medium mb-4">プロダクト</h4>
                <ul className="space-y-2 text-neutral-400 text-sm">
                  {['忠嵩 (TADATAKA)', 'TOI-RUN', 'Meet in the middle'].map((product) => (
                    <motion.li 
                      key={product}
                      className="magnetic"
                      whileHover={{ x: 5 }}
                    >
                      {product}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">リンク</h4>
                <ul className="space-y-2 text-neutral-400 text-sm">
                  {[
                    { label: '会社概要', target: '#about' },
                    { label: 'チーム', target: '#team' },
                    { label: 'お問い合わせ', target: '#contact' },
                  ].map((link) => (
                    <motion.li key={link.label}>
                      <motion.button
                        onClick={() => smoothScrollTo(link.target)}
                        className="hover:text-white transition-colors magnetic"
                        whileHover={{ x: 5 }}
                      >
                        {link.label}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
            
            <motion.div 
              className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <p>&copy; 2024 ToMoreBeyond Inc. All rights reserved.</p>
            </motion.div>
          </div>
        </footer>
      </div>
    </>
  )
}