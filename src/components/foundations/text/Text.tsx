import type { ElementType, ReactNode } from "react";

import type { TTextVariant } from "../../../tokens/types.ts";

export type TTextAs = "label" | "span";

export interface TTextProps {
  variant?: TTextVariant;
  /** Override the default element for the variant, e.g. "label" to associate with a form control via htmlFor. */
  as?: TTextAs;
  id?: string;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
}

const defaultElement: Record<TTextVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  caption: "span",
  overline: "span",
  mono: "span",
};

export const Text = ({
  variant = "body",
  as,
  id,
  htmlFor,
  className,
  children,
}: TTextProps) => {
  const Component = as ?? defaultElement[variant];

  return (
    <Component
      className={className ? `text-${variant} ${className}` : `text-${variant}`}
      id={id}
      htmlFor={as === "label" ? htmlFor : undefined}
    >
      {children}
    </Component>
  );
};
