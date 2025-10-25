'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { RoadmapPhase } from '@/types/roadmap';
import { RoadmapStatusBadge } from './RoadmapStatusBadge';
import { formatRoadmapQuarter } from '@/types/roadmap';

interface RoadmapPhaseCardProps {
  phase: RoadmapPhase;
  index: number;
  isLast?: boolean;
}

export function RoadmapPhaseCard({ phase, index, isLast = false }: RoadmapPhaseCardProps) {
  const cardColors = {
    completed: 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/10',
    'in-progress': 'border-primary-300 dark:border-primary-700 bg-primary-50/50 dark:bg-primary-900/10',
    planned: 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/50',
  };

  const timelineColors = {
    completed: 'bg-emerald-500',
    'in-progress': 'bg-primary-500',
    planned: 'bg-neutral-300 dark:bg-neutral-600',
  };

  return (
    <div className="relative flex gap-6 pb-12">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        {/* Icon circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`w-12 h-12 rounded-full ${timelineColors[phase.status]} flex items-center justify-center text-white shadow-lg z-10`}
        >
          {phase.status === 'completed' ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <span className="text-lg font-bold">{index + 1}</span>
          )}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            viewport={{ once: true }}
            className={`w-1 flex-1 ${timelineColors[phase.status]} mt-2`}
          />
        )}
      </div>

      {/* Card content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`flex-1 p-6 rounded-xl border-2 ${cardColors[phase.status]} shadow-md hover:shadow-lg transition-shadow duration-300`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              {phase.name}
            </h3>
            <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold">{phase.stage}</span>
              <span className="text-neutral-400 dark:text-neutral-600">•</span>
              <span>{formatRoadmapQuarter(phase.targetDate)}</span>
            </div>
          </div>
          <RoadmapStatusBadge status={phase.status} />
        </div>

        {/* Description */}
        {phase.description && (
          <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
            {phase.description}
          </p>
        )}

        {/* Features */}
        {phase.features && phase.features.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3 uppercase tracking-wider">
              主な機能
            </h4>
            <ul className="grid gap-2">
              {phase.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Completed date */}
        {phase.completedDate && (
          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <p className="text-sm text-emerald-700 dark:text-emerald-400 font-semibold">
              完了日: {formatRoadmapQuarter(phase.completedDate)}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
