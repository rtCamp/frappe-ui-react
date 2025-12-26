export interface SliderProps {
	min: number;
	max: number;
	step?: number;
	range?: boolean;
	knob: boolean;
	tooltip?: boolean;
	showValue?: boolean;
	size: 'sm' | 'md' | 'lg' | 'xl';
	value?: number | { min: number; max: number };
	disabled?: boolean;
	className?: string;
	onChange: (value: number | { min: number; max: number }) => void;
}
