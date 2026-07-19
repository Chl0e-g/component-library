import type { CSSProperties, MouseEventHandler, ReactNode, Ref } from "react";
import type { LucideIcon } from "lucide-react";

import type { TSpacingToken } from "../../../tokens/types.ts";
import { Spinner } from "../../feedback/spinner/Spinner.tsx";
import { Icon } from "../../foundations/icon/Icon.tsx";
import { Flex } from "../../foundations/flex/Flex.tsx";

import "./Button.css";

export type TButtonSize = "sm" | "md" | "lg";

export type TButtonVariant =
  "primary" | "secondary" | "tertiary" | "destructive";

export type TButtonType = "button" | "submit";

export interface TButtonProps {
  size?: TButtonSize;
  variant?: TButtonVariant;
  type?: TButtonType;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  children?: ReactNode;
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
  loading,
  leftIcon,
  rightIcon,
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
      disabled={disabled || loading}
      aria-busy={loading}
      className={`button variant-${variant}${loading ? " loading" : ""}`}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {loading && (
        <span className="button-spinner">
          <Spinner />
        </span>
      )}

      <Flex
        as="span"
        gap="sm"
        align="center"
        className={
          loading ? "button-content button-content-hidden" : "button-content"
        }
      >
        {leftIcon && <Icon icon={leftIcon} />}
        {children}
        {rightIcon && <Icon icon={rightIcon} />}
      </Flex>
    </button>
  );
};
