import type { CSSProperties, MouseEventHandler, ReactNode, Ref } from "react";

import type { TSpacingToken } from "../../../tokens/types.ts";

import "./Button.css";

export type TButtonSize = "sm" | "md" | "lg";

export type TButtonVariant = "primary" | "secondary" | "tertiary" | "destructive";

export type TButtonType = "button" | "submit";

export interface TButtonProps {
  size?: TButtonSize;
  variant?: TButtonVariant;
  type?: TButtonType;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

type TButtonStyle = CSSProperties & {
  "--button-padding-block"?: string;
  "--button-padding-inline"?: string;
  "--button-font-size"?: string;
};

const paddingBlockBySize: Record<TButtonSize, TSpacingToken> = {
  sm: "xs",
  md: "xs",
  lg: "sm",
};

const paddingInlineBySize: Record<TButtonSize, TSpacingToken> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

const fontSizeBySize: Record<TButtonSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export const Button = ({
  size = "md",
  variant = "primary",
  type = "button",
  disabled,
  onClick,
  ariaLabel,
  children,
  ref,
}: TButtonProps) => {
  const style: TButtonStyle = {
    "--button-padding-block": `var(--spacing-${paddingBlockBySize[size]})`,
    "--button-padding-inline": `var(--spacing-${paddingInlineBySize[size]})`,
    "--button-font-size": `var(--font-size-${fontSizeBySize[size]})`,
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={`button variant-${variant}`}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
