'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import Image from 'next/image';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <>
      <Header />
      
      {/* Hero Section - Professional */}
      <motion.section 
        id="hero" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
        style={{ y: yHero, opacity: opacityHero }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.8) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />
        </div>
        
        <div className="container-custom text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-600 bg-clip-text text-transparent">
                ToMoreBeyond
              </span>
            </motion.h1>
            
            <motion.p
              className="text-2xl md:text-3xl lg:text-4xl mb-8 text-gray-300 font-light"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              技術と情熱で、より遠くへ
            </motion.p>
            
            <motion.p
              className="text-lg md:text-xl lg:text-2xl mb-12 text-gray-400 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              革新的なモバイルアプリケーションの開発を通じて、
              社会に新たな価値を創造します。
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.button 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                製品を見る
              </motion.button>
              
              <motion.button 
                className="px-8 py-4 border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900 font-semibold rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                お問い合わせ
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section - Professional */}
      <section id="company" className="py-20 lg:py-32 bg-white relative overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              私たちについて
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              ToMoreBeyondは、テクノロジーの力で人々の生活をより豊かにすることを使命とする東京発のテクノロジー企業です。
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "ミッション",
                content: "技術と情熱で、より遠くへ。革新的なソリューションを提供します。",
                icon: "🚀"
              },
              {
                title: "ビジョン", 
                content: "人々の可能性を最大限に引き出すテクノロジーを創造します。",
                icon: "💡"
              },
              {
                title: "価値観",
                content: "革新性、情熱、挑戦、品質を大切にしています。",
                icon: "⭐"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Section - Professional */}
      <section id="products" className="py-20 lg:py-32 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              プロダクト
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              最先端技術と人間中心設計を融合した、次世代のモバイルアプリケーション
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                id: "tadataka",
                name: "忠嵩",
                nameEn: "TADATAKA",
                description: "歴史と現代を繋ぐ、革新的な地図アプリケーション",
                status: "開発中",
                image: "/images/products/tadataka.jpg"
              },
              {
                id: "toirun",
                name: "TOI-RUN",
                nameEn: "TOI-RUN",
                description: "ランニングを楽しく継続するためのゲーミフィケーション・プラットフォーム",
                status: "ベータ版",
                image: "/images/products/toirun.jpg"
              },
              {
                id: "meet-in-the-middle",
                name: "Meet in the middle",
                nameEn: "MEET IN THE MIDDLE",
                description: "人と人を繋ぐ、新しい出会いのプラットフォーム",
                status: "開発中",
                image: "/images/products/meet-in-the-middle.jpg"
              }
            ].map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => window.location.href = `/products/${product.id}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                      {product.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 font-mono">{product.nameEn}</p>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  
                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                      詳細を見る
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Professional */}
      <section id="team" className="py-20 lg:py-32 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              チーム
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              ToMoreBeyondの優秀なチームメンバー
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "yamada",
                name: "山田",
                nameEn: "Yamada",
                position: "Chief Design Officer",
                positionShort: "CDO",
                bio: "ユーザーエクスペリエンス設計のエキスパート。革新的なプロダクト体験を提供します。",
                image: "/images/team/yamada.jpg"
              },
              {
                id: "masadome",
                name: "正留",
                nameEn: "Masadome", 
                position: "Chief Executive Officer",
                positionShort: "CEO",
                bio: "テクノロジーベンチャー経営のスペシャリスト。戦略的ビジョンと実行力を兼ね備えます。",
                image: "/images/team/masadome.jpg"
              },
              {
                id: "ando",
                name: "安藤",
                nameEn: "Ando",
                position: "Chief Technology Officer", 
                positionShort: "CTO",
                bio: "フルスタック開発の専門家。スケーラブルで堅牢なシステムアーキテクチャを設計・構築します。",
                image: "/images/team/ando.jpg"
              }
            ].map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => window.location.href = `/team/${member.id}`}
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                    {member.positionShort}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-4 font-mono">{member.nameEn}</p>
                <p className="text-lg text-gray-600 font-medium mb-4">{member.position}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                
                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    詳細プロフィール
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section - Professional */}
      <section id="contact" className="py-20 lg:py-32 bg-gray-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              お問い合わせ
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              ご質問・ご相談はお気軽にお問い合わせください
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h3 className="text-3xl font-bold mb-8">お気軽にご連絡ください</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">📧</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Email</p>
                      <p className="text-gray-300">contact@tomorebeyond.co</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">🌍</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Location</p>
                      <p className="text-gray-300">Tokyo, Japan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">⚡</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Response Time</p>
                      <p className="text-gray-300">24時間以内</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-xl p-8"
              >
                <form className="space-y-6" name="contact" method="POST" data-netlify="true">
                  <input type="hidden" name="form-name" value="contact" />
                  
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">お名前 *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" 
                      placeholder="山田太郎"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">メールアドレス *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" 
                      placeholder="example@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">メッセージ *</label>
                    <textarea 
                      name="message" 
                      rows={6} 
                      required 
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none" 
                      placeholder="お気軽にお聞かせください..."
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-300"
                  >
                    送信する
                  </motion.button>
                </form>
              </motion.div>
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
