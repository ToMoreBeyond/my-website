'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { Check, Clock, FlaskConical, CheckCircle2, Share2 } from 'lucide-react';
import { Product } from '@/data/products';
import { DetailHero } from '@/components/layout/DetailHero';
import { RoadmapTimeline } from '@/components/roadmap/RoadmapTimeline';
import { getRoadmapByProductId } from '@/data/roadmaps';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
  const featuresRef = useRef(null);
  const techRef = useRef(null);
  const infoRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const techInView = useInView(techRef, { once: true, margin: '-100px' });
  const infoInView = useInView(infoRef, { once: true, margin: '-100px' });

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
        actions={
          <>
            <Badge variant="outline" className="h-9 gap-1.5 rounded-md px-4">
              <Clock />
              リリース予定: {product.releaseSchedule}
            </Badge>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
            >
              <Share2 data-icon="inline-start" />
              シェア
            </Button>
          </>
        }
      />

      {/* Features Section */}
      <section ref={featuresRef} className="bg-muted/30 py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              主な機能
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {product.name}が提供する機能
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 24 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardContent className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <Check className="size-4" />
                    </div>
                    <span className="font-medium text-foreground">{feature}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section ref={techRef} className="py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={techInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              技術スタック
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">最新の技術を駆使して開発</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {product.technologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={techInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      {roadmap && (
        <section id="roadmap" className="bg-muted/30 py-24 lg:py-32">
          <div className="container mx-auto max-w-6xl px-6 md:px-8">
            <RoadmapTimeline roadmap={roadmap} />
          </div>
        </section>
      )}

      {/* Additional Info Section */}
      <section ref={infoRef} className="py-24 lg:py-32">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Target Users */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="p-2 md:p-4">
                  <h3 className="mb-6 text-xl font-semibold text-foreground">ターゲットユーザー</h3>
                  <div className="flex flex-col gap-3">
                    {product.targetUsers.map((user) => (
                      <div
                        key={user}
                        className="flex items-center gap-3 rounded-lg border border-border bg-background p-4"
                      >
                        <Check className="size-4 shrink-0 text-muted-foreground" />
                        <span className="text-foreground">{user}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Platform Details */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col gap-6 p-2 md:p-4">
                  <h3 className="text-xl font-semibold text-foreground">対応プラットフォーム</h3>
                  <div>
                    <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      対応デバイス
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {product.supportedDevices.map((device) => (
                        <li key={device} className="flex items-center text-foreground">
                          <span className="mr-3 size-1.5 rounded-full bg-muted-foreground" />
                          {device}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      システム要件
                    </h4>
                    <p className="text-foreground">{product.minimumOS}</p>
                  </div>
                  <div>
                    <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      対象地域
                    </h4>
                    <p className="text-foreground">{product.targetRegion}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
