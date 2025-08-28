"use client";

import { useSession } from "@/hooks/auth";
import * as React from "react";

export default function ProfilePage() {
  const session = useSession();
  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
