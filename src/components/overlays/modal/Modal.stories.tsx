import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { useState } from "react";

import type { TComponentSize } from "../../../tokens/types.ts";
import { Flex } from "../../foundations/flex/Flex.tsx";
import { Button } from "../../inputs/button/Button.tsx";
import { Input } from "../../inputs/input/Input.tsx";
import { Modal } from "./Modal.tsx";

const meta = {
  title: "Overlays/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    title: "Invite team member",
    open: false,
    onClose: () => {},
    children: null,
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const FormModalExample = ({ size }: { size?: TComponentSize }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open a modal
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="Invite team member"
        subtitle="They will receive an email with a link to join your workspace."
        size={size}
      >
        <Modal.Body>
          <Input
            label="Email address"
            placeholder="colleague@company.com"
            type="email"
          />
          <Input label="Role" placeholder="E.g. Frontend Developer" />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="tertiary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Send invite
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Examples = ({ size }: { size?: TComponentSize }) => (
  <Flex gap="sm">
    <FormModalExample size={size} />
  </Flex>
);

export const Default: Story = {
  render: () => <Examples />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Form modal: header, body, and a composed button footer.
    await userEvent.click(
      canvas.getByRole("button", { name: "Form modal example" }),
    );
    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toHaveAttribute("data-state", "open");
    await expect(dialog).toHaveAccessibleName("Invite team member");
    await expect(dialog).toHaveAccessibleDescription(
      "They will receive an email with a link to join your workspace.",
    );
    await expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Send invite" }),
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(dialog.contains(document.activeElement)).toBe(true),
    );

    // Footer Cancel dismisses it.
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    // Close (X) dismisses it.
    await userEvent.click(
      canvas.getByRole("button", { name: "Form modal example" }),
    );
    await screen.findByRole("dialog");
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    // Escape dismisses it.
    await userEvent.click(
      canvas.getByRole("button", { name: "Form modal example" }),
    );
    await screen.findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    // Overlay click dismisses it.
    await userEvent.click(
      canvas.getByRole("button", { name: "Form modal example" }),
    );
    await screen.findByRole("dialog");
    const overlay = document.querySelector(".modal-overlay");
    if (overlay) {
      await userEvent.click(overlay);
    }
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    // Message modal: header + body, no footer actions.
    await userEvent.click(
      canvas.getByRole("button", { name: "Message modal example" }),
    );
    const messageDialog = await screen.findByRole("dialog");
    await expect(messageDialog).toHaveAccessibleName("Workspace updated");
    await expect(
      screen.queryByRole("button", { name: "Send invite" }),
    ).not.toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    // Progress modal: a non-button footer (spinner + status).
    await userEvent.click(
      canvas.getByRole("button", { name: "Progress footer example" }),
    );
    const progressDialog = await screen.findByRole("dialog");
    await expect(
      within(progressDialog).getByRole("status"),
    ).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};

export const Small: Story = {
  render: () => <Examples size="sm" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("button", { name: "Form modal example" }),
    );
    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toHaveClass("size-sm");

    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};

export const Large: Story = {
  render: () => <Examples size="lg" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("button", { name: "Form modal example" }),
    );
    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toHaveClass("size-lg");

    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  },
};
