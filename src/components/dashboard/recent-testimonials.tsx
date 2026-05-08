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
      quote:
        "Auric has completely transformed how we collect and showcase customer feedback. It's a game-changer.",
      author: 'Sarah Johnson',
      role: 'Head of Marketing',
      company: 'Acme Inc.',
      rating: 5,
      date: 'May 10, 2024',
    },
    {
      avatar: '/avatars/david.jpg',
      quote:
        'The AI insights help us understand our customers on a whole new level. Simple, powerful and easy to use.',
      author: 'David Lee',
      role: 'CEO',
      company: 'ClearKit',
      rating: 5,
      date: 'May 8, 2024',
    },
    {
      avatar: '/avatars/emma.jpg',
      quote:
        "We've saved so much time and our testimonials look better than ever. Highly recommend Auric!",
      author: 'Emma Davis',
      role: 'Customer Success',
      company: 'Liniar',
      rating: 5,
      date: 'May 6, 2024',
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <h3 className="text-sm font-semibold text-gray-900">
          Recent Testimonials
        </h3>

        <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 sm:text-sm">
          View all
        </button>
      </div>

      <div className="space-y-5 sm:space-y-6">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className="flex gap-3 sm:gap-4"
          >
            <div className="shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-400 to-purple-500 text-sm font-semibold text-white sm:h-12 sm:w-12 sm:text-base">
                {testimonial.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-3 text-sm leading-relaxed text-gray-700">
                "{testimonial.quote}"
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {testimonial.author}
                  </p>

                  <p className="text-xs leading-relaxed text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
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