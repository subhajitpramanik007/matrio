"use client";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useRouter } from "next/navigation";

export default function LoadingPage() {
  const router = useRouter();

  const handleLoadingComplete = () => {
    router.push("/dashboard");
  };

  return <LoadingScreen onComplete={handleLoadingComplete} duration={2000} />;
}
