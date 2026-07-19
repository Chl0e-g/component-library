import type { CSSProperties } from "react";

import type { TFontSizeToken } from "../../../tokens/types.ts";

import "./Spinner.css";

export type TSpinnerSize = Extract<TFontSizeToken, "sm" | "md" | "lg">;

export interface TSpinnerProps {
  size?: TSpinnerSize;
}

type TSpinnerStyle = CSSProperties & {
  "--spinner-size"?: string;
};

export const Spinner = ({ size = "md" }: TSpinnerProps) => {
  const style: TSpinnerStyle = {
    "--spinner-size": `var(--font-size-${size})`,
  };

  return <span className="spinner" style={style} role="status" aria-label="Loading" />;
};
