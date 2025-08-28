"use client";

import { getUser } from "@/lib/getUser";
import { IUser } from "@/types/user.type";
import { useEffect, useState } from "react";

export function useGetUser() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUser()
      .then((user) => setUser(user as any))
      .catch(() => setUser(null));
  }, []);

  return user;
}
