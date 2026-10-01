"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/shared/sidebar";
import FormBuilderHeader from "@/components/form/feedback-header";
import FormBuilder from "@/components/form/form-builder";
import { FormBuilderSkeleton } from "@/components/form/form-builder-skeleton";
import { useFormBuilder } from "@/hooks/useFormBuilder";

const boilerplateFields = [
  {
    id: "1",
    type: "short-answer",
    question: "What is your name?",
    required: true,
  },
  {
    id: "2",
    type: "email",
    question: "What is your email?",
    required: true,
  },
  {
    id: "3",
    type: "rating",
    question: "How would you rate your experience?",
    required: true,
    ratingScale: 5,
    iconStyle: "filled",
    showLabels: true,
  },
  {
    id: "4",
    type: "short-answer",
    question: "Tell us about your experience",
    required: false,
    helpText: "Your feedback helps us improve.",
  },
];

const FeedbackForm = () => {
  const form = useFormBuilder();

  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const [title, setTitle] = useState("Customer Feedback");
  const [tagline, setTagline] = useState(
    "We'd love to hear your thoughts! Your feedback helps us improve and serve you better."
  );

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch("/api/form/get");
        const data = await res.json();

        if (data?.form) {
          setTitle(data.form.title || "Customer Feedback");
          setTagline(data.form.tagLine || "");
          form.loadForm(data.form.schema?.fields || []);
        } else {
          form.loadForm(boilerplateFields as any);
        }
      } catch (error) {
        console.error("Error loading form:", error);
        form.loadForm(boilerplateFields as any);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, []);

  return (
    <div className="app-shell flex min-h-dvh w-full lg:h-dvh lg:overflow-hidden">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col mt-14 md:mt-0 lg:overflow-hidden">
        <FormBuilderHeader
          form={form}
          title={title}
          tagline={tagline}
          onPublishStart={() => setPublishing(true)}
          onPublishEnd={() => setPublishing(false)}
        />

        <div className="flex-1 lg:min-h-0 lg:overflow-hidden">
          {loading ? (
            <FormBuilderSkeleton />
          ) : (
            <FormBuilder
              form={form}
              title={title}
              setTitle={setTitle}
              tagline={tagline}
              setTagline={setTagline}
              disabled={publishing}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
