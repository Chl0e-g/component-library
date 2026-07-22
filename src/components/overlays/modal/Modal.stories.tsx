import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { useState } from "react";

import type { TComponentSize } from "../../../tokens/types.ts";
import { Flex } from "../../foundations/flex/Flex.tsx";
import { Text } from "../../foundations/text/Text.tsx";
import { Spinner } from "../../feedback/spinner/Spinner.tsx";
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

/** Full pattern: header, a form body, and a composed cancel + confirm footer. */
const FormModalExample = ({ size }: { size?: TComponentSize }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Form modal example
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

/** Header + body only — an informational modal with no action footer. */
const MessageModalExample = ({ size }: { size?: TComponentSize }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Message modal example
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="Workspace updated"
        subtitle="Your changes are now live for everyone."
        size={size}
      >
        <Modal.Body>
          <Text>
            Teammates will see the latest version the next time they refresh.
          </Text>
        </Modal.Body>
      </Modal>
    </>
  );
};

/**
 * The footer takes any children, not just buttons — here an in-progress state
 * with a spinner and status text while an async action runs.
 */
const ProgressModalExample = ({ size }: { size?: TComponentSize }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Progress footer example
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="Setting up workspace"
        subtitle="We're preparing everything for your team."
        size={size}
      >
        <Modal.Body>
          <Text>This usually takes a few seconds — you can keep working.</Text>
        </Modal.Body>
        <Modal.Footer>
          <Spinner size="sm" />
          <Text variant="caption">Setting up…</Text>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Examples = ({ size }: { size?: TComponentSize }) => (
  <Flex gap="sm">
    <FormModalExample size={size} />
    <MessageModalExample size={size} />
    <ProgressModalExample size={size} />
  </Flex>
);

/**
 * `title` / `subtitle` live on `Modal`; content goes in `Modal.Body`; actions
 * (or anything else) go in the optional `Modal.Footer`. Each trigger below opens
 * a different composition.
 */
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

/**
 * `size` (`sm` | `md` | `lg`) sets a fixed width and scales the padding, shrinking
 * only when the viewport is narrower than the modal.
 */
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
