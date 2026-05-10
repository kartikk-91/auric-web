'use client'

import React, {
  useState,
} from 'react'
import Timeline from './timeline'
import Select from 'react-select'
import { getNames } from 'country-list'

const countryOptions =
  getNames().map(
    (country: any) => ({
      label: country,
      value: country,
    })
  )

const PersonalInfo = ({
  onNext,
}: {
  onNext: (
    data: any
  ) => void
}) => {
  const [
    formData,
    setFormData,
  ] = useState({
    fullName: '',
    age: '',
    state: '',
    country: '',
  })

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    const ageNumber =
      Number(
        formData.age
      )

    if (
      !formData.fullName ||
      !formData.age ||
      !formData.country ||
      ageNumber < 0 ||
      ageNumber > 100
    ) {
      return
    }

    onNext(formData)
  }

  return (
    <div className="w-full">

      <Timeline currentStep={2} />

      <div className="flex w-full flex-col items-center">

        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-1">
          <span className="text-xs font-medium text-purple-600">
            Thanks for taking the time!
          </span>
        </div>

        <div className="w-full text-center">
          <h1 className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            We'd love to know
          </h1>

          <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
            <span className="text-gray-900">
              a little about{' '}
            </span>

            <span className="text-purple-600">
              you
            </span>
          </h1>
        </div>

        <p className="mb-8 max-w-md text-center text-sm text-gray-500">
          This helps us personalize your experience and better understand your feedback.
        </p>

      </div>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-5 sm:space-y-6"
      >

        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">

          
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Full Name
            </label>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Enter your full name"
                value={
                  formData.fullName
                }
                onChange={(
                  e
                ) =>
                  setFormData(
                    {
                      ...formData,
                      fullName:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Age
            </label>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <input
                type="number"
                min={0}
                max={100}
                placeholder="Enter your age"
                value={
                  formData.age
                }
                onChange={(
                  e
                ) =>
                  setFormData(
                    {
                      ...formData,
                      age: e
                        .target
                        .value,
                    }
                  )
                }
                className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">

          
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              State / Province
            </label>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              </div>

              <input
                type="text"
                placeholder="Enter your state or province"
                value={
                  formData.state
                }
                onChange={(
                  e
                ) =>
                  setFormData(
                    {
                      ...formData,
                      state:
                        e.target
                          .value,
                    }
                  )
                }
                className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          
          <div>
            <label className="mb-2 block font-semibold text-gray-700">
              Country
            </label>

            <Select
              options={
                countryOptions
              }
              placeholder="Search or select your country"
              value={countryOptions.find(
                (
                  c
                ) =>
                  c.value ===
                  formData.country
              )}
              onChange={(
                selected: any
              ) =>
                setFormData({
                  ...formData,
                  country:
                    selected?.value ||
                    '',
                })
              }
              className="text-sm"
              styles={{
                control: (
                  base
                ) => ({
                  ...base,
                  minHeight:
                    '50px',
                  borderRadius:
                    '0.75rem',
                  borderColor:
                    '#e5e7eb',
                  boxShadow:
                    'none',
                  '&:hover':
                    {
                      borderColor:
                        '#3b82f6',
                    },
                }),
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-blue-700"
        >
          Next

          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>

      </form>
    </div>
  )
}

export default PersonalInfo