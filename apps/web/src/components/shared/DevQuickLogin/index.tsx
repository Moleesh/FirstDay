/**
 * @module DevQuickLogin
 * @description Development-only quick login helper.
 * @author auto
 * @since 1.0.0
 */
"use client";

import { useRouter } from "next/navigation";
import { useSessionStore } from "@/stores/sessionStore";

const DEMO_TOKEN = "demo-session-token";

export function DevQuickLogin(): JSX.Element | null {
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  function login(): void {
    setSession("recruiter", DEMO_TOKEN);
    router.push("/dashboard");
  }

  return (
    <button
      className="rounded-md border border-dashed px-3 py-2 text-sm"
      onClick={login}
      type="button"
    >
      Dev quick login
    </button>
  );
}
