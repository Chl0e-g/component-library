import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

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

const AllVariantsDemo = () => {
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

export const AllVariants: Story = {
  args: { title: "unused" },
  render: () => <AllVariantsDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(screen.queryAllByRole("status")).toHaveLength(0);

    await userEvent.click(canvas.getByRole("button", { name: "Trigger info" }));
    await expect(screen.getAllByRole("status")).toHaveLength(1);
    await expect(screen.getByText("Sync complete")).toBeInTheDocument();

    // Auto-dismiss's progress bar is wired up with a fixed duration; the
    // actual 5s dismissal isn't awaited here to keep the test fast.
    const progress = document.body.querySelector(".toast-progress");
    await expect(progress).toHaveStyle({ "--toast-duration": "5000ms" });

    // Triggering again while one is still showing adds a second toast
    // rather than replacing the first.
    await userEvent.click(
      canvas.getByRole("button", { name: "Trigger success" }),
    );
    await expect(screen.getAllByRole("status")).toHaveLength(2);

    await userEvent.click(
      canvas.getByRole("button", { name: "Trigger failure" }),
    );
    await expect(screen.getByRole("alert")).toBeInTheDocument();

    // Clean up so no toasts leak into the next story's test. Dismissed
    // toasts play a ~200ms exit animation before actually unmounting.
    for (const button of screen.getAllByRole("button", { name: "Dismiss" })) {
      await userEvent.click(button);
    }
    await waitFor(async () => {
      await expect(screen.queryAllByRole("status")).toHaveLength(0);
      await expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  },
};

const TitleOnlyDemo = () => {
  const { toasts, show } = useToast();

  return (
    <>
      <Button
        onClick={() => {
          show({ title: "Deploy succeeded" });
        }}
      >
        Show toast
      </Button>
      {toasts}
    </>
  );
};

export const TitleOnly: Story = {
  args: { title: "unused" },
  render: () => <TitleOnlyDemo />,
};
