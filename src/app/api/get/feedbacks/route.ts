import { NextResponse } from 'next/server';

export async function GET() {
  const feedbacks = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      age: 28,
      sentiment: 'Positive',
      received: '2h ago',
      receivedFull: 'May 12, 2024 at 2:34 PM',
      feedback:
        'The platform is really intuitive and easy to use. I especially liked the onboarding experience and smooth navigation across different sections.',
      additionalInfo: {
        source: 'Website',
        formName: 'Customer Satisfaction',
        device: 'MacBook Pro',
        browser: 'Chrome',
        ipAddress: '192.168.1.21',
      },
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      age: 34,
      sentiment: 'Neutral',
      received: '5h ago',
      receivedFull: 'May 12, 2024 at 11:15 AM',
      feedback:
        'The experience was okay overall. Some parts felt slow, and a few settings were hard to find.',
      additionalInfo: {
        source: 'Mobile App',
        formName: 'Feature Feedback',
        device: 'iPhone 15',
        browser: 'Safari',
        ipAddress: '172.16.10.45',
      },
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'Madrid, Spain',
      age: 25,
      sentiment: 'Positive',
      received: '1d ago',
      receivedFull: 'May 11, 2024 at 4:20 PM',
      feedback:
        'Loved the UI design and responsiveness. It feels modern and polished.',
      additionalInfo: {
        source: 'Website',
        formName: 'UX Survey',
        device: 'Windows Laptop',
        browser: 'Edge',
        ipAddress: '203.14.88.21',
      },
    },
    {
      id: 4,
      name: 'David Wilson',
      location: 'London, UK',
      age: 41,
      sentiment: 'Negative',
      received: '1d ago',
      receivedFull: 'Apr 11, 2024 at 10:48 AM',
      feedback:
        'I experienced multiple loading issues and some pages froze unexpectedly.',
      additionalInfo: {
        source: 'Support Form',
        formName: 'Bug Report',
        device: 'Dell XPS',
        browser: 'Firefox',
        ipAddress: '84.112.90.17',
      },
    },
    {
      id: 5,
      name: 'Ava Martinez',
      location: 'Sydney, Australia',
      age: 30,
      sentiment: 'Positive',
      received: '2d ago',
      receivedFull: 'May 10, 2024 at 8:22 PM',
      feedback:
        'Customer support was fantastic. Got my issue resolved very quickly.',
      additionalInfo: {
        source: 'Support Chat',
        formName: 'Support Review',
        device: 'Android Phone',
        browser: 'Chrome Mobile',
        ipAddress: '110.44.21.98',
      },
    },
    {
      id: 6,
      name: 'James Anderson',
      location: 'Berlin, Germany',
      age: 37,
      sentiment: 'Neutral',
      received: '2d ago',
      receivedFull: 'May 10, 2024 at 1:10 PM',
      feedback:
        'Good overall experience but performance can improve on slower networks.',
      additionalInfo: {
        source: 'Website',
        formName: 'General Feedback',
        device: 'Lenovo ThinkPad',
        browser: 'Chrome',
        ipAddress: '91.77.23.54',
      },
    },
    {
      id: 7,
      name: 'Sophia Brown',
      location: 'Paris, France',
      age: 26,
      sentiment: 'Positive',
      received: '3d ago',
      receivedFull: 'May 9, 2024 at 6:00 PM',
      feedback:
        'Very smooth experience and the dashboard analytics are incredibly useful.',
      additionalInfo: {
        source: 'Dashboard',
        formName: 'Product Review',
        device: 'MacBook Air',
        browser: 'Safari',
        ipAddress: '88.54.120.11',
      },
    },
    {
      id: 8,
      name: 'Daniel Kim',
      location: 'Seoul, South Korea',
      age: 32,
      sentiment: 'Negative',
      received: '4d ago',
      receivedFull: 'May 8, 2024 at 9:40 AM',
      feedback:
        'There were too many steps to complete a simple action. The UX could be simplified.',
      additionalInfo: {
        source: 'Mobile App',
        formName: 'Feature Complaint',
        device: 'Samsung Galaxy S24',
        browser: 'Samsung Internet',
        ipAddress: '121.90.33.14',
      },
    },
  ];

  return NextResponse.json(feedbacks);
}