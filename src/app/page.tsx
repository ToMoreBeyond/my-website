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
import { products } from '@/data/products'
import { teamMembers } from '@/data/team'
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
  createPremiumTextReveal,
  createSmoothParallax,
  createMagneticCursor,
  createFloatingAnimation,
  createStaggerFade,
  createSmoothCounter,
  initPremiumAnimations
} from '@/lib/premium-animations'
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
    // Initialize premium animations after component mount
    const timer = setTimeout(() => {
      // Premium text animations
      createPremiumTextReveal('.reveal-chars', { splitBy: 'chars', stagger: 0.02 })
      createPremiumTextReveal('.reveal-words', { splitBy: 'words', stagger: 0.08 })
      
      // Enhanced parallax
      createSmoothParallax('.parallax-slow', 0.2)
      createSmoothParallax('.parallax-medium', 0.4)
      createSmoothParallax('.parallax-fast', 0.6)
      
      // Magnetic interactions
      createMagneticCursor('.magnetic', 0.15)
      
      // Floating elements
      createFloatingAnimation('.floating', { distance: 15, duration: 4 })
      
      // Stagger fade animations
      createStaggerFade('.stagger-fade')
      
      // Counter animations
      createSmoothCounter('.counter')
      
      // Legacy animations
      createStaggerAnimation('.stagger-container')
      createImageReveal('.image-reveal', 'right')
      
      // Standard animations with parallax
      setTimeout(() => {
        // Basic parallax effects
        createSmoothParallax('.parallax-slow', 0.2)
        createSmoothParallax('.parallax-medium', 0.4)
        createSmoothParallax('.parallax-fast', 0.6)
        
        // Floating elements
        createFloatingAnimation('.floating', { distance: 15, duration: 4 })
        
        // Interactive animations
        createSmoothEntrance()
        createFloatingCards()
        createRotatingElements()
        createWaveAnimation()
        create3DTilt()
        createBounceEntrance()
        createTextScramble()
      }, 500)
    }, 300)

    return () => {
      clearTimeout(timer)
      cleanupScrollTriggers()
    }
  }, [])

  return (
    <>
      <FallingTextCursor />
      
      <div className="min-h-screen">
        {/* Navigation - Hamburger Menu Only */}
        <HamburgerMenu />

        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-olive-50 via-olive-100 to-olive-200"
        >
          {/* Enhanced Organic Background */}
          <div className="absolute inset-0">
            <div className="parallax-slow absolute inset-0" style={{
              background: 'linear-gradient(135deg, #f8f9f4 0%, #eef0e5 25%, #d9dfc8 50%, #b8c39f 75%, #8e9c78 100%)',
              backgroundSize: '400% 400%',
              animation: 'gradientFlow 12s ease infinite'
            }} />
            
            {/* Organic floating elements */}
            <div className="absolute inset-0">
              <div className="floating absolute top-1/4 left-1/4 w-40 h-40 bg-olive-600/10 rounded-blob blur-2xl animate-morph" />
              <div className="floating absolute top-1/2 right-1/3 w-32 h-32 bg-olive-400/15 rounded-blob blur-xl animate-float" />
              <div className="floating absolute bottom-1/3 left-1/2 w-56 h-56 bg-olive-500/8 rounded-blob blur-3xl animate-pulse-soft" />
            </div>
          </div>

          {/* 3D Geometric Shapes with Parallax */}
          <div className="parallax-slow">
            <GeometricShapes />
          </div>
          
          <div className="container text-center relative z-10">
            {/* Large Typography like internfes */}
            <motion.div
              className="flex flex-col items-center justify-center min-h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              {/* Company Logo Box with Refined Animation */}
              <motion.div
                className="bg-white/98 backdrop-blur-sm border border-olive-200/40 px-12 py-8 mb-12 cursor-hover"
                initial={{ scale: 0.8, opacity: 0, y: 60 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 1.5, delay: 0.6, type: "spring", stiffness: 60, damping: 15 }}
                style={{
                  borderRadius: 'var(--radius-pill)',
                  boxShadow: '0 20px 60px rgba(107, 123, 90, 0.12), 0 8px 30px rgba(107, 123, 90, 0.08)'
                }}
              >
                <Image
                  src="/images/logos/tomorebeyond-logo.png"
                  alt="ToMoreBeyond Logo"
                  width={500}
                  height={200}
                  className="max-w-full h-auto"
                  unoptimized
                />
              </motion.div>


              {/* Main Title with Serif Typography */}
              <motion.div
                className="mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <h1 className="font-serif text-hero font-normal text-olive-800 leading-none tracking-tight reveal-chars jp-optimized text-center">
                  <span className="block mb-6 text-olive-900">技術と情熱で、</span>
                  <span className="block font-semibold text-transparent bg-clip-text bg-gradient-to-r from-olive-600 via-olive-500 to-olive-700">
                    より遠くへ
                  </span>
                </h1>
              </motion.div>

              {/* Hidden SEO Keywords */}
              <div className="sr-only">
                <h2>ToMoreBeyond（トモビ・TMB）について</h2>
                <p>忠嵩（TADATAKA）地図アプリ、TOI-RUNランニングアプリ、Meet in the middle出会いアプリを開発</p>
                <p>東京のモバイルアプリ開発会社、スマートフォンアプリ制作、ゲーミフィケーション</p>
              </div>

              {/* Description */}
              <motion.p
                className="text-xl md:text-2xl text-olive-700 max-w-5xl leading-relaxed mb-16 font-sans"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 2.0 }}
              >
                革新的なモバイルアプリケーションの開発を通じて、<br />
                社会に新たな価値を創造する東京発のテクノロジー企業です。
              </motion.p>

              {/* Refined Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-8"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2.6 }}
              >
                <motion.button
                  onClick={() => smoothScrollTo('#products')}
                  className="cursor-hover bg-olive-600 hover:bg-olive-700 text-white px-16 py-5 text-lg font-semibold relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    borderRadius: 'var(--radius-pill)',
                    boxShadow: '0 8px 32px rgba(72, 92, 17, 0.3)'
                  }}
                >
                  <span className="relative z-10">製品を見る</span>
                </motion.button>
                
                <motion.button
                  onClick={() => smoothScrollTo('#about')}
                  className="cursor-hover bg-transparent border-2 border-olive-600 text-olive-700 hover:bg-olive-600 hover:text-white px-16 py-5 text-lg font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    borderRadius: 'var(--radius-pill)'
                  }}
                >
                  <span className="relative z-10">詳しく知る</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-olive-600/80"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm font-medium tracking-wide">Scroll</span>
              <div className="w-[2px] h-12 bg-gradient-to-b from-olive-600/80 to-transparent rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* About Section with Organic Flow */}
        <section id="about" className="section relative overflow-hidden" style={{
          background: 'linear-gradient(180deg, #b8c39f 0%, #eef0e5 20%, #f8f9f4 40%, #ffffff 60%, #f8f9f4 80%, #eef0e5 100%)',
          paddingTop: 'clamp(6rem, 12vw, 10rem)',
          paddingBottom: 'clamp(6rem, 12vw, 10rem)'
        }}>
          {/* Organic Background Elements */}
          <div className="absolute inset-0">
            <div className="parallax-slow absolute top-20 left-10 w-80 h-80 bg-olive-400/8 rounded-blob blur-3xl animate-morph" />
            <div className="parallax-medium absolute bottom-20 right-10 w-96 h-96 bg-olive-300/6 rounded-blob blur-3xl animate-float" />
            <div className="floating absolute top-1/2 left-1/2 w-64 h-64 bg-olive-500/5 rounded-blob blur-2xl animate-pulse-soft" />
          </div>

          <div className="container relative z-10">
            <div className="text-center mb-24">
              <motion.h2 
                className="font-serif text-display md:text-hero font-semibold text-olive-800 mb-12 reveal-words"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                私たちについて
              </motion.h2>
              <motion.p 
                className="text-2xl text-olive-600 max-w-4xl mx-auto leading-relaxed font-sans"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.3 }}
                viewport={{ once: true }}
              >
                人々の可能性を最大限に引き出すテクノロジーを創造し、<br />
                より良い未来の実現に貢献します。
              </motion.p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
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
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 60,
                      damping: 15
                    }}
                    viewport={{ once: true, margin: "-80px" }}
                    className="group text-center"
                  >
                    <div className="bg-white/70 backdrop-blur-sm border border-olive-200/50 hover:border-olive-300/60 transition-all duration-500 h-full" style={{
                      borderRadius: 'var(--radius-3xl)',
                      padding: 'clamp(2rem, 4vw, 3rem)',
                      boxShadow: '0 8px 32px rgba(107, 123, 90, 0.08)'
                    }}>
                      <motion.div 
                        className="text-5xl mb-8"
                        animate={{ 
                          rotate: [0, 3, -3, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 6,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: index * 0.5
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="text-2xl font-serif font-semibold text-olive-800 mb-6">
                        {item.title}
                      </h3>
                      <p className="text-olive-600 leading-loose font-sans text-lg">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Products Section with Gradient Flow */}
        <section id="products" className="section relative overflow-hidden" style={{
          background: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 20%, #bae6fd 40%, #38bdf8 60%, #0284c7 80%, #075985 100%)'
        }}>
          <div className="container">
            <div className="text-center mb-20">
              <motion.h2 
                className="font-display text-5xl md:text-6xl lg:text-hero font-black text-neutral-900 mb-8 reveal-words"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
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

            <div className="grid lg:grid-cols-3 gap-8">
              {products.map((product, index) => {
                const productColors = {
                  'tadataka': 'from-blue-500 to-cyan-500',
                  'toirun': 'from-emerald-500 to-green-500',
                  'meet-in-the-middle': 'from-purple-500 to-pink-500'
                }
                const productColor = productColors[product.id as keyof typeof productColors] || 'from-gray-500 to-gray-600'
                return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 100, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ y: -15, scale: 1.03 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 80
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  onClick={() => window.location.href = `/products/${product.id}`}
                  className="group cursor-pointer transform-gpu"
                  style={{ perspective: "1000px" }}
                >
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/60">
                    <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-115"
                      unoptimized
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${productColor} opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
                    
                    <motion.div 
                      className="absolute top-4 right-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-800 text-sm rounded-full font-medium shadow-lg">
                        {product.status === 'in-development' ? '開発中' : product.status === 'beta' ? 'ベータ版' : 'リリース済'}
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
                      {product.tagline}
                    </p>
                    
                      <motion.div
                        className="btn btn-ghost w-full"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        詳細を見る →
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section with Smooth Gradient */}
        <section id="team" className="section relative overflow-hidden" style={{
          background: 'linear-gradient(180deg, #075985 0%, #0891b2 20%, #06b6d4 40%, #67e8f9 60%, #a5f3fc 80%, #f0fdfa 100%)'
        }}>
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

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  whileHover={{ y: -10, rotate: 2 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.12,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                  onClick={() => window.location.href = `/team/${member.id}`}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center border border-white/50">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                      </div>
                    </div>
                    
                    <motion.div 
                      className="mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-medium rounded-full">
                        {member.positionEn}
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section with Dark Gradient */}
        <section id="contact" className="section text-white relative overflow-hidden" style={{
          background: 'linear-gradient(180deg, #f0fdfa 0%, #cffafe 10%, #5eead4 30%, #10b981 50%, #047857 70%, #064e3b 90%, #022c22 100%)'
        }}>
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
        <footer className="text-white py-16 relative overflow-hidden -mt-1" style={{
          background: 'linear-gradient(180deg, #022c22 0%, #064e3b 25%, #065f46 50%, #047857 75%, #10b981 90%, #134e4a 100%)'
        }}>
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
            
          </div>
        </footer>
      </div>
    </>
  )
}