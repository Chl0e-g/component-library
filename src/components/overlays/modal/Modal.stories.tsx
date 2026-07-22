import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { useState } from "react";

import { Text } from "../../foundations/text/Text.tsx";
import { Button } from "../../inputs/button/Button.tsx";
import { Modal } from "./Modal.tsx";
import type { TModalSize } from "./Modal.tsx";

const meta = {
  title: "Overlays/Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const ModalDemo = ({
  title,
  size,
}: {
  title: string;
  size?: TModalSize;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title={title}
        size={size}
      >
        <Text>
          They will receive an email with a link to join your workspace.
        </Text>
      </Modal>
    </>
  );
};

export const Default: Story = {
  args: {
    title: "Invite team member",
    open: false,
    onClose: () => {},
    children: null,
  },
  render: (args) => <ModalDemo title={args.title} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));
    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toHaveAccessibleName("Invite team member");
    await waitFor(() =>
      expect(dialog.contains(document.activeElement)).toBe(true),
    );

    // Close button dismisses it
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    // Escape dismisses it
    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));
    await screen.findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    // Clicking the overlay (outside the content) dismisses it
    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));
    await screen.findByRole("dialog");
    const overlay = document.querySelector(".modal-overlay");
    if (overlay) {
      await userEvent.click(overlay);
    }
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};

export const Small: Story = {
  args: {
    title: "Delete project?",
    open: false,
    onClose: () => {},
    children: null,
  },
  render: (args) => <ModalDemo title={args.title} size="sm" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));
    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toHaveClass("size-sm");

    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};

export const Large: Story = {
  args: {
    title: "Edit workspace settings",
    open: false,
    onClose: () => {},
    children: null,
  },
  render: (args) => <ModalDemo title={args.title} size="lg" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));
    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toHaveClass("size-lg");

    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};
