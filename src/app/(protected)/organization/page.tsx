'use client';

import Image from "next/image";

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

            <header className="flex items-center justify-between px-6 pt-4 lg:px-12">
                <div className="flex items-center gap-2">
                    <div>
                        <Image
                            src={'/logo.png'}
                            width={100}
                            height={100}
                            alt={'Auric'}
                        />
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-8 px-6 py-4 lg:px-12 lg:py-8 max-w-7xl mx-auto">
                <div className="lg:w-80 space-y-8">
                    <div>
                        <p className="text-xs uppercase font-semibold text-blue-600 tracking-wider mb-2">
                            welcome to auric
                        </p>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                            Let's set up your organization 👋
                        </h1>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            This information helps us personalize your experience and organize your feedback beautifully.
                        </p>
                    </div>


                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold">1</span>
                            </div>
                            <div className="pt-1">
                                <p className="text-sm font-semibold text-gray-900">Organization Details</p>
                                <p className="text-sm text-gray-500">Tell us about your organization</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <span className="text-gray-600 font-semibold">2</span>
                            </div>
                            <div className="pt-1">
                                <p className="text-sm font-semibold text-gray-400">Your First Feedback Form</p>
                                <p className="text-sm text-gray-400">Create your first form</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <span className="text-gray-600 font-semibold">3</span>
                            </div>
                            <div className="pt-1">
                                <p className="text-sm font-semibold text-gray-400">Invite Your Team</p>
                                <p className="text-sm text-gray-400">Add members to get started</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative md:mt-16">
                        <div>
                            <Image
                                src={"/bg/dots.png"}
                                alt="dots"
                                height={150}
                                width={150}
                                className="w-[80px] h-[80px] rotate-90"
                            />
                        </div>
                        <div className="absolute top-0 left-0">
                            <Image
                                src={"/bg/cloud.png"}
                                alt="dots"
                                height={250}
                                width={250}
                                className="w-full h-fit"
                            />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 z-5">
                            <Image
                                src={"/bg/file-float.png"}
                                alt="dots"
                                height={150}
                                width={150}
                                className="w-[280px] h-fit"
                            />
                        </div>
                    </div>
                </div>


                <div className="flex-1 relative z-10">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Tell us about your organization
                        </h2>
                        <p className="text-gray-600 text-sm mb-8">
                            Fill in the details below to get started.
                        </p>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        Company Name
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter your company name"
                                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        Logo
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </label>

                                    <div className="border border-dashed border-gray-300 rounded-md px-3 py-2 text-center hover:border-blue-400 transition-colors cursor-pointer">
                                        <div className="flex items-center justify-center gap-2">
                                            <svg
                                                className="w-4 h-4 text-blue-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>

                                            <span className="text-xs font-medium text-gray-900">
                                                Upload logo
                                            </span>
                                        </div>

                                        <p className="text-[10px] text-gray-500 mt-0.5">
                                            JPG, PNG, SVG
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        Mobile Number
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <input
                                                type="tel"
                                                placeholder="Enter mobile number"
                                                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                                            <option>+1</option>
                                            <option>+91</option>
                                            <option>+44</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        Website Link
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                        <input
                                            type="url"
                                            placeholder="https://yourwebsite.com"
                                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    Address
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-3.5">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter your company address"
                                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                    Description
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-3.5">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <textarea
                                        placeholder="Tell us a little about your organization..."
                                        rows={4}
                                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    ></textarea>
                                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                        0 / 500
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 ">
                                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                    Submit
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}