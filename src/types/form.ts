export type FieldType =
  | "short-answer"
  | "rating"
  | "multiple-choice"
  | "checkboxes"
  | "dropdown"
  | "nps"
  | "email"
  | "phone"
  | "website"
  | "date";

export interface FormField {
  id: string;
  type: FieldType;
  question: string;
  required: boolean;

  helpText?: string;

  options?: string[];

  ratingScale?: 3 | 5 | 10;
  iconStyle?: "outline" | "filled";
  showLabels?: boolean;

  logicEnabled?: boolean;
  
  isSelected?: boolean;
}