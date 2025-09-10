"use client";

import { WelcomeSection } from "./WelcomeSection";
import { useProfile } from "@/hooks/profile/useProfile";

export default function DashboardWelcome() {
  const { data } = useProfile();

  const profile = data?.data.profile;

  return <WelcomeSection profileData={profile} />;
}
