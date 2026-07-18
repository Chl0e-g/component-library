import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box } from "./Box.tsx";

const meta = {
  title: "Foundations/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    padding: { control: "select", options: ["sm", "md"] },
    radius: { control: "select", options: ["sm", "lg"] },
    variant: { control: "select", options: ["card", "muted", "primary"] },
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    padding: "md",
    radius: "sm",
    variant: "card",
    children: "Card surface",
  },
};

export const Muted: Story = {
  args: {
    padding: "md",
    radius: "sm",
    variant: "muted",
    children: "Muted surface",
  },
};

export const Primary: Story = {
  args: {
    padding: "md",
    radius: "sm",
    variant: "primary",
    children: "Primary surface",
  },
};

export const LargeRadius: Story = {
  args: {
    padding: "md",
    radius: "lg",
    variant: "card",
    children: "Large radius",
  },
};
