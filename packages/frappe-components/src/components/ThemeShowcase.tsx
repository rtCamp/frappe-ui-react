import React, { useState, useEffect } from "react";
import "./ThemeShowcase.css";

/**
 * A component that showcases all theme tokens from the design system.
 * Uses only static Tailwind classes to ensure compatibility with purging.
 */
const ThemeShowcase: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  // Apply dark mode class to document root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="theme-showcase p-8 bg-background text-foreground">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Theme Tokens Showcase</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200 flex items-center gap-2"
        >
          {isDark ? (
            <>
              <span>☀️</span>
              Light Mode
            </>
          ) : (
            <>
              <span>🌙</span>
              Dark Mode
            </>
          )}
        </button>
      </div>

      {/* Dark Mode Demo Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Dark Mode Demo</h2>
        <div className="bg-primary-50 dark:bg-primary-950 p-6 rounded-lg border border-primary-200 dark:border-primary-800 mb-4">
          <h3 className="text-lg font-medium mb-3 text-primary-900 dark:text-primary-100">
            Adaptive Content
          </h3>
          <p className="text-primary-700 dark:text-primary-300 mb-4">
            This content automatically adapts to the current theme mode. The
            background, text, and border colors change based on the selected
            theme.
          </p>
          <div className="flex gap-4">
            <div className="bg-background text-foreground p-4 rounded border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium">Background/Foreground</span>
            </div>
            <div className="bg-primary-500 text-white p-4 rounded">
              <span className="text-sm font-medium">Primary Button</span>
            </div>
            <div className="bg-success-500 text-white p-4 rounded">
              <span className="text-sm font-medium">Success</span>
            </div>
            <div className="bg-error-500 text-white p-4 rounded">
              <span className="text-sm font-medium">Error</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white text-black p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold mb-3">Light Theme Preview</h4>
            <p className="text-gray-700 mb-4">
              This shows how content looks in light mode.
            </p>
            <div className="flex gap-2 mb-3">
              <div
                className="w-8 h-8 rounded"
                style={{ backgroundColor: "#eff6ff" }}
                title="Primary 50"
              ></div>
              <div
                className="w-8 h-8 rounded"
                style={{ backgroundColor: "#3b82f6" }}
                title="Primary 500"
              ></div>
              <div
                className="w-8 h-8 rounded"
                style={{ backgroundColor: "#172554" }}
                title="Primary 950"
              ></div>
            </div>
            <span className="text-sm text-gray-500">
              Primary colors in light mode
            </span>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-lg border border-gray-700">
            <h4 className="text-lg font-semibold mb-3">Dark Theme Preview</h4>
            <p className="text-gray-300 mb-4">
              This shows how content looks in dark mode.
            </p>
            <div className="flex gap-2 mb-3">
              <div
                className="w-8 h-8 rounded"
                style={{ backgroundColor: "#172554" }}
                title="Primary 50 (Dark)"
              ></div>
              <div
                className="w-8 h-8 rounded"
                style={{ backgroundColor: "#3b82f6" }}
                title="Primary 500 (Dark)"
              ></div>
              <div
                className="w-8 h-8 rounded"
                style={{ backgroundColor: "#eff6ff" }}
                title="Primary 950 (Dark)"
              ></div>
            </div>
            <span className="text-sm text-gray-400">
              Primary colors in dark mode
            </span>
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Colors</h2>

        <div className="bg-info-50 dark:bg-info-950 border border-info-200 dark:border-info-800 p-4 rounded-lg mb-6">
          <h3 className="text-info-900 dark:text-info-100 font-medium mb-2">
            🌓 Dark Mode Color Behavior
          </h3>
          <p className="text-info-700 dark:text-info-300 text-sm">
            In dark mode, color scales are inverted - what appears as "50"
            (lightest) in light mode becomes the darkest variant in dark mode,
            and "950" (darkest) becomes the lightest. This ensures proper
            contrast and readability in both themes.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Primary</h3>
          <div className="flex flex-wrap gap-2">
            {/* Primary 50 */}
            <div className="color-showcase">
              <div className="color-sample bg-primary-50 border border-gray-200"></div>
              <span className="text-sm">50</span>
            </div>
            {/* Primary 100 */}
            <div className="color-showcase">
              <div className="color-sample bg-primary-100 border border-gray-200"></div>
              <span className="text-sm">100</span>
            </div>
            {/* Primary 200 */}
            <div className="color-showcase">
              <div className="color-sample bg-primary-200 border border-gray-200"></div>
              <span className="text-sm">200</span>
            </div>
            {/* Primary 300 */}
            <div className="color-showcase">
              <div className="color-sample bg-primary-300 border border-gray-200"></div>
              <span className="text-sm">300</span>
            </div>
            {/* Primary 400 */}
            <div className="color-showcase">
              <div className="color-sample bg-primary-400 border border-gray-200"></div>
              <span className="text-sm">400</span>
            </div>
            {/* Primary 500 */}
            <div className="color-showcase">
              <div className="color-sample bg-primary-500 border border-gray-200"></div>
              <span className="text-sm">500</span>
            </div>
            {/* Primary 600 */}
            <div className="color-showcase">
              <div className="color-sample bg-primary-600 border border-gray-200"></div>
              <span className="text-sm">600</span>
            </div>
            {/* Primary 700 */}
            <div className="color-showcase">
              <div className="color-sample bg-primary-700 border border-gray-200"></div>
              <span className="text-sm">700</span>
            </div>
            {/* Primary 800 */}
            <div className="color-showcase">
              <div className="color-sample bg-primary-800 border border-gray-200"></div>
              <span className="text-sm">800</span>
            </div>
            {/* Primary 900 */}
            <div className="color-showcase">
              <div className="color-sample bg-primary-900 border border-gray-200"></div>
              <span className="text-sm">900</span>
            </div>
            {/* Primary 950 */}
            <div className="color-showcase">
              <div className="color-sample bg-primary-950 border border-gray-200"></div>
              <span className="text-sm">950</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Secondary</h3>
          <div className="flex flex-wrap gap-2">
            {/* Secondary 50 */}
            <div className="color-showcase">
              <div className="color-sample bg-secondary-50 border border-gray-200"></div>
              <span className="text-sm">50</span>
            </div>
            {/* Secondary 100 */}
            <div className="color-showcase">
              <div className="color-sample bg-secondary-100 border border-gray-200"></div>
              <span className="text-sm">100</span>
            </div>
            {/* Secondary 200 */}
            <div className="color-showcase">
              <div className="color-sample bg-secondary-200 border border-gray-200"></div>
              <span className="text-sm">200</span>
            </div>
            {/* Secondary 300 */}
            <div className="color-showcase">
              <div className="color-sample bg-secondary-300 border border-gray-200"></div>
              <span className="text-sm">300</span>
            </div>
            {/* Secondary 400 */}
            <div className="color-showcase">
              <div className="color-sample bg-secondary-400 border border-gray-200"></div>
              <span className="text-sm">400</span>
            </div>
            {/* Secondary 500 */}
            <div className="color-showcase">
              <div className="color-sample bg-secondary-500 border border-gray-200"></div>
              <span className="text-sm">500</span>
            </div>
            {/* Secondary 600 */}
            <div className="color-showcase">
              <div className="color-sample bg-secondary-600 border border-gray-200"></div>
              <span className="text-sm">600</span>
            </div>
            {/* Secondary 700 */}
            <div className="color-showcase">
              <div className="color-sample bg-secondary-700 border border-gray-200"></div>
              <span className="text-sm">700</span>
            </div>
            {/* Secondary 800 */}
            <div className="color-showcase">
              <div className="color-sample bg-secondary-800 border border-gray-200"></div>
              <span className="text-sm">800</span>
            </div>
            {/* Secondary 900 */}
            <div className="color-showcase">
              <div className="color-sample bg-secondary-900 border border-gray-200"></div>
              <span className="text-sm">900</span>
            </div>
            {/* Secondary 950 */}
            <div className="color-showcase">
              <div className="color-sample bg-secondary-950 border border-gray-200"></div>
              <span className="text-sm">950</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Gray</h3>
          <div className="flex flex-wrap gap-2">
            {/* Gray 50 */}
            <div className="color-showcase">
              <div className="color-sample bg-gray-50 border border-gray-200"></div>
              <span className="text-sm">50</span>
            </div>
            {/* Gray 100 */}
            <div className="color-showcase">
              <div className="color-sample bg-gray-100 border border-gray-200"></div>
              <span className="text-sm">100</span>
            </div>
            {/* Gray 200 */}
            <div className="color-showcase">
              <div className="color-sample bg-gray-200 border border-gray-200"></div>
              <span className="text-sm">200</span>
            </div>
            {/* Gray 300 */}
            <div className="color-showcase">
              <div className="color-sample bg-gray-300 border border-gray-200"></div>
              <span className="text-sm">300</span>
            </div>
            {/* Gray 400 */}
            <div className="color-showcase">
              <div className="color-sample bg-gray-400 border border-gray-200"></div>
              <span className="text-sm">400</span>
            </div>
            {/* Gray 500 */}
            <div className="color-showcase">
              <div className="color-sample bg-gray-500 border border-gray-200"></div>
              <span className="text-sm">500</span>
            </div>
            {/* Gray 600 */}
            <div className="color-showcase">
              <div className="color-sample bg-gray-600 border border-gray-200"></div>
              <span className="text-sm">600</span>
            </div>
            {/* Gray 700 */}
            <div className="color-showcase">
              <div className="color-sample bg-gray-700 border border-gray-200"></div>
              <span className="text-sm">700</span>
            </div>
            {/* Gray 800 */}
            <div className="color-showcase">
              <div className="color-sample bg-gray-800 border border-gray-200"></div>
              <span className="text-sm">800</span>
            </div>
            {/* Gray 900 */}
            <div className="color-showcase">
              <div className="color-sample bg-gray-900 border border-gray-200"></div>
              <span className="text-sm">900</span>
            </div>
            {/* Gray 950 */}
            <div className="color-showcase">
              <div className="color-sample bg-gray-950 border border-gray-200"></div>
              <span className="text-sm">950</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Error</h3>
          <div className="flex flex-wrap gap-2">
            {/* Error 50 */}
            <div className="color-showcase">
              <div className="color-sample bg-error-50 border border-gray-200"></div>
              <span className="text-sm">50</span>
            </div>
            {/* Error 100 */}
            <div className="color-showcase">
              <div className="color-sample bg-error-100 border border-gray-200"></div>
              <span className="text-sm">100</span>
            </div>
            {/* Error 200 */}
            <div className="color-showcase">
              <div className="color-sample bg-error-200 border border-gray-200"></div>
              <span className="text-sm">200</span>
            </div>
            {/* Error 300 */}
            <div className="color-showcase">
              <div className="color-sample bg-error-300 border border-gray-200"></div>
              <span className="text-sm">300</span>
            </div>
            {/* Error 400 */}
            <div className="color-showcase">
              <div className="color-sample bg-error-400 border border-gray-200"></div>
              <span className="text-sm">400</span>
            </div>
            {/* Error 500 */}
            <div className="color-showcase">
              <div className="color-sample bg-error-500 border border-gray-200"></div>
              <span className="text-sm">500</span>
            </div>
            {/* Error 600 */}
            <div className="color-showcase">
              <div className="color-sample bg-error-600 border border-gray-200"></div>
              <span className="text-sm">600</span>
            </div>
            {/* Error 700 */}
            <div className="color-showcase">
              <div className="color-sample bg-error-700 border border-gray-200"></div>
              <span className="text-sm">700</span>
            </div>
            {/* Error 800 */}
            <div className="color-showcase">
              <div className="color-sample bg-error-800 border border-gray-200"></div>
              <span className="text-sm">800</span>
            </div>
            {/* Error 900 */}
            <div className="color-showcase">
              <div className="color-sample bg-error-900 border border-gray-200"></div>
              <span className="text-sm">900</span>
            </div>
            {/* Error 950 */}
            <div className="color-showcase">
              <div className="color-sample bg-error-950 border border-gray-200"></div>
              <span className="text-sm">950</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Warning</h3>
          <div className="flex flex-wrap gap-2">
            {/* Warning 50 */}
            <div className="color-showcase">
              <div className="color-sample bg-warning-50 border border-gray-200"></div>
              <span className="text-sm">50</span>
            </div>
            {/* Warning 100 */}
            <div className="color-showcase">
              <div className="color-sample bg-warning-100 border border-gray-200"></div>
              <span className="text-sm">100</span>
            </div>
            {/* Warning 200 */}
            <div className="color-showcase">
              <div className="color-sample bg-warning-200 border border-gray-200"></div>
              <span className="text-sm">200</span>
            </div>
            {/* Warning 300 */}
            <div className="color-showcase">
              <div className="color-sample bg-warning-300 border border-gray-200"></div>
              <span className="text-sm">300</span>
            </div>
            {/* Warning 400 */}
            <div className="color-showcase">
              <div className="color-sample bg-warning-400 border border-gray-200"></div>
              <span className="text-sm">400</span>
            </div>
            {/* Warning 500 */}
            <div className="color-showcase">
              <div className="color-sample bg-warning-500 border border-gray-200"></div>
              <span className="text-sm">500</span>
            </div>
            {/* Warning 600 */}
            <div className="color-showcase">
              <div className="color-sample bg-warning-600 border border-gray-200"></div>
              <span className="text-sm">600</span>
            </div>
            {/* Warning 700 */}
            <div className="color-showcase">
              <div className="color-sample bg-warning-700 border border-gray-200"></div>
              <span className="text-sm">700</span>
            </div>
            {/* Warning 800 */}
            <div className="color-showcase">
              <div className="color-sample bg-warning-800 border border-gray-200"></div>
              <span className="text-sm">800</span>
            </div>
            {/* Warning 900 */}
            <div className="color-showcase">
              <div className="color-sample bg-warning-900 border border-gray-200"></div>
              <span className="text-sm">900</span>
            </div>
            {/* Warning 950 */}
            <div className="color-showcase">
              <div className="color-sample bg-warning-950 border border-gray-200"></div>
              <span className="text-sm">950</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Success</h3>
          <div className="flex flex-wrap gap-2">
            {/* Success 50 */}
            <div className="color-showcase">
              <div className="color-sample bg-success-50 border border-gray-200"></div>
              <span className="text-sm">50</span>
            </div>
            {/* Success 100 */}
            <div className="color-showcase">
              <div className="color-sample bg-success-100 border border-gray-200"></div>
              <span className="text-sm">100</span>
            </div>
            {/* Success 200 */}
            <div className="color-showcase">
              <div className="color-sample bg-success-200 border border-gray-200"></div>
              <span className="text-sm">200</span>
            </div>
            {/* Success 300 */}
            <div className="color-showcase">
              <div className="color-sample bg-success-300 border border-gray-200"></div>
              <span className="text-sm">300</span>
            </div>
            {/* Success 400 */}
            <div className="color-showcase">
              <div className="color-sample bg-success-400 border border-gray-200"></div>
              <span className="text-sm">400</span>
            </div>
            {/* Success 500 */}
            <div className="color-showcase">
              <div className="color-sample bg-success-500 border border-gray-200"></div>
              <span className="text-sm">500</span>
            </div>
            {/* Success 600 */}
            <div className="color-showcase">
              <div className="color-sample bg-success-600 border border-gray-200"></div>
              <span className="text-sm">600</span>
            </div>
            {/* Success 700 */}
            <div className="color-showcase">
              <div className="color-sample bg-success-700 border border-gray-200"></div>
              <span className="text-sm">700</span>
            </div>
            {/* Success 800 */}
            <div className="color-showcase">
              <div className="color-sample bg-success-800 border border-gray-200"></div>
              <span className="text-sm">800</span>
            </div>
            {/* Success 900 */}
            <div className="color-showcase">
              <div className="color-sample bg-success-900 border border-gray-200"></div>
              <span className="text-sm">900</span>
            </div>
            {/* Success 950 */}
            <div className="color-showcase">
              <div className="color-sample bg-success-950 border border-gray-200"></div>
              <span className="text-sm">950</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Info</h3>
          <div className="flex flex-wrap gap-2">
            {/* Info 50 */}
            <div className="color-showcase">
              <div className="color-sample bg-info-50 border border-gray-200"></div>
              <span className="text-sm">50</span>
            </div>
            {/* Info 100 */}
            <div className="color-showcase">
              <div className="color-sample bg-info-100 border border-gray-200"></div>
              <span className="text-sm">100</span>
            </div>
            {/* Info 200 */}
            <div className="color-showcase">
              <div className="color-sample bg-info-200 border border-gray-200"></div>
              <span className="text-sm">200</span>
            </div>
            {/* Info 300 */}
            <div className="color-showcase">
              <div className="color-sample bg-info-300 border border-gray-200"></div>
              <span className="text-sm">300</span>
            </div>
            {/* Info 400 */}
            <div className="color-showcase">
              <div className="color-sample bg-info-400 border border-gray-200"></div>
              <span className="text-sm">400</span>
            </div>
            {/* Info 500 */}
            <div className="color-showcase">
              <div className="color-sample bg-info-500 border border-gray-200"></div>
              <span className="text-sm">500</span>
            </div>
            {/* Info 600 */}
            <div className="color-showcase">
              <div className="color-sample bg-info-600 border border-gray-200"></div>
              <span className="text-sm">600</span>
            </div>
            {/* Info 700 */}
            <div className="color-showcase">
              <div className="color-sample bg-info-700 border border-gray-200"></div>
              <span className="text-sm">700</span>
            </div>
            {/* Info 800 */}
            <div className="color-showcase">
              <div className="color-sample bg-info-800 border border-gray-200"></div>
              <span className="text-sm">800</span>
            </div>
            {/* Info 900 */}
            <div className="color-showcase">
              <div className="color-sample bg-info-900 border border-gray-200"></div>
              <span className="text-sm">900</span>
            </div>
            {/* Info 950 */}
            <div className="color-showcase">
              <div className="color-sample bg-info-950 border border-gray-200"></div>
              <span className="text-sm">950</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Background & Foreground</h3>
          <div className="flex flex-wrap gap-4">
            {/* Background */}
            <div className="color-showcase">
              <div className="color-sample bg-background border border-gray-200"></div>
              <span className="text-sm">Background</span>
            </div>
            {/* Foreground */}
            <div className="color-showcase">
              <div className="color-sample bg-foreground border border-gray-200"></div>
              <span className="text-sm">Foreground</span>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Typography</h2>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Font Sizes</h3>
          <div className="flex flex-col gap-3">
            <p className="text-xs">Text Extra Small (xs)</p>
            <p className="text-sm">Text Small (sm)</p>
            <p className="text-base">Text Base (base)</p>
            <p className="text-lg">Text Large (lg)</p>
            <p className="text-xl">Text Extra Large (xl)</p>
            <p className="text-2xl">Text 2XL (2xl)</p>
            <p className="text-3xl">Text 3XL (3xl)</p>
            <p className="text-4xl">Text 4XL (4xl)</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Font Weights</h3>
          <div className="flex flex-col gap-3">
            <p className="font-thin">Font Thin</p>
            <p className="font-extralight">Font Extra Light</p>
            <p className="font-light">Font Light</p>
            <p className="font-normal">Font Normal</p>
            <p className="font-medium">Font Medium</p>
            <p className="font-semibold">Font Semibold</p>
            <p className="font-bold">Font Bold</p>
            <p className="font-extrabold">Font Extra Bold</p>
            <p className="font-black">Font Black</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2">Line Heights</h3>
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-1 text-sm text-gray-500">leading-none (1)</p>
              <p className="leading-none bg-gray-100 p-3 w-48">
                This text has a line height of 1. See how the lines are very
                close together.
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">leading-tight (1.25)</p>
              <p className="leading-tight bg-gray-100 p-3 w-48">
                This text has a line height of 1.25. It's a bit more readable
                than none.
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">leading-normal (1.5)</p>
              <p className="leading-normal bg-gray-100 p-3 w-48">
                This text has a line height of 1.5, which is generally
                considered good for readability.
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-gray-500">leading-loose (2)</p>
              <p className="leading-loose bg-gray-100 p-3 w-48">
                This text has a line height of 2, providing lots of space
                between lines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Spacing</h2>
        <div className="flex flex-wrap gap-4">
          {/* p-0 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 p-0 border border-primary-500 w-16 h-16 flex items-center justify-center">
              <span className="text-xs">0</span>
            </div>
            <span className="text-sm mt-2">p-0</span>
          </div>
          {/* p-1 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 p-1 border border-primary-500 w-16 h-16 flex items-center justify-center">
              <span className="text-xs">1</span>
            </div>
            <span className="text-sm mt-2">p-1</span>
          </div>
          {/* p-2 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 p-2 border border-primary-500 w-16 h-16 flex items-center justify-center">
              <span className="text-xs">2</span>
            </div>
            <span className="text-sm mt-2">p-2</span>
          </div>
          {/* p-4 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 p-4 border border-primary-500 w-16 h-16 flex items-center justify-center">
              <span className="text-xs">4</span>
            </div>
            <span className="text-sm mt-2">p-4</span>
          </div>
          {/* p-6 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 p-6 border border-primary-500 w-16 h-16 flex items-center justify-center">
              <span className="text-xs">6</span>
            </div>
            <span className="text-sm mt-2">p-6</span>
          </div>
          {/* p-8 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 p-8 border border-primary-500 w-16 h-16 flex items-center justify-center">
              <span className="text-xs">8</span>
            </div>
            <span className="text-sm mt-2">p-8</span>
          </div>
          {/* p-12 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 p-12 border border-primary-500 w-16 h-16 flex items-center justify-center">
              <span className="text-xs">12</span>
            </div>
            <span className="text-sm mt-2">p-12</span>
          </div>
          {/* p-16 */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 p-16 border border-primary-500 w-16 h-16 flex items-center justify-center">
              <span className="text-xs">16</span>
            </div>
            <span className="text-sm mt-2">p-16</span>
          </div>
        </div>
      </section>

      {/* Border Radius Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Border Radius</h2>
        <div className="flex flex-wrap gap-4">
          {/* rounded-none */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 w-20 h-20 border border-primary-500 rounded-none"></div>
            <span className="text-sm mt-2">rounded-none</span>
          </div>
          {/* rounded-xs */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 w-20 h-20 border border-primary-500 rounded-xs"></div>
            <span className="text-sm mt-2">rounded-xs</span>
          </div>
          {/* rounded-sm */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 w-20 h-20 border border-primary-500 rounded-sm"></div>
            <span className="text-sm mt-2">rounded-sm</span>
          </div>
          {/* rounded-md */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 w-20 h-20 border border-primary-500 rounded-md"></div>
            <span className="text-sm mt-2">rounded-md</span>
          </div>
          {/* rounded-lg */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 w-20 h-20 border border-primary-500 rounded-lg"></div>
            <span className="text-sm mt-2">rounded-lg</span>
          </div>
          {/* rounded-xl */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 w-20 h-20 border border-primary-500 rounded-xl"></div>
            <span className="text-sm mt-2">rounded-xl</span>
          </div>
          {/* rounded-2xl */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 w-20 h-20 border border-primary-500 rounded-2xl"></div>
            <span className="text-sm mt-2">rounded-2xl</span>
          </div>
          {/* rounded-3xl */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 w-20 h-20 border border-primary-500 rounded-3xl"></div>
            <span className="text-sm mt-2">rounded-3xl</span>
          </div>
          {/* rounded-full */}
          <div className="flex flex-col items-center">
            <div className="bg-primary-300 w-20 h-20 border border-primary-500 rounded-full"></div>
            <span className="text-sm mt-2">rounded-full</span>
          </div>
        </div>
      </section>

      {/* Shadows Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Shadows</h2>
        <div className="flex flex-wrap gap-6">
          {/* shadow-sm */}
          <div className="flex flex-col items-center">
            <div className="bg-white w-24 h-24 shadow-sm flex items-center justify-center">
              <span className="text-xs text-gray-500">sm</span>
            </div>
            <span className="text-sm mt-2">shadow-sm</span>
          </div>
          {/* shadow (default) */}
          <div className="flex flex-col items-center">
            <div className="bg-white w-24 h-24 shadow flex items-center justify-center">
              <span className="text-xs text-gray-500">DEFAULT</span>
            </div>
            <span className="text-sm mt-2">shadow</span>
          </div>
          {/* shadow-md */}
          <div className="flex flex-col items-center">
            <div className="bg-white w-24 h-24 shadow-md flex items-center justify-center">
              <span className="text-xs text-gray-500">md</span>
            </div>
            <span className="text-sm mt-2">shadow-md</span>
          </div>
          {/* shadow-lg */}
          <div className="flex flex-col items-center">
            <div className="bg-white w-24 h-24 shadow-lg flex items-center justify-center">
              <span className="text-xs text-gray-500">lg</span>
            </div>
            <span className="text-sm mt-2">shadow-lg</span>
          </div>
          {/* shadow-xl */}
          <div className="flex flex-col items-center">
            <div className="bg-white w-24 h-24 shadow-xl flex items-center justify-center">
              <span className="text-xs text-gray-500">xl</span>
            </div>
            <span className="text-sm mt-2">shadow-xl</span>
          </div>
          {/* shadow-2xl */}
          <div className="flex flex-col items-center">
            <div className="bg-white w-24 h-24 shadow-2xl flex items-center justify-center">
              <span className="text-xs text-gray-500">2xl</span>
            </div>
            <span className="text-sm mt-2">shadow-2xl</span>
          </div>
        </div>
      </section>

      {/* Transitions & Animations */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Transitions & Animations
        </h2>
        <div className="flex gap-6">
          <div className="hover-demo">
            <p>Hover me (transition)</p>
          </div>
          <div className="animate-pulse bg-primary-300 w-20 h-20 flex items-center justify-center">
            <span>Pulse</span>
          </div>
          <div className="animate-spin bg-primary-300 w-20 h-20 flex items-center justify-center">
            <span>Spin</span>
          </div>
          <div className="animate-bounce bg-primary-300 w-20 h-20 flex items-center justify-center">
            <span>Bounce</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThemeShowcase;
