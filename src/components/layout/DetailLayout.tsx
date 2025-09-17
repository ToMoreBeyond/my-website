'use client'

import { PropsWithChildren, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Header } from '@/components/layout/Header'

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
    <div className="min-h-screen bg-white">
      <Header />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Breadcrumbs + Back */}
      <div className="container pt-6 pb-2">
        <div className="flex items-center justify-between">
          <nav className="flex items-center text-sm text-neutral-500">
            {breadcrumbs.map((c, i) => (
              <div key={i} className="flex items-center">
                {i > 0 && <ChevronRightIcon className="w-4 h-4 mx-2 text-neutral-400" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-neutral-800 transition-colors">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-neutral-700">{c.label}</span>
                )}
              </div>
            ))}
          </nav>
          {parent?.href && (
            <button
              onClick={() => router.push(parent.href!)}
              className="inline-flex items-center px-3 py-2 text-sm rounded-lg border border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              戻る
            </button>
          )}
        </div>
      </div>

      {/* Page content */}
      <main>{children}</main>

      {/* Unified CTA */}
      {cta && (
        <section className="section">
          <div className="container text-center">
            <h2 className="text-4xl font-serif font-semibold text-neutral-900 mb-6">{cta.title}</h2>
            {cta.description && (
              <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">{cta.description}</p>
            )}
            <button
              onClick={() => router.push(cta.buttonHref || '/#contact')}
              className="inline-flex items-center px-12 py-4 bg-olive-600 text-white rounded-full text-lg font-semibold hover:bg-olive-700 transition-colors"
            >
              {cta.buttonLabel || 'お問い合わせ'}
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
