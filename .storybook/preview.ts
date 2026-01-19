import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";
import { DocsRenderer } from "@storybook/addon-docs";
import type {
  DocsContextProps,
  Parameters,
  Renderer,
} from "storybook/internal/types";
import "./preview-styles.css";
import "@rtcamp/frappe-ui-react/theme.css";

import { decorators } from "./modeDecorator";

const preview: Preview = {
  decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.light,
      renderer: () => {
        const renderer = new DocsRenderer();
        const oldRender = renderer.render;

        renderer.render = async (
          context: DocsContextProps<Renderer>,
          docsParameter: Parameters,
          element: HTMLElement
        ) => {
          const theme = (context as any).store.userGlobals.globals.theme;

          docsParameter.theme = theme === "dark" ? themes.dark : themes.light;

          const result = await oldRender.call(
            renderer,
            context,
            docsParameter,
            element
          );

          return result;
        };

        return renderer;
      },
    },
    a11y: {
      test: "todo",
    },
    options: {
      storySort: {
        order: ["Getting Started", "Theme", "Components"],
      },
    },
  },
};

export default preview;
