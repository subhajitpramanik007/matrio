"use client";

import { profileService } from "@/services/profile.service";
import { useQueries } from "@tanstack/react-query";

export const useProfileQueries = () =>
  useQueries({
    queries: [
      {
        queryKey: ["profile"],
        queryFn: () => profileService.getMyProfile(),
      },
      {
        queryKey: ["stats"],
        queryFn: () => profileService.getStats(),
      },
      {
        queryKey: ["achievements"],
        queryFn: () => profileService.getAchievements(),
      },
      {
        queryKey: ["settings"],
        queryFn: () => profileService.getSettings(),
      },
      {
        queryKey: ["gameActivities"],
        queryFn: () => profileService.getGameActivities(),
      },
    ],
    subscribed: true,
  });
