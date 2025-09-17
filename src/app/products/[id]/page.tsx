import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  CodeBracketIcon, 
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  BeakerIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { products, Product } from '@/data/products';
import { DetailLayout } from '@/components/layout/DetailLayout';
import { productBreadcrumbs } from '@/lib/breadcrumbs';
import { clsx } from 'clsx';
import { ProductDetailClient } from './ProductDetailClient';

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-semibold text-neutral-900 mb-4">プロダクトが見つかりません</h1>
          <p className="text-neutral-600 mb-8">指定されたプロダクトは存在しません。</p>
          <Link 
            href="/#products"
            className="inline-flex items-center px-6 py-3 bg-olive-600 text-white rounded-lg hover:bg-olive-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            プロダクト一覧に戻る
          </Link>
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
