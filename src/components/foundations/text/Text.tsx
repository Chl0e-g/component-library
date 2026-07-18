import type { ElementType, ReactNode } from "react";

import type { TTextVariant } from "../../../tokens/types.ts";

export interface TTextProps {
  variant?: TTextVariant;
  as?: ElementType;
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

export const Text = ({ variant = "body", as, children }: TTextProps) => {
  const Component = as ?? defaultElement[variant];

  return <Component className={`text-${variant}`}>{children}</Component>;
};
