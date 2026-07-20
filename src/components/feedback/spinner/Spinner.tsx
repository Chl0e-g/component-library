import type { CSSProperties } from "react";

import "./Spinner.css";

export type TSpinnerSize = "sm" | "md" | "lg";

const sizeToFontSizeToken: Record<TSpinnerSize, string> = {
  sm: "sm",
  md: "xl",
  lg: "4xl",
};

export interface TSpinnerProps {
  /** Explicit size for standalone use. Omit to inherit the surrounding font-size (e.g. inside Button). */
  size?: TSpinnerSize;
}

/** Inherits font-size by default so it scales inside text/buttons, use `size` prop for standalone use. */
export const Spinner = ({ size }: TSpinnerProps = {}) => {
  const style: CSSProperties | undefined = size
    ? { fontSize: `var(--font-size-${sizeToFontSizeToken[size]})` }
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
