import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import type { TComponentSize } from "../../../tokens/types.ts";
import { Flex } from "../../foundations/flex/Flex.tsx";
import { Button } from "../../inputs/button/Button.tsx";
import { ModalBody } from "./ModalBody.tsx";
import { ModalSizeContext } from "./ModalContext.tsx";
import { ModalFooter } from "./ModalFooter.tsx";

import "./Modal.css";

export interface TModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog, rendered as the heading. */
  title: string;
  subtitle?: string;
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
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  size = "md",
  children,
}: TModalProps) {
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
        <Dialog.Content
          className={`modal size-${size}`}
          {...(subtitle ? {} : { "aria-describedby": undefined })}
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
            <Flex direction="column" gap="xs">
              <Dialog.Title className="text-body modal-title">
                {title}
              </Dialog.Title>
              {subtitle && (
                <Dialog.Description className="text-body modal-subtitle">
                  {subtitle}
                </Dialog.Description>
              )}
            </Flex>
          </header>
          <ModalSizeContext value={size}>{children}</ModalSizeContext>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
