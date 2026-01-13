export type SliderSingleValue = number;
export type SliderRangeValue = { min: number; max: number };
export type SliderValue = SliderSingleValue | SliderRangeValue;

export interface SliderProps {
	min: number;
	max: number;
	step?: number;
	range?: boolean;
	knob?: boolean;
	tooltip?: boolean;
	showValue?: boolean;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	value?: SliderValue; // number for single value, object for range.
	disabled?: boolean;
	className?: string;
	onChange?: (value: SliderValue) => void;
}
