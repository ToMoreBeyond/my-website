'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-8xl font-black tracking-tight text-foreground md:text-9xl"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="mb-6 text-3xl font-semibold text-foreground md:text-4xl">
            ページが見つかりません
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            お探しのページは存在しないか、移動または削除された可能性があります。
            <br />
            URLをご確認いただくか、トップページからお探しください。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="h-12 px-8 text-base">
            <Link href="/">
              <Home data-icon="inline-start" />
              トップページへ戻る
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base"
            onClick={() => window.history.back()}
          >
            <ArrowLeft data-icon="inline-start" />
            前のページへ戻る
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-sm text-muted-foreground"
        >
          引き続き問題が発生する場合は、
          <Link href="/#contact" className="ml-1 font-medium text-foreground hover:underline">
            お問い合わせ
          </Link>
          ください。
        </motion.p>
      </div>
    </div>
  );
}
