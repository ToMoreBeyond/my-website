'use client'

import { Fragment, PropsWithChildren, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/layout/Header'
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
      <div className="container mx-auto max-w-6xl px-6 pb-2 pt-24 md:px-8 lg:pt-28">
        <div className="flex items-center justify-between gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((c, i) => (
                <Fragment key={i}>
                  {i > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {c.href ? (
                      <BreadcrumbLink asChild>
                        <Link href={c.href}>{c.label}</Link>
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
              size="sm"
              onClick={() => router.push(parent.href!)}
            >
              <ArrowLeft data-icon="inline-start" />
              戻る
            </Button>
          )}
        </div>
      </div>

      {/* Page content */}
      <main>{children}</main>

      {/* Unified CTA */}
      {cta && (
        <section className="border-t border-border bg-muted/30 py-24 lg:py-32">
          <div className="container mx-auto max-w-3xl px-6 text-center md:px-8">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {cta.title}
            </h2>
            {cta.description && (
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                {cta.description}
              </p>
            )}
            <Button
              size="lg"
              className="h-12 px-10 text-base"
              onClick={() => router.push(cta.buttonHref || '/#contact')}
            >
              {cta.buttonLabel || 'お問い合わせ'}
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
