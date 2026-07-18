import type { ReactNode } from "react";

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

export const Box = ({
  padding = "sm",
  radius = "sm",
  variant = "card",
  children,
}: TBoxProps) => {
  const className = [
    padding && `p-${padding}`,
    radius && `radius-${radius}`,
    variant && `variant-${variant}`,
  ]
    .filter((token): token is string => Boolean(token))
    .join(" ");

  return <div className={className || undefined}>{children}</div>;
};
