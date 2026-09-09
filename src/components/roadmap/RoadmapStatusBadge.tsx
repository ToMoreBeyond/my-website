import { CheckCircle2, Clock, Calendar } from 'lucide-react';
import type { RoadmapStatus } from '@/types/roadmap';
import { getRoadmapStatusText } from '@/types/roadmap';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RoadmapStatusBadgeProps {
  status: RoadmapStatus;
  className?: string;
}

const variantByStatus: Record<RoadmapStatus, 'secondary' | 'brand' | 'outline'> = {
  completed: 'secondary',
  'in-progress': 'brand',
  planned: 'outline',
};

function StatusIcon({ status }: { status: RoadmapStatus }) {
  switch (status) {
    case 'completed':
      return <CheckCircle2 />;
    case 'in-progress':
      return <Clock />;
    case 'planned':
      return <Calendar />;
    default:
      return null;
  }
}

/**
 * ロードマップの状態。光点色になるのは「開発中」だけ。
 */
export function RoadmapStatusBadge({ status, className }: RoadmapStatusBadgeProps) {
  return (
    <Badge
      variant={variantByStatus[status]}
      className={cn('h-7 gap-1.5 px-3 text-xs', className)}
    >
      <StatusIcon status={status} />
      <span>{getRoadmapStatusText(status)}</span>
    </Badge>
  );
}
