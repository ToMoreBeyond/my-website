'use client';

import type { ReactNode } from 'react';
import { Check, Clock, FlaskConical, CheckCircle2, Share2 } from 'lucide-react';
import { Product } from '@/data/products';
import { DetailHero } from '@/components/layout/DetailHero';
import { RoadmapTimeline } from '@/components/roadmap/RoadmapTimeline';
import { getRoadmapByProductId } from '@/data/roadmaps';
import { productStickers } from '@/lib/stickers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/common/SectionHeading';
import { StatusDot } from '@/components/common/StatusDot';

const statusConfig: Record<Product['status'], { icon: ReactNode; label: string }> = {
  'in-development': { icon: <Clock />, label: '開発中' },
  beta: { icon: <FlaskConical />, label: 'ベータ版' },
  released: { icon: <CheckCircle2 />, label: 'リリース済み' },
};

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const status = statusConfig[product.status];
  const roadmap = getRoadmapByProductId(product.id);

  return (
    <div className="bg-background">
      <DetailHero
        title={product.name}
        subtitle={product.nameEn}
        tagline={product.tagline}
        description={product.description}
        badge={{ label: status.label, icon: status.icon }}
        imageSrc={product.image}
        imageAlt={product.name}
        imagePosition="right"
        imageStyle="icon"
        sticker={productStickers[product.id]}
        eager
        actions={
          <>
            <Badge
              variant="outline"
              className="h-auto min-h-10 gap-1.5 rounded-full px-3.5 py-1.5 text-left text-sm whitespace-normal"
            >
              <Clock />
              リリース予定: {product.releaseSchedule}
            </Badge>
            <Button
              variant="outline"
              size="lg"
              className="h-10 rounded-full"
              onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
            >
              <Share2 data-icon="inline-start" />
              シェア
            </Button>
          </>
        }
      />

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:px-8">
          <SectionHeading title="主な機能" description={`${product.name}が提供する機能`} />

          <Card className="gap-0 rounded-3xl p-0 shadow-warm">
            <CardContent className="px-6 py-3 md:px-8">
              <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 border-b border-border py-4 text-foreground last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <Check className="mt-1.5 size-4 shrink-0 text-brand" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 md:px-8">
          <SectionHeading title="技術スタック" description="最新の技術を駆使して開発" />

          <div className="flex flex-wrap gap-2.5">
            {product.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="h-9 rounded-full px-4 text-sm font-medium"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      {roadmap && (
        <section id="roadmap" className="py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <RoadmapTimeline roadmap={roadmap} />
          </div>
        </section>
      )}

      {/* Additional Info Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Target Users */}
            <Card className="gap-0 rounded-3xl p-0 shadow-warm">
              <CardHeader className="p-6 pb-0 md:p-8 md:pb-0">
                <CardTitle className="palt text-xl font-bold md:text-2xl">ターゲットユーザー</CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <ul className="flex flex-col">
                  {product.targetUsers.map((user) => (
                    <li
                      key={user}
                      className="flex items-start gap-3 border-b border-border py-3.5 text-foreground last:border-b-0"
                    >
                      <StatusDot tone="solid" className="mt-2.5" />
                      <span>{user}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Platform Details */}
            <Card className="gap-0 rounded-3xl p-0 shadow-warm">
              <CardHeader className="p-6 pb-0 md:p-8 md:pb-0">
                <CardTitle className="palt text-xl font-bold md:text-2xl">対応プラットフォーム</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 p-6 md:p-8">
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium text-muted-foreground">対応デバイス</h4>
                  <ul className="flex flex-col gap-2">
                    {product.supportedDevices.map((device) => (
                      <li key={device} className="flex items-center gap-3 text-foreground">
                        <StatusDot tone="solid" />
                        {device}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium text-muted-foreground">システム要件</h4>
                  <p className="text-foreground">{product.minimumOS}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium text-muted-foreground">対象地域</h4>
                  <p className="text-foreground">{product.targetRegion}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
