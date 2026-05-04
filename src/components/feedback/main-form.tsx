'use client'

import { useState } from 'react'
import FeedbackQuestions from './feedback-questions'
import PersonalInfo from './personal-info'
import VerifyIdentity from './verify-identity'

const MainForm = ({ form }: { form: any }) => {
  const [step, setStep] = useState(1)

  const [email, setEmail] = useState<string | null>(null)
  const [personalInfo, setPersonalInfo] = useState<any>(null)

  const onSubmit = async (feedbackData:any) => {
    try {
      const formattedData = feedbackData.reduce((acc: any, item: any) => {
        acc[item.id] = {
          question: item.question,
          type: item.type,
          answer: item.answer,
        };
        return acc;
      }, {});

      const payload = {
        formId: form.formId,
        c_id: form.c_id,

        email: email,
        name: personalInfo?.fullName,
        state: personalInfo?.state,
        country: personalInfo?.country,
        age: Number(personalInfo?.age),

        data: formattedData,
      };

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit feedback");
      }

      console.log("Submitted:", result);

    } catch (err) {
      console.error("Submit error:", err);
    }
  }

  return (
    <div className='relative z-10 md:w-3/4 lg:w-1/2 min-h-fit bg-[#ffffff] rounded-3xl shadow-2xl p-8'>

      {step === 1 && (
        <VerifyIdentity
          onSuccess={(email: string) => {
            setEmail(email)
            setStep(2)
          }}
        />
      )}

      {step === 2 && (
        <PersonalInfo
          onNext={(data: any) => {
            setPersonalInfo(data)
            setStep(3)
          }}
        />
      )}

      {step === 3 && (
        <FeedbackQuestions
          schema={form.schema}
          onSubmit={onSubmit}
        />
      )}

    </div>
  )
}

export default MainForm