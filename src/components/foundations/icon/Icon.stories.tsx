import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { ArrowRight, Check, Download, Trash2 } from "lucide-react";

import { Flex } from "../flex/Flex.tsx";
import { Icon } from "./Icon.tsx";
import type { TFontSizeToken } from "../../../tokens/types.ts";

const sizes: TFontSizeToken[] = ["sm", "md", "lg", "xl", "2xl", "3xl"];

const meta = {
  title: "Foundations/Icon",
  component: Icon,
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: Check,
    ariaLabel: "Check",
  },
};

export const Sizes: Story = {
  args: { icon: ArrowRight },
  render: () => (
    <Flex gap="md" align="center">
      {sizes.map((size) => (
        <Icon key={size} icon={ArrowRight} size={size} ariaLabel={`arrow ${size}`} />
      ))}
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getAllByRole("img");

    await expect(icons).toHaveLength(sizes.length);
  },
};

export const InheritsFromContext: Story = {
  name: "Inherits size (no size prop)",
  args: { icon: Download },
  render: () => (
    <div style={{ fontSize: "var(--font-size-3xl)" }}>
      <Icon icon={Download} ariaLabel="Download" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("img", { name: "Download" })).toBeInTheDocument();
  },
};

export const Decorative: Story = {
  name: "Decorative (no ariaLabel)",
  args: { icon: Trash2 },
  play: async ({ canvasElement }) => {
    const canvasEl = canvasElement.querySelector("svg");

    await expect(canvasEl).toHaveAttribute("aria-hidden", "true");
  },
};
