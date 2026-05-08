
import React from 'react';
import FeedbackFormPreview from './feedback-preview';
import FormSidebar from './form-sidebar';
import FormFeaturesList from './form-features-list';
import { useRouter } from 'next/navigation';

export default function FeedbackFormSection() {
  const router=useRouter();
  return (
    <section className="py-16 bg-linear-to-br from-blue-50/30 via-purple-50/20 to-pink-50/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="relative flex gap-4">
            <FormSidebar />
            <FeedbackFormPreview />
          </div>


          <div className="space-y-8">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">
                Easy to get started
              </span>
            </div>


            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Create forms that get you better feedback
            </h2>


            <p className="text-xl text-gray-600 leading-relaxed">
              Build beautiful feedback forms in minutes. Customize questions, logic, and design to match your brand.
            </p>


            <FormFeaturesList />


            <div>
              <button onClick={()=>{router.push('/auth/login')}} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-105">
                Start Building for Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}