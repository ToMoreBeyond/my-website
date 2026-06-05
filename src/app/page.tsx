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
import { Mail, MapPin, Clock, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const statusMap: Record<
  string,
  { text: string; variant: 'default' | 'secondary' | 'outline' }
> = {
  released: { text: 'RELEASED', variant: 'default' },
  beta: { text: 'BETA', variant: 'secondary' },
  'in-development': { text: 'IN DEVELOPMENT', variant: 'outline' },
}

const contactInfo = [
  { Icon: Mail, label: 'Email', value: 'contact@tomorebeyond.co' },
  { Icon: MapPin, label: 'Location', value: 'Tokyo, Japan' },
  { Icon: Clock, label: 'Response', value: '24時間以内' },
]

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const initTimeout = setTimeout(() => {
      const titles = document.querySelectorAll('.js-title')
      titles.forEach((title) => {
        gsap.fromTo(
          title,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: title, start: 'top 85%' },
          }
        )
      })

      const cardGroups = document.querySelectorAll('.js-card-group')
      cardGroups.forEach((group) => {
        const cards = group.querySelectorAll('.js-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: { trigger: group, start: 'top 80%' },
          }
        )
      })

      const items = document.querySelectorAll('.js-scroll-item')
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 85%' },
          }
        )
      })
    }, 800)

    return () => {
      clearTimeout(initTimeout)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <Header />

      <main ref={mainRef} id="main-content" className="min-h-screen bg-background" role="main">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 lg:pt-28">
          {/* Subtle background grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
          />

          <div className="container relative z-10 mx-auto max-w-5xl px-6 text-center md:px-8">
            <div className="mb-8 flex justify-center">
              <Badge variant="outline" className="rounded-full px-4 py-1.5 text-muted-foreground">
                Mobile App Studio · Tokyo
              </Badge>
            </div>

            <div className="mb-10 flex justify-center">
              <Image
                src="/images/logos/tomorebeyond-logo.png"
                alt="ToMoreBeyond"
                width={140}
                height={140}
                priority
                className="size-28 md:size-32"
              />
            </div>

            <h1 className="mb-8 text-5xl font-black tracking-tight text-foreground md:text-7xl lg:text-8xl">
              JUST DO IT!
            </h1>

            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              革新的なモバイルアプリケーションで、人々の日常をより豊かに
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="#products">
                  PRODUCTS
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                <Link href="#contact">CONTACT</Link>
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium tracking-wide">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-border to-transparent" />
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="bg-muted/30 py-24 md:py-32">
          <div className="container mx-auto max-w-5xl px-6 md:px-8">
            <div className="mb-16">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Products
              </p>
              <h2 className="js-title text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                プロダクト
              </h2>
            </div>

            <div className="js-card-group flex flex-col gap-8">
              {products.map((product, index) => {
                const status = statusMap[product.status] ?? statusMap['in-development']
                const isReversed = index % 2 === 1

                return (
                  <Card
                    key={product.id}
                    className="js-card overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg"
                  >
                    <div
                      className={`flex flex-col ${
                        isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                      }`}
                    >
                      {/* Image */}
                      <div className="relative aspect-square w-full overflow-hidden bg-muted md:w-2/5">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 40vw"
                          loading="lazy"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col justify-center p-6 md:p-10">
                        <div className="mb-4 flex items-center gap-3">
                          <Badge variant={status.variant}>{status.text}</Badge>
                          <span className="text-sm font-medium text-muted-foreground">
                            {product.nameEn}
                          </span>
                        </div>

                        <CardTitle className="mb-3 text-2xl md:text-3xl">
                          {product.name}
                        </CardTitle>
                        <p className="mb-3 font-medium text-foreground">{product.tagline}</p>
                        <CardDescription className="mb-6 line-clamp-3 leading-relaxed">
                          {product.description}
                        </CardDescription>

                        <div>
                          <Button asChild variant="outline" size="lg">
                            <Link href={`/products/${product.id}`}>
                              VIEW DETAILS
                              <ArrowRight data-icon="inline-end" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 md:py-32">
          <div className="container mx-auto max-w-5xl px-6 md:px-8">
            <div className="mb-16">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Team
              </p>
              <h2 className="js-title text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                チームメンバー
              </h2>
            </div>

            <div className="js-card-group grid grid-cols-1 gap-6 md:grid-cols-3">
              {teamMembers.map((member) => (
                <Card key={member.id} className="js-card text-center">
                  <CardHeader className="items-center">
                    <Avatar className="mx-auto mb-4 size-28">
                      <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                      <AvatarFallback className="text-xl">
                        {member.nameEn?.[0] ?? member.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <Badge variant="secondary" className="mt-2">
                      {member.positionEn}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <CardDescription className="mb-5 leading-relaxed">
                      {member.bio}
                    </CardDescription>
                    <div className="mt-auto">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/team/${member.id}`}>
                          詳しく見る
                          <ArrowUpRight data-icon="inline-end" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-muted/30 py-24 md:py-32">
          <div className="container mx-auto max-w-5xl px-6 md:px-8">
            <div className="mb-16 text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Contact
              </p>
              <h2 className="js-title text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                お問い合わせ
              </h2>
            </div>

            <Card className="js-scroll-item mx-auto max-w-2xl">
              <CardContent className="p-2 md:p-6">
                {/* Contact Info */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <item.Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="mb-8" />

                {/* Contact Form */}
                <form name="contact" method="POST" data-netlify="true">
                  <input type="hidden" name="form-name" value="contact" />
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="name">お名前</FieldLabel>
                      <Input id="name" name="name" required placeholder="山田太郎" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="yamada@example.com"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="message">お問い合わせ内容</FieldLabel>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="お問い合わせ内容をご記入ください"
                      />
                    </Field>
                    <Field>
                      <Button type="submit" size="lg" className="mx-auto mt-2 h-12 px-10 text-base">
                        送信する
                      </Button>
                    </Field>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
