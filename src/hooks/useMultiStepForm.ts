import { useMemo, useState } from 'react'
import { FormField } from '@/types/form'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WEBSITE_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i
const PHONE_RE = /^[+]?[\d\s()-]{7,15}$/

function isEmpty(value: any) {
  if (value === undefined || value === null) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  return false
}

function validateField(field: FormField, value: any): string | null {
  const required = (field as any).required

  if (required && isEmpty(value)) {
    return 'This field is required.'
  }

  if (isEmpty(value)) {
    return null
  }

  switch (field.type) {
    case 'email':
      if (!EMAIL_RE.test(String(value))) {
        return 'Please enter a valid email address.'
      }
      break

    case 'website':
      if (!WEBSITE_RE.test(String(value))) {
        return 'Please enter a valid website URL.'
      }
      break

    case 'phone':
      if (!PHONE_RE.test(String(value))) {
        return 'Please enter a valid phone number.'
      }
      break

    case 'rating':
    case 'nps':
      if (typeof value !== 'number' || Number.isNaN(value)) {
        return 'Please select a value.'
      }
      break

    case 'checkboxes':
      if (!Array.isArray(value) || value.length === 0) {
        return 'Please select at least one option.'
      }
      break

    default:
      break
  }

  return null
}

export function useMultiStepForm(
  fields: FormField[],
  onSubmit: (responses: Record<string, any>) => void
) {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const total = fields.length
  const currentField = fields[currentStep] ?? fields[0]
  const isLastStep = currentStep === total - 1

  const update = (value: any) => {
    setResponses((prev) => ({
      ...prev,
      [currentField.id]: value,
    }))
    setErrors((prev) => {
      if (!prev[currentField.id]) return prev
      const next = { ...prev }
      delete next[currentField.id]
      return next
    })
  }

  const validateCurrent = () => {
    const error = validateField(currentField, responses[currentField.id])

    setErrors((prev) => {
      const next = { ...prev }
      if (error) {
        next[currentField.id] = error
      } else {
        delete next[currentField.id]
      }
      return next
    })

    return !error
  }

  const next = () => {
    if (!validateCurrent()) return

    if (isLastStep) {
      onSubmit(responses)
      return
    }

    setCurrentStep((s) => Math.min(s + 1, total - 1))
  }

  const prev = () => {
    setCurrentStep((s) => Math.max(s - 1, 0))
  }

  return useMemo(
    () => ({
      currentStep,
      currentField,
      responses,
      errors,
      isLastStep,
      next,
      prev,
      update,
    }),
   
    [currentStep, currentField, responses, errors, isLastStep]
  )
}