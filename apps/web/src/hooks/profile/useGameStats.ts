"use client";

import { profileService } from "@/services/profile.service";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGameStats = () => {
  return useSuspenseQuery({
    queryKey: ["gameStats"],
    queryFn: () => profileService.getStats(),
  });
};
