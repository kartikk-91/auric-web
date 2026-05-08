import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const benefits = [
  '14-day free trial',
  'No credit card required',
  'Cancel anytime',
];

export default function CTABanner() {
  const router=useRouter();
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-[1400px]">
        
        <div className="relative overflow-hidden rounded-[36px] border border-gray-200 bg-white px-8 py-10 shadow-xl shadow-blue-100/10 md:px-12 md:py-14">
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-purple-50/40 pointer-events-none" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            
            <div className="max-w-2xl">
              
              <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Start building with Auric
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Turn customer feedback into your strongest growth asset
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 ">
                Collect testimonials, analyze sentiment, and understand what users truly think, all in one clean workflow.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                
                <button onClick={()=>{router.push('/auth/signup')}} className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:bg-blue-700">
                  Start Free Trial

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button className="rounded-2xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50">
                  Book a Demo
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm lg:min-w-[260px]">
              
              <p className="text-sm font-semibold text-gray-900">
                Why teams choose Auric
              </p>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                      <Check
                        className="h-3.5 w-3.5 text-blue-600"
                        strokeWidth={3}
                      />
                    </div>

                    <span className="text-sm font-medium text-gray-700">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
                <p className="text-sm font-semibold">
                  Trusted by 2,000+ teams
                </p>

                <p className="mt-1 text-xs text-blue-100">
                  From startups to growing SaaS companies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}