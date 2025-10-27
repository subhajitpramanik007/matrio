import {
  CtaSection,
  FeaturesSection,
  GamePreview,
  HeroSection,
} from '@/components/landing'

export default function Home() {
  return (
    <>
      <HeroSection />
      <GamePreview />
      <FeaturesSection />
      <CtaSection />
    </>
  )
}
