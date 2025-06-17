"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isMockAuthenticated = localStorage.getItem("mock-authenticated") === "true";
    if (!isMockAuthenticated) {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
