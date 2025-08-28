"use client";

import * as React from "react";
import { useSession } from "@/hooks/auth";

const DashboardPage: React.FC = () => {
  const { user } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default DashboardPage;
