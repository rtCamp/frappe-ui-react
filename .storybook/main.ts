import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/react-vite";
import path, { dirname, join } from "path";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories:
    process.env.NODE_ENV === "production"
      ? [
          "../*.mdx",
          "../**/src/**/*.mdx",
          "../**/src/**/!(*.interactions).stories.@(js|jsx|mjs|ts|tsx)",
        ]
      : [
          "../*.mdx",
          "../**/src/**/*.mdx",
          "../**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
        ],
  addons:
    process.env.NODE_ENV === "production"
      ? [
          getAbsolutePath("@storybook/addon-docs"),
          getAbsolutePath("@storybook/addon-themes"),
        ]
      : [
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
    interactions: process.env.NODE_ENV !== "production",
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
