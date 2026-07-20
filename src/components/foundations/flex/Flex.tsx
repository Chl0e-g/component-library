import type { CSSProperties, ReactNode } from "react";

import type { TSpacingToken } from "../../../tokens/types.ts";

import "./Flex.css";

export type TFlexGap = Extract<TSpacingToken, "xs" | "sm" | "md" | "lg">;

export type TFlexDirection = "row" | "column";

export type TFlexAlign = "start" | "center" | "end" | "stretch";

export type TFlexJustify = "start" | "center" | "end" | "between";

export type TFlexAs = "div" | "span";

export interface TFlexProps {
  direction?: TFlexDirection;
  gap?: TFlexGap;
  align?: TFlexAlign;
  justify?: TFlexJustify;
  /** Element to render as. Use "span" if required for nesting e.g. inside a button. Defaults to "div". */
  as?: TFlexAs;
  className?: string;
  children: ReactNode;
}

type TFlexStyle = CSSProperties & {
  "--flex-display"?: string;
  "--flex-direction"?: string;
  "--flex-gap"?: string;
  "--flex-align"?: string;
  "--flex-justify"?: string;
};

const alignItems: Record<TFlexAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
};

const justifyContent: Record<TFlexJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
};

/** Flexbox layout primitive driven by spacing tokens; accepts `className` for one-off overrides. */
export const Flex = ({
  direction = "row",
  gap,
  align,
  justify,
  as = "div",
  className,
  children,
}: TFlexProps) => {
  const Component = as;

  const style: TFlexStyle = {
    "--flex-display": as === "span" ? "inline-flex" : "flex",
    "--flex-direction": direction,
    "--flex-gap": gap && `var(--spacing-${gap})`,
    "--flex-align": align && alignItems[align],
    "--flex-justify": justify && justifyContent[justify],
  };

  return (
    <Component
      className={className ? `flex ${className}` : "flex"}
      style={style}
    >
      {children}
    </Component>
  );
};
