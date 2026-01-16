import React, { useState, useCallback, useMemo } from "react";
import { Stepper } from "./stepper";
import { Button } from "../button";
import type { WizardProps, WizardStep } from "./types";

export const Wizard: React.FC<WizardProps> = ({
  steps,
  currentStep: initialStep = 0,
  onStepChange,
  onComplete,
  showNavigation = true,
  className = "",
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [validating, setValidating] = useState(false);

  const activeStep = useMemo(() => steps[currentStep], [steps, currentStep]);

  const handleNext = useCallback(async () => {
    const step = steps[currentStep];
    if (step?.validate) {
      setValidating(true);
      try {
        const isValid = await step.validate();
        setValidating(false);
        if (!isValid) return;
      } catch (error) {
        setValidating(false);
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    } else {
      onComplete?.();
    }
  }, [currentStep, steps, onStepChange, onComplete]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    }
  }, [currentStep, onStepChange]);

  const handleStepClick = useCallback(
    (index: number, step: { id: string }) => {
      const stepData = steps[index];
      if (index <= currentStep || stepData?.completed) {
        setCurrentStep(index);
        onStepChange?.(index);
      }
    },
    [currentStep, steps, onStepChange]
  );

  const stepperSteps = useMemo(
    () =>
      steps.map((step, index) => ({
        id: step.id,
        title: step.title,
        description: step.description,
        completed: step.completed || index < currentStep,
        disabled: step.disabled,
        icon: step.icon,
        error: step.error,
      })),
    [steps, currentStep]
  );

  return (
    <div className={`flex flex-col ${className}`}>
      <Stepper
        steps={stepperSteps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      <div className="mt-8 p-6 bg-surface-white border border-outline-gray-2 rounded-lg">
        {activeStep?.content}
      </div>
      {showNavigation && (
        <div className="flex justify-between mt-6">
          <Button
            label={activeStep?.previousLabel || "Previous"}
            theme="gray"
            variant="outline"
            size="md"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          />
          <Button
            label={
              currentStep === steps.length - 1
                ? "Complete"
                : activeStep?.nextLabel || "Next"
            }
            theme="blue"
            variant="solid"
            size="md"
            onClick={handleNext}
            loading={validating}
          />
        </div>
      )}
    </div>
  );
};


