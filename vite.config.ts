/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';

const __filename = fileURLToPath((import.meta as any).url);
const __dirname = path.dirname(__filename);

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  test: {
    projects: [{
      extends: true,
      plugins: [
        storybookTest({
          configDir: path.join(__dirname, '.storybook')
        })
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'packages/frappe-components/src'),
    },
  },
});