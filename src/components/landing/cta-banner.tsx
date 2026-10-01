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
    <section id="start" className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px]">
        
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 px-8 py-10 shadow-xl shadow-slate-900/15 md:px-12 md:py-14">
          
          <div className="absolute inset-0 bg-[#0b1830] pointer-events-none" />
          <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full border border-blue-400/20 shadow-[0_0_100px_rgba(37,99,235,0.3)] pointer-events-none" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            
            <div className="max-w-2xl">
              
              <div className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">
                Start building with Auric
              </div>

              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                Turn customer feedback into your strongest growth asset
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 ">
                Collect testimonials, analyze sentiment, and understand what users truly think, all in one clean workflow.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                
                <button onClick={()=>{router.push('/auth/signup')}} className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg transition-all duration-300 hover:bg-slate-100">
                  Start Free Trial

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button className="rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10">
                  Book a Demo
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/8 p-6 backdrop-blur-sm lg:min-w-[260px]">
              
              <p className="text-sm font-semibold text-white">
                Why teams choose Auric
              </p>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                      <Check
                      className="h-3.5 w-3.5 text-blue-200"
                        strokeWidth={3}
                      />
                    </div>

                    <span className="text-sm font-medium text-slate-200">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-2 rounded-xl border border-blue-400/20 bg-blue-500/15 p-4 text-white">
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
