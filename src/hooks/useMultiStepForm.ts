

import { FormField } from "@/types/form";
import { useState } from "react";


export function useMultiStepForm(fields: FormField[], onSubmit: any) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentField = fields[currentStep];
  const isLastStep = currentStep === fields.length - 1;

  const next = () => {
    if (currentField.required && !responses[currentField.id]) {
      setErrors({ [currentField.id]: "This field is required" });
      return;
    }

    setErrors({});

    if (isLastStep) onSubmit(responses);
    else setCurrentStep((p) => p + 1);
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  const update = (value: any) => {
    setResponses((prev) => ({ ...prev, [currentField.id]: value }));
    setErrors({});
  };

  return {
    currentStep,
    currentField,
    responses,
    errors,
    isLastStep,
    next,
    prev,
    update,
  };
}