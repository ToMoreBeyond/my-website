'use client';

import { motion } from 'framer-motion';
import type { ProductRoadmap } from '@/types/roadmap';
import { RoadmapPhaseCard } from './RoadmapPhaseCard';
import { calculateRoadmapProgress } from '@/data/roadmaps';

interface RoadmapTimelineProps {
  roadmap: ProductRoadmap;
}

export function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  const progress = calculateRoadmapProgress(roadmap);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header with progress */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
            開発ロードマップ
          </h2>
          <div className="text-right">
            <div className="text-sm text-neutral-600 mb-1">
              進捗状況
            </div>
            <div className="text-3xl font-bold text-primary-600">
              {progress}%
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-full"
          />
        </div>

        <div className="mt-2 text-xs text-neutral-500 text-right">
          最終更新: {new Date(roadmap.lastUpdated).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </motion.div>

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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-8 p-6 bg-neutral-50 rounded-xl border border-neutral-200"
      >
        <p className="text-sm text-neutral-600 leading-relaxed">
          <strong className="text-neutral-900">注意:</strong>{' '}
          このロードマップは現時点での計画であり、開発状況やユーザーフィードバックに応じて変更される可能性があります。
          最新情報は随時更新いたします。
        </p>
      </motion.div>
    </div>
  );
}
