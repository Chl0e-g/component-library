import type { ChangeEventHandler, Ref } from "react";
import { useId } from "react";

import { Flex } from "../../foundations/flex/Flex.tsx";
import { Text } from "../../foundations/text/Text.tsx";

import "./Input.css";

export type TInputType =
  "text" | "email" | "password" | "tel" | "url" | "search";

export interface TInputProps {
  label: string;
  placeholder?: string;
  helperText?: string;
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
        aria-describedby={helperText ? helperTextId : undefined}
      />
      {helperText && (
        <Text variant="caption" id={helperTextId}>
          {helperText}
        </Text>
      )}
    </Flex>
  );
};
