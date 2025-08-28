"use client";

import {
  CTASection,
  FeaturesSection,
  GamePreview,
  HeroSection,
} from "@/components/landing";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useSession } from "@/hooks/auth";

export default function LandingPage() {
  const { isPending } = useSession();

  return (
    <LoadingScreen duration={5_000} forceComplete={isPending}>
      <div>
        <HeroSection />
        <GamePreview />
        <FeaturesSection />
        <CTASection />
      </div>
    </LoadingScreen>
  );
}
