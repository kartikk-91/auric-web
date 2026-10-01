
import React from 'react';
import FeedbackFormPreview from './feedback-preview';
import FormSidebar from './form-sidebar';
import FormFeaturesList from './form-features-list';
import { useRouter } from 'next/navigation';

export default function FeedbackFormSection() {
  const router=useRouter();
  return (
    <section id="workflow" className="border-y border-slate-200 bg-slate-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="relative flex gap-4">
            <FormSidebar />
            <FeedbackFormPreview />
          </div>


          <div className="space-y-8">

            <p className="text-xs font-semibold tracking-[0.16em] text-blue-600">FROM RESPONSE TO DECISION</p>


            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl leading-tight">
              Build a feedback system people actually want to use.
            </h2>


            <p className="text-lg text-slate-600 leading-8">
              Start with a polished form, keep every response in one place, and give your team a shared understanding of what to do next.
            </p>


            <FormFeaturesList />


            <div>
              <button onClick={()=>{router.push('/auth/signup')}} className="bg-slate-950 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-slate-900/15">
                Build your first form
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
