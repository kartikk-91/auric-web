import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router=useRouter();
  return (
    <div className="space-y-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>

        <span className="text-sm font-medium text-blue-700">
          AI-Powered Feedback & Testimonials
        </span>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Turn feedback into{' '}
          <span className="text-blue-600">
            powerful testimonials
          </span>{' '}
          and actionable insights
        </h1>
      </div>

      <p className="text-lg text-gray-600 leading-relaxed">
        Auric helps you collect, analyze, and showcase customer feedback
        that builds trust and drives growth.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button onClick={()=>{router.push('/auth/signup')}} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-600/20">
          Sign up
        </button>

        <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold transition-colors border-2 border-gray-200">
          Book a Demo
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <FeatureItem>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>

          No credit card required
        </FeatureItem>

        <FeatureItem>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          14-day free trial
        </FeatureItem>

        <FeatureItem>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          Cancel anytime
        </FeatureItem>
      </div>
    </div>
  );
}

function FeatureItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-gray-600">
      {children}
    </div>
  );
}