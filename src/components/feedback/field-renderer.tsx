// components/form/FieldRenderer.tsx

import { FormField } from "@/types/form";
import RatingField from "./fields/rating-field";
import NPSField from "./fields/nps-field";
import CheckboxesField from "./fields/checkboxes-field";
import DropdownField from "./fields/dropdown-field";
import EmailField from "./fields/email-field";
import PhoneField from "./fields/phone-field";
import WebsiteField from "./fields/website-field";
import DateField from "./fields/date-field";
import ShortAnswerField from "./fields/shortanswer-field";
import MultipleChoiceField from "./fields/multiple-choice-field";



interface FieldRendererProps {
  field: FormField;
  value: any;
  onChange: (val: any) => void;
}

export function FieldRenderer({
  field,
  value,
  onChange,
}: FieldRendererProps) {
  switch (field.type) {
    case "rating":
      return (
        <RatingField
          value={value}
          onChange={onChange}
        />
      );

    case "nps":
      return (
        <NPSField
          value={value}
          onChange={onChange}
        />
      );

    case "multiple-choice":
      return (
        <MultipleChoiceField
          options={field.options || []}
          value={value}
          onChange={onChange}
        />
      );

    case "checkboxes":
      return (
        <CheckboxesField
          options={field.options || []}
          value={value || []}
          onChange={onChange}
        />
      );

    case "dropdown":
      return (
        <DropdownField
          options={field.options || []}
          value={value}
          onChange={onChange}
          placeholder={"Select an option"}
        />
      );

    case "email":
      return (
        <EmailField
          value={value}
          onChange={onChange}
          placeholder={"e.g. name@example.com"}
        />
      );

    case "phone":
      return (
        <PhoneField
          value={value}
          onChange={onChange}
          placeholder={"e.g. +91 98765 43210"}
        />
      );

    case "website":
      return (
        <WebsiteField
          value={value}
          onChange={onChange}
          placeholder={"https://yourwebsite.com"}
        />
      );

    case "date": return (<DateField value={value} onChange={onChange} />);

    case "short-answer":
    default:
      return (
        <ShortAnswerField
          value={value}
          onChange={onChange}
          placeholder={"Type your answer here..."}
        />
      );
  }
}