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

  return (
    <Flex direction="column" gap="xs" className="input-group">
      <label htmlFor={id}>
        <Text variant="overline">{label}</Text>
      </label>
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
      />
    </Flex>
  );
};
