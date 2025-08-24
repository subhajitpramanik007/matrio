"use client";

import { AuthWrapper, SignupCard } from "@/components/auth";

export default function SignUpPage() {
  return (
    <AuthWrapper
      header={{
        title: "Create your account",
        description: "Join Matrio and start playing classic games today",
      }}
      showPlayAsGuestOption
      showFooter
      footer={{
        asChildren: false,
        text: "Already have an account?",
        linkText: "Sign in",
        linkHref: "/auth/signin",
      }}
    >
      <SignupCard />
    </AuthWrapper>
  );
}
