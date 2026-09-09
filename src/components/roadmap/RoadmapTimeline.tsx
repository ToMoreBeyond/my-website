'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ProductRoadmap } from '@/types/roadmap';
import { RoadmapPhaseCard } from './RoadmapPhaseCard';
import { calculateRoadmapProgress } from '@/data/roadmaps';

interface RoadmapTimelineProps {
  roadmap: ProductRoadmap;
}

/**
 * 開発ロードマップ。進捗の数字だけデジタル時計の書体で光らせる。
 */
export function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  const progress = calculateRoadmapProgress(roadmap);
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
      {/* Header with progress */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="palt text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-foreground md:text-4xl lg:text-5xl">
            開発ロードマップ
          </h2>
          <div className="flex flex-col gap-1 sm:items-end">
            <span className="text-sm text-muted-foreground">進捗状況</span>
            <span className="flex items-baseline gap-1">
              <span className="font-seg text-3xl text-brand md:text-4xl">{progress}</span>
              <span className="text-xl font-bold text-foreground">%</span>
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full rounded-full bg-brand"
            initial={reduce ? { width: `${progress}%` } : { width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        <p className="text-xs text-muted-foreground sm:text-right">
          最終更新: {new Date(roadmap.lastUpdated).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {roadmap.phases.map((phase, index) => (
          <RoadmapPhaseCard
            key={phase.id}
            phase={phase}
            index={index}
            isLast={index === roadmap.phases.length - 1}
          />
        ))}
      </div>

      {/* Footer note */}
      <div className="rounded-2xl bg-secondary p-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">注意:</strong>{' '}
          このロードマップは現時点での計画であり、開発状況やユーザーフィードバックに応じて変更される可能性があります。
          最新情報は随時更新いたします。
        </p>
      </div>
    </div>
  );
}
