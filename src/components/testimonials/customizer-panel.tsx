"use client";

import { InputField, TextareaField, LinkField, SelectField } from "./form-fields";

const layoutOptions: any[] = [
  { value: "Card Style", label: "Card Style" },
  { value: "List Style", label: "List Style" },
  { value: "Masonry", label: "Masonry" },
];

const cardsPerViewOptions: any[] = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

export default function CustomizerPanel({ config, onChange }: any) {
  const set = (key: string) => (val: any) => onChange({ ...config, [key]: val });

  return (
    <div className="w-full max-w-md shrink-0 overflow-y-auto pr-1">
     
      <div className="mb-5">
        <h2 className="text-base font-bold text-gray-900">
          Customize Your Wall
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Personalize the content and appearance of your testimonial wall.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
        <InputField
          label="Heading"
          value={config.heading}
          onChange={set("heading")}
          maxLength={60}
          placeholder="What our customers say"
        />
        <InputField
          label="Tagline"
          value={config.tagline}
          onChange={set("tagline")}
          maxLength={100}
          placeholder="Real feedback from real people who love our product."
        />
        <InputField
          label="CTA Button Text"
          value={config.ctaText}
          onChange={set("ctaText")}
          maxLength={30}
          placeholder="See more success stories"
        />
        <LinkField
          label="CTA Button Link"
          value={config.ctaLink}
          onChange={set("ctaLink")}
          placeholder="https://yourwebsite.com/testimonials"
        />
        <TextareaField
          label="Testimonial Instructions"
          description="Describe the type of testimonials you want to display."
          value={config.instructions}
          onChange={set("instructions")}
          maxLength={200}
          placeholder="Show testimonials that highlight ease of use..."
        />
      </div>

   
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3">
          Display Settings
        </h3>
        <SelectField
          label="Layout Style"
          description="Choose how testimonials are displayed."
          value={config.layoutStyle}
          onChange={set("layoutStyle")}
          options={layoutOptions}
          icon="grid"
        />
        <SelectField
          label="Cards Per View"
          description="Number of testimonial cards to show at once."
          value={String(config.cardsPerView)}
          onChange={(v: any) => set("cardsPerView")(Number(v))}
          options={cardsPerViewOptions}
          icon="cards"
        />
      </div>
    </div>
  );
}