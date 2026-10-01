
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
    title: 'See the pattern',
    description: 'Surface the themes and sentiment shifts that matter before they become a bigger problem.',
    iconColor: 'text-indigo-600',
    iconBgColor: 'bg-indigo-50'
  },
  {
    icon: Star,
    title: 'Share the proof',
    description: 'Turn the strongest customer moments into polished proof your team can use anywhere.',
    iconColor: 'text-sky-600',
    iconBgColor: 'bg-sky-50'
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
    <section id="capabilities" className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6">

        <p className="text-center text-xs font-semibold tracking-[0.16em] text-blue-600">CAPABILITIES</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-center text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">A complete feedback loop, without the busywork.</h2>
        <p className="mx-auto mt-4 max-w-xl text-center leading-7 text-slate-600">Collect the signal, understand the pattern, and share what deserves to be heard.</p>


        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
