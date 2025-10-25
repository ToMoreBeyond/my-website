/**
 * ARIA属性自動設定ユーティリティ
 * アクセシビリティ向上のためのARIA属性を提供
 */

export interface AriaLabelProps {
  "aria-label": string;
}

export interface AriaDescribedByProps {
  "aria-describedby": string;
}

export interface AriaExpandedProps {
  "aria-expanded": boolean;
}

export interface AriaHiddenProps {
  "aria-hidden": boolean;
}

export interface AriaLiveProps {
  "aria-live": "polite" | "assertive" | "off";
}

/**
 * ボタンのARIA属性を生成
 */
export function getButtonAriaProps(
  label: string,
  options: {
    expanded?: boolean;
    controls?: string;
    pressed?: boolean;
  } = {}
): Record<string, string | boolean> {
  const props: Record<string, string | boolean> = {
    "aria-label": label,
  };

  if (options.expanded !== undefined) {
    props["aria-expanded"] = options.expanded;
  }

  if (options.controls) {
    props["aria-controls"] = options.controls;
  }

  if (options.pressed !== undefined) {
    props["aria-pressed"] = options.pressed;
  }

  return props;
}

/**
 * ナビゲーションのARIA属性を生成
 */
export function getNavAriaProps(label: string): Record<string, string> {
  return {
    "aria-label": label,
    role: "navigation",
  };
}

/**
 * ダイアログ（モーダル）のARIA属性を生成
 */
export function getDialogAriaProps(
  labelledBy: string,
  describedBy?: string
): Record<string, string | boolean> {
  const props: Record<string, string | boolean> = {
    role: "dialog",
    "aria-modal": true,
    "aria-labelledby": labelledBy,
  };

  if (describedBy) {
    props["aria-describedby"] = describedBy;
  }

  return props;
}

/**
 * フォームフィールドのARIA属性を生成
 */
export function getFormFieldAriaProps(
  label: string,
  options: {
    required?: boolean;
    invalid?: boolean;
    describedBy?: string;
  } = {}
): Record<string, string | boolean> {
  const props: Record<string, string | boolean> = {
    "aria-label": label,
  };

  if (options.required) {
    props["aria-required"] = true;
  }

  if (options.invalid) {
    props["aria-invalid"] = true;
  }

  if (options.describedBy) {
    props["aria-describedby"] = options.describedBy;
  }

  return props;
}

/**
 * ライブリージョンのARIA属性を生成
 */
export function getLiveRegionAriaProps(
  mode: "polite" | "assertive" = "polite"
): Record<string, string> {
  return {
    "aria-live": mode,
    "aria-atomic": "true",
  };
}
