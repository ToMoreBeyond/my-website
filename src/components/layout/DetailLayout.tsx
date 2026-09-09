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
      <div className="mx-auto max-w-6xl px-5 pt-24 pb-2 md:px-8 lg:pt-28">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((c, i) => (
                <Fragment key={i}>
                  {i > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {c.href ? (
                      <BreadcrumbLink asChild>
                        <Link href={c.href} className="inline-flex min-h-9 items-center">
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
              className="shrink-0"
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

      {/* Unified CTA */}
      {cta && (
        <section className="relative overflow-hidden py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <div className="glass relative overflow-hidden rounded-3xl px-6 py-12 text-center md:px-12 md:py-16">
              <div aria-hidden className="bloom -top-1/2 left-1/2 size-[420px] -translate-x-1/2 opacity-70" />
              <div className="relative flex flex-col items-center gap-6">
                <h2 className="palt text-2xl font-bold tracking-tight text-foreground md:text-4xl">
                  {cta.title}
                </h2>
                {cta.description && (
                  <p className="max-w-2xl text-muted-foreground md:text-lg">{cta.description}</p>
                )}
                <Button
                  size="lg"
                  className="h-12 px-8 text-base hover:glow-ring"
                  onClick={() => router.push(cta.buttonHref || '/#contact')}
                >
                  {cta.buttonLabel || 'お問い合わせ'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
