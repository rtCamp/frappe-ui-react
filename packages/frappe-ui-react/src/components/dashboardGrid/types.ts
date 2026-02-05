import type { Layout as RGLLayout } from 'react-grid-layout';

export type Breakpoint = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

export interface WidgetLayout {
	id: string;
	key?: string;
	x: number;
	y: number;
	w: number;
	h: number;
	minW?: number;
	minH?: number;
	maxW?: number;
	maxH?: number;
	static?: boolean;
	isDraggable?: boolean;
	isResizable?: boolean;
}

export interface WidgetDefinition {
	id: string;
	name: string;
	component: React.ComponentType<any>;
	props?: Record<string, any>;
	preview?: {
		props?: Record<string, any>;
		defaultW?: number;
		defaultH?: number;
		description?: string;
	};
}

export interface DashboardProps {
	widgets: WidgetDefinition[];
	initialLayout: WidgetLayout[];
	savedLayout?: WidgetLayout[];
	onLayoutChange?: (layout: WidgetLayout[]) => void;
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