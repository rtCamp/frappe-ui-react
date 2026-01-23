export interface StepperStep {
  /**
   * Unique identifier for the step
   */
  id: string;
  /**
   * Title of the step
   */
  title: string;
  /**
   * Description or subtitle of the step
   */
  description?: string;
  /**
   * Whether the step is completed
   */
  completed?: boolean;
  /**
   * Whether the step is disabled
   */
  disabled?: boolean;
  /**
   * Custom icon for the step
   */
  icon?: React.ReactNode;
  /**
   * Error message for the step
   */
  error?: string;
}

export interface StepperProps {
  /**
   * Array of steps
   */
  steps: StepperStep[];
  /**
   * Current active step index
   * @default 0
   */
  currentStep?: number;
  /**
   * Orientation of the stepper
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Variant of the stepper
   * @default "default"
   */
  variant?: "default" | "dots" | "numbers";
  /**
   * Callback when a step is clicked
   */
  onStepClick?: (stepIndex: number, step: StepperStep) => void;
  /**
   * Custom class name
   */
  className?: string;
}

export interface WizardProps {
  /**
   * Array of steps with content
   */
  steps: WizardStep[];
  /**
   * Current active step index
   * @default 0
   */
  currentStep?: number;
  /**
   * Callback when step changes
   */
  onStepChange?: (stepIndex: number) => void;
  /**
   * Callback when wizard is completed
   */
  onComplete?: () => void;
  /**
   * Show navigation buttons
   * @default true
   */
  showNavigation?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

export interface WizardStep extends StepperStep {
  /**
   * Content to render for this step
   */
  content: React.ReactNode;
  /**
   * Validation function for this step
   */
  validate?: () => boolean | Promise<boolean>;
  /**
   * Custom next button label
   */
  nextLabel?: string;
  /**
   * Custom previous button label
   */
  previousLabel?: string;
}


