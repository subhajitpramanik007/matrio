"use client";

import { profileService } from "@/services/profile.service";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGameActivities = () => {
  return useSuspenseQuery({
    queryKey: ["gameActivities"],
    queryFn: () => profileService.getGameActivities(),
  });
};
