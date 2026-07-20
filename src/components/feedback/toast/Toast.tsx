import { useCallback, useEffect, useRef, useState } from "react";
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
  const remainingRef = useRef(TOAST_DURATION_MS);
  const timerStartRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const startTimer = useCallback(() => {
    timerStartRef.current = Date.now();
    timeoutRef.current = setTimeout(() => {
      setDismissed(true);
    }, remainingRef.current);
  }, []);

  const pauseTimer = useCallback(() => {
    clearTimeout(timeoutRef.current);
    remainingRef.current = Math.max(
      remainingRef.current - (Date.now() - timerStartRef.current),
      0,
    );
  }, []);

  useEffect(() => {
    timerStartRef.current = Date.now();
    timeoutRef.current = setTimeout(() => {
      setDismissed(true);
    }, remainingRef.current);

    return () => {
      clearTimeout(timeoutRef.current);
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
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
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
