import { CheckCircle2 } from 'lucide-react';
import type { RoadmapPhase } from '@/types/roadmap';
import { RoadmapStatusBadge } from './RoadmapStatusBadge';
import { formatRoadmapQuarter } from '@/types/roadmap';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface RoadmapPhaseCardProps {
  phase: RoadmapPhase;
  index: number;
  isLast?: boolean;
}

/**
 * ロードマップの 1 フェーズ。
 * 左の節: 完了は塗り、開発中は灯り、予定は中空。順序があるので番号を出す。
 */
export function RoadmapPhaseCard({ phase, index, isLast = false }: RoadmapPhaseCardProps) {
  const isActive = phase.status === 'in-progress';

  return (
    <div className="relative flex gap-4 pb-8 md:gap-6 md:pb-10">
      {/* Timeline indicator */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'z-10 flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold',
            phase.status === 'completed' && 'bg-foreground text-background',
            phase.status === 'in-progress' && 'bg-primary text-primary-foreground glow-ring',
            phase.status === 'planned' && 'border border-muted-foreground text-muted-foreground'
          )}
          aria-hidden
        >
          {phase.status === 'completed' ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <span className="font-display">{index + 1}</span>
          )}
        </div>

        {/* Connecting line */}
        {!isLast && (
          <div
            className={cn(
              'mt-2 w-px flex-1',
              phase.status === 'completed' ? 'bg-foreground/40' : 'bg-border'
            )}
          />
        )}
      </div>

      {/* Card content */}
      <Card className={cn('flex-1 gap-0 p-0', isActive && 'glow-ring')}>
        <CardHeader className="flex flex-col gap-4 p-5 pb-0 sm:flex-row sm:items-start sm:justify-between md:p-7 md:pb-0">
          <div className="flex flex-col gap-1.5">
            <h3 className="palt text-xl font-bold text-foreground md:text-2xl">{phase.name}</h3>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="font-display font-semibold tracking-wide">{phase.stage}</span>
              <span aria-hidden>•</span>
              <span>{formatRoadmapQuarter(phase.targetDate)}</span>
            </div>
          </div>
          <RoadmapStatusBadge status={phase.status} className="w-fit" />
        </CardHeader>

        <CardContent className="flex flex-col gap-5 p-5 md:p-7">
          {/* Description */}
          {phase.description && (
            <p className="leading-relaxed text-muted-foreground">{phase.description}</p>
          )}

          {/* Features */}
          {phase.features && phase.features.length > 0 && (
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium text-muted-foreground">主な機能</h4>
              <ul className="flex flex-col gap-2">
                {phase.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle2
                      className={cn(
                        'mt-0.5 size-4 shrink-0',
                        phase.status === 'planned' ? 'text-muted-foreground' : 'text-primary'
                      )}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Completed date */}
          {phase.completedDate && (
            <div className="border-t border-border pt-4">
              <p className="text-sm font-medium text-foreground">
                完了日: {formatRoadmapQuarter(phase.completedDate)}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
