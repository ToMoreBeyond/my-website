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
import { clsx } from 'clsx';
import { ProductDetailClient } from './ProductDetailClient';

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: PageProps) {
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">プロダクトが見つかりません</h1>
          <p className="text-gray-400 mb-8">指定されたプロダクトは存在しません。</p>
          <Link 
            href="/#products"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            プロダクト一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}