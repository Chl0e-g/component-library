import { createPortal } from "react-dom";
import type { ReactNode } from "react";

import "./ToastStack.css";

export interface TToastStackProps {
  children: ReactNode;
}

let stackRoot: HTMLDivElement | undefined;

/**
 * Every ToastStack instance portals into this same cached node, so toasts
 * from independent useToast() calls land in one shared stack.
 */
function getStackRoot(): HTMLDivElement {
  if (!stackRoot) {
    stackRoot = document.createElement("div");
    stackRoot.className = "toast-stack";
    document.body.append(stackRoot);
  }

  return stackRoot;
}

/** Anchored to the top-right of the viewport via a portal. */
export const ToastStack = ({ children }: TToastStackProps) => {
  return createPortal(children, getStackRoot());
};
