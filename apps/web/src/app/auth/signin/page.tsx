"use client";

import { AuthWrapper, SigninCard } from "@/components/auth";

export default function SignInPage() {
  return (
    <AuthWrapper
      header={{
        title: "Welcome back",
        description: "Sign in to your account to continue playing",
      }}
      showFooter
      footer={{
        asChildren: false,
        text: "Don't have an account?",
        linkText: "Sign up",
        linkHref: "/auth/signup",
      }}
      showPlayAsGuestOption
    >
      <SigninCard />
    </AuthWrapper>
  );
}
