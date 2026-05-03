"use client";
import FormBuilderHeader from "@/components/form/feedback-header"
import FormBuilder from "@/components/form/form-builder"
import Sidebar from "@/components/shared/sidebar"
import { useFormBuilder } from "@/hooks/useFormBuilder";
import { useState } from "react";

const FeedbackForm = () => {
  const form = useFormBuilder();
  const [title, setTitle] = useState("Customer Feedback");
  const [tagline, setTagline] = useState(
    "We'd love to hear your thoughts! Your feedback helps us improve and serve you better."
  );

  return (
    <div className="w-full h-screen flex overflow-y-hidden">
      <div><Sidebar/></div>
      <div className="w-full">
        <FormBuilderHeader form={form} title={title} tagline={tagline} />
        <FormBuilder 
          form={form} 
          title={title}
          setTitle={setTitle}
          tagline={tagline}
          setTagline={setTagline}
        />
      </div>
    </div>
  )
}

export default FeedbackForm