"use client";

import {
  InputField,
  TextareaField,
  LinkField,
  LayoutPickerField,
  CardsPerViewField,
} from "./form-fields";

const layoutOptions = [
  { value: "Card Style", label: "Cards" },
  { value: "List Style", label: "List" },
  { value: "Masonry", label: "Masonry" },
];

type WallConfig = {
  heading: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
  instructions: string;
  layoutStyle: string;
  cardsPerView: number;
};

export default function CustomizerPanel({
  config,
  onChange,
}: {
  config: WallConfig;
  onChange: (config: WallConfig) => void;
}) {
  const set = (key: keyof WallConfig) => (val: any) =>
    onChange({ ...config, [key]: val });

  return (
    <div className="w-full">
      {/* Section header */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-gray-900 sm:text-lg">
          Customize Your Wall
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-gray-400 sm:text-sm">
          Personalize the content and appearance of your testimonial wall.
        </p>
      </div>

      {/* Content section */}
      <div className="mb-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </span>
          Content
        </h3>

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

        <div className="my-4 border-t border-dashed border-gray-100" />

        <InputField
          label="CTA Button Text"
          value={config.ctaText}
          onChange={set("ctaText")}
          maxLength={30}
          placeholder="See more success stories"
          hint="Leave blank to hide the button."
        />

        <LinkField
          label="CTA Button Link"
          value={config.ctaLink}
          onChange={set("ctaLink")}
          placeholder="https://yourwebsite.com/testimonials"
        />

        <div className="my-4 border-t border-dashed border-gray-100" />

        <TextareaField
          label="Testimonial Instructions"
          description="Describe the type of testimonials you want to display."
          value={config.instructions}
          onChange={set("instructions")}
          maxLength={200}
          placeholder="Show testimonials that highlight ease of use..."
        />
      </div>

      {/* Display settings section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="mb-1 flex items-center gap-2 text-sm font-bold text-gray-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </span>
          Display Settings
        </h3>

        <LayoutPickerField
          value={config.layoutStyle}
          onChange={set("layoutStyle")}
          options={layoutOptions}
        />

        <CardsPerViewField
          value={Number(config.cardsPerView)}
          onChange={set("cardsPerView")}
        />
      </div>
    </div>
  );
}