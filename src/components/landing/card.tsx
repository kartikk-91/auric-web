import { ReactNode } from 'react';

interface FeatureCardProps {
  children: ReactNode;
  className?: string;
}

export default function FeatureCard({
  children,
  className = '',
}: FeatureCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
}