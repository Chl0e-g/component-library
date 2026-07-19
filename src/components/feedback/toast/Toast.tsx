import { useState } from "react";
import { CircleCheck, Info, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Box } from "../../foundations/box/Box.tsx";
import { Flex } from "../../foundations/flex/Flex.tsx";
import { Icon } from "../../foundations/icon/Icon.tsx";
import { Text } from "../../foundations/text/Text.tsx";
import { Button } from "../../inputs/button/Button.tsx";

import "./Toast.css";

export type TToastVariant = "info" | "success";

export interface TToastProps {
  title: string;
  message?: string;
  variant?: TToastVariant;
}

const iconByVariant: Record<TToastVariant, LucideIcon> = {
  info: Info,
  success: CircleCheck,
};

export const Toast = ({
  title,
  message,
  variant = "info",
}: TToastProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div className={`toast variant-${variant}`} role="status" aria-live="polite">
      <Box padding="md">
        <Flex gap="sm" align="start" justify="between">
          <Flex gap="sm" align="start">
            <span className="toast-icon">
              <Icon icon={iconByVariant[variant]} size="md" />
            </span>
            <Flex direction="column" gap="sm">
              <Text variant="body" as="span" className="toast-title">
                {title}
              </Text>
              {message && (
                <Text variant="caption" as="span">
                  {message}
                </Text>
              )}
            </Flex>
          </Flex>
          <div className="dismiss-button-wrapper">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={X}
              ariaLabel="Dismiss"
              onClick={() => {
                setDismissed(true);
              }}
            />
          </div>
        </Flex>
      </Box>
      <span className="toast-accent" />
    </div>
  );
};
