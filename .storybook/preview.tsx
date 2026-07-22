import type { Preview } from "@storybook/react-vite";
import { create } from "storybook/theming";
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Foundations", "Inputs", "Feedback"],
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    backgrounds: {
      disable: true,
    },

    docs: {
      theme: create({
        base: "light",
        appContentBg: "var(--color-background)",
      }),
    },
  },
};

export default preview;
