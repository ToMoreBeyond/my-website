"use client";

import { useEffect, useCallback } from "react";

interface KeyboardNavigationOptions {
  onEscape?: () => void;
  onTab?: (event: KeyboardEvent) => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEnter?: () => void;
}

/**
 * キーボードナビゲーション管理フック
 * グローバルなキーボードイベントを管理し、アクセシビリティを向上
 */
export function useKeyboardNavigation(options: KeyboardNavigationOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          if (options.onEscape) {
            event.preventDefault();
            options.onEscape();
          }
          break;
        case "Tab":
          if (options.onTab) {
            options.onTab(event);
          }
          break;
        case "ArrowUp":
          if (options.onArrowUp) {
            event.preventDefault();
            options.onArrowUp();
          }
          break;
        case "ArrowDown":
          if (options.onArrowDown) {
            event.preventDefault();
            options.onArrowDown();
          }
          break;
        case "ArrowLeft":
          if (options.onArrowLeft) {
            event.preventDefault();
            options.onArrowLeft();
          }
          break;
        case "ArrowRight":
          if (options.onArrowRight) {
            event.preventDefault();
            options.onArrowRight();
          }
          break;
        case "Enter":
          if (options.onEnter) {
            event.preventDefault();
            options.onEnter();
          }
          break;
      }
    },
    [options]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}
