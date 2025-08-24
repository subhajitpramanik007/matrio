"use client";

import { ApiClient } from "@/services/api.service";
import { authService } from "@/services/auth.service";
import { useSearchParams } from "next/navigation";
import * as React from "react";

export default function EmailVerificationPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    function getValuesFromSearchParams() {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (token && email) {
        authService
          .verifyEmail({ email, token })
          .then((res) => {
            console.log(res);
            setIsSuccess(true);
          })
          .catch((error) => {
            setError(error?.message);
            console.error("Error verifying email");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }

    getValuesFromSearchParams();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isSuccess) return <div>Email verified successfully</div>;

  if (error) return <div>{error}</div>;

  return <div>Something went wrong</div>;
}
