import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Text } from "./Text.tsx";

const meta = {
  title: "Foundations/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body",
        "caption",
        "overline",
        "mono",
      ],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Body: Story = {
  args: {
    variant: "body",
    children: "The quick brown fox jumps over the lazy dog.",
  },
};

export const Headings: Story = {
  args: { children: "Heading level 1" },
  render: () => (
    <>
      <Text variant="h1">Heading level 1</Text>
      <Text variant="h2">Heading level 2</Text>
      <Text variant="h3">Heading level 3</Text>
      <Text variant="h4">Heading level 4</Text>
      <Text variant="h5">Heading level 5</Text>
      <Text variant="h6">Heading level 6</Text>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("heading", { level: 1 })).toBeInTheDocument();
    await expect(canvas.getByRole("heading", { level: 6 })).toBeInTheDocument();
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "Supporting caption text",
  },
};

export const Overline: Story = {
  args: {
    variant: "overline",
    children: "Status",
  },
};

export const Mono: Story = {
  args: {
    variant: "mono",
    children: "npm run build",
  },
};
