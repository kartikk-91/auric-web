import FeedbackForm from '@/components/feedback/feedback-form'

const Feedback = async ({
  params,
}: {
  params: Promise<{ formId: string }>
}) => {
  const { formId } = await params
  return (
    <div className='h-screen w-screen'>
      <FeedbackForm formId={formId} />
    </div>
  )
}

export default Feedback