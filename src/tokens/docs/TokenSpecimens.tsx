import type { CSSProperties, ReactNode } from "react";

import { semantic } from "../colors.ts";
import { spacing } from "../spacing.ts";
import { radius } from "../radius.ts";
import { shadow } from "../shadow.ts";
import { fontSize, fontWeight, textStyles } from "../typography.ts";

const grid: CSSProperties = {
  display: "grid",
  gap: "var(--spacing-md)",
  fontFamily: "var(--font-family-sans)",
  color: "var(--color-foreground)",
};

const label: CSSProperties = {
  fontFamily: "var(--font-family-mono)",
  fontSize: "var(--font-size-sm)",
  color: "var(--color-neutral-70)",
};

const name: CSSProperties = {
  fontSize: "var(--font-size-md)",
  fontWeight: "var(--font-weight-medium)",
};

function Row({
  token,
  value,
  children,
}: {
  token: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "10rem 1fr",
        alignItems: "center",
        gap: "var(--spacing-lg)",
      }}
    >
      <div>
        <div style={name}>{token}</div>
        <div style={label}>{value}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

/**
 * Semantic color roles, laid out as a responsive grid that wraps — unlike the
 * built-in `ColorItem`, whose single non-wrapping swatch row overflows once you
 * have this many entries (and long `rgb(...)` values). The swatch fill uses the
 * live `--color-*` var; the caption shows the source value from `colors.ts`.
 */
export function SemanticSwatches() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(13rem, 1fr))",
        gap: "var(--spacing-md)",
        fontFamily: "var(--font-family-sans)",
      }}
    >
      {Object.entries(semantic).map(([key, value]) => (
        <div
          key={key}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-sm)",
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: "var(--spacing-xl)",
              height: "var(--spacing-xl)",
              flexShrink: 0,
              borderRadius: "var(--radius-sm)",
              background: `var(--color-${key})`,
              border: "1px solid var(--color-neutral-40)",
            }}
          />
          <div style={{ minWidth: 0 }}>
            <div style={{ ...name, overflowWrap: "anywhere" }}>{key}</div>
            <div style={{ ...label, overflowWrap: "anywhere" }}>{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SpacingScale() {
  return (
    <div style={grid}>
      {Object.entries(spacing).map(([key, px]) => (
        <Row key={key} token={key} value={`${px}px`}>
          <div
            style={{
              width: `var(--spacing-${key})`,
              height: "var(--spacing-md)",
              background: "var(--color-primary)",
              borderRadius: "var(--radius-sm)",
            }}
          />
        </Row>
      ))}
    </div>
  );
}

export function RadiusScale() {
  return (
    <div style={grid}>
      {Object.entries(radius).map(([key, px]) => (
        <Row key={key} token={key} value={`${px}px`}>
          <div
            style={{
              width: "var(--spacing-4xl)",
              height: "var(--spacing-4xl)",
              background: "var(--color-primary-20)",
              border: "1px solid var(--color-primary-40)",
              borderRadius: `var(--radius-${key})`,
            }}
          />
        </Row>
      ))}
    </div>
  );
}

export function ShadowScale() {
  return (
    <div style={{ ...grid, gap: "var(--spacing-xl)" }}>
      {Object.entries(shadow).map(([key, value]) => (
        <Row key={key} token={key} value={value}>
          <div
            style={{
              width: "var(--spacing-4xl)",
              height: "var(--spacing-4xl)",
              background: "var(--color-card)",
              borderRadius: "var(--radius-lg)",
              boxShadow: `var(--shadow-${key})`,
            }}
          />
        </Row>
      ))}
    </div>
  );
}

export function FontSizeScale() {
  return (
    <div style={grid}>
      {Object.entries(fontSize).map(([key, value]) => (
        <Row key={key} token={key} value={value}>
          <span
            style={{ fontSize: `var(--font-size-${key})`, lineHeight: 1.2 }}
          >
            The quick brown fox
          </span>
        </Row>
      ))}
    </div>
  );
}

export function FontWeightScale() {
  return (
    <div style={grid}>
      {Object.entries(fontWeight).map(([key, value]) => (
        <Row key={key} token={key} value={String(value)}>
          <span
            style={{
              fontSize: "var(--font-size-xl)",
              fontWeight: `var(--font-weight-${key})`,
            }}
          >
            The quick brown fox
          </span>
        </Row>
      ))}
    </div>
  );
}

/**
 * Rendered from the `textStyles` source object as inline styles because Storybook was overriding.
 */
export function TextStyleSpecimens() {
  return (
    <div style={{ ...grid, gap: "var(--spacing-xl)" }}>
      {Object.entries(textStyles).map(([variant, style]) => (
        <div
          key={variant}
          style={{
            display: "grid",
            gridTemplateColumns: "8rem 1fr",
            alignItems: "baseline",
            gap: "var(--spacing-lg)",
          }}
        >
          <code style={label}>text-{variant}</code>
          <span style={style as CSSProperties}>The quick brown fox</span>
        </div>
      ))}
    </div>
  );
}
