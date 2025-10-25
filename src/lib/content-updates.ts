/**
 * コンテンツ更新通知機能
 *
 * コンテンツの更新状態を管理し、NEWバッジの表示判定などを行います。
 */

/**
 * コンテンツが「新しい」と判定する日数（デフォルト: 7日）
 */
export const NEW_CONTENT_THRESHOLD_DAYS = 7;

/**
 * コンテンツが「更新された」と判定する日数（デフォルト: 30日）
 */
export const UPDATED_CONTENT_THRESHOLD_DAYS = 30;

/**
 * 日付が指定日数以内かどうかを判定
 */
export function isWithinDays(date: Date | string, days: number): boolean {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = now.getTime() - targetDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return diffDays <= days && diffDays >= 0;
}

/**
 * コンテンツが「新しい」かどうかを判定
 */
export function isNewContent(
  createdDate: Date | string,
  thresholdDays: number = NEW_CONTENT_THRESHOLD_DAYS
): boolean {
  return isWithinDays(createdDate, thresholdDays);
}

/**
 * コンテンツが「最近更新された」かどうかを判定
 */
export function isRecentlyUpdated(
  updatedDate: Date | string,
  createdDate?: Date | string,
  thresholdDays: number = UPDATED_CONTENT_THRESHOLD_DAYS
): boolean {
  // 更新日が作成日と同じ場合は「更新」ではなく「新規」として扱う
  if (createdDate) {
    const updated = typeof updatedDate === 'string' ? new Date(updatedDate) : updatedDate;
    const created = typeof createdDate === 'string' ? new Date(createdDate) : createdDate;

    if (updated.getTime() === created.getTime()) {
      return false;
    }
  }

  return isWithinDays(updatedDate, thresholdDays);
}

/**
 * NEWバッジを表示すべきかどうかを判定
 */
export function shouldShowNewBadge(
  createdDate: Date | string,
  updatedDate?: Date | string
): boolean {
  // 作成日が新しい場合
  if (isNewContent(createdDate)) {
    return true;
  }

  // 更新日が最近の場合（かつ作成日と異なる場合）
  if (updatedDate && isRecentlyUpdated(updatedDate, createdDate)) {
    return true;
  }

  return false;
}

/**
 * 表示するバッジのタイプを取得
 */
export function getContentBadgeType(
  createdDate: Date | string,
  updatedDate?: Date | string
): 'new' | 'updated' | null {
  // 作成日が新しい場合は「NEW」
  if (isNewContent(createdDate)) {
    return 'new';
  }

  // 更新日が最近の場合は「UPDATED」
  if (updatedDate && isRecentlyUpdated(updatedDate, createdDate)) {
    return 'updated';
  }

  return null;
}

/**
 * 相対的な日付表示（例: "2日前", "1週間前"）
 */
export function getRelativeTimeString(date: Date | string): string {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = now.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return '今日';
  } else if (diffDays === 1) {
    return '昨日';
  } else if (diffDays < 7) {
    return `${diffDays}日前`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}週間前`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}ヶ月前`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years}年前`;
  }
}

/**
 * コンテンツ更新情報
 */
export interface ContentUpdateInfo {
  /** 作成日 */
  createdDate: Date | string;
  /** 更新日（オプション） */
  updatedDate?: Date | string;
  /** NEWバッジを表示するか */
  showNewBadge: boolean;
  /** バッジタイプ */
  badgeType: 'new' | 'updated' | null;
  /** 相対時間表示 */
  relativeTime: string;
}

/**
 * コンテンツの更新情報を取得
 */
export function getContentUpdateInfo(
  createdDate: Date | string,
  updatedDate?: Date | string
): ContentUpdateInfo {
  const badgeType = getContentBadgeType(createdDate, updatedDate);
  const dateToShow = updatedDate && badgeType === 'updated' ? updatedDate : createdDate;

  return {
    createdDate,
    updatedDate,
    showNewBadge: badgeType !== null,
    badgeType,
    relativeTime: getRelativeTimeString(dateToShow),
  };
}
