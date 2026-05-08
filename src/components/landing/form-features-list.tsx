import React from 'react';
import { Check } from 'lucide-react';

const features = [
  'Drag-and-drop form builder',
  'Smart logic and conditional fields',
  'Embed anywhere or share a link'
];

export default function FormFeaturesList() {
  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
            <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />
          </div>
          <span className="text-gray-700 font-medium">{feature}</span>
        </div>
      ))}
    </div>
  );
}