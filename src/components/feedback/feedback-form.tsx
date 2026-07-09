import FeedbackBackground from './feedback-background'
import FeedbackFooter from './feedback-footer'
import MainForm from './main-form'
import { prisma } from '@/lib/db'

const FeedbackForm = async ({
  formId,
}: {
  formId: string
}) => {
  const form = await prisma.feedbackForm.findFirst({
    where: {
      formId: formId,
      isActive: true,
    },
    include: {
      company: true,
    },
  })

  if (!form) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-200">
            <svg className="h-6 w-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-neutral-900">Form not found</h1>
          <p className="mt-2 text-sm text-neutral-500">
            This feedback form doesn&apos;t exist or is no longer accepting responses.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <FeedbackBackground />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-start px-4 py-8 md:justify-center md:py-10">
        <MainForm form={form} />

        <div className="mt-6 w-full flex justify-center">
          <FeedbackFooter />
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm