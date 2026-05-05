import Image from 'next/image';
import { Star } from 'lucide-react';

interface Testimonial {
  avatar: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  date: string;
}

export default function RecentTestimonials() {
  const testimonials: Testimonial[] = [
    {
      avatar: '/avatars/sarah.jpg',
      quote: 'Auric has completely transformed how we collect and showcase customer feedback. It\'s a game-changer.',
      author: 'Sarah Johnson',
      role: 'Head of Marketing',
      company: 'Acme Inc.',
      rating: 5,
      date: 'May 10, 2024',
    },
    {
      avatar: '/avatars/david.jpg',
      quote: 'The AI insights help us understand our customers on a whole new level. Simple, powerful and easy to use.',
      author: 'David Lee',
      role: 'CEO',
      company: 'ClearKit',
      rating: 5,
      date: 'May 8, 2024',
    },
    {
      avatar: '/avatars/emma.jpg',
      quote: 'We\'ve saved so much time and our testimonials look better than ever. Highly recommend Auric!',
      author: 'Emma Davis',
      role: 'Customer Success',
      company: 'Liniar',
      rating: 5,
      date: 'May 6, 2024',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-gray-900">Recent Testimonials</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all
        </button>
      </div>

      <div className="space-y-6">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="flex gap-4">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {testimonial.author.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {testimonial.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}