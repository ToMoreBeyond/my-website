'use client'

import { Fragment, PropsWithChildren, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Crumb = { label: string; href?: string }

interface DetailLayoutProps extends PropsWithChildren {
  breadcrumbs: Crumb[]
  cta?: {
    title: string
    description?: string
    buttonLabel?: string
    buttonHref?: string
  }
}

export function DetailLayout({ breadcrumbs, cta, children }: DetailLayoutProps) {
  const router = useRouter()
  const parent = breadcrumbs[breadcrumbs.length - 2]

  const jsonLd = useMemo(() => {
    if (typeof window === 'undefined') return null
    const origin = window.location.origin
    const itemListElement = breadcrumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@id': c.href ? new URL(c.href, origin).toString() : window.location.href,
        name: c.label,
      },
    }))
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    }
  }, [breadcrumbs])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Breadcrumbs + Back */}
      <div className="mx-auto max-w-6xl px-5 pt-28 pb-2 md:px-8 lg:pt-32">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((c, i) => (
                <Fragment key={i}>
                  {i > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {c.href ? (
                      <BreadcrumbLink asChild>
                        <Link href={c.href} className="inline-flex min-h-10 items-center">
                          {c.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{c.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {parent?.href && (
            <Button
              variant="outline"
              size="lg"
              className="h-10 shrink-0 rounded-full"
              onClick={() => router.push(parent.href!)}
            >
              <ArrowLeft data-icon="inline-start" />
              戻る
            </Button>
          )}
        </div>
      </div>

      {/* Page content */}
      <main id="main-content">{children}</main>

      {/* Unified CTA: 暗い区画 */}
      {cta && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <div className="flex flex-col items-center gap-6 rounded-[2.5rem] bg-primary px-6 py-12 text-center text-primary-foreground md:px-12 md:py-16">
              <h2 className="palt text-2xl leading-snug font-bold tracking-[-0.02em] md:text-4xl">
                {cta.title}
              </h2>
              {cta.description && (
                <p className="max-w-2xl font-mincho text-primary-foreground/80 md:text-lg">
                  {cta.description}
                </p>
              )}
              <Button
                variant="secondary"
                size="lg"
                className="h-12 rounded-full px-8 text-base"
                onClick={() => router.push(cta.buttonHref || '/#contact')}
              >
                {cta.buttonLabel || 'お問い合わせ'}
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
