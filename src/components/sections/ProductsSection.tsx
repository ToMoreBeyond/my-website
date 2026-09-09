import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/data/products'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SectionHeading } from '@/components/common/SectionHeading'
import { StatusDot } from '@/components/common/StatusDot'

const statusMap: Record<string, { text: string; tone: 'lit' | 'solid' | 'hollow' }> = {
  released: { text: 'RELEASED', tone: 'lit' },
  beta: { text: 'BETA', tone: 'solid' },
  'in-development': { text: 'IN DEVELOPMENT', tone: 'hollow' },
}

export function ProductsSection() {
  return (
    <section id="products" className="scroll-mt-16 border-t border-border py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 md:px-8">
        <SectionHeading label="Products" title="プロダクト" />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {products.map((product) => {
            const status = statusMap[product.status] ?? statusMap['in-development']

            return (
              <Card
                key={product.id}
                className="group/product gap-0 p-0 hover:glow-ring focus-within:glow-ring"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4 p-6 md:p-7">
                  {/* アプリアイコンとして扱う */}
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-[22%] shadow-xl ring-1 ring-foreground/10">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex h-7 items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground">
                    <StatusDot tone={status.tone} />
                    {status.text}
                  </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-3 px-6 pb-6 md:px-7">
                  <p className="font-display text-sm font-semibold tracking-wide text-primary">
                    {product.nameEn}
                  </p>
                  <CardTitle className="palt text-2xl font-bold tracking-tight md:text-3xl">
                    {product.name}
                  </CardTitle>
                  <p className="font-medium text-foreground">{product.tagline}</p>
                  <CardDescription className="text-sm leading-relaxed">
                    {product.description}
                  </CardDescription>
                </CardContent>

                <CardFooter className="border-t-0 bg-transparent px-6 pb-6 pt-0 md:px-7 md:pb-7">
                  <Button asChild variant="outline" size="lg" className="h-11 w-full px-5 sm:w-auto">
                    <Link href={`/products/${product.id}`}>
                      VIEW DETAILS
                      <ArrowRight data-icon="inline-end" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
