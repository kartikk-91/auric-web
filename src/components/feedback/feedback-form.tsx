import FeedbackBackground from './feedback-background'
import FeedbackFooter from './feedback-footer'
import MainForm from './main-form'
import { prisma } from '@/lib/db'

const FeedbackForm = async ({
  formId,
}: {
  formId: string
}) => {
  const form =
    await prisma.feedbackForm.findFirst(
      {
        where: {
          formId: formId,
          isActive: true,
        },
      }
    )

  if (!form) {
    return (
      <div>
        Form not found
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-linear-to-br from-pink-50 via-white to-purple-50">

      <FeedbackBackground />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start px-4 py-8 md:justify-center md:py-6">

        <MainForm form={form} />

        <div className="mt-5 w-full flex justify-center">
          <FeedbackFooter />
        </div>

      </div>
    </div>
  )
}

export default FeedbackForm