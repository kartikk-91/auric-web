import FormBuilderHeader from "@/components/form/feedback-header"
import FormBuilder from "@/components/form/form-builder"
import Sidebar from "@/components/shared/sidebar"

const FeedbackForm = () => {
  return (
    <div className="w-full flex">
      <div><Sidebar/></div>
      <div className="w-full">
        <FormBuilderHeader/>
        <FormBuilder/>
      </div>
    </div>
  )
}

export default FeedbackForm