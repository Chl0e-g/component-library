import type { ReactNode } from "react";

import { Flex } from "../../foundations/flex/Flex.tsx";

export interface TModalFooterProps {
  children: ReactNode;
}

/** Right-aligned actions row, typically a cancel + confirm pair. */
export const ModalFooter = ({ children }: TModalFooterProps) => {
  return (
    <footer className="modal-footer">
      <Flex justify="end" gap="sm">
        {children}
      </Flex>
    </footer>
  );
};
