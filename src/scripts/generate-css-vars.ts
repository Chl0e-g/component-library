import { writeFileSync } from "node:fs";

import { colors } from "../tokens/colors";
import { spacing } from "../tokens/spacing";
import { radius } from "../tokens/radius";
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "../tokens/typography";

type Tokens = Record<string, string | number>;

function generateVariables(
  prefix: string,
  tokens: Tokens,
  unit?: string
): string {
  return Object.entries(tokens)
    .map(([key, value]) => {
      const formattedValue =
        typeof value === "number" && unit
          ? `${value}${unit}`
          : value;

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

}
`;

writeFileSync("src/styles/tokens.css", css.trim());

console.log("✓ Generated tokens.css");