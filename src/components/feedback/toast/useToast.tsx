import { useCallback, useState } from "react";

import { Toast } from "./Toast.tsx";
import type { TToastProps } from "./Toast.tsx";

interface TToastInstance extends TToastProps {
  id: string;
}

/** `show(props)` adds a new, uniquely-keyed toast to the list. */
export const useToast = () => {
  const [toasts, setToasts] = useState<TToastInstance[]>([]);

  const show = useCallback((props: TToastProps) => {
    setToasts((current) => [
      ...current,
      { ...props, id: crypto.randomUUID() },
    ]);
  }, []);

  const elements = toasts.map(({ id, title, message, variant }) => (
    <Toast key={id} title={title} message={message} variant={variant} />
  ));

  return { toasts: elements, show };
};
