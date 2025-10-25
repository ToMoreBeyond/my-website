import { CheckCircle2, Clock, Calendar } from 'lucide-react';
import type { RoadmapStatus } from '@/types/roadmap';
import { getRoadmapStatusText } from '@/types/roadmap';

interface RoadmapStatusBadgeProps {
  status: RoadmapStatus;
  className?: string;
}

export function RoadmapStatusBadge({ status, className = '' }: RoadmapStatusBadgeProps) {
  const getStatusIcon = (status: RoadmapStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'planned':
        return <Calendar className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const textColor = status === 'completed'
    ? 'text-emerald-700 dark:text-emerald-300'
    : status === 'in-progress'
    ? 'text-primary-700 dark:text-primary-300'
    : 'text-neutral-700 dark:text-neutral-300';

  const bgColor = status === 'completed'
    ? 'bg-emerald-100 dark:bg-emerald-900/30'
    : status === 'in-progress'
    ? 'bg-primary-100 dark:bg-primary-900/30'
    : 'bg-neutral-100 dark:bg-neutral-800';

  const borderColor = status === 'completed'
    ? 'border-emerald-300 dark:border-emerald-700'
    : status === 'in-progress'
    ? 'border-primary-300 dark:border-primary-700'
    : 'border-neutral-300 dark:border-neutral-600';

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border ${bgColor} ${textColor} ${borderColor} ${className}`}
    >
      {getStatusIcon(status)}
      <span>{getRoadmapStatusText(status)}</span>
    </div>
  );
}
