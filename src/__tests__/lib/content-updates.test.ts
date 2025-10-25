import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  NEW_CONTENT_THRESHOLD_DAYS,
  UPDATED_CONTENT_THRESHOLD_DAYS,
  isWithinDays,
  isNewContent,
  isRecentlyUpdated,
  shouldShowNewBadge,
  getContentBadgeType,
  getRelativeTimeString,
  getContentUpdateInfo,
} from '@/lib/content-updates';

describe('Content Updates Utilities', () => {
  describe('定数', () => {
    it('NEW_CONTENT_THRESHOLD_DAYSが7日である', () => {
      expect(NEW_CONTENT_THRESHOLD_DAYS).toBe(7);
    });

    it('UPDATED_CONTENT_THRESHOLD_DAYSが30日である', () => {
      expect(UPDATED_CONTENT_THRESHOLD_DAYS).toBe(30);
    });
  });

  describe('isWithinDays', () => {
    it('今日の日付は0日以内である', () => {
      const today = new Date();
      expect(isWithinDays(today, 0)).toBe(true);
    });

    it('昨日の日付は2日以内である', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isWithinDays(yesterday, 2)).toBe(true);
    });

    it('5日前の日付は7日以内である', () => {
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      expect(isWithinDays(fiveDaysAgo, 7)).toBe(true);
    });

    it('10日前の日付は7日以内ではない', () => {
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      expect(isWithinDays(tenDaysAgo, 7)).toBe(false);
    });

    it('文字列の日付でも正しく判定できる', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateString = yesterday.toISOString();

      expect(isWithinDays(dateString, 2)).toBe(true);
    });

    it('未来の日付はfalseを返す', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isWithinDays(tomorrow, 7)).toBe(false);
    });

    it('境界値テスト: ちょうど7日前', () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      expect(isWithinDays(sevenDaysAgo, 7)).toBe(true);
    });
  });

  describe('isNewContent', () => {
    it('3日前の作成日はtrueを返す', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      expect(isNewContent(threeDaysAgo)).toBe(true);
    });

    it('10日前の作成日はfalseを返す', () => {
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      expect(isNewContent(tenDaysAgo)).toBe(false);
    });

    it('カスタム閾値で判定できる', () => {
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

      expect(isNewContent(fiveDaysAgo, 3)).toBe(false);
      expect(isNewContent(fiveDaysAgo, 7)).toBe(true);
    });

    it('文字列の日付でも判定できる', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateString = yesterday.toISOString();

      expect(isNewContent(dateString)).toBe(true);
    });
  });

  describe('isRecentlyUpdated', () => {
    it('5日前の更新日はtrueを返す', () => {
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      expect(isRecentlyUpdated(fiveDaysAgo)).toBe(true);
    });

    it('40日前の更新日はfalseを返す', () => {
      const fortyDaysAgo = new Date();
      fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 40);
      expect(isRecentlyUpdated(fortyDaysAgo)).toBe(false);
    });

    it('作成日と更新日が同じ場合はfalseを返す', () => {
      const date = new Date();
      expect(isRecentlyUpdated(date, date)).toBe(false);
    });

    it('作成日と更新日が異なり、更新日が最近の場合はtrueを返す', () => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - 100);

      const updatedDate = new Date();
      updatedDate.setDate(updatedDate.getDate() - 10);

      expect(isRecentlyUpdated(updatedDate, createdDate)).toBe(true);
    });

    it('カスタム閾値で判定できる', () => {
      const twentyDaysAgo = new Date();
      twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

      expect(isRecentlyUpdated(twentyDaysAgo, undefined, 15)).toBe(false);
      expect(isRecentlyUpdated(twentyDaysAgo, undefined, 25)).toBe(true);
    });
  });

  describe('shouldShowNewBadge', () => {
    it('新しいコンテンツの場合trueを返す', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      expect(shouldShowNewBadge(threeDaysAgo)).toBe(true);
    });

    it('最近更新されたコンテンツの場合trueを返す', () => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - 100);

      const updatedDate = new Date();
      updatedDate.setDate(updatedDate.getDate() - 10);

      expect(shouldShowNewBadge(createdDate, updatedDate)).toBe(true);
    });

    it('古いコンテンツの場合falseを返す', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 100);
      expect(shouldShowNewBadge(oldDate)).toBe(false);
    });

    it('作成日と更新日が同じ古いコンテンツはfalseを返す', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 100);
      expect(shouldShowNewBadge(oldDate, oldDate)).toBe(false);
    });
  });

  describe('getContentBadgeType', () => {
    it('新しいコンテンツは"new"を返す', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      expect(getContentBadgeType(threeDaysAgo)).toBe('new');
    });

    it('最近更新されたコンテンツは"updated"を返す', () => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - 100);

      const updatedDate = new Date();
      updatedDate.setDate(updatedDate.getDate() - 10);

      expect(getContentBadgeType(createdDate, updatedDate)).toBe('updated');
    });

    it('古いコンテンツはnullを返す', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 100);
      expect(getContentBadgeType(oldDate)).toBeNull();
    });

    it('新しいコンテンツは更新日があっても"new"を優先する', () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      // 作成日が新しい場合は"new"を返す
      expect(getContentBadgeType(twoDaysAgo, yesterday)).toBe('new');
    });
  });

  describe('getRelativeTimeString', () => {
    it('今日の日付は"今日"を返す', () => {
      const today = new Date();
      expect(getRelativeTimeString(today)).toBe('今日');
    });

    it('昨日の日付は"昨日"を返す', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(getRelativeTimeString(yesterday)).toBe('昨日');
    });

    it('3日前の日付は"3日前"を返す', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      expect(getRelativeTimeString(threeDaysAgo)).toBe('3日前');
    });

    it('10日前の日付は"1週間前"を返す', () => {
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      expect(getRelativeTimeString(tenDaysAgo)).toBe('1週間前');
    });

    it('20日前の日付は"2週間前"を返す', () => {
      const twentyDaysAgo = new Date();
      twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);
      expect(getRelativeTimeString(twentyDaysAgo)).toBe('2週間前');
    });

    it('40日前の日付は"1ヶ月前"を返す', () => {
      const fortyDaysAgo = new Date();
      fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 40);
      expect(getRelativeTimeString(fortyDaysAgo)).toBe('1ヶ月前');
    });

    it('100日前の日付は"3ヶ月前"を返す', () => {
      const hundredDaysAgo = new Date();
      hundredDaysAgo.setDate(hundredDaysAgo.getDate() - 100);
      expect(getRelativeTimeString(hundredDaysAgo)).toBe('3ヶ月前');
    });

    it('400日前の日付は"1年前"を返す', () => {
      const fourHundredDaysAgo = new Date();
      fourHundredDaysAgo.setDate(fourHundredDaysAgo.getDate() - 400);
      expect(getRelativeTimeString(fourHundredDaysAgo)).toBe('1年前');
    });

    it('文字列の日付でも相対時間を返す', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateString = yesterday.toISOString();

      expect(getRelativeTimeString(dateString)).toBe('昨日');
    });
  });

  describe('getContentUpdateInfo', () => {
    it('新しいコンテンツの情報を正しく返す', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const info = getContentUpdateInfo(threeDaysAgo);

      expect(info.showNewBadge).toBe(true);
      expect(info.badgeType).toBe('new');
      expect(info.relativeTime).toBe('3日前');
      expect(info.createdDate).toBe(threeDaysAgo);
    });

    it('最近更新されたコンテンツの情報を正しく返す', () => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - 100);

      const updatedDate = new Date();
      updatedDate.setDate(updatedDate.getDate() - 10);

      const info = getContentUpdateInfo(createdDate, updatedDate);

      expect(info.showNewBadge).toBe(true);
      expect(info.badgeType).toBe('updated');
      expect(info.relativeTime).toBe('1週間前'); // 更新日の相対時間
      expect(info.createdDate).toBe(createdDate);
      expect(info.updatedDate).toBe(updatedDate);
    });

    it('古いコンテンツの情報を正しく返す', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 100);

      const info = getContentUpdateInfo(oldDate);

      expect(info.showNewBadge).toBe(false);
      expect(info.badgeType).toBeNull();
      expect(info.relativeTime).toBe('3ヶ月前');
    });

    it('新しいコンテンツは作成日の相対時間を表示する', () => {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const info = getContentUpdateInfo(twoDaysAgo);

      expect(info.badgeType).toBe('new');
      expect(info.relativeTime).toBe('2日前'); // 作成日の相対時間
    });

    it('更新されたコンテンツは更新日の相対時間を表示する', () => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - 50);

      const updatedDate = new Date();
      updatedDate.setDate(updatedDate.getDate() - 5);

      const info = getContentUpdateInfo(createdDate, updatedDate);

      expect(info.badgeType).toBe('updated');
      expect(info.relativeTime).toBe('5日前'); // 更新日の相対時間
    });

    it('文字列の日付でも正しく処理できる', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateString = yesterday.toISOString();

      const info = getContentUpdateInfo(dateString);

      expect(info.showNewBadge).toBe(true);
      expect(info.badgeType).toBe('new');
      expect(info.relativeTime).toBe('昨日');
    });
  });

  describe('境界値テスト', () => {
    it('ちょうど7日前は"new"である', () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      expect(isNewContent(sevenDaysAgo)).toBe(true);
      expect(getContentBadgeType(sevenDaysAgo)).toBe('new');
    });

    it('ちょうど8日前は"new"ではない', () => {
      const eightDaysAgo = new Date();
      eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

      expect(isNewContent(eightDaysAgo)).toBe(false);
    });

    it('ちょうど30日前は"updated"である', () => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - 100);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      expect(isRecentlyUpdated(thirtyDaysAgo, createdDate)).toBe(true);
      expect(getContentBadgeType(createdDate, thirtyDaysAgo)).toBe('updated');
    });

    it('ちょうど31日前は"updated"ではない', () => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - 100);

      const thirtyOneDaysAgo = new Date();
      thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31);

      expect(isRecentlyUpdated(thirtyOneDaysAgo, createdDate)).toBe(false);
      expect(getContentBadgeType(createdDate, thirtyOneDaysAgo)).toBeNull();
    });
  });
});
