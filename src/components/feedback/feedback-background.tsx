import Image from 'next/image'
import React from 'react'

const FeedbackBackground = () => {
    return (
        <>
            <div>
                <Image
                    src={'/bg/feedback.png'}
                    alt='feedback-background'
                    fill
                />
            </div>

            <div className="absolute top-32 left-12">
                <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-purple-200 rounded-full"></div>
                    ))}
                </div>
            </div>


            <div className="absolute top-56 left-8">
                <div className="w-6 h-6 bg-pink-300 rounded transform rotate-45"></div>
            </div>


            <div className="absolute bottom-20 left-12">
                <svg viewBox="0 0 60 60" className="w-16 h-16 text-purple-300" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M30 10 Q40 30 30 50 Q20 30 30 10" strokeLinecap="round" />
                </svg>
            </div>

            <div className="absolute top-56 right-16">
                <div className="w-3 h-3 bg-purple-300 rounded-sm transform rotate-45"></div>
            </div>


            <div className="absolute bottom-32 right-16">
                <div className="w-4 h-4 bg-pink-300 rounded-full"></div>
            </div>

            <div className="absolute top-64 right-12">
                <div className="w-3 h-3 bg-green-300 rounded-full"></div>
            </div>

            <div className="absolute bottom-48 left-16">
                <div className="w-3 h-3 bg-purple-300 rounded-sm transform rotate-45"></div>
            </div>
        </>
    )
}

export default FeedbackBackground