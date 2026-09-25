import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/react-vite";
import path, { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);
const isProduction = process.env.NODE_ENV === "production";

const config: StorybookConfig = {
  stories: isProduction
    ? [
        "../*.mdx",
        "../**/src/**/*.mdx",
        "../**/src/**/!(*.interactions|*.dev).stories.@(js|jsx|mjs|ts|tsx)",
      ]
    : [
        "../*.mdx",
        "../**/src/**/*.mdx",
        "../**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
      ],
  addons: isProduction
    ? [
        getAbsolutePath("@storybook/addon-docs"),
        getAbsolutePath("@storybook/addon-themes"),
      ]
    : [
        getAbsolutePath("@storybook/addon-mcp"),
        getAbsolutePath("@storybook/addon-docs"),
        getAbsolutePath("@storybook/addon-a11y"),
        getAbsolutePath("@storybook/addon-themes"),
        getAbsolutePath("@storybook/addon-vitest"),
      ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config?.resolve?.alias,
          "@frappe-ui-react": path.resolve(
            __dirname,
            "../packages/frappe-ui-react/src"
          ),
        },
      },
    };
  },
  typescript: {
    check: true,
    skipCompiler: true,
    reactDocgenTypescriptOptions: {
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  features: {
    interactions: !isProduction,
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
