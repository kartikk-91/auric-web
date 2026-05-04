import FeedbackBackground from './feedback-background'
import FeedbackFooter from './feedback-footer'
import MainForm from './main-form'
import { prisma } from '@/lib/db'

const FeedbackForm = async ({formId}:{formId:string}) => {

  const form = await prisma.feedbackForm.findFirst({
    where: {
      formId: formId,
      isActive: true,
    },
  })

  if (!form) {
    return <div>Form not found</div>
  }

  return (
    <div className="min-h-screen h-screen w-full bg-linear-to-br from-pink-50 via-white to-purple-50 flex flex-col items-center justify-center gap-5 p-4 relative overflow-hidden">

      <FeedbackBackground />

      <MainForm form={form} />

      <FeedbackFooter />

    </div>
  )
}

export default FeedbackForm