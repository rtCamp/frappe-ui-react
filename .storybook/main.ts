import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../**/src/**/*.mdx",
    "../**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal(config) {
		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config?.resolve?.alias,
					"@design-system": path.resolve(
						__dirname,
						"../packages/design-system/src"
					),
					"@frappe-components": path.resolve(
						__dirname,
						"../packages/frappe-components/src"
					),
				},
			}
		}
  },
};
export default config;
