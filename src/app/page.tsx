'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { Header } from '@/components/layout/Header'
// import { ParticleField } from '@/components/effects/ParticleField'
import { smoothScrollTo } from '@/lib/animations'
import { Mail, Globe, Zap } from 'lucide-react'
import { products } from '@/data/products'
import { teamMembers } from '@/data/team'
import { cleanupScrollTriggers } from '@/lib/scroll-animations'
import { createPremiumTextReveal, createSmoothParallax } from '@/lib/premium-animations'
import { createSmoothEntrance, createFloatingCards, create3DTilt, createTextScramble } from '@/lib/interactive-scroll'
import { MarqueeText } from '@/components/effects/MarqueeText'
import { VisionSection } from '@/components/sections/VisionSection'
import { FullBleedBand } from '@/components/sections/FullBleedBand'
import { AngledDivider } from '@/components/sections/AngledDivider'

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    // Initialize lightweight animations with guards
    const timer = setTimeout(() => {
      // Text animations are light; keep them
      createPremiumTextReveal('.reveal-chars', { splitBy: 'chars', stagger: 0.02 })
      createPremiumTextReveal('.reveal-words', { splitBy: 'words', stagger: 0.06 })

      // Skip heavy effects on mobile or when reduced motion
      if (prefersReduced || isMobile) return

      // Parallax (single init)
      createSmoothParallax('.parallax-slow', 0.2)
      createSmoothParallax('.parallax-medium', 0.35)
      createSmoothParallax('.parallax-fast', 0.5)

      // Interactive animations (subset)
      createSmoothEntrance()
      createFloatingCards()
      create3DTilt()
      createTextScramble()
    }, 300)

    return () => {
      clearTimeout(timer)
      cleanupScrollTriggers()
    }
  }, [])

  // Header tint handled in shared Header component

  return (
    <>
      <Header />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* No floating decorations for a cleaner, static hero background */}
          
          <div className="container text-center relative z-10">
            {/* Large Typography like internfes */}
            <motion.div
              className="flex flex-col items-center justify-center min-h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              {/* Large centered logo removed; focus on bold typography */}


              {/* Main Title with Serif Typography */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-olive-900 leading-tight tracking-tight reveal-chars jp-optimized text-center">
                  埋もれた記録と眠る資源を、
                  <br className="hidden md:block" />
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-olive-700 to-emerald-600">
                    一生続く面白さの循環へ。
                  </span>
                </h1>
                <p className="mt-6 text-xl md:text-2xl text-olive-700 max-w-4xl mx-auto leading-relaxed">
                  デジタル（アプリ）とリアル（拠点・家具）を横断し、日常に“続く面白さ”を研究・実装する会社です。
                </p>
              </motion.div>

              {/* Flowing marquee tagline */}
              <MarqueeText 
                text="埋もれた記録と眠る資源を、一生続く面白さの循環へ。"
                speed={90}
                className="text-olive-700/80 font-semibold text-lg md:text-xl"
                separator=" ⸻ "
              />

              {/* Hidden SEO block removed for cleaner corporate tone */}

              {/* Description replaced by the Vision tagline above */}
              <div className="mb-8" />

              {/* Refined Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-8 mb-20"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 2.6 }}
              >
                <motion.button
                  onClick={() => smoothScrollTo('#products')}
                  className="cursor-hover bg-white/95 backdrop-blur-sm border-2 border-olive-600 text-olive-800 hover:bg-olive-600 hover:text-white px-16 py-5 text-lg font-bold relative overflow-hidden shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    borderRadius: 'var(--radius-pill)',
                    boxShadow: '0 8px 32px rgba(72, 92, 17, 0.2), 0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <span className="relative z-10 font-bold">製品を見る</span>
                </motion.button>
                
                <motion.button
                  onClick={() => smoothScrollTo('#about')}
                  className="cursor-hover bg-white/90 backdrop-blur-sm border-2 border-olive-600 text-olive-700 hover:bg-olive-600 hover:text-white px-16 py-5 text-lg font-semibold transition-all duration-300 shadow-md"
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

          {/* Scroll Indicator - moved down to avoid button overlap */}
          <motion.div
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-olive-600/80"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm font-medium tracking-wide">Scroll</span>
              <div className="w-[2px] h-12 bg-gradient-to-b from-olive-600/80 to-transparent rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Full-bleed flowing band to guide scroll */}
        <FullBleedBand text="ToMoreBeyond Vision — 埋もれた記録と眠る資源を、一生続く面白さの循環へ。" speed={85} />
        {/* Light angled divider into Vision */}
        <AngledDivider direction="down" tone="light" height={96} />

        {/* Vision Section (replaces previous About) */}
        <VisionSection />

        {/* Exit Vision with angled divider */}
        <AngledDivider direction="up" tone="light" height={96} />
        {/* Bridging band before products */}
        <FullBleedBand text="Products — プロダクト — 最先端と人間中心設計" speed={80} />
        <AngledDivider direction="down" tone="light" height={96} />

        {/* Products Section with Seamless Flow */}
        <section id="products" className="section relative overflow-hidden" style={{
          paddingTop: 'clamp(4rem, 8vw, 8rem)',
          paddingBottom: 'clamp(4rem, 8vw, 8rem)'
        }}>
          <div className="container">
            <div className="text-center mb-20 relative">
              <div className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none select-none">
                <div className="text-[64px] lg:text-[104px] font-black tracking-tight text-neutral-900/5">
                  PRODUCTS
                </div>
              </div>
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
                className="text-2xl text-neutral-700 max-w-4xl mx-auto mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                日常に“続く面白さ”を実装するためのプロダクト群
              </motion.p>
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
                  'tadataka': 'from-olive-500 to-olive-600',
                  'toirun': 'from-olive-400 to-olive-500',
                  'meet-in-the-middle': 'from-olive-600 to-olive-700'
                }
                const productColor = productColors[product.id as keyof typeof productColors] || 'from-olive-500 to-olive-600'
                
                const cardAnimations = [
                  { 
                    initial: { opacity: 0, x: -100, rotateY: -30 }, 
                    animate: { opacity: 1, x: 0, rotateY: 0 },
                    hover: { x: 8, rotateY: 5 }
                  },
                  { 
                    initial: { opacity: 0, y: 80, scale: 0.8 }, 
                    animate: { opacity: 1, y: 0, scale: 1 },
                    hover: { y: -12, scale: 1.04 }
                  },
                  { 
                    initial: { opacity: 0, x: 100, rotateY: 30 }, 
                    animate: { opacity: 1, x: 0, rotateY: 0 },
                    hover: { x: -8, rotateY: -5 }
                  }
                ];
                const animation = cardAnimations[index % cardAnimations.length];
                
                return (
                <motion.div
                  key={product.id}
                  initial={animation.initial}
                  whileInView={animation.animate}
                  whileHover={animation.hover}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 60,
                    damping: 15
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

        {/* Transition from Products to Team */}
        <AngledDivider direction="up" tone="light" height={96} />
        <FullBleedBand text="Team — チーム — 多様な視点で面白さを育てる" speed={80} />
        <AngledDivider direction="down" tone="light" height={96} />

        {/* Team Section with Continuous Flow */}
        <section id="team" className="section relative overflow-hidden" style={{
          paddingTop: 'clamp(4rem, 8vw, 8rem)',
          paddingBottom: 'clamp(4rem, 8vw, 8rem)'
        }}>
          <div className="container">
            <div className="text-center mb-16 relative">
              <div className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none select-none">
                <div className="text-[64px] lg:text-[104px] font-black tracking-tight text-neutral-900/5">
                  TEAM
                </div>
              </div>
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
                className="text-2xl text-neutral-700 max-w-4xl mx-auto mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                日常に“続く面白さ”を実装する、フルスタックな少数精鋭チーム
              </motion.p>
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
              {teamMembers.map((member, index) => {
                const teamAnimations = [
                  { 
                    initial: { opacity: 0, y: -60, rotateX: 45 }, 
                    animate: { opacity: 1, y: 0, rotateX: 0 },
                    hover: { y: -8, rotateX: -5 }
                  },
                  { 
                    initial: { opacity: 0, scale: 0.5, rotate: 15 }, 
                    animate: { opacity: 1, scale: 1, rotate: 0 },
                    hover: { scale: 1.05, rotate: -2 }
                  },
                  { 
                    initial: { opacity: 0, y: 80, x: 40 }, 
                    animate: { opacity: 1, y: 0, x: 0 },
                    hover: { y: -6, x: -4 }
                  }
                ];
                const animation = teamAnimations[index % teamAnimations.length];
                
                return (
                <motion.div
                  key={member.id}
                  initial={animation.initial}
                  whileInView={animation.animate}
                  whileHover={animation.hover}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 80,
                    damping: 12
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
                )
              })}
            </div>
          </div>
        </section>

        {/* Transition from Team to Contact */}
        <AngledDivider direction="up" tone="light" height={96} />
        <FullBleedBand text="Contact — お問い合わせ — Let’s talk" speed={78} />
        <AngledDivider direction="down" tone="light" height={96} />

        {/* Contact Section with Rich Gradient */}
        <section id="contact" className="section relative overflow-hidden" style={{
          paddingTop: 'clamp(4rem, 8vw, 8rem)',
          paddingBottom: 'clamp(4rem, 8vw, 8rem)'
        }}>
          {/* Decorative particle background removed to reduce load */}
          
          <div className="container relative z-10">
            <div className="text-center mb-16 relative">
              <div className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none select-none">
                <div className="text-[64px] lg:text-[104px] font-black tracking-tight text-neutral-900/5">
                  CONTACT
                </div>
              </div>
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 reveal-text"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span>お問い合わせ</span>
              </motion.h2>
              <motion.p 
                className="text-2xl text-neutral-700 max-w-4xl mx-auto mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                プロダクト・採用・コラボなど、お気軽にご連絡ください
              </motion.p>
              <motion.p 
                className="text-xl text-neutral-700 max-w-3xl mx-auto reveal-text"
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
                    { Icon: Mail, label: 'Email', value: 'contact@tomorebeyond.co' },
                    { Icon: Globe, label: 'Location', value: 'Tokyo, Japan' },
                    { Icon: Zap, label: 'Response Time', value: '24時間以内' },
                  ].map((item, index) => (
                    <motion.div 
                      key={item.label}
                      className="flex items-center gap-4 magnetic"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <item.Icon className="w-6 h-6 text-white align-middle" strokeWidth={1.9} />
                      </div>
                      <div>
                        <p className="font-bold text-black">{item.label}</p>
                        <p className="font-bold text-black">{item.value}</p>
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

        {/* FAQ section removed: keep home concise and editorial */}

        {/* Footer */}
        <footer className="text-neutral-800 py-16 relative overflow-hidden">
          <div className="container relative z-10">
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <motion.a
                  href="#about"
                  onClick={(e) => { e.preventDefault(); smoothScrollTo('#about'); }}
                  className="block group"
                >
                  <h3 className="text-xl font-semibold mb-2 magnetic group-hover:text-neutral-900 transition-colors">ToMoreBeyond（トモビ）</h3>
                  <p className="text-neutral-600 group-hover:text-neutral-800 transition-colors">東京拠点のモバイルアプリ開発企業。技術と情熱で、より遠くへ。</p>
                </motion.a>
              </motion.div>
              
              <div>
                <h4 className="font-medium mb-4">
                  <motion.a
                    href="#products"
                    onClick={(e) => { e.preventDefault(); smoothScrollTo('#products'); }}
                    className="hover:text-neutral-900 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    プロダクト
                  </motion.a>
                </h4>
                <ul className="space-y-2 text-neutral-600 text-sm">
                  {[
                    { label: '忠嵩 (TADATAKA)', href: '/products/tadataka' },
                    { label: 'TOI-RUN', href: '/products/toirun' },
                    { label: 'Meet in the middle', href: '/products/meet-in-the-middle' },
                  ].map((product) => (
                    <motion.li key={product.href} className="magnetic" whileHover={{ x: 5 }}>
                      <a href={product.href} className="hover:text-neutral-800 transition-colors">
                        {product.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">リンク</h4>
                <ul className="space-y-2 text-neutral-600 text-sm">
                  {[
                    { label: '会社概要', target: '#about' },
                    { label: 'チーム', target: '#team' },
                    { label: 'お問い合わせ', target: '#contact' },
                  ].map((link) => (
                    <motion.li key={link.label}>
                      <motion.a
                        href={link.target}
                        onClick={(e) => { e.preventDefault(); smoothScrollTo(link.target); }}
                        className="hover:text-neutral-800 transition-colors magnetic inline-block"
                        whileHover={{ x: 5 }}
                      >
                        {link.label}
                      </motion.a>
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
