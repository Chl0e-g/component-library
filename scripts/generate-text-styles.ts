import { writeFileSync } from "node:fs";

import { textStyles } from "../src/tokens/typography.ts";

function generateTextStyles(
  styles: typeof textStyles
): string {
  return Object.entries(styles)
    .map(([name, style]) => {
      return `
.text-${name} {
  font-family: ${style.fontFamily};
  font-size: ${style.fontSize};
  font-weight: ${style.fontWeight};
  line-height: ${style.lineHeight};
}`;
    })
    .join("\n");
}

const css = generateTextStyles(textStyles);

writeFileSync(
  "src/styles/text-styles.css",
  css.trim()
);

console.log("✓ Generated text-styles.css");