import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Toast } from "./Toast.tsx";

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sync complete",
    message: "Workspace data is up to date.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toast = canvas.getByRole("status");

    await expect(toast).toBeInTheDocument();
    await expect(canvas.getByText("Sync complete")).toBeInTheDocument();
    await expect(
      canvas.getByText("Workspace data is up to date."),
    ).toBeInTheDocument();
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Deploy succeeded",
  },
};
