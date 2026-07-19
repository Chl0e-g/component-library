import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "../../inputs/button/Button.tsx";
import { Toast } from "./Toast.tsx";
import { useToast } from "./useToast.tsx";

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

export const Dismissible: Story = {
  args: {
    title: "Sync complete",
    message: "Workspace data is up to date.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("status")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));

    await expect(canvas.queryByRole("status")).not.toBeInTheDocument();
  },
};

const TriggerDemo = () => {
  const { toasts, show } = useToast();

  return (
    <>
      <Button
        onClick={() => {
          show({ title: "Sync complete" });
        }}
      >
        Trigger toast
      </Button>
      {toasts}
    </>
  );
};

export const TriggeredViaHook: Story = {
  args: { title: "unused" },
  render: () => <TriggerDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Trigger toast" });

    await expect(canvas.queryAllByRole("status")).toHaveLength(0);

    await userEvent.click(trigger);
    await expect(canvas.getAllByRole("status")).toHaveLength(1);

    // Triggering again while one is still showing adds a second toast
    // rather than replacing the first.
    await userEvent.click(trigger);
    await expect(canvas.getAllByRole("status")).toHaveLength(2);

    const dismissButtons = canvas.getAllByRole("button", { name: "Dismiss" });
    await userEvent.click(dismissButtons[0]);
    await expect(canvas.getAllByRole("status")).toHaveLength(1);

    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    await expect(canvas.queryAllByRole("status")).toHaveLength(0);

    await userEvent.click(trigger);
    await expect(canvas.getAllByRole("status")).toHaveLength(1);
  },
};