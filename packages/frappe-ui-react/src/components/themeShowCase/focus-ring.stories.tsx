import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { TextInput } from "../textInput";

// Literal `var(--focus-outline-*)` strings on purpose, applied via inline
// style rather than a `focus-ring-<color>` utility class — Tailwind's JIT
// only emits classes it can see literally in source, and there is no such
// utility registered here (see theme.css: the ring is applied globally via
// `:focus-visible`, themed variants override `outline` directly).
const FOCUS_RINGS = [
  { label: "--focus-outline-default", variable: "--focus-outline-default" },
  { label: "--focus-outline-red", variable: "--focus-outline-red" },
  { label: "--focus-outline-green", variable: "--focus-outline-green" },
  { label: "--focus-outline-amber", variable: "--focus-outline-amber" },
  { label: "--focus-outline-blue", variable: "--focus-outline-blue" },
];

const FocusRing = () => {
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Focus Ring</h1>
      <p className="text-ink-gray-6 mb-8 max-w-xl">
        A single keyboard focus indicator, applied globally via{" "}
        <code className="text-ink-gray-8">:focus-visible</code> in{" "}
        <code className="text-ink-gray-8">theme.css</code>. Every focusable
        element gets a correctly styled ring with zero classes, and it only
        shows for keyboard navigation &mdash; mouse clicks never trigger it.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Live example</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button label="Button" />
          <Button theme="red" label="Red button" />
          <Button theme="green" label="Green button" />
          <Button theme="blue" label="Blue button" />
          <TextInput placeholder="Text input" />
          <Checkbox label="Checkbox" value={true} onChange={() => {}} />
          <a href="#" className="text-ink-blue-3 underline">
            Link
          </a>
        </div>
        <p className="text-xs text-ink-gray-5 mt-3">
          Tab into these to see the ring &mdash; clicking with a mouse won't
          show it.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Tokens</h2>
        <p className="text-sm text-ink-gray-6 mb-4">
          Retheme a specific element with{" "}
          <code className="text-ink-gray-8">
            {"focus-visible:[outline:var(--focus-outline-<color>)]"}
          </code>
          , e.g. red for a form error or green for a success state.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {FOCUS_RINGS.map((ring) => (
            <div key={ring.label} className="grid gap-2">
              <div
                className="h-16 rounded-lg bg-surface-white border border-outline-gray-1"
                style={{
                  outline: `var(${ring.variable})`,
                  outlineOffset: "2px",
                }}
              />
              <span className="text-xs font-mono text-ink-gray-7">
                {ring.label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof FocusRing> = {
  title: "DesignSystem/Focus Ring",
  component: FocusRing,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FocusRing />,
};
