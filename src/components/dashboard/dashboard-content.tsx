import { MessageSquare, Star, Users, TrendingUp } from 'lucide-react';
import StatCard from './stat-card';
import FeedbackInsights from './feedback-insights';
import RecentTestimonials from './recent-testimonials';
import RatingDistribution from './rating-distribution';
import SentimentChart from './sentiment-chart';
import ResponsesByLocation from './response-location';

export default function DashboardContent() {
  return (
    <div className="min-h-screen h-fit md:h-screen bg-gray-50 p-6 md:overflow-y-scroll">
      <div className="max-w-7xl h-fit mx-auto space-y-6 ">
     
        <div className="h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Testimonials"
            value="128"
            change="+12% vs Apr 12 - May 11"
            icon={<MessageSquare className="w-5 h-5 text-blue-500" />}
            iconBgColor="bg-blue-50"
          />
          <StatCard
            title="Avg. Rating"
            value="4.8"
            change="+0.3 vs Apr 12 - May 11"
            icon={<Star className="w-5 h-5 text-yellow-500" />}
            iconBgColor="bg-yellow-50"
          />
          <StatCard
            title="Sources"
            value="23"
            change="+4 vs Apr 12 - May 11"
            icon={<Users className="w-5 h-5 text-purple-500" />}
            iconBgColor="bg-purple-50"
          />
          <StatCard
            title="AI Analyses"
            value="342"
            change="+18% vs Apr 12 - May 11"
            icon={<TrendingUp className="w-5 h-5 text-green-500" />}
            iconBgColor="bg-green-50"
          />
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-fit">
          <RatingDistribution />
          <FeedbackInsights />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTestimonials />
          <SentimentChart />
        </div>
        <div className="grid grid-cols-1 gap-6">
          <ResponsesByLocation/>
        </div>
        <div className='h-24 w-full'>

        </div>
      </div>
    </div>
  );
}