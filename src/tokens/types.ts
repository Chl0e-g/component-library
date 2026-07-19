import type { textStyles, fontSize } from "./typography.ts";
import type { spacing } from "./spacing.ts";
import type { radius } from "./radius.ts";

export type TTextVariant = keyof typeof textStyles;
export type TSpacingToken = keyof typeof spacing;
export type TRadiusToken = keyof typeof radius;
export type TFontSizeToken = keyof typeof fontSize;
