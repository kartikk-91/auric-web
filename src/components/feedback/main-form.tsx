'use client'

import { useState } from 'react'
import FeedbackQuestions from './feedback-questions'
import PersonalInfo from './personal-info'
import VerifyIdentity from './verify-identity'

const MainForm = ({ form }: { form: any }) => {
  const [step, setStep] = useState(1)

  const [email, setEmail] = useState<string | null>(null)
  const [personalInfo, setPersonalInfo] = useState<any>(null)
  const [feedbackData, setFeedbackData] = useState<any[]>([])

  return (
    <div className='relative z-10 w-1/2 h-5/6 bg-[#ffffff] rounded-3xl shadow-2xl p-8'>

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
          answers={feedbackData}
          setAnswers={setFeedbackData}
          onSubmit={() => {
            console.log({
              email,
              personalInfo,
              feedback: feedbackData,
            })
          }}
        />
      )}

    </div>
  )
}

export default MainForm