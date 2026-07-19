import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Input } from "./Input.tsx";

const meta = {
  title: "Inputs/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "tel", "url", "search"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Email address");
    await userEvent.type(input, "hello@example.com");
    await expect(input).toHaveValue("hello@example.com");
  },
};

export const Disabled: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    disabled: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    helperText: "The email you use at work.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Email address");
    const helperText = canvas.getByText("The email you use at work.");

    await expect(input).toHaveAttribute("aria-describedby", helperText.id);
  },
};

export const WithError: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    errorMessage: "Enter a valid email address.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Email address");
    const errorMessage = canvas
      .getByText("Enter a valid email address.")
      .closest(".input-error-message");

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("aria-describedby", errorMessage?.id);
  },
};

export const WithHelperTextAndError: Story = {
  args: {
    label: "Email address",
    placeholder: "you@example.com",
    helperText: "The email you use at work.",
    errorMessage: "Enter a valid email address.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Email address");
    const helperText = canvas.getByText("The email you use at work.");
    const errorMessage = canvas
      .getByText("Enter a valid email address.")
      .closest(".input-error-message");

    // Helper text stays in the DOM for screen readers but is visually hidden
    // once an error is shown; the error message is visible.
    await expect(helperText).toHaveClass("visually-hidden");
    await expect(errorMessage).toBeVisible();

    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute(
      "aria-describedby",
      `${helperText.id} ${errorMessage?.id}`,
    );
  },
};
