'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * 404。数字だけデジタル時計の書体で、紙の上に大きく置く。
 */
export default function NotFound() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-24">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <motion.h1
          {...rise(0)}
          className="font-seg text-[clamp(5rem,22vw,10rem)] leading-none text-brand"
        >
          404
        </motion.h1>

        <motion.div {...rise(0.15)} className="flex flex-col gap-5">
          <h2 className="palt text-3xl leading-[1.15] font-bold tracking-[-0.02em] text-foreground md:text-4xl">
            ページが見つかりません
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            お探しのページは存在しないか、移動または削除された可能性があります。
            <br />
            URLをご確認いただくか、トップページからお探しください。
          </p>
        </motion.div>

        <motion.div
          {...rise(0.3)}
          className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
        >
          <Button asChild size="lg" className="h-12 w-full rounded-full px-8 text-base sm:w-auto">
            <Link href="/">
              <Home data-icon="inline-start" />
              トップページへ戻る
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-full px-8 text-base sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft data-icon="inline-start" />
            前のページへ戻る
          </Button>
        </motion.div>

        <motion.p {...rise(0.45)} className="mt-8 text-sm text-muted-foreground">
          引き続き問題が発生する場合は、
          <Link
            href="/#contact"
            className="ml-1 font-medium text-foreground underline decoration-brand underline-offset-4"
          >
            お問い合わせ
          </Link>
          ください。
        </motion.p>
      </div>
    </div>
  );
}
