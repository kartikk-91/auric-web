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

     
      <div className="flex flex-1 flex-col justify-center">
        <div key={currentField.id} className="animate-step">
          <QuestionHeader
            question={currentField.question}
            subtext={currentField.helpText}
            brandName={brandName}
            brandColor={brandColor}
            required={currentField.required}
          />

          <div className="mb-8 min-h-[140px] w-full">
            <FieldRenderer
              field={currentField}
              value={responses[currentField.id]}
              onChange={update}
            />

            {errors[currentField.id] && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors[currentField.id]}
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        className={
          isSubmitting
            ? "mt-auto pointer-events-none opacity-70 transition-opacity"
            : "mt-auto transition-opacity"
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

      <style jsx>{`
        @keyframes step-in {
          from {
            opacity: 0;
            transform: translateX(8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-step {
          animation: step-in 0.22s ease-out;
        }
      `}</style>
    </FormLayout>
  );
}