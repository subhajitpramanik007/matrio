import { profileService } from "@/services/profile.service";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useAchievements() {
  return useSuspenseQuery({
    queryKey: ["achievements"],
    queryFn: () => profileService.getAchievements(),
  });
}
