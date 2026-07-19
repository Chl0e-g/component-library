import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

import type { TFontSizeToken } from "../../../tokens/types.ts";

export interface TIconProps {
  icon: LucideIcon;
  /** Explicit size for standalone use. Omit to inherit the surrounding font-size. */
  size?: TFontSizeToken;
  /** Accessible name. Omit for decorative icons (e.g. paired with visible label text). */
  ariaLabel?: string;
}

export const Icon = ({ icon: IconComponent, size, ariaLabel }: TIconProps) => {
  const style: CSSProperties | undefined = size
    ? { fontSize: `var(--font-size-${size})` }
    : undefined;

  return (
    <IconComponent
      size="1em"
      style={style}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    />
  );
};
