import type { Preview } from "@storybook/react-vite";
import "@frappe-ui-react/theme.css";
import ModeDecorator from "./modeDecorator";

const preview: Preview = {
  decorators: [ModeDecorator],
  parameters: {
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
    options: {
      storySort: {
        order: ["Theme", "Components"],
      },
    },
  },
};

export default preview;
