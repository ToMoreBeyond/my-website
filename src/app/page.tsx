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
    'in-development': { text: 'DEVELOPING', style: 'bg-amber-100 text-amber-800 border-amber-300' },
    'beta': { text: 'BETA', style: 'bg-blue-100 text-blue-800 border-blue-300' },
    'released': { text: 'RELEASED', style: 'bg-green-100 text-green-800 border-green-300' }
  }

  return (
    <>
      <Header />

      <main ref={mainRef} className="min-h-screen bg-[#f4f4f4]" role="main">

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="container max-w-5xl mx-auto px-4 md:px-8 text-center">
            <div className="mb-8">
              <Image
                src="/images/logos/tomorebeyond-logo.png"
                alt="ToMoreBeyond"
                width={200}
                height={200}
                priority
                className="mx-auto mb-8"
              />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1a1a1a] mb-6 tracking-tight leading-tight">
              埋もれた記録を、<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                続く面白さへ
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Making hidden traces a lasting wonder
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#products"
                className="bg-[#1a1a1a] text-white px-8 py-4 font-bold hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1"
              >
                PRODUCTS
              </Link>
              <Link
                href="#contact"
                className="border-2 border-[#1a1a1a] text-[#1a1a1a] px-8 py-4 font-bold hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 hover:-translate-y-1"
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
        <section id="products" className="py-24 md:py-32">
          <div className="container max-w-5xl mx-auto px-4 md:px-8">
            <div className="mb-16">
              <h2 className="js-title text-5xl md:text-6xl lg:text-7xl font-black text-[#1a1a1a] mb-4 tracking-tight">
                Products
              </h2>
              <p className="text-lg text-gray-600">プロダクト紹介</p>
            </div>

            <div className="js-card-group space-y-8">
              {products.map((product, index) => {
                const status = statusLabels[product.status] || statusLabels['in-development']
                const isReversed = index % 2 === 1

                return (
                  <div
                    key={product.id}
                    className="js-card bg-white p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                      {/* Image */}
                      <div className="w-full md:w-1/3 aspect-square relative bg-gray-100 overflow-hidden">
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
                          <span className={`px-3 py-1 text-xs font-bold border ${status.style}`}>
                            {status.text}
                          </span>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 font-medium tracking-wide">
                          {product.nameEn}
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          {product.tagline}
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                          {product.description}
                        </p>

                        <Link
                          href={`/products/${product.id}`}
                          className="inline-block bg-[#1a1a1a] text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors"
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
          <div className="container max-w-5xl mx-auto px-4 md:px-8">
            <div className="mb-16 text-right">
              <h2 className="js-title text-5xl md:text-6xl lg:text-7xl font-black text-[#1a1a1a] mb-4 tracking-tight">
                Team
              </h2>
              <p className="text-lg text-gray-600">チームメンバー</p>
            </div>

            <div className="js-card-group grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="js-card bg-[#f4f4f4] p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold px-3 py-1 border border-[#1a1a1a] inline-block mb-4">
                    {member.positionEn}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>

                  <Link
                    href={`/team/${member.id}`}
                    className="inline-block mt-4 text-sm font-bold text-[#1a1a1a] hover:underline"
                  >
                    詳しく見る →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32">
          <div className="container max-w-5xl mx-auto px-4 md:px-8">
            <div className="mb-16 text-center">
              <h2 className="js-title text-5xl md:text-6xl lg:text-7xl font-black text-[#1a1a1a] mb-4 tracking-tight">
                Contact
              </h2>
              <p className="text-lg text-gray-600">お問い合わせ</p>
            </div>

            <div className="js-scroll-item max-w-2xl mx-auto bg-white p-8 md:p-12 shadow-lg">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { Icon: Mail, label: 'Email', value: 'contact@tomorebeyond.co' },
                  { Icon: MapPin, label: 'Location', value: 'Tokyo, Japan' },
                  { Icon: Clock, label: 'Response', value: '24時間以内' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center shrink-0">
                      <item.Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                      <p className="text-sm font-bold text-[#1a1a1a]">{item.value}</p>
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
                  <label className="block text-xs font-bold mb-2 tracking-widest text-gray-700">
                    NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border-b-2 border-[#1a1a1a] py-3 bg-transparent font-medium focus:outline-none focus:border-dashed transition-all"
                    placeholder="お名前を入力してください"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 tracking-widest text-gray-700">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border-b-2 border-[#1a1a1a] py-3 bg-transparent font-medium focus:outline-none focus:border-dashed transition-all"
                    placeholder="メールアドレスを入力してください"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2 tracking-widest text-gray-700">
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full border-b-2 border-[#1a1a1a] py-3 bg-transparent font-medium focus:outline-none focus:border-dashed transition-all resize-none"
                    placeholder="お問い合わせ内容を入力してください"
                  />
                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="bg-[#1a1a1a] text-white px-12 py-4 font-bold text-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                  >
                    SEND MESSAGE
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
