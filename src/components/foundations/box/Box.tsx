import type { CSSProperties, ReactNode } from "react";

import type { TRadiusToken, TSpacingToken } from "../../../tokens/types.ts";

import "./Box.css";

export type TBoxPadding = Extract<TSpacingToken, "sm" | "md">;

export type TBoxVariant = "card" | "muted" | "primary";

export interface TBoxProps {
  padding?: TBoxPadding;
  radius?: TRadiusToken;
  variant?: TBoxVariant;
  children: ReactNode;
}

type TBoxStyle = CSSProperties & {
  "--box-padding"?: string;
  "--box-radius"?: string;
};

export const Box = ({
  padding = "sm",
  radius = "sm",
  variant = "card",
  children,
}: TBoxProps) => {
  const style: TBoxStyle = {
    "--box-padding": `var(--spacing-${padding})`,
    "--box-radius": `var(--radius-${radius})`,
  };

  return (
    <div className={`box variant-${variant}`} style={style}>
      {children}
    </div>
  );
};
