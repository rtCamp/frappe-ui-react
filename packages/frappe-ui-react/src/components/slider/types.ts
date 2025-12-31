export interface SliderProps {
	min: number;
	max: number;
	step?: number;
	range?: boolean;
	knob?: boolean;
	tooltip?: boolean;
	showValue?: boolean;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	value?: number | { min: number; max: number }; // number for single value, object for range.
	disabled?: boolean;
	className?: string;
	onChange?: (value: number | { min: number; max: number }) => void;
}
