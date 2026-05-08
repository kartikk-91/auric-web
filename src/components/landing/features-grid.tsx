
import React from 'react';
import { MessageSquare, BarChart3, Star, Send } from 'lucide-react';
import FeatureCard from './feature-card';

const features = [
  {
    icon: MessageSquare,
    title: 'Collect Feedback',
    description: 'Gather feedback from surveys, forms, reviews, and more — all in one place.',
    iconColor: 'text-blue-600',
    iconBgColor: 'bg-blue-50'
  },
  {
    icon: BarChart3,
    title: 'AI-Powered Insights',
    description: 'Uncover key themes and sentiment with AI analysis that helps you act faster.',
    iconColor: 'text-purple-600',
    iconBgColor: 'bg-purple-50'
  },
  {
    icon: Star,
    title: 'Create Testimonials',
    description: 'Transform feedback into beautiful, on-brand testimonials in seconds.',
    iconColor: 'text-yellow-500',
    iconBgColor: 'bg-yellow-50'
  },
  {
    icon: Send,
    title: 'Share Everywhere',
    description: 'Embed, publish, and share testimonials across your website and marketing channels.',
    iconColor: 'text-blue-500',
    iconBgColor: 'bg-blue-50'
  }
];

export default function FeaturesGrid() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">
              Everything you need
            </span>
          </div>
        </div>


        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
          Collect. Analyze. Showcase. All in one place.
        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}