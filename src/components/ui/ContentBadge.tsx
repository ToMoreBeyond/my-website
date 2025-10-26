'use client';

import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { getContentUpdateInfo } from '@/lib/content-updates';

interface ContentBadgeProps {
  /** 作成日 */
  createdDate: Date | string;
  /** 更新日（オプション） */
  updatedDate?: Date | string;
  /** カスタムクラス */
  className?: string;
  /** アニメーションを有効にするか */
  animate?: boolean;
}

export function ContentBadge({
  createdDate,
  updatedDate,
  className = '',
  animate = true,
}: ContentBadgeProps) {
  const updateInfo = getContentUpdateInfo(createdDate, updatedDate);

  // バッジを表示しない場合はnullを返す
  if (!updateInfo.showNewBadge || !updateInfo.badgeType) {
    return null;
  }

  const isNew = updateInfo.badgeType === 'new';
  const bgColor = isNew
    ? 'bg-emerald-500'
    : 'bg-primary-500';
  const icon = isNew ? (
    <Sparkles className="w-3 h-3" />
  ) : (
    <RefreshCw className="w-3 h-3" />
  );
  const label = isNew ? 'NEW' : 'UPDATED';

  const badge = (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wide ${bgColor} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );

  // アニメーションあり
  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ scale: 1.05 }}
      >
        {badge}
      </motion.div>
    );
  }

  // アニメーションなし
  return badge;
}

/**
 * 相対時間表示付きバッジ
 */
interface ContentBadgeWithTimeProps extends ContentBadgeProps {
  /** 時間表示を表示するか */
  showTime?: boolean;
}

export function ContentBadgeWithTime({
  createdDate,
  updatedDate,
  className = '',
  animate = true,
  showTime = true,
}: ContentBadgeWithTimeProps) {
  const updateInfo = getContentUpdateInfo(createdDate, updatedDate);

  return (
    <div className="flex items-center gap-2">
      <ContentBadge
        createdDate={createdDate}
        updatedDate={updatedDate}
        className={className}
        animate={animate}
      />
      {showTime && updateInfo.showNewBadge && (
        <span className="text-xs text-neutral-500">
          {updateInfo.relativeTime}
        </span>
      )}
    </div>
  );
}
