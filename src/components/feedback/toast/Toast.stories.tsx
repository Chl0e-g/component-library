import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Flex } from "../../foundations/flex/Flex.tsx";
import { Button } from "../../inputs/button/Button.tsx";
import { Toast } from "./Toast.tsx";
import type { TToastVariant } from "./Toast.tsx";
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

    // Auto-dismiss's progress bar is wired up with a fixed duration; the
    // actual 5s dismissal isn't awaited here to keep the test fast.
    const progress = canvasElement.querySelector(".toast-progress");
    await expect(progress).toHaveStyle({ "--toast-duration": "5000ms" });

    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    await expect(canvas.queryByRole("status")).not.toBeInTheDocument();
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Deploy succeeded",
  },
};

export const AllVariants: Story = {
  args: { title: "unused" },
  render: () => (
    <Flex direction="column" gap="sm">
      <Toast
        variant="info"
        title="Sync complete"
        message="Workspace data is up to date."
      />
      <Toast
        variant="success"
        title="Deploy succeeded"
        message="meridian-app v2.4.1 is live on production."
      />
      <Toast
        variant="warning"
        title="Storage at 85%"
        message="Archive old projects to free up space."
      />
      <Toast
        variant="failure"
        title="Payment failed"
        message="Card ending in 4242 was declined."
      />
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // info, success, and warning announce politely as "status"; only
    // failure is urgent enough to be an assertive "alert".
    await expect(canvas.getAllByRole("status")).toHaveLength(3);
    await expect(canvas.getByRole("alert")).toBeInTheDocument();
    await expect(canvas.getByText("Payment failed")).toBeInTheDocument();
  },
};

const toastContentByVariant: Record<
  TToastVariant,
  { title: string; message: string }
> = {
  info: {
    title: "Sync complete",
    message: "Workspace data is up to date.",
  },
  success: {
    title: "Deploy succeeded",
    message: "meridian-app v2.4.1 is live on production.",
  },
  warning: {
    title: "Storage at 85%",
    message: "Archive old projects to free up space.",
  },
  failure: {
    title: "Payment failed",
    message: "Card ending in 4242 was declined.",
  },
};

const variants: TToastVariant[] = ["info", "success", "warning", "failure"];

const TriggerDemo = () => {
  const { toasts, show } = useToast();

  return (
    <>
      <Flex gap="sm">
        {variants.map((variant) => (
          <Button
            key={variant}
            onClick={() => {
              show({ variant, ...toastContentByVariant[variant] });
            }}
          >
            Trigger {variant}
          </Button>
        ))}
      </Flex>
      {toasts}
    </>
  );
};

export const TriggeredViaHook: Story = {
  args: { title: "unused" },
  render: () => <TriggerDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryAllByRole("status")).toHaveLength(0);

    await userEvent.click(canvas.getByRole("button", { name: "Trigger info" }));
    await expect(canvas.getAllByRole("status")).toHaveLength(1);

    // Triggering again while one is still showing adds a second toast
    // rather than replacing the first.
    await userEvent.click(
      canvas.getByRole("button", { name: "Trigger success" }),
    );
    await expect(canvas.getAllByRole("status")).toHaveLength(2);

    await userEvent.click(
      canvas.getByRole("button", { name: "Trigger failure" }),
    );
    await expect(canvas.getByRole("alert")).toBeInTheDocument();

    const dismissButtons = canvas.getAllByRole("button", { name: "Dismiss" });
    await userEvent.click(dismissButtons[0]);
    await expect(canvas.getAllByRole("status")).toHaveLength(1);
  },
};