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
        src={'/elements/hero-banner.png'}
        alt='auric'
        width={400}
        height={400}
        className='w-full h-full'
      />
    </div>
  );
}