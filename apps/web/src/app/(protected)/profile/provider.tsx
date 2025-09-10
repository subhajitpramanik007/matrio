"use client";

import { useProfileQueries } from "@/hooks/profile/useProfileQueries";

export default function ProfileProvider() {
  const data = useProfileQueries();

  const isPending = data.some(({ isLoading }) => isLoading);
  return (
    <div>
      Profile
      {isPending && <p>Loading...</p>}
    </div>
  );
}
