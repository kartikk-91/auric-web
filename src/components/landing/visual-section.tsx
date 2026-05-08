import {
  Star,
  MessageSquare,
  TrendingUp,
  Lightbulb,
  BarChart3,
} from 'lucide-react';

import FeatureCard from './card';
import Image from 'next/image';

export default function VisualSection() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-linear-to-br from-blue-100/40 via-purple-100/30 to-pink-100/20 rounded-3xl blur-3xl"></div>

      <Image
        src="/bg/dots.png"
        alt="auric"
        width={100}
        height={100}
        className="object-contain rotate-90 absolute top-12 left-8 -z-10"
      /> 
      <Image
        src="/bg/dots.png"
        alt="auric"
        width={100}
        height={100}
        className="object-contain rotate-90 absolute bottom-16 right-8 -z-10"
      />       
      <div className="relative w-full h-full rounded-3xl bg-transparent">
        <Image
          src="/elements/hero-banner.png"
          alt="auric"
          fill
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}