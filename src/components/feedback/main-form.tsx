'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  CheckCircle2,
  RotateCcw,
} from 'lucide-react'

import FeedbackQuestions from './feedback-questions'
import PersonalInfo from './personal-info'
import VerifyIdentity from './verify-identity'

type SubmitStatus =
  | 'idle'
  | 'submitting'
  | 'success'

const MainForm = ({
  form,
}: {
  form: any
}) => {
  const [step, setStep] =
    useState(1)

  const [email, setEmail] =
    useState<string | null>(
      null
    )

  const [
    personalInfo,
    setPersonalInfo,
  ] = useState<any>(null)

  const [
    submitStatus,
    setSubmitStatus,
  ] =
    useState<SubmitStatus>(
      'idle'
    )

  const resetForm = () => {
    setStep(1)
    setEmail(null)
    setPersonalInfo(null)
    setSubmitStatus('idle')
  }

  const onSubmit = async (
    feedbackData: any
  ) => {
    try {
      setSubmitStatus(
        'submitting'
      )

      const formattedData =
        feedbackData.reduce(
          (
            acc: any,
            item: any
          ) => {
            acc[item.id] = {
              question:
                item.question,
              type: item.type,
              answer:
                item.answer,
            }

            return acc
          },
          {}
        )

      const payload = {
        formId:
          form.formId,

        c_id:
          form.c_id,

        email,

        name:
          personalInfo?.fullName,

        state:
          personalInfo?.state,

        country:
          personalInfo?.country,

        age: Number(
          personalInfo?.age
        ),

        data:
          formattedData,
      }

      const res =
        await fetch(
          '/api/feedback',
          {
            method:
              'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        )

      const result =
        await res.json()

      if (!res.ok) {
        switch (
          res.status
        ) {
          case 400:
            toast.error(
              'Invalid form submission.'
            )
            break

          case 403:
            toast.error(
              'Access denied. Please try again later.'
            )
            break

          case 409:
            toast.error(
              'You have already submitted feedback.'
            )
            break

          case 429:
            toast.error(
              'Too many submissions. Please wait before trying again.'
            )
            break

          default:
            toast.error(
              result.error ||
                'Failed to submit feedback.'
            )
        }

        setSubmitStatus(
          'idle'
        )

        return
      }

      toast.success(
        'Feedback submitted successfully'
      )

      setSubmitStatus(
        'success'
      )
    } catch (err) {
      console.error(
        'Submit error:',
        err
      )

      toast.error(
        'Unable to submit feedback.'
      )

      setSubmitStatus(
        'idle'
      )
    }
  }

  if (
    submitStatus ===
    'success'
  ) {
    return (
      <div className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:p-8 md:w-3/4 md:p-10 lg:w-1/2">

        <div className="flex flex-col items-center text-center">

          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50">
            <CheckCircle2 className="h-7 w-7 text-neutral-800" />
          </div>

          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-[28px]">
            Response submitted
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
            Thank you for taking the time to share your feedback.
            Your response has been recorded successfully.
          </p>

          <button
            onClick={
              resetForm
            }
            className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-neutral-200 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
          >
            <RotateCcw className="h-4 w-4" />
            Submit another response
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:p-6 md:w-3/4 md:p-8 lg:w-1/2">

      {step === 1 && (
        <VerifyIdentity
          onSuccess={(
            email: string
          ) => {
            setEmail(
              email
            )

            setStep(2)
          }}
        />
      )}

      {step === 2 && (
        <PersonalInfo
          onNext={(
            data: any
          ) => {
            setPersonalInfo(
              data
            )

            setStep(3)
          }}
        />
      )}

      {step === 3 && (
        <FeedbackQuestions
          schema={
            form.schema
          }
          onSubmit={
            onSubmit
          }
          isSubmitting={
            submitStatus ===
            'submitting'
          }
        />
      )}
    </div>
  )
}

export default MainForm