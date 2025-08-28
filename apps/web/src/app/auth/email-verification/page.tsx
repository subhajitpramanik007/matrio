"use client";

import * as React from "react";
import { AuthWrapper, EmailVerificationCard } from "@/components/auth";

export default function EmailVerificationPage() {
  return (
    <AuthWrapper
      header={{
        title: "Email verification",
        description: "Verify your email to continue playing",
      }}
      showFooter={false}
    >
      <EmailVerificationCard />
    </AuthWrapper>
  );
}
