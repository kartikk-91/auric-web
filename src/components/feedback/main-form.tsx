'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react'

import FeedbackQuestions from './feedback-questions'
import PersonalInfo from './personal-info'
import VerifyIdentity from './verify-identity'
import FeedbackFooter from './feedback-footer'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const CARD_CLASSES =
  'relative z-10 flex w-full max-w-2xl flex-col md:w-3/4 lg:w-1/2 rounded-none sm:rounded-[2rem] border-0 sm:border sm:border-neutral-200 bg-white p-4 shadow-none sm:shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:p-6 md:p-8'

const MainForm = ({ form }: { form: any }) => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState<string | null>(null)
  const [personalInfo, setPersonalInfo] = useState<any>(null)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const company = form.company

  const resetForm = () => {
    setStep(1)
    setEmail(null)
    setPersonalInfo(null)
    setSubmitStatus('idle')
    setErrorMessage(null)
  }

  const onSubmit = async (feedbackData: any) => {
    try {
      setSubmitStatus('submitting')

      const formattedData = feedbackData.reduce((acc: any, item: any) => {
        acc[item.id] = {
          question: item.question,
          type: item.type,
          answer: item.answer,
        }
        return acc
      }, {})

      const payload = {
        formId: form.formId,
        c_id: form.c_id,
        email,
        name: personalInfo?.fullName,
        state: personalInfo?.state,
        country: personalInfo?.country,
        age: Number(personalInfo?.age),
        data: formattedData,
      }

      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json()

      if (!res.ok) {
        let message = 'Failed to submit feedback.'

        switch (res.status) {
          case 400:
            message = 'Invalid form submission.'
            break
          case 403:
            message = 'Access denied. Please try again later.'
            break
          case 409:
            message = 'You have already submitted feedback for this form.'
            break
          case 429:
            message = 'Too many submissions. Please wait before trying again.'
            break
          default:
            message = result?.error || message
        }

        toast.error(message)
        setErrorMessage(message)
        setSubmitStatus('error')
        return
      }

      toast.success('Feedback submitted successfully')
      setSubmitStatus('success')
    } catch (err) {
      console.error('Submit error:', err)
      const message = 'Unable to submit feedback. Please check your connection and try again.'
      toast.error(message)
      setErrorMessage(message)
      setSubmitStatus('error')
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className={`${CARD_CLASSES} flex min-h-[420px] flex-col items-center justify-center text-center`}>
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-green-100 bg-green-50">
          <CheckCircle2 className="h-7 w-7 text-green-600" />
        </div>

        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-[28px]">
          Response submitted
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
          Thank you for taking the time to share your feedback. Your response has been recorded successfully.
        </p>

        <button
          onClick={resetForm}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-neutral-200 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
        >
          <RotateCcw className="h-4 w-4" />
          Submit another response
        </button>
      </div>
    )
  }

  if (submitStatus === 'error') {
    return (
      <div className={`${CARD_CLASSES} flex min-h-[420px] flex-col items-center justify-center text-center`}>
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-100 bg-red-50">
          <AlertTriangle className="h-7 w-7 text-red-500" />
        </div>

        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-[28px]">
          Something went wrong
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
          {errorMessage || 'We couldn\u2019t submit your feedback. Please try again.'}
        </p>

        <button
          onClick={() => setSubmitStatus('idle')}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className={`${CARD_CLASSES} min-h-[100dvh] sm:min-h-[540px]`}>
      {step === 1 && (
        <VerifyIdentity
          company={company}
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
          company={company}
          title={form.title}
          tagLine={form.tagLine}
          onSubmit={onSubmit}
          isSubmitting={submitStatus === 'submitting'}
        />
      )}

      <div className="mt-6 flex justify-center sm:hidden">
        <FeedbackFooter />
      </div>
    </div>
  )
}

export default MainForm