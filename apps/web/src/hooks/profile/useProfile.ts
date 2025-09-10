"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";

export function useProfile() {
  return useSuspenseQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getMyProfile(),
  });
}
