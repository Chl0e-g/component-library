import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fireEvent, fn, userEvent, within } from "storybook/test";

import { Button } from "./Button.tsx";
import type { TButtonSize, TButtonVariant } from "./Button.tsx";

const variants: TButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "destructive",
];

const sizes: TButtonSize[] = ["sm", "md", "lg"];

const cellStyle = { padding: "var(--spacing-sm) var(--spacing-md)" };
const variantColumnStyle = { ...cellStyle, textAlign: "left" as const };

const meta = {
  title: "Inputs/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "destructive"],
    },
    type: { control: "select", options: ["button", "submit"] },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
  },
};

export const AllVariants: Story = {
  args: { children: "Button" },
  render: (args) => (
    <table>
      <thead>
        <tr>
          <th scope="col" style={variantColumnStyle}>
            Variant
          </th>
          {sizes.map((size) => (
            <th scope="col" style={cellStyle} key={size}>
              {size}
            </th>
          ))}
          <th scope="col" style={cellStyle}>
            Disabled
          </th>
        </tr>
      </thead>
      <tbody>
        {variants.map((variant) => (
          <tr key={variant}>
            <th scope="row" style={variantColumnStyle}>
              {variant}
            </th>
            {sizes.map((size) => (
              <td style={cellStyle} key={size}>
                <Button
                  variant={variant}
                  size={size}
                  ariaLabel={`${variant} ${size}`}
                  onClick={args.onClick}
                >
                  Button
                </Button>
              </td>
            ))}
            <td style={cellStyle}>
              <Button
                variant={variant}
                disabled
                ariaLabel={`${variant} disabled`}
                onClick={args.onClick}
              >
                Button
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const disabledButton = canvas.getByRole("button", { name: "primary disabled" });
    await expect(disabledButton).toBeDisabled();
    await fireEvent.click(disabledButton);
    await expect(args.onClick).not.toHaveBeenCalled();

    const enabledButton = canvas.getByRole("button", { name: "primary md" });
    await userEvent.click(enabledButton);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
