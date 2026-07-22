import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import type { TComponentSize } from "../../../tokens/types.ts";
import { Button } from "../../inputs/button/Button.tsx";

import "./Modal.css";

export interface TModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog, rendered as the heading. */
  title: string;
  size?: TComponentSize;
  children: ReactNode;
}

/**
 * Compose the modal content with `Modal.Body` and `Modal.Footer`:
 *
 * ```tsx
 * <Modal open={open} onClose={close} title="Invite team member">
 *   <Modal.Body>…</Modal.Body>
 *   <Modal.Footer>…</Modal.Footer>
 * </Modal>
 * ```
 */
export const Modal = ({
  open,
  onClose,
  title,
  size = "md",
  children,
}: TModalProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        {/* @todo: wire Radix's description a11y once the `subtitle` prop lands. */}
        <Dialog.Content
          className={`modal size-${size}`}
          aria-describedby={undefined}
        >
          <div className="modal-close">
            <Button
              variant="ghost"
              size="md"
              leftIcon={X}
              ariaLabel="Close"
              onClick={onClose}
            />
          </div>
          <header className="modal-header">
            <Dialog.Title className="text-body">{title}</Dialog.Title>
          </header>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
