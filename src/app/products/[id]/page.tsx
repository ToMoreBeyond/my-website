import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { productBreadcrumbs } from '@/lib/breadcrumbs';
import { ProductDetailClient } from './ProductDetailClient';
import { Button } from '@/components/ui/button';

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetail({ params }: PageProps) {
  const resolvedParams = await params;
  const product = products.find(p => p.id === resolvedParams.id);
  
  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">プロダクトが見つかりません</h1>
          <p className="mb-8 text-muted-foreground">指定されたプロダクトは存在しません。</p>
          <Button asChild size="lg">
            <Link href="/#products">
              <ArrowLeft data-icon="inline-start" />
              プロダクト一覧に戻る
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DetailLayout
      breadcrumbs={productBreadcrumbs(product.name)}
      cta={{
        title: `${product.name}について詳しく知りたい方へ`,
        description: 'プロジェクトの詳細や導入に関するご相談は、お気軽にお問い合わせください',
        buttonLabel: 'お問い合わせ',
        buttonHref: '/#contact',
      }}
    >
      <ProductDetailClient product={product} />
    </DetailLayout>
  );
}
