import type { ReactNode } from "react";
import { use } from "react";

import { Flex } from "../../foundations/flex/Flex.tsx";
import { ModalSizeContext } from "./ModalContext.tsx";

export interface TModalBodyProps {
  children: ReactNode;
}

/** Padded content region. Stacks its children in a column, spaced by parent `Modal`'s `size`. */
export const ModalBody = ({ children }: TModalBodyProps) => {
  const size = use(ModalSizeContext);

  return (
    <Flex direction="column" gap={size} className="modal-body">
      {children}
    </Flex>
  );
};
