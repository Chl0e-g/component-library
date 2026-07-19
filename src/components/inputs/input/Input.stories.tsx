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
