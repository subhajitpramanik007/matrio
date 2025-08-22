"use client";

import {
  CTASection,
  FeaturesSection,
  GamePreview,
  HeroSection,
} from "@/components/landing";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function LandingPage() {
  return (
    <LoadingScreen duration={5_000}>
      <div>
        <HeroSection />
        <GamePreview />
        <FeaturesSection />
        <CTASection />
      </div>
    </LoadingScreen>
  );
}
