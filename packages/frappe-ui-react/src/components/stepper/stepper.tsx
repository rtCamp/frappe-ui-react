import React from "react";
import FeatherIcon from "../featherIcon";
import type { StepperProps, StepperStep } from "./types";

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep = 0,
  orientation = "horizontal",
  variant = "default",
  onStepClick,
  className = "",
}) => {
  const getStepStatus = (index: number, step: StepperStep) => {
    if (step.error) return "error";
    if (step.completed) return "completed";
    if (index === currentStep) return "active";
    if (index < currentStep) return "completed";
    return "pending";
  };

  const handleStepClick = (index: number, step?: StepperStep) => {
    const stepData = step || steps[index];
    if (stepData?.disabled) return;
    onStepClick?.(index, stepData);
  };

  const renderStepIcon = (index: number, step: StepperStep, status: string) => {
    if (step.icon) return step.icon;

    if (variant === "dots") {
      return (
        <div
          className={`w-2 h-2 rounded-full ${
            status === "active"
              ? "bg-blue-500"
              : status === "completed"
              ? "bg-green-500"
              : status === "error"
              ? "bg-red-500"
              : "bg-gray-300"
          }`}
        />
      );
    }

    if (variant === "numbers") {
      return (
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
            status === "active"
              ? "bg-blue-500 text-white"
              : status === "completed"
              ? "bg-green-500 text-white"
              : status === "error"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {status === "completed" ? (
            <FeatherIcon name="check" height={16} width={16} />
          ) : (
            index + 1
          )}
        </div>
      );
    }

    // Default variant
    return (
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          status === "active"
            ? "bg-blue-500 text-white"
            : status === "completed"
            ? "bg-green-500 text-white"
            : status === "error"
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {status === "completed" ? (
          <FeatherIcon name="check" height={16} width={16} />
        ) : status === "error" ? (
          <FeatherIcon name="x" height={16} width={16} />
        ) : (
          index + 1
        )}
      </div>
    );
  };

  if (orientation === "vertical") {
    return (
      <div className={`flex flex-col ${className}`}>
        {steps.map((step, index) => {
          const status = getStepStatus(index, step);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex">
              <div className="flex flex-col items-center mr-4">
                {renderStepIcon(index, step, status)}
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 my-2 ${
                      status === "completed" || index < currentStep
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                    style={{ minHeight: "40px" }}
                  />
                )}
              </div>
              <div
                className={`flex-1 pb-8 ${step.disabled ? "opacity-50" : ""} ${
                  onStepClick && !step.disabled ? "cursor-pointer" : ""
                }`}
                onClick={() => handleStepClick(index)}
              >
                <div
                  className={`font-medium ${
                    status === "active"
                      ? "text-blue-500"
                      : status === "completed"
                      ? "text-green-500"
                      : status === "error"
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-sm text-gray-500 mt-1">{step.description}</div>
                )}
                {step.error && (
                  <div className="text-sm text-red-500 mt-1">{step.error}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, index) => {
        const status = getStepStatus(index, step);
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <div
              className={`flex flex-col items-center ${step.disabled ? "opacity-50" : ""} ${
                onStepClick && !step.disabled ? "cursor-pointer" : ""
              }`}
              onClick={() => handleStepClick(index)}
            >
              {renderStepIcon(index, step, status)}
              <div className="mt-2 text-center">
                <div
                  className={`text-sm font-medium ${
                    status === "active"
                      ? "text-blue-500"
                      : status === "completed"
                      ? "text-green-500"
                      : status === "error"
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                >
                  {step.title}
                </div>
                {step.description && (
                  <div className="text-xs text-gray-500 mt-1">{step.description}</div>
                )}
                {step.error && (
                  <div className="text-xs text-red-500 mt-1">{step.error}</div>
                )}
              </div>
            </div>
            {!isLast && (
              <div
                className={`flex-1 h-0.5 mx-4 ${
                  status === "completed" || index < currentStep
                    ? "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};


