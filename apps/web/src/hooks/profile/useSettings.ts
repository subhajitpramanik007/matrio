"use client";

import { profileService } from "@/services/profile.service";
import { TUpdateSettings } from "@matrio/shared/schemas/profile.schemas";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSettings = () => {
  return useSuspenseQuery({
    queryKey: ["settings"],
    queryFn: () => profileService.getSettings(),
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TUpdateSettings) =>
      profileService.updateSettings(values),
    onSuccess: () => {
      toast.success("Settings updated successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
