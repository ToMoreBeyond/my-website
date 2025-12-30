'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { products } from '@/data/products'
import { teamMembers } from '@/data/team'
import { Mail, MapPin, Clock } from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Wait for loading overlay to complete
    const initTimeout = setTimeout(() => {
      // Scroll-triggered fade-in animations
      const scrollItems = document.querySelectorAll('.js-scroll-item')
      scrollItems.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        )
      })

      // Section titles animation
      const titles = document.querySelectorAll('.js-title')
      titles.forEach((title) => {
        gsap.fromTo(title,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%"
            }
          }
        )
      })

      // Stagger animations for cards
      const cardGroups = document.querySelectorAll('.js-card-group')
      cardGroups.forEach((group) => {
        const cards = group.querySelectorAll('.js-card')
        gsap.fromTo(cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 80%"
            }
          }
        )
      })
    }, 3500) // Wait for loading animation

    return () => {
      clearTimeout(initTimeout)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const statusLabels: Record<string, { text: string; style: string }> = {
    'in-development': { text: 'DEVELOPING', style: 'bg-gray-100 text-gray-700 border-gray-300' },
    'beta': { text: 'BETA', style: 'bg-gray-100 text-gray-700 border-gray-300' },
    'released': { text: 'RELEASED', style: 'bg-gray-900 text-white border-gray-900' }
  }

  return (
    <>
      <Header />

      <main ref={mainRef} className="min-h-screen bg-white" role="main">

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 lg:pt-28">
          <div className="container max-w-5xl mx-auto px-6 md:px-8 text-center">
            <div className="mb-10">
              <Image
                src="/images/logos/tomorebeyond-logo.png"
                alt="ToMoreBeyond"
                width={160}
                height={160}
                priority
                className="mx-auto"
              />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tight">
              JUST DO IT!
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              革新的なモバイルアプリケーションで、人々の日常をより豊かに
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#products"
                style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                className="px-8 py-4 font-bold hover:opacity-90 transition-opacity duration-200"
              >
                PRODUCTS
              </Link>
              <Link
                href="#contact"
                className="border-2 border-gray-900 text-gray-900 px-8 py-4 font-bold hover:bg-gray-100 transition-colors duration-200"
              >
                CONTACT
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm font-medium tracking-wide">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-400 to-transparent" />
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 md:py-32 bg-gray-50">
          <div className="container max-w-5xl mx-auto px-6 md:px-8">
            <div className="mb-16">
              <h2 className="js-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                Products
              </h2>
              <p className="text-lg text-gray-500">プロダクト紹介</p>
            </div>

            <div className="js-card-group space-y-8">
              {products.map((product, index) => {
                const status = statusLabels[product.status] || statusLabels['in-development']
                const isReversed = index % 2 === 1

                return (
                  <div
                    key={product.id}
                    className="js-card bg-white p-6 md:p-8 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
                  >
                    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                      {/* Image */}
                      <div className="w-full md:w-1/3 aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="lazy"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 w-full">
                        <div className="flex items-start justify-between mb-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${status.style}`}>
                            {status.text}
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 font-medium">
                          {product.nameEn}
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {product.tagline}
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                          {product.description}
                        </p>

                        <Link
                          href={`/products/${product.id}`}
                          style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                          className="inline-block px-6 py-3 font-medium rounded-lg hover:opacity-90 transition-opacity"
                        >
                          VIEW DETAILS
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 md:py-32 bg-white">
          <div className="container max-w-5xl mx-auto px-6 md:px-8">
            <div className="mb-16">
              <h2 className="js-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                Team
              </h2>
              <p className="text-lg text-gray-500">チームメンバー</p>
            </div>

            <div className="js-card-group grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="js-card bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-200"
                >
                  {/* Avatar */}
                  <div className="w-32 h-32 mx-auto mb-6 relative rounded-full overflow-hidden bg-gray-200">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-gray-500 mb-4">
                    {member.positionEn}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  <Link
                    href={`/team/${member.id}`}
                    className="inline-block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    詳しく見る →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 bg-gray-50">
          <div className="container max-w-5xl mx-auto px-6 md:px-8">
            <div className="mb-16 text-center">
              <h2 className="js-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                Contact
              </h2>
              <p className="text-lg text-gray-500">お問い合わせ</p>
            </div>

            <div className="js-scroll-item max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-xl border border-gray-200">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { Icon: Mail, label: 'Email', value: 'contact@tomorebeyond.co' },
                  { Icon: MapPin, label: 'Location', value: 'Tokyo, Japan' },
                  { Icon: Clock, label: 'Response', value: '24時間以内' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#1a1a1a' }}
                    >
                      <item.Icon className="w-5 h-5" style={{ color: '#ffffff' }} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                      <p className="text-sm font-medium text-gray-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <form
                className="space-y-6"
                name="contact"
                method="POST"
                data-netlify="true"
              >
                <input type="hidden" name="form-name" value="contact" />

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    お名前
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                    placeholder="山田太郎"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                    placeholder="yamada@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    お問い合わせ内容
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors resize-none"
                    placeholder="お問い合わせ内容をご記入ください"
                  />
                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}
                    className="px-10 py-4 font-medium text-lg rounded-lg hover:opacity-90 transition-opacity duration-200"
                  >
                    送信する
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
