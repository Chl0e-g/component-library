import { writeFileSync } from "node:fs";

import { textStyles } from "../src/tokens/typography.ts";

function generateTextStyles(styles: typeof textStyles): string {
  return Object.entries(styles)
    .map(([name, style]) => {
      const declarations = [
        `  font-family: ${style.fontFamily};`,
        `  font-size: ${style.fontSize};`,
        `  font-weight: ${style.fontWeight};`,
        `  line-height: ${style.lineHeight};`,
      ];

      if ("letterSpacing" in style) {
        declarations.push(`  letter-spacing: ${style.letterSpacing};`);
      }
      if ("textTransform" in style) {
        declarations.push(`  text-transform: ${style.textTransform};`);
      }

      return `\n.text-${name} {\n${declarations.join("\n")}\n}`;
    })
    .join("\n");
}

const css = generateTextStyles(textStyles);

writeFileSync("src/styles/text-styles.css", css.trim());

console.log("✓ Generated text-styles.css");
