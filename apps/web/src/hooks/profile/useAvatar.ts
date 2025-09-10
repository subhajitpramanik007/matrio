"use client";

import React from "react";
import toast from "react-hot-toast";

import { avatarService } from "@/services/avatar.service";
import { profileService } from "@/services/profile.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAvatars(enabled: boolean) {
  return useQuery({
    queryKey: ["avatars"],
    queryFn: () => avatarService.getAvatars(),
    select: (data) => data.data.avatars,
    enabled,
  });
}

export function useUpdateAvatar() {
  const [openAvatarSheet, setOpenAvatarSheet] = React.useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (avatarId: number) => profileService.updateAvatar(avatarId),
    onSuccess: () => {
      toast.success("Avatar updated successfully");

      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Failed updating avatar");
    },
    onSettled: () => {
      setOpenAvatarSheet(false);
    },
  });

  return {
    updateAvatar: mutate,
    isPending,
    openAvatarSheet,
    setOpenAvatarSheet,
  };
}
