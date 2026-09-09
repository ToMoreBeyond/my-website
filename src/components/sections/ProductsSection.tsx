import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/data/products'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/common/SectionHeading'
import { StatusDot } from '@/components/common/StatusDot'
import { productStickers } from '@/lib/stickers'
import { cn } from '@/lib/utils'

const statusMap: Record<string, { text: string; tone: 'lit' | 'solid' | 'hollow' }> = {
  released: { text: 'RELEASED', tone: 'lit' },
  beta: { text: 'BETA', tone: 'solid' },
  'in-development': { text: 'IN DEVELOPMENT', tone: 'hollow' },
}

/**
 * 1 区画 1 プロダクト。大きな紙のカードに、アプリアイコンと言葉を左右交互に置く。
 */
export function ProductsSection() {
  return (
    <section id="products" className="scroll-mt-24 py-24 md:py-32 lg:py-40">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 md:gap-16 md:px-8">
        <SectionHeading label="Products" title="プロダクト" />

        <div className="flex flex-col gap-6 md:gap-8">
          {products.map((product, index) => {
            const status = statusMap[product.status] ?? statusMap['in-development']
            const reversed = index % 2 === 1
            const sticker = productStickers[product.id]

            return (
              <article
                key={product.id}
                className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-card p-6 shadow-warm sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12"
              >
                {/* App icon */}
                <div className={cn('flex justify-center lg:col-span-5', reversed && 'lg:order-2')}>
                  <div className="relative">
                    <div className="relative size-40 overflow-hidden rounded-[24%] bg-card shadow-lift ring-1 ring-foreground/10 sm:size-52 lg:size-64">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 208px, 256px"
                        loading="lazy"
                      />
                    </div>
                    {sticker && (
                      <span
                        aria-hidden
                        className="sticker absolute -top-4 -right-4 size-11 -rotate-6 text-2xl"
                      >
                        {sticker}
                      </span>
                    )}
                  </div>
                </div>

                {/* Words */}
                <div className={cn('flex flex-col gap-4 lg:col-span-7', reversed && 'lg:order-1')}>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="h-7 gap-2 px-3 font-display text-xs font-semibold tracking-wide"
                    >
                      <StatusDot tone={status.tone} />
                      {status.text}
                    </Badge>
                    <span className="font-display text-sm font-medium text-muted-foreground">
                      {product.nameEn}
                    </span>
                  </div>

                  <h3 className="palt text-3xl leading-tight font-bold tracking-[-0.03em] text-foreground md:text-4xl lg:text-5xl">
                    {product.name}
                  </h3>

                  <p className="font-mincho text-xl leading-snug text-foreground md:text-2xl">
                    {product.tagline}
                  </p>

                  <p className="max-w-prose leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="pt-2">
                    <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-5">
                      <Link href={`/products/${product.id}`}>
                        VIEW DETAILS
                        <ArrowRight data-icon="inline-end" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
