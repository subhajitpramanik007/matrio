"use client";

import { profileService } from "@/services/profile.service";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useSettings = () => {
  return useSuspenseQuery({
    queryKey: ["settings"],
    queryFn: () => profileService.getSettings(),
  });
};
