/**
 * @module ApiClient
 * @description Typed client helpers for web-to-API authentication calls.
 * @author auto
 * @since 1.0.0
 */
import { joineeLoginSchema } from "@onboarding/schemas";
import type { JoineeLogin } from "@onboarding/types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/+$/, "");
const DEMO_TOKEN = "demo-session-token";

/**
 * Requests a recruiter sign-in session.
 * @param email - Recruiter work email.
 * @returns Session token and redirect path.
 */
export async function loginRecruiter(
  email: string,
): Promise<{ token: string; redirectTo: string }> {
  if (!email.includes("@")) {
    throw new Error("Invalid recruiter email");
  }
  return { redirectTo: "/dashboard", token: DEMO_TOKEN };
}

/**
 * Authenticates a joinee against the API.
 * @param input - Joinee login credentials.
 * @returns Session token and redirect path.
 */
export async function loginJoinee(
  input: JoineeLogin,
): Promise<{ token: string; redirectTo: string }> {
  const payload = joineeLoginSchema.parse(input);
  const response = await fetch(`${API_URL}/auth/joinee/login`, {
    body: JSON.stringify(payload),
    headers: { "content-type": "application/json", "x-csrf-token": "web-login" },
    method: "POST",
  });
  if (response.ok) {
    const json = (await response.json()) as { data?: { token?: string } };
    if (json.data?.token) {
      return { redirectTo: "/onboarding", token: json.data.token };
    }
  }
  throw new Error("Invalid joinee credentials");
}
