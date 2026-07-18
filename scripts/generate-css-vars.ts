import { writeFileSync } from "node:fs";

import { colors } from "../src/tokens/colors.ts";
import { spacing } from "../src/tokens/spacing.ts";
import { radius } from "../src/tokens/radius.ts";
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} from "../src/tokens/typography.ts";

type Tokens = Record<string, string | number>;

function generateVariables(
  prefix: string,
  tokens: Tokens,
  unit?: string,
): string {
  return Object.entries(tokens)
    .map(([key, value]) => {
      const formattedValue =
        typeof value === "number" && unit ? `${value}${unit}` : value;

      return `  --${prefix}-${key}: ${formattedValue};`;
    })
    .join("\n");
}

const css = `:root {
${generateVariables("color", colors)}

${generateVariables("spacing", spacing, "px")}

${generateVariables("radius", radius, "px")}

${generateVariables("font-family", fontFamily)}

${generateVariables("font-size", fontSize)}

${generateVariables("font-weight", fontWeight)}

${generateVariables("line-height", lineHeight)}

${generateVariables("letter-spacing", letterSpacing)}

}
`;

writeFileSync("src/styles/tokens.css", css.trim());

console.log("✓ Generated tokens.css");
