import type { CSSProperties } from "react";

import type { TFontSizeToken } from "../../../tokens/types.ts";

import "./Spinner.css";

export interface TSpinnerProps {
  /** Explicit size for standalone use. Omit to inherit the surrounding font-size (e.g. inside Button). */
  size?: TFontSizeToken;
}

export const Spinner = ({ size }: TSpinnerProps = {}) => {
  const style: CSSProperties | undefined = size
    ? { fontSize: `var(--font-size-${size})` }
    : undefined;

  return (
    <span
      className="spinner"
      style={style}
      role="status"
      aria-label="Loading"
    />
  );
};
