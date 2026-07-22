import { createContext } from "react";

import type { TComponentSize } from "../../../tokens/types.ts";

/** Shares the Modal's `size` with its subcomponents (e.g. `Modal.Body`). */
export const ModalSizeContext = createContext<TComponentSize>("md");
