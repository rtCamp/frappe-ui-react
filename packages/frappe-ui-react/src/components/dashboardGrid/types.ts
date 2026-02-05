import type { Layout as RGLLayout } from 'react-grid-layout';

export type Breakpoint = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

export interface WidgetSize {
	w: number;
	h: number;
	minW?: number;
	maxW?: number;
	minH?: number;
	maxH?: number;
	isResizable?: boolean;
}

export type WidgetSizePresets = Record<string, WidgetSize>;

export interface WidgetLayout {
	id: string;
	key?: string;
	x?: number;
	y?: number;
	size?: string;
	w?: number;
	h?: number;
	minW?: number;
	maxW?: number;
	minH?: number;
	maxH?: number;
	static?: boolean;
	isDraggable?: boolean;
	isResizable?: boolean;
}

export type WidgetRow = Array<string | WidgetLayout>;
export type DashboardLayout = WidgetRow[];

export interface WidgetDefinition {
	id: string;
	name: string;
	component: React.ComponentType<unknown>;
	props?: Record<string, unknown>;
	size?: string;
	isResizable?: boolean;
	isDraggable?: boolean;
	preview?: {
		props?: Record<string, unknown>;
		description?: string;
	};
}

export interface DashboardProps {
	widgets: WidgetDefinition[];
	initialLayout?: DashboardLayout;
	savedLayout?: WidgetLayout[];
	onLayoutChange?: (layout: WidgetLayout[]) => void;
	sizes?: WidgetSizePresets;
	breakpoints?: { [key in Breakpoint]?: number };
	cols?: { [key in Breakpoint]?: number };
	rowHeight?: number;
	margin?: [number, number];
	layoutLock?: boolean;
	dragHandle?: boolean;
	dragHandleOnHover?: boolean;
	compactType?: 'vertical' | 'horizontal' | null;
	isBounded?: boolean;
	className?: string;
}

export interface LayoutContainerProps {
	widgets: WidgetDefinition[];
	layout: WidgetLayout[];
	setLayout?: (layout: WidgetLayout[]) => void;
	onDrop?: (widgetId: string, layout: { x: number; y: number; w: number; h: number }) => void;
	onRemove?: (widgetId: string) => void;
	sizes?: WidgetSizePresets;
	breakpoints?: { [key in Breakpoint]?: number };
	cols?: { [key in Breakpoint]?: number };
	rowHeight?: number;
	margin?: [number, number];
	layoutLock?: boolean;
	dragHandle?: boolean;
	dragHandleOnHover?: boolean;
	compactType?: 'vertical' | 'horizontal' | null;
	isBounded?: boolean;
	className?: string;
}

export interface WidgetWrapperProps {
	widgetId: string;
	onRemove?: (widgetId: string) => void;
	layoutLock?: boolean;
	dragHandle?: boolean;
	dragHandleOnHover?: boolean;
	children: React.ReactNode;
}

export interface DashboardWidgetGalleryProps {
	widgets: WidgetDefinition[];
	onAddWidget?: (widget: WidgetDefinition) => void;
	title?: string;
	description?: string;
	className?: string;
	mode?: "list" | "grid";
}

export interface DashboardWidgetGalleryItemProps {
	widget: WidgetDefinition;
	onClick?: (widget: WidgetDefinition) => void;
	mode?: "list" | "grid";
}


export type GridLayoutItem = RGLLayout;