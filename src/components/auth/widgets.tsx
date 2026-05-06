import React from 'react'

function FloatingWidget({ className, children }: any) {
  return (
    <div className={`absolute hidden xl:flex bg-white rounded-2xl shadow-[0_8px_32px_rgba(99,102,241,0.12)] border border-indigo-50 p-3 items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

const Widgets = () => {
  return (
    <>
        <FloatingWidget className="left-[5%] top-[10%] w-52 h-28">
          <div className="w-full">
            <div className="flex items-end gap-1 h-14">
              {[30, 45, 35, 55, 42, 62, 50, 70].map((h, i) => (
                <div key={i} className="flex-1 rounded-t bg-indigo-200" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="mt-2 h-1 w-full bg-indigo-100 rounded-full">
              <div className="h-1 w-3/4 bg-indigo-400 rounded-full" />
            </div>
          </div>
        </FloatingWidget>
        <FloatingWidget className="left-[8%] top-[36%] w-14 h-14">
          <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </FloatingWidget>
        <FloatingWidget className="left-[4%] bottom-[22%] w-14 h-14">
          <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </FloatingWidget>
        <FloatingWidget className="left-[3%] bottom-[5%] w-52 h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="h-1.5 w-20 bg-indigo-100 rounded mt-1" />
            </div>
          </div>
        </FloatingWidget>
        <FloatingWidget className="right-[5%] top-[8%] w-36 h-32 flex-col gap-2">
          <svg viewBox="0 0 80 80" className="w-16 h-16">
            <circle cx="40" cy="40" r="28" fill="none" stroke="#e0e7ff" strokeWidth="12" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="#FBBF24" strokeWidth="12" strokeDasharray="50 126" strokeDashoffset="-10" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="#60A5FA" strokeWidth="12" strokeDasharray="35 141" strokeDashoffset="-60" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="#34D399" strokeWidth="12" strokeDasharray="25 151" strokeDashoffset="-95" />
            <circle cx="40" cy="40" r="28" fill="none" stroke="#A78BFA" strokeWidth="12" strokeDasharray="16 160" strokeDashoffset="-120" />
          </svg>
        </FloatingWidget>
        <FloatingWidget className="right-[7%] top-[40%] w-14 h-14">
          <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </FloatingWidget>
        <FloatingWidget className="right-[3%] bottom-[22%] w-44 h-24 flex-col gap-2">
          {[
            { color: "bg-blue-400" },
            { color: "bg-purple-400" },
            { color: "bg-green-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <div className="h-2 bg-slate-100 rounded flex-1" />
            </div>
          ))}
        </FloatingWidget>
        <FloatingWidget className="right-[6%] bottom-[5%] w-14 h-14">
          <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </FloatingWidget>
    </>
  )
}

export default Widgets