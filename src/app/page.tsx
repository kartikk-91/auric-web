'use client';

import CTABanner from "@/components/landing/cta-banner";
import FeaturesGrid from "@/components/landing/features-grid";
import FeedbackFormSection from "@/components/landing/feedback-form-section";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";
import VisualSection from "@/components/landing/visual-section";


export default function AuricLandingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <HeroSection />
          <VisualSection />
        </div>
        <FeaturesGrid />
        <FeedbackFormSection />
        <CTABanner />
        <Footer />
      </main>
    </div>
  );
}