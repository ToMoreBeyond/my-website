'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <html lang="ja">
      <body className="antialiased">
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="w-full max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="mb-6 inline-flex size-24 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="size-12" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                重大なエラーが発生しました
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                申し訳ございません。アプリケーションで重大なエラーが発生しました。
                <br />
                ページを再読み込みして、もう一度お試しください。
              </p>
            </motion.div>

            {process.env.NODE_ENV === 'development' && error.message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8 rounded-lg border border-destructive/20 bg-destructive/5 p-4"
              >
                <p className="text-left font-mono text-sm text-destructive">{error.message}</p>
                {error.stack && (
                  <pre className="mt-2 overflow-auto text-left text-xs text-destructive/80">
                    {error.stack}
                  </pre>
                )}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button size="lg" className="h-12 px-8 text-base" onClick={reset}>
                <RotateCw data-icon="inline-start" />
                再読み込み
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base"
                onClick={() => (window.location.href = '/')}
              >
                トップページへ戻る
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 text-sm text-muted-foreground"
            >
              問題が解決しない場合は、ブラウザのキャッシュをクリアしてお試しください。
            </motion.p>
          </div>
        </div>
      </body>
    </html>
  );
}
