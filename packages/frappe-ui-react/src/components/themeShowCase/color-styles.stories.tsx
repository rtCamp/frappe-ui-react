import type { Meta, StoryObj } from "@storybook/react-vite";

const outlineColors = [
  "border-outline-white",
  "border-outline-gray-1",
  "border-outline-gray-2",
  "border-outline-gray-3",
  "border-outline-gray-4",
  "border-outline-gray-5",
  "border-outline-red-2",
  "border-outline-red-3",
  "border-outline-red-4",
  "border-outline-green-2",
  "border-outline-green-3",
  "border-outline-green-4",
  "border-outline-amber-2",
  "border-outline-amber-3",
  "border-outline-amber-4",
  "border-outline-blue-2",
  "border-outline-blue-3",
  "border-outline-blue-4",
  "border-outline-orange-3",
  "border-outline-violet-2",
  "border-outline-violet-3",
  "border-outline-violet-4",
  "border-outline-gray-modal",
];

const inkColors = [
  "text-ink-white",
  "text-ink-gray-1",
  "text-ink-gray-2",
  "text-ink-gray-3",
  "text-ink-gray-4",
  "text-ink-gray-5",
  "text-ink-gray-6",
  "text-ink-gray-7",
  "text-ink-gray-8",
  "text-ink-red-1",
  "text-ink-red-2",
  "text-ink-red-3",
  "text-ink-red-4",
  "text-ink-green-1",
  "text-ink-green-2",
  "text-ink-green-3",
  "text-ink-green-4",
  "text-ink-amber-1",
  "text-ink-amber-2",
  "text-ink-amber-3",
  "text-ink-amber-4",
  "text-ink-blue-1",
  "text-ink-blue-2",
  "text-ink-blue-3",
  "text-ink-blue-4",
  "text-ink-blue-link",
];

const surfaceColors = [
  "bg-surface-white",
  "bg-surface-gray-1",
  "bg-surface-gray-2",
  "bg-surface-gray-3",
  "bg-surface-gray-4",
  "bg-surface-gray-5",
  "bg-surface-gray-6",
  "bg-surface-gray-7",
  "bg-surface-red-1",
  "bg-surface-red-2",
  "bg-surface-red-3",
  "bg-surface-red-4",
  "bg-surface-red-5",
  "bg-surface-red-6",
  "bg-surface-red-7",
  "bg-surface-green-1",
  "bg-surface-green-2",
  "bg-surface-green-3",
  "bg-surface-green-4",
  "bg-surface-green-5",
  "bg-surface-green-6",
  "bg-surface-green-7",
  "bg-surface-amber-1",
  "bg-surface-amber-2",
  "bg-surface-amber-3",
  "bg-surface-amber-4",
  "bg-surface-amber-5",
  "bg-surface-amber-6",
  "bg-surface-amber-7",
  "bg-surface-blue-1",
  "bg-surface-blue-2",
  "bg-surface-blue-3",
  "bg-surface-blue-4",
  "bg-surface-blue-5",
  "bg-surface-blue-6",
  "bg-surface-blue-7",
  "bg-surface-orange-2",
  "bg-surface-violet-2",
  "bg-surface-violet-3",
  "bg-surface-violet-4",
  "bg-surface-violet-5",
  "bg-surface-violet-6",
  "bg-surface-violet-7",
  "bg-surface-cyan-2",
  "bg-surface-menu-bar",
  "bg-surface-card",
  "bg-surface-modal",
  "bg-surface-selected",
];

const focusColors = [
  "border-focus-gray",
  "border-focus-blue",
  "border-focus-green",
  "border-focus-red",
  "border-focus-amber",
];

const OutlineColors = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Outlines</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        {outlineColors.map((className) => (
          <div
            key={className}
            className={`p-4 rounded-[10px] text-center border-2 ${className}`}
          >
            <div className="text-ink-gray-4 text-xs font-bold">{className}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const InkColors = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Ink Colors</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        {inkColors.map((className) => (
          <div
            key={className}
            className="p-4 rounded-[10px] text-center border-2 border-transparent"
          >
            <div className={`${className} text-xs font-bold`}>{className}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const SurfaceColors = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Surface Colors</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        {surfaceColors.map((className) => (
          <div
            key={className}
            className={`p-4 rounded-[10px] text-center border-2 border-transparent ${className}`}
          >
            <div className="text-ink-gray-4 text-xs font-bold">{className}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const FocusColors = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Focus Colors</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        {focusColors.map((className) => (
          <div
            key={className}
            className={`p-4 rounded-[10px] text-center border-2 ${className}`}
          >
            <div className="text-ink-gray-4 text-xs font-bold">{className}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ColorStyles = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Color Styles</h1>
      <OutlineColors />
      <InkColors />
      <SurfaceColors />
      <FocusColors />
    </div>
  );
};

const meta: Meta<typeof ColorStyles> = {
  title: "DesignSystem/Color Styles",
  component: ColorStyles,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ColorStyles />,
};
