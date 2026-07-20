import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Box } from "../../foundations/box/Box.tsx";
import { Flex } from "../../foundations/flex/Flex.tsx";
import { Icon } from "../../foundations/icon/Icon.tsx";
import { Text } from "../../foundations/text/Text.tsx";
import { Button } from "../../inputs/button/Button.tsx";

import "./Toast.css";

export type TToastVariant = "info" | "success" | "warning" | "failure";

export interface TToastProps {
  title: string;
  message?: string;
  variant?: TToastVariant;
}

const iconByVariant: Record<TToastVariant, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  failure: CircleAlert,
};

const TOAST_DURATION_MS = 5000;

type TToastProgressStyle = CSSProperties & {
  "--toast-duration"?: string;
};

const progressStyle: TToastProgressStyle = {
  "--toast-duration": `${TOAST_DURATION_MS}ms`,
};

export const Toast = ({
  title,
  message,
  variant = "info",
}: TToastProps) => {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDismissed(true);
    }, TOAST_DURATION_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (dismissed) {
    return null;
  }

  const role = variant === "failure" ? "alert" : "status";
  const ariaLive = variant === "failure" ? "assertive" : "polite";

  return (
    <div
      className={`toast variant-${variant}`}
      role={role}
      aria-live={ariaLive}
    >
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
                <Text variant="caption" as="span" className="toast-message">
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
      <span className="toast-progress" style={progressStyle} />
    </div>
  );
};
