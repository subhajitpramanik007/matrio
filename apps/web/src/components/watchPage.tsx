"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function WatchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.has("error")) {
      const error = searchParams.get("error");
      if (error === "EMAIL_NOT_VERIFIED") {
        router.push("/auth/email-verification");
      }
    }
  }, [searchParams, router]);

  return <></>;
}
