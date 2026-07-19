import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Flex } from "../../foundations/flex/Flex.tsx";
import { Spinner } from "./Spinner.tsx";
import type { TSpinnerSize } from "./Spinner.tsx";

const sizes: TSpinnerSize[] = ["sm", "md", "lg"];

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
