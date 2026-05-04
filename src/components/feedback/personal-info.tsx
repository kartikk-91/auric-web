'use client'

import React, { useState } from 'react'
import Timeline from './timeline'
import Select from "react-select";
import { getNames } from "country-list";

const countryOptions = getNames().map((country:any) => ({
    label: country,
    value: country,
}));

const PersonalInfo = ({
    onNext,
}: {
    onNext: (data: any) => void
}) => {

    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        state: '',
        country: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const ageNumber = Number(formData.age);

        if (
            !formData.fullName ||
            !formData.age ||
            !formData.country ||
            ageNumber < 0 ||
            ageNumber > 100
        ) {
            return;
        }

        onNext(formData)
    }

    return (
        <div className='w-full h-full'>
            <Timeline currentStep={2} />

            <div className='w-full flex flex-col items-center'>
                <div className="bg-purple-50 rounded-full px-4 py-1 inline-flex items-center gap-2 mb-2">
                    <span className="text-purple-600 font-medium text-xs">
                        Thanks for taking the time!
                    </span>
                </div>

                <div className='w-full text-center'>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        We'd love to know
                    </h1>
                    <h1 className="text-3xl font-bold mb-4">
                        <span className="text-gray-900">a little about </span>
                        <span className="text-purple-600">you</span>
                    </h1>
                </div>

                <p className="text-gray-500 mb-8 text-sm text-center">
                    This helps us personalize your experience and<br />
                    better understand your feedback.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className='flex gap-6'>
                    <div className='w-1/2'>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={(e) =>
                                    setFormData({ ...formData, fullName: e.target.value })
                                }
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className='w-1/2'>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Age
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                placeholder="Enter your age"
                                value={formData.age}
                                onChange={(e) =>
                                    setFormData({ ...formData, age: e.target.value })
                                }
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <div className='flex gap-6'>
                    <div className='w-1/2'>
                        <label className="block text-gray-700 font-semibold mb-2">
                            State / Province
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your state or province"
                                value={formData.state}
                                onChange={(e) =>
                                    setFormData({ ...formData, state: e.target.value })
                                }
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className='w-1/2'>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Country
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <Select
                                options={countryOptions}
                                placeholder="Search or select your country"
                                value={countryOptions.find(
                                    (c) => c.value === formData.country
                                )}
                                onChange={(selected: any) =>
                                    setFormData({
                                        ...formData,
                                        country: selected?.value || "",
                                    })
                                }
                                className="text-sm"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        padding: "6px",
                                        borderRadius: "0.5rem",
                                        borderColor: "#e5e7eb",
                                        boxShadow: "none",
                                        "&:hover": { borderColor: "#3b82f6" },
                                    }),
                                }}
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                        Next
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PersonalInfo