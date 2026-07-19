import { Info } from "lucide-react";

import { Box } from "../../foundations/box/Box.tsx";
import { Flex } from "../../foundations/flex/Flex.tsx";
import { Icon } from "../../foundations/icon/Icon.tsx";
import { Text } from "../../foundations/text/Text.tsx";

import "./Toast.css";

export interface TToastProps {
  title: string;
  message?: string;
}

export const Toast = ({ title, message }: TToastProps) => {
  return (
    <div className="toast" role="status" aria-live="polite">
      <Box padding="md">
        <Flex gap="sm" align="start">
          <span className="toast-icon">
            <Icon icon={Info} size="md" />
          </span>
          <Flex direction="column" gap="sm">
            <Text variant="body" as="span" className={"toast-title"}>
              {title}
            </Text>
            {message && (
              <Text variant="caption" as="span">
                {message}
              </Text>
            )}
          </Flex>
        </Flex>
      </Box>
      <span className="toast-accent" />
    </div>
  );
};
