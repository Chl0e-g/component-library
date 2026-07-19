import type { ChangeEventHandler, Ref } from "react";
import { useId } from "react";
import { CircleAlert } from "lucide-react";

import { Flex } from "../../foundations/flex/Flex.tsx";
import { Text } from "../../foundations/text/Text.tsx";
import { Icon } from "../../foundations/icon/Icon.tsx";

import "./Input.css";

export type TInputType =
  "text" | "email" | "password" | "tel" | "url" | "search";

export interface TInputProps {
  label: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  type?: TInputType;
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({
  label,
  placeholder,
  helperText,
  errorMessage,
  value,
  defaultValue,
  onChange,
  disabled,
  required,
  name,
  type = "text",
  ref,
}: TInputProps) => {
  const id = useId();
  const helperTextId = `${id}-helper-text`;
  const errorMessageId = `${id}-error-message`;

  const describedBy = [
    helperText && helperTextId,
    errorMessage && errorMessageId,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Flex direction="column" gap="sm">
      <Text as="label" variant="overline" htmlFor={id}>
        {label}
      </Text>
      <input
        ref={ref}
        id={id}
        className="input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        onChange={onChange}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={describedBy || undefined}
      />
      {helperText && (
        <span
          id={helperTextId}
          className={
            errorMessage ? "text-caption visually-hidden" : "text-caption"
          }
        >
          {helperText}
        </span>
      )}
      {errorMessage && (
        <span id={errorMessageId} className="text-caption input-error-message">
          <Flex as="span" gap="xs" align="center">
            <Icon icon={CircleAlert} />
            {errorMessage}
          </Flex>
        </span>
      )}
    </Flex>
  );
};
