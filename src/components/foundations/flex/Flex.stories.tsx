import type { Meta, StoryObj } from "@storybook/react-vite";

import { Flex } from "./Flex.tsx";
import { Box } from "../box/Box.tsx";

const meta = {
  title: "Foundations/Flex",
  component: Flex,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "select", options: ["row", "column"] },
    gap: { control: "select", options: ["xs", "sm", "md", "lg"] },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = ["One", "Two", "Three"].map((label) => (
  <Box key={label} padding="sm" variant="muted">
    {label}
  </Box>
));

export const Row: Story = {
  args: {
    direction: "row",
    gap: "md",
    children: items,
  },
};

export const Column: Story = {
  args: {
    direction: "column",
    gap: "sm",
    children: items,
  },
};

export const SpaceBetween: Story = {
  args: {
    direction: "row",
    gap: "xs",
    justify: "between",
    children: items,
  },
};
