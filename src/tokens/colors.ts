export const neutral = {
  "neutral-10": "#FDFCFA",
  "neutral-20": "#F5F3EF",
  "neutral-30": "#EDEAE4",
  "neutral-40": "#E3DFD8",
  "neutral-50": "#C4C0B8",
  "neutral-60": "#9A9690",
  "neutral-70": "#6B6760",
  "neutral-80": "#4A4845",
  "neutral-90": "#2E2C2A",
  "neutral-100": "#1A1A24",
};

export const primary = {
  "primary-10": "#EEF1F8",
  "primary-20": "#D6DEED",
  "primary-30": "#AEBDD9",
  "primary-40": "#849DC4",
  "primary-50": "#607FB0",
  "primary-60": "#3E639B",
  "primary-70": "#2E4F80",
  "primary-80": "#243F68",
  "primary-90": "#1C2B4A",
  "primary-100": "#111A2D",
};

export const success = {
  "success-10": "#ECFDF5",
  "success-20": "#D1FAE5",
  "success-30": "#A7F3D0",
  "success-40": "#34D399",
  "success-50": "#10B981",
  "success-60": "#059669",
  "success-70": "#047857",
  "success-80": "#064E3B",
};

export const warning = {
  "warning-10": "#FFFBEB",
  "warning-20": "#FEF3C7",
  "warning-30": "#FDE68A",
  "warning-40": "#FBBF24",
  "warning-50": "#F59E0B",
  "warning-60": "#D97706",
  "warning-70": "#B45309",
  "warning-80": "#78350F",
};

export const danger = {
  "danger-10": "#FEF2F2",
  "danger-20": "#FEE2E2",
  "danger-30": "#FECACA",
  "danger-40": "#F87171",
  "danger-50": "#EF4444",
  "danger-60": "#DC2626",
  "danger-70": "#B91C1C",
  "danger-80": "#7F1D1D",
};

export const semantic = {
  // Surfaces
  background: neutral["neutral-20"],
  foreground: neutral["neutral-100"],
  card: neutral["neutral-10"],
  muted: neutral["neutral-30"],

  // Brand
  primary: primary["primary-90"],
  "primary-foreground": neutral["neutral-10"],
};

export const colors = {
  ...neutral,
  ...primary,
  ...success,
  ...warning,
  ...danger,
  ...semantic,
};
