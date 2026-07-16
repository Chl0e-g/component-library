export const fontFamily = {
  serif: '"Libre Baskerville", Georgia, serif',
  sans: '"Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", "Courier New", monospace',
};

export const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
};

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

export const letterSpacing = {
  tight: "-0.02em",
  normal: "0",
  wide: "0.05em",
};

export const textStyles = {
  body: {
    fontFamily: "var(--font-family-sans)",
    fontSize: "var(--font-size-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-normal)",
  },

  h1: {
    fontFamily: "var(--font-family-serif)",
    fontSize: "var(--font-size-xl)",
    fontWeight: "var(--font-weight-bold)",
    lineHeight: "var(--line-height-relaxed)",
  },

  h2: {
    fontFamily: "var(--font-family-serif)",
    fontSize: "var(--font-size-lg)",
    fontWeight: "var(--font-weight-semibold)",
    lineHeight: "var(--line-height-relaxed)",
  },

  h3: {
    fontFamily: "var(--font-family-serif)",
    fontSize: "var(--font-size-md)",
    fontWeight: "var(--font-weight-semibold)",
    lineHeight: "var(--line-height-normal)",
  },

  h4: {
    fontFamily: "var(--font-family-serif)",
    fontSize: "var(--font-size-sm)",
    fontWeight: "var(--font-weight-semibold)",
    lineHeight: "var(--line-height-normal)",
  },

  caption: {
    fontFamily: "var(--font-family-mono)",
    fontSize: "var(--font-size-sm)",
    fontWeight: "var(--font-weight-medium)",
    lineHeight: "var(--line-height-tight)",
  },
};
