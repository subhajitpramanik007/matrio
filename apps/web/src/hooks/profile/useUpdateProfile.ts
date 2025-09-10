"use client";

import toast from "react-hot-toast";
import { profileService } from "@/services/profile.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProfileSchema } from "@matrio/shared/schemas/profile.schemas";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["profile", "update"],
    mutationFn: (values: any) => {
      const validate = UpdateProfileSchema.safeParse(values);

      if (!validate.success) {
        const errorMsg = validate.error.issues[0].message;
        toast.error(errorMsg);
        return Promise.reject(errorMsg);
      }
      return profileService.updateProfile(validate.data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  function onSaveProfile(values: any) {
    toast.promise(mutateAsync(values), {
      loading: "Updating profile...",
      success: "Profile updated successfully",
      error: "Error updating profile",
    });
  }

  return { onSaveProfile, isPending, isError };
};
