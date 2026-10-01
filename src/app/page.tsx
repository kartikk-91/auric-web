"use client";

import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";
import VisualSection from "@/components/landing/visual-section";
import FeaturesGrid from "@/components/landing/features-grid";
import FeedbackFormSection from "@/components/landing/feedback-form-section";
import CTABanner from "@/components/landing/cta-banner";
import Footer from "@/components/landing/footer";

export default function AuricLandingPage() {
  return <div className="min-h-screen overflow-x-hidden bg-[#f7f9fc] text-slate-950">
    <Header />
    <main>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#fbfdff]">
        <div className="auric-signal-field pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-40 top-12 h-[520px] w-[520px] rounded-full border border-blue-200/80" />
        <div className="pointer-events-none absolute -right-14 top-36 h-[360px] w-[360px] rounded-full border border-blue-100" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-14">
          <HeroSection />
          <VisualSection />
        </div>
      </section>
      <FeaturesGrid />
      <FeedbackFormSection />
      <CTABanner />
    </main>
    <Footer />
  </div>;
}
