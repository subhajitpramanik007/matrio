"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";
import { useSession } from "@/hooks/auth";

export function useProfile() {
  const { user } = useSession();

  return useSuspenseQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getMyProfile(),
  });
}
