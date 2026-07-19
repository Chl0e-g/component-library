import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Flex } from "../../foundations/flex/Flex.tsx";
import { Spinner } from "./Spinner.tsx";
import type { TFontSizeToken } from "../../../tokens/types.ts";

const sizes: TFontSizeToken[] = ["xs", "sm", "md", "lg", "2xl", "3xl", "4xl"];

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  args: {},
  render: () => (
    <Flex gap="md" align="center">
      {sizes.map((size) => (
        <Spinner key={size} size={size} />
      ))}
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const statuses = canvas.getAllByRole("status");

    await expect(statuses).toHaveLength(sizes.length);

    for (const status of statuses) {
      await expect(status).toHaveAccessibleName("Loading");
    }
  },
};

export const InheritsFromContext: Story = {
  name: "Inherits size (no size prop)",
  args: {},
  render: () => (
    <div style={{ fontSize: "var(--font-size-3xl)" }}>
      <Spinner />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("status")).toHaveAccessibleName("Loading");
  },
};
