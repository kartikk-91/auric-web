import { useMultiStepForm } from "@/hooks/useMultiStepForm";
import ProgressBar from "./progress-bar";
import QuestionHeader from "./question-header";
import NavigationButtons from "./navigation-buttons";
import { FieldRenderer } from "./field-renderer";
import FormLayout from "./form-layout";

export default function MultiStepForm({
  fields,
  onSubmit,
  brandName = "Auric",
  brandColor = "#7c3aed",
  isSubmitting = false,
}: any) {
  const {
    currentStep,
    currentField,
    responses,
    errors,
    isLastStep,
    next,
    prev,
    update,
  } = useMultiStepForm(fields, onSubmit);

  return (
    <FormLayout>
      <ProgressBar
        current={currentStep}
        total={fields.length}
        brandColor={brandColor}
      />

      <QuestionHeader
        question={currentField.question}
        subtext={currentField.helpText}
        brandName={brandName}
        brandColor={brandColor}
      />

      <div className="mb-10 max-h-36 overflow-x-scroll">
        <FieldRenderer
          field={currentField}
          value={responses[currentField.id]}
          onChange={update}
        />

        {errors[currentField.id] && (
          <p className="text-red-500 text-sm mt-2">
            {errors[currentField.id]}
          </p>
        )}
      </div>

      <div
        className={
          isSubmitting
            ? "pointer-events-none opacity-70 transition"
            : "transition"
        }
      >
        <NavigationButtons
          onPrev={prev}
          onNext={next}
          isLast={isLastStep}
          disablePrev={currentStep === 0 || isSubmitting}
          isSubmitting={isSubmitting}
          brandColor={brandColor}
        />
      </div>
    </FormLayout>
  );
}